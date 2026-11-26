"use client";
import { useEffect, useState } from "react";
import { readMedia } from "@/lib/cms/media";
import { safeUrl } from "@/lib/cms/model";
import { publicMediaUrl } from "@/lib/media-url";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | undefined;
};

export function MediaImage({ src = "", alt, ...props }: Props) {
  const [resolved, setResolved] = useState("");
  useEffect(() => {
    let active = true;
    if (src.startsWith("media:"))
      readMedia(src.slice(6))
        .then((url) => {
          if (active) setResolved(url);
        })
        .catch(() => {
          if (active) setResolved("");
        });
    return () => {
      active = false;
    };
  }, [src]);
  const url = src.startsWith("media:")
    ? resolved
    : safeUrl(publicMediaUrl(src), true);
  return url ? (
    <img {...props} src={url} alt={alt || ""} />
  ) : (
    <span className="media-missing" role="img" aria-label={alt || "Görsel yok"}>
      Görsel yok
    </span>
  );
}
