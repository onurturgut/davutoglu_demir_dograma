import { z } from "zod";
import { articles, services, projects, images } from "@/data/content";
import { businessConfig, whatsappUrl } from "@/data/business";
export const richNodeSchema: z.ZodType<RichNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    text: z.string().optional(),
    attrs: z.record(z.string(), z.unknown()).optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.string(), z.unknown()).optional(),
        }),
      )
      .optional(),
    content: z.array(richNodeSchema).optional(),
  }),
);
export type RichNode = {
  type: string;
  text?: string | undefined;
  attrs?: Record<string, unknown> | undefined;
  marks?:
    { type: string; attrs?: Record<string, unknown> | undefined }[] | undefined;
  content?: RichNode[] | undefined;
};
export const entrySchema = z.object({
  id: z.string(),
  type: z.enum(["services", "projects", "blog"]),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  content: z.string(),
  image: z.string(),
  alt: z.string(),
  gallery: z.array(z.object({ url: z.string(), alt: z.string() })),
  uses: z.array(z.string()),
  features: z.array(z.string()),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  relatedProjects: z.array(z.string()),
  serviceSlug: z.string(),
  tags: z.array(z.string()),
  kind: z.string(),
  location: z.string(),
  material: z.string(),
  dimensions: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string(),
  featured: z.boolean(),
  active: z.boolean(),
  richContent: richNodeSchema,
  sections: z.array(z.object({ title: z.string(), text: z.string() })),
});
export type Entry = z.infer<typeof entrySchema>;
export type ContentType = Entry["type"];
export const recordSchema = z.object({
  id: z.string(),
  draft: entrySchema,
  published: entrySchema.nullable(),
  status: z.enum(["Draft", "Published", "Archived"]),
  updatedAt: z.string(),
});
export type ContentRecord = z.infer<typeof recordSchema>;
export const socialSchema = z.object({
  id: z.string(),
  platform: z.string(),
  name: z.string(),
  url: z.string(),
  active: z.boolean(),
  footer: z.boolean(),
  navbar: z.boolean(),
  mobile: z.boolean(),
  order: z.number(),
});
export type SocialLink = z.infer<typeof socialSchema>;
export const sectionSchema = z.object({
  id: z.enum([
    "hero",
    "services",
    "projects",
    "about",
    "process",
    "blog",
    "contact",
  ]),
  title: z.string(),
  description: z.string(),
  active: z.boolean(),
  image: z.string(),
  selected: z.array(z.string()),
});
export type HomeSection = z.infer<typeof sectionSchema>;
export const settingsSchema = z.object({
  business: z.object({
    name: z.string(),
    description: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    whatsappMessage: z.string(),
    email: z.string(),
    city: z.string(),
    address: z.string(),
    hours: z.string(),
    maps: z.string(),
  }),
  hero: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    primaryText: z.string(),
    primaryHref: z.string(),
    secondaryText: z.string(),
    secondaryHref: z.string(),
  }),
  sections: z.array(sectionSchema),
  socials: z.array(socialSchema),
  faqs: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
      category: z.string(),
      serviceSlug: z.string(),
      order: z.number(),
      active: z.boolean(),
    }),
  ),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    siteUrl: z.string(),
    ogImage: z.string(),
    favicon: z.string(),
    region: z.string(),
    pages: z.record(
      z.string(),
      z.object({ title: z.string(), description: z.string() }),
    ),
  }),
  site: z.object({
    name: z.string(),
    slogan: z.string(),
    logo: z.string(),
    favicon: z.string(),
    palette: z.enum(["original", "graphite", "olive"]),
    footerDescription: z.string(),
    navbar: z.array(z.string()),
    footer: z.array(z.string()),
    mobileBar: z.boolean(),
    showBlog: z.boolean(),
    showProjects: z.boolean(),
  }),
});
export type Settings = z.infer<typeof settingsSchema>;
export const mediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  alt: z.string(),
  kind: z.string(),
  size: z.number(),
  local: z.boolean(),
});
export type Media = z.infer<typeof mediaSchema>;
export const stateSchema = z.object({
  version: z.literal(1),
  records: z.array(recordSchema),
  draftSettings: settingsSchema,
  publishedSettings: settingsSchema,
  media: z.array(mediaSchema),
});
export type CMSState = z.infer<typeof stateSchema>;
const emptyRich: RichNode = { type: "doc", content: [{ type: "paragraph" }] };
export function blankEntry(type: ContentType, id: string): Entry {
  return {
    id,
    type,
    slug: "",
    title: "",
    category: "",
    description: "",
    content: "",
    image: "",
    alt: "",
    gallery: [],
    uses: [],
    features: [],
    faqs: [],
    relatedProjects: [],
    serviceSlug: "",
    tags: [],
    kind: "Referans Görsel",
    location: "",
    material: "",
    dimensions: "",
    author: "",
    publishedAt: "",
    seoTitle: "",
    metaDescription: "",
    featured: false,
    active: true,
    richContent: emptyRich,
    sections: [],
  };
}
export function createSeed(): CMSState {
  const records: ContentRecord[] = [];
  for (const [type, items] of [
    ["services", services],
    ["projects", projects],
    ["blog", articles],
  ] as const)
    for (const item of items) {
      const data = {
        ...blankEntry(type, item.slug),
        ...item,
        description: "excerpt" in item ? item.excerpt : item.description,
        content: "content" in item ? item.content : "",
        alt:
          type === "projects"
            ? `${item.title} — Davutoğlu Demir Doğrama projesi`
            : `${item.title} — içerik görseli`,
        seoTitle: item.title,
        metaDescription: "excerpt" in item ? item.excerpt : item.description,
      };
      const entry = entrySchema.parse(data);
      if (entry.sections.length)
        entry.richContent = {
          type: "doc",
          content: entry.sections.flatMap((s) => [
            {
              type: "heading",
              attrs: { level: 2 },
              content: [{ type: "text", text: s.title }],
            },
            { type: "paragraph", content: [{ type: "text", text: s.text }] },
          ]),
        };
      records.push({
        id: entry.id,
        draft: structuredClone(entry),
        published: structuredClone(entry),
        status: "Published",
        updatedAt: "",
      });
    }
  const settings: Settings = {
    business: {
      name: businessConfig.businessName,
      description: businessConfig.description,
      phone: businessConfig.phone,
      whatsapp: "905431274323",
      whatsappMessage: new URL(whatsappUrl()).searchParams.get("text") || "",
      email: "",
      city: businessConfig.city,
      address: "",
      hours: "",
      maps: "",
    },
    hero: {
      label: "ELAZIĞ · DEMİR DOĞRAMA & METAL İMALAT",
      title: "Metal İşçiliğinde\nGüvenilir Çözümler.",
      description:
        "Elazığ'da demir kapı, bahçe kapısı, korkuluk, merdiven ve özel ölçülü metal imalat çözümleri.",
      image: images.gate,
      primaryText: "WhatsApp'tan Teklif Al",
      primaryHref: whatsappUrl(),
      secondaryText: "Projelerimizi İncele",
      secondaryHref: "/projeler",
    },
    sections: [
      {
        id: "hero",
        title: "Metal İşçiliğinde Güvenilir Çözümler.",
        description: "",
        active: true,
        image: images.gate,
        selected: [],
      },
      {
        id: "services",
        title: "Neler yapıyoruz?",
        description:
          "Yaşam alanları ve işletmeler için ihtiyaca uygun metal imalat ve demir doğrama çözümleri.",
        active: true,
        image: "",
        selected: services.map((s) => s.slug),
      },
      {
        id: "projects",
        title: "Metale şekil veren fikirler.",
        description:
          "Kapılardan özel imalata, çalışma alanlarımızdan bir seçki.",
        active: true,
        image: "",
        selected: projects.slice(0, 3).map((s) => s.slug),
      },
      {
        id: "about",
        title: "İşimize özen,\nüretime değer katıyoruz.",
        description:
          "Metal, doğru düşünülmüş detaylarla yaşam alanlarının bir parçasına dönüşür. Elazığ'da demir doğrama ve özel metal imalat ihtiyaçlarınız için sizinle birlikte çözüm arıyoruz.",
        active: true,
        image: images.workshop,
        selected: [],
      },
      {
        id: "process",
        title: "Fikirden üretime.",
        description:
          "Genel bir süreç taslağıdır. Kapsam ve uygulama koşulları görüşme sırasında netleştirilir.",
        active: true,
        image: "",
        selected: [],
      },
      {
        id: "blog",
        title: "Metal işleri rehberi.",
        description:
          "Malzeme seçiminden bakıma, karar vermenize yardımcı olacak bilgiler.",
        active: true,
        image: "",
        selected: articles.slice(0, 3).map((s) => s.slug),
      },
      {
        id: "contact",
        title: "Projeniz için bizimle\niletişime geçin.",
        description:
          "İhtiyacınızı paylaşın, metal imalat ve özel ölçü talepleriniz için görüşelim.",
        active: true,
        image: "",
        selected: [],
      },
    ],
    socials: [
      {
        id: "phone",
        platform: "Telefon",
        name: "Ara",
        url: businessConfig.phoneHref,
        active: true,
        footer: true,
        navbar: false,
        mobile: true,
        order: 0,
      },
      {
        id: "whatsapp",
        platform: "WhatsApp",
        name: "WhatsApp",
        url: whatsappUrl(),
        active: true,
        footer: false,
        navbar: false,
        mobile: true,
        order: 1,
      },
      {
        id: "instagram",
        platform: "Instagram",
        name: "Instagram",
        url: businessConfig.instagram,
        active: true,
        footer: true,
        navbar: false,
        mobile: true,
        order: 2,
      },
    ],
    faqs: services.flatMap((s) =>
      s.faqs.map((f, i) => ({
        id: `${s.slug}-${i}`,
        ...f,
        category: s.category,
        serviceSlug: s.slug,
        order: i,
        active: true,
      })),
    ),
    seo: {
      title: businessConfig.businessName,
      description: businessConfig.description,
      siteUrl: businessConfig.websiteUrl,
      ogImage: "",
      favicon: "/brand/davutoglu-icon.png",
      region: "Elazığ",
      pages: {},
    },
    site: {
      name: businessConfig.businessName,
      slogan: "DEMİR DOĞRAMA",
      logo: "/brand/davutoglu-logo.png",
      favicon: "/brand/davutoglu-icon.png",
      palette: "original",
      footerDescription:
        "İhtiyaca göre şekillenen metal.\nÖzenle düşünülen detaylar.",
      navbar: [
        "/",
        "/hizmetler",
        "/projeler",
        "/hakkimizda",
        "/blog",
        "/iletisim",
      ],
      footer: ["/hizmetler", "/projeler", "/hakkimizda", "/blog"],
      mobileBar: true,
      showBlog: true,
      showProjects: true,
    },
  };
  return {
    version: 1,
    records,
    draftSettings: structuredClone(settings),
    publishedSettings: structuredClone(settings),
    media: Object.entries(images).map(([name, url]) => ({
      id: name,
      url,
      name: `${name}.jpg`,
      alt: `${name} — temsilî konsept görsel`,
      kind: "Referans Görsel",
      size: 0,
      local: false,
    })),
  };
}
export function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function safeUrl(url: string, image = false): string {
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (!image && /^(tel:|mailto:)/i.test(url)) return url;
  if (image && /^data:image\/(png|jpeg|webp|gif);base64,/i.test(url))
    return url;
  return "";
}
export function validateEntry(
  entry: Entry,
  records: ContentRecord[],
  publishing = false,
) {
  if (!entry.title.trim()) throw new Error("İçerik başlığı gerekli.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug))
    throw new Error("Slug küçük harf, rakam ve tire içermeli.");
  if (
    records.some(
      (r) =>
        r.id !== entry.id &&
        r.draft.type === entry.type &&
        (r.draft.slug === entry.slug || r.published?.slug === entry.slug),
    )
  )
    throw new Error("Bu slug başka bir içerikte kullanılıyor.");
  if (publishing && !entry.description.trim())
    throw new Error("Yayınlamak için kısa açıklama gerekli.");
}
export function saveRecord(
  state: CMSState,
  entry: Entry,
  action: "draft" | "publish" | "archive",
  now: string,
): CMSState {
  validateEntry(entry, state.records, action === "publish");
  const old = state.records.find((r) => r.id === entry.id);
  const record: ContentRecord = {
    id: entry.id,
    draft: structuredClone(entry),
    published:
      action === "publish"
        ? structuredClone(entry)
        : action === "archive"
          ? null
          : old?.published || null,
    status:
      action === "publish"
        ? "Published"
        : action === "archive"
          ? "Archived"
          : old?.status || "Draft",
    updatedAt: now,
  };
  return {
    ...state,
    records: old
      ? state.records.map((r) => (r.id === entry.id ? record : r))
      : [...state.records, record],
  };
}
export function publishedEntries(state: CMSState, type: ContentType) {
  return state.records.flatMap((r) =>
    r.status === "Published" && r.published?.active && r.published.type === type
      ? [r.published]
      : [],
  );
}
export function validateBackup(value: unknown): CMSState {
  const parsed = stateSchema.parse(value);
  const ids = new Set<string>();
  for (const record of parsed.records) {
    if (ids.has(record.id))
      throw new Error("Yedekte tekrar eden kayıt kimliği var.");
    ids.add(record.id);
    if (
      record.id !== record.draft.id ||
      (record.published && record.published.id !== record.id)
    )
      throw new Error("Kayıt kimlikleri tutarsız.");
    validateEntry(record.draft, parsed.records);
  }
  return parsed;
}
