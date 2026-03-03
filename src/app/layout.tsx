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
  metadataBase: new URL("https://motionventures.vercel.app"),
  title: {
    default: "Motion Ventures — AI Venture Studio",
    template: "%s — Motion Ventures",
  },
  description:
    "Motion Ventures is an AI venture studio building ventures and deploying proven systems for existing businesses.",
  openGraph: {
    title: "Motion Ventures — AI Venture Studio",
    description:
      "An AI venture studio: we build ventures—and we deploy proven systems for existing businesses.",
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
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
