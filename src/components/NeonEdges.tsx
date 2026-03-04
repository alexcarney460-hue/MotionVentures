'use client'

import * as React from 'react'

type Edge = {
  from: { x: number; y: number }
  to: { x: number; y: number }
  accent: 'violet' | 'cyan' | 'emerald' | 'coral'
}

const COLORS: Record<Edge['accent'], { stroke: string; glow: string }> = {
  violet: { stroke: 'rgba(167,139,250,0.85)', glow: 'rgba(167,139,250,0.35)' },
  cyan: { stroke: 'rgba(34,211,238,0.85)', glow: 'rgba(34,211,238,0.35)' },
  emerald: { stroke: 'rgba(52,211,153,0.85)', glow: 'rgba(52,211,153,0.35)' },
  coral: { stroke: 'rgba(251,113,133,0.85)', glow: 'rgba(251,113,133,0.35)' },
}

export default function NeonEdges({ edges, className }: { edges: Edge[]; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 560"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id="mv-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map((e, idx) => {
        const c = COLORS[e.accent]
        const mx = (e.from.x + e.to.x) / 2
        const path = `M ${e.from.x} ${e.from.y} C ${mx} ${e.from.y}, ${mx} ${e.to.y}, ${e.to.x} ${e.to.y}`
        return (
          <g key={idx}>
            <path d={path} fill="none" stroke={c.glow} strokeWidth={6} opacity={0.55} filter="url(#mv-glow)" />
            <path d={path} fill="none" stroke={c.stroke} strokeWidth={1.8} opacity={0.9} />
          </g>
        )
      })}
    </svg>
  )
}
