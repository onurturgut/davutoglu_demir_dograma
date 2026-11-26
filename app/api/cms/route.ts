import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/server/mongodb";
import { readCmsState, writeCmsState } from "@/lib/server/cms-repository";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();
    return NextResponse.json(await readCmsState(db));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "İçerik okunamadı." },
      { status: 503 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const db = await getDatabase();
    await writeCmsState(db, await request.json());
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
