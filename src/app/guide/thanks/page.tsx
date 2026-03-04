import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, Section } from "@/components/ui";

export const metadata = {
  title: "Thanks",
};

export default function GuideThanksPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <Section>
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Success</div>
            <div className="mt-2 font-[var(--font-sora)] text-2xl font-extrabold tracking-tight text-white/90">
              You’re in — guide delivery is simulated.
            </div>
            <p className="mt-3 text-sm text-white/55">
              Next step: wire real checkout + email delivery. For now, this page confirms the flow.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/85 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Back to services
              </Link>
              <Link
                href="/guide"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]"
              >
                View guide page
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
