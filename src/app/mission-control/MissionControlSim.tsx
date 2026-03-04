'use client'

import * as React from 'react'

type Severity = 'OK' | 'INFO' | 'WARN' | 'ERROR'

type LogLine = {
  t: string
  s: Severity
  msg: string
}

type Agent = {
  name: string
  role: string
  accent: 'violet' | 'cyan' | 'emerald' | 'coral'
  status: 'Idle' | 'Running' | 'Review'
}

const AGENTS: Agent[] = [
  { name: 'Catalyst', role: 'Angles', accent: 'cyan', status: 'Running' },
  { name: 'Maven', role: 'Briefs', accent: 'violet', status: 'Running' },
  { name: 'Echo', role: 'Drafts', accent: 'emerald', status: 'Running' },
  { name: 'Tags', role: 'SEO', accent: 'cyan', status: 'Idle' },
  { name: 'Guardian', role: 'Compliance', accent: 'coral', status: 'Review' },
  { name: 'Publisher', role: 'Schedule', accent: 'violet', status: 'Idle' },
  { name: 'Courier', role: 'Sales DMs', accent: 'emerald', status: 'Running' },
]

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function nowHHMMSS() {
  const d = new Date()
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

function AccentDot({ accent }: { accent: Agent['accent'] }) {
  const cls =
    accent === 'cyan'
      ? 'bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]'
      : accent === 'emerald'
        ? 'bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.45)]'
        : accent === 'coral'
          ? 'bg-rose-300 shadow-[0_0_18px_rgba(251,113,133,0.45)]'
          : 'bg-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.45)]'
  return <span className={`h-1.5 w-1.5 rounded-full ${cls}`} />
}

function Avatar({ name, accent }: { name: string; accent: Agent['accent'] }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const bg =
    accent === 'cyan'
      ? 'bg-gradient-to-br from-cyan-300/25 to-cyan-300/0'
      : accent === 'emerald'
        ? 'bg-gradient-to-br from-emerald-300/25 to-emerald-300/0'
        : accent === 'coral'
          ? 'bg-gradient-to-br from-rose-300/25 to-rose-300/0'
          : 'bg-gradient-to-br from-violet-300/25 to-violet-300/0'

  return (
    <div className={`grid h-9 w-9 place-items-center rounded-xl border border-white/10 ${bg}`}>
      <div className="text-xs font-extrabold tracking-tight text-white/85">{initials}</div>
    </div>
  )
}

function Metric({ k, v, accent }: { k: string; v: string; accent: Agent['accent'] }) {
  const ring =
    accent === 'cyan'
      ? 'ring-cyan-300/25'
      : accent === 'emerald'
        ? 'ring-emerald-300/25'
        : accent === 'coral'
          ? 'ring-rose-300/25'
          : 'ring-violet-300/25'
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-3 ring-1 ${ring}`}>
      <div className="text-[10px] font-semibold text-white/45">{k}</div>
      <div className="mt-1 text-lg font-extrabold tracking-tight text-white/90">{v}</div>
    </div>
  )
}

function SeverityPill({ s }: { s: Severity }) {
  const cls =
    s === 'OK'
      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
      : s === 'WARN'
        ? 'border-amber-300/25 bg-amber-300/10 text-amber-200'
        : s === 'ERROR'
          ? 'border-rose-300/25 bg-rose-300/10 text-rose-200'
          : 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${cls}`}>{s}</span>
  )
}

export default function MissionControlSim() {
  const [orders, setOrders] = React.useState(142)
  const [revenue, setRevenue] = React.useState(38940)
  const [leads, setLeads] = React.useState(28)
  const [scrape, setScrape] = React.useState(612)

  const [logs, setLogs] = React.useState<LogLine[]>([
    { t: '23:59:12', s: 'INFO', msg: 'Scheduler → tick (daily content engine)' },
    { t: '23:59:18', s: 'OK', msg: 'Guardian → policy pack loaded' },
    { t: '23:59:31', s: 'INFO', msg: 'Echo → generating draft 1/3' },
  ])

  // Simulated realtime metrics + logs
  React.useEffect(() => {
    const metrics = window.setInterval(() => {
      setOrders((v) => v + (Math.random() < 0.12 ? 1 : 0))
      setLeads((v) => v + (Math.random() < 0.18 ? 1 : 0))
      setScrape((v) => v + Math.floor(2 + Math.random() * 7))
      setRevenue((v) => v + (Math.random() < 0.1 ? Math.floor(90 + Math.random() * 260) : 0))
    }, 1400)

    const severities: Severity[] = ['INFO', 'OK', 'INFO', 'INFO', 'WARN', 'OK']
    const messages = [
      'Catalyst → angle selected ("lab-grade trust")',
      'Maven → brief generated (v3)',
      'Tags → schema + keywords attached',
      'Guardian → passed (risk 0.18)',
      'Publisher → queued for 09:10',
      'Scraper → enriched lead record',
      'Analytics → 1 new order event',
      'Echo → draft finalized (2/3)',
      'Queue → job acknowledged',
      'Courier → drafted 1st-touch DM (personalized)',
      'Courier → queued follow-up (T+48h)',
      'Courier → enriched profile + extracted hook',
    ]

    const stream = window.setInterval(() => {
      const s = severities[Math.floor(Math.random() * severities.length)]
      const msg = messages[Math.floor(Math.random() * messages.length)]
      const line: LogLine = { t: nowHHMMSS(), s, msg }
      setLogs((prev) => {
        const next = [line, ...prev]
        return next.slice(0, 14)
      })
    }, 950)

    return () => {
      window.clearInterval(metrics)
      window.clearInterval(stream)
    }
  }, [])

  return (
    <div className="grid gap-5">
      {/* Neon analytics */}
      <div className="grid gap-3 md:grid-cols-4">
        <Metric k="Website orders" v={String(orders)} accent="emerald" />
        <Metric k="Revenue (30d)" v={`$${revenue.toLocaleString()}`} accent="violet" />
        <Metric k="Leads captured" v={String(leads)} accent="cyan" />
        <Metric k="Lead scrape/day" v={String(scrape)} accent="coral" />
      </div>

      {/* Agent roster */}
      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-white/60">Agents</div>
          <div className="text-xs text-white/40">avatars · statuses · accents</div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {AGENTS.map((a) => (
            <div key={a.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <Avatar name={a.name} accent={a.accent} />
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-extrabold tracking-tight text-white/90">{a.name}</div>
                    <AccentDot accent={a.accent} />
                  </div>
                  <div className="text-xs text-white/45">{a.role}</div>
                </div>
              </div>
              <div className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] font-semibold text-white/55">
                {a.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neon console */}
      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-white/60">Console (simulated realtime)</div>
          <div className="text-xs text-white/40">stream · severity · neon</div>
        </div>
        <div className="mt-3 grid gap-2 font-mono text-[11px] leading-relaxed">
          {logs.map((l, i) => (
            <div key={l.t + i} className="flex items-start gap-2">
              <div className="w-[74px] text-white/35">{l.t}</div>
              <SeverityPill s={l.s} />
              <div className="text-white/55">{l.msg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
