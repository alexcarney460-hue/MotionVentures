"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Container } from "./ui";
import { getSupabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function SiteHeader({
  ctaLabel = "Try Free",
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
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 max-w-5xl px-4">
        <nav
          className="glass-nav flex items-center justify-between rounded-2xl px-5 py-3"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-[var(--font-sora)] font-semibold tracking-tight text-[var(--mv-ink)]"
          >
            <Image
              src="/brand/logo-mv-192.png"
              alt="Motion Ventures"
              width={28}
              height={28}
              className="rounded-lg"
              priority
            />
            <span className="text-sm">Motion Ventures</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 text-sm sm:flex">
            <Link
              href="/intelligence"
              className="text-[var(--mv-muted)] transition hover:text-[var(--mv-ink)]"
            >
              Intelligence
            </Link>
            <Link
              href="/services"
              className="text-[var(--mv-muted)] transition hover:text-[var(--mv-ink)]"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-[var(--mv-muted)] transition hover:text-[var(--mv-ink)]"
            >
              Docs
            </Link>
          </div>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 sm:flex">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white uppercase"
                  aria-label="User menu"
                >
                  {user.email?.[0] || '?'}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
                    <div className="px-3 py-2 text-xs text-gray-400 truncate">{user.email}</div>
                    <Link
                      href="/admin/crm"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                      CRM Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-[var(--mv-muted)] transition hover:text-[var(--mv-ink)]"
                >
                  Sign in
                </Link>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  {ctaLabel} <span className="ml-1" aria-hidden="true">&rarr;</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500 transition hover:bg-gray-100 sm:hidden"
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
        </nav>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="mx-4 mt-2 rounded-2xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur sm:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {[
              { href: "/intelligence", label: "Intelligence" },
              { href: "/services", label: "Pricing" },
              { href: "/blog", label: "Docs" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
                <div className="px-3 py-2 text-xs text-gray-400 truncate">{user.email}</div>
                <Link
                  href="/admin/crm"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                >
                  CRM Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2 border-t border-gray-100 pt-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Sign in
                </Link>
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full bg-gray-900 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  {ctaLabel} &rarr;
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
