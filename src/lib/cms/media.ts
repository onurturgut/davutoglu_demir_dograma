import type { Media } from "./model";

export const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadMedia(file: File): Promise<Media> {
  if (!ALLOWED_TYPES.includes(file.type))
    throw new Error("JPEG, PNG, WebP veya GIF görseli seçin.");
  if (file.size > MAX_IMAGE_SIZE)
    throw new Error("Görsel en fazla 8 MB olabilir.");
  const response = await fetch("/api/media/presign", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Yükleme hazırlanamadı.");
  const upload = await fetch(payload.uploadUrl, {
    method: "PUT",
    headers: { "content-type": file.type },
    body: file,
  });
  if (!upload.ok) throw new Error("Görsel R2 deposuna yüklenemedi.");
  return {
    id: payload.key,
    url: payload.publicUrl,
    name: file.name,
    alt: "",
    kind: "Referans Görsel",
    size: file.size,
    local: false,
  };
}

export async function readMedia(id: string): Promise<string> {
  return id;
}

export async function removeMedia(id: string) {
  const response = await fetch("/api/media", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ key: id }),
  });
  if (!response.ok)
    throw new Error((await response.json()).error || "Medya silinemedi.");
}
