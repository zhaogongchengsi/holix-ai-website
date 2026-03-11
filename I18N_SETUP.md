# 国际化 (i18n) 配置完成

## ✅ 已完成的配置

1. **安装依赖**: `next-intl` 已安装
2. **i18n 配置** (`i18n.ts`): 配置了中文(zh)和英文(en)两种语言
3. **翻译文件**: 
   - `messages/zh.json` - 中文翻译
   - `messages/en.json` - 英文翻译
4. **Middleware** (`middleware.ts`): 配置了语言路由
5. **目录结构**: 重构为 `app/[locale]` 结构
   - `app/[locale]/page.tsx` - 首页
   - `app/[locale]/download/page.tsx` - 下载页
   - `app/[locale]/layout.tsx` - 语言布局
6. **组件**:  
   - `components/language-switcher.tsx` - 语言切换器
   - `components/navbar.tsx` - 已更新使用翻译和语言切换器
   - `navigation.ts` - 类型化的导航辅助函数

## 🔄 需要继续更新的组件

以下组件需要更新以使用 `useTranslations` hook:

### 首页组件
- `components/home/hero-section.tsx` - 使用 `hero` 命名空间
- `components/home/features-section.tsx` - 使用 `features` 命名空间
- `components/home/why-choose-section.tsx` - 使用 `whyChoose` 命名空间
- `components/home/cta-section.tsx` - 使用 `cta` 命名空间

### 其他组件
- `components/footer.tsx` - 使用 `footer` 命名空间
- `components/download-page-client.tsx` - 使用 `download` 命名空间
- `components/download-button.tsx` - 使用 `hero` 命名空间中的按钮文本

## 📖 使用示例

### 在客户端组件中使用

```tsx
"use client"

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('namespace')
  
  return <div>{t('key')}</div>
}
```

### 在服务端组件中使用

```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyPage() {
  const t = await getTranslations('namespace')
  
  return <div>{t('key')}</div>
}
```

### 使用类型化的 Link

```tsx
import { Link } from '@/navigation'

<Link href="/download">Download</Link>
```

## 🌐 URL 结构

- 中文: `http://localhost:3000/zh`
- 英文: `http://localhost:3000/en`
- 默认语言: 中文 (zh)

## 🔧 环境变量

确保设置了 `NEXT_PUBLIC_SITE_URL`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 下一步

1. 运行 `pnpm dev` 测试配置
2. 访问 `http://localhost:3000` (自动重定向到 `/zh`)
3. 使用右上角的语言切换器测试语言切换
4. 逐步更新剩余组件使用翻译
