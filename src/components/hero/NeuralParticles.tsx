'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceTier } from './useDeviceTier'

const COLORS = [
  new THREE.Color('#8b5cf6'), // violet
  new THREE.Color('#38bdf8'), // sapphire
  new THREE.Color('#34d399'), // emerald
]

const PARTICLE_COUNTS: Record<DeviceTier, number> = {
  high: 4000,
  medium: 1500,
  low: 500,
}

const CONNECTION_DISTANCE = 2.8
const MAX_CONNECTIONS = 3000

// Seeded random for deterministic positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 43758.5453123
  return x - Math.floor(x)
}

export default function NeuralParticles({ tier }: { tier: DeviceTier }) {
  const count = PARTICLE_COUNTS[tier]
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate initial positions and velocities
  const { positions, velocities, colorIndices } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const cols = new Uint8Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distribute in a sphere/torus shape for visual interest
      const theta = seededRandom(i * 3) * Math.PI * 2
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1)
      const r = 6 + seededRandom(i * 3 + 2) * 8

      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = (seededRandom(i * 7) - 0.5) * 10
      pos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 5

      // Slow drift velocities
      vel[i3] = (seededRandom(i * 11) - 0.5) * 0.003
      vel[i3 + 1] = (seededRandom(i * 13) - 0.5) * 0.003
      vel[i3 + 2] = (seededRandom(i * 17) - 0.5) * 0.002

      cols[i] = Math.floor(seededRandom(i * 23) * 3)
    }

    return { positions: pos, velocities: vel, colorIndices: cols }
  }, [count])

  // Instance colors
  const instanceColors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const c = COLORS[colorIndices[i]]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return colors
  }, [count, colorIndices])

  // Line geometry buffer (pre-allocated)
  const linePositions = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), [])
  const lineColors = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), [])

  // Pulse wave state
  const pulseRef = useRef({ time: 0 })

  useFrame((state) => {
    const mesh = meshRef.current
    const lines = linesRef.current
    if (!mesh || !lines) return

    const t = state.clock.elapsedTime
    pulseRef.current.time = t

    // Update particle positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Drift
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Gentle oscillation
      const phase = i * 0.1
      positions[i3 + 1] += Math.sin(t * 0.3 + phase) * 0.001

      // Boundary soft bounce
      for (let j = 0; j < 3; j++) {
        const limit = j === 2 ? 12 : 14
        if (Math.abs(positions[i3 + j]) > limit) {
          velocities[i3 + j] *= -1
        }
      }

      // Set instance matrix
      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2])

      // Pulse size
      const pulse = 0.5 + Math.sin(t * 1.5 + i * 0.5) * 0.15
      dummy.scale.setScalar(pulse)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true

    // Update connection lines (spatial proximity)
    let lineIdx = 0
    const maxCheck = Math.min(count, 800) // Limit checks for performance

    for (let i = 0; i < maxCheck && lineIdx < MAX_CONNECTIONS; i++) {
      const ix = positions[i * 3]
      const iy = positions[i * 3 + 1]
      const iz = positions[i * 3 + 2]

      for (let j = i + 1; j < maxCheck && lineIdx < MAX_CONNECTIONS; j++) {
        const dx = ix - positions[j * 3]
        const dy = iy - positions[j * 3 + 1]
        const dz = iz - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE
          const li = lineIdx * 6

          linePositions[li] = ix
          linePositions[li + 1] = iy
          linePositions[li + 2] = iz
          linePositions[li + 3] = positions[j * 3]
          linePositions[li + 4] = positions[j * 3 + 1]
          linePositions[li + 5] = positions[j * 3 + 2]

          // Color fades with distance
          const ci = COLORS[colorIndices[i]]
          const cj = COLORS[colorIndices[j]]
          lineColors[li] = ci.r * alpha
          lineColors[li + 1] = ci.g * alpha
          lineColors[li + 2] = ci.b * alpha
          lineColors[li + 3] = cj.r * alpha
          lineColors[li + 4] = cj.g * alpha
          lineColors[li + 5] = cj.b * alpha

          lineIdx++
        }
      }
    }

    // Update line geometry
    const lineGeo = lines.geometry as THREE.BufferGeometry
    const posAttr = lineGeo.getAttribute('position') as THREE.BufferAttribute
    const colAttr = lineGeo.getAttribute('color') as THREE.BufferAttribute
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx * 2)
  })

  return (
    <>
      {/* Particle instances */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial
          toneMapped={false}
          vertexColors={false}
          color="#ffffff"
          transparent
          opacity={0.9}
        />
        <instancedBufferAttribute
          attach="geometry-attributes-color"
          args={[instanceColors, 3]}
        />
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={MAX_CONNECTIONS * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={MAX_CONNECTIONS * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </lineSegments>
    </>
  )
}
