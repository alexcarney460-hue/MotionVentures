"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FreeTrial() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedQuestion = question.trim();
      if (!trimmedQuestion) {
        setError("Please describe what you want to test.");
        return;
      }

      setLoading(true);
      setError(null);

      const sessionId = `free-${Date.now()}`;

      try {
        // Store the free trial params so the session page can pick them up
        sessionStorage.setItem(
          `crowdtest-free-${sessionId}`,
          JSON.stringify({
            question: trimmedQuestion,
            audience: audience.trim() || "General US adults 25-55",
          }),
        );

        router.push(`/intelligence/session/${sessionId}`);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
        setLoading(false);
      }
    },
    [question, audience, router],
  );

  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:py-24">
      {/* Headline */}
      <h1 className="font-[var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Test your idea. Free.
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg leading-relaxed text-[#888]">
        10 synthetic personas will react to your concept in under 60 seconds.
        No signup required.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        {/* Question */}
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-[#ccc]"
          >
            What are you testing?
          </label>
          <textarea
            id="question"
            rows={6}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your product idea, ad copy, landing page concept, or business question..."
            className="mt-2 w-full rounded-xl border border-white/[0.06] bg-[#111] px-4 py-3 text-white placeholder-[#666] transition focus:border-white/20 focus:outline-none focus:ring-0"
            disabled={loading}
          />
        </div>

        {/* Audience */}
        <div>
          <label
            htmlFor="audience"
            className="block text-sm font-medium text-[#ccc]"
          >
            Who is your target audience?
          </label>
          <input
            id="audience"
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. US women 25-45 who shop online"
            className="mt-2 w-full rounded-xl border border-white/[0.06] bg-[#111] px-4 py-3 text-white placeholder-[#666] transition focus:border-white/20 focus:outline-none focus:ring-0"
            disabled={loading}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[var(--mv-primary)] px-8 py-3 text-lg font-medium text-white transition hover:bg-[var(--mv-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
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
              Starting...
            </span>
          ) : (
            "Run Free CrowdTest \u2192"
          )}
        </button>
      </form>

      {/* Want more? */}
      <div className="mt-16 rounded-2xl border border-white/[0.04] bg-[#111] px-6 py-5">
        <p className="text-sm leading-relaxed text-[#888]">
          <span className="font-medium text-[#ccc]">Want more?</span>{" "}
          Free gives you 10 personas. Pro gives you 50 + Think Tank + customer
          data grounding.
        </p>
        <Link
          href="/services"
          className="mt-2 inline-block text-sm font-medium text-white transition hover:text-[#999]"
        >
          See plans &rarr;
        </Link>
      </div>
    </main>
  );
}
