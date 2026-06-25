import type { MDXComponents } from "mdx/types";
import {
  Cite,
  Colophon,
  Contact,
  Desc,
  Entry,
  Eq,
  Intro,
  Item,
  List,
  Masthead,
  PdfEmbed,
  Section,
} from "./components/Notebook";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cite,
    Colophon,
    Contact,
    Desc,
    Entry,
    Eq,
    Intro,
    Item,
    List,
    Masthead,
    PdfEmbed,
    Section,
  };
}
