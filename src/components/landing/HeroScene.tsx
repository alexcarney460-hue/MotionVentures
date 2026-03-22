"use client";
import { useState } from "react";

export default function HeroScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Spline 3D scene via viewer embed */}
      <iframe
        src="https://my.spline.design/ailandingpagewebdesign3danimation-PRp1FxaeYpKIlPHAYY41HZeN/"
        frameBorder="0"
        width="100%"
        height="100%"
        loading="eager"
        onLoad={() => setLoaded(true)}
        style={{
          border: "none",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        title="Motion Ventures 3D Hero"
        allow="autoplay; fullscreen"
      />
      {/* Loading screen while Spline initializes */}
      <div
        className={`absolute inset-0 bg-[#0a0a0a] z-10 transition-opacity duration-1000 pointer-events-none ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      {/* Overlay to cover Spline watermark at top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
      {/* Bottom gradient for text contrast */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-[5] pointer-events-none" />
    </div>
  );
}
