import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://motionventures.co";
  const now = new Date();

  const blogPosts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/studio`, lastModified: now },
    { url: `${base}/ventures`, lastModified: now },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/assessment`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    ...blogPosts,
  ];
}
