import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Container, H1, Lead, Section } from "@/components/ui";

export const metadata = {
  title: "Ventures",
};

export default function VenturesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_65%)]" />
        <Container>
          <div className="relative max-w-3xl">
            <H1>Ventures</H1>
            <div className="mt-5">
              <Lead>
                We’re building and backing AI-first products. This page will list active ventures and
                case studies.
              </Lead>
            </div>
          </div>
        </Container>
      </Section>
      <SiteFooter />
    </div>
  );
}
