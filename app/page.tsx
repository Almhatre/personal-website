import { Page } from "@/components/Notebook";
import Masthead from "@/content/masthead.mdx";
import Intro from "@/content/intro.mdx";
import Work from "@/content/work.mdx";
import Writing from "@/content/writing.mdx";
import Background from "@/content/background.mdx";
import Elsewhere from "@/content/elsewhere.mdx";
import Colophon from "@/content/colophon.mdx";

export default function Home() {
  return (
    <Page>
      <Masthead />
      <Intro />
      <Work />
      <Writing />
      <Background />
      <Elsewhere />
      <Colophon />
    </Page>
  );
}
