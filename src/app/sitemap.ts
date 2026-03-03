import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://motionventures.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
