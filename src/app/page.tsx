import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Projects from "@/components/landing/Projects";
import Features from "@/components/landing/Features";
import SocialProof from "@/components/landing/SocialProof";
import CtaBanner from "@/components/landing/CtaBanner";
import DarkFooter from "@/components/landing/DarkFooter";
import DarkHeader from "@/components/landing/DarkHeader";
import Script from "next/script";
import { orgJsonLd } from "./schema";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />

      <SmoothScroll>
        <DarkHeader />
        <Hero />
        <Services />
        <Projects />
        <Features />
        <SocialProof />
        <CtaBanner />
        <DarkFooter />
      </SmoothScroll>
    </div>
  );
}
