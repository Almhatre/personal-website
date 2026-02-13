import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Adam Mhatre - Personal Website",
  description: "Physics, AI, and startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
