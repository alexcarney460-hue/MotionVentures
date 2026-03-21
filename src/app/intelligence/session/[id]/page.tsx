"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Container } from "@/components/ui";

/* ═══════════════════════════════════════════════════════════
   Types — SSE event shapes from /api/intelligence/run
   ═══════════════════════════════════════════════════════════ */

interface BaseEvent {
  type: string;
  timestamp?: string;
}

interface StatusEvent extends BaseEvent {
  type: "status";
  message: string;
}

interface PersonaCountEvent extends BaseEvent {
  type: "persona_count";
  count: number;
}

interface ProgressEvent extends BaseEvent {
  type: "progress";
  completed: number;
  total: number;
}

interface PersonaReaction {
  name: string;
  age?: number;
  occupation?: string;
  sentiment: string;
  quote: string;
}

interface BatchEvent extends BaseEvent {
  type: "batch";
  reactions: PersonaReaction[];
}

interface MetricsEvent extends BaseEvent {
  type: "metrics";
  avgSentiment: number;
  buyRate: number;
  useRate: number;
  topPrice?: string;
}

interface SentimentBar {
  label: string;
  count: number;
  color: string;
}

interface SentimentEvent extends BaseEvent {
  type: "sentiment_distribution";
  bars: SentimentBar[];
}

interface ObjectionOrPraise {
  text: string;
  count: number;
}

interface ObjectionsEvent extends BaseEvent {
  type: "objections";
  items: ObjectionOrPraise[];
}

interface PraiseEvent extends BaseEvent {
  type: "praise";
  items: ObjectionOrPraise[];
}

/* ThinkTank types */
interface Expert {
  name: string;
  title: string;
  role: string;
  position: "FOR" | "AGAINST" | "CONDITIONAL";
}

interface PanelEvent extends BaseEvent {
  type: "panel";
  experts: Expert[];
}

interface StatementEvent extends BaseEvent {
  type: "statement";
  round: number;
  expertName: string;
  position: "FOR" | "AGAINST" | "CONDITIONAL";
  content: string;
}

interface ExchangeEvent extends BaseEvent {
  type: "exchange";
  round: number;
  challenger: string;
  target: string;
  content: string;
}

interface SynthesisEvent extends BaseEvent {
  type: "synthesis";
  round: number;
  content: string;
}

interface ConsensusEvent extends BaseEvent {
  type: "consensus";
  summary: string;
  insights: string[];
  nextSteps: string[];
  votes: { name: string; position: string }[];
}

interface CompleteEvent extends BaseEvent {
  type: "complete";
  product: "crowdtest" | "thinktank";
}

interface ErrorEvent extends BaseEvent {
  type: "error";
  message: string;
}

type SSEEvent =
  | StatusEvent
  | PersonaCountEvent
  | ProgressEvent
  | BatchEvent
  | MetricsEvent
  | SentimentEvent
  | ObjectionsEvent
  | PraiseEvent
  | PanelEvent
  | StatementEvent
  | ExchangeEvent
  | SynthesisEvent
  | ConsensusEvent
  | CompleteEvent
  | ErrorEvent;

/* ═══════════════════════════════════════════════════════════
   Sentiment badge styles (reused from crowdtest page)
   ═══════════════════════════════════════════════════════════ */

const SENTIMENT_BADGE: Record<string, string> = {
  very_positive: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  positive: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  neutral: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  negative: "bg-red-500/10 text-red-300 border-red-500/20",
  very_negative: "bg-red-500/20 text-red-400 border-red-500/30",
};

const SENTIMENT_LABELS: Record<string, string> = {
  very_positive: "Very Positive",
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
  very_negative: "Very Negative",
};

const POSITION_COLORS: Record<string, string> = {
  FOR: "var(--mv-emerald)",
  AGAINST: "var(--mv-coral)",
  CONDITIONAL: "var(--mv-sapphire)",
};

/* ═══════════════════════════════════════════════════════════
   Helper components
   ═══════════════════════════════════════════════════════════ */

function Spinner() {
  return (
    <svg
      className="inline-block h-4 w-4 animate-spin text-gray-900"
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

function ProgressBar({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const filled = Math.round((completed / total) * 20);
  const empty = 20 - filled;
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
  return (
    <div className="flex items-center gap-3 font-mono text-sm">
      <span className="text-[var(--mv-sapphire)]">{bar}</span>
      <span className="text-zinc-400">
        {completed}/{total} responses
      </span>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="my-4 flex items-center gap-2">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Inline results dashboard — CrowdTest
   ═══════════════════════════════════════════════════════════ */

function CrowdTestDashboard({
  metrics,
  sentimentBars,
  objections,
  praise,
  allReactions,
}: {
  metrics: MetricsEvent | null;
  sentimentBars: SentimentBar[];
  objections: ObjectionOrPraise[];
  praise: ObjectionOrPraise[];
  allReactions: PersonaReaction[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <SectionDivider label="Results Dashboard" />

      {/* Key metrics row */}
      {metrics && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "Avg Sentiment",
              value:
                metrics.avgSentiment > 0
                  ? `+${metrics.avgSentiment.toFixed(2)}`
                  : metrics.avgSentiment.toFixed(2),
              sub:
                metrics.avgSentiment > 0.3
                  ? "positive"
                  : metrics.avgSentiment > -0.3
                    ? "slightly positive"
                    : "negative",
              accent: "text-emerald-400",
              border: "border-emerald-500/20",
              bg: "bg-emerald-500/5",
            },
            {
              label: "Would Buy",
              value: `${Math.round(metrics.buyRate * 100)}%`,
              sub: `of all personas`,
              accent: "text-[var(--mv-sapphire)]",
              border: "border-[var(--mv-sapphire)]/20",
              bg: "bg-[var(--mv-sapphire)]/5",
            },
            {
              label: "Would Use",
              value: `${Math.round(metrics.useRate * 100)}%`,
              sub: `of all personas`,
              accent: "text-[var(--mv-sapphire)]",
              border: "border-[var(--mv-sapphire)]/20",
              bg: "bg-[var(--mv-sapphire)]/5",
            },
            {
              label: "Top Price",
              value: metrics.topPrice ?? "N/A",
              sub: "most chosen",
              accent: "text-amber-400",
              border: "border-amber-500/20",
              bg: "bg-amber-500/5",
            },
          ].map((m) => (
            <div
              key={m.label}
              className={`rounded-lg border ${m.border} ${m.bg} p-3 sm:p-4`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {m.label}
              </div>
              <div
                className={`mt-1 font-mono text-2xl font-bold tracking-tight ${m.accent} sm:text-3xl`}
              >
                {m.value}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-zinc-600">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sentiment + Objections/Praise */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sentiment bars */}
        {sentimentBars.length > 0 && (
          <div>
            <SectionDivider label="Sentiment Distribution" />
            <div className="space-y-2.5">
              {sentimentBars.map((s) => {
                const maxCount = Math.max(...sentimentBars.map((b) => b.count));
                const total = sentimentBars.reduce((a, b) => a + b.count, 0);
                const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
                const barWidth =
                  maxCount > 0 ? Math.round((s.count / maxCount) * 100) : 0;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="w-24 text-right font-mono text-[11px] text-zinc-500 sm:w-28">
                      {s.label}
                    </span>
                    <div className="relative h-6 flex-1 overflow-hidden rounded bg-zinc-900">
                      <div
                        className="absolute inset-y-0 left-0 rounded transition-all duration-700"
                        style={{
                          width: `${barWidth}%`,
                          background: s.color,
                          opacity: 0.7,
                        }}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <span className="font-mono text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          {s.count}
                        </span>
                      </div>
                    </div>
                    <span className="w-8 font-mono text-[10px] text-zinc-600">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Objections + Praise */}
        <div className="space-y-5">
          {objections.length > 0 && (
            <div>
              <SectionDivider label="Top Objections" />
              <div className="space-y-2">
                {objections.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-red-500/10 bg-red-500/[0.03] px-3 py-2.5"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-red-500/15 font-mono text-[9px] font-bold text-red-400">
                      {obj.count}x
                    </span>
                    <span className="text-[13px] leading-snug text-zinc-400">
                      &ldquo;{obj.text}&rdquo;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {praise.length > 0 && (
            <div>
              <SectionDivider label="Top Praise" />
              <div className="space-y-2">
                {praise.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03] px-3 py-2.5"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-emerald-500/15 font-mono text-[9px] font-bold text-emerald-400">
                      {p.count}x
                    </span>
                    <span className="text-[13px] leading-snug text-zinc-400">
                      &ldquo;{p.text}&rdquo;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All individual reactions — expandable */}
      {allReactions.length > 0 && (
        <div>
          <SectionDivider label="All Persona Reactions" />
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mb-3 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 font-mono text-[11px] text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-300"
          >
            {expanded
              ? "Collapse reactions"
              : `Show all ${allReactions.length} reactions`}
          </button>
          {expanded && (
            <div className="space-y-3">
              {allReactions.map((p, i) => (
                <div
                  key={i}
                  className="animate-fade-in rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 font-mono text-[10px] font-bold text-zinc-500">
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-semibold text-zinc-300">
                        {p.name}
                      </span>
                      {p.age && p.occupation && (
                        <span className="font-mono text-[10px] text-zinc-600">
                          {p.age} / {p.occupation}
                        </span>
                      )}
                    </div>
                    <span
                      className={`ml-auto rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${SENTIMENT_BADGE[p.sentiment] ?? SENTIMENT_BADGE.neutral}`}
                    >
                      {SENTIMENT_LABELS[p.sentiment] ?? p.sentiment}
                    </span>
                  </div>
                  <p className="mt-2.5 border-l-2 border-zinc-700 pl-3 font-mono text-[12px] italic leading-relaxed text-zinc-500">
                    &ldquo;{p.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Inline results dashboard — ThinkTank
   ═══════════════════════════════════════════════════════════ */

function ThinkTankDashboard({
  consensus,
}: {
  consensus: ConsensusEvent;
}) {
  return (
    <div className="animate-fade-in space-y-6">
      <SectionDivider label="Final Results" />

      {/* Consensus */}
      <div className="rounded-2xl border border-[var(--mv-primary)]/20 bg-[var(--mv-primary)]/5 p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--mv-primary)]">
          Consensus
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          {consensus.summary}
        </p>
      </div>

      {/* Emergent insights */}
      {consensus.insights.length > 0 && (
        <div>
          <SectionDivider label="Emergent Insights" />
          <div className="space-y-2">
            {consensus.insights.map((insight, i) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--mv-sapphire)]/10 bg-[var(--mv-sapphire)]/[0.03] px-4 py-3"
              >
                <span className="text-[13px] leading-snug text-zinc-400">
                  {insight}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next steps */}
      {consensus.nextSteps.length > 0 && (
        <div>
          <SectionDivider label="Recommended Next Steps" />
          <ol className="space-y-2">
            {consensus.nextSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03] px-4 py-3"
              >
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-emerald-500/15 font-mono text-[9px] font-bold text-emerald-400">
                  {i + 1}
                </span>
                <span className="text-[13px] leading-snug text-zinc-400">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Panel vote */}
      {consensus.votes.length > 0 && (
        <div>
          <SectionDivider label="Panel Vote" />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {consensus.votes.map((v, i) => {
              const color =
                POSITION_COLORS[v.position] ?? "var(--mv-sapphire)";
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5"
                >
                  <span className="font-mono text-sm font-semibold text-zinc-300">
                    {v.name}
                  </span>
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                    style={{
                      color,
                      background: color + "15",
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {v.position}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Session Page
   ═══════════════════════════════════════════════════════════ */

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const terminalRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [product, setProduct] = useState<"crowdtest" | "thinktank" | null>(
    null,
  );

  /* Derived state from events */
  const allReactions = events
    .filter((e): e is BatchEvent => e.type === "batch")
    .flatMap((e) => e.reactions);

  const metrics =
    (events.find((e): e is MetricsEvent => e.type === "metrics") as
      | MetricsEvent
      | undefined) ?? null;

  const sentimentBars =
    (
      events.find(
        (e): e is SentimentEvent => e.type === "sentiment_distribution",
      ) as SentimentEvent | undefined
    )?.bars ?? [];

  const objections =
    (
      events.find((e): e is ObjectionsEvent => e.type === "objections") as
        | ObjectionsEvent
        | undefined
    )?.items ?? [];

  const praise =
    (
      events.find((e): e is PraiseEvent => e.type === "praise") as
        | PraiseEvent
        | undefined
    )?.items ?? [];

  const consensus = events.find(
    (e): e is ConsensusEvent => e.type === "consensus",
  ) as ConsensusEvent | undefined;

  const isComplete = events.some((e) => e.type === "complete");

  const latestProgress = [...events]
    .reverse()
    .find((e): e is ProgressEvent => e.type === "progress") as
    | ProgressEvent
    | undefined;

  /* Auto-scroll terminal */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [events]);

  /* SSE connection */
  const startStream = useCallback(() => {
    const controller = new AbortController();
    const isFreeSession = sessionId.startsWith("free-");

    async function run() {
      try {
        let endpoint = "/api/intelligence/run";
        let body: Record<string, string> = { sessionId };

        if (isFreeSession) {
          endpoint = "/api/intelligence/free-run";
          try {
            const stored = sessionStorage.getItem(`crowdtest-free-${sessionId}`);
            if (stored) {
              const parsed = JSON.parse(stored) as { question: string; audience: string };
              body = { question: parsed.question, audience: parsed.audience };
            }
          } catch {
            /* sessionStorage unavailable or parse error — proceed with empty body */
          }
        }

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errorBody = await res.text().catch(() => "Unknown error");
          setEvents((prev) => [
            ...prev,
            {
              type: "error" as const,
              message: `Server returned ${res.status}: ${errorBody}`,
            },
          ]);
          setHasError(true);
          setIsLive(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setHasError(true);
          setIsLive(false);
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const json = trimmed.slice(5).trim();
            if (!json || json === "[DONE]") continue;

            try {
              const event = JSON.parse(json) as SSEEvent;
              setEvents((prev) => [...prev, event]);

              if (event.type === "complete") {
                setProduct(event.product);
                setIsLive(false);
              }
              if (event.type === "error") {
                setHasError(true);
                setIsLive(false);
              }
            } catch {
              /* skip malformed JSON */
            }
          }
        }

        setIsLive(false);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setEvents((prev) => [
          ...prev,
          {
            type: "error" as const,
            message:
              err instanceof Error ? err.message : "Connection failed",
          },
        ]);
        setHasError(true);
        setIsLive(false);
      }
    }

    run();

    return () => {
      controller.abort();
    };
  }, [sessionId]);

  useEffect(() => {
    const cleanup = startStream();
    return cleanup;
  }, [startStream]);

  /* Detect product from events */
  useEffect(() => {
    if (product) return;
    const panelEvent = events.find((e) => e.type === "panel");
    if (panelEvent) {
      setProduct("thinktank");
      return;
    }
    const personaEvent = events.find((e) => e.type === "persona_count");
    if (personaEvent) {
      setProduct("crowdtest");
    }
  }, [events, product]);

  const productLabel = product === "thinktank" ? "Think Tank" : "CrowdTest";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--mv-mist),white_70%)]" />
        <Container>
          <div className="relative py-12 sm:py-16">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 font-mono text-xs text-gray-500">
              <Link
                href="/intelligence"
                className="transition hover:text-gray-900"
              >
                Intelligence
              </Link>
              <span>/</span>
              <span className="text-gray-600">{productLabel} Session</span>
            </div>

            {/* ── Terminal Container ── */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-950 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* Scan-line overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
                }}
              />

              {/* ── Header Bar ── */}
              <div className="relative flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {isLive ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                    ) : hasError ? (
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    ) : (
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-zinc-500" />
                    )}
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        isLive
                          ? "text-emerald-400"
                          : hasError
                            ? "text-red-400"
                            : "text-zinc-500"
                      }`}
                    >
                      {isLive
                        ? "Live"
                        : hasError
                          ? "Error"
                          : "Complete"}
                    </span>
                  </div>
                  <span className="hidden h-4 w-px bg-zinc-700 sm:block" />
                  <span className="hidden font-mono text-sm font-semibold text-zinc-300 sm:block">
                    {productLabel} Console
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-zinc-500">
                    session://{sessionId.slice(0, 16)}...
                  </span>
                </div>
              </div>

              {/* ── Terminal Body ── */}
              <div
                ref={terminalRef}
                className="relative max-h-[75vh] overflow-y-auto p-4 sm:p-6"
                style={{ scrollBehavior: "smooth" }}
              >
                {events.length === 0 && isLive && (
                  <div className="flex items-center gap-3 font-mono text-sm text-zinc-500">
                    <svg
                      className="inline-block h-4 w-4 animate-spin text-[var(--mv-sapphire)]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="animate-pulse">
                      Connecting to session...
                    </span>
                  </div>
                )}

                {/* Render each event */}
                <div className="space-y-3">
                  {events.map((event, i) => (
                    <TerminalLine key={i} event={event} index={i} />
                  ))}
                </div>

                {/* Progress bar — shown during active streaming */}
                {latestProgress && isLive && (
                  <div className="mt-4">
                    <ProgressBar
                      completed={latestProgress.completed}
                      total={latestProgress.total}
                    />
                  </div>
                )}

                {/* CrowdTest results dashboard */}
                {isComplete && product === "crowdtest" && (
                  <CrowdTestDashboard
                    metrics={metrics}
                    sentimentBars={sentimentBars}
                    objections={objections}
                    praise={praise}
                    allReactions={allReactions}
                  />
                )}

                {/* ThinkTank results dashboard */}
                {isComplete && product === "thinktank" && consensus && (
                  <ThinkTankDashboard consensus={consensus} />
                )}
              </div>

              {/* ── Console Footer ── */}
              <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/40 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  {isLive && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  )}
                  <span className="font-mono text-[10px] text-zinc-600">
                    {isLive
                      ? `Streaming... ${events.length} events received`
                      : isComplete
                        ? `Completed -- ${events.length} events`
                        : hasError
                          ? "Session ended with error"
                          : "Disconnected"}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-700">
                  v0.4.1-beta
                </span>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8 text-center">
              <Link
                href="/intelligence"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-mono text-sm text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-900 hover:shadow-md"
              >
                Back to Intelligence Suite
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />

      {/* Inline styles for animations */}
      <style jsx global>{`
        @keyframes terminal-fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: terminal-fade-in 0.3s ease-out forwards;
        }
        .terminal-line {
          animation: terminal-fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Individual terminal line renderer
   ═══════════════════════════════════════════════════════════ */

function TerminalLine({ event, index }: { event: SSEEvent; index: number }) {
  const delay = Math.min(index * 30, 300);

  const wrapperClass = "terminal-line";
  const wrapperStyle = { animationDelay: `${delay}ms`, opacity: 0 };

  switch (event.type) {
    case "status":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="flex items-center gap-2 font-mono text-sm text-zinc-400">
            <Spinner />
            <span>{event.message}</span>
          </div>
        </div>
      );

    case "persona_count":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="font-mono text-sm text-emerald-400">
            Generated {event.count} personas{" "}
            <span className="text-emerald-500">&#10003;</span>
          </div>
        </div>
      );

    case "progress":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <ProgressBar completed={event.completed} total={event.total} />
        </div>
      );

    case "batch":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="space-y-2">
            {event.reactions.map((r, j) => (
              <div
                key={j}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 font-mono text-[9px] font-bold text-zinc-500">
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-300">
                    {r.name}
                  </span>
                  <span
                    className={`ml-auto rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${SENTIMENT_BADGE[r.sentiment] ?? SENTIMENT_BADGE.neutral}`}
                  >
                    {SENTIMENT_LABELS[r.sentiment] ?? r.sentiment}
                  </span>
                </div>
                <p className="mt-2 border-l-2 border-zinc-700 pl-3 font-mono text-[11px] italic leading-relaxed text-zinc-500">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "panel":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <SectionDivider label="Expert Panel" />
          <div className="space-y-2">
            {event.experts.map((expert, j) => {
              const color =
                POSITION_COLORS[expert.position] ?? "var(--mv-sapphire)";
              return (
                <div
                  key={j}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 font-mono text-[10px] font-bold text-white/70">
                    {expert.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-sm font-semibold text-zinc-300">
                      {expert.name}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-600">
                      {expert.title}
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                    style={{
                      color,
                      background: color + "15",
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {expert.position}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "statement":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                Round {event.round}
              </span>
              <span className="font-mono text-sm font-semibold text-zinc-300">
                {event.expertName}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                style={{
                  color:
                    POSITION_COLORS[event.position] ?? "var(--mv-sapphire)",
                  background:
                    (POSITION_COLORS[event.position] ?? "var(--mv-sapphire)") +
                    "15",
                  border: `1px solid ${POSITION_COLORS[event.position] ?? "var(--mv-sapphire)"}30`,
                }}
              >
                {event.position}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/60">
              &ldquo;{event.content}&rdquo;
            </p>
          </div>
        </div>
      );

    case "exchange":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px]">
              <span className="uppercase tracking-widest text-zinc-600">
                Round {event.round}
              </span>
              <span className="font-semibold text-[var(--mv-coral)]">
                {event.challenger}
              </span>
              <svg
                className="h-3 w-3 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span className="font-semibold text-[var(--mv-sapphire)]">
                {event.target}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/60">
              &ldquo;{event.content}&rdquo;
            </p>
          </div>
        </div>
      );

    case "synthesis":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="rounded-lg border border-[var(--mv-primary)]/20 bg-[var(--mv-primary)]/5 p-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--mv-primary)]">
              Synthesis -- Round {event.round}
            </div>
            <p className="text-[13px] leading-relaxed text-white/65">
              {event.content}
            </p>
          </div>
        </div>
      );

    case "metrics":
    case "sentiment_distribution":
    case "objections":
    case "praise":
    case "consensus":
    case "complete":
      /* Rendered as part of the dashboard, not inline */
      return null;

    case "error":
      return (
        <div className={wrapperClass} style={wrapperStyle}>
          <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 font-mono text-sm text-red-400">
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>{event.message}</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
