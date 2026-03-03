import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Placeholder until domain is purchased; used for absolute OG URLs.
  metadataBase: new URL("https://motionventures.vercel.app"),
  title: {
    default: "Motion Ventures — Practical AI, fully implemented",
    template: "%s — Motion Ventures",
  },
  description:
    "No‑hassle AI business integration for non‑technical owners. We implement practical workflows, assistants, and reporting systems—end‑to‑end.",
  openGraph: {
    title: "Motion Ventures — Practical AI, fully implemented",
    description:
      "No‑hassle AI business integration for non‑technical owners. Practical workflows, assistants, and reporting—implemented.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
