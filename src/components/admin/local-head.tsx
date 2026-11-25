"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePublicState } from "@/lib/cms/store";
import { safeUrl } from "@/lib/cms/model";
export function LocalHead() {
  const state = usePublicState();
  const path = usePathname();
  useEffect(() => {
    if (path.startsWith("/admin")) return;
    const settings = state.publishedSettings;
    const [type, slug] = path.split("/").slice(1);
    const content = state.records.find(
      (r) =>
        r.status === "Published" &&
        r.published?.slug === slug &&
        r.published?.type ===
          (type === "hizmetler"
            ? "services"
            : type === "projeler"
              ? "projects"
              : "blog"),
    )?.published;
    const page = settings.seo.pages[path];
    const title = content?.seoTitle || page?.title;
    const description = content?.metaDescription || page?.description;
    const undo: (() => void)[] = [];
    function meta(selector: string, value: string) {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element && value) {
        const prev = element.content;
        element.content = value;
        undo.push(() => {
          element.content = prev;
        });
      }
    }
    if (title) {
      const prev = document.title;
      document.title = `${title} | ${settings.site.name}`;
      undo.push(() => {
        document.title = prev;
      });
      meta('meta[property="og:title"]', document.title);
    }
    if (description) {
      meta('meta[name="description"]', description);
      meta('meta[property="og:description"]', description);
    }
    const favicon = safeUrl(
      settings.site.favicon ||
        settings.seo.favicon ||
        "/brand/davutoglu-icon.png",
      true,
    );
    if (favicon) {
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (link) {
        const previous = link.href;
        link.href = favicon;
        undo.push(() => {
          link.href = previous;
        });
      }
    }
    return () => undo.forEach((fn) => fn());
  }, [state, path]);
  return null;
}
