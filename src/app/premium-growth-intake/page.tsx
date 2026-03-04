import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, H1, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Premium Growth Intake",
};

export default function PremiumGrowthIntakePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader ctaLabel="Assessment" ctaHref="/assessment" />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Premium Growth System — application</H1>
            <div className="mt-5">
              <Lead>
                Short questionnaire so we can tell if we’re a fit. This is simulated for now—no
                integrations.
              </Lead>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Growth intake
              </div>

              <form className="mt-6 grid gap-4" action="/premium-growth-intake/thanks" method="get">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Name</span>
                    <input
                      name="name"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                      placeholder="jane@company.com"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Industry</span>
                    <input
                      name="industry"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                      placeholder="Home services, dental, med spa, ecom, etc."
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Team size</span>
                    <select
                      name="teamSize"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none focus:ring-2 focus:ring-[var(--mv-primary)]"
                    >
                      <option value="" className="bg-black">
                        Select…
                      </option>
                      <option value="1" className="bg-black">
                        1 (solo)
                      </option>
                      <option value="2-5" className="bg-black">
                        2–5
                      </option>
                      <option value="6-15" className="bg-black">
                        6–15
                      </option>
                      <option value="16-50" className="bg-black">
                        16–50
                      </option>
                      <option value="50+" className="bg-black">
                        50+
                      </option>
                    </select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-white/85">Website</span>
                  <input
                    name="website"
                    className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                    placeholder="https://yourbusiness.com"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Annual revenue (range)</span>
                    <select
                      name="revenue"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none focus:ring-2 focus:ring-[var(--mv-primary)]"
                    >
                      <option value="" className="bg-black">
                        Select…
                      </option>
                      <option value="<250k" className="bg-black">
                        &lt; $250k
                      </option>
                      <option value="250k-1m" className="bg-black">
                        $250k–$1M
                      </option>
                      <option value="1m-5m" className="bg-black">
                        $1M–$5M
                      </option>
                      <option value="5m+" className="bg-black">
                        $5M+
                      </option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Business size</span>
                    <select
                      name="size"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none focus:ring-2 focus:ring-[var(--mv-primary)]"
                    >
                      <option value="" className="bg-black">
                        Select…
                      </option>
                      <option value="local" className="bg-black">
                        Local (1–2 locations)
                      </option>
                      <option value="multi" className="bg-black">
                        Multi-location
                      </option>
                      <option value="online" className="bg-black">
                        Online-first
                      </option>
                    </select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-white/85">Current stack (optional)</span>
                  <input
                    name="stack"
                    className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                    placeholder="Example: HubSpot, Shopify, Zapier, Google Sheets"
                  />
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-white/85">Biggest bottleneck right now</span>
                  <textarea
                    name="bottleneck"
                    required
                    rows={4}
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                    placeholder="Leads, follow-up, scheduling, content, reporting, operations…"
                  />
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-white/85">Goals for the next 60–90 days</span>
                  <textarea
                    name="goals"
                    required
                    rows={3}
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
                    placeholder="More booked calls, more organic traffic, better conversion, fewer admin fires…"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Timeline</span>
                    <select
                      name="timeline"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none focus:ring-2 focus:ring-[var(--mv-primary)]"
                    >
                      <option value="" className="bg-black">
                        Select…
                      </option>
                      <option value="ASAP" className="bg-black">
                        ASAP
                      </option>
                      <option value="2-4 weeks" className="bg-black">
                        2–4 weeks
                      </option>
                      <option value="1-2 months" className="bg-black">
                        1–2 months
                      </option>
                      <option value="Exploring" className="bg-black">
                        Exploring
                      </option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-white/85">Budget range</span>
                    <select
                      name="budget"
                      required
                      className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none focus:ring-2 focus:ring-[var(--mv-primary)]"
                    >
                      <option value="" className="bg-black">
                        Select…
                      </option>
                      <option value="$3k-$8k" className="bg-black">
                        $3k–$8k
                      </option>
                      <option value="$8k-$20k" className="bg-black">
                        $8k–$20k
                      </option>
                      <option value="$20k+" className="bg-black">
                        $20k+
                      </option>
                      <option value="Not sure" className="bg-black">
                        Not sure
                      </option>
                    </select>
                  </label>
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-white/45">
                    By submitting, you agree we can email you back about this request.
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--mv-primary)] focus:ring-offset-2 focus:ring-offset-transparent active:translate-y-px"
                  >
                    Submit application
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
