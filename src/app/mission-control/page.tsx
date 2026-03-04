import Link from "next/link";
import MissionControlSim from "./MissionControlSim";
import AnalyticsSim from "./AnalyticsSim";
import NeonEdges from "@/components/NeonEdges";

export const metadata = {
  title: "Mission Control",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
      {children}
    </span>
  );
}

function NavItem({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={
        "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition " +
        (active
          ? "bg-white/10 text-white"
          : "text-white/65 hover:bg-white/5 hover:text-white")
      }
    >
      <span>{label}</span>
      {active ? <span className="text-[10px] text-white/45">LIVE</span> : null}
    </Link>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur " +
        (className ?? "")
      }
    >
      {title ? (
        <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold text-white/60">
          {title}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function MissionControlPage() {
  return (
    <div className="min-h-screen bg-[color:var(--mv-canvas)] text-[color:var(--mv-ink)]">
      {/* top bar */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[color:var(--mv-canvas)]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5" />
            <div>
              <div className="text-xs font-semibold text-white/50">Motion Ventures</div>
              <div className="text-sm font-extrabold tracking-tight">Mission Control</div>
            </div>
            <div className="ml-2 hidden items-center gap-2 md:flex">
              <Pill>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Systems healthy
              </Pill>
              <Pill>Simulation UI</Pill>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <input
                placeholder="Search workflows, agents, drafts"
                className="h-10 w-[320px] rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]"
              />
            </div>
            <button className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-4 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]">
              New workflow
            </button>
          </div>
        </div>
      </header>

      {/* layout */}
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-6 sm:px-6 lg:grid-cols-12">
        {/* left nav */}
        <aside className="lg:col-span-3">
          <Card>
            <div className="grid gap-1">
              <NavItem href="/mission-control" label="Workflows" active />
              <NavItem href="/mission-control" label="Agents" />
              <NavItem href="/mission-control" label="Drafts" />
              <NavItem href="/mission-control" label="Queue" />
              <NavItem href="/mission-control" label="Analytics" />
              <NavItem href="/mission-control" label="Settings" />
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs font-semibold text-white/65">Workspace</div>
              <div className="mt-1 text-sm font-extrabold tracking-tight text-white/90">Viking Labs</div>
              <div className="mt-2 text-xs text-white/45">Content engine · approvals · publishing</div>
            </div>
          </Card>
        </aside>

        {/* middle: workflows + canvas + neon analytics/console */}
        <main className="lg:col-span-6">
          <div className="grid gap-5">
            <Card title="Workflows">
              <div className="grid gap-3">
                <button className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold tracking-tight text-white/90">
                      Daily Content Engine
                    </div>
                    <span className="text-xs font-semibold text-emerald-300">Active</span>
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Catalyst → Maven → Echo → Tags → Guardian → Publisher
                  </div>
                </button>

                <button className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-left transition hover:bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold tracking-tight text-white/80">Lead Intake → CRM</div>
                    <span className="text-xs font-semibold text-white/40">Paused</span>
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Form → enrichment → routing → follow-up
                  </div>
                </button>

                <button className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-left transition hover:bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold tracking-tight text-white/80">SEO Page Factory</div>
                    <span className="text-xs font-semibold text-white/40">Draft</span>
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Keyword set → template → publish
                  </div>
                </button>
              </div>
            </Card>

            <Card title="Workflow canvas">
              <div className="mv-canvas relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(circle_at_30%_30%,black,transparent_70%)]">
                  <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-300 blur-3xl" />
                  <div className="absolute -bottom-28 right-0 h-[520px] w-[520px] rounded-full bg-violet-400 blur-3xl" />
                </div>

                {/* neon edges overlay */}
                <NeonEdges
                  className="pointer-events-none absolute inset-0 opacity-80"
                  edges={[
                    { from: { x: 120, y: 118 }, to: { x: 500, y: 118 }, accent: "cyan" },
                    { from: { x: 500, y: 118 }, to: { x: 880, y: 118 }, accent: "violet" },
                    { from: { x: 120, y: 280 }, to: { x: 500, y: 280 }, accent: "emerald" },
                    { from: { x: 500, y: 280 }, to: { x: 880, y: 280 }, accent: "cyan" },
                    { from: { x: 120, y: 442 }, to: { x: 500, y: 442 }, accent: "coral" },
                    { from: { x: 500, y: 442 }, to: { x: 880, y: 442 }, accent: "violet" },
                  ]}
                />

                <div className="relative grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-white/55">Daily Content Engine — graph</div>
                    <div className="text-[11px] text-white/40">neon edges · node accents</div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      { name: "Catalyst", desc: "Idea + angle", ring: "ring-cyan-300/20" },
                      { name: "Maven", desc: "Brief + outline", ring: "ring-violet-300/20" },
                      { name: "Echo", desc: "Draft copy", ring: "ring-emerald-300/20" },
                      { name: "Tags", desc: "Metadata + SEO", ring: "ring-cyan-300/20" },
                      { name: "Guardian", desc: "Compliance", ring: "ring-rose-300/20" },
                      { name: "Publisher", desc: "Schedule/post", ring: "ring-violet-300/20" },
                    ].map((n) => (
                      <div
                        key={n.name}
                        className={`mv-node rounded-2xl border border-white/10 bg-white/5 p-3 ring-1 ${n.ring}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-extrabold tracking-tight text-white/90">{n.name}</div>
                          <span className="text-[10px] font-semibold text-white/45">node</span>
                        </div>
                        <div className="mt-1 text-xs text-white/45">{n.desc}</div>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
                          <div className="h-1.5 w-2/3 rounded-full bg-[var(--mv-primary)]/70" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-1 text-xs text-white/40">
                    Tip: this is a simulation UI for now—real agent runs can be wired later.
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Console + agent telemetry">
              <MissionControlSim />
            </Card>
          </div>
        </main>

        {/* right: run panel */}
        <aside className="lg:col-span-3">
          <div className="grid gap-5">
            <Card title="Run panel">
              <div className="grid gap-3">
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <div className="text-xs font-semibold text-white/55">Status</div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-sm font-extrabold tracking-tight text-white/90">Generating drafts</div>
                    <span className="text-xs font-semibold text-emerald-300">Running</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/5">
                    <div className="h-1.5 w-[55%] rounded-full bg-emerald-400/70" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] font-semibold text-white/45">Risk score</div>
                    <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">0.18</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] font-semibold text-white/45">Tokens</div>
                    <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">~8.4k</div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <div className="text-xs font-semibold text-white/55">Logs</div>
                  <div className="mt-2 grid gap-1 font-mono text-[11px] leading-relaxed text-white/50">
                    <div>23:19:14 Catalyst → angle selected</div>
                    <div>23:19:22 Maven → brief generated (v2)</div>
                    <div>23:19:35 Echo → writing draft 1/3…</div>
                    <div>23:19:46 Tags → keywords + schema</div>
                    <div>23:19:58 Guardian → passed (0.18)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-white/10 px-4 text-sm font-semibold text-white/80 transition hover:bg-white/15">
                    Reject
                  </button>
                  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-4 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]">
                    Approve
                  </button>
                </div>
              </div>
            </Card>

            <Card title="Drafts (simulated)">
              <div className="grid gap-3">
                {[
                  { title: "Peptides for research — what quality looks like", status: "Ready" },
                  { title: "Why SOPs beat vibes: lab-grade operations", status: "In review" },
                  { title: "How to build an AI content engine (without spam)", status: "Queued" },
                ].map((d) => (
                  <div key={d.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-extrabold tracking-tight text-white/90">{d.title}</div>
                      <span className="shrink-0 rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] font-semibold text-white/55">
                        {d.status}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-white/45">Channel: LinkedIn · Tone: cinematic/pro</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </aside>
      </div>

      {/* Full-width analytics */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-1 pb-3">
            <div>
              <div className="text-xs font-semibold text-white/60">Analytics</div>
              <div className="mt-1 text-sm font-extrabold tracking-tight text-white/90">
                Realtime performance (simulated)
              </div>
            </div>
            <div className="text-xs text-white/40">charts · funnels · realtime feed</div>
          </div>
          <div className="pt-4 grid gap-5">
            <AnalyticsSim />

            {/* Lead scraper results (simulated) */}
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-white/60">Lead scraper results (sim)</div>
                <div className="text-xs text-white/40">enrichment · scoring · export</div>
              </div>

              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-12 gap-2 bg-white/5 px-3 py-2 text-[10px] font-semibold text-white/45">
                  <div className="col-span-4">Company</div>
                  <div className="col-span-3">Niche</div>
                  <div className="col-span-2">Email</div>
                  <div className="col-span-2">Score</div>
                  <div className="col-span-1 text-right">Status</div>
                </div>

                {[
                  {
                    company: "ClearSpring Dental",
                    niche: "Dental",
                    email: "verified",
                    score: 92,
                    status: "Queued",
                    accent: "emerald",
                  },
                  {
                    company: "Riverline Roofing",
                    niche: "Home services",
                    email: "risky",
                    score: 71,
                    status: "Review",
                    accent: "coral",
                  },
                  {
                    company: "Northwind Med Spa",
                    niche: "Aesthetics",
                    email: "verified",
                    score: 88,
                    status: "Enriched",
                    accent: "cyan",
                  },
                  {
                    company: "Summit HVAC",
                    niche: "Home services",
                    email: "verified",
                    score: 95,
                    status: "Ready",
                    accent: "emerald",
                  },
                  {
                    company: "Keystone Law Group",
                    niche: "Legal",
                    email: "risky",
                    score: 64,
                    status: "Hold",
                    accent: "coral",
                  },
                ].map((r) => {
                  const pill =
                    r.accent === "emerald"
                      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
                      : r.accent === "cyan"
                        ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
                        : "border-rose-300/25 bg-rose-300/10 text-rose-200";
                  return (
                    <div
                      key={r.company}
                      className="grid grid-cols-12 gap-2 border-t border-white/10 bg-black/20 px-3 py-2 text-xs text-white/65"
                    >
                      <div className="col-span-4 truncate font-semibold text-white/80">{r.company}</div>
                      <div className="col-span-3 truncate text-white/55">{r.niche}</div>
                      <div className="col-span-2 text-white/55">{r.email}</div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-full rounded-full bg-white/5">
                            <div
                              className="h-1.5 rounded-full bg-[var(--mv-primary)]/70"
                              style={{ width: `${r.score}%` }}
                            />
                          </div>
                          <div className="w-8 text-right text-white/55">{r.score}</div>
                        </div>
                      </div>
                      <div className="col-span-1 text-right">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${pill}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <button className="inline-flex h-10 items-center justify-center rounded-xl bg-white/10 px-4 text-sm font-semibold text-white/80 transition hover:bg-white/15">
                  Export CSV
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-4 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]">
                  Scrape more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-white/35">
          This is a UI simulation (Mission Control). No integrations.
        </div>
      </div>
    </div>
  );
}
