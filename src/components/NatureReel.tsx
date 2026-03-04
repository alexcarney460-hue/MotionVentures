'use client'

import * as React from 'react'
import Image from 'next/image'

type Props = {
  images: string[]
  className?: string
  intervalMs?: number
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

export default function NatureReel({ images, className, intervalMs = 5200 }: Props) {
  const reduced = usePrefersReducedMotion()
  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    if (reduced) return
    if (!images?.length) return
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => window.clearInterval(t)
  }, [images, intervalMs, reduced])

  const active = images[idx] ?? images[0]

  return (
    <div
      className={
        [
          'relative isolate overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/25',
          className,
        ]
          .filter(Boolean)
          .join(' ')
      }
      aria-label="Macro nature reel"
    >
      <div className="relative aspect-[16/9]">
        {images.map((src, i) => {
          const on = src === active
          return (
            <div
              key={src}
              className={
                'absolute inset-0 transition-opacity duration-700 ' +
                (on ? 'opacity-100' : 'opacity-0')
              }
            >
              <Image
                src={src}
                alt="Macro nature frame"
                fill
                priority={i === 0}
                className={
                  'object-cover ' +
                  (reduced ? '' : on ? 'mv-nature-kenburns' : '')
                }
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
            </div>
          )
        })}

        {/* accent glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
      </div>
    </div>
  )
}
