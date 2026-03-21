"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NatureImage from "./NatureImage";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    num: "01",
    title: "AI-Native Intelligence",
    desc: "Every decision backed by synthetic customer reactions and expert debate simulation.",
  },
  {
    num: "02",
    title: "Full-Stack Automation",
    desc: "CRM, lead gen, content pipelines, and operational systems that run autonomously.",
  },
  {
    num: "03",
    title: "Premium Experiences",
    desc: "Dark themes, GSAP animations, and interfaces that make competitors look dated.",
  },
  {
    num: "04",
    title: "Rapid Deployment",
    desc: "Idea to production in weeks, not months. AI-accelerated development at startup speed.",
  },
  {
    num: "05",
    title: "Data-Driven Growth",
    desc: "Every system we build generates data. Every dataset feeds the next decision.",
  },
  {
    num: "06",
    title: "Venture Operations",
    desc: "We don't just build it \u2014 we run it. Ongoing operations, optimization, and scaling.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const items = sectionRef.current.querySelectorAll("[data-feature]");

    gsap.from(headingRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
    });

    gsap.from(items, {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-[#0a0a0a]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="mb-10 sm:mb-16 md:mb-20 max-w-3xl">
          <div className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#6366f1] uppercase">
            Capabilities
          </div>
          <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Everything you need to
            <br />
            <span className="text-gradient-accent">move faster.</span>
          </h2>
        </div>

        <div className="mb-12 sm:mb-16 h-48 sm:h-64 md:h-80">
          <NatureImage
            src="/brand/nature/mv-macro-nature-1.jpg"
            alt="Mycelium intelligence network"
            className="h-full w-full"
          />
        </div>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.06]">
          {FEATURES.map((feature) => (
            <div
              key={feature.num}
              data-feature
              className="group relative bg-[#0e0e0e] p-5 sm:p-8 transition-colors duration-300 hover:bg-[#141414]"
            >
              <span className="font-mono text-xs font-bold text-[#8b5cf6]/40 group-hover:text-[#8b5cf6]/80 transition-colors duration-300">
                {feature.num}
              </span>
              <h3 className="mt-4 font-[var(--font-sora)] text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#666]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
