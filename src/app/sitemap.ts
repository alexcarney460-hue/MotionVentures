import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://motionventures.vercel.app";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/studio`, lastModified: now },
    { url: `${base}/ventures`, lastModified: now },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/assessment`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
  ];
}
