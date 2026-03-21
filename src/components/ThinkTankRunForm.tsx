"use client";

import { useRef, useState } from "react";

export default function ThinkTankRunForm() {
  const questionRef = useRef("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout(product: string, tier: string) {
    setLoading(tier);
    setError(null);

    try {
      const res = await fetch("/api/intelligence/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          tier,
          question: questionRef.current,
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "Unknown error");
        throw new Error(`Checkout failed: ${body}`);
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong",
      );
      setLoading(null);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(168,85,247,0.04),transparent)]" />

      <div className="relative">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--mv-primary)]">
          Self-serve
        </div>
        <h3 className="font-[var(--font-sora)] text-2xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-3xl">
          Run Your Own Think Tank
        </h3>
        <p className="mt-2 max-w-lg text-sm text-gray-500">
          Pose your strategic question. We research real domain experts and
          simulate a multi-round adversarial debate.
        </p>

        <div className="mt-8 space-y-5">
          {/* Strategic question */}
          <div>
            <label
              htmlFor="tt-question"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-gray-500"
            >
              Strategic question
            </label>
            <textarea
              id="tt-question"
              rows={4}
              placeholder='e.g. "Should we launch a subscription model for our DTC skincare line, or stick with one-time purchases?"'
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--mv-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--mv-primary)]/30"
              onChange={(e) => {
                questionRef.current = e.target.value;
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 font-mono text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              onClick={() => handleCheckout("thinktank", "standard")}
              disabled={loading !== null}
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 sm:h-11"
            >
              {loading === "standard" ? (
                <LoadingSpinner />
              ) : (
                "Standard -- $99"
              )}
            </button>
            <button
              onClick={() => handleCheckout("thinktank", "deep")}
              disabled={loading !== null}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 sm:h-11"
            >
              {loading === "deep" ? (
                <LoadingSpinner />
              ) : (
                "Deep Research -- $299"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-current"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
