import Link from "next/link";
import { Container } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <Container>
        <div className="flex flex-col items-center gap-4 py-8 text-sm sm:flex-row sm:justify-between">
          {/* Logo left */}
          <div className="font-[var(--font-sora)] font-semibold text-[var(--mv-ink)]">
            Motion Ventures
          </div>

          {/* Links center */}
          <nav className="flex items-center gap-6 text-[var(--mv-muted)]">
            <Link href="/intelligence" className="transition hover:text-[var(--mv-ink)]">
              Intelligence
            </Link>
            <Link href="/services" className="transition hover:text-[var(--mv-ink)]">
              Pricing
            </Link>
            <Link href="/blog" className="transition hover:text-[var(--mv-ink)]">
              Docs
            </Link>
            <Link href="/assessment" className="transition hover:text-[var(--mv-ink)]">
              Free assessment
            </Link>
          </nav>

          {/* Copyright right */}
          <div className="text-[var(--mv-muted)]">
            &copy; {new Date().getFullYear()} Motion Ventures
          </div>
        </div>
      </Container>
    </footer>
  );
}
