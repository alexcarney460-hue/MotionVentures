"use client";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#a78bfa"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    ref.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.01) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowingOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + offset) * 0.3;
    ref.current.position.x = position[0] + Math.cos(t * 0.3 + offset) * 0.15;
    const s = scale * (1 + Math.sin(t * 0.6 + offset) * 0.2);
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function FloatingScene({
  density = "normal",
}: {
  density?: "sparse" | "normal" | "dense";
}) {
  const starCount =
    density === "sparse" ? 100 : density === "dense" ? 400 : 200;

  const orbs = useMemo(
    () => [
      {
        position: [-3, 1, -2] as [number, number, number],
        color: "#a78bfa",
        scale: 0.8,
      },
      {
        position: [4, -1.5, -3] as [number, number, number],
        color: "#8b5cf6",
        scale: 1.2,
      },
      {
        position: [-2, -2, -4] as [number, number, number],
        color: "#38bdf8",
        scale: 0.6,
      },
      {
        position: [3, 2, -2] as [number, number, number],
        color: "#a78bfa",
        scale: 0.5,
      },
    ],
    [],
  );

  return (
    <>
      <Stars count={starCount} />
      {orbs.map((orb, i) => (
        <GlowingOrb key={i} {...orb} />
      ))}
    </>
  );
}

export default function FloatingBackground({
  className = "",
  density = "normal",
}: {
  className?: string;
  density?: "sparse" | "normal" | "dense";
}) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <FloatingScene density={density} />
        </Suspense>
      </Canvas>
    </div>
  );
}
