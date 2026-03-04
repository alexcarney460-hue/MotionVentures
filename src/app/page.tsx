import Script from "next/script";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import HeroVisual from "@/components/HeroVisual";
import NatureReel from "@/components/NatureReel";
import { Button, Card, Container, H1, H2, Lead, Section } from "@/components/ui";
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

      {/* Hero (special) */}
      <Section className="relative overflow-hidden py-16 md:py-24">
        {/* background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_70%)]" />
          <div className="absolute inset-0 opacity-[0.18] mix-blend-multiply [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_62%)]">
            <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-cyan-300 blur-3xl" />
            <div className="absolute -bottom-28 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-indigo-300 blur-3xl" />
            <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-amber-200 blur-3xl" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65)_0%,rgba(247,247,251,0.15)_58%,rgba(247,247,251,0)_74%)]" />
        </div>

        <Container>
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* left copy */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                AI studio
                <span className="text-white/20">|</span>
                Automation + systems
              </div>

              <div className="mt-6">
                <H1>Your AI Studio for Automation.</H1>
              </div>
              <div className="mt-5 max-w-xl">
                <Lead>
                  Motion Ventures is a studio-first team. We build new ventures—and we help existing
                  businesses deploy practical AI workflows, premium web experiences, and operational
                  systems that compound.
                </Lead>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/assessment" variant="primary">
                  Free AI business assessment
                </Button>
                <Button href="/services" variant="secondary">
                  See services
                </Button>
              </div>

              <div className="mt-5 grid max-w-xl grid-cols-2 gap-3 text-xs text-[color:var(--mv-muted)] sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--mv-border)] bg-white/70 px-3 py-2 backdrop-blur">
                  Strategy → build plan
                </div>
                <div className="rounded-2xl border border-[var(--mv-border)] bg-white/70 px-3 py-2 backdrop-blur">
                  Automations + agents
                </div>
                <div className="rounded-2xl border border-[var(--mv-border)] bg-white/70 px-3 py-2 backdrop-blur">
                  Premium web + ops
                </div>
              </div>
            </div>

            {/* right hero visual (no card) */}
            <div className="lg:col-span-6">
              <HeroVisual src="/brand/hero-dark.png" className="" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Macro-nature (intelligence from nature) */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                Intelligence from nature
                <span className="text-white/20">|</span>
                macro studies
              </div>
              <div className="mt-5">
                <H2>Design language with a pulse.</H2>
              </div>
              <p className="mt-3 text-sm text-[color:var(--mv-muted)]">
                We favor visuals that feel alive—organic structure, minimal motion, and cinematic
                restraint.
              </p>
            </div>
            <div className="lg:col-span-7">
              <NatureReel images={["/brand/nature/mv-macro-nature-6.png"]} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Current projects */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <H2>Current projects</H2>
            <p className="mt-3 text-sm text-white/55">
              Active builds and operators we’re shipping for right now.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card
              title="Viking Labs"
              description="Cinematic e-commerce + marketing automation system."
              href="https://vikinglabs.co"
            />
            <Card
              title="BlueLabel Wholesale"
              description="Wholesale storefront rebuild + product catalog foundations."
              href="https://bluelabelwholesale.com"
            />
            <Card
              title="Fresno Pool Care"
              description="Local services site + lead capture and follow-up system."
              href="https://fresnopoolcare.com"
            />
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <H2>What we ship</H2>
            <p className="mt-3 text-sm text-white/55">
              The studio builds ventures; the services arm deploys the same core primitives for
              businesses that want results without complexity.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card
              title="Brand + website"
              description="A modern, fast site and brand toolkit that builds trust instantly."
            />
            <Card
              title="Operations + workflows"
              description="Lead routing, scheduling, follow-up, and admin systems with guardrails."
            />
            <Card
              title="Growth systems"
              description="Premium loops for content, distribution, and measurement that compound over time."
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-[linear-gradient(180deg,var(--mv-canvas),var(--mv-mist))]">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Start here</div>
                <div className="mt-2 font-[var(--font-sora)] text-2xl font-extrabold tracking-tight text-white/90">
                  Get a free AI business assessment.
                </div>
                <p className="mt-2 text-sm text-white/55">
                  We’ll review your website, follow-up, and operations—and send back a clear,
                  non-technical offer.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button href="/assessment" variant="primary">
                  Get the free assessment
                </Button>
                <Button href="/services" variant="secondary">
                  See services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission Control preview (bottom) */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10">
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
                <p className="mt-3 text-sm text-white/55">
                  Simulated pro-SaaS UI that mirrors real workflow orchestration: brief → draft →
                  compliance → publish.
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
                          <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <div className="text-[10px] font-semibold text-white/45">{s.k}</div>
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
