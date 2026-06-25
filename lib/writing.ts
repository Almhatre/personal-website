// Writing registry. Each piece is one MDX file in content/writing/.
// Drop a new .mdx in there (with an `export const meta = {...}` block) and it
// appears automatically — no list to maintain here.
//
// Server-only: this reads the filesystem, so only import it from server
// components (the /writing pages and the home page).

import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content/writing");

export type WritingKind = "essay" | "publication";

export interface WritingMeta {
  title: string;
  summary?: string;
  kind: WritingKind;
  status?: "draft" | "published";
  date?: string; // ISO yyyy-mm-dd, optional — used for sorting + display
  order?: number; // manual sort hint within a kind (lower = first)
  pdf?: string; // public path to a PDF to embed on the reader page
  href?: string; // link straight to this URL instead of a generated reader page
}

export interface WritingEntry extends WritingMeta {
  slug: string;
}

export function getSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

async function getMeta(slug: string): Promise<WritingEntry> {
  const mod = await import(`../content/writing/${slug}.mdx`);
  return { slug, ...(mod.meta as WritingMeta) };
}

/** All pieces, drafts included, sorted newest-ish first within a kind. */
export async function getWritings(): Promise<WritingEntry[]> {
  const entries = await Promise.all(getSlugs().map(getMeta));
  return entries.sort(
    (a, b) =>
      (a.order ?? 0) - (b.order ?? 0) ||
      (b.date ?? "").localeCompare(a.date ?? ""),
  );
}
