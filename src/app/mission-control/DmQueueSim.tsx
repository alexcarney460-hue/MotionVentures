'use client'

import * as React from 'react'

type Row = {
  name: string
  platform: 'X' | 'LinkedIn'
  hook: string
  status: 'Drafting' | 'Queued' | 'Sent' | 'Follow-up'
  eta: string
}

const initial: Row[] = [
  {
    name: 'A. Rivera — HVAC Ops',
    platform: 'LinkedIn',
    hook: 'missed calls → auto-follow-up',
    status: 'Queued',
    eta: '08:40',
  },
  {
    name: 'J. Park — Med Spa',
    platform: 'X',
    hook: 'content engine + booking',
    status: 'Drafting',
    eta: '08:44',
  },
  {
    name: 'M. Stone — Dental',
    platform: 'LinkedIn',
    hook: 'AI assessment (no fluff)',
    status: 'Follow-up',
    eta: 'T+48h',
  },
]

function Pill({ status }: { status: Row['status'] }) {
  const cls =
    status === 'Sent'
      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
      : status === 'Drafting'
        ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
        : status === 'Follow-up'
          ? 'border-violet-300/25 bg-violet-300/10 text-violet-200'
          : 'border-white/10 bg-white/5 text-white/70'

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${cls}`}>{status}</span>
  )
}

export default function DmQueueSim() {
  const [rows, setRows] = React.useState<Row[]>(initial)

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setRows((prev) => {
        const next: Row[] = prev.map((r) => {
          if (Math.random() < 0.16) {
            if (r.status === 'Drafting') return { ...r, status: 'Queued' as const }
            if (r.status === 'Queued') return { ...r, status: 'Sent' as const }
            if (r.status === 'Sent') return { ...r, status: 'Follow-up' as const, eta: 'T+48h' }
          }
          return r
        })
        return next
      })
    }, 1600)

    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-12 gap-2 bg-white/5 px-3 py-2 text-[10px] font-semibold text-white/45">
          <div className="col-span-5">Prospect</div>
          <div className="col-span-2">Platform</div>
          <div className="col-span-3">Hook</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-12 gap-2 border-t border-white/10 bg-black/20 px-3 py-2 text-xs text-white/65">
            <div className="col-span-5 truncate font-semibold text-white/80">{r.name}</div>
            <div className="col-span-2 text-white/55">{r.platform}</div>
            <div className="col-span-3 truncate text-white/55">{r.hook}</div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <div className="text-[10px] text-white/35">{r.eta}</div>
              <Pill status={r.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button className="inline-flex h-10 items-center justify-center rounded-xl bg-white/10 px-4 text-sm font-semibold text-white/80 transition hover:bg-white/15">
          Add prospect
        </button>
        <button className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-4 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)]">
          Generate DMs
        </button>
      </div>

      <div className="text-[11px] text-white/40">Simulation: no sending, no integrations.</div>
    </div>
  )
}
