import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getWritings } from "@/lib/writing";

// Bump this when the home page content meaningfully changes; a real
// date (rather than `new Date()`) is a stronger crawl signal because
// it stays stable across requests.
const LAST_MODIFIED = new Date("2026-06-25");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = (await getWritings()).filter((w) => w.status !== "draft");

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...published.map((w) => ({
      url: w.href ? `${SITE_URL}${w.href}` : `${SITE_URL}/writing/${w.slug}`,
      lastModified: w.date ? new Date(w.date) : LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
