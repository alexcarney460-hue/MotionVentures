import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Button, Container, H1, H2, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Studio",
};

export default function StudioPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Studio</H1>
            <div className="mt-5">
              <Lead>
                Motion Ventures is a studio for building and deploying AI systems—ventures and
                services. We work with operators who want leverage, not complexity.
              </Lead>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/assessment" variant="primary">
                Free AI assessment
              </Button>
              <Button href="/services" variant="secondary">
                Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <H2>How we work</H2>
              <p className="mt-3 text-sm text-white/55">
                We prefer small, fast builds with measurement baked in. We focus on systems that can
                compound.
              </p>
            </div>
            <ul className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-white/55 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <li>
                <span className="font-semibold text-white/90">Plain English</span>
                <div>Clear scope, clear outcomes, simple handoff.</div>
              </li>
              <li>
                <span className="font-semibold text-white/90">Guardrails</span>
                <div>Approvals, logs, and safe automation—no chaos.</div>
              </li>
              <li>
                <span className="font-semibold text-white/90">Iteration</span>
                <div>Weekly scorecards and improvements.</div>
              </li>
            </ul>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-xs font-semibold text-white/60">Internal</div>
              <div className="mt-2 text-lg font-extrabold tracking-tight text-white/90">SkynetX</div>
              <p className="mt-2 text-sm text-white/55">
                Agent performance infrastructure—gates, telemetry, and stability systems.
              </p>
              <Link
                href="https://skynetx.io"
                className="mt-4 inline-flex text-sm font-semibold text-[color:var(--mv-primary)] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                skynetx.io →
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-xs font-semibold text-white/60">Internal</div>
              <div className="mt-2 text-lg font-extrabold tracking-tight text-white/90">Claw for Life</div>
              <p className="mt-2 text-sm text-white/55">
                Community + experiments around agent workflows and utility software.
              </p>
              <Link
                href="https://clawforlife.com"
                className="mt-4 inline-flex text-sm font-semibold text-[color:var(--mv-primary)] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                clawforlife.com →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
