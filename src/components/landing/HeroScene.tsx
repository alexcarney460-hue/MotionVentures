"use client";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Floating Glass Sphere ─── */
function GlassSphere({ position, scale, speed, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.z = t * speed * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.35}
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

/* ─── Central Torus Knot ─── */
function CentralShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = t * 0.1 + mouse.current.x * 0.3;
    meshRef.current.rotation.z = t * 0.05;
    const s = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 200, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
          distort={0.25}
          speed={3}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

/* ─── Orbital Rings ─── */
function OrbitalRing({ radius, speed, tilt, color, opacity }: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  opacity: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.z = t * speed;
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Particle Field ─── */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#a78bfa"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#34d399"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Gradient Orbs (volumetric glow) ─── */
function GlowOrb({ position, color, scale }: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3 + position[0]) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.2 + position[1]) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Scene ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[0, 3, -5]} intensity={0.4} color="#34d399" />

      {/* Central abstract shape */}
      <CentralShape />

      {/* Floating glass spheres */}
      <GlassSphere position={[-3.5, 1.5, -2]} scale={0.6} speed={0.4} color="#38bdf8" />
      <GlassSphere position={[3.2, -1, -1.5]} scale={0.45} speed={0.6} color="#a78bfa" />
      <GlassSphere position={[-2, -2, -3]} scale={0.35} speed={0.5} color="#34d399" />
      <GlassSphere position={[4, 2.5, -2.5]} scale={0.5} speed={0.35} color="#818cf8" />
      <GlassSphere position={[-4.5, -0.5, -1]} scale={0.3} speed={0.7} color="#f472b6" />

      {/* Orbital rings */}
      <OrbitalRing radius={2.2} speed={0.15} tilt={1.2} color="#8b5cf6" opacity={0.3} />
      <OrbitalRing radius={2.8} speed={-0.1} tilt={0.8} color="#38bdf8" opacity={0.2} />
      <OrbitalRing radius={3.4} speed={0.08} tilt={1.5} color="#a78bfa" opacity={0.15} />

      {/* Background particles */}
      <ParticleField />

      {/* Volumetric glow orbs */}
      <GlowOrb position={[-3, 2, -5]} color="#8b5cf6" scale={3} />
      <GlowOrb position={[4, -1, -6]} color="#38bdf8" scale={2.5} />
      <GlowOrb position={[0, -3, -4]} color="#34d399" scale={2} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ─── Export ─── */
export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
