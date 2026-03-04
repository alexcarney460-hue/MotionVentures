'use client'

import * as React from 'react'

type Point = { x: number; y: number }

type FeedItem = {
  t: string
  tag: 'ORDER' | 'LEAD' | 'SCRAPE'
  title: string
  meta: string
  accent: 'emerald' | 'cyan' | 'coral'
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function nowHHMMSS() {
  const d = new Date()
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

function Sparkline({ points, accent }: { points: number[]; accent: 'emerald' | 'cyan' | 'violet' }) {
  const w = 220
  const h = 44
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = Math.max(1, max - min)
  const pts: Point[] = points.map((v, i) => ({
    x: (i / (points.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }))

  const d = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')

  const stroke =
    accent === 'emerald'
      ? 'rgba(52, 211, 153, 0.95)'
      : accent === 'cyan'
        ? 'rgba(34, 211, 238, 0.95)'
        : 'rgba(167, 139, 250, 0.95)'

  const glow =
    accent === 'emerald'
      ? 'drop-shadow(0 0 18px rgba(52,211,153,0.35))'
      : accent === 'cyan'
        ? 'drop-shadow(0 0 18px rgba(34,211,238,0.35))'
        : 'drop-shadow(0 0 18px rgba(167,139,250,0.35))'

  return (
    <svg width={w} height={h} className="block" aria-hidden>
      <path d={d} fill="none" stroke={stroke} strokeWidth={2} style={{ filter: glow }} />
    </svg>
  )
}

function Bar({ label, value, accent }: { label: string; value: number; accent: 'emerald' | 'cyan' | 'violet' }) {
  const widthPct = Math.max(6, Math.min(100, value))
  const bar =
    accent === 'emerald'
      ? 'bg-emerald-300/65'
      : accent === 'cyan'
        ? 'bg-cyan-300/65'
        : 'bg-violet-300/65'
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-xs">
        <div className="font-semibold text-white/60">{label}</div>
        <div className="text-white/40">{Math.round(value)}%</div>
      </div>
      <div className="h-2 w-full rounded-full bg-white/5">
        <div className={`h-2 rounded-full ${bar}`} style={{ width: `${widthPct}%` }} />
      </div>
    </div>
  )
}

function FeedPill({ tag, accent }: { tag: FeedItem['tag']; accent: FeedItem['accent'] }) {
  const cls =
    accent === 'emerald'
      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
      : accent === 'cyan'
        ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
        : 'border-rose-300/25 bg-rose-300/10 text-rose-200'
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${cls}`}>{tag}</span>
  )
}

export default function AnalyticsSim() {
  const [orders, setOrders] = React.useState(() => Array.from({ length: 24 }, () => 10 + Math.random() * 22))
  const [revenue, setRevenue] = React.useState(() => Array.from({ length: 24 }, () => 80 + Math.random() * 120))
  const [leads, setLeads] = React.useState(() => Array.from({ length: 24 }, () => 6 + Math.random() * 14))

  const [funnel, setFunnel] = React.useState({
    visitsToLead: 3.8,
    leadToCall: 22,
    callToClose: 31,
  })

  const [feed, setFeed] = React.useState<FeedItem[]>([
    {
      t: '23:58:20',
      tag: 'ORDER',
      title: 'Order completed — $189.00',
      meta: 'SKU: MV-STARTER · source: direct',
      accent: 'emerald',
    },
    {
      t: '23:58:44',
      tag: 'LEAD',
      title: 'Lead captured — "home services"',
      meta: 'location: Austin · intent: high',
      accent: 'cyan',
    },
    {
      t: '23:59:12',
      tag: 'SCRAPE',
      title: 'Scraped 9 prospects',
      meta: 'industry: dental · enriched: 7/9',
      accent: 'coral',
    },
  ])

  React.useEffect(() => {
    const t = window.setInterval(() => {
      const bump = (arr: number[], scale: number) => {
        const next = arr.slice(1)
        const last = arr[arr.length - 1] ?? 10
        const v = Math.max(0, last + (Math.random() - 0.45) * scale)
        next.push(v)
        return next
      }

      setOrders((a) => bump(a, 6))
      setRevenue((a) => bump(a, 18))
      setLeads((a) => bump(a, 4))

      setFunnel((f) => ({
        visitsToLead: Math.max(1.8, Math.min(7.5, f.visitsToLead + (Math.random() - 0.5) * 0.25)),
        leadToCall: Math.max(8, Math.min(42, f.leadToCall + (Math.random() - 0.5) * 1.6)),
        callToClose: Math.max(12, Math.min(55, f.callToClose + (Math.random() - 0.5) * 1.2)),
      }))

      if (Math.random() < 0.75) {
        const kinds: FeedItem[] = [
          {
            t: nowHHMMSS(),
            tag: 'ORDER',
            title: `Order completed — $${(99 + Math.random() * 420).toFixed(2)}`,
            meta: 'source: organic · device: mobile',
            accent: 'emerald',
          },
          {
            t: nowHHMMSS(),
            tag: 'LEAD',
            title: 'Lead captured — "AI assessment"',
            meta: 'intent: medium · reply SLA: 9m',
            accent: 'cyan',
          },
          {
            t: nowHHMMSS(),
            tag: 'SCRAPE',
            title: `Scraped ${Math.floor(4 + Math.random() * 14)} prospects`,
            meta: 'enriched: 82% · bounced: 6%',
            accent: 'coral',
          },
        ]
        const item = kinds[Math.floor(Math.random() * kinds.length)]
        setFeed((prev) => [item, ...prev].slice(0, 10))
      }
    }, 1350)

    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white/60">Orders (realtime)</div>
            <div className="text-xs text-white/40">last 24h</div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-white/90">
                {Math.round(orders[orders.length - 1] ?? 0)}
              </div>
              <div className="text-xs text-white/45">events/hour</div>
            </div>
            <Sparkline points={orders.map((n) => Math.round(n))} accent="emerald" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white/60">Revenue (sim)</div>
            <div className="text-xs text-white/40">last 24h</div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-white/90">
                ${Math.round(revenue[revenue.length - 1] ?? 0)}
              </div>
              <div className="text-xs text-white/45">per hour</div>
            </div>
            <Sparkline points={revenue.map((n) => Math.round(n))} accent="violet" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white/60">Leads (realtime)</div>
            <div className="text-xs text-white/40">last 24h</div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-white/90">
                {Math.round(leads[leads.length - 1] ?? 0)}
              </div>
              <div className="text-xs text-white/45">events/hour</div>
            </div>
            <Sparkline points={leads.map((n) => Math.round(n))} accent="cyan" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white/60">Funnel (sim)</div>
            <div className="text-xs text-white/40">conversion rates</div>
          </div>
          <div className="mt-4 grid gap-4">
            <Bar label="Visit → Lead" value={funnel.visitsToLead} accent="cyan" />
            <Bar label="Lead → Call" value={funnel.leadToCall} accent="violet" />
            <Bar label="Call → Close" value={funnel.callToClose} accent="emerald" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white/60">Realtime feed</div>
            <div className="text-xs text-white/40">orders · leads · scraping</div>
          </div>
          <div className="mt-3 grid gap-2">
            {feed.map((f, i) => (
              <div key={f.t + i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="w-[64px] shrink-0 font-mono text-[11px] text-white/35">{f.t}</div>
                <div className="shrink-0">
                  <FeedPill tag={f.tag} accent={f.accent} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-extrabold tracking-tight text-white/90 truncate">{f.title}</div>
                  <div className="text-xs text-white/45 truncate">{f.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-white/35">
        Note: simulated analytics to communicate the end-state. No integrations.
      </div>
    </div>
  )
}
