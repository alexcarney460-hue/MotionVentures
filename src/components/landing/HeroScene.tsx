"use client";
import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
        }
      >
        <Spline
          scene="https://prod.spline.design/coloredcompositioncopy-r8vP4ue46Bh8EpcEQElNe7tp/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
}
