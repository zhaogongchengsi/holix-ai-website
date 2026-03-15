# Hero Section Redesign

**Date:** 2026-03-15
**Status:** Approved
**File:** `components/home/hero-section.tsx`

## Goal

Make the homepage hero section more visually striking and tech-feeling, while keeping it functional and theme-aware.

## Design Direction: Beam + Grid

Visual style inspired by Linear/Vercel. Dark background with radial light beams, fine grid, and glassmorphism-style badge. Fully responsive to light/dark theme toggle.

---

## Layer Stack (z-index, bottom to top)

1. **Grid + spotlight** — `absolute inset-0 -z-20`
2. **Beams** — `absolute inset-0 -z-10 overflow-hidden`
3. **Content** — normal flow, `relative z-10`

---

## Visual Elements

### 1. Background Layer (`-z-20`)

**Grid:**
- Tailwind class: `bg-[linear-gradient(to_right,oklch(0.58_0.18_260_/_12%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.58_0.18_260_/_12%)_1px,transparent_1px)]`
- Dark mode grid color: `oklch(0.58 0.18 260 / 12%)`
- Light mode grid color: `oklch(0.58 0.18 260 / 7%)`
- Grid cell size: `bg-[size:40px_40px]` (intentionally denser than current 64px)
- Fade mask: `[mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]`

**Implementation note:** Use a single `div` with `dark:` variant override for the two opacity levels. Since raw CSS `oklch()` with `/` alpha is valid in modern browsers and Tailwind v4, inline the color values directly in the `bg-[...]` arbitrary value.

**Spotlight:**
- Dark mode: `bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,oklch(0.58_0.18_260_/_18%),transparent)]`
- Light mode: `bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,oklch(0.58_0.18_260_/_6%),transparent)]`
- Use `dark:` variant to switch between the two.

### 2. Beam Layer (`-z-10`)

**DOM strategy:** 5 absolutely-positioned `<motion.div>` elements, each a tall narrow rectangle rotated around its bottom-center:

```
width: 1px (outer beams) or 2px (center beam)
height: 45% of section (approximately 200px at current padding)
background: linear-gradient(to top, <beam-color>, transparent)
position: absolute
bottom: 50%          ← anchored to vertical center of section
left: 50%            ← anchored to horizontal center
transform-origin: bottom center
```

**Angles and colors:**

| Beam | Rotation | Width | Dark opacity | Light opacity |
|------|----------|-------|-------------|---------------|
| Far left  | -50° | 1px | 0.25 | 0.15 |
| Left      | -25° | 1.5px | 0.45 | 0.30 |
| Center    |   0° | 2px | 0.60 | 0.40 |
| Right     | +25° | 1.5px | 0.45 | 0.30 |
| Far right | +50° | 1px | 0.25 | 0.15 |

**Beam color:** `oklch(0.58 0.18 260)` (matches `--primary` value)

**framer-motion animation per beam:**
```js
animate={{ opacity: [baseOpacity * 0.7, baseOpacity, baseOpacity * 0.7], scaleY: [0.92, 1, 0.92] }}
transition={{ duration: beamDuration, repeat: Infinity, ease: "easeInOut", delay: beamDelay }}
// scaleY only — elongates/shrinks beam vertically; transform-origin: bottom center
// duration range: 6s–10s, delay range: 0s–2s, staggered across the 5 beams
```

**Dark/light switching:** Use a wrapper `div` with Tailwind `dark:` variant to adjust opacity, OR pass opacity values conditionally using `useTheme()` from `next-themes`. Simpler: set base opacity low enough to work in light, rely on dark: override on the wrapper.

### 3. Logo

- Existing `<Image src="/icon_128.png" />` at 96×96px, unchanged
- Wrapper `div`:
  - Shape: `rounded-2xl` (border-radius ~12px)
  - Background: Tailwind `bg-primary/10 dark:bg-primary/15`
  - Border: `border border-primary/20 dark:border-primary/35`
  - Shadow/glow: `shadow-[0_0_20px_oklch(0.58_0.18_260_/_20%)] dark:shadow-[0_0_30px_oklch(0.58_0.18_260_/_35%)]`
  - Inner glow pulse (separate sibling div, not wrapping the image):
    ```jsx
    <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-2xl animate-pulse" />
    ```
    This ensures `animate-pulse` only affects the glow layer, not the logo image.

### 4. Badge

- Keep existing `<Sparkles className="mr-2 h-4 w-4" />` icon (do not replace with Unicode `✦`)
- Style update: `bg-primary/8 dark:bg-primary/10 border border-primary/15 dark:border-primary/25 text-primary rounded-full`

### 5. Title

- Keep "Holix AI", same size classes (`text-5xl sm:text-6xl lg:text-7xl`)
- Gradient:
  - Light mode: `bg-gradient-to-b from-[oklch(0.15_0.08_258)] to-primary bg-clip-text text-transparent`
  - Dark mode: `bg-gradient-to-b from-white to-[oklch(0.75_0.12_258)] bg-clip-text text-transparent`
  - Use `dark:` variant on the gradient classes, or a single class with CSS variable approach

### 6. Subtitle Tags

**i18n resolution:** The current `t('subtitle')` returns the full string `"本地优先 · 可扩展 · 可审计"`. Split it at runtime by ` · ` separator:

```tsx
const subtitleTags = t('subtitle').split(' · ')
// renders as ['本地优先', '可扩展', '可审计']
```

This is safe because the dot separator is a consistent format in all locales for this project. If a locale doesn't follow this format, the split produces a single unstyled tag gracefully.

Each tag rendered as:
```tsx
<span className="bg-primary/8 dark:bg-primary/10 border border-primary/15 dark:border-primary/20 text-primary rounded px-2 py-0.5 text-sm">
  {tag}
</span>
```

Container: `flex gap-2 justify-center flex-wrap`

### 7. Description

- `{t('description')}` unchanged
- Style unchanged: `text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto`

### 8. Buttons

- `DownloadButton`: wrap in a `div` with class `dark:[&>*]:shadow-[0_0_15px_oklch(0.58_0.18_260_/_35%)]` to add glow in dark mode without touching the component internals
- `Button` (GitHub): unchanged

---

## Section Padding

Keep existing `py-32 lg:py-40`. Beams are set to `height: 45%` of the section — at `py-32` (256px top+bottom), the section is ~600px tall, giving beams ~270px height, which is sufficient for visual impact.

---

## Theme Behavior Summary

| Element | Light Mode | Dark Mode |
|---|---|---|
| Background | white | near-black |
| Grid opacity | 7% | 12% |
| Spotlight | primary/6% | primary/18% |
| Beam max opacity | 0.15–0.40 | 0.25–0.60 |
| Title gradient | dark-indigo → primary | white → light-indigo |
| Logo glow | primary/20% blur | primary/35% blur |

---

## Constraints

- No new dependencies (framer-motion already installed)
- Do not modify `DownloadButton` or `Button` component internals
- Do not modify translation files — handle subtitle split in component
- No layout structure changes — centered single column
- Must not break SSR — no `Math.random()` outside `useEffect`
- Keep existing entry animations (`opacity+y` stagger) on all content blocks
