"use client";

import React from "react";
import BrowserChrome from "./BrowserChrome";

const LOOP_DURATION = 16; // seconds

const keyframes = `
@keyframes tt-fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes tt-slideUp {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes tt-typing {
  0%, 20% { opacity: 0.2; }
  50%     { opacity: 1; }
  80%, 100% { opacity: 0.2; }
}

@keyframes tt-loop {
  0%     { opacity: 1; }
  93%    { opacity: 1; }
  97%    { opacity: 0; }
  100%   { opacity: 0; }
}
`;

/* ---- data ---- */

interface Expert {
  initials: string;
  name: string;
  title: string;
  stance: "FOR" | "AGAINST" | "CONDITIONAL";
  stanceColor: string;
  stanceBg: string;
}

const EXPERTS: Expert[] = [
  {
    initials: "AC",
    name: "Andrew Chen",
    title: "GP, a16z",
    stance: "CONDITIONAL",
    stanceColor: "#eab308",
    stanceBg: "#eab30822",
  },
  {
    initials: "EK",
    name: "Eugenia Kuyda",
    title: "Founder, Replika",
    stance: "FOR",
    stanceColor: "#22c55e",
    stanceBg: "#22c55e22",
  },
  {
    initials: "SL",
    name: "Sam Lessin",
    title: "GP, Slow Ventures",
    stance: "AGAINST",
    stanceColor: "#ef4444",
    stanceBg: "#ef444422",
  },
  {
    initials: "PL",
    name: "Pieter Levels",
    title: "Solo Founder",
    stance: "FOR",
    stanceColor: "#22c55e",
    stanceBg: "#22c55e22",
  },
];

const STATEMENTS: { speaker: string; text: string }[] = [
  {
    speaker: "Andrew Chen",
    text: "You need atomic network density \u2014 10 AI personas with 100 engaged users each.",
  },
  {
    speaker: "Sam Lessin",
    text: "What stops someone from building this in a weekend? Where\u2019s the moat?",
  },
];

const INSIGHTS: string[] = [
  "Shareable results as distribution \u2014 each session is marketing",
  "Position as Synthetic Advisory, not AI tool \u2014 changes pricing power",
  "Brand quality is the moat, not the technology",
];

export default function ThinkTankDemo() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <BrowserChrome
        title="Think Tank"
        url="motionventures.co/intelligence/thinktank"
      >
        {/* master loop wrapper */}
        <div
          className="bg-gray-950 p-5 sm:p-6 min-h-[480px] overflow-hidden text-sm"
          style={{
            animation: `tt-loop ${LOOP_DURATION}s ease-in-out infinite`,
          }}
        >
          {/* ── Phase 1: Researching (0-2s) ── */}
          <div
            className="mb-4 font-mono"
            style={{
              opacity: 0,
              animation: "tt-fadeIn 0.4s ease forwards",
              animationDelay: "0s",
            }}
          >
            <span className="text-gray-400">
              {">"} Researching domain experts
            </span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block text-gray-400"
                style={{
                  animation: "tt-typing 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                .
              </span>
            ))}
          </div>

          {/* ── Phase 2: Expert panel (2-5s) ── */}
          <div
            className="grid grid-cols-2 gap-2 mb-5"
            style={{
              opacity: 0,
              animation: "tt-fadeIn 0.5s ease forwards",
              animationDelay: "2s",
            }}
          >
            {EXPERTS.map((e, i) => (
              <div
                key={e.name}
                className="bg-gray-800/50 border border-gray-700/40 rounded-lg p-3 flex items-center gap-3"
                style={{
                  opacity: 0,
                  animation: "tt-slideUp 0.5s ease forwards",
                  animationDelay: `${2.2 + i * 0.3}s`,
                }}
              >
                {/* Avatar circle with initials */}
                <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 shrink-0">
                  {e.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-white text-xs font-semibold truncate">
                    {e.name}
                  </div>
                  <div className="text-gray-400 text-[10px] truncate">
                    {e.title}
                  </div>
                  <span
                    className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: e.stanceBg,
                      color: e.stanceColor,
                    }}
                  >
                    {e.stance}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Phase 3: Round 1 statements (5-9s) ── */}
          <div
            className="mb-5"
            style={{
              opacity: 0,
              animation: "tt-fadeIn 0.3s ease forwards",
              animationDelay: "5s",
            }}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Round 1
            </div>
            {STATEMENTS.map((s, i) => (
              <div
                key={s.speaker}
                className="bg-gray-800/30 border-l-2 border-gray-600 pl-3 pr-3 py-2 mb-2 rounded-r-lg"
                style={{
                  opacity: 0,
                  animation: "tt-slideUp 0.6s ease forwards",
                  animationDelay: `${5.5 + i * 1.5}s`,
                }}
              >
                <span className="text-white text-xs font-semibold">
                  {s.speaker}:
                </span>{" "}
                <span className="text-gray-300 text-xs italic">
                  &ldquo;{s.text}&rdquo;
                </span>
              </div>
            ))}
          </div>

          {/* ── Phase 4: Emergent Insights (9-13s) ── */}
          <div
            className="mb-5"
            style={{
              opacity: 0,
              animation: "tt-fadeIn 0.4s ease forwards",
              animationDelay: "9s",
            }}
          >
            <div
              className="text-xs uppercase tracking-wider font-bold mb-2"
              style={{ color: "#22d3ee" }}
            >
              Emergent Insights
            </div>
            <div className="space-y-1.5">
              {INSIGHTS.map((insight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-gray-300"
                  style={{
                    opacity: 0,
                    animation: "tt-slideUp 0.5s ease forwards",
                    animationDelay: `${9.5 + i * 0.8}s`,
                  }}
                >
                  <span
                    className="mt-0.5 shrink-0 font-mono font-bold"
                    style={{ color: "#22d3ee" }}
                  >
                    {i + 1}.
                  </span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Phase 5: Panel vote (13-15s) ── */}
          <div
            className="bg-gray-800/40 border border-gray-700/40 rounded-lg px-4 py-3 text-center"
            style={{
              opacity: 0,
              animation: "tt-slideUp 0.6s ease forwards",
              animationDelay: "13s",
            }}
          >
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
              Panel Vote
            </div>
            <div className="flex items-center justify-center gap-3 text-sm font-semibold">
              <span style={{ color: "#22c55e" }}>5 for</span>
              <span className="text-gray-600">&middot;</span>
              <span style={{ color: "#ef4444" }}>2 against</span>
              <span className="text-gray-600">&middot;</span>
              <span style={{ color: "#eab308" }}>1 conditional</span>
            </div>
          </div>
        </div>
      </BrowserChrome>
    </>
  );
}
