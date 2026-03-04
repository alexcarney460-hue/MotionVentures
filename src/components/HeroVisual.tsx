'use client'

import * as React from 'react'
import Image from 'next/image'

type Props = {
  /** e.g. "/brand/hero-dark.png" */
  src: string
  alt?: string
  /** Maintain aspect without layout shift */
  width?: number
  height?: number
  className?: string
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(!!mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

export default function HeroVisual({
  src,
  alt = 'Motion Ventures hero visual',
  width = 1800,
  height = 1125,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion()
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let raf = 0
    let px = 0
    let py = 0

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / (r.width / 2)
      const dy = (e.clientY - cy) / (r.height / 2)
      // Clamp and soften
      px = Math.max(-1, Math.min(1, dx))
      py = Math.max(-1, Math.min(1, dy))
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      raf = 0
      // small degrees + translate; GPU-friendly
      const rotY = px * 4
      const rotX = -py * 3
      const tx = px * 10
      const ty = py * 8
      el.style.setProperty('--rx', `${rotX}deg`)
      el.style.setProperty('--ry', `${rotY}deg`)
      el.style.setProperty('--tx', `${tx}px`)
      el.style.setProperty('--ty', `${ty}px`)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div
      ref={ref}
      className={
        [
          'mv-hero-tilt relative isolate rounded-2xl',
          // subtle border + glow containment
          'ring-1 ring-white/10 bg-black/20',
          className,
        ]
          .filter(Boolean)
          .join(' ')
      }
      aria-hidden
    >
      <div className="mv-hero-frame relative overflow-hidden rounded-2xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          className="block h-auto w-full select-none"
          draggable={false}
        />

        {/* Shimmer sweep (very subtle) */}
        {!reduced && <div className="mv-hero-shimmer pointer-events-none absolute inset-0" />}

        {/* Soft vignette to keep text legible if overlapping */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(60%_40%_at_50%_30%,rgba(0,255,209,0.14),transparent_70%)] blur-2xl" />
    </div>
  )
}
