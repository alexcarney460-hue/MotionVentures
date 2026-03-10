# Motion Ventures — Brand Kit

> Version 1.0 | March 2026

## Brand Identity

**Motion Ventures** is an AI venture studio that builds new ventures and deploys AI automation, premium web experiences, and specialized agents for existing businesses.

**Brand Personality**: Technical, cinematic, forward-thinking, premium
**Tone**: Confident, direct, professional with an edge of futurism

---

## Logo

### Primary Mark
- File: `/public/brand/logo-mark.png`
- Usage: App icons, favicons, social avatars, small contexts
- Minimum size: 24x24px

### Lockup (Mark + Wordmark)
- The header uses the mark alongside "Motion Ventures" in Sora font
- The wordmark should always appear in `--mv-ink` (white/92%) on dark backgrounds
- Never stretch, rotate, or alter the logo proportions

### Clear Space
- Maintain a minimum clear space equal to the height of the "M" in "Motion" around all sides of the logo

### Logo Don'ts
- Do not place on busy backgrounds without a backdrop
- Do not use colors outside the brand palette
- Do not add drop shadows, outlines, or effects
- Do not use the mark at sizes below 16x16px

---

## Color System

### Primary Palette

| Role | Name | Hex | CSS Variable | Usage |
|------|------|-----|-------------|-------|
| Canvas | Deep Space | `#070a10` | `--mv-canvas` | Page background, primary dark |
| Surface | Glass | `rgba(255,255,255,0.06)` | `--mv-surface` | Cards, elevated surfaces |
| Ink | Pure White | `rgba(255,255,255,0.92)` | `--mv-ink` | Primary text, headings |
| Muted | Soft White | `rgba(255,255,255,0.70)` | `--mv-muted` | Secondary text, nav links |
| Border | Ghost | `rgba(255,255,255,0.10)` | `--mv-border` | Card borders, dividers |

### Accent Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Neon Violet | `#8b5cf6` | `--mv-primary` | Primary CTA, brand accent, headings |
| Violet Hover | `#a78bfa` | `--mv-primary-hover` | Hover states for violet elements |
| Sapphire | `#38bdf8` | `--mv-sapphire` | Secondary accent, tech/data elements |
| Emerald | `#34d399` | `--mv-emerald` | Success states, growth/active indicators |
| Coral | `#ff4d6d` | `--mv-coral` | Error states, urgent actions, warnings |

### Extended Dark

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Mist | `#0b1020` | `--mv-mist` | Gradient targets, section backgrounds |

### Color Usage Rules
- **Violet** is the primary brand color — use for main CTAs, key headings, and brand moments
- **Sapphire** for secondary/informational elements
- **Emerald** for positive states and growth metrics
- **Coral** used sparingly for errors and high-urgency items
- Never use bright colors for body text — always use `--mv-ink` or `--mv-muted`
- Card backgrounds use `bg-white/[0.04]` with `backdrop-blur`

---

## Typography

### Typefaces

| Role | Font | Weight Range | Source |
|------|------|-------------|--------|
| Headings | **Sora** | 600–800 | Google Fonts |
| Body | **Inter** | 300–600 | System / Google Fonts |
| Code/Mono | System mono stack | 400 | Native |

### Type Scale

| Element | Size | Weight | Tracking | Line Height |
|---------|------|--------|----------|-------------|
| Display (H1) | `clamp(3rem, 7vw, 6rem)` | 800 | -0.04em | 0.92 |
| Heading 2 | 3rem–3.75rem | 800 | -0.03em | 1.0 |
| Heading 3 | 1.5rem | 700 | -0.02em | 1.2 |
| Body Large | 1.125rem | 400 | normal | 1.7 |
| Body | 0.875rem | 400 | normal | 1.6 |
| Label | 0.75rem | 600 | 0.1em | 1.4 |
| Overline | 0.625rem–0.75rem | 700 | 0.15em | 1.4 |

### Typography Rules
- Headings always use Sora with tight tracking
- Body text at `text-white/50` to `text-white/60` for readability on dark backgrounds
- Overlines/labels use uppercase + wide tracking + accent color
- Never use more than 3 font weights on a single page

---

## Components

### Buttons

**Primary Button**
- Background: `--mv-primary`
- Text: white, 600 weight
- Border radius: 12px (rounded-xl)
- Height: 44px
- Hover: -1px translate-y, background shifts to `--mv-primary-hover`
- Transition: all 200ms ease

**Secondary Button**
- Background: `bg-white/5`
- Border: 1px solid `white/10`
- Text: `white/85`
- Backdrop blur enabled
- Hover: bg shifts to `white/10`

### Cards
- Border: 1px solid `white/10`
- Background: `white/[0.04]` with backdrop-blur
- Border radius: 24px (rounded-3xl)
- Padding: 28–32px
- Shadow: `0 30px 90px rgba(0,0,0,0.35)`
- Hover: -1px translate-y, border brightens to `white/20`

### Inputs
- Border: 1px solid `white/10`
- Background: `white/5`
- Border radius: 12px
- Padding: 12px 16px
- Focus: border-color shifts to `--mv-primary/50`, ring `--mv-primary/30`
- Placeholder: `white/25`

### Section Patterns
- Overline → Heading → Description → Content grid
- Overlines use accent color + uppercase + wide tracking
- Sections alternate between contained and full-bleed cinematic layouts

---

## Effects & Motion

### Hero Animation
- Three.js neural network particle system (4,000 particles)
- Colors: violet, sapphire, emerald particle clusters with luminous connections
- Bloom postprocessing for cinematic glow
- Mouse-reactive camera with slow auto-orbit
- Adaptive: reduces to CSS fallback on mobile

### Micro-interactions
- All interactive elements: 200ms ease transitions
- Hover lifts: `translateY(-1px)` to `translateY(-4px)` depending on element size
- Card bottom-line reveals on hover (accent-colored gradient)
- Pulse animations for live/active indicators (1.5s infinite)

### Gradients
- Section backgrounds use radial gradients with accent colors at 8–12% opacity
- Left-to-right or right-to-left gradients for cinematic sections (image bleeds through)
- Top/bottom fades at section boundaries

### Reduced Motion
- All animations respect `prefers-reduced-motion: reduce`
- Three.js scene falls back to static CSS/SVG
- Hover states remain (no animation, instant state change)

---

## Photography & Imagery

### Style
- Macro nature photography (neural network / mycelial patterns)
- Dark, moody lighting with selective color highlights
- Files stored in `/public/brand/nature/` (gitignored, local only)

### Treatment
- Always overlaid with dark gradients for text legibility
- Opacity: 40–60% with gradient masks
- Ken Burns drift animation (subtle zoom + translate over 7.5s)

---

## Grid & Layout

- Max content width: `max-w-6xl` (1152px)
- Horizontal padding: 20px mobile, 24px desktop
- Section vertical padding: 56px mobile, 80px desktop
- Grid: 3-column on desktop, single-column on mobile
- Gap: 20px standard, 24px for larger cards

---

## Iconography

- **Do**: Use SVG icons from Heroicons or Lucide
- **Don't**: Use emojis as icons (except in marketing copy like Telegram messages)
- Icon size: 16–20px inline, 24px standalone
- Icon color: inherits from text color or uses accent color

---

## Accessibility

- Text contrast: 4.5:1 minimum (WCAG AA)
- Focus states visible on all interactive elements
- `prefers-reduced-motion` respected throughout
- Semantic HTML structure with proper heading hierarchy
- `aria-hidden` on decorative elements (hero animation, background images)
