# 网站简约清新风格重构实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Holix AI 网站从复杂动画风格重构为简约清新的现代风格

**Architecture:** 保持现有组件结构不变，只修改视觉呈现。按照从基础到具体的顺序：先更新全局样式（globals.css），再依次重构各个组件（HeroSection → FeaturesSection → WhyChooseSection → CTASection → Navbar/Footer）。每个组件重构后立即提交，便于回滚。

**Tech Stack:** Next.js 16.1.6, React 19.2.4, Tailwind CSS 4.1.18, Framer Motion 12.35.2, TypeScript 5.9.3

**Spec Document:** `docs/superpowers/specs/website-redesign-clean-minimal.md`

---

## Chunk 1: 全局样式和 HeroSection 重构

### Task 1: 更新全局颜色系统

**Files:**
- Modify: `app/globals.css:8-75`

**目标:** 将紫色饱和度从 0.27 降低到 0.08，创建淡雅的色彩方案

- [ ] **Step 1: 备份当前颜色值**

在修改前，先记录当前的 primary 颜色值，以便需要时回滚：
- 当前 light primary: `oklch(0.491 0.27 292.581)`
- 当前 dark primary: `oklch(0.432 0.232 292.759)`

- [ ] **Step 2: 更新浅色模式颜色变量**

修改 `app/globals.css` 中的 `:root` 部分（第 8-41 行）：

```css
:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.65 0.08 290);
    --primary-foreground: oklch(0.969 0.016 293.756);
    --secondary: oklch(0.967 0.001 286.375);
    --secondary-foreground: oklch(0.21 0.006 285.885);
    --muted: oklch(0.98 0.01 290);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.75 0.05 290);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.58 0.22 27);
    --border: oklch(0.95 0 0);
    --input: oklch(0.95 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: oklch(0.811 0.111 293.571);
    --chart-2: oklch(0.606 0.25 292.717);
    --chart-3: oklch(0.541 0.281 293.009);
    --chart-4: oklch(0.491 0.27 292.581);
    --chart-5: oklch(0.432 0.232 292.759);
    --radius: 0.45rem;
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.541 0.281 293.009);
    --sidebar-primary-foreground: oklch(0.969 0.016 293.756);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
}
```

- [ ] **Step 3: 更新深色模式颜色变量**

修改 `app/globals.css` 中的 `.dark` 部分（第 43-75 行）：

```css
.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.55 0.06 290);
    --primary-foreground: oklch(0.969 0.016 293.756);
    --secondary: oklch(0.274 0.006 286.033);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.371 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.811 0.111 293.571);
    --chart-2: oklch(0.606 0.25 292.717);
    --chart-3: oklch(0.541 0.281 293.009);
    --chart-4: oklch(0.491 0.27 292.581);
    --chart-5: oklch(0.432 0.232 292.759);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.606 0.25 292.717);
    --sidebar-primary-foreground: oklch(0.969 0.016 293.756);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
}
```

- [ ] **Step 4: 添加 prefers-reduced-motion 支持**

在 `app/globals.css` 文件末尾（第 129 行之后）添加：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: 在浏览器中验证颜色对比度**

运行: `pnpm dev`
打开: `http://localhost:3000`
使用 Chrome DevTools:
1. 右键点击主按钮 → 检查
2. 在 Styles 面板中找到 background-color
3. 点击颜色方块，查看 Contrast ratio
4. 确认对比度 ≥ 4.5:1（WCAG AA 标准）

预期: 对比度应该在 4.6-4.8:1 之间

- [ ] **Step 6: 提交颜色系统更新**

```bash
git add app/globals.css
git commit -m "style: update color system to subtle purple palette

- Reduce primary color saturation from 0.27 to 0.08
- Update accent color for hover states
- Lighten border and muted colors
- Add prefers-reduced-motion support
- Maintain WCAG AA contrast ratios (4.5:1+)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: 重构 HeroSection - 移除复杂动画

**Files:**
- Modify: `components/home/hero-section.tsx:1-212`

**目标:** 移除浮动粒子、渐变光球、Logo 旋转动画，简化为淡入动画

- [ ] **Step 1: 移除粒子系统状态和 useEffect**

删除 `components/home/hero-section.tsx` 第 19-35 行：

```typescript
// 删除这些代码：
const [particles, setParticles] = useState<Array<{
  left: number
  top: number
  duration: number
  delay: number
}>>([])
useEffect(() => {
  const newParticles = Array.from({ length: 20 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))
  setParticles(newParticles)
}, [])
```

- [ ] **Step 2: 移除浮动粒子渲染代码**

删除 `components/home/hero-section.tsx` 第 86-107 行（浮动粒子的 JSX）：

```tsx
{/* 删除整个 Floating Particles 部分 */}
<div className="absolute inset-0 -z-10 overflow-hidden">
  {particles.map((particle, i) => (
    <motion.div
      key={i}
      className="absolute h-1 w-1 rounded-full bg-primary/40"
      style={{
        left: `${particle.left}%`,
        top: `${particle.top}%`,
      }}
      animate={{
        y: [-20, -100],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
      }}
    />
  ))}
</div>
```

- [ ] **Step 3: 移除渐变光球动画**

删除 `components/home/hero-section.tsx` 第 44-84 行（3 个动画渐变光球）：

```tsx
{/* 删除整个 Animated Gradient Orbs 部分 */}
<div className="absolute inset-0 -z-10 overflow-hidden">
  <motion.div
    className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
    animate={{
      scale: [1, 1.2, 1],
      x: [0, 50, 0],
      y: [0, 30, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
  {/* ... 其他两个光球 ... */}
</div>
```

- [ ] **Step 4: 简化网格背景并添加径向渐变**

替换 `components/home/hero-section.tsx` 第 38-42 行的背景代码：

```tsx
{/* 替换为简化的背景 */}
<div className="absolute inset-0 -z-10">
  {/* 极淡的径向渐变 */}
  <div 
    className="absolute inset-0" 
    style={{
      background: 'radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.99 0.01 290), oklch(1 0 0))'
    }}
  />
  {/* 简化的网格背景 */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-[0.03]" />
</div>
```

- [ ] **Step 5: 移除 Logo 的 3D 旋转动画**

修改 `components/home/hero-section.tsx` 第 112-140 行，移除 rotateY 动画：

```tsx
{/* 简化 Logo 动画 */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
  className="mb-8 flex justify-center"
>
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
</motion.div>
```

- [ ] **Step 6: 简化其他元素的动画参数**

修改所有 motion.div 的 transition，将 duration 统一改为 0.3s：

```tsx
// 将所有 transition={{ duration: 0.5, ... }} 改为：
transition={{ duration: 0.3, ... }}

// 移除所有 delay，或将 delay 减半
```

- [ ] **Step 7: 增加 section 间距**

修改 `components/home/hero-section.tsx` 第 38 行的 className：

```tsx
// 从：
<section className="relative overflow-hidden border-b px-6 py-24 sm:py-32 lg:px-8">

// 改为：
<section className="relative overflow-hidden border-b px-8 py-32 lg:px-12 lg:py-40">
```

- [ ] **Step 8: 收窄 Hero 内容最大宽度**

修改 `components/home/hero-section.tsx` 第 110 行：

```tsx
// 从：
<div className="mx-auto max-w-3xl text-center">

// 改为：
<div className="mx-auto max-w-2xl text-center">
```

- [ ] **Step 9: 简化按钮悬停动画**

修改 `components/home/hero-section.tsx` 第 187-192 行：

```tsx
// 从：
<DownloadButton 
  size="lg" 
  className="transition-transform hover:scale-105"
  showPlatform={true}
  downloadInfo={downloadInfo}
/>

// 改为：
<DownloadButton 
  size="lg" 
  className="transition-all duration-300 hover:-translate-y-0.5"
  showPlatform={true}
  downloadInfo={downloadInfo}
/>
```

同样修改 GitHub 按钮（第 198-206 行）。

- [ ] **Step 10: 在浏览器中验证 HeroSection**

运行: `pnpm dev`
打开: `http://localhost:3000`

验证:
1. 没有浮动粒子
2. 没有渐变光球动画
3. Logo 不旋转，只有简单淡入
4. 背景只有极淡的网格和渐变
5. 间距明显增加
6. 按钮悬停时轻微上浮

- [ ] **Step 11: 提交 HeroSection 重构**

```bash
git add components/home/hero-section.tsx
git commit -m "refactor(hero): simplify animations and increase spacing

- Remove floating particles system (20 animated particles)
- Remove animated gradient orbs (3 complex animations)
- Remove Logo 3D rotation animation
- Simplify background to subtle grid + radial gradient
- Increase section padding from py-24 to py-32 lg:py-40
- Narrow max-width from max-w-3xl to max-w-2xl
- Simplify button hover from scale to translate
- Reduce all animation durations to 0.3s

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Chunk 2: FeaturesSection 和 WhyChooseSection 重构

### Task 3: 重构 FeaturesSection

**Files:**
- Modify: `components/home/features-section.tsx:1-112`

**目标:** 增加卡片间距、添加背景和阴影、简化动画

- [ ] **Step 1: 增加 section 间距**

修改 `components/home/features-section.tsx` 第 58 行：

```tsx
// 从：
<section id="features" className="px-6 py-24 lg:px-8">

// 改为：
<section id="features" className="px-8 py-32 lg:px-12 lg:py-40">
```

- [ ] **Step 2: 移除 stagger 动画，简化为统一淡入**

修改 `components/home/features-section.tsx` 第 31-50 行：

```tsx
// 删除 containerVariants 和 itemVariants
// 改为简单的淡入动画

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}
```

- [ ] **Step 3: 增加卡片间距**

修改 `components/home/features-section.tsx` 第 79 行：

```tsx
// 从：
className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"

// 改为：
className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12"
```

- [ ] **Step 4: 更新卡片样式**

修改 `components/home/features-section.tsx` 第 87 行：

```tsx
// 从：
className="group relative overflow-hidden rounded-2xl border bg-background/50 p-8 transition-colors hover:bg-muted/50"

// 改为：
className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-1 lg:p-10"
```

- [ ] **Step 5: 移除复杂的边框渐变效果**

删除 `components/home/features-section.tsx` 第 89-91 行：

```tsx
{/* 删除这两行 */}
<div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/50" />
<div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/20" />
```

- [ ] **Step 6: 增加标题和副标题间距**

修改 `components/home/features-section.tsx` 第 64 行：

```tsx
// 从：
className="mb-16 text-center"

// 改为：
className="mb-20 text-center lg:mb-24"
```

- [ ] **Step 7: 在浏览器中验证 FeaturesSection**

运行: `pnpm dev`
打开: `http://localhost:3000#features`

验证:
1. 卡片间距明显增加
2. 卡片有白色背景和微妙阴影
3. 悬停时卡片轻微上浮并阴影加深
4. 没有复杂的边框渐变动画
5. 整体更简洁清爽

- [ ] **Step 8: 提交 FeaturesSection 重构**

```bash
git add components/home/features-section.tsx
git commit -m "refactor(features): increase spacing and simplify card styles

- Increase section padding from py-24 to py-32 lg:py-40
- Increase card gap from gap-6 to gap-8 lg:gap-12
- Add card background (bg-card) and shadow (shadow-sm)
- Simplify hover effect to translate-y and shadow-md
- Remove complex border gradient animations
- Increase card padding to p-8 lg:p-10
- Simplify animation duration to 0.3s

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 4: 重构 WhyChooseSection

**Files:**
- Modify: `components/home/why-choose-section.tsx:1-89`

**目标:** 与 FeaturesSection 类似处理，确保视觉一致性

- [ ] **Step 1: 更新 section 背景和间距**

修改 `components/home/why-choose-section.tsx` 第 39 行：

```tsx
// 从：
<section id="why-choose" className="border-y bg-muted/30 px-6 py-24 lg:px-8">

// 改为：
<section id="why-choose" className="border-y bg-background px-8 py-32 lg:px-12 lg:py-40">
```

- [ ] **Step 2: 简化动画**

修改 `components/home/why-choose-section.tsx` 第 21-31 行：

```tsx
// 简化 itemVariants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}
```

- [ ] **Step 3: 增加卡片间距**

修改 `components/home/why-choose-section.tsx` 第 55 行：

```tsx
// 从：
<div ref={ref} className="space-y-6">

// 改为：
<div ref={ref} className="space-y-8 lg:space-y-10">
```

- [ ] **Step 4: 更新卡片样式**

修改 `components/home/why-choose-section.tsx` 第 63 行：

```tsx
// 从：
className="group relative flex gap-6 overflow-hidden rounded-2xl border bg-background/50 p-6 transition-colors hover:bg-muted/50 sm:p-8"

// 改为：
className="group relative flex gap-6 overflow-hidden rounded-xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-1 lg:p-10"
```

- [ ] **Step 5: 移除边框渐变效果**

删除 `components/home/why-choose-section.tsx` 第 66-67 行：

```tsx
{/* 删除这两行 */}
<div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/50" />
<div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/20" />
```

- [ ] **Step 6: 在浏览器中验证 WhyChooseSection**

运行: `pnpm dev`
打开: `http://localhost:3000#why-choose`

验证:
1. 背景为纯白（浅色模式）或深色（深色模式）
2. 卡片间距增加
3. 卡片样式与 FeaturesSection 一致
4. 悬停效果简洁统一

- [ ] **Step 7: 提交 WhyChooseSection 重构**

```bash
git add components/home/why-choose-section.tsx
git commit -m "refactor(why-choose): align with features section styling

- Change background from bg-muted/30 to bg-background
- Increase section padding from py-24 to py-32 lg:py-40
- Increase card spacing from space-y-6 to space-y-8 lg:space-y-10
- Update card styles to match FeaturesSection
- Remove border gradient animations
- Simplify animation duration to 0.3s

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Chunk 3: CTASection、Navbar、Footer 和测试

### Task 5: 重构 CTASection

**Files:**
- Modify: `components/home/cta-section.tsx:1-73`

**目标:** 添加淡紫色背景、增加间距、简化动画

- [ ] **Step 1: 更新 section 背景和间距**

修改 `components/home/cta-section.tsx` 第 18 行：

```tsx
// 从：
<section id="quick-start" className="relative overflow-hidden px-6 py-24 lg:px-8">

// 改为：
<section id="quick-start" className="relative overflow-hidden px-8 py-32 lg:px-12 lg:py-40">
```

- [ ] **Step 2: 更新背景渐变为极淡紫色**

修改 `components/home/cta-section.tsx` 第 20 行：

```tsx
// 从：
<div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/50 to-background" />

// 改为：
<div className="absolute inset-0 -z-10 bg-primary/[0.02]" />
```

- [ ] **Step 3: 简化动画参数**

修改 `components/home/cta-section.tsx` 第 22-27 行和 36-41 行：

```tsx
// 将所有 duration: 0.5 改为 duration: 0.3
// 移除 delay
transition={{ duration: 0.3 }}
```

- [ ] **Step 4: 移除按钮的 scale 动画**

修改 `components/home/cta-section.tsx` 第 43 和 52 行：

```tsx
// 删除 motion.div 的 whileHover 和 whileTap
// 从：
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

// 改为：
<div>
```

并在按钮上添加 hover 效果：

```tsx
<DownloadButton 
  size="lg" 
  className="gap-2 transition-all duration-300 hover:-translate-y-0.5"
  showPlatform={false}
  downloadInfo={downloadInfo}
/>
```

- [ ] **Step 5: 增加标题和按钮间距**

修改 `components/home/cta-section.tsx` 第 32 行：

```tsx
// 从：
<p className="mb-10 text-lg text-muted-foreground">

// 改为：
<p className="mb-12 text-lg text-muted-foreground lg:mb-14">
```

- [ ] **Step 6: 在浏览器中验证 CTASection**

运行: `pnpm dev`
打开: `http://localhost:3000#quick-start`

验证:
1. 背景有极淡的紫色调
2. 间距明显增加
3. 按钮悬停时轻微上浮
4. 动画简洁流畅

- [ ] **Step 7: 提交 CTASection 重构**

```bash
git add components/home/cta-section.tsx
git commit -m "refactor(cta): add subtle purple background and simplify animations

- Add subtle purple background (bg-primary/[0.02])
- Increase section padding from py-24 to py-32 lg:py-40
- Simplify animation duration to 0.3s
- Remove button scale animations
- Add button translate-y hover effect
- Increase spacing between title and buttons

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 6: 微调 Navbar

**Files:**
- Modify: `components/navbar.tsx:1-64`

**目标:** 增加垂直内边距，更新颜色

- [ ] **Step 1: 增加 Navbar 高度**

修改 `components/navbar.tsx` 第 16 行：

```tsx
// 从：
<nav className="container flex h-16 items-center justify-between px-6">

// 改为：
<nav className="container flex h-18 items-center justify-between px-8 lg:px-12">
```

- [ ] **Step 2: 更新链接悬停颜色**

链接已经使用 `hover:text-primary`，新的淡紫色会自动生效，无需修改。

- [ ] **Step 3: 在浏览器中验证 Navbar**

运行: `pnpm dev`
打开: `http://localhost:3000`

验证:
1. Navbar 高度略微增加
2. 侧边距增加
3. 链接悬停时显示淡紫色

- [ ] **Step 4: 提交 Navbar 更新**

```bash
git add components/navbar.tsx
git commit -m "style(navbar): increase padding for better breathing room

- Increase height from h-16 to h-18
- Increase horizontal padding from px-6 to px-8 lg:px-12
- Link hover colors automatically use new subtle purple

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 7: 微调 Footer

**Files:**
- Modify: `components/footer.tsx:1-55`

**目标:** 增加垂直内边距，更新链接颜色

- [ ] **Step 1: 增加 Footer 内边距**

修改 `components/footer.tsx` 第 16 行：

```tsx
// 从：
<footer className="border-t px-6 py-12 lg:px-8">

// 改为：
<footer className="border-t px-8 py-16 lg:px-12 lg:py-20">
```

- [ ] **Step 2: 更新链接悬停效果**

修改 `components/footer.tsx` 第 44 行：

```tsx
// 从：
className="text-sm text-muted-foreground transition-colors hover:text-foreground"

// 改为：
className="text-sm text-muted-foreground transition-colors hover:text-primary"
```

- [ ] **Step 3: 在浏览器中验证 Footer**

运行: `pnpm dev`
打开: `http://localhost:3000`
滚动到页面底部

验证:
1. Footer 内边距增加
2. 链接悬停时显示淡紫色

- [ ] **Step 4: 提交 Footer 更新**

```bash
git add components/footer.tsx
git commit -m "style(footer): increase padding and update link hover color

- Increase padding from py-12 to py-16 lg:py-20
- Increase horizontal padding from px-6 to px-8 lg:px-12
- Change link hover from text-foreground to text-primary

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 8: 测试深色模式

**Files:**
- None (manual testing)

**目标:** 验证所有组件在深色模式下的视觉效果

- [ ] **Step 1: 切换到深色模式**

运行: `pnpm dev`
打开: `http://localhost:3000`
点击右上角的主题切换按钮

- [ ] **Step 2: 验证 HeroSection**

检查:
- [ ] 背景渐变在深色模式下可见但不刺眼
- [ ] 文字对比度足够（使用 Chrome DevTools Contrast Ratio 工具）
- [ ] 按钮在深色背景上清晰可见

- [ ] **Step 3: 验证 FeaturesSection**

检查:
- [ ] 卡片背景与页面背景有明显区分
- [ ] 卡片边框在深色模式下可见
- [ ] 图标和文字对比度足够

- [ ] **Step 4: 验证 WhyChooseSection**

检查:
- [ ] 与 FeaturesSection 视觉一致
- [ ] 卡片悬停效果在深色模式下正常

- [ ] **Step 5: 验证 CTASection**

检查:
- [ ] 淡紫色背景在深色模式下可见
- [ ] 按钮在深色背景上清晰可见

- [ ] **Step 6: 验证 Navbar 和 Footer**

检查:
- [ ] 边框在深色模式下可见
- [ ] 链接悬停颜色清晰

- [ ] **Step 7: 测试主题切换过渡**

多次切换浅色/深色模式，确认:
- [ ] 过渡平滑，无闪烁
- [ ] 所有元素正确更新

---

### Task 9: 测试响应式布局

**Files:**
- None (manual testing)

**目标:** 验证所有断点下的布局表现

- [ ] **Step 1: 测试移动端 (375px)**

运行: `pnpm dev`
打开: `http://localhost:3000`
使用 Chrome DevTools 设置视口为 375px 宽度

检查:
- [ ] HeroSection 标题大小合适
- [ ] 按钮正确堆叠
- [ ] 间距在小屏幕上合理

- [ ] **Step 2: 测试平板 (768px)**

设置视口为 768px 宽度

检查:
- [ ] FeaturesSection 卡片显示为 2 列
- [ ] 间距适中
- [ ] 文字大小合适

- [ ] **Step 3: 测试桌面 (1024px)**

设置视口为 1024px 宽度

检查:
- [ ] FeaturesSection 卡片显示为 3 列
- [ ] 所有 lg: 断点的样式生效
- [ ] 间距增加明显

- [ ] **Step 4: 测试大屏幕 (1440px)**

设置视口为 1440px 宽度

检查:
- [ ] 内容不会过度拉伸
- [ ] max-w 限制生效
- [ ] 整体布局平衡

---

### Task 10: 性能验证

**Files:**
- None (performance testing)

**目标:** 验证性能改进

- [ ] **Step 1: 测量当前性能基准**

运行: `pnpm dev`
打开: `http://localhost:3000`
打开 Chrome DevTools → Lighthouse
运行性能测试

记录:
- FCP (First Contentful Paint): _____ ms
- LCP (Largest Contentful Paint): _____ ms
- Performance Score: _____ / 100

- [ ] **Step 2: 验证动画帧率**

打开 Chrome DevTools → Performance
录制页面加载和滚动
检查帧率图表

确认:
- [ ] 页面加载时帧率稳定在 60fps
- [ ] 滚动时帧率稳定
- [ ] 没有明显的掉帧

- [ ] **Step 3: 验证 prefers-reduced-motion**

在操作系统中启用"减少动画"设置:
- macOS: 系统偏好设置 → 辅助功能 → 显示 → 减少动态效果
- Windows: 设置 → 轻松使用 → 显示 → 在 Windows 中显示动画

刷新页面，确认:
- [ ] 所有动画被禁用
- [ ] 页面仍然可用
- [ ] 状态变化是即时的

---

## 完成

所有任务完成后，网站应该呈现简约清新的现代风格：

✅ 淡雅的紫色配色方案
✅ 大量留白和呼吸感
✅ 简洁的动画效果
✅ 微妙的背景纹理
✅ 统一的卡片样式
✅ 良好的响应式布局
✅ 优秀的可访问性
✅ 提升的性能表现

**最终验收:**
- [ ] 在浏览器中完整浏览整个网站
- [ ] 确认所有视觉效果符合设计规范
- [ ] 确认深色模式和浅色模式都正常
- [ ] 确认所有断点下布局正确
- [ ] 确认性能指标达标

**部署前检查:**
- [ ] 所有更改已提交到 Git
- [ ] 本地测试通过
- [ ] 截图对比确认视觉效果
- [ ] 准备部署到生产环境

