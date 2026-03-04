# Motion Ventures — Handoff (Cinematic Dark / Pro SaaS)

## Decisions / Direction
- Primary CTA: **Free AI Business Assessment** (funnel-style flow).
- Theme: **cinematic dark** with neon accents.
- Hero: **dark hero Option 1** → `public/brand/hero-dark.png`.
- Logo: **mark Option 2** → `public/brand/logo-mark.png` + header text “Motion Ventures”.
- Hero layout: removed the top-right bento/card; hero visual is standalone + large.
- Mission Control: **pro SaaS simulated UI** (no backend integrations).

## Local Dev
- Dev URL: **http://localhost:3020**

## Repo
- GitHub: https://github.com/alexcarney460-hue/MotionVentures.git (branch: `main`)

## What’s Implemented
### 1) Homepage
- Cinematic hero + GPU-friendly hero motion.
- Macro-nature reel section (single frame currently referenced):
  - `/brand/nature/mv-macro-nature-6.png` (local-only recommended)
- Added **Current Projects** section:
  - Viking Labs → https://vikinglabs.co
  - BlueLabel Wholesale → https://bluelabelwholesale.com
  - Fresno Pool Care → https://fresnopoolcare.com
- CTA section converted to glass/dark (no white islands).
- Mission Control promo section at bottom.

### 2) Mission Control (Simulation)
Route: **/mission-control**
- Pro SaaS layout: workflows, canvas, run panel, drafts.
- Neon console + agent telemetry (streaming logs).
- Agent roster with avatars.
- Full-width Analytics simulation with sparklines, funnel bars, realtime feed.
- Lead scraper results table (simulated).
- Posts performance analytics (simulated) in right sidebar.
- Added **Courier** agent for **Sales DMs** + DM Queue (simulated).
- Added **Projects** panel (links + statuses).

### 3) Services / Offers
Route: **/services**
- **Foundation** package: **Starting at $2,000**.
- **Premium Growth System**: Apply button → questionnaire.
- **DIY option**: “Get the guide ($199)”.

### 4) New Intake / Guide Pages
- Premium Growth application form:
  - `/premium-growth-intake`
  - `/premium-growth-intake/thanks`
- DIY guide pages:
  - `/guide`
  - `/guide/thanks`

### 5) Contact Funnel
- `/contact` upgraded to a 2-step premium intake simulation.

## Files / Paths Touched (high-signal)
Repo root:
- `C:\Users\Claud\.openclaw\workspace\motion-ventures\`

Key pages:
- `src/app/page.tsx` (homepage + projects + CTA + mission control promo)
- `src/app/services/page.tsx` (packages + pricing + buttons)
- `src/app/studio/page.tsx` (internal projects: skynetx + clawforlife)
- `src/app/mission-control/page.tsx` (mission control UI)
- `src/app/mission-control/MissionControlSim.tsx`
- `src/app/mission-control/AnalyticsSim.tsx`
- `src/app/mission-control/DmQueueSim.tsx`
- `src/app/mission-control/ProjectsPanel.tsx`
- `src/app/premium-growth-intake/page.tsx`
- `src/app/guide/page.tsx`

Components / styling:
- `src/components/HeroVisual.tsx`
- `src/components/NatureReel.tsx`
- `src/components/NeonEdges.tsx`
- `src/components/ui.tsx` (glass/dark defaults)
- `src/app/globals.css` (hero + mission control micro-interactions)

Assets:
- `public/brand/hero-dark.png`
- `public/brand/hero-apple.png`
- `public/brand/og.png`
- `public/brand/logo-mark.png`

Scripts:
- `scripts/nb2-generate-macro-nature.ps1` (NanoBanana2 generation)

## Git Ignore (important)
- Local-only outputs ignored:
  - `/public/brand/nature/`
  - `/nanobanana2-output/`

## Screenshot Capture Status (Option B)
- Browser capture was unstable due to Gateway service instability.
- Captured:
  - Viking Labs screenshot
  - BlueLabel screenshot captured only at age-gate modal (needs click-through)
- Next: once Gateway is stable, capture: BlueLabel (post-gate), SkynetX, ClawForLife, FresnoPoolCare.

## Known Issues / Notes
- OpenClaw Gateway service intermittently stops (“loaded but not running”). This blocks reliable browser tool automation.
- BlueLabel Wholesale has an age-verification modal that blocks homepage screenshot unless clicked.

## Next Best Steps
1) Stabilize gateway/browser capture; store project screenshots in `public/projects/` and swap project cards to image-backed thumbnails.
2) Optionally add a dedicated `/work` page for deeper case-study layout.
3) If desired later: wire real checkout + email delivery for `/guide`.
4) If desired later: wire real submission handling for intake forms.
