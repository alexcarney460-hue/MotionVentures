import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, Section } from "@/components/ui";

export const metadata = {
  title: "Ventures",
};

const ventures = [
  {
    name: "Viking Labs",
    screenshot: "/ventures/vikinglabs.jpg",
    tag: "E-Commerce · AI Content · Automations",
    tagline: "Cinematic supplement brand built to convert and compound.",
    description:
      "A full-stack DTC brand build — cinematic storefront, AI-powered marketing automation, and a daily content engine that generates, schedules, and publishes without manual input.",
    href: "https://vikinglabs.co",
    status: "Live",
    accent: "var(--mv-sapphire)",
    built: [
      "Cinematic Next.js storefront",
      "AI content engine (brief → draft → publish)",
      "Email + SMS automation flows",
      "Affiliate program integration",
      "Product catalog + cart",
    ],
  },
  {
    name: "BlueLabel Wholesale",
    screenshot: "/ventures/bluelabelwholesale.jpg",
    tag: "B2B Platform · Wholesale · Catalog",
    tagline: "Wholesale-first storefront rebuilt for scale.",
    description:
      "A complete B2B wholesale platform rebuild — clean product catalog architecture, tiered pricing, and buyer-facing storefront designed for wholesale and distribution accounts.",
    href: "https://bluelabelwholesale.com",
    status: "Live",
    accent: "var(--mv-primary)",
    built: [
      "B2B-optimized Next.js storefront",
      "Tiered pricing + wholesale accounts",
      "Full product catalog with variants",
      "Brand design system",
      "Buyer onboarding flow",
    ],
  },
  {
    name: "Fresno Pool Care",
    screenshot: "/ventures/fresnopoolcare.jpg",
    tag: "Local Services · Lead Capture · Automation",
    tagline: "Local services site that works while you're in the field.",
    description:
      "A conversion-focused local services site with automated lead capture, fast follow-up sequences, and a booking system—so every inquiry gets a response, even after hours.",
    href: "https://fresnopoolcare.com",
    status: "Live",
    accent: "var(--mv-emerald)",
    built: [
      "Mobile-first services website",
      "Lead capture + instant follow-up",
      "Automated email + SMS sequences",
      "Booking integration",
      "Local SEO foundation",
    ],
  },
  {
    name: "SKYNETx",
    screenshot: "/ventures/skynetx.jpg",
    tag: "AI Infrastructure · Skills Marketplace · SaaS",
    tagline: "AI infrastructure platform for developers and agents.",
    description:
      "A full AI infrastructure platform — memory API, cognitive telemetry, skills marketplace, subscription billing (Stripe + crypto), and downloadable AI tools. Built for developers who need production-grade AI agent infrastructure.",
    href: "https://skynetx.io",
    status: "Live",
    accent: "var(--mv-sapphire)",
    built: [
      "Memory API + session persistence",
      "Cognitive telemetry (drift, pressure, verbosity)",
      "Skills marketplace with product purchases",
      "Stripe subscriptions + crypto top-ups (EVM + Solana)",
      "OpenClaudeCode — control Claude Code from Telegram",
      "Console dashboard with real-time analytics",
    ],
  },
  {
    name: "ValueSuppliers.co",
    screenshot: "/ventures/valuesuppliers.jpg",
    tag: "B2B Supply · Wholesale · AI Chat",
    tagline: "Premium supply platform built for wholesale and distribution buyers.",
    description:
      "A full B2B supply platform with tiered wholesale pricing, a curated product catalog, affiliate program, and an AI-powered chat assistant—built to serve retail, wholesale, and distribution accounts.",
    href: "https://valuesuppliers.co",
    status: "Live",
    accent: "var(--mv-coral)",
    built: [
      "Next.js storefront with tiered account system",
      "Wholesale + distribution pricing tiers",
      "AI chat assistant (Claude-powered)",
      "Affiliate program + commission tracking",
      "Product catalog with live search",
      "Supabase auth + customer accounts",
    ],
  },
];

export default function VenturesPage() {
  return (
    <div className="light-page min-h-screen">
      <SiteHeader />

      {/* ── HERO — full-bleed cinematic ── */}
      <section className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/nature/mv-macro-nature-6.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-45"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--mv-canvas)] via-[var(--mv-canvas)]/80 to-[var(--mv-canvas)]/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)]/70 via-transparent to-[var(--mv-canvas)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_75%_50%,rgba(56,189,248,0.07),transparent)]" />
        </div>

        <Container>
          <div className="relative py-20 sm:py-28">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mv-sapphire)]" />
                Active builds
              </div>
              <h1 className="font-[var(--font-sora)] text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white/95">
                Ventures we&apos;re<br />
                <span className="text-[var(--mv-primary)]">shipping.</span>
              </h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-white/50">
                We build AI-first products and help businesses deploy the same
                systems we use ourselves. Every venture is a live proof of concept.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── ACTIVE VENTURES ── */}
      <Section>
        <Container>
          <div className="mb-12">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
              Portfolio
            </div>
            <h2 className="font-[var(--font-sora)] text-2xl font-bold tracking-[-0.02em] text-white/90 sm:text-3xl">
              Active ventures
            </h2>
          </div>

          <div className="grid gap-6">
            {ventures.map((v) => (
              <div
                key={v.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                {/* Screenshot header */}
                <div className="relative h-48 w-full overflow-hidden sm:h-64">
                  <Image
                    src={v.screenshot}
                    alt={`${v.name} homepage`}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                  {/* Bottom fade into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--mv-canvas)] via-transparent to-transparent" />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-[var(--mv-canvas)]/20" />
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                {/* Top row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div
                      className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-70"
                      style={{ color: v.accent }}
                    >
                      {v.tag}
                    </div>
                    <h3 className="font-[var(--font-sora)] text-2xl font-extrabold tracking-tight text-white/95 sm:text-3xl">
                      {v.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-white/45">{v.tagline}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
                      <span
                        className="h-1.5 w-1.5 animate-pulse rounded-full"
                        style={{ background: v.accent }}
                      />
                      {v.status}
                    </span>
                    <Link
                      href={v.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white/90"
                    >
                      Visit site →
                    </Link>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-white/[0.07]" />

                {/* Bottom row */}
                <div className="grid gap-6 md:grid-cols-2">
                  <p className="text-sm leading-relaxed text-white/50">{v.description}</p>
                  <div>
                    <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      What we built
                    </div>
                    <ul className="grid gap-2">
                      {v.built.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-white/50"
                        >
                          <span
                            className="h-px w-4 flex-shrink-0 rounded-full"
                            style={{ background: v.accent + "60" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Animated bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(to right, ${v.accent}50, transparent)` }}
                />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── BUILDING NEXT — teaser ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/nature/mv-macro-nature-3.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--mv-canvas)] via-[var(--mv-canvas)]/80 to-[var(--mv-canvas)]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)] via-transparent to-[var(--mv-canvas)]" />
        </div>

        <Container>
          <div className="relative py-20 sm:py-28 md:py-36">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                In development
              </div>
              <h2 className="font-[var(--font-sora)] text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white/90 sm:text-4xl">
                More ventures<br />
                <span className="text-[var(--mv-primary)]">coming soon.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/45">
                We&apos;re always prototyping. New products in AI tooling, local
                services, and vertical-specific automation are in the pipeline.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="secondary">
                  Partner with us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <Section className="bg-[linear-gradient(180deg,var(--mv-canvas),var(--mv-mist))]">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur sm:rounded-3xl sm:p-12 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,rgba(139,92,246,0.12),transparent)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
                Work with us
              </div>
              <h2 className="font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.03em] text-white/90 sm:text-4xl">
                Want us to build<br />something for you?
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base text-white/45">
                Start with a free AI business assessment. We&apos;ll review your
                current setup and send back a clear plan.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/assessment" variant="primary">
                  Get the free assessment →
                </Button>
                <Button href="/services" variant="secondary">
                  View services
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
