import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Container, H1, Lead, Section } from "@/components/ui";
import ContactFunnel from "./ContactFunnel";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="light-page min-h-screen">
      <SiteHeader />

      <Section className="relative overflow-hidden py-14 md:py-20">
        {/* cinematic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),var(--mv-canvas)_75%)]" />
          <div className="absolute inset-0 opacity-[0.16] mix-blend-multiply [mask-image:radial-gradient(circle_at_30%_15%,black,transparent_62%)]">
            <div className="absolute -top-28 -left-24 h-[520px] w-[520px] rounded-full bg-cyan-300 blur-3xl" />
            <div className="absolute -bottom-28 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-indigo-300 blur-3xl" />
          </div>
        </div>

        <Container>
          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
              Free intake
              <span className="text-white/20">|</span>
              2-step funnel
            </div>

            <div className="mt-6">
              <H1>Free AI business assessment</H1>
            </div>
            <div className="mt-4 max-w-2xl">
              <Lead>
                Answer a few questions. We’ll reply with a clear, non-technical assessment and a proposed
                plan.
              </Lead>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-7">
              <ContactFunnel />
            </div>

            <div className="mt-6 text-xs text-white/45">
              Prefer to talk? Call <a href="tel:+18314359521" className="font-semibold text-white/70 hover:text-white">(831) 435-9521</a>
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  );
}
