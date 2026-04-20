import type { Metadata } from "next";
import { EB_Garamond, Inter_Tight, STIX_Two_Text } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
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
  title: "Adam Mhatre",
  description:
    "Adam Mhatre — cofounder and CTO of Photonium. Formerly physics at Stanford, fusion at Avalanche Energy.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = `${ebGaramond.variable} ${interTight.variable} ${stixTwo.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <body className="accent-slate measure-default">{children}</body>
    </html>
  );
}
