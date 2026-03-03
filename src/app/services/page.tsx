import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, H1, H2, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Services for existing businesses</H1>
            <div className="mt-5">
              <Lead>
                A complete customer-facing solution: brand toolkit, website, CRM, email campaigns,
                and optional agentic workflows—quoted after assessment.
              </Lead>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/assessment" variant="primary">
                Free AI assessment
              </Button>
              <Button href="#packages" variant="secondary">
                View packages
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="packages">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Modernization Package
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-[color:var(--mv-ink)]">
                The foundation: modern, organized, responsive.
              </div>
              <p className="mt-2 text-sm text-[color:var(--mv-muted)]">
                For local businesses who need to look current, capture leads, and follow up fast.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-[color:var(--mv-muted)]">
                <li>Branding toolkit (logo cleanup, colors, fonts, simple guidelines)</li>
                <li>Modern website (mobile-first, fast, clear call-to-action)</li>
                <li>CRM setup (contacts, pipeline, notes)</li>
                <li>Email campaigns (new lead follow-up + re-engagement)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Premium Growth System
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-[color:var(--mv-ink)]">
                Always-on content + distribution + improvement.
              </div>
              <p className="mt-2 text-sm text-[color:var(--mv-muted)]">
                A compounding engine for free traffic: social posting + local SEO pages—tracked and
                improved weekly.
              </p>
              <div className="mt-5 rounded-2xl bg-[var(--mv-mist)] p-4 text-sm text-[color:var(--mv-muted)]">
                <span className="font-semibold text-[color:var(--mv-ink)]">The loop:</span> Create →
                Publish → Track results → Learn → Improve.
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-[color:var(--mv-muted)]">
                <li>Social posts generated and scheduled (approval optional)</li>
                <li>Local SEO pages that capture demand over time</li>
                <li>Lead capture + fast follow-up workflows</li>
                <li>Weekly scorecard + continuous improvement</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[var(--mv-border)] bg-[var(--mv-mist)] p-8">
            <div className="text-sm font-semibold text-[color:var(--mv-ink)]">Add-ons (quoted)</div>
            <p className="mt-2 text-sm text-[color:var(--mv-muted)]">
              Custom agentic workflows for reception, spreadsheets, admin tasks, scheduling,
              handoffs, and business organization—built around your bottlenecks.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <H2>How we engage</H2>
            <p className="mt-3 text-sm text-[color:var(--mv-muted)]">
              We analyze your business first. Then we send a clear offer with a recommended package
              and optional upgrades.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--mv-border)] bg-white p-6">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 1</div>
              <div className="mt-2 font-bold text-[color:var(--mv-ink)]">Assessment</div>
              <p className="mt-2 text-sm text-[color:var(--mv-muted)]">Website, follow-up, ops, and gaps.</p>
            </div>
            <div className="rounded-2xl border border-[var(--mv-border)] bg-white p-6">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 2</div>
              <div className="mt-2 font-bold text-[color:var(--mv-ink)]">Offer</div>
              <p className="mt-2 text-sm text-[color:var(--mv-muted)]">Clear scope, timeline, and next steps.</p>
            </div>
            <div className="rounded-2xl border border-[var(--mv-border)] bg-white p-6">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 3</div>
              <div className="mt-2 font-bold text-[color:var(--mv-ink)]">Build + Improve</div>
              <p className="mt-2 text-sm text-[color:var(--mv-muted)]">Implementation + weekly iteration.</p>
            </div>
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
