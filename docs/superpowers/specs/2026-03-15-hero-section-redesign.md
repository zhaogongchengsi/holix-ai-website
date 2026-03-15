# Hero Section Redesign

**Date:** 2026-03-15
**Status:** Approved
**File:** `components/home/hero-section.tsx`

## Goal

Make the homepage hero section more visually striking and tech-feeling, while keeping it functional and theme-aware.

## Design Direction: Beam + Grid

Visual style inspired by Linear/Vercel. Dark background with radial light beams, fine grid, and glassmorphism-style badge. Fully responsive to light/dark theme toggle.

## Visual Elements

### Background Layer
- **Grid**: 40px CSS grid using `--primary` color at 12% opacity (dark) / 7% (light)
- **Mask**: `radial-gradient` fades the grid toward edges so it's densest at center
- **Spotlight**: Soft radial glow at center using `--primary` at 18% (dark) / 6% (light)

### Beam Layer
- 5 thin lines (1–2px wide) radiating upward from behind the logo
- Angles: -50°, -25°, 0°, +25°, +50°
- Each beam is a `linear-gradient` from `--primary` (bottom) to transparent (top)
- Animated with framer-motion: slow scale + opacity breathing (6–10s loop, staggered)
- Opacity: 0.3–0.6 in dark mode, 0.2–0.45 in light mode

### Logo
- Existing `icon_128.png`, 96×96px
- Wrapped in a container with `--primary/15` background, `--primary/35` border, and a pulsing box-shadow glow

### Badge
- Text: "面向开发者的 AI 工作台"
- Style: `--primary/10` background, `--primary/25` border, rounded-full, `✦` prefix icon

### Title
- "Holix AI" in large bold type (5xl → 7xl responsive)
- Dark mode: gradient from `white` → `--primary/70`
- Light mode: gradient from dark indigo → `--primary`

### Subtitle Tags
- "本地优先 · 可扩展 · 可审计" split into **3 separate pill tags** (replacing the current dot-separated string)
- Each tag: `--primary/8` background, `--primary/15` border, `--primary` text color

### Description
- Existing text, `text-muted-foreground`, unchanged

### Buttons
- Download button: existing component, add `box-shadow: 0 0 15px var(--primary)/40` glow on dark mode
- GitHub button: existing outline variant, unchanged

## Theme Behavior

| Element | Light Mode | Dark Mode |
|---|---|---|
| Background | `bg-background` (white) | `bg-background` (near-black) |
| Grid opacity | 7% | 12% |
| Spotlight | primary/6% | primary/18% |
| Beam opacity | 0.2–0.45 | 0.3–0.6 |
| Title gradient | dark-indigo → primary | white → primary/70 |

## Animation

All animations via framer-motion (already installed):
- Beams: `scale` + `opacity` breathing, 6–10s duration, `repeat: Infinity`, staggered delays
- Logo glow: `animate-pulse` via Tailwind
- Entry animations: existing `opacity+y` stagger, keep as-is

## Constraints

- No new dependencies
- Keep existing `DownloadButton` and `Button` components
- Keep `useTranslations` for subtitle/description text
- No layout changes — centered single column
- Must not break SSR (no random values outside `useEffect`)
