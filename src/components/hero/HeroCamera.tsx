'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function HeroCamera() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3(0, 0, 12))

  // Track mouse position
  useFrame((state) => {
    const pointer = state.pointer
    mouse.current.x = pointer.x * 0.8
    mouse.current.y = pointer.y * 0.4

    // Slow auto-orbit
    const t = state.clock.elapsedTime
    const autoX = Math.sin(t * 0.08) * 1.5
    const autoY = Math.cos(t * 0.06) * 0.5

    // Target position: base + mouse + auto-orbit
    target.current.set(
      autoX + mouse.current.x * 2,
      autoY + mouse.current.y * 1.5,
      12
    )

    // Smooth damping toward target
    camera.position.lerp(target.current, 0.02)
    camera.lookAt(0, 0, 0)
  })

  return null
}
