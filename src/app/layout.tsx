import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("http://localhost:3020"),
  title: {
    default: "Motion Ventures — AI Studio",
    template: "%s — Motion Ventures",
  },
  description:
    "AI studio building ventures and shipping practical automations, premium web, and operational systems.",
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/logo-mv-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/brand/logo-mv-192.png",
  },
  openGraph: {
    title: "Motion Ventures — AI Studio",
    description:
      "AI studio building ventures and shipping practical automations, premium web, and operational systems.",
    type: "website",
    images: [
      {
        url: "/brand/og.png",
        width: 1200,
        height: 630,
        alt: "Motion Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion Ventures — AI Studio",
    description:
      "AI studio building ventures and shipping practical automations, premium web, and operational systems.",
    images: ["/brand/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
