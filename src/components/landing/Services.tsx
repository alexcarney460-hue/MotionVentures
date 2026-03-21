"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NatureImage from "./NatureImage";

const GlassShape = dynamic(() => import("./GlassShape"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Synthetic Advisory",
    desc: "CrowdTest simulates your customers. Think Tank simulates expert advisors. Get consulting-grade intelligence at SaaS prices.",
    href: "/intelligence",
  },
  {
    num: "02",
    title: "Premium Web",
    desc: "Sites that convert. Dark themes, scroll animations, and interfaces that make your brand feel like the future.",
    href: "/services",
  },
  {
    num: "03",
    title: "Automation Systems",
    desc: "CRM pipelines, lead scrapers, content engines, and AI workflows that run your business while you sleep.",
    href: "/services",
  },
  {
    num: "04",
    title: "Venture Building",
    desc: "From idea to revenue. We build, launch, and operate digital ventures with AI at the core.",
    href: "/contact",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // No scroll animations — content shows immediately for reliability

  // Mouse tracking for radial glow
  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`,
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 sm:py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <GlassShape className="absolute right-0 top-1/4 w-64 h-64 sm:w-80 sm:h-80 opacity-50 hidden md:block" color="#8b5cf6" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="mb-10 sm:mb-16 md:mb-20">
          <div className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#8b5cf6] uppercase">
            What we build
          </div>
          <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Four disciplines.
            <br />
            <span className="text-[#888]">One studio.</span>
          </h2>
        </div>

        <div className="mb-12 sm:mb-16 h-48 sm:h-64 md:h-80">
          <NatureImage
            src="/brand/nature/mv-macro-nature-2.jpg"
            alt="Neural network organic structure"
            className="h-full w-full"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((service) => (
            <a
              key={service.num}
              href={service.href}
              data-service-card
              onMouseMove={handleMouseMove}
              className="radial-hover group relative rounded-xl sm:rounded-2xl border border-white/[0.06] bg-[#111] p-5 sm:p-8 transition-all duration-300 hover:border-[#8b5cf6]/20 hover:bg-[#141414] md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm font-bold text-[#8b5cf6]/60">
                  {service.num}
                </span>
                <span className="text-[#333] transition-all duration-300 group-hover:text-[#8b5cf6] group-hover:translate-x-1">
                  &rarr;
                </span>
              </div>
              <h3 className="mt-6 font-[var(--font-sora)] text-2xl font-bold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#777]">
                {service.desc}
              </p>
              <div className="mt-6 h-px w-12 rounded-full bg-[#8b5cf6]/20 transition-all duration-500 group-hover:w-24 group-hover:bg-[#8b5cf6]/50" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
