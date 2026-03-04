import Script from "next/script";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import HeroVisual from "@/components/HeroVisual";
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

      {/* Capabilities */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <H2>What we ship</H2>
            <p className="mt-3 text-sm text-[color:var(--mv-muted)]">
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
          <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-10 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Start here</div>
                <div className="mt-2 font-[var(--font-sora)] text-2xl font-extrabold tracking-tight text-[color:var(--mv-ink)]">
                  Get a free AI business assessment.
                </div>
                <p className="mt-2 text-sm text-[color:var(--mv-muted)]">
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

      <SiteFooter />
    </div>
  );
}
