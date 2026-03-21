"use client";

import React from "react";
import BrowserChrome from "./BrowserChrome";

/* ------------------------------------------------------------------ */
/*  CSS keyframes injected via a <style> tag so everything stays in   */
/*  this single file with zero JS timers.                              */
/* ------------------------------------------------------------------ */

const LOOP_DURATION = 15; // seconds

const keyframes = `
/* ── shared helpers ── */
@keyframes ct-fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes ct-slideUp {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes ct-typing {
  0%, 20% { opacity: 0.2; }
  50%     { opacity: 1; }
  80%, 100% { opacity: 0.2; }
}

/* ── sentiment bar grows ── */
@keyframes ct-growBar {
  0%   { width: 0%; }
  100% { width: var(--bar-w); }
}

/* ── master loop: keeps content visible then resets ── */
@keyframes ct-loop {
  0%     { opacity: 1; }
  93%    { opacity: 1; }
  97%    { opacity: 0; }
  100%   { opacity: 0; }
}
`;

/* ---- data ---- */

const BARS: { label: string; count: number; color: string; pct: number }[] = [
  { label: "very_positive", count: 8,  color: "#22c55e", pct: 32 },
  { label: "positive",      count: 16, color: "#86efac", pct: 64 },
  { label: "neutral",       count: 11, color: "#94a3b8", pct: 44 },
  { label: "negative",      count: 11, color: "#fca5a5", pct: 44 },
  { label: "very_negative",  count: 4,  color: "#ef4444", pct: 16 },
];

const METRICS = [
  { label: "Avg Sentiment", value: "+0.11" },
  { label: "Would Buy",     value: "46%" },
  { label: "Would Use",     value: "62%" },
  { label: "Top Price",     value: "$29/mo" },
];

const PERSONAS: {
  name: string;
  age: number;
  sentiment: string;
  color: string;
  quote: string;
}[] = [
  {
    name: "Devon Park",
    age: 28,
    sentiment: "very_positive",
    color: "#22c55e",
    quote: "Oh hell yes. Take my money.",
  },
  {
    name: "Sarah Whitfield",
    age: 55,
    sentiment: "very_negative",
    color: "#ef4444",
    quote: "AI personas are just fancy Mad Libs.",
  },
  {
    name: "Kwame Asante",
    age: 29,
    sentiment: "positive",
    color: "#86efac",
    quote: "Just spent $3K on a focus group and insights were mid.",
  },
  {
    name: "Megan O'Reilly",
    age: 29,
    sentiment: "very_positive",
    color: "#22c55e",
    quote: "Shutting up and taking my money.",
  },
];

export default function CrowdTestDemo() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <BrowserChrome
        title="CrowdTest"
        url="motionventures.co/intelligence/crowdtest"
      >
        {/* master loop wrapper */}
        <div
          className="bg-gray-950 p-5 sm:p-6 min-h-[420px] overflow-hidden font-mono text-sm"
          style={{
            animation: `ct-loop ${LOOP_DURATION}s ease-in-out infinite`,
          }}
        >
          {/* ── Phase 1: Creating personas (0-3s) ── */}
          <div
            className="mb-4"
            style={{
              opacity: 0,
              animation: "ct-fadeIn 0.4s ease forwards",
              animationDelay: "0s",
            }}
          >
            <span className="text-gray-400">
              {">"} Creating synthetic personas
            </span>
            {/* pulsing dots */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block text-gray-400"
                style={{
                  animation: "ct-typing 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                .
              </span>
            ))}
          </div>

          <div
            className="mb-5 text-green-400"
            style={{
              opacity: 0,
              animation: "ct-fadeIn 0.5s ease forwards",
              animationDelay: "2s",
            }}
          >
            Generated 50 personas ✓
          </div>

          {/* ── Phase 2: Sentiment bars (3-6s) ── */}
          <div
            className="mb-5 space-y-2"
            style={{
              opacity: 0,
              animation: "ct-fadeIn 0.4s ease forwards",
              animationDelay: "3s",
            }}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Sentiment Distribution
            </div>
            {BARS.map((bar, i) => (
              <div key={bar.label} className="flex items-center gap-3">
                <span className="w-28 text-xs text-gray-400 text-right shrink-0">
                  {bar.label}
                </span>
                <div className="flex-1 h-4 bg-gray-800 rounded-sm overflow-hidden">
                  <div
                    className="h-full rounded-sm"
                    style={
                      {
                        "--bar-w": `${bar.pct}%`,
                        backgroundColor: bar.color,
                        width: 0,
                        animation: "ct-growBar 0.8s ease forwards",
                        animationDelay: `${3.4 + i * 0.2}s`,
                      } as React.CSSProperties
                    }
                  />
                </div>
                <span className="w-6 text-xs text-gray-300 text-right tabular-nums">
                  {bar.count}
                </span>
              </div>
            ))}
          </div>

          {/* ── Phase 3: Key metrics (6-9s) ── */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5"
            style={{
              opacity: 0,
              animation: "ct-fadeIn 0.5s ease forwards",
              animationDelay: "6s",
            }}
          >
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className="bg-gray-800/60 border border-gray-700/50 rounded-lg px-3 py-2 text-center"
                style={{
                  opacity: 0,
                  animation: "ct-slideUp 0.5s ease forwards",
                  animationDelay: `${6.2 + i * 0.3}s`,
                }}
              >
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-base font-bold text-white mt-0.5 tabular-nums">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Phase 4: Persona reactions (9-14s) ── */}
          <div
            className="space-y-3"
            style={{
              opacity: 0,
              animation: "ct-fadeIn 0.3s ease forwards",
              animationDelay: "9s",
            }}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Individual Reactions
            </div>
            {PERSONAS.map((p, i) => (
              <div
                key={p.name}
                className="bg-gray-800/40 border border-gray-700/40 rounded-lg p-3"
                style={{
                  opacity: 0,
                  animation: "ct-slideUp 0.6s ease forwards",
                  animationDelay: `${9.3 + i * 1}s`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-xs font-semibold">
                    {p.name}, {p.age}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${p.color}22`,
                      color: p.color,
                    }}
                  >
                    {p.sentiment}
                  </span>
                </div>
                <p className="text-gray-300 text-xs italic">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </BrowserChrome>
    </>
  );
}
