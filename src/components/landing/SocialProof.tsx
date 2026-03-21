"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "50+", label: "Ventures launched" },
  { value: "10x", label: "Average client ROI" },
  { value: "48hr", label: "Average turnaround" },
  { value: "100%", label: "AI-powered" },
];

const TESTIMONIALS = [
  {
    quote: "Motion Ventures didn't just build our site — they built the entire system that runs our business.",
    author: "Founder",
    company: "E-commerce Brand",
  },
  {
    quote: "CrowdTest predicted exactly how our customers would react. We saved six figures on a campaign that would've flopped.",
    author: "Marketing Director",
    company: "SaaS Company",
  },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const stats = sectionRef.current.querySelectorAll("[data-stat]");
    const quotes = sectionRef.current.querySelectorAll("[data-quote]");

    gsap.from(stats, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: stats[0], start: "top 85%" },
    });

    gsap.from(quotes, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: quotes[0], start: "top 85%" },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#0a0a0a]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-24">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="text-center">
              <div className="font-[var(--font-sora)] text-4xl font-extrabold text-[#a78bfa] sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-[#666] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.company}
              data-quote
              className="rounded-2xl border border-white/[0.06] bg-[#111] p-8 sm:p-10"
            >
              <svg className="h-8 w-8 text-[#a78bfa]/30 mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
              </svg>
              <p className="text-lg leading-relaxed text-[#ccc] font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#222]" />
                <div className="text-xs text-[#666]">
                  <span className="text-[#999]">{t.author}</span> — {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
