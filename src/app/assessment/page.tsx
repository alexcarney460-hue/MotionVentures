import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, H1, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Free AI Business Assessment",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader ctaLabel="Assessment" ctaHref="/assessment" />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Free AI business assessment</H1>
            <div className="mt-5">
              <Lead>
                We’ll review your website, lead flow, follow-up, and day-to-day operations. You’ll
                get a clear, non-technical recommendation and an offer.
              </Lead>
            </div>

            <div className="mt-10 rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5 sm:p-10">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Assessment intake
              </div>

              {/* MVP: HTML form (no backend yet). Wire to CRM/email later. */}
              <form className="mt-6 grid gap-4" action="/assessment/thanks" method="get">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-[color:var(--mv-ink)]">Name</span>
                    <input
                      name="name"
                      required
                      className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-[color:var(--mv-ink)] outline-none ring-[var(--mv-accent)] focus:ring-2"
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-[color:var(--mv-ink)]">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-[color:var(--mv-ink)] outline-none ring-[var(--mv-accent)] focus:ring-2"
                      placeholder="jane@company.com"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-[color:var(--mv-ink)]">Business website (if you have one)</span>
                  <input
                    name="website"
                    className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-[color:var(--mv-ink)] outline-none ring-[var(--mv-accent)] focus:ring-2"
                    placeholder="https://yourbusiness.com"
                  />
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-[color:var(--mv-ink)]">Type of business</span>
                  <input
                    name="businessType"
                    required
                    className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-[color:var(--mv-ink)] outline-none ring-[var(--mv-accent)] focus:ring-2"
                    placeholder="Home services, local retail, professional services, etc."
                  />
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-[color:var(--mv-ink)]">What’s the main issue right now?</span>
                  <textarea
                    name="problem"
                    required
                    rows={4}
                    className="rounded-xl border border-[var(--mv-border)] bg-white px-3 py-3 text-[color:var(--mv-ink)] outline-none ring-[var(--mv-accent)] focus:ring-2"
                    placeholder="Example: leads slowed down, website feels old, follow-up is inconsistent, scheduling is chaotic"
                  />
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-[color:var(--mv-ink)]">What would ‘better’ look like in 60 days?</span>
                  <textarea
                    name="outcome"
                    required
                    rows={3}
                    className="rounded-xl border border-[var(--mv-border)] bg-white px-3 py-3 text-[color:var(--mv-ink)] outline-none ring-[var(--mv-accent)] focus:ring-2"
                    placeholder="More inquiries, faster response time, more booked work, less admin chaos"
                  />
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-[color:var(--mv-muted)]">
                    By submitting, you agree we can email you back about this request.
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--mv-accent)] focus:ring-offset-2 active:translate-y-px"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
