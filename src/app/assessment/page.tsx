import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, H1, Lead, Section } from "@/components/ui";
import AssessmentForm from "./AssessmentForm";

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

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]">
                Assessment intake
              </div>

              <AssessmentForm />
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
