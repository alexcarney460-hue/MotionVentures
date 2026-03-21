import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FreeTrial from "@/components/FreeTrial";

export const metadata: Metadata = {
  title: "Try CrowdTest Free",
  description:
    "Test your idea with AI personas. No signup, no payment. Instant results.",
};

export default function TryPage() {
  return (
    <div className="light-page min-h-screen bg-white">
      <SiteHeader ctaLabel="Try Free" ctaHref="/try" />
      <FreeTrial />
      <SiteFooter />
    </div>
  );
}
