"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GlassShape = dynamic(() => import("./GlassShape"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: "01",
    name: "Viking Labs",
    domain: "vikinglabs.co",
    tags: ["E-Commerce", "AI Content", "Automations"],
    desc: "Cinematic DTC brand with AI-powered content engine, email/SMS automation, and affiliate program.",
  },
  {
    num: "02",
    name: "BlueLabel Wholesale",
    domain: "bluelabelwholesale.com",
    tags: ["B2B Platform", "Wholesale", "Catalog"],
    desc: "B2B-optimized storefront with tiered pricing and wholesale distribution tools.",
  },
  {
    num: "03",
    name: "Empire8 Sales Direct",
    domain: "empire8ny.com",
    tags: ["Cannabis Wholesale", "Payments", "Logistics"],
    desc: "Licensed cannabis wholesale supplier with Square payments and auto-shipping via Shippo.",
  },
  {
    num: "04",
    name: "Fresno Pool Care",
    domain: "fresnopoolcare.com",
    tags: ["Local Services", "Lead Capture", "Automation"],
    desc: "Services site with automated lead capture, SMS follow-up, and booking system.",
  },
  {
    num: "05",
    name: "SKYNETx",
    domain: "skynetx.io",
    tags: ["AI Infrastructure", "SaaS", "Skills Marketplace"],
    desc: "Agent performance infrastructure — memory API, cognitive telemetry, and skills marketplace.",
  },
  {
    num: "06",
    name: "ValueSuppliers.co",
    domain: "valuesuppliers.co",
    tags: ["B2B Supply", "AI Chat", "Wholesale"],
    desc: "B2B supply platform with AI chat assistant and tiered pricing.",
  },
] as const;

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // No scroll animations — content shows immediately for reliability

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <GlassShape className="absolute left-0 bottom-1/4 w-56 h-56 sm:w-72 sm:h-72 opacity-40 hidden lg:block" color="#38bdf8" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="mb-10 sm:mb-16">
          <div className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#8b5cf6] uppercase">
            Portfolio
          </div>
          <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Live ventures.
            <br />
            <span className="text-[#888]">Real results.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-[#666] leading-relaxed">
            Every project is built, launched, and operated by our studio. Not
            mockups — live businesses generating revenue.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <a
              key={project.num}
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              data-project
              className="group relative rounded-xl sm:rounded-2xl border border-white/[0.06] bg-[#111] p-4 sm:p-6 transition-all duration-300 hover:border-[#8b5cf6]/30 hover:bg-[#141414] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]"
            >
              {/* Number */}
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#8b5cf6]/50 group-hover:text-[#8b5cf6] transition-colors">
                  {project.num}
                </span>
                <span className="text-[#333] transition-all duration-300 group-hover:text-[#8b5cf6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#8599;
                </span>
              </div>

              {/* Name + Domain */}
              <h3 className="font-[var(--font-sora)] text-sm sm:text-lg font-bold text-white">
                {project.name}
              </h3>
              <div className="mt-1 text-xs text-[#8b5cf6]/60 font-mono">
                {project.domain}
              </div>

              {/* Description */}
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-[#666] hidden sm:block">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-[#888] uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="mt-5 h-px w-8 rounded-full bg-[#8b5cf6]/20 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#a78bfa] group-hover:via-[#8b5cf6] group-hover:to-[#38bdf8]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
