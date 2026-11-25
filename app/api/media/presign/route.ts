import { NextResponse } from "next/server";
import { z } from "zod";
import { createUploadUrl } from "@/lib/server/r2";

const inputSchema = z.object({
  name: z.string().min(1).max(180),
  type: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
  size: z.number().max(8 * 1024 * 1024),
});

export async function POST(request: Request) {
  try {
    const input = inputSchema.parse(await request.json());
    const extension =
      input.name
        .split(".")
        .pop()
        ?.replace(/[^a-z0-9]/gi, "")
        .toLowerCase() || "bin";
    const key = `media/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    return NextResponse.json(await createUploadUrl(key, input.type));
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Yükleme hazırlanamadı.",
      },
      { status: 400 },
    );
  }
}
