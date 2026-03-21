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
            className="flex items-center gap-2 font-[var(--font-sora)] font-semibold tracking-tight text-white"
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
              className="text-[#888] transition hover:text-white"
            >
              Intelligence
            </Link>
            <Link
              href="/services"
              className="text-[#888] transition hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-[#888] transition hover:text-white"
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
                  <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-white/[0.06] bg-[#111] p-1.5 shadow-lg">
                    <div className="px-3 py-2 text-xs text-[#666] truncate">{user.email}</div>
                    <Link
                      href="/admin/crm"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-[#888] transition hover:bg-white/5 hover:text-white"
                    >
                      CRM Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
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
                  className="text-sm text-[#888] transition hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] px-6 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {ctaLabel} <span className="ml-1" aria-hidden="true">&rarr;</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/5 text-[#888] transition hover:bg-white/10 sm:hidden"
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
        <div className="mx-4 mt-2 rounded-2xl border border-white/[0.06] bg-[#111]/95 shadow-lg backdrop-blur sm:hidden">
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
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#888] transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-2 space-y-1 border-t border-white/[0.06] pt-2">
                <div className="px-3 py-2 text-xs text-[#666] truncate">{user.email}</div>
                <Link
                  href="/admin/crm"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#888] transition hover:bg-white/5 hover:text-white"
                >
                  CRM Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2 border-t border-white/[0.06] pt-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl border border-white/[0.06] bg-white/5 py-2.5 text-center text-sm font-medium text-[#888] transition hover:bg-white/10 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
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
