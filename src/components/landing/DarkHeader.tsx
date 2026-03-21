"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DarkHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const supabase = getSupabase();
      supabase.auth.getUser().then(({ data }) => setUser(data.user)).catch(() => {});
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-5xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#0a0a0a]/80 border border-white/[0.06] backdrop-blur-xl shadow-lg"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-[var(--font-sora)] font-semibold text-white">
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
            <Link href="/intelligence" className="text-[#888] transition hover:text-white animated-underline">
              Intelligence
            </Link>
            <Link href="/services" className="text-[#888] transition hover:text-white animated-underline">
              Pricing
            </Link>
            <Link href="/blog" className="text-[#888] transition hover:text-white animated-underline">
              Docs
            </Link>
          </div>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 sm:flex">
            {user ? (
              <Link
                href="/admin/crm"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8b5cf6] text-xs font-bold text-white uppercase"
              >
                {user.email?.[0] || "?"}
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-[#888] transition hover:text-white">
                  Sign in
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] px-6 py-2 text-sm font-bold text-white transition hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                  Get started <span className="ml-1">&rarr;</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#888] sm:hidden"
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mx-4 mt-2 rounded-2xl border border-white/[0.06] bg-[#111]/95 shadow-lg backdrop-blur-xl sm:hidden">
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
            <div className="mt-2 flex gap-2 border-t border-white/[0.06] pt-3">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-center text-sm font-medium text-[#888]"
              >
                Sign in
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-full bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] py-2.5 text-center text-sm font-bold text-white"
              >
                Get started &rarr;
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
