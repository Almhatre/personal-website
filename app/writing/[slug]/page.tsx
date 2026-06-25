import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PdfEmbed } from "@/components/Notebook";
import { getSlugs, type WritingMeta } from "@/lib/writing";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

async function load(slug: string) {
  try {
    const mod = await import(`../../../content/writing/${slug}.mdx`);
    return { Body: mod.default, meta: mod.meta as WritingMeta };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = await load(slug);
  if (!piece) return {};
  return { title: piece.meta.title, description: piece.meta.summary };
}

export default async function WritingPiece({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = await load(slug);
  if (!piece) notFound();
  const { Body, meta } = piece;
  if (meta.href) redirect(meta.href);

  return (
    <article className="essay">
      <header className="essay-head">
        <h1>{meta.title}</h1>
      </header>
      <div className="essay-body">
        <Body />
      </div>
      {meta.pdf ? <PdfEmbed src={meta.pdf} title={meta.title} /> : null}
    </article>
  );
}
