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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                    Foundation
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    Modernization package
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-white/45">Starting at</div>
                  <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">$2,000</div>
                </div>
              </div>
              <p className="mt-2 text-sm text-white/55">
                For local businesses who need to look current, capture leads, and follow up fast.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-white/55">
                <li>Branding toolkit (logo cleanup, colors, fonts, simple guidelines)</li>
                <li>Modern website (mobile-first, fast, clear call-to-action)</li>
                <li>CRM setup (contacts, pipeline, notes)</li>
                <li>Email campaigns (new lead follow-up + re-engagement)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                    Premium
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    Growth system
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-white/45">Quoted</div>
                  <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">Custom</div>
                </div>
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                Always-on content + distribution + improvement.
              </div>
              <p className="mt-2 text-sm text-white/55">
                A compounding engine for free traffic: social posting + local SEO pages—tracked and
                improved weekly.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/55">
                <span className="font-semibold text-white/85">The loop:</span> Create →
                Publish → Track results → Learn → Improve.
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-white/55">
                <li>Social posts generated and scheduled (approval optional)</li>
                <li>Local SEO pages that capture demand over time</li>
                <li>Lead capture + fast follow-up workflows</li>
                <li>Weekly scorecard + continuous improvement</li>
              </ul>

              <div className="mt-6">
                <Button href="/premium-growth-intake" variant="primary">
                  Apply (questionnaire)
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-sm font-semibold text-white/90">Add-ons (quoted)</div>
              <p className="mt-2 text-sm text-white/55">
                Custom agentic workflows for reception, spreadsheets, admin tasks, scheduling,
                handoffs, and business organization—built around your bottlenecks.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                    DIY
                  </div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white/90">
                    Get the guide
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-white/45">Price</div>
                  <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">$199</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">
                A practical playbook to modernize your business using AI agents—what to automate,
                what to measure, and how to roll it out safely.
              </p>

              <div className="mt-6">
                <Button href="/guide" variant="primary">
                  Get the guide ($199)
                </Button>
              </div>
            </div>
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
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 1</div>
              <div className="mt-2 font-bold text-white/90">Assessment</div>
              <p className="mt-2 text-sm text-white/55">Website, follow-up, ops, and gaps.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 2</div>
              <div className="mt-2 font-bold text-white/90">Offer</div>
              <p className="mt-2 text-sm text-white/55">Clear scope, timeline, and next steps.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-xs font-bold text-[color:var(--mv-primary)]">Step 3</div>
              <div className="mt-2 font-bold text-white/90">Build + Improve</div>
              <p className="mt-2 text-sm text-white/55">Implementation + weekly iteration.</p>
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
