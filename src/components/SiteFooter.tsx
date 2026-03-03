import Link from "next/link";
import { Container } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--mv-border)] bg-[color:var(--mv-canvas)]">
      <Container>
        <div className="flex flex-col gap-3 py-10 text-sm text-[color:var(--mv-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-[var(--font-sora)] font-semibold text-[color:var(--mv-ink)]">Motion Ventures</div>
            <div className="mt-1">AI venture studio + services arm.</div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/services" className="hover:text-[color:var(--mv-ink)]">
              Services
            </Link>
            <Link href="/assessment" className="hover:text-[color:var(--mv-ink)]">
              Free assessment
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
