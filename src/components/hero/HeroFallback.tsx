'use client'

export default function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base dark canvas */}
      <div className="absolute inset-0 bg-[#070a10]" />

      {/* Animated gradient orbs — large, bold, cinematic */}
      <div className="hero-orb hero-orb-violet" />
      <div className="hero-orb hero-orb-cyan" />
      <div className="hero-orb hero-orb-magenta" />
      <div className="hero-orb hero-orb-emerald" />

      {/* Subtle grain overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        backgroundSize: '128px 128px',
      }} />

      {/* Top + bottom fade for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--mv-canvas)] via-[var(--mv-canvas)]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--mv-canvas)]/50 via-transparent to-[var(--mv-canvas)]" />
    </div>
  )
}
