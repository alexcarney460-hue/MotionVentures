'use client'

export default function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-fallback-bg" />

      {/* Static neural nodes */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="node-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-sapphire" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-emerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        <g className="hero-fallback-lines" strokeWidth="0.5" fill="none" opacity="0.25">
          <line x1="200" y1="150" x2="450" y2="280" stroke="#8b5cf6" />
          <line x1="450" y1="280" x2="700" y2="200" stroke="#38bdf8" />
          <line x1="700" y1="200" x2="950" y2="350" stroke="#34d399" />
          <line x1="200" y1="150" x2="350" y2="500" stroke="#8b5cf6" />
          <line x1="350" y1="500" x2="600" y2="450" stroke="#38bdf8" />
          <line x1="600" y1="450" x2="950" y2="350" stroke="#34d399" />
          <line x1="450" y1="280" x2="600" y2="450" stroke="#8b5cf6" />
          <line x1="700" y1="200" x2="850" y2="550" stroke="#38bdf8" />
          <line x1="350" y1="500" x2="700" y2="600" stroke="#34d399" />
          <line x1="700" y1="600" x2="950" y2="350" stroke="#8b5cf6" />
          <line x1="100" y1="400" x2="350" y2="500" stroke="#38bdf8" />
          <line x1="850" y1="550" x2="1100" y2="400" stroke="#34d399" />
        </g>

        {/* Glowing nodes */}
        <g className="hero-fallback-nodes">
          <circle cx="200" cy="150" r="12" fill="url(#node-violet)" className="hero-node-pulse" />
          <circle cx="450" cy="280" r="10" fill="url(#node-sapphire)" className="hero-node-pulse-delay-1" />
          <circle cx="700" cy="200" r="14" fill="url(#node-emerald)" className="hero-node-pulse-delay-2" />
          <circle cx="950" cy="350" r="11" fill="url(#node-violet)" className="hero-node-pulse" />
          <circle cx="350" cy="500" r="9" fill="url(#node-sapphire)" className="hero-node-pulse-delay-1" />
          <circle cx="600" cy="450" r="13" fill="url(#node-emerald)" className="hero-node-pulse-delay-2" />
          <circle cx="850" cy="550" r="10" fill="url(#node-violet)" className="hero-node-pulse" />
          <circle cx="700" cy="600" r="8" fill="url(#node-sapphire)" className="hero-node-pulse-delay-1" />
          <circle cx="100" cy="400" r="7" fill="url(#node-emerald)" className="hero-node-pulse-delay-2" />
          <circle cx="1100" cy="400" r="9" fill="url(#node-violet)" className="hero-node-pulse" />
        </g>

        {/* Bright node centers */}
        <g>
          <circle cx="200" cy="150" r="2" fill="#8b5cf6" opacity="0.9" />
          <circle cx="450" cy="280" r="2" fill="#38bdf8" opacity="0.9" />
          <circle cx="700" cy="200" r="2" fill="#34d399" opacity="0.9" />
          <circle cx="950" cy="350" r="2" fill="#8b5cf6" opacity="0.9" />
          <circle cx="350" cy="500" r="2" fill="#38bdf8" opacity="0.9" />
          <circle cx="600" cy="450" r="2" fill="#34d399" opacity="0.9" />
          <circle cx="850" cy="550" r="2" fill="#8b5cf6" opacity="0.9" />
        </g>
      </svg>

      {/* Top + bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)] via-transparent to-[var(--mv-canvas)]" />
    </div>
  )
}
