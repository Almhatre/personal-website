import { NotebookRoot } from "@/components/Notebook";
import Masthead from "@/content/masthead.mdx";
import Ch00 from "@/content/ch00-prologue.mdx";
import Ch01 from "@/content/ch01-black-holes.mdx";
import Ch02 from "@/content/ch02-fusion.mdx";
import Ch03 from "@/content/ch03-body.mdx";
import Ch04 from "@/content/ch04-company.mdx";
import Ch05 from "@/content/ch05-cv.mdx";
import Ch06 from "@/content/ch06-writing.mdx";
import SignOff from "@/content/signoff.mdx";

export default function Home() {
  return (
    <NotebookRoot>
      <Masthead />
      <Ch00 />
      <Ch01 />
      <Ch02 />
      <Ch03 />
      <Ch04 />
      <Ch05 />
      <Ch06 />
      <SignOff />
    </NotebookRoot>
  );
}
