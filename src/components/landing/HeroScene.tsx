"use client";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <iframe
        src="https://my.spline.design/ailandingpagewebdesign3danimation-PRp1FxaeYpKIlPHAYY41HZeN/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ border: "none", pointerEvents: "none" }}
        title="Motion Ventures 3D Hero"
        allow="autoplay"
      />
      {/* Dark overlay to hide Spline loading text and improve text legibility */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60 pointer-events-none" />
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
