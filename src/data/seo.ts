import { businessConfig, SITE_URL } from "./business";
export function pageHead(
  title: string,
  description: string,
  path: string,
  schema?: Record<string, unknown>,
) {
  const fullTitle = `${title} | Davutoğlu Demir Doğrama`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      {
        property: "og:type",
        content: schema?.["@type"] === "BlogPosting" ? "article" : "website",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: SITE_URL ? [{ rel: "canonical", href: `${SITE_URL}${path}` }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              name: businessConfig.businessName,
              description: businessConfig.description,
              telephone: "+905431274323",
              areaServed: { "@type": "City", name: "Elazığ" },
              sameAs: [businessConfig.instagram],
              ...(SITE_URL ? { url: SITE_URL } : {}),
            },
            {
              "@type": "WebPage",
              name: fullTitle,
              description,
              ...(SITE_URL ? { url: `${SITE_URL}${path}` } : {}),
            },
            ...(schema ? [schema] : []),
          ],
        }),
      },
    ],
  };
}
