'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useDeviceTier } from './useDeviceTier'
import NeuralParticles from './NeuralParticles'
import HeroCamera from './HeroCamera'
import HeroPostProcessing from './HeroPostProcessing'
import HeroFallback from './HeroFallback'

function SceneContents({ tier }: { tier: 'high' | 'medium' }) {
  return (
    <>
      <color attach="background" args={['#070a10']} />
      <fog attach="fog" args={['#070a10', 8, 22]} />

      <NeuralParticles tier={tier} />
      <HeroCamera />

      {/* Ambient light for subtle particle visibility */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[-5, -3, 3]} intensity={0.2} color="#38bdf8" />
      <pointLight position={[0, 3, -5]} intensity={0.2} color="#34d399" />

      {/* Bloom only on high tier */}
      {tier === 'high' && <HeroPostProcessing />}
    </>
  )
}

export default function HeroScene() {
  const tier = useDeviceTier()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Pause when scrolled out of view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Low tier gets CSS-only fallback
  if (tier === 'low') {
    return <HeroFallback />
  }

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <Suspense fallback={<HeroFallback />}>
        <Canvas
          dpr={tier === 'high' ? [1, 2] : [1, 1.5]}
          camera={{ position: [0, 0, 12], fov: 60 }}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{
            antialias: tier === 'high',
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ background: '#070a10' }}
        >
          <SceneContents tier={tier} />
        </Canvas>
      </Suspense>

      {/* Gradient overlays for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--mv-canvas)] via-[var(--mv-canvas)]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)]/40 via-transparent to-[var(--mv-canvas)]" />
    </div>
  )
}
