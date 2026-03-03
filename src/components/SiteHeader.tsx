import Link from "next/link";
import { Button, Container } from "./ui";

export default function SiteHeader({
  ctaLabel = "Free AI Assessment",
  ctaHref = "/assessment",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--mv-border)] bg-[color:var(--mv-canvas)]/75 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-[var(--font-sora)] font-semibold tracking-tight text-[color:var(--mv-ink)]">
            Motion Ventures
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[color:var(--mv-muted)] sm:flex">
            <Link href="/ventures" className="hover:text-[color:var(--mv-ink)]">
              Ventures
            </Link>
            <Link href="/services" className="hover:text-[color:var(--mv-ink)]">
              Services
            </Link>
            <Link href="/studio" className="hover:text-[color:var(--mv-ink)]">
              Studio
            </Link>
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
            </Button>
          </nav>
          <div className="sm:hidden">
            <Button href={ctaHref} variant="primary">
              Assessment
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
