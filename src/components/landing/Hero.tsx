"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const heading = headingRef.current;
    const text = heading.textContent || "";
    heading.innerHTML = "";

    // Split into words, then chars
    const words = text.split(" ");
    const allChars: HTMLSpanElement[] = [];

    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.transform = "translateY(40px)";
        // Make "next." glow green
        if (wi === words.length - 1) {
          charSpan.style.color = "#38bdf8";
        }
        wordSpan.appendChild(charSpan);
        allChars.push(charSpan);
      });

      heading.appendChild(wordSpan);

      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        heading.appendChild(space);
      }
    });

    const tl = gsap.timeline({ delay: 0.3 });

    // Eyebrow fade in
    tl.from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });

    // Character stagger reveal
    tl.to(allChars, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.2");

    // Subtitle fade in
    tl.from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // CTA fade in
    tl.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.4");

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0a0a0a] pt-20 sm:pt-0">
      {/* 3D particle sphere background */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 text-center">
        <div ref={eyebrowRef} className="mb-5 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#8b5cf6] uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b5cf6]" />
          AI Venture Studio
        </div>

        <h1
          ref={headingRef}
          className="font-[var(--font-sora)] text-[clamp(2.25rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
        >
          We build what&apos;s next.
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-5 sm:mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[#888] sm:text-xl"
        >
          Strategy. Intelligence. Automation. We&apos;re an AI studio that builds
          ventures and ships the systems to run them.
        </p>

        <div ref={ctaRef} className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
          <Link
            href="#services"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] px-8 py-3.5 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
          >
            See our work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-white uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            Book a call
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555]">
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-[#555] to-transparent" />
      </div>
    </section>
  );
}
