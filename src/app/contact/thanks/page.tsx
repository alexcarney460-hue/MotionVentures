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
          <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-10 shadow-sm shadow-slate-900/5">
            <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Submitted</div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[color:var(--mv-primary)]">
              Thanks — we’ll reply with a plan.
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              If it’s urgent, add “URGENT” to your email subject when you follow up.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--mv-border)] bg-white px-5 text-sm font-semibold text-[color:var(--mv-primary)] shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-slate-50"
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
