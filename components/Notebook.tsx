import React, { ReactNode } from "react";
import Link from "next/link";

/* MDX wraps single-block children in <p>. Strip that wrapper when a
 * component renders its children inside a paragraph-ish slot
 * (an <li>'s .what, an <Eq>'s <span>, etc.) so we don't get invalid
 * <p> nesting or broken inline layout. */
function unwrapParagraphs(children: ReactNode): ReactNode {
  return React.Children.map(children, (c) => {
    if (React.isValidElement(c) && c.type === "p") {
      return (c.props as { children?: ReactNode }).children;
    }
    return c;
  });
}

/* -------- Masthead (identity block, lives in the rail) -------- */

export function Masthead({
  name,
  location,
  email,
}: {
  name: string;
  location?: string;
  email?: string;
}) {
  return (
    <header className="mast">
      <h1>
        <Link href="/">{name}</Link>
      </h1>
      <div className="meta">
        {location && <span>{location}</span>}
        {email && (
          <span>
            <a href={`mailto:${email}`}>{email}</a>
          </span>
        )}
      </div>
    </header>
  );
}

/* -------- Intro (the "now" block) -------- */

export function Intro({ children }: { children: ReactNode }) {
  return <div className="intro">{children}</div>;
}

/* -------- Section (Work, Writing, Background, Elsewhere) -------- */

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* -------- Entry (one work item) -------- */

export function Entry({
  id,
  title,
  children,
}: {
  id?: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="entry" id={id}>
      <div className="entry-head">
        <div className="entry-title">{title}</div>
      </div>
      {children}
    </article>
  );
}

/* -------- Equation block (inline, with left rule + right-aligned label) -------- */

export function Eq({
  num,
  children,
}: {
  num?: string;
  children: ReactNode;
}) {
  return (
    <div className="eq">
      <span>{unwrapParagraphs(children)}</span>
      {num ? <span className="lbl">({num})</span> : null}
    </div>
  );
}

/* -------- Two-column list (date | content) -------- */

export function List({ children }: { children: ReactNode }) {
  return <ul className="list">{children}</ul>;
}

export function Item({
  when,
  children,
}: {
  when?: string;
  children: ReactNode;
}) {
  return (
    <li className={when ? undefined : "no-date"}>
      {when ? <div className="when">{when}</div> : null}
      <div className="what">{unwrapParagraphs(children)}</div>
    </li>
  );
}

/* Used inside <Item> for a smaller, secondary description line. */
export function Desc({ children }: { children: ReactNode }) {
  return <span className="desc">{unwrapParagraphs(children)}</span>;
}

/* -------- Cite (a formatted citation line, used in publications) -------- */

export function Cite({ children }: { children: ReactNode }) {
  return <p className="cite">{unwrapParagraphs(children)}</p>;
}

/* -------- PdfEmbed (in-page PDF reader with download + new-tab links) -------- */

export function PdfEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <figure className="pdf-embed">
      <iframe src={src} title={title ?? "Embedded PDF"} loading="lazy" />
      <figcaption>
        <a href={src} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
        <a href={src} download>
          Download PDF
        </a>
      </figcaption>
    </figure>
  );
}

/* -------- Contact (inline list of links) -------- */

export function Contact({ children }: { children: ReactNode }) {
  return <div className="contact">{children}</div>;
}

/* -------- Colophon (footer) -------- */

export function Colophon({
  copyright,
  updated,
}: {
  copyright?: string;
  updated?: string;
}) {
  return (
    <footer className="colophon">
      {copyright ? <span>{copyright}</span> : null}
      {updated ? <span>{updated}</span> : null}
    </footer>
  );
}
