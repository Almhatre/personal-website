import type { Metadata } from "next";
import { EB_Garamond, Inter_Tight, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import { SAME_AS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Cofounder & CTO",
  worksFor: {
    "@type": "Organization",
    name: "Photonium",
    url: "https://photonium.ai/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Stanford University",
  },
  knowsAbout: [
    "Physics",
    "Optical design",
    "Active galactic nuclei",
    "Nuclear fusion",
    "Quantum computing",
  ],
  sameAs: SAME_AS,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = `${ebGaramond.variable} ${interTight.variable} ${stixTwo.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <body className="accent-slate measure-default">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
