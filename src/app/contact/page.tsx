import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">{children}</div>;
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "bg-[var(--mv-primary)] text-white shadow-sm shadow-slate-900/10 hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] hover:shadow-md hover:shadow-slate-900/10 focus:ring-[var(--mv-accent)]"
      : "border border-[var(--mv-border)] bg-white text-[var(--mv-primary)] shadow-sm shadow-slate-900/5 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:ring-[var(--mv-accent)]";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--mv-border)] bg-[color:var(--mv-canvas)]">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-slate-950">
              Motion Ventures
            </Link>
            <div className="flex items-center gap-3">
              <Button href="/" variant="secondary">
                Back
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-12 sm:py-16">
        <Container>
          <div className="rounded-3xl border border-[var(--mv-border)] bg-white p-8 shadow-sm shadow-slate-900/5 sm:p-10">
            <div className="inline-flex items-center rounded-full border border-[var(--mv-border)] bg-[var(--mv-mist)] px-3 py-1 text-xs font-semibold text-slate-800">
              No‑hassle intake
            </div>
            <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-[-0.04em] text-[color:var(--mv-ink)] sm:text-4xl">
              Get a plan
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Tell us what you want to automate. We’ll reply with a simple implementation plan.
            </p>

            {/* MVP: HTML form (no backend yet). Wire to email/CRM later. */}
            <form className="mt-8 grid gap-4" action="/contact/thanks" method="get">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-800">Name</span>
                  <input
                    name="name"
                    required
                    className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-slate-900 outline-none ring-[var(--mv-accent)] focus:ring-2"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-800">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-slate-900 outline-none ring-[var(--mv-accent)] focus:ring-2"
                    placeholder="jane@company.com"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-slate-800">Company (optional)</span>
                <input
                  name="company"
                  className="h-11 rounded-xl border border-[var(--mv-border)] bg-white px-3 text-slate-900 outline-none ring-[var(--mv-accent)] focus:ring-2"
                  placeholder="Acme Services"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-slate-800">What do you want to automate?</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="rounded-xl border border-[var(--mv-border)] bg-white px-3 py-3 text-slate-900 outline-none ring-[var(--mv-accent)] focus:ring-2"
                  placeholder="Example: When a lead fills our form, we want to send a text within 60 seconds, book appointments, and track response time."
                />
              </label>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-500">
                  By submitting, you agree we can email you back about this request.
                </div>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--mv-accent)] focus:ring-offset-2 active:translate-y-px"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-sm text-slate-600">
            Prefer email? <span className="font-semibold text-slate-900">hello@motionventures.ai</span> (placeholder)
          </div>
        </Container>
      </main>
    </div>
  );
}
