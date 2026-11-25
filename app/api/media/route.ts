import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteObject } from "@/lib/server/r2";

export async function DELETE(request: Request) {
  try {
    const { key } = z
      .object({ key: z.string().startsWith("media/") })
      .parse(await request.json());
    await deleteObject(key);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Medya silinemedi." },
      { status: 400 },
    );
  }
}
