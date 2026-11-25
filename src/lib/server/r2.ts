import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env["CLOUDFLARE_R2_ACCOUNT_ID"];
const bucket = process.env["CLOUDFLARE_R2_BUCKET"];
const publicUrl = process.env["CLOUDFLARE_R2_PUBLIC_URL"]?.replace(/\/$/, "");

function client() {
  const accessKeyId = process.env["CLOUDFLARE_R2_ACCESS_KEY_ID"];
  const secretAccessKey = process.env["CLOUDFLARE_R2_SECRET_ACCESS_KEY"];
  if (!accountId || !bucket || !publicUrl || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 ortam değişkenleri eksik.");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function createUploadUrl(key: string, contentType: string) {
  if (!bucket || !publicUrl)
    throw new Error("Cloudflare R2 yapılandırılmamış.");
  const uploadUrl = await getSignedUrl(
    client(),
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 300 },
  );
  return { uploadUrl, publicUrl: `${publicUrl}/${key}`, key };
}

export async function deleteObject(key: string) {
  if (!bucket) throw new Error("Cloudflare R2 yapılandırılmamış.");
  await client().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
