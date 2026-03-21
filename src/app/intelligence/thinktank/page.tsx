import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ThinkTankRunForm from "@/components/ThinkTankRunForm";
import { Button, Container, Section } from "@/components/ui";

export const metadata = {
  title: "Think Tank — Synthetic Expert Advisory Panel",
  description:
    "Simulate 8-12 real researched experts debating your strategic question. Get adversarial analysis, consensus mapping, and actionable recommendations.",
};

const MOCK_EXPERTS = [
  {
    name: "Dr. Sarah Chen",
    role: "Consumer Psychology, Stanford",
    position: "FOR",
    quote: "The subscription model has strong behavioral hooks. Customers who commit to monthly delivery show 3.2x higher LTV in comparable DTC categories. The key risk is churn at month 3\u2014you need a re-engagement trigger.",
    color: "var(--mv-emerald)",
  },
  {
    name: "Marcus Webb",
    role: "DTC Growth Strategy, ex-Warby Parker",
    position: "CONDITIONAL",
    quote: "I\u2019d support this only with a 60-day money-back guarantee. Without a risk reversal, your CAC will eat you alive in paid channels. The product quality is there\u2014the offer structure isn\u2019t.",
    color: "var(--mv-sapphire)",
  },
  {
    name: "Prof. Elena Vasquez",
    role: "Supply Chain Economics, Wharton",
    position: "AGAINST",
    quote: "At this margin structure, you can\u2019t absorb returns and free shipping simultaneously. Either the unit economics break at scale, or you raise prices and lose the value positioning. Pick one.",
    color: "var(--mv-coral)",
  },
] as const;

const USE_CASES = [
  {
    question: "Should we expand into a new market?",
    desc: "Get geopolitical, economic, and competitive analysis from experts who study that region.",
  },
  {
    question: "Is our go-to-market strategy sound?",
    desc: "Hear from growth strategists, brand experts, and channel specialists.",
  },
  {
    question: "What are the hidden risks in this deal?",
    desc: "Legal, financial, and operational experts identify the risks your team might miss.",
  },
  {
    question: "Should we pivot our product strategy?",
    desc: "Product leaders, market analysts, and customer researchers debate the path forward.",
  },
  {
    question: "How should we position against competitors?",
    desc: "Brand strategists and competitive intelligence experts map your best angles.",
  },
  {
    question: "Is this acquisition worth pursuing?",
    desc: "M&A advisors, industry analysts, and integration specialists weigh in.",
  },
] as const;

export default function ThinkTankPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#111_0%,#0a0a0a_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_40%_25%,rgba(168,85,247,0.06),transparent)]" />

        <Container>
          <div className="relative py-24 sm:py-32 md:py-40">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-primary)]/25 bg-[var(--mv-primary)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-primary)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-primary)]" />
                Think Tank
              </div>

              <h1 className="font-[var(--font-playfair)] text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
                Your board of<br />
                <span className="text-[var(--mv-primary)]">advisors, on demand.</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#888]">
                We research real domain experts&mdash;their published positions,
                their frameworks, their biases&mdash;then simulate a multi-round
                adversarial debate on your strategic question. You get the kind of
                analysis that Fortune 500 companies pay six figures for.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary">
                  Book a Think Tank &mdash; from $99
                </Button>
                <Button href="/intelligence" variant="secondary">
                  Back to Intelligence Suite
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── EXAMPLE DEBATE ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              Example debate
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              See the experts argue.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-[#888]">
              Sample from a Think Tank session on: &ldquo;Should we launch a
              subscription model for our DTC skincare line?&rdquo;
            </p>
          </div>

          {/* Example debate panel — stays dark (terminal/demo) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-950 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(168,85,247,0.04),transparent)]" />

            {/* Panel header */}
            <div className="relative mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-primary)]">
                  Expert Panel &mdash; Round 2 of 4
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                  10 experts &middot; 3 dissenting &middot; 4 conditional &middot; 3 in favor
                </div>
              </div>
              <div className="rounded-full border border-zinc-700 bg-zinc-800/50 px-2 py-0.5 text-[10px] font-semibold text-[var(--mv-emerald)]">
                Live debate
              </div>
            </div>

            {/* Expert cards */}
            <div className="relative space-y-4">
              {MOCK_EXPERTS.map((expert) => (
                <div
                  key={expert.name}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-400">
                      {expert.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-200">{expert.name}</div>
                      <div className="text-xs text-zinc-500">{expert.role}</div>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        color: expert.color,
                        background: expert.color + "15",
                        border: `1px solid ${expert.color}30`,
                      }}
                    >
                      {expert.position}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    &ldquo;{expert.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Consensus summary */}
            <div className="relative mt-6 rounded-2xl border border-[var(--mv-primary)]/20 bg-[var(--mv-primary)]/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-primary)]">
                Emerging consensus (Round 2)
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                The panel is converging on a &ldquo;conditional launch&rdquo;
                position: subscription model is viable but requires (1) a risk
                reversal mechanism, (2) a re-engagement trigger at day 75, and
                (3) revised unit economics that account for 15-20% return rates.
                Three experts remain opposed on margin grounds.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── WHY REAL EXPERTS MATTER ── */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-emerald)]">
                Research process
              </div>
              <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
                Why real experts matter.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#888]">
                We do not use generic AI personas. For every Think Tank session,
                we research actual domain experts&mdash;their published papers,
                interviews, known positions, and analytical frameworks. This
                grounding is what makes the debate useful rather than
                performative.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { label: "Published positions researched", color: "var(--mv-sapphire)" },
                  { label: "Known biases and frameworks modeled", color: "var(--mv-primary)" },
                  { label: "Multi-round adversarial format", color: "var(--mv-emerald)" },
                  { label: "Experts challenge each other, not just agree", color: "var(--mv-coral)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-[#888]"
                  >
                    <span
                      className="h-px w-8 flex-shrink-0 rounded-full"
                      style={{ background: item.color + "60" }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "Step 1",
                  title: "Expert identification",
                  desc: "We identify 8\u201312 real experts relevant to your question\u2014academics, practitioners, industry analysts, and contrarian voices.",
                  color: "var(--mv-sapphire)",
                },
                {
                  step: "Step 2",
                  title: "Position research",
                  desc: "We study their published work, interviews, and known positions. Each expert persona is grounded in their actual intellectual framework.",
                  color: "var(--mv-primary)",
                },
                {
                  step: "Step 3",
                  title: "Adversarial debate",
                  desc: "Experts debate across 3\u20134 rounds. They challenge each other, refine positions, and surface insights that single-perspective analysis misses.",
                  color: "var(--mv-emerald)",
                },
                {
                  step: "Step 4",
                  title: "Synthesis & recommendations",
                  desc: "We deliver consensus mapping, dissent analysis, risk flags, and concrete next-step recommendations your team can act on immediately.",
                  color: "var(--mv-coral)",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: item.color }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">{item.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-[#888]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── USE CASES ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              Use cases
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              What will you debate?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div
                key={uc.question}
                className="group rounded-2xl border border-white/[0.06] bg-[#111] p-5 shadow-none transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-none"
              >
                <h3 className="text-sm font-bold text-[#ccc]">{uc.question}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#888]">{uc.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── RUN YOUR OWN ── */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <ThinkTankRunForm />
          </div>
        </Container>
      </Section>

      {/* ── PRICING ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              Pricing
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              Expert intelligence, accessible pricing.
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {/* Standard */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 shadow-none sm:rounded-3xl sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-primary)]">
                Standard
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                Strategic clarity session
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold tracking-tight text-white">$99</span>
                <span className="ml-1 text-sm text-[#666]">/session</span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-[#888]">
                <li>8 researched expert personas</li>
                <li>3-round adversarial debate</li>
                <li>Consensus & dissent mapping</li>
                <li>Risk identification</li>
                <li>Actionable recommendations</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="secondary">
                  Book standard session
                </Button>
              </div>
            </div>

            {/* Deep Research */}
            <div className="relative rounded-2xl border border-[var(--mv-primary)]/30 bg-[#111] p-5 shadow-none sm:rounded-3xl sm:p-8">
              <div className="absolute -top-3 left-6 rounded-full bg-[var(--mv-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Recommended
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-primary)]">
                Deep Research
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-white">
                Comprehensive advisory
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold tracking-tight text-white">$299</span>
                <span className="ml-1 text-sm text-[#666]">/session</span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-[#888]">
                <li>12 deeply researched expert personas</li>
                <li>4-round adversarial debate</li>
                <li>Full consensus & dissent mapping</li>
                <li>Risk & opportunity matrix</li>
                <li>Competitive implications analysis</li>
                <li>Implementation roadmap</li>
                <li>Executive summary (shareable)</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="primary">
                  Book deep research
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-[#111]">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] p-6 shadow-none sm:rounded-3xl sm:p-12 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,rgba(168,85,247,0.06),transparent)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
                Stop deciding alone.<br />
                <span className="text-[var(--mv-primary)]">Convene your Think Tank.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-[#888]">
                The best decisions come from rigorous debate. Get yours for the
                cost of a business lunch.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/contact" variant="primary">
                  Book a Think Tank
                </Button>
                <Button href="/intelligence" variant="secondary">
                  Explore Intelligence Suite
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
