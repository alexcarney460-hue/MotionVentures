'use client'

import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function HeroPostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        intensity={1.2}
        mipmapBlur
      />
    </EffectComposer>
  )
}
