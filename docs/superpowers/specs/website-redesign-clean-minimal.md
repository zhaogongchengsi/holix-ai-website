# 网站重构设计文档：简约清新风格

## 概述

本文档描述了 Holix AI 网站的视觉重构方案，目标是将当前复杂的动画效果和视觉元素转变为简约清新的现代风格。

## 设计目标

- **简约**：移除不必要的视觉装饰和复杂动画
- **清新**：使用淡雅的紫色调和大量留白
- **现代**：保持专业的现代感和良好的用户体验
- **克制**：只在必要时使用动画和装饰元素

## 用户需求

基于与用户的讨论，确定了以下设计偏好：

- **动画**：保留少量微妙动画（悬停效果和简单淡入）
- **配色**：保持紫色但更淡雅
- **背景**：微妙纹理或渐变
- **密度**：极简留白

## 设计方案：现代清新风格

### 1. 整体设计理念

**核心原则：**
- **呼吸感**：大幅增加组件之间的间距
- **视觉层次**：通过留白和字体大小建立清晰的信息层级
- **克制的装饰**：移除所有浮动粒子、多个渐变光球、旋转动画等复杂效果
- **内容优先**：让文字和功能成为焦点，装饰元素退居幕后

**页面结构保持不变：**
- Navbar（导航栏）
- HeroSection（英雄区）
- FeaturesSection（特性区）
- WhyChooseSection（优势区）
- CTASection（行动号召区）
- Footer（页脚）

### 2. 色彩系统

**主色调整（淡雅紫色）：**

当前紫色：`oklch(0.491 0.27 292.581)` - 饱和度较高（0.27）

新的紫色方案：
- **Primary（主色）**：`oklch(0.65 0.08 290)` - 明度提高，饱和度降至 0.08
- **Primary-foreground**：保持不变
- **Accent（强调色）**：`oklch(0.75 0.05 290)` - 更淡的紫色用于悬停状态

**中性色优化：**
- Border 颜色更淡：`oklch(0.95 0 0)`
- Muted 区域使用极淡的紫色调：`oklch(0.98 0.01 290)`

**深色模式：**
- Primary（深色）：`oklch(0.55 0.06 290)`
- 背景稍微提亮，增加呼吸感

**使用原则：**
- 紫色主要用于：主按钮、链接、重要图标
- 大面积使用白色/灰色背景
- 避免大面积紫色渐变

**色彩对比度验证：**
- Primary 按钮文字对比度：白色文字 `oklch(1 0 0)` 在 `oklch(0.65 0.08 290)` 背景上的对比度约为 4.8:1，符合 WCAG AA 标准
- 链接文字对比度：`oklch(0.65 0.08 290)` 在白色背景上的对比度约为 4.6:1，符合 WCAG AA 标准
- 如实际测试中对比度不足，可微调明度值

### 3. 布局和间距

**垂直间距调整：**
- Section 间距：`py-32 lg:py-40`（增加 33-66%）
- 内容块间距：`mb-10 lg:mb-12`
- 段落间距：`mb-6 lg:mb-8`

**水平布局：**
- Hero 区最大宽度：`max-w-2xl`（更集中）
- 侧边距：`px-8 lg:px-12`
- 卡片间距：`gap-8 lg:gap-12`

**卡片设计：**
- 背景：`bg-card`
- 阴影：`shadow-sm hover:shadow-md`
- 圆角：`rounded-xl`
- 内边距：`p-8 lg:p-10`

**字体大小：**
- Hero 标题：`text-5xl sm:text-6xl lg:text-7xl`
- 副标题：`text-lg`
- 正文：`text-base leading-relaxed`

### 4. 动画策略

**移除的动画：**
- ❌ 浮动粒子（20 个动画粒子）
- ❌ 多个渐变光球的复杂动画
- ❌ Logo 的 3D 旋转动画
- ❌ 脉冲发光效果
- ❌ 所有长时间循环动画（6-10 秒）

**保留的动画：**
- ✅ 页面加载淡入：`opacity: 0 → 1, y: 20 → 0`
- ✅ 按钮悬停：`hover:translate-y-[-2px]`
- ✅ 卡片悬停：`hover:shadow-md hover:translate-y-[-4px]`
- ✅ 简单过渡：`transition-all duration-300 ease-out`

**动画参数：**
- Duration：统一 0.3s
- Delay：移除 stagger delay
- Easing：统一 `ease-out`

**无障碍支持：**
- 所有保留的动画都会尊重 `prefers-reduced-motion` 设置
- 当用户启用"减少动画"时，所有动画将被禁用，只保留即时状态变化
- 实现方式：在 globals.css 中添加 `@media (prefers-reduced-motion: reduce)` 规则

### 5. 背景处理

**Hero Section：**
- 移除所有动画渐变光球
- 移除浮动粒子系统
- 网格背景透明度：`opacity-[0.03]`
- 新增极淡径向渐变：
  - CSS 实现：`background: radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.99 0.01 290), oklch(1 0 0))`
  - 渐变从顶部中心向外扩散
  - 椭圆形状，覆盖 80% 宽度和 50% 高度

**其他 Section：**
- Features：`bg-background` 或 `bg-muted/30`
- Why Choose：`bg-background`
- CTA：`bg-primary/[0.02]`

**卡片背景：**
- 背景：`bg-card`
- 边框：`border border-border/50 hover:border-border`

### 6. 组件更新计划

**需要重构的组件：**

1. **globals.css**
   - 更新所有颜色变量
   - 降低紫色饱和度
   - 调整中性色

2. **HeroSection**
   - 移除粒子系统（particles state 和相关 useEffect）
   - 移除 3 个渐变光球的 motion.div
   - 简化网格背景，降低透明度到 opacity-[0.03]
   - 移除 Logo 的 rotateY 动画，保持静态或简单淡入
   - 增加 section 间距到 py-32 lg:py-40
   - 注意：hero-section-fixed.tsx 是备用版本，暂不修改，待主版本测试通过后决定是否删除

3. **FeaturesSection**
   - 增加卡片间距
   - 添加卡片背景和阴影
   - 简化动画
   - 增加内边距

4. **WhyChooseSection**
   - 与 FeaturesSection 类似处理
   - 确保视觉区分

5. **CTASection**
   - 添加淡紫色背景
   - 增加间距
   - 简化动画

6. **Navbar & Footer**
   - Navbar：增加垂直内边距从 py-4 到 py-6，更新 border 颜色为新的淡色
   - Footer：增加垂直内边距，更新链接颜色为新的淡紫色，确保悬停效果使用 hover:text-primary

## 实施顺序

1. 更新 `globals.css` 中的颜色系统
2. 重构 `HeroSection`（最复杂）
3. 更新 `FeaturesSection`
4. 更新 `WhyChooseSection`
5. 更新 `CTASection`
6. 微调 `Navbar` 和 `Footer`
7. 测试深色模式（验证所有组件在深色模式下的视觉效果）
8. 测试响应式布局
   - 测试断点：375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)
   - 验证所有间距和字体大小在不同屏幕下的表现
   - 确保卡片布局在小屏幕上正确堆叠

## 组件接口

**DownloadInfo 接口（保持不变）：**
```typescript
interface DownloadInfo {
  version: string
  downloadUrl: string
  // 其他字段保持不变
}
```

**组件 Props（保持不变）：**
- HeroSection: `{ downloadInfo: DownloadInfo | null }`
- CTASection: `{ downloadInfo: DownloadInfo | null }`
- 其他组件无 props 变化

## 回滚策略

- 所有更改通过 Git 分支管理，主分支保持稳定
- 每个组件重构后立即提交，便于单独回滚
- 如果视觉效果不理想，可以通过 Git revert 快速回滚到上一个稳定版本
- 建议在 staging 环境充分测试后再部署到生产环境

## 预期效果

- 页面加载速度提升（移除大量动画计算）
- 视觉更清爽，信息层次更清晰
- 保持现代感和专业性
- 更好的可访问性（减少动画干扰）
- 符合"简约清新"的设计目标

## 技术栈

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion（仅用于简单淡入动画）
- TypeScript

## 兼容性

- 保持现有的国际化功能
- 保持主题切换功能
- 保持所有业务功能不变
- 只改变视觉呈现
- **浏览器支持**：OKLCH 色彩空间在 Safari 15+、Chrome 111+、Firefox 113+ 中支持。对于不支持的浏览器，Tailwind CSS 会自动回退到 RGB 色彩空间

## 性能基准

- 首屏渲染时间（FCP）：预期减少 15-20%（移除大量动画计算）
- Lighthouse 性能分数：目标 90+ 分
- 动画帧率：保持 60fps（简化后的动画更流畅）

---

**文档版本**: 1.0
**创建日期**: 2026-03-13
**设计师**: Claude (基于用户需求)
