# Hero Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain hero section with a Beam + Grid visual style — radial light beams, fine grid background, glow logo, gradient title, and pill subtitle tags — fully theme-aware (light/dark).

**Architecture:** Single file change to `components/home/hero-section.tsx`. Background and beam layers are stacked via z-index below the existing centered content. Theme awareness is handled via `useTheme` from next-themes (already in project) plus Tailwind `dark:` variants for CSS-only elements.

**Tech Stack:** Next.js 15, Tailwind CSS v4, framer-motion, next-themes, next-intl, lucide-react

---

## Chunk 1: Background + Beam Layers

### Task 1: Replace background layer (grid + spotlight)

**Files:**
- Modify: `components/home/hero-section.tsx`

**Context:** Current background div at line 21 uses `-z-10` with a barely visible grid (opacity 0.03). Replace it with a proper `-z-20` layer containing a 40px grid and a central spotlight, both theme-aware.

- [ ] **Step 1: Open `components/home/hero-section.tsx` and locate the background div**

  Find the `<div className="absolute inset-0 -z-10">` block (lines 21–24). This is the entire block to replace.

- [ ] **Step 2: Replace the background div with the new grid + spotlight layer**

  Replace lines 21–24 with:
  ```tsx
  {/* Background Layer: Grid + Spotlight */}
  <div className="absolute inset-0 -z-20">
    {/* Grid — 40px cells, primary-tinted, radial fade, theme-aware opacity */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.58_0.18_260_/_7%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.58_0.18_260_/_7%)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,oklch(0.58_0.18_260_/_12%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.58_0.18_260_/_12%)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]" />
    {/* Spotlight — soft primary glow at center */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,oklch(0.58_0.18_260_/_6%),transparent)] dark:bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,oklch(0.58_0.18_260_/_18%),transparent)]" />
  </div>
  ```

- [ ] **Step 3: Verify the file saves without TypeScript errors**

  Run: `npx tsc --noEmit`
  Expected: no errors

- [ ] **Step 4: Check in browser — light mode should show subtle grid, dark mode denser grid + glow**

  Open `http://localhost:3000` (or whichever port dev server runs on), toggle theme with `D` key, confirm grid is visible in both modes.

- [ ] **Step 5: Commit**

  ```bash
  git add components/home/hero-section.tsx
  git commit -m "feat(hero): add grid + spotlight background layer"
  ```

---

### Task 2: Add beam layer with framer-motion

**Files:**
- Modify: `components/home/hero-section.tsx`

**Context:** Add 5 light beams radiating upward from the section center. Each is a narrow `motion.div` rotated around its bottom-center, with a breathing opacity+scaleY animation. Theme-aware opacity via `useTheme`.

- [ ] **Step 1: Add imports at top of file**

  The file already imports `motion` from `framer-motion`, `useState`, and `useEffect` is NOT imported yet. Add `useTheme` from `next-themes` and `useState`/`useEffect` from `react`:

  Replace the existing imports block:
  ```tsx
  "use client"

  import { Sparkles, Github } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { motion } from "framer-motion"
  import { useState, useEffect } from "react"
  import { useTheme } from "next-themes"
  import { DownloadButton } from "@/components/download-button"
  import { type DownloadInfo } from "@/lib/download-utils"
  import Image from "next/image"
  import { useTranslations } from "next-intl"
  ```

- [ ] **Step 2: Add beam config constant after imports, before the component**

  Insert after the imports:
  ```tsx
  const BEAM_CONFIG = [
    { rotate: -50, width: '1px',   darkOpacity: 0.25, lightOpacity: 0.15, duration: 9,  delay: 0   },
    { rotate: -25, width: '1.5px', darkOpacity: 0.45, lightOpacity: 0.30, duration: 7,  delay: 0.5 },
    { rotate:   0, width: '2px',   darkOpacity: 0.60, lightOpacity: 0.40, duration: 6,  delay: 1.0 },
    { rotate:  25, width: '1.5px', darkOpacity: 0.45, lightOpacity: 0.30, duration: 8,  delay: 1.5 },
    { rotate:  50, width: '1px',   darkOpacity: 0.25, lightOpacity: 0.15, duration: 10, delay: 2.0 },
  ] as const
  ```

- [ ] **Step 3: Add `useTheme` hook and `mounted` state inside the component**

  Inside `HeroSection`, after `const t = useTranslations('hero')`, add:
  ```tsx
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'
  ```

  `mounted` guard prevents SSR/hydration mismatch — beams default to light opacity until client renders.

- [ ] **Step 4: Add beam layer JSX after the background layer div**

  Insert after the closing `</div>` of the background layer (after the spotlight div):
  ```tsx
  {/* Beam Layer — 5 lines radiating upward from section center */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {BEAM_CONFIG.map((beam, i) => {
      const opacity = isDark ? beam.darkOpacity : beam.lightOpacity
      return (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            width: beam.width,
            height: '45%',
            background: 'linear-gradient(to top, var(--color-primary), transparent)',
            transformOrigin: 'bottom center',
            rotate: `${beam.rotate}deg`,
          }}
          animate={{
            opacity: [opacity * 0.7, opacity, opacity * 0.7],
            scaleY: [0.92, 1, 0.92],
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: beam.delay,
          }}
        />
      )
    })}
  </div>
  ```

  Note: `var(--color-primary)` is mapped in `globals.css` `@theme inline` block and resolves to the current primary oklch value.

- [ ] **Step 5: Verify no TypeScript errors**

  Run: `npx tsc --noEmit`
  Expected: no errors

- [ ] **Step 6: Check beams in browser — both themes**

  Toggle theme with `D` key. Beams should be visible in dark mode (more saturated) and subtle in light mode. They should slowly breathe (scale + opacity).

- [ ] **Step 7: Commit**

  ```bash
  git add components/home/hero-section.tsx
  git commit -m "feat(hero): add animated beam layer"
  ```

---

## Chunk 2: Content Updates

### Task 3: Update logo with glow container

**Files:**
- Modify: `components/home/hero-section.tsx`

**Context:** Wrap the existing `<Image>` in a styled container with border, background tint, and drop shadow glow. Add a separate sibling pulse div for the inner glow so `animate-pulse` doesn't affect the image itself.

- [ ] **Step 1: Find the logo `<motion.div>` block**

  Locate the block starting with `<motion.div` that contains the `<Image src="/icon_128.png" ...>`.

  Current inner content:
  ```tsx
  <div className="relative">
    <Image
      src="/icon_128.png"
      alt="Holix AI Logo"
      width={96}
      height={96}
      className="h-24 w-24"
      priority
    />
  </div>
  ```

- [ ] **Step 2: Replace the inner div with glow container**

  ```tsx
  <div className="relative">
    {/* Pulsing glow behind logo — separate div so pulse doesn't affect the image */}
    <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-2xl animate-pulse" />
    {/* Logo container with border and shadow glow */}
    <div className="relative rounded-2xl bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/35 shadow-[0_0_20px_oklch(0.58_0.18_260_/_20%)] dark:shadow-[0_0_30px_oklch(0.58_0.18_260_/_35%)] p-3">
      <Image
        src="/icon_128.png"
        alt="Holix AI Logo"
        width={96}
        height={96}
        className="h-24 w-24"
        priority
      />
    </div>
  </div>
  ```

- [ ] **Step 3: Verify and check in browser**

  Run: `npx tsc --noEmit`

  In browser: logo should have a subtle glowing border. In dark mode the glow and border are more visible. The pulse animation should animate the blur behind the logo, not the logo image itself.

- [ ] **Step 4: Commit**

  ```bash
  git add components/home/hero-section.tsx
  git commit -m "feat(hero): add glow container to logo"
  ```

---

### Task 4: Update badge, title, subtitle, and button styles

**Files:**
- Modify: `components/home/hero-section.tsx`

**Context:** Update badge to use primary color tint, update title to use a gradient, split subtitle into pill tags, wrap download button for dark-mode glow.

- [ ] **Step 1: Add subtitle tags variable inside the component**

  After the `isDark` line, add:
  ```tsx
  const subtitleTags = t('subtitle').split(' · ')
  ```

- [ ] **Step 2: Update badge className**

  Find the badge `<motion.div>` — it has `className="mb-8 inline-flex items-center rounded-full border bg-muted/30 ..."`.

  Replace its `className` with:
  ```tsx
  className="mb-8 inline-flex items-center rounded-full border border-primary/15 dark:border-primary/25 bg-primary/8 dark:bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm"
  ```

- [ ] **Step 3: Update title gradient**

  Find the `<motion.h1>` block. Replace the inner `<span>` className:

  Current:
  ```tsx
  <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
  ```

  Replace with:
  ```tsx
  <span className="bg-gradient-to-b from-[oklch(0.15_0.08_258)] to-primary dark:from-white dark:to-[oklch(0.75_0.12_258)] bg-clip-text text-transparent">
  ```

- [ ] **Step 4: Replace subtitle `<motion.p>` with pill tags `<motion.div>`**

  Find the `<motion.p>` that renders `{t('subtitle')}` (the "本地优先 · 可扩展 · 可审计" line).

  Replace the entire `<motion.p>` block with:
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.15 }}
    className="mb-4 flex flex-wrap items-center justify-center gap-2"
  >
    {subtitleTags.map((tag) => (
      <span
        key={tag}
        className="rounded border border-primary/15 bg-primary/8 px-2 py-0.5 text-sm text-primary dark:border-primary/20 dark:bg-primary/10"
      >
        {tag}
      </span>
    ))}
  </motion.div>
  ```

- [ ] **Step 5: Wrap DownloadButton with glow div**

  Find the `<DownloadButton ... />` in the buttons section. Wrap it:

  Current:
  ```tsx
  <DownloadButton
    size="lg"
    className="transition-all duration-300 hover:-translate-y-0.5"
    showPlatform={true}
    downloadInfo={downloadInfo}
  />
  ```

  Replace with:
  ```tsx
  <div className="dark:[&>*]:shadow-[0_0_15px_oklch(0.58_0.18_260_/_35%)]">
    <DownloadButton
      size="lg"
      className="transition-all duration-300 hover:-translate-y-0.5"
      showPlatform={true}
      downloadInfo={downloadInfo}
    />
  </div>
  ```

- [ ] **Step 6: Verify no TypeScript errors**

  Run: `npx tsc --noEmit`
  Expected: no errors

- [ ] **Step 7: Visual check in browser — both themes**

  Verify:
  - Badge has primary color tint and text
  - "Holix AI" title shows gradient (dark-indigo→primary in light, white→light-indigo in dark)
  - Three pill tags appear instead of dot-separated text
  - Download button has a subtle glow in dark mode

- [ ] **Step 8: Final commit**

  ```bash
  git add components/home/hero-section.tsx
  git commit -m "feat(hero): update badge, title gradient, subtitle pills, button glow"
  ```

---

## Final State

After all tasks, `components/home/hero-section.tsx` will have:

```
Imports: + useTheme, useState, useEffect (added)

BEAM_CONFIG constant (module-level)

HeroSection component:
  - useTheme + mounted state (for beam opacity)
  - subtitleTags split from t('subtitle')
  - Background layer (-z-20): grid div + spotlight div
  - Beam layer (-z-10): 5 motion.div beams
  - Logo: glow pulse sibling + styled container
  - Badge: primary-tinted border + text
  - Title: gradient span (dark/light variants)
  - Subtitle: pill tags mapped from subtitleTags
  - Description: unchanged
  - Buttons: DownloadButton in glow wrapper + GitHub unchanged
```

No other files are touched.
