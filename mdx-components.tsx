import type { MDXComponents } from "mdx/types";
import {
  Colophon,
  Contact,
  Desc,
  Entry,
  Eq,
  Intro,
  Item,
  List,
  Masthead,
  Section,
} from "./components/Notebook";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Colophon,
    Contact,
    Desc,
    Entry,
    Eq,
    Intro,
    Item,
    List,
    Masthead,
    Section,
  };
}
