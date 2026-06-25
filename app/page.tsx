import Link from "next/link";
import { getWritings } from "@/lib/writing";
import Intro from "@/content/intro.mdx";
import Work from "@/content/work.mdx";
import Background from "@/content/background.mdx";
import Elsewhere from "@/content/elsewhere.mdx";
import Colophon from "@/content/colophon.mdx";

export default async function Home() {
  const writings = (await getWritings()).filter((w) => w.status !== "draft");

  return (
    <>
      <Intro />
      <Work />

      <section id="writing">
        <h2>Writing</h2>
        <ul className="list">
          {writings.map((w) => (
            <li key={w.slug} className="no-date">
              <div className="what">
                <Link
                  href={w.href ?? `/writing/${w.slug}`}
                  className="what-title"
                >
                  {w.title}
                </Link>
                {w.summary ? <span className="desc">{w.summary}</span> : null}
              </div>
            </li>
          ))}
        </ul>
        <Link href="/writing" className="more-link">
          All writing →
        </Link>
      </section>

      <Background />
      <Elsewhere />
      <Colophon />
    </>
  );
}
