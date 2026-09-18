import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/projects-data";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://etinosa.dev";

// Static file convention — Next.js serves this at /sitemap.xml automatically.
// Covers every real, indexable route: the static pages, every project detail
// page, and every blog post. Blog posts get the highest changeFrequency
// since that's the content that actually changes week to week.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/experience`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tools`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
