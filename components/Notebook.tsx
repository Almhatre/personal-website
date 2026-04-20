"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FOOTNOTES } from "@/content/footnotes";

/* ------------------------------------------------------------------
 * Slot classifier — separate margin-column children from body-column
 * children. Uses displayName because component identity is not stable
 * across MDX + HMR boundaries.
 * ------------------------------------------------------------------ */

type Slot = "margin" | "body";

function componentName(type: unknown): string {
  if (typeof type === "string") return type;
  if (!type || (typeof type !== "function" && typeof type !== "object")) return "";
  const withNames = type as { displayName?: string; name?: string };
  const direct = withNames.displayName || withNames.name;
  if (direct) return direct;
  // Next.js tunnels 'use client' components through an RSC lazy-like
  // wrapper: { $$typeof, _payload, _init }. Two payload shapes observed:
  //   "fulfilled"       → _payload.value is the component function
  //   "resolved_module" → _payload.value is [moduleId, chunks, exportName]
  const payload = (type as { _payload?: unknown })._payload;
  if (payload && typeof payload === "object") {
    const v = (payload as { value?: unknown }).value;
    if (typeof v === "function") return componentName(v);
    if (Array.isArray(v) && typeof v[2] === "string") return v[2];
  }
  return "";
}

function slotOf(child: ReactNode): Slot | "other" {
  if (!React.isValidElement(child)) return "other";
  const name = componentName(child.type);
  if (name === "Margin" || name === "Pen") return "margin";
  if (name === "Body") return "body";
  return "other";
}

/* MDX wraps single-block children in <p>. Strip that wrapper when a
 * component renders its children inside an already-paragraph-ish element
 * (a <p>, a <span>, or its own styled paragraph). */
function unwrapParagraphs(children: ReactNode): ReactNode {
  return React.Children.map(children, (c) => {
    if (React.isValidElement(c) && c.type === "p") {
      return (c.props as { children?: ReactNode }).children;
    }
    return c;
  });
}

/* ------------------------------------------------------------------
 * Footnote context + popover host
 * ------------------------------------------------------------------ */

type FootnoteHandler = (e: React.MouseEvent<HTMLElement>, id: string) => void;
const FootnoteContext = createContext<FootnoteHandler>(() => {});

export function NotebookRoot({ children }: { children: ReactNode }) {
  const [popover, setPopover] = useState<
    | { id: string; left: number; top: number }
    | null
  >(null);

  const handleFootnote: FootnoteHandler = useCallback((e, id) => {
    e.stopPropagation();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopover({
      id,
      left: window.scrollX + r.left - 8,
      top: window.scrollY + r.bottom + 6,
    });
  }, []);

  useEffect(() => {
    if (!popover) return;
    const dismiss = () => setPopover(null);
    const t = window.setTimeout(() => {
      document.addEventListener("click", dismiss, { once: true });
    }, 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("click", dismiss);
    };
  }, [popover]);

  return (
    <FootnoteContext.Provider value={handleFootnote}>
      <div className="sheet">{children}</div>
      {popover && (
        <span
          className="fn-pop"
          style={{ left: popover.left, top: popover.top }}
        >
          {FOOTNOTES[popover.id] ?? "[no footnote]"}
        </span>
      )}
    </FootnoteContext.Provider>
  );
}

/* ------------------------------------------------------------------
 * Masthead
 * ------------------------------------------------------------------ */

export function Masthead({
  edition,
  title,
  children,
}: {
  edition: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <header className="mast">
      <div className="left">
        <span className="rule"></span>
        Notebook
        <br />
        A first attempt · <span>{edition}</span>
        <br />
        <span style={{ color: "var(--red)" }}>probably revised</span>
      </div>
      <div className="right">
        <h1>{title}</h1>
        <p className="byline">{unwrapParagraphs(children)}</p>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
 * Chapter (splits children into margin column and body column)
 * ------------------------------------------------------------------ */

export function Chapter({
  num,
  when,
  title,
  children,
}: {
  num: string;
  when?: string;
  title: ReactNode;
  children: ReactNode;
}) {
  const marginKids: ReactNode[] = [];
  const bodyKids: ReactNode[] = [];
  React.Children.forEach(children, (c) => {
    const slot = slotOf(c);
    if (slot === "margin") marginKids.push(c);
    else if (slot === "body") bodyKids.push(c);
    else if (React.isValidElement(c)) bodyKids.push(c);
    // non-element whitespace text is dropped
  });

  return (
    <article className="chapter">
      <aside className="margin">{marginKids}</aside>
      <div className="body">
        <div className="chap-num">
          Chapter {num}
          {when ? ` · ${when}` : ""}
        </div>
        <h2 className="chap-title">{title}</h2>
        {bodyKids}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
 * Margin-column components
 * ------------------------------------------------------------------ */

export function Margin({
  tag,
  children,
}: {
  tag?: string;
  children: ReactNode;
}) {
  return (
    <div className="mnote">
      {tag ? <span className="tag">{tag}</span> : null}
      {children}
    </div>
  );
}
Margin.displayName = "Margin";

export function Pen({ children }: { children: ReactNode }) {
  return <div className="mnote pen">{children}</div>;
}
Pen.displayName = "Pen";

/* ------------------------------------------------------------------
 * Body-column components
 * ------------------------------------------------------------------ */

export function Body({ children }: { children: ReactNode }) {
  return <div className="chap-body">{children}</div>;
}
Body.displayName = "Body";

export function Lede({ children }: { children: ReactNode }) {
  return <p className="lede">{unwrapParagraphs(children)}</p>;
}

export function Pull({ children }: { children: ReactNode }) {
  return <p className="pull">{unwrapParagraphs(children)}</p>;
}

export function Eq({
  num,
  children,
}: {
  num?: string;
  children: ReactNode;
}) {
  return (
    <div className="eqblock">
      <span className="eq">{unwrapParagraphs(children)}</span>
      {num ? <span className="num">({num})</span> : null}
    </div>
  );
}

export function Flourish() {
  return <div className="flourish">✦ · ✦ · ✦</div>;
}

/* ------------------------------------------------------------------
 * Footnote (click → popover, read from FOOTNOTES map)
 * ------------------------------------------------------------------ */

export function Footnote({ n }: { n: string }) {
  const handle = useContext(FootnoteContext);
  return (
    <sup className="fn" onClick={(e) => handle(e, n)}>
      {n}
    </sup>
  );
}

/* ------------------------------------------------------------------
 * CV / writing-list row
 * ------------------------------------------------------------------ */

export function CVRow({
  when,
  role,
  children,
}: {
  when: string;
  role: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="cv-row">
      <div className="when">{when}</div>
      <div className="what">
        {role}
        {role ? " " : null}
        <span className="role">{unwrapParagraphs(children)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Sign-off
 * ------------------------------------------------------------------ */

export function SignOff({
  name,
  location,
  email,
  children,
}: {
  name: string;
  location: string;
  email: string;
  children: ReactNode;
}) {
  return (
    <footer className="sign-off">
      <div className="left">
        <span style={{ color: "var(--red)" }}>End of notebook — for now.</span>
        <br />
        <br />
        <span>— {name} —</span>
        <br />
        {location}
      </div>
      <div className="right">
        <h3>If you’d like to write.</h3>
        {children}
        <div className="links">
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <p className="colophon">
          Typeset in EB Garamond and Fraunces, with Inter Tight for marginalia
          and STIX Two Text where equations appear. No tracking, no analytics,
          no newsletter.
        </p>
      </div>
    </footer>
  );
}
