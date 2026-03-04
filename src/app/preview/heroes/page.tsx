import Image from "next/image";
import Link from "next/link";

const heroes = [
  {
    id: "dark-1",
    label: "Dark hero 1",
    src: "/brand/previews/hero-dark-1.png",
  },
  {
    id: "dark-2",
    label: "Dark hero 2",
    src: "/brand/previews/hero-dark-2.png",
  },
  {
    id: "dark-3",
    label: "Dark hero 3",
    src: "/brand/previews/hero-dark-3.png",
  },
];

export default function HeroPreviewPage() {
  return (
    <div className="min-h-screen bg-[#070A10] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wide text-white/60">Preview</div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Dark Apple-event hero options</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Pick one and tell me the number (1/2/3). We’ll wire it into the homepage and animate
              it.
            </p>
          </div>
          <Link href="/" className="text-sm font-semibold text-white/80 hover:text-white">
            ← Back to homepage
          </Link>
        </div>

        <div className="mt-8 grid gap-6">
          {heroes.map((h, i) => (
            <div key={h.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="text-sm font-semibold">
                  Option {i + 1}: <span className="text-white/80">{h.label}</span>
                </div>
                <div className="text-xs text-white/60">{h.src}</div>
              </div>
              <div className="relative aspect-[16/9]">
                <Image src={h.src} alt={h.label} fill className="object-cover" priority={i === 0} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
          URL: <span className="text-white">/preview/heroes</span>
        </div>
      </div>
    </div>
  );
}
