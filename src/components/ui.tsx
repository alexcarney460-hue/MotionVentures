import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-balance font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] text-[color:var(--mv-primary)] sm:text-5xl md:text-6xl"
    >
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-balance font-[var(--font-sora)] text-2xl font-bold tracking-[-0.02em] text-[color:var(--mv-primary)] md:text-3xl"
    >
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-pretty text-base text-[color:var(--mv-muted)] sm:text-lg">{children}</p>;
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "bg-[var(--mv-primary)] text-white shadow-sm shadow-slate-900/10 hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] hover:shadow-md hover:shadow-slate-900/10 focus:ring-[var(--mv-accent)]"
      : "border border-[var(--mv-border)] bg-white text-[color:var(--mv-primary)] shadow-sm shadow-slate-900/5 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:ring-[var(--mv-accent)]";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function Card({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="text-base font-bold tracking-tight text-[color:var(--mv-primary)]">{title}</div>
      <p className="mt-2 text-sm text-[color:var(--mv-muted)]">{description}</p>
    </>
  );

  const cls =
    "rounded-3xl border border-[var(--mv-border)] bg-[var(--mv-surface)] p-7 shadow-sm shadow-slate-900/5";

  return href ? (
    <Link href={href} className={`${cls} transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/10`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
