'use client'

import { useState, useEffect } from 'react'

export type DeviceTier = 'high' | 'medium' | 'low'

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('low')

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setTier('low')
      return
    }

    const cores = navigator.hardwareConcurrency || 2
    const memoryGB = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const width = window.innerWidth

    if (isMobile || width < 768 || cores <= 2 || memoryGB < 4) {
      setTier('low')
    } else if (cores >= 8 && memoryGB >= 8 && width >= 1024) {
      setTier('high')
    } else {
      setTier('medium')
    }
  }, [])

  return tier
}
