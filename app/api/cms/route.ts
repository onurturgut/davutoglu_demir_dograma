import { NextResponse } from "next/server";
import { createSeed, stateSchema } from "@/lib/cms/model";
import { getDatabase } from "@/lib/server/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();
    const stored = await db
      .collection("cms_state")
      .findOne({ _id: "primary" as never });
    if (!stored) return NextResponse.json(createSeed());
    const { _id: _ignored, ...state } = stored;
    return NextResponse.json(stateSchema.parse(state));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "İçerik okunamadı." },
      { status: 503 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const state = stateSchema.parse(await request.json());
    const db = await getDatabase();
    await db
      .collection("cms_state")
      .replaceOne(
        { _id: "primary" as never },
        { _id: "primary" as never, ...state },
        { upsert: true },
      );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "İçerik kaydedilemedi.",
      },
      { status: 400 },
    );
  }
}
