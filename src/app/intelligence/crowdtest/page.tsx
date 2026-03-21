import CrowdTestRunForm from "@/components/CrowdTestRunForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, Section } from "@/components/ui";

export const metadata = {
  title: "CrowdTest — Synthetic Customer Intelligence",
  description:
    "Simulate 50-500 customer personas grounded in your real data. Get instant sentiment, purchase intent, and objection analysis before you spend.",
};

/* ═══════════════════════════════════════════════════════════
   LIVE CONSOLE DATA — Real results from CrowdTest self-test
   ═══════════════════════════════════════════════════════════ */

const CONSOLE_SENTIMENT = [
  { label: "Very Positive", count: 8, color: "#22c55e" },
  { label: "Positive", count: 16, color: "#86efac" },
  { label: "Neutral", count: 11, color: "rgba(255,255,255,0.35)" },
  { label: "Negative", count: 11, color: "#f87171" },
  { label: "Very Negative", count: 4, color: "#ef4444" },
] as const;

const CONSOLE_OBJECTIONS = [
  { text: "AI personas can't truly replicate real human behavior", count: 22 },
  { text: "No way to validate accuracy of synthetic responses", count: 16 },
  { text: "Could give false confidence in bad ideas", count: 14 },
] as const;

const CONSOLE_PRAISE = [
  { text: "Saves thousands vs traditional focus groups", count: 12 },
  { text: "Instant results — no weeks of recruiting", count: 9 },
  { text: "Perfect for testing before ad spend", count: 8 },
] as const;

const CONSOLE_PERSONAS = [
  {
    name: "Devon Park",
    age: 28,
    occupation: "Startup Founder",
    sentiment: "very_positive" as const,
    quote: "This is exactly what I needed. I burned $4k on a focus group last year that told me nothing. Take my money.",
  },
  {
    name: "Sarah Whitfield",
    age: 55,
    occupation: "Market Research Consultant",
    sentiment: "very_negative" as const,
    quote: "AI personas are just fancy Mad Libs. You're replacing decades of methodology with a language model's hallucinations.",
  },
  {
    name: "Linda Nguyen",
    age: 47,
    occupation: "E-commerce Store Owner",
    sentiment: "neutral" as const,
    quote: "I'd try the free tier but I'm not paying until I can compare it against real customer feedback I already have.",
  },
  {
    name: "Greg Hoffman",
    age: 43,
    occupation: "Director of Analytics",
    sentiment: "negative" as const,
    quote: "There's no statistical rigor here. It's entertainment dressed up as research. Show me the validation studies.",
  },
  {
    name: "Megan O'Reilly",
    age: 29,
    occupation: "Email Marketing Specialist",
    sentiment: "very_positive" as const,
    quote: "I tested three subject line variants in 10 minutes. The winning one matched my A/B test results. Shutting up and taking my money.",
  },
] as const;

const SENTIMENT_BADGE_STYLES: Record<string, string> = {
  very_positive: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  positive: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  neutral: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  negative: "bg-red-500/10 text-red-300 border-red-500/20",
  very_negative: "bg-red-500/20 text-red-400 border-red-500/30",
};

const SENTIMENT_LABELS: Record<string, string> = {
  very_positive: "Very Positive",
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
  very_negative: "Very Negative",
};

const DATA_INPUTS = [
  {
    title: "Review URL",
    desc: "Paste a Google, Yelp, or Amazon review page. We extract sentiment patterns from real customer language.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.44a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25" />
      </svg>
    ),
  },
  {
    title: "Paste Data",
    desc: "Drop in customer surveys, support tickets, NPS responses, or any text data you already have.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3a2.25 2.25 0 00-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
    ),
  },
  {
    title: "Upload CSV",
    desc: "Upload a spreadsheet of customer data, transactions, or demographics. We build personas from the patterns.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: "Business URL",
    desc: "Share your website. We scrape public data to understand your brand positioning, audience, and market context.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
] as const;

export default function CrowdTestPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),white_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_60%_25%,rgba(34,211,238,0.06),transparent)]" />

        <Container>
          <div className="relative py-24 sm:py-32 md:py-40">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mv-sapphire)]/25 bg-[var(--mv-sapphire)]/5 px-3 py-1 text-xs font-semibold text-[var(--mv-sapphire)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-sapphire)]" />
                CrowdTest
              </div>

              <h1 className="font-[var(--font-playfair)] text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-gray-900">
                Test before<br />
                <span className="text-[var(--mv-sapphire)]">you invest.</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500">
                Simulate 50 to 500 customer personas grounded in your real audience
                data. Get instant sentiment analysis, purchase intent scoring, and
                the objections you need to address&mdash;before spending a dollar
                on launch.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary">
                  Book a CrowdTest &mdash; from $49
                </Button>
                <Button href="/intelligence" variant="secondary">
                  Back to Intelligence Suite
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── LIVE CONSOLE ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-sapphire)]">
              Live results
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl">
              See a real CrowdTest.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              We ran CrowdTest on itself. 50 AI personas evaluated whether
              they&rsquo;d buy a synthetic focus group SaaS. Here are the
              unedited results.
            </p>
          </div>

          {/* Console Container — stays dark (terminal) */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-950 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            {/* Scan-line overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
              }}
            />

            {/* ── Header Bar ── */}
            <div className="relative flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live
                  </span>
                </div>
                <span className="hidden h-4 w-px bg-zinc-700 sm:block" />
                <span className="hidden font-mono text-sm font-semibold text-zinc-300 sm:block">
                  CrowdTest Console
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-zinc-500">
                  crowdtest://results/self-test
                </span>
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--mv-sapphire)]">
                  50 personas
                </span>
              </div>
            </div>

            {/* ── Test Title ── */}
            <div className="border-b border-zinc-800/60 px-4 py-3 sm:px-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                test subject
              </div>
              <div className="mt-1 font-[var(--font-sora)] text-base font-bold tracking-tight text-zinc-200 sm:text-lg">
                &ldquo;CrowdTest AI Focus Group SaaS&rdquo;
              </div>
            </div>

            <div className="relative p-4 sm:p-6">
              {/* ── Key Metrics Row ── */}
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  {
                    label: "Avg Sentiment",
                    value: "+0.11",
                    sub: "slightly positive",
                    accent: "text-emerald-400",
                    border: "border-emerald-500/20",
                    bg: "bg-emerald-500/5",
                  },
                  {
                    label: "Would Buy",
                    value: "46%",
                    sub: "23 of 50 personas",
                    accent: "text-[var(--mv-sapphire)]",
                    border: "border-[var(--mv-sapphire)]/20",
                    bg: "bg-[var(--mv-sapphire)]/5",
                  },
                  {
                    label: "Would Use",
                    value: "62%",
                    sub: "31 of 50 personas",
                    accent: "text-[var(--mv-sapphire)]",
                    border: "border-[var(--mv-sapphire)]/20",
                    bg: "bg-[var(--mv-sapphire)]/5",
                  },
                  {
                    label: "Top Price",
                    value: "$29/mo",
                    sub: "chosen by 11 personas",
                    accent: "text-amber-400",
                    border: "border-amber-500/20",
                    bg: "bg-amber-500/5",
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-lg border ${metric.border} ${metric.bg} p-3 sm:p-4`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {metric.label}
                    </div>
                    <div
                      className={`mt-1 font-mono text-2xl font-bold tracking-tight ${metric.accent} sm:text-3xl`}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-zinc-600">
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Sentiment Distribution + Objections/Praise ── */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Sentiment Chart */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Sentiment Distribution
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>
                  <div className="space-y-2.5">
                    {CONSOLE_SENTIMENT.map((s) => {
                      const maxCount = 16;
                      const pct = Math.round((s.count / 50) * 100);
                      const barWidth = Math.round((s.count / maxCount) * 100);
                      return (
                        <div key={s.label} className="flex items-center gap-3">
                          <span className="w-24 text-right font-mono text-[11px] text-zinc-500 sm:w-28">
                            {s.label}
                          </span>
                          <div className="relative h-6 flex-1 overflow-hidden rounded bg-zinc-900">
                            <div
                              className="absolute inset-y-0 left-0 rounded transition-all duration-700"
                              style={{
                                width: `${barWidth}%`,
                                background: s.color,
                                opacity: 0.7,
                              }}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                              <span className="font-mono text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                {s.count}
                              </span>
                            </div>
                          </div>
                          <span className="w-8 font-mono text-[10px] text-zinc-600">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Objections + Praise */}
                <div className="space-y-5">
                  {/* Objections */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-px flex-1 bg-zinc-800" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-red-400/70">
                        Top Objections
                      </span>
                      <div className="h-px flex-1 bg-zinc-800" />
                    </div>
                    <div className="space-y-2">
                      {CONSOLE_OBJECTIONS.map((obj, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-lg border border-red-500/10 bg-red-500/[0.03] px-3 py-2.5"
                        >
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-red-500/15 font-mono text-[9px] font-bold text-red-400">
                            {obj.count}x
                          </span>
                          <span className="text-[13px] leading-snug text-zinc-400">
                            &ldquo;{obj.text}&rdquo;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Praise */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-px flex-1 bg-zinc-800" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/70">
                        Top Praise
                      </span>
                      <div className="h-px flex-1 bg-zinc-800" />
                    </div>
                    <div className="space-y-2">
                      {CONSOLE_PRAISE.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03] px-3 py-2.5"
                        >
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-emerald-500/15 font-mono text-[9px] font-bold text-emerald-400">
                            {p.count}x
                          </span>
                          <span className="text-[13px] leading-snug text-zinc-400">
                            &ldquo;{p.text}&rdquo;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Sample Persona Reactions ── */}
              <div className="mt-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-px flex-1 bg-zinc-800" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Sample Persona Reactions
                  </span>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>
                <div className="space-y-3">
                  {CONSOLE_PERSONAS.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {/* Avatar placeholder */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 font-mono text-[10px] font-bold text-zinc-500">
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-sm font-semibold text-zinc-300">
                            {p.name}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-600">
                            {p.age} / {p.occupation}
                          </span>
                        </div>
                        <span
                          className={`ml-auto rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${SENTIMENT_BADGE_STYLES[p.sentiment]}`}
                        >
                          {SENTIMENT_LABELS[p.sentiment]}
                        </span>
                      </div>
                      <p className="mt-2.5 border-l-2 border-zinc-700 pl-3 font-mono text-[12px] italic leading-relaxed text-zinc-500">
                        &ldquo;{p.quote}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Console Footer ── */}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-zinc-600">
                    Test completed in 47s &middot; 50/50 personas responded
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-700">
                  v0.4.1-beta
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── RUN YOUR OWN ── */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <CrowdTestRunForm />
          </div>
        </Container>
      </Section>

      {/* ── HOW CUSTOMER DATA MAKES IT BETTER ── */}
      <Section>
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-emerald)]">
              Data grounding
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl">
              Your data makes it real.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Generic simulations give generic answers. CrowdTest builds personas
              from your actual customers&mdash;their language, their concerns,
              their buying patterns.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DATA_INPUTS.map((input) => (
              <div
                key={input.title}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md sm:rounded-3xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--mv-sapphire)]/20 bg-[var(--mv-sapphire)]/5 text-[var(--mv-sapphire)]">
                  {input.icon}
                </div>
                <div className="mt-4 font-[var(--font-sora)] text-base font-bold tracking-tight text-gray-900">
                  {input.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {input.desc}
                </p>
              </div>
            ))}
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
            <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl">
              Simple, transparent pricing.
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {/* Quick */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-sapphire)]">
                Quick Test
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-gray-900">
                Fast signal check
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold tracking-tight text-gray-900">$49</span>
                <span className="ml-1 text-sm text-gray-400">/session</span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-gray-500">
                <li>50 synthetic personas</li>
                <li>Basic sentiment breakdown</li>
                <li>Top 3 objections</li>
                <li>Buy/no-buy signal</li>
                <li>Delivered in under 1 hour</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="secondary">
                  Book quick test
                </Button>
              </div>
            </div>

            {/* Deep */}
            <div className="relative rounded-2xl border border-[var(--mv-sapphire)]/30 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
              <div className="absolute -top-3 left-6 rounded-full bg-[var(--mv-sapphire)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Recommended
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-sapphire)]">
                Deep Analysis
              </div>
              <div className="mt-2 font-[var(--font-sora)] text-xl font-bold tracking-tight text-gray-900">
                Full strategic intelligence
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold tracking-tight text-gray-900">$149</span>
                <span className="ml-1 text-sm text-gray-400">/session</span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-gray-500">
                <li>500 synthetic personas</li>
                <li>Full sentiment distribution</li>
                <li>All objections ranked by frequency</li>
                <li>Segment-level insights</li>
                <li>Emergent pattern analysis</li>
                <li>Pricing sensitivity testing</li>
                <li>Delivered with strategic recommendations</li>
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="primary">
                  Book deep analysis
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-gray-50">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-12 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,rgba(34,211,238,0.05),transparent)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-[var(--font-playfair)] text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl">
                Know what your customers think<br />
                <span className="text-[var(--mv-sapphire)]">before they do.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-gray-500">
                Stop guessing. Start simulating. Your first CrowdTest is just $49.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/contact" variant="primary">
                  Book a CrowdTest
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
