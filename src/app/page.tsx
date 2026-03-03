import Script from "next/script";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
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

      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(91,90,247,0.22)_0%,rgba(34,211,238,0.10)_35%,rgba(244,179,106,0.10)_60%,rgba(247,247,251,0)_72%)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        </div>

        <Container>
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--mv-border)] bg-white/70 px-3 py-1 text-xs font-semibold text-[color:var(--mv-ink)] backdrop-blur">
                AI venture studio
                <span className="text-slate-300">|</span>
                Products + proven systems
              </div>

              <div className="mt-6">
                <H1>Build ventures. Deploy leverage.</H1>
              </div>
              <div className="mt-5 max-w-xl">
                <Lead>
                  Motion Ventures is an AI venture studio. We build new ventures—and we help existing
                  businesses step into 2026 with modern websites, operations, and growth systems.
                </Lead>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/studio" variant="primary">
                  Partner with us
                </Button>
                <Button href="/assessment" variant="secondary">
                  Free AI business assessment
                </Button>
              </div>

              <div className="mt-4 text-sm text-[color:var(--mv-muted)]">
                Sophisticated systems. Plain-English delivery.
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Two tracks
              </div>
              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl border border-[var(--mv-border)] bg-[color:var(--mv-canvas)] p-5">
                  <div className="text-sm font-bold text-[color:var(--mv-ink)]">Ventures</div>
                  <div className="mt-1 text-sm text-[color:var(--mv-muted)]">
                    We incubate, build, and launch AI-first products.
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--mv-border)] bg-[color:var(--mv-canvas)] p-5">
                  <div className="text-sm font-bold text-[color:var(--mv-ink)]">Services</div>
                  <div className="mt-1 text-sm text-[color:var(--mv-muted)]">
                    We modernize customer-facing businesses with proven systems.
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <Link href="/ventures" className="font-semibold text-[color:var(--mv-primary)] hover:underline">
                  Explore ventures →
                </Link>
                <Link href="/services" className="font-semibold text-[color:var(--mv-primary)] hover:underline">
                  View services →
                </Link>
              </div>
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
