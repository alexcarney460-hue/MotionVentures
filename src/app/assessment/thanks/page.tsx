import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, Section } from "@/components/ui";

export const metadata = {
  title: "Thanks",
};

export default function ThanksPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader ctaLabel="Assessment" ctaHref="/assessment" />

      <Section>
        <Container>
          <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-10 shadow-sm shadow-slate-900/5">
            <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Submitted</div>
            <div className="mt-2 font-[var(--font-sora)] text-2xl font-extrabold tracking-tight text-[color:var(--mv-primary)]">
              Thanks — we’ll reply with your assessment.
            </div>
            <p className="mt-3 text-sm text-[color:var(--mv-muted)]">
              We’ll respond with a clear recommendation and an offer.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--mv-border)] bg-white px-5 text-sm font-semibold text-[color:var(--mv-primary)] shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Back to home
              </Link>
              <Link
                href="/assessment"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]"
              >
                Send another
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
