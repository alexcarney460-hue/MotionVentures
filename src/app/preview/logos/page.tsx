import Image from "next/image";
import Link from "next/link";

const marks = [
  { id: "1", src: "/brand/logo-previews/mark-1.png" },
  { id: "2", src: "/brand/logo-previews/mark-2.png" },
  { id: "3", src: "/brand/logo-previews/mark-3.png" },
  { id: "4", src: "/brand/logo-previews/mark-4.png" },
];

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--mv-primary)]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wide text-[color:var(--mv-primary)]/60">Preview</div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[color:var(--mv-primary)]">Logo mark options</h1>
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--mv-primary)]/70">
              Tell me which mark to ship in the header (1–4).
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="font-semibold text-[color:var(--mv-primary)]/70 hover:text-[color:var(--mv-primary)]"
            >
              ← Home
            </Link>
            <Link
              href="/preview/heroes"
              className="font-semibold text-[color:var(--mv-primary)]/70 hover:text-[color:var(--mv-primary)]"
            >
              Hero previews →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {marks.map((m) => (
            <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-[color:var(--mv-primary)]">Option {m.id}</div>
              <div className="mt-4 flex items-center justify-center rounded-xl border border-slate-100 bg-white p-4">
                <Image src={m.src} alt={`Logo mark ${m.id}`} width={220} height={220} />
              </div>
              <div className="mt-4 text-xs text-[color:var(--mv-primary)]/60">{m.src}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-[color:var(--mv-primary)]/75">
          URL: <span className="font-semibold text-[color:var(--mv-primary)]">/preview/logos</span>
        </div>
      </div>
    </div>
  );
}
