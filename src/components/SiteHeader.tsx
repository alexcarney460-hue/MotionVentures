"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Container } from "./ui";

export default function SiteHeader({
  ctaLabel = "Free AI Assessment",
  ctaHref = "/assessment",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--mv-border)] bg-[color:var(--mv-canvas)]/70 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--mv-canvas)]/55">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-[var(--font-sora)] font-semibold tracking-tight text-[color:var(--mv-ink)]"
          >
            <Image
              src="/brand/logo-mv-192.png"
              alt="Motion Ventures"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />
            <span>Motion Ventures</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-[color:var(--mv-muted)] sm:flex">
            <Link href="/ventures" className="transition hover:text-[color:var(--mv-ink)]">
              Ventures
            </Link>
            <Link href="/services" className="transition hover:text-[color:var(--mv-ink)]">
              Services
            </Link>
            <Link href="/studio" className="transition hover:text-[color:var(--mv-ink)]">
              Studio
            </Link>
            <Link href="/affiliates" className="transition hover:text-[color:var(--mv-ink)]">
              Affiliates
            </Link>
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
            </Button>
          </nav>

          {/* Mobile: hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 sm:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 5H14M2 8H14M2 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[color:var(--mv-canvas)]/95 backdrop-blur sm:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {[
                { href: "/ventures", label: "Ventures" },
                { href: "/services", label: "Services" },
                { href: "/studio", label: "Studio" },
                { href: "/affiliates", label: "Affiliates" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white/90"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-1">
                <Button href={ctaHref} variant="primary">
                  {ctaLabel}
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
