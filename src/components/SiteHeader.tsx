"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Container } from "./ui";
import { getSupabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function SiteHeader({
  ctaLabel = "Free AI Assessment",
  ctaHref = "/assessment",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const supabase = getSupabase();
      supabase.auth.getUser().then(({ data }) => setUser(data.user)).catch(() => {});
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    } catch {
      // Supabase not configured — auth buttons will show logged-out state
    }
  }, []);

  async function handleSignOut() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
  }

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
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mv-primary)] text-xs font-bold text-white uppercase"
                >
                  {user.email?.[0] || '?'}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-white/10 bg-[color:var(--mv-canvas)] p-1.5 shadow-2xl">
                    <div className="px-3 py-2 text-xs text-white/40 truncate">{user.email}</div>
                    <Link
                      href="/admin/crm"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      CRM Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white hover:bg-white/5"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-xl bg-[var(--mv-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]"
                >
                  Sign Up
                </Link>
              </div>
            )}
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
              {user ? (
                <div className="mt-2 space-y-1">
                  <div className="px-3 py-2 text-xs text-white/40 truncate">{user.email}</div>
                  <Link
                    href="/admin/crm"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white/90"
                  >
                    CRM Dashboard
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400/80 transition hover:bg-red-500/10"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex gap-2 px-1">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-sm font-medium text-white/80 transition hover:bg-white/10"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-xl bg-[var(--mv-primary)] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[var(--mv-primary-hover)]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
