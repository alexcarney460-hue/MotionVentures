import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Preview — Nature Frames",
};

const frames = [
  "/brand/nature/mv-macro-nature-1.png",
  "/brand/nature/mv-macro-nature-2.png",
  "/brand/nature/mv-macro-nature-3.png",
  "/brand/nature/mv-macro-nature-4.png",
  "/brand/nature/mv-macro-nature-5.png",
  "/brand/nature/mv-macro-nature-6.png",
];

export default function NaturePreviewPage() {
  return (
    <div className="min-h-screen bg-[color:var(--mv-canvas)] text-[color:var(--mv-ink)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white/50">Preview</div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Macro nature frames</h1>
            <div className="mt-2 text-sm text-white/55">
              Local-only assets in <span className="font-semibold text-white/70">/public/brand/nature</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            Back home
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {frames.map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <div className="relative aspect-[16/9]">
                <Image src={src} alt="Macro nature frame" fill className="object-cover" />
              </div>
              <div className="border-t border-white/10 px-4 py-3 text-xs text-white/55">
                {src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
