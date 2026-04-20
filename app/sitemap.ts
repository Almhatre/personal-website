import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Bump this when the home page content meaningfully changes; a real
// date (rather than `new Date()`) is a stronger crawl signal because
// it stays stable across requests.
const LAST_MODIFIED = new Date("2026-04-20");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
