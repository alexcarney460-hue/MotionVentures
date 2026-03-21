"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-cta-reveal]");

    gsap.from(els, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div data-cta-reveal className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#8b5cf6] uppercase">
          Ready to move?
        </div>
        <h2 data-cta-reveal className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Let&apos;s build<br />something incredible.
        </h2>
        <p data-cta-reveal className="mx-auto mt-6 max-w-xl text-lg text-[#888]">
          Whether you need a site that converts, an AI system that thinks, or a
          venture partner that ships — we&apos;re ready.
        </p>
        <div data-cta-reveal className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="/intelligence"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold text-white uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            Try CrowdTest free
          </Link>
        </div>
      </div>
    </section>
  );
}
