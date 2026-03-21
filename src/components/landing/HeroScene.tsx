"use client";
import { useState, useEffect, Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineFallback />,
});

function SplineFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12)_0%,rgba(56,189,248,0.06)_40%,transparent_70%)]" />
  );
}

// Error boundary to catch Spline crashes (especially on mobile)
class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) return <SplineFallback />;

  // On mobile, use a lightweight CSS-only effect instead of Spline (too heavy)
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0">
        <SplineFallback />
        {/* Animated gradient orbs for mobile */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#8b5cf6]/10 blur-[80px] animate-pulse" />
        <div className="absolute left-1/3 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#38bdf8]/10 blur-[60px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <SplineErrorBoundary fallback={<SplineFallback />}>
        <Spline
          scene="https://prod.spline.design/coloredcompositioncopy-r8vP4ue46Bh8EpcEQElNe7tp/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </SplineErrorBoundary>
    </div>
  );
}
