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

### 5. 背景处理

**Hero Section：**
- 移除所有动画渐变光球
- 移除浮动粒子系统
- 网格背景透明度：`opacity-[0.03]`
- 新增极淡径向渐变：中心 `oklch(0.99 0.01 290)` 到边缘纯白

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
   - 移除粒子系统
   - 移除渐变光球
   - 简化网格背景
   - 移除 Logo 旋转
   - 增加间距

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
   - 微调间距和颜色

## 实施顺序

1. 更新 `globals.css` 中的颜色系统
2. 重构 `HeroSection`（最复杂）
3. 更新 `FeaturesSection`
4. 更新 `WhyChooseSection`
5. 更新 `CTASection`
6. 微调 `Navbar` 和 `Footer`
7. 测试深色模式
8. 测试响应式布局

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

---

**文档版本**: 1.0
**创建日期**: 2026-03-13
**设计师**: Claude (基于用户需求)
