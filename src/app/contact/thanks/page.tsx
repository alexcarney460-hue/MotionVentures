import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">{children}</div>;
}

export const metadata = {
  title: "Thanks",
};

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[color:var(--mv-canvas)]">
      <main className="py-16">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Submitted</div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[color:var(--mv-primary)]">
              Thanks — we’ll reply with a plan.
            </h1>
            <p className="mt-3 text-sm text-white/55">
              If it’s urgent, add “URGENT” to your email subject when you follow up.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/85 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]"
              >
                Send another
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
