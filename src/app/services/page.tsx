import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, H1, H2, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <div className="light-page min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Services for existing businesses</H1>
            <div className="mt-5">
              <Lead>
                A complete customer-facing solution: brand toolkit, website, CRM,
                email campaigns, and specialized AI agents—quoted after assessment.
              </Lead>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/assessment" variant="primary">
                Free AI assessment
              </Button>
              <Button href="#intelligence" variant="secondary">
                AI Intelligence Suite
              </Button>
              <Button href="#packages" variant="secondary">
                View packages
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Specialized Agents — featured, full-bleed */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/nature/mv-macro-nature-1.jpg"
            alt=""
            fill
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--mv-canvas)] via-[var(--mv-canvas)]/80 to-[var(--mv-canvas)]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--mv-canvas)] via-transparent to-[var(--mv-canvas)]/60" />
        </div>
        <Container>
          <div className="relative py-24 md:py-32">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-emerald)]/25 bg-[var(--mv-emerald)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-emerald)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-emerald)]" />
                Featured service
              </div>
              <h2 className="font-[var(--font-sora)] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white/95 sm:text-5xl">
                Specialized AI agents<br />
                <span className="text-[var(--mv-primary)]">built for your industry.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/50">
                We develop AI agents custom-built for your specific industry—not
                generic, off-the-shelf tools. Each agent is designed around your
                workflows, your customers, and your operational context.
              </p>

              <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                {[
                  "Reception + scheduling",
                  "Lead qualification",
                  "Inventory management",
                  "Content generation",
                  "Customer support",
                  "Compliance + review",
                  "Reporting + analytics",
                  "Handoff + routing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="h-px w-4 flex-shrink-0 rounded-full bg-[var(--mv-primary)]/50" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/assessment" variant="primary">
                  Get a free assessment →
                </Button>
                <Button href="#packages" variant="secondary">
                  View all packages
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* AI Intelligence Suite */}
      <section id="intelligence" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)] via-[var(--mv-primary)]/5 to-[var(--mv-canvas)]" />
        <Container>
          <div className="relative py-24 md:py-32">
            <div className="mb-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-primary)]/25 bg-[var(--mv-primary)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-primary)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-primary)]" />
                Synthetic Advisory
              </div>
              <h2 className="font-[var(--font-sora)] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white/95 sm:text-5xl">
                AI Intelligence Suite
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/50">
                Test ideas before you spend. Get expert-level debate on demand.
                Synthetic research grounded in real data—delivered in minutes,
                not weeks.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* CrowdTest Sessions */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mv-primary)]">
                    CrowdTest
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    CrowdTest Sessions
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div>
                      <span className="text-lg font-extrabold tracking-tight text-white/90">$49</span>
                      <span className="text-[10px] font-semibold text-white/45"> Quick</span>
                    </div>
                    <span className="text-white/25">/</span>
                    <div>
                      <span className="text-lg font-extrabold tracking-tight text-white/90">$149</span>
                      <span className="text-[10px] font-semibold text-white/45"> Deep Research</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/55">
                  50-500 synthetic personas grounded in your real customer data
                  react to your product, ad, or idea—before you spend a dollar.
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-white/55">
                  <li>Sentiment analysis + purchase intent scoring</li>
                  <li>Price willingness mapping</li>
                  <li>Demographic breakdowns (age, gender, location)</li>
                  <li>Individual persona reactions with objections + praise</li>
                  <li>Shareable results dashboard</li>
                  <li>Data-grounded personas from your reviews, CRM, or website</li>
                </ul>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-white/55">
                  <span className="font-semibold text-white/85">Best for:</span> Testing
                  ads before spending. Validating product ideas. Optimizing messaging.
                  Political campaign testing.
                </div>
                <div className="mt-6">
                  <Button href="/contact" variant="secondary">
                    Book a session
                  </Button>
                </div>
              </div>

              {/* Think Tank Sessions */}
              <div className="relative rounded-2xl border border-[var(--mv-primary)]/30 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
                <div className="absolute -top-3 left-6 rounded-full bg-[var(--mv-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most impactful
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mv-primary)]">
                    Think Tank
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    Think Tank Sessions
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div>
                      <span className="text-lg font-extrabold tracking-tight text-white/90">$99</span>
                      <span className="text-[10px] font-semibold text-white/45"> Standard</span>
                    </div>
                    <span className="text-white/25">/</span>
                    <div>
                      <span className="text-lg font-extrabold tracking-tight text-white/90">$299</span>
                      <span className="text-[10px] font-semibold text-white/45"> Deep Research</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/55">
                  8-12 real researched domain experts debate your question through
                  multiple adversarial rounds—surfacing what one perspective alone
                  would miss.
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-white/55">
                  <li>Multi-round adversarial debate (3-5 rounds)</li>
                  <li>Consensus points + unresolved tensions</li>
                  <li>Emergent insights + strategic verdict</li>
                  <li>Risk mapping with likelihood and impact</li>
                  <li>Actionable next steps</li>
                  <li>Shareable results with source citations</li>
                </ul>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-white/55">
                  <span className="font-semibold text-white/85">Best for:</span> Strategic
                  decisions. Market entry analysis. Competitive positioning. Policy
                  impact. Investment thesis testing.
                </div>
                <div className="mt-6">
                  <Button href="/contact" variant="primary">
                    Book a session
                  </Button>
                </div>
              </div>

              {/* Intelligence Retainer */}
              <div className="rounded-2xl border border-[var(--mv-emerald)]/20 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-emerald)]">
                    Retainer
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    Intelligence Retainer
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-extrabold tracking-tight text-white/90">$999</span>
                    <span className="text-[10px] font-semibold text-white/45">/month</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/55">
                  Unlimited crowd testing and expert debates on tap—for teams
                  making frequent strategic decisions.
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-white/55">
                  <li>Unlimited CrowdTest sessions</li>
                  <li>10 Think Tank sessions per month</li>
                  <li>Saved audience profiles for all your businesses</li>
                  <li>Priority turnaround (results in under 1 hour)</li>
                  <li>Custom expert panels tailored to your industry</li>
                </ul>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-white/55">
                  <span className="font-semibold text-white/85">Best for:</span> Agencies,
                  consultancies, and businesses making frequent strategic decisions.
                </div>
                <div className="mt-6">
                  <Button href="/contact" variant="primary">
                    Contact us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <Section id="packages">
        <Container>
          <div className="mb-10">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              Packages
            </div>
            <H2>Choose your engagement</H2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Foundation */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mv-primary)]">
                  Foundation
                </div>
                <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                  Modernization package
                </div>
                <div className="mt-2">
                  <span className="text-[10px] font-semibold text-white/45">Starting at </span>
                  <span className="text-lg font-extrabold tracking-tight text-white/90">$2,000</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">
                For local businesses who need to look current, capture leads, and follow
                up fast.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-white/55">
                <li>Branding toolkit (logo, colors, fonts, guidelines)</li>
                <li>Modern website (mobile-first, fast, SEO-ready)</li>
                <li>CRM setup (contacts, pipeline, notes)</li>
                <li>Email campaigns (lead follow-up + re-engagement)</li>
              </ul>
              <div className="mt-6">
                <Button href="/assessment" variant="secondary">
                  Start with assessment
                </Button>
              </div>
            </div>

            {/* Premium */}
            <div className="relative rounded-2xl border border-[var(--mv-primary)]/30 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
              <div className="absolute -top-3 left-6 rounded-full bg-[var(--mv-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Most popular
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mv-primary)]">
                  Premium
                </div>
                <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                  Growth system
                </div>
                <div className="mt-2">
                  <span className="text-[10px] font-semibold text-white/45">Quoted </span>
                  <span className="text-lg font-extrabold tracking-tight text-white/90">Custom</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">
                Always-on content + distribution + improvement. A compounding engine for
                free traffic.
              </p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-white/55">
                <span className="font-semibold text-white/85">The loop:</span> Create →
                Publish → Track → Learn → Improve
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-white/55">
                <li>Social posts generated and scheduled</li>
                <li>Local SEO pages that compound over time</li>
                <li>Lead capture + fast follow-up workflows</li>
                <li>Weekly scorecard + continuous improvement</li>
              </ul>
              <div className="mt-6">
                <Button href="/premium-growth-intake" variant="primary">
                  Apply (questionnaire)
                </Button>
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-[var(--mv-emerald)]/20 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-emerald)]">
                  Enterprise
                </div>
                <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                  Full AI transformation
                </div>
                <div className="mt-2">
                  <span className="text-[10px] font-semibold text-white/45">Starting at </span>
                  <span className="text-lg font-extrabold tracking-tight text-white/90">$10,000</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">
                For businesses ready for a complete AI-powered operational overhaul with
                dedicated support.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-white/55">
                <li>Everything in Foundation + Premium</li>
                <li>Custom AI agents (reception, scheduling, support)</li>
                <li>Multi-channel automation (email, SMS, chat)</li>
                <li>Dedicated account manager</li>
                <li>Priority development + weekly strategy calls</li>
                <li>Custom integrations (POS, ERP, APIs)</li>
                <li>90-day optimization sprint included</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="primary">
                  Contact us
                </Button>
              </div>
            </div>
          </div>

          {/* Add-ons row */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Agents add-on */}
            <div className="rounded-2xl border border-[var(--mv-emerald)]/20 bg-[var(--mv-emerald)]/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-emerald)]">
                Add-on · Agents
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-lg font-bold tracking-tight text-white/90">
                Specialized AI agents (quoted)
              </div>
              <p className="mt-2 text-sm text-white/55">
                Custom AI agents built specifically for your industry and operational
                bottlenecks—reception, lead qualification, content, scheduling, admin
                tasks, handoffs, and more.
              </p>
              <div className="mt-4">
                <Button href="/assessment" variant="primary">
                  Get a free assessment →
                </Button>
              </div>
            </div>

            {/* DIY Guide */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-3xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mv-primary)]">
                    DIY
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    Get the guide
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-white/45">Price</div>
                  <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">
                    $199
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">
                A practical playbook to modernize your business using AI agents—what to
                automate, what to measure, and how to roll it out safely.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Button href="https://venmo.com/u/alexablaze559?txn=pay&note=AI+Business+Guide&amount=199" variant="primary">
                  Pay $199 via Venmo →
                </Button>
                <div className="text-[11px] text-white/35">Reply to the Venmo transaction with your email — guide delivered within 24 hrs.</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* How we engage */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <H2>How we engage</H2>
            <p className="mt-3 text-sm text-[color:var(--mv-muted)]">
              We analyze your business first. Then we send a clear offer with a
              recommended package and optional upgrades.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Assessment",
                desc: "Website, follow-up, ops, and gaps.",
              },
              {
                step: "Step 2",
                title: "Offer",
                desc: "Clear scope, timeline, and next steps.",
              },
              {
                step: "Step 3",
                title: "Build + Improve",
                desc: "Implementation + weekly iteration.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6"
              >
                <div className="text-xs font-bold text-[color:var(--mv-primary)]">
                  {s.step}
                </div>
                <div className="mt-2 font-bold text-white/90">{s.title}</div>
                <p className="mt-2 text-sm text-white/55">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/assessment" variant="primary">
              Get the free assessment
            </Button>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
