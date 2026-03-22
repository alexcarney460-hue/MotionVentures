"use client";
import { useState } from "react";
import Spline from "@splinetool/react-spline";

export default function HeroScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      {/* Loading fade */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#0a0a0a] z-10 transition-opacity duration-700" />
      )}
      <Spline
        scene="https://prod.spline.design/PRp1FxaeYpKIlPHAYY41HZeN/scene.splinecode"
        onLoad={() => setLoaded(true)}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
