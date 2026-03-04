'use client'

import * as React from 'react'

type Project = {
  name: string
  url: string
  type: 'E-commerce' | 'Wholesale' | 'Infra' | 'Community' | 'Local services'
  status: 'Active' | 'Shipped' | 'Internal'
  accent: 'violet' | 'cyan' | 'emerald'
  notes: string
}

const PROJECTS: Project[] = [
  {
    name: 'Viking Labs',
    url: 'https://vikinglabs.co',
    type: 'E-commerce',
    status: 'Active',
    accent: 'violet',
    notes: 'Marketing automation + content engine + premium storefront.',
  },
  {
    name: 'BlueLabel Wholesale',
    url: 'https://bluelabelwholesale.com',
    type: 'Wholesale',
    status: 'Active',
    accent: 'cyan',
    notes: 'Next.js rebuild, catalog foundations, design refinement in progress.',
  },
  {
    name: 'Fresno Pool Care',
    url: 'https://fresnopoolcare.com',
    type: 'Local services',
    status: 'Active',
    accent: 'emerald',
    notes: 'Lead capture + follow-up workflows; conversion-first layout.',
  },
  {
    name: 'SkynetX',
    url: 'https://skynetx.io',
    type: 'Infra',
    status: 'Internal',
    accent: 'violet',
    notes: 'Agent telemetry + stability gates + token efficiency measurement.',
  },
  {
    name: 'Claw for Life',
    url: 'https://clawforlife.com',
    type: 'Community',
    status: 'Internal',
    accent: 'cyan',
    notes: 'Community + experiments around agent workflows.',
  },
]

function StatusPill({ status, accent }: { status: Project['status']; accent: Project['accent'] }) {
  const cls =
    accent === 'emerald'
      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
      : accent === 'cyan'
        ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
        : 'border-violet-300/25 bg-violet-300/10 text-violet-200'

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${cls}`}>{status}</span>
  )
}

export default function ProjectsPanel() {
  return (
    <div className="grid gap-3">
      {PROJECTS.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold tracking-tight text-white/90">
                {p.name}
              </div>
              <div className="mt-1 text-xs text-white/45">{p.type}</div>
            </div>
            <StatusPill status={p.status} accent={p.accent} />
          </div>

          <div className="mt-2 text-xs text-white/55">{p.notes}</div>
          <div className="mt-2 text-[11px] font-semibold text-[color:var(--mv-primary)]/80 group-hover:text-[color:var(--mv-primary)]">
            {p.url.replace('https://', '')} →
          </div>
        </a>
      ))}

      <div className="text-[11px] text-white/40">
        Note: screenshots can be added once we capture them (simulated panel for now).
      </div>
    </div>
  )
}
