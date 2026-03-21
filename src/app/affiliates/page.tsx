import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Container, Section } from "@/components/ui";
import AffiliateSignupForm from "./AffiliateSignupForm";

export const metadata = {
  title: "Affiliate Program — Motion Ventures",
  description:
    "Earn commissions by referring clients to Motion Ventures. 10-20% on every deal you bring in.",
};

export default function AffiliatePage() {
  return (
    <div className="light-page min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(139,92,246,0.1),transparent)]" />
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-primary)]/25 bg-[var(--mv-primary)]/5 px-4 py-1.5 text-xs font-semibold text-[var(--mv-primary)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-primary)]" />
              Affiliate Program
            </div>
            <h1 className="font-[var(--font-sora)] text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white/95 sm:text-5xl md:text-6xl">
              Earn by bringing us
              <br />
              <span className="text-[var(--mv-primary)]">great clients.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
              Know a business that needs AI automation, a premium website, or
              specialized agents? Introduce them to us and earn 10-20% commission
              on every deal.
            </p>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-sapphire)]">
              Simple process
            </div>
            <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white/90">
              How it works
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Apply",
                desc: "Fill out the form below. We review and approve within 24 hours.",
                color: "var(--mv-primary)",
              },
              {
                step: "02",
                title: "Get your link",
                desc: "You receive a unique referral code and trackable link to share.",
                color: "var(--mv-sapphire)",
              },
              {
                step: "03",
                title: "Refer clients",
                desc: "Share your link or introduce clients directly. We handle the rest.",
                color: "var(--mv-emerald)",
              },
              {
                step: "04",
                title: "Get paid",
                desc: "Earn 10-20% commission on every signed deal. Paid monthly.",
                color: "var(--mv-coral)",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest opacity-50"
                  style={{ color: item.color }}
                >
                  Step {item.step}
                </div>
                <div className="mt-3 font-[var(--font-sora)] text-lg font-bold text-white/90">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Commission tiers */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-emerald)]">
              Commission structure
            </div>
            <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white/90">
              Generous, transparent payouts
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-3">
            {[
              {
                tier: "Standard",
                rate: "10%",
                desc: "Foundation packages and one-time projects",
                color: "var(--mv-sapphire)",
              },
              {
                tier: "Premium",
                rate: "15%",
                desc: "Premium Growth System and recurring retainers",
                color: "var(--mv-primary)",
              },
              {
                tier: "Enterprise",
                rate: "20%",
                desc: "Custom AI agent builds and enterprise deals ($10k+)",
                color: "var(--mv-emerald)",
              },
            ].map((item) => (
              <div
                key={item.tier}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur"
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: item.color }}
                >
                  {item.tier}
                </div>
                <div
                  className="mt-4 font-[var(--font-sora)] text-5xl font-extrabold tracking-tight"
                  style={{ color: item.color }}
                >
                  {item.rate}
                </div>
                <p className="mt-3 text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-lg text-center text-sm text-white/35">
            Commissions are calculated on the total deal value and paid out
            within 30 days of client payment. Recurring retainer clients earn you
            commission on the first 6 months.
          </p>
        </Container>
      </Section>

      {/* Signup form */}
      <Section id="apply">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
                Get started
              </div>
              <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white/90">
                Apply to become an affiliate
              </h2>
              <p className="mt-3 text-sm text-white/50">
                We review every application and typically respond within 24
                hours.
              </p>
            </div>

            <AffiliateSignupForm />
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
