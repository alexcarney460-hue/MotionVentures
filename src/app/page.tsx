import Link from "next/link";
import Script from "next/script";
import { orgJsonLd } from "./schema";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">{children}</div>;
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      {children}
    </section>
  );
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "bg-[var(--mv-primary)] text-white shadow-sm shadow-slate-900/10 hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] hover:shadow-md hover:shadow-slate-900/10 focus:ring-[var(--mv-accent)]"
      : "border border-[var(--mv-border)] bg-white text-[var(--mv-primary)] shadow-sm shadow-slate-900/5 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:ring-[var(--mv-accent)]";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-7 shadow-sm shadow-slate-900/5">
      <div className="text-base font-bold tracking-tight text-slate-950">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <header className="sticky top-0 z-40 border-b border-[var(--mv-border)] bg-[color:var(--mv-canvas)]/80 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-slate-950">
              Motion Ventures
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-slate-700 sm:flex">
              <Link href="#packages" className="hover:text-slate-950">
                What we do
              </Link>
              <Link href="#process" className="hover:text-slate-950">
                Process
              </Link>
              <Link href="#faq" className="hover:text-slate-950">
                FAQ
              </Link>
              <Button href="/contact" variant="primary">
                Free AI assessment
              </Button>
            </nav>
            <div className="sm:hidden">
              <Button href="/contact" variant="primary">
                Free AI assessment
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--mv-border)] bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800">
                For non‑technical business owners
                <span className="text-slate-300">|</span>
                Calm, practical implementation
              </div>
              <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-[-0.04em] text-[color:var(--mv-ink)] sm:text-4xl md:text-6xl">
                Get your business back in motion.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-slate-600 sm:text-lg">
                If your website feels dated and your marketing isn’t working like it used to, we’ll
                modernize the whole customer-facing system—so you get more inquiries, faster
                follow‑up, and cleaner operations in 2026.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="w-full sm:w-auto">
                  <Button href="/contact" variant="primary">
                    Get a free AI business assessment
                  </Button>
                </div>
                <div className="w-full sm:w-auto">
                  <Button href="#packages" variant="secondary">
                    What’s included
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-700">
                Minimal tooling. Clear handoff. Monitoring included. No hype.
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                What you’ll notice first
              </div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                <li>
                  <span className="font-semibold text-slate-950">You look current</span>
                  <div className="text-slate-600">A modern site + brand kit that builds trust fast.</div>
                </li>
                <li>
                  <span className="font-semibold text-slate-950">You respond faster</span>
                  <div className="text-slate-600">Leads routed, followed up, and tracked—automatically.</div>
                </li>
                <li>
                  <span className="font-semibold text-slate-950">You stop losing details</span>
                  <div className="text-slate-600">CRM, notes, and weekly numbers stay organized.</div>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-[var(--mv-mist)] p-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-950">No tech learning required:</span> we set it
                up, then show your team the simple day-to-day.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Packages */}
      <Section id="packages">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-balance text-2xl font-bold tracking-[-0.02em] text-[color:var(--mv-ink)] md:text-3xl">
              What we do (in plain English)
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              We analyze your business, then make a clear offer. Most local businesses start with
              modernization (website + CRM + follow‑up). Then we add custom workflows where they
              actually help.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Modernization Package
              </div>
              <div className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                Website + CRM + follow‑up, installed.
              </div>
              <p className="mt-2 text-sm text-slate-600">
                A complete customer-facing setup so you look current, capture leads, and respond
                fast—without you becoming technical.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-700">
                <li>Branding toolkit (colors, fonts, simple guidelines)</li>
                <li>Modern website (mobile-first, fast, clear CTA)</li>
                <li>CRM setup (contacts, pipeline, notes)</li>
                <li>Email campaigns (lead follow‑up + re‑engagement)</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="primary">
                  Get a free AI business assessment
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Premium Growth System
              </div>
              <div className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                24/7 marketing that improves itself.
              </div>
              <p className="mt-2 text-sm text-slate-600">
                A steady system for free traffic: social posting + local SEO pages—measured,
                improved, and repeated every week.
              </p>
              <div className="mt-5 rounded-2xl bg-[var(--mv-mist)] p-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-950">The loop:</span> Create → Publish → Track
                results → Learn → Improve.
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-slate-700">
                <li>Social posts generated and scheduled (approval optional)</li>
                <li>Local SEO pages that capture demand over time</li>
                <li>Lead capture + fast follow‑up workflows</li>
                <li>Weekly scorecard + continuous improvement</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="secondary">
                  Ask about premium
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[var(--mv-border)] bg-[var(--mv-mist)] p-8">
            <div className="text-sm font-semibold text-slate-950">Add‑ons (quoted after assessment)</div>
            <p className="mt-2 text-sm text-slate-600">
              Custom agent workflows for reception, spreadsheets, admin tasks, handoffs, and
              business organization—built around your exact bottlenecks.
            </p>
            <div className="mt-3 text-xs text-slate-500">
              Note: Backloop is built to reduce reliance on ad spend by compounding free traffic over
              time.
            </div>
          </div>
        </Container>
      </Section>

      {/* Examples */}
      <Section id="examples" className="bg-[var(--mv-mist)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-[-0.02em] text-[color:var(--mv-ink)] md:text-3xl">
                Examples (simple + effective)
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                These are the kinds of integrations that create leverage quickly.
              </p>
            </div>
            <ul className="grid gap-3 rounded-3xl border border-[var(--mv-border)] bg-white p-8 text-sm text-slate-700 shadow-sm">
              <li>
                <span className="font-semibold text-slate-950">Website form → CRM → text follow‑up</span>
                <div className="text-slate-600">Instant routing, next steps, and appointment offers.</div>
              </li>
              <li>
                <span className="font-semibold text-slate-950">Support inbox triage</span>
                <div className="text-slate-600">Auto-tag, draft replies, escalate urgent issues.</div>
              </li>
              <li>
                <span className="font-semibold text-slate-950">Weekly owner report</span>
                <div className="text-slate-600">Leads, response time, bookings, exceptions.</div>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section id="process" className="bg-white">
        <Container>
          <h2 className="text-balance text-2xl font-bold tracking-[-0.02em] text-[color:var(--mv-ink)] md:text-3xl">
            Process
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--mv-border)] bg-white p-6">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 1</div>
              <div className="mt-2 text-base font-bold text-slate-950">Audit</div>
              <p className="mt-2 text-sm text-slate-600">
                We map your current workflow and pick the highest-leverage integration.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--mv-border)] bg-white p-6">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 2</div>
              <div className="mt-2 text-base font-bold text-slate-950">Build</div>
              <p className="mt-2 text-sm text-slate-600">
                We implement the system with clear rules, approvals, and a handoff.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--mv-border)] bg-white p-6">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 3</div>
              <div className="mt-2 text-base font-bold text-slate-950">Monitor</div>
              <p className="mt-2 text-sm text-slate-600">
                We add alerts + logging and tune weekly so it stays reliable.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-[linear-gradient(180deg,var(--mv-canvas),var(--mv-mist))]">
        <Container>
          <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-10 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Get a plan</div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                  Tell us what you want to automate.
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  We’ll reply with a simple plan: what to integrate, what it connects to, and what
                  “done” looks like.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button href="/contact" variant="primary">
                  Contact
                </Button>
                <Button href="#faq" variant="secondary">
                  Read FAQ
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container>
          <h2 className="text-balance text-2xl font-bold tracking-[-0.02em] text-[color:var(--mv-ink)] md:text-3xl">
            FAQ
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-7">
              <div className="text-base font-bold text-slate-950">Do I need new tools?</div>
              <p className="mt-2 text-sm text-slate-600">
                Usually no. We integrate with what you already use, then add only what’s needed.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-7">
              <div className="text-base font-bold text-slate-950">Is it safe / controlled?</div>
              <p className="mt-2 text-sm text-slate-600">
                Yes—approvals, guardrails, and audit trails. You decide what can act automatically.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-7">
              <div className="text-base font-bold text-slate-950">How fast can we start?</div>
              <p className="mt-2 text-sm text-slate-600">
                After a short intake, we can usually implement a first workflow quickly.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-7">
              <div className="text-base font-bold text-slate-950">What do you need from me?</div>
              <p className="mt-2 text-sm text-slate-600">
                Access to the tools involved and one point person for decisions.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <footer className="border-t border-[var(--mv-border)] bg-[color:var(--mv-canvas)]">
        <Container>
          <div className="flex flex-col gap-3 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-slate-950">Motion Ventures</div>
              <div className="mt-1">Practical AI, fully implemented.</div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-slate-950">
                Contact
              </Link>
              <Link href="#" className="hover:text-slate-950">
                Privacy
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
