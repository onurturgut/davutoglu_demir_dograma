import { randomUUID } from "node:crypto";
import type { Db, Document } from "mongodb";
import {
  createSeed,
  stateSchema,
  type CMSState,
  type ContentRecord,
  type ContentType,
  type Media,
  type Settings,
} from "@/lib/cms/model";

const COLLECTIONS: Record<ContentType, string> = {
  services: "services",
  projects: "projects",
  blog: "blog_posts",
};

type SettingsDocument = {
  _id: string;
  version: 1;
  draftSettings: Settings;
  publishedSettings: Settings;
  updatedAt: string;
};

type StoredRecord = ContentRecord & {
  _id: string;
  createdAt: string;
  deletedAt?: string;
};

type StoredMedia = Media & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

type RevisionDocument = {
  _id: string;
  resourceType: ContentType | "settings";
  resourceId: string;
  snapshot: unknown;
  createdAt: string;
  source: string;
};

type AuditDocument = {
  _id: string;
  actor: string;
  action: "migration" | "update";
  resourceType: "cms";
  resourceId: "primary";
  counts: Record<"services" | "projects" | "blog" | "media", number>;
  createdAt: string;
};

declare global {
  var __davutogluMongoIndexes: Promise<void> | undefined;
}

function recordFromDocument(document: Document): ContentRecord {
  return {
    id: String(document["id"]),
    draft: document["draft"] as ContentRecord["draft"],
    published: document["published"] as ContentRecord["published"],
    status: document["status"] as ContentRecord["status"],
    updatedAt: String(document["updatedAt"] || ""),
  };
}

function mediaFromDocument(document: Document): Media {
  return {
    id: String(document["id"]),
    url: String(document["url"]),
    name: String(document["name"]),
    alt: String(document["alt"]),
    kind: String(document["kind"]),
    size: Number(document["size"]),
    local: Boolean(document["local"]),
  };
}

export async function ensureCmsIndexes(db: Db) {
  global.__davutogluMongoIndexes ??= (async () => {
    for (const name of Object.values(COLLECTIONS)) {
      const collection = db.collection(name);
      await Promise.all([
        collection.createIndex(
          { "draft.slug": 1 },
          { unique: true, name: "draft_slug_unique" },
        ),
        collection.createIndex(
          { status: 1, "published.publishedAt": -1 },
          { name: "publication_status" },
        ),
        collection.createIndex(
          { "draft.category": 1, status: 1 },
          { name: "category_status" },
        ),
        collection.createIndex(
          {
            "draft.title": "text",
            "draft.description": "text",
            "draft.content": "text",
            "draft.tags": "text",
          },
          { name: "content_search", default_language: "none" },
        ),
      ]);
    }
    await Promise.all([
      db
        .collection("media")
        .createIndex({ url: 1 }, { unique: true, name: "media_url_unique" }),
      db
        .collection("content_revisions")
        .createIndex(
          { resourceType: 1, resourceId: 1, createdAt: -1 },
          { name: "resource_history" },
        ),
      db
        .collection("audit_logs")
        .createIndex({ createdAt: -1 }, { name: "audit_date" }),
    ]);
  })();
  return global.__davutogluMongoIndexes;
}

async function readLegacyState(db: Db): Promise<CMSState | null> {
  const legacy = await db
    .collection<{ _id: string; [key: string]: unknown }>("cms_state")
    .findOne({ _id: "primary" });
  if (!legacy) return null;
  const { _id: _ignored, ...state } = legacy;
  return stateSchema.parse(state);
}

export async function readCmsState(db: Db): Promise<CMSState> {
  await ensureCmsIndexes(db);
  const settings = await db
    .collection<SettingsDocument>("cms_settings")
    .findOne({ _id: "primary" });
  if (!settings) return (await readLegacyState(db)) ?? createSeed();

  const [services, projects, blog, media] = await Promise.all([
    db
      .collection(COLLECTIONS.services)
      .find({ deletedAt: { $exists: false } })
      .sort({ createdAt: 1 })
      .toArray(),
    db
      .collection(COLLECTIONS.projects)
      .find({ deletedAt: { $exists: false } })
      .sort({ createdAt: 1 })
      .toArray(),
    db
      .collection(COLLECTIONS.blog)
      .find({ deletedAt: { $exists: false } })
      .sort({ createdAt: 1 })
      .toArray(),
    db
      .collection("media")
      .find({ deletedAt: { $exists: false } })
      .sort({ createdAt: 1 })
      .toArray(),
  ]);

  return stateSchema.parse({
    version: settings.version,
    records: [...services, ...projects, ...blog].map(recordFromDocument),
    draftSettings: settings.draftSettings,
    publishedSettings: settings.publishedSettings,
    media: media.map(mediaFromDocument),
  });
}

async function writeRecords(
  db: Db,
  type: ContentType,
  records: ContentRecord[],
  now: string,
) {
  const collection = db.collection<StoredRecord>(COLLECTIONS[type]);
  const existing = await collection.find({}).toArray();
  const byId = new Map(existing.map((record) => [record.id, record]));
  const revisions = records.flatMap((record) => {
    const previous = byId.get(record.id);
    if (
      !previous ||
      JSON.stringify(record) === JSON.stringify(recordFromDocument(previous))
    )
      return [];
    return [
      {
        _id: randomUUID(),
        resourceType: type,
        resourceId: record.id,
        snapshot: recordFromDocument(previous),
        createdAt: now,
        source: "admin-panel",
      },
    ];
  });
  if (revisions.length)
    await db
      .collection<RevisionDocument>("content_revisions")
      .insertMany(revisions);

  if (records.length) {
    await collection.bulkWrite(
      records.map((record) => {
        const previous = byId.get(record.id);
        return {
          replaceOne: {
            filter: { _id: record.id },
            replacement: {
              _id: record.id,
              ...record,
              createdAt: previous?.createdAt || now,
            },
            upsert: true,
          },
        };
      }),
    );
  }
  await collection.updateMany(
    {
      _id: { $nin: records.map((record) => record.id) },
      deletedAt: { $exists: false },
    },
    { $set: { deletedAt: now } },
  );
}

async function writeMedia(db: Db, media: Media[], now: string) {
  const collection = db.collection<StoredMedia>("media");
  const existing = await collection.find({}).toArray();
  const byId = new Map(existing.map((item) => [item.id, item]));
  if (media.length) {
    await collection.bulkWrite(
      media.map((item) => ({
        replaceOne: {
          filter: { _id: item.id },
          replacement: {
            _id: item.id,
            ...item,
            createdAt: byId.get(item.id)?.createdAt || now,
            updatedAt: now,
          },
          upsert: true,
        },
      })),
    );
  }
  await collection.updateMany(
    {
      _id: { $nin: media.map((item) => item.id) },
      deletedAt: { $exists: false },
    },
    { $set: { deletedAt: now, updatedAt: now } },
  );
}

export async function writeCmsState(
  db: Db,
  value: unknown,
  actor = "admin-panel",
) {
  const state = stateSchema.parse(value);
  await ensureCmsIndexes(db);
  const now = new Date().toISOString();
  const previousSettings = await db
    .collection<SettingsDocument>("cms_settings")
    .findOne({ _id: "primary" });

  if (
    previousSettings &&
    (JSON.stringify(previousSettings.draftSettings) !==
      JSON.stringify(state.draftSettings) ||
      JSON.stringify(previousSettings.publishedSettings) !==
        JSON.stringify(state.publishedSettings))
  ) {
    await db.collection<RevisionDocument>("content_revisions").insertOne({
      _id: randomUUID(),
      resourceType: "settings",
      resourceId: "primary",
      snapshot: {
        draftSettings: previousSettings.draftSettings,
        publishedSettings: previousSettings.publishedSettings,
      },
      createdAt: now,
      source: actor,
    });
  }

  await Promise.all([
    writeRecords(
      db,
      "services",
      state.records.filter((record) => record.draft.type === "services"),
      now,
    ),
    writeRecords(
      db,
      "projects",
      state.records.filter((record) => record.draft.type === "projects"),
      now,
    ),
    writeRecords(
      db,
      "blog",
      state.records.filter((record) => record.draft.type === "blog"),
      now,
    ),
    writeMedia(db, state.media, now),
    db.collection<SettingsDocument>("cms_settings").replaceOne(
      { _id: "primary" },
      {
        version: 1,
        draftSettings: state.draftSettings,
        publishedSettings: state.publishedSettings,
        updatedAt: now,
      },
      { upsert: true },
    ),
  ]);

  await db.collection<AuditDocument>("audit_logs").insertOne({
    _id: randomUUID(),
    actor,
    action: previousSettings ? "update" : "migration",
    resourceType: "cms",
    resourceId: "primary",
    counts: {
      services: state.records.filter((r) => r.draft.type === "services").length,
      projects: state.records.filter((r) => r.draft.type === "projects").length,
      blog: state.records.filter((r) => r.draft.type === "blog").length,
      media: state.media.length,
    },
    createdAt: now,
  });
  return state;
}
