import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>;
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
      className="text-balance font-[var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] text-[var(--mv-ink)] sm:text-5xl md:text-6xl"
    >
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-balance font-[var(--font-sora)] text-2xl font-bold tracking-[-0.02em] text-[var(--mv-ink)] md:text-3xl"
    >
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-pretty text-base text-[var(--mv-muted)] sm:text-lg">{children}</p>;
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
    "inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-px sm:h-11";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#38bdf8] text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md focus:ring-[#8b5cf6]"
      : "border border-white/[0.06] bg-[#111] text-[#ccc] shadow-sm hover:-translate-y-0.5 hover:bg-white/5 hover:text-white focus:ring-[#8b5cf6]";
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
      <div className="text-base font-bold tracking-tight text-[var(--mv-ink)]">{title}</div>
      <p className="mt-2 text-sm text-[var(--mv-muted)]">{description}</p>
    </>
  );

  const cls =
    "rounded-3xl border border-white/[0.06] bg-[#111] p-7 shadow-sm";

  return href ? (
    <Link href={href} className={`${cls} transition hover:-translate-y-0.5 hover:shadow-md hover:border-white/10`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
