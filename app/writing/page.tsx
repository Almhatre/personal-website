import Link from "next/link";
import type { Metadata } from "next";
import { getWritings, type WritingEntry } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and publications by Adam Mhatre.",
};

function WritingRow({ entry }: { entry: WritingEntry }) {
  const draft = entry.status === "draft";
  const href = entry.href ?? `/writing/${entry.slug}`;
  const title = draft ? (
    <span className="what-title">{entry.title}</span>
  ) : (
    <Link href={href} className="what-title">
      {entry.title}
    </Link>
  );
  return (
    <li className="no-date">
      <div className="what">
        {title}
        {draft ? <span className="tag">soon</span> : null}
        {entry.summary ? <span className="desc">{entry.summary}</span> : null}
      </div>
    </li>
  );
}

export default async function WritingIndex() {
  const all = await getWritings();
  const essays = all.filter((e) => e.kind === "essay");
  const publications = all.filter((e) => e.kind === "publication");

  return (
    <>
      <h1 className="page-title">Writing</h1>

      {essays.length > 0 && (
        <section id="essays">
          <h2>Essays</h2>
          <ul className="list">
            {essays.map((e) => (
              <WritingRow key={e.slug} entry={e} />
            ))}
          </ul>
        </section>
      )}

      {publications.length > 0 && (
        <section id="publications">
          <h2>Publications</h2>
          <ul className="list">
            {publications.map((e) => (
              <WritingRow key={e.slug} entry={e} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
