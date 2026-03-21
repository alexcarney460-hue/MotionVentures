import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, Section } from "@/components/ui";

export const metadata = {
  title: "Synthetic Advisory — AI Intelligence Suite",
  description:
    "Make million-dollar decisions without million-dollar consultants. CrowdTest simulates your customers. Think Tank simulates expert advisors. Starting at $49/session.",
  openGraph: {
    title: "Synthetic Advisory — CrowdTest + Think Tank",
    description:
      "AI focus groups and expert debate simulation. Test ideas on hundreds of synthetic personas grounded in your real customer data. Get consulting-grade strategic insight starting at $49.",
    type: "website" as const,
    siteName: "Motion Ventures",
    url: "https://motionventures.co/intelligence",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Synthetic Advisory — CrowdTest + Think Tank",
    description:
      "AI focus groups and expert debate simulation. Consulting-grade intelligence at SaaS prices. Starting at $49/session.",
  },
};

const USE_CASES = [
  { question: "Should we launch this product?", product: "CrowdTest", color: "var(--mv-sapphire)" },
  { question: "How will the market react to our pricing?", product: "CrowdTest", color: "var(--mv-sapphire)" },
  { question: "Should we expand internationally?", product: "Think Tank", color: "var(--mv-primary)" },
  { question: "What\u2019s our best go-to-market strategy?", product: "Think Tank", color: "var(--mv-primary)" },
  { question: "Will this ad campaign convert?", product: "CrowdTest", color: "var(--mv-sapphire)" },
  { question: "What are the risks we\u2019re not seeing?", product: "Think Tank", color: "var(--mv-primary)" },
] as const;

const STEPS = [
  {
    num: "01",
    title: "Describe Your Question",
    desc: "Tell us what you\u2019re testing or deciding. A product idea, an ad campaign, a market entry strategy, a policy proposal.",
    accent: "var(--mv-sapphire)",
  },
  {
    num: "02",
    title: "We Research & Simulate",
    desc: "For CrowdTest: we build personas from your real customer data. For Think Tank: we research actual domain experts and their published positions.",
    accent: "var(--mv-primary)",
  },
  {
    num: "03",
    title: "Get Actionable Intelligence",
    desc: "Receive a full analysis with sentiment data, expert consensus, emergent insights, risk maps, and specific next steps. Shareable with your team.",
    accent: "var(--mv-emerald)",
  },
] as const;

export default function IntelligencePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#111_0%,#0a0a0a_70%)]" />
        {/* Decorative radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(168,85,247,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_60%,rgba(34,211,238,0.04),transparent)]" />

        <Container>
          <div className="relative py-24 sm:py-32 md:py-40">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-primary)]/25 bg-[var(--mv-primary)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-primary)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-primary)]" />
                AI Intelligence Suite
              </div>

              <h1 className="font-[var(--font-playfair)] text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
                Synthetic<br />
                <span className="text-[var(--mv-primary)]">Advisory.</span>
              </h1>

              <p className="mt-4 max-w-xl text-xl font-medium leading-snug text-[#999]">
                Make million-dollar decisions without million-dollar consultants.
              </p>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#888]">
                CrowdTest simulates your customers. Think Tank simulates expert
                advisors. Together, they give you strategic intelligence that used
                to require McKinsey.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary">
                  Book a Session &mdash; $99
                </Button>
                <Button href="#products" variant="secondary">
                  See how it works
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              How it works
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              Three steps to strategic clarity.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] p-5 shadow-none transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-none sm:rounded-3xl sm:p-8"
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest opacity-60"
                  style={{ color: step.accent }}
                >
                  {step.num}
                </div>
                <div className="mt-4 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                  {step.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#888]">
                  {step.desc}
                </p>
                <div
                  className="mt-6 h-px w-10 rounded-full transition-all duration-300 group-hover:w-20"
                  style={{ background: step.accent + "70" }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PRODUCT COMPARISON ── */}
      <Section id="products">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-sapphire)]">
              Two products, one mission
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              Choose your intelligence tool.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* CrowdTest Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] p-6 shadow-none transition duration-300 hover:border-[var(--mv-sapphire)]/40 hover:shadow-none sm:rounded-3xl sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,211,238,0.04),transparent)]" />
              <div className="relative">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--mv-sapphire)]/25 bg-[var(--mv-sapphire)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-sapphire)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--mv-sapphire)]" />
                  CrowdTest
                </div>
                <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold tracking-tight text-white">
                  Test reactions before you spend.
                </h3>
                <ul className="mt-5 grid gap-3 text-sm text-[#888]">
                  {[
                    "50\u2013500 synthetic personas",
                    "Grounded in YOUR customer data",
                    "Instant sentiment & purchase intent",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-px w-4 flex-shrink-0 rounded-full bg-[var(--mv-sapphire)]/50" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <span className="text-[10px] font-semibold text-[#666]">Starting at </span>
                  <span className="text-lg font-extrabold tracking-tight text-white">$49</span>
                  <span className="text-sm text-[#666]">/session</span>
                </div>
                <div className="mt-6">
                  <Button href="/intelligence/crowdtest" variant="secondary">
                    Learn more
                  </Button>
                </div>
              </div>
            </div>

            {/* Think Tank Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] p-6 shadow-none transition duration-300 hover:border-[var(--mv-primary)]/40 hover:shadow-none sm:rounded-3xl sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(168,85,247,0.04),transparent)]" />
              <div className="relative">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--mv-primary)]/25 bg-[var(--mv-primary)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-primary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--mv-primary)]" />
                  Think Tank
                </div>
                <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold tracking-tight text-white">
                  Expert debate before you decide.
                </h3>
                <ul className="mt-5 grid gap-3 text-sm text-[#888]">
                  {[
                    "8\u201312 real researched experts",
                    "Multi-round adversarial debate",
                    "Emergent strategic insights",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-px w-4 flex-shrink-0 rounded-full bg-[var(--mv-primary)]/50" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <span className="text-[10px] font-semibold text-[#666]">Starting at </span>
                  <span className="text-lg font-extrabold tracking-tight text-white">$99</span>
                  <span className="text-sm text-[#666]">/session</span>
                </div>
                <div className="mt-6">
                  <Button href="/intelligence/thinktank" variant="secondary">
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── USE CASES GRID ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-emerald)]">
              Use cases
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              What will you ask?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div
                key={uc.question}
                className="group rounded-2xl border border-white/[0.06] bg-[#111] p-5 shadow-none transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-none"
              >
                <p className="text-sm font-medium leading-relaxed text-[#ccc]">
                  &ldquo;{uc.question}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: uc.color }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: uc.color }}
                  >
                    {uc.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PRICING ── */}
      <Section id="pricing">
        <Container>
          <div className="mb-10">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              Pricing
            </div>
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
              Transparent, session-based pricing.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* CrowdTest */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 shadow-none sm:rounded-3xl sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-sapphire)]">
                CrowdTest
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                Customer simulation
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="text-lg font-extrabold tracking-tight text-white">$49</span>
                  <span className="ml-1 text-xs text-[#666]">Quick test (50 personas)</span>
                </div>
                <div>
                  <span className="text-lg font-extrabold tracking-tight text-white">$149</span>
                  <span className="ml-1 text-xs text-[#666]">Deep analysis (500 personas)</span>
                </div>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-[#888]">
                <li>Sentiment breakdown</li>
                <li>Purchase intent scoring</li>
                <li>Top objections & concerns</li>
                <li>Segment-level insights</li>
              </ul>
              <div className="mt-6">
                <Button href="/intelligence/crowdtest" variant="secondary">
                  Learn more
                </Button>
              </div>
            </div>

            {/* Think Tank */}
            <div className="relative rounded-2xl border border-[var(--mv-primary)]/30 bg-[#111] p-5 shadow-none sm:rounded-3xl sm:p-8">
              <div className="absolute -top-3 left-6 rounded-full bg-[var(--mv-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Most popular
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-primary)]">
                Think Tank
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                Expert advisory panel
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="text-lg font-extrabold tracking-tight text-white">$99</span>
                  <span className="ml-1 text-xs text-[#666]">Standard (8 experts)</span>
                </div>
                <div>
                  <span className="text-lg font-extrabold tracking-tight text-white">$299</span>
                  <span className="ml-1 text-xs text-[#666]">Deep research (12 experts)</span>
                </div>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-[#888]">
                <li>Multi-round adversarial debate</li>
                <li>Expert consensus mapping</li>
                <li>Risk & opportunity analysis</li>
                <li>Actionable recommendations</li>
              </ul>
              <div className="mt-6">
                <Button href="/intelligence/thinktank" variant="primary">
                  Learn more
                </Button>
              </div>
            </div>

            {/* Retainer */}
            <div className="rounded-2xl border border-[var(--mv-emerald)]/20 bg-[#111] p-5 shadow-none sm:rounded-3xl sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-emerald)]">
                Retainer
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                Ongoing intelligence
              </div>
              <div className="mt-4">
                <span className="text-lg font-extrabold tracking-tight text-white">$999</span>
                <span className="ml-1 text-xs text-[#666]">/month</span>
              </div>
              <p className="mt-3 text-sm text-[#888]">
                Unlimited CrowdTest and Think Tank sessions for teams that make
                decisions weekly.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-[#888]">
                <li>Unlimited sessions (both products)</li>
                <li>Priority turnaround</li>
                <li>Dedicated strategist</li>
                <li>Monthly intelligence briefing</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="primary">
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FINAL CTA ── */}
      <Section className="bg-[#111]">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] p-6 shadow-none sm:rounded-3xl sm:p-12 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,rgba(168,85,247,0.06),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_30%,rgba(34,211,238,0.04),transparent)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
                Ready?
              </div>
              <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
                Ready to make<br />smarter decisions?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-[#888]">
                Book your first session &mdash; results in under an hour.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/contact" variant="primary">
                  Get Started
                </Button>
                <Button href="#pricing" variant="secondary">
                  View pricing
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
