import Link from "next/link";
import { Container } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <Container>
        <div className="flex flex-col items-center gap-4 py-8 text-sm sm:flex-row sm:justify-between">
          {/* Logo left */}
          <div className="font-[var(--font-sora)] font-semibold text-white">
            Motion Ventures
          </div>

          {/* Links center */}
          <nav className="flex items-center gap-6 text-[#888]">
            <Link href="/intelligence" className="transition hover:text-white">
              Intelligence
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Pricing
            </Link>
            <Link href="/blog" className="transition hover:text-white">
              Docs
            </Link>
            <Link href="/assessment" className="transition hover:text-white">
              Free assessment
            </Link>
          </nav>

          {/* Copyright right */}
          <div className="text-[#444]">
            &copy; {new Date().getFullYear()} Motion Ventures
          </div>
        </div>
      </Container>
    </footer>
  );
}
