import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, H1, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Get the guide",
};

export default function GuidePage() {
  return (
    <div className="light-page min-h-screen">
      <SiteHeader />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_70%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              DIY
              <span className="text-white/20">|</span>
              $199
            </div>

            <div className="mt-6">
              <H1>Modernize your business with AI agents</H1>
            </div>

            <div className="mt-5">
              <Lead>
                A practical guide: what to automate, what to measure, and how to deploy safely.
                (Simulated checkout for now.)
              </Lead>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">Guide</div>
                  <div className="mt-2 font-[var(--font-sora)] text-xl font-extrabold tracking-tight text-white/90">
                    Get the guide
                  </div>
                  <div className="mt-1 text-sm text-white/55">PDF + templates + rollout checklist</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-white/45">Price</div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight text-white/90">$199</div>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 text-sm text-white/55">
                <li>Agent workflows that actually save time (no hype)</li>
                <li>Lead follow-up systems + CRM hygiene</li>
                <li>Ops automations (scheduling, reporting, admin)</li>
                <li>Safety + guardrails + approval loops</li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="https://venmo.com/u/alexablaze559?txn=pay&note=AI+Business+Guide&amount=199" variant="primary">
                  Pay $199 via Venmo →
                </Button>
                <Button href="/services" variant="secondary">
                  Back to services
                </Button>
              </div>

              <div className="mt-3 text-[11px] text-white/40">
                After payment, reply to the Venmo transaction with your email and we&apos;ll send the guide within 24 hours.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
