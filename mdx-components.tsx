import type { MDXComponents } from "mdx/types";
import {
  Body,
  CVRow,
  Chapter,
  Eq,
  Flourish,
  Footnote,
  Lede,
  Margin,
  Masthead,
  Pen,
  Pull,
  SignOff,
} from "./components/Notebook";
import { Pendulum } from "./components/Pendulum";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Body,
    CVRow,
    Chapter,
    Eq,
    Flourish,
    Footnote,
    Lede,
    Margin,
    Masthead,
    Pen,
    Pendulum,
    Pull,
    SignOff,
  };
}
