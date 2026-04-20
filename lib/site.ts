// Site-wide constants. Used by app/layout.tsx (metadata + JSON-LD),
// app/sitemap.ts, and app/robots.ts. Update SITE_URL to the canonical
// production domain.

export const SITE_URL = "https://adammhatre.com";
export const SITE_NAME = "Adam Mhatre";
export const SITE_DESCRIPTION =
  "Adam Mhatre — cofounder and CTO of Photonium. Formerly a physics researcher at Stanford and a computational physicist at a fusion startup.";

// Public profiles / canonical URLs that refer to the same entity.
// Google uses these to collapse them into one knowledge-graph entry.
// Add LinkedIn, X, Scholar, arXiv author page, etc. as they come online.
export const SAME_AS: string[] = [
  "https://photonium.ai/",
  "https://github.com/Almhatre",
  "https://arxiv.org/abs/2506.21705",
];
