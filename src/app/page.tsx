import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import HeroSceneLoader from "@/components/hero/HeroSceneLoader";
import { Button, Container, Section } from "@/components/ui";
import { orgJsonLd } from "./schema";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />

      <SiteHeader />

      {/* ── HERO — full viewport, cinematic Three.js neural network ── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        {/* Three.js cinematic particle system */}
        <HeroSceneLoader />

        <Container>
          <div className="relative flex min-h-screen flex-col justify-center py-20 sm:py-28">
            <div className="max-w-2xl">
              <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-primary)]" />
                AI Studio · Automations · Agents
              </div>

              <h1 className="font-[var(--font-sora)] text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white/95">
                Your<br />
                <span className="text-[var(--mv-primary)]">AI Studio.</span>
              </h1>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/55">
                We build new ventures—and we help existing businesses deploy
                practical AI workflows, premium web experiences, and
                specialized agents custom-built for your industry.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/assessment" variant="primary">
                  Free AI Assessment →
                </Button>
                <Button href="/services" variant="secondary">
                  View Services
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {["Strategy → Build", "AI Automations", "Premium Web", "Specialized Agents"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/20 sm:bottom-10">
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-white/20" />
          <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── WHAT WE BUILD — 3 pillars ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              What we ship
            </div>
            <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white/90 sm:text-4xl">
              Studio-grade capabilities.<br />Built for real results.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Brand + Website",
                desc: "A modern, fast site and brand toolkit that builds trust instantly. Mobile-first, SEO-ready, conversion-focused.",
                accent: "var(--mv-sapphire)",
              },
              {
                num: "02",
                title: "AI Automations",
                desc: "Lead routing, scheduling, follow-up, content pipelines, and admin workflows—fully automated with guardrails.",
                accent: "var(--mv-primary)",
              },
              {
                num: "03",
                title: "Specialized Agents",
                desc: "Custom AI agents built for your specific industry. Not off-the-shelf tools—deeply contextualized systems that understand your operations.",
                accent: "var(--mv-emerald)",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:rounded-3xl sm:p-8"
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest opacity-40"
                  style={{ color: item.accent }}
                >
                  {item.num}
                </div>
                <div className="mt-4 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {item.desc}
                </p>
                <div
                  className="mt-6 h-px w-10 rounded-full transition-all duration-300 group-hover:w-20"
                  style={{ background: item.accent + "70" }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── SPECIALIZED AI AGENTS — full-bleed cinematic ── */}
      <section className="relative overflow-hidden">
        {/* Neural network image as full-bleed background */}
        <div className="absolute inset-0">
          <Image
            src="/brand/nature/mv-macro-nature-5.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--mv-canvas)] via-[var(--mv-canvas)]/75 to-[var(--mv-canvas)]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--mv-canvas)] via-transparent to-[var(--mv-canvas)]/70" />
        </div>

        <Container>
          <div className="relative py-20 sm:py-32 md:py-44">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-emerald)]/25 bg-[var(--mv-emerald)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-emerald)] sm:mb-8">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-emerald)]" />
                Specialized AI Agents
              </div>

              <h2 className="font-[var(--font-sora)] text-4xl font-extrabold leading-[1] tracking-[-0.03em] text-white/95 sm:text-5xl md:text-[3.75rem]">
                We develop agents<br />
                <span className="text-[var(--mv-primary)]">
                  built for your industry.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                Not generic tools. We build AI agents custom-made for your specific
                industry, workflows, and operational context—so they work the way
                your business actually works.
              </p>

              <div className="mt-8 grid max-w-sm grid-cols-2 gap-y-3 gap-x-6">
                {[
                  "Reception + scheduling",
                  "Lead qualification",
                  "Inventory management",
                  "Content generation",
                  "Customer support",
                  "Compliance + review",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <span className="h-px w-4 flex-shrink-0 rounded-full bg-[var(--mv-primary)]/50" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/assessment" variant="primary">
                  Start with a free assessment →
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CURRENT PROJECTS ── */}
      <Section>
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
                Portfolio
              </div>
              <h2 className="font-[var(--font-sora)] text-2xl font-bold tracking-[-0.02em] text-white/90 sm:text-3xl">
                Current projects
              </h2>
              <p className="mt-2 max-w-sm text-sm text-white/40">
                Active builds and operators we&apos;re shipping for right now.
              </p>
            </div>
            <Link
              href="/ventures"
              className="hidden items-center gap-1 text-sm text-white/35 transition hover:text-white/65 sm:flex"
            >
              All ventures <span>→</span>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Viking Labs",
                tag: "E-Commerce + AI",
                description:
                  "Cinematic e-commerce store with marketing automation system and AI content engine.",
                href: "https://vikinglabs.co",
                accent: "var(--mv-sapphire)",
              },
              {
                title: "BlueLabel Wholesale",
                tag: "Wholesale Platform",
                description:
                  "Wholesale storefront rebuild with full product catalog architecture and B2B flows.",
                href: "https://bluelabelwholesale.com",
                accent: "var(--mv-primary)",
              },
              {
                title: "Fresno Pool Care",
                tag: "Local Services",
                description:
                  "Local services site with lead capture, follow-up automation, and booking system.",
                href: "https://fresnopoolcare.com",
                accent: "var(--mv-emerald)",
              },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:rounded-3xl sm:p-7"
              >
                <div
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: p.accent, opacity: 0.65 }}
                >
                  {p.tag}
                </div>
                <div className="mt-3 font-[var(--font-sora)] text-lg font-bold tracking-tight text-white/90">
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {p.description}
                </p>
                <div
                  className="mt-5 flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                  style={{ color: p.accent }}
                >
                  Visit site <span>→</span>
                </div>
                {/* Animated bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    background: `linear-gradient(to right, ${p.accent}50, transparent)`,
                  }}
                />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── DESIGN LANGUAGE — full-bleed cinematic ── */}
      <section className="relative overflow-hidden">
        {/* Full-bleed glowing neural network */}
        <div className="absolute inset-0">
          <Image
            src="/brand/nature/mv-macro-nature-2.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            sizes="100vw"
          />
          {/* Right-to-left: text on the right, image bleeds through left */}
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--mv-canvas)] via-[var(--mv-canvas)]/75 to-[var(--mv-canvas)]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)] via-transparent to-[var(--mv-canvas)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_20%_50%,rgba(56,189,248,0.08),transparent)]" />
        </div>

        <Container>
          <div className="relative py-20 sm:py-32 md:flex md:justify-end md:py-44">
            <div className="max-w-xl">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-sapphire)]">
                Design philosophy
              </div>
              <h2 className="font-[var(--font-sora)] text-4xl font-extrabold leading-[1] tracking-[-0.03em] text-white/95 sm:text-5xl md:text-[3.75rem]">
                Intelligence<br />
                <span className="text-[var(--mv-sapphire)]">from nature.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/50">
                Every system we build draws from organic structure—self-organizing,
                adaptive, and always evolving. The same patterns that govern
                mycelial networks guide the agents we build.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { label: "Emergent intelligence", color: "var(--mv-sapphire)" },
                  { label: "Distributed reasoning", color: "var(--mv-primary)" },
                  { label: "Continuous improvement", color: "var(--mv-emerald)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-white/55"
                  >
                    <span
                      className="h-px w-8 flex-shrink-0 rounded-full"
                      style={{ background: item.color + "60" }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── EARLY ADOPTER — the AI opportunity ── */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur sm:rounded-3xl sm:p-10 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_50%,rgba(56,189,248,0.06),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(139,92,246,0.06),transparent)]" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-coral)]/25 bg-[var(--mv-coral)]/5 px-4 py-1.5 text-xs font-semibold text-[var(--mv-coral)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-coral)]" />
                  The window is open — now
                </div>
                <h2 className="font-[var(--font-sora)] text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white/95 sm:text-4xl md:text-[2.75rem]">
                  Adding AI to your business today is like buying
                  <span className="text-[var(--mv-sapphire)]"> Bitcoin in 2013.</span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">
                  The businesses that moved early on the internet dominated their industries
                  for decades. The ones that adopted crypto infrastructure early built
                  billion-dollar ecosystems. AI is that same inflection point — except
                  the curve is steeper and the window is shorter.
                </p>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
                  Right now, less than 5% of small and mid-size businesses use AI in any
                  meaningful way. That means early movers don&apos;t just get an edge — they
                  get a <span className="font-semibold text-white/80">structural advantage</span> that
                  compounds every month their competitors wait.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    year: "2010–2015",
                    event: "Early internet adopters",
                    result: "Built the brands that still dominate search, social, and e-commerce today",
                    color: "var(--mv-sapphire)",
                  },
                  {
                    year: "2015–2020",
                    event: "Early crypto adopters",
                    result: "Created new financial infrastructure, DeFi protocols, and trillion-dollar ecosystems",
                    color: "var(--mv-primary)",
                  },
                  {
                    year: "2024–2027",
                    event: "Early AI adopters",
                    result: "Automating operations, outpacing competitors, and building defensible moats — right now",
                    color: "var(--mv-emerald)",
                  },
                ].map((item) => (
                  <div
                    key={item.year}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/85">{item.event}</div>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">{item.result}</p>
                  </div>
                ))}

                <div className="mt-2 rounded-2xl border border-[var(--mv-emerald)]/20 bg-[var(--mv-emerald)]/5 p-5">
                  <p className="text-sm font-semibold text-[var(--mv-emerald)]">
                    The question isn&apos;t whether AI will transform your industry.
                    It&apos;s whether you&apos;ll be the one leading that transformation — or
                    reacting to it.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/assessment" variant="primary">
                Get your free AI assessment →
              </Button>
              <Button href="/services" variant="secondary">
                See how we help
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-[linear-gradient(180deg,var(--mv-canvas),var(--mv-mist))]">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur sm:rounded-3xl sm:p-12 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,rgba(139,92,246,0.12),transparent)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
                Start here
              </div>
              <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white/90 sm:text-4xl md:text-5xl">
                Get a free AI<br />business assessment.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-white/45">
                We&apos;ll review your website, workflows, and operations—then
                send back a clear, non-technical plan with recommendations.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/assessment" variant="primary">
                  Get the free assessment →
                </Button>
                <Button href="/services" variant="secondary">
                  View all services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── MISSION CONTROL TEASER ── */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  Mission Control
                  <span className="text-white/20">|</span>
                  agent workflows
                </div>
                <div className="mt-4 font-[var(--font-sora)] text-2xl font-extrabold tracking-tight text-white/90 sm:text-3xl">
                  A command center for content engines.
                </div>
                <p className="mt-3 text-sm text-white/50">
                  Simulated pro-SaaS UI that mirrors real workflow orchestration:
                  brief → draft → compliance → publish.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href="/mission-control" variant="primary">
                    Open Mission Control
                  </Button>
                  <Button href="/assessment" variant="secondary">
                    Start with an assessment
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/25">
                  <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold text-white/60">
                    Live simulation snapshot
                  </div>
                  <div className="p-4">
                    <div className="grid gap-3">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { k: "Workflows", v: "3" },
                          { k: "Agents", v: "6" },
                          { k: "Drafts", v: "12" },
                        ].map((s) => (
                          <div
                            key={s.k}
                            className="rounded-2xl border border-white/10 bg-white/5 p-3"
                          >
                            <div className="text-[10px] font-semibold text-white/45">
                              {s.k}
                            </div>
                            <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">
                              {s.v}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-extrabold tracking-tight text-white/90">
                            Daily Content Engine
                          </div>
                          <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            Running
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-white/45">
                          Catalyst → Maven → Echo → Tags → Guardian → Publisher
                        </div>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
                          <div className="h-1.5 w-[58%] rounded-full bg-[var(--mv-primary)]/70" />
                        </div>
                      </div>

                      <div className="grid gap-2 font-mono text-[11px] leading-relaxed text-white/50">
                        <div>23:45:12 Catalyst → angle selected</div>
                        <div>23:45:18 Maven → brief generated</div>
                        <div>23:45:31 Guardian → passed (0.18)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
