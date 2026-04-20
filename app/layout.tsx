import type { Metadata } from "next";
import {
  EB_Garamond,
  Fraunces,
  Inter_Tight,
  STIX_Two_Text,
} from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["300", "400"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500"],
  display: "swap",
});

const stixTwo = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-stix",
  style: ["normal", "italic"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adam Mhatre — Notebook",
  description:
    "A personal notebook by Adam Mhatre. Physics, mostly. A piano since I was five.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = `${ebGaramond.variable} ${fraunces.variable} ${interTight.variable} ${stixTwo.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <body className="paper-warm width-medium drops">{children}</body>
    </html>
  );
}
