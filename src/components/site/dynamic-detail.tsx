"use client";
import { notFound, useParams } from "next/navigation";
import { usePublicData } from "@/lib/cms/store";
import { ArticleDetail, ProjectDetail, ServiceDetail } from "./pages";

export function DynamicDetail({
  type,
}: {
  type: "services" | "projects" | "blog";
}) {
  const { slug } = useParams<{ slug: string }>();
  const data = usePublicData();
  const collection =
    type === "services"
      ? data.services
      : type === "projects"
        ? data.projects
        : data.articles;
  const item = collection.find((entry) => entry.slug === slug);
  if (!item) return notFound();
  if (type === "services")
    return <ServiceDetail item={item as (typeof data.services)[number]} />;
  if (type === "projects")
    return <ProjectDetail item={item as (typeof data.projects)[number]} />;
  return <ArticleDetail item={item as (typeof data.articles)[number]} />;
}
