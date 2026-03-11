"use client"

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'EN' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    // 切换到另一个语言
    const newLocale = locale === 'zh' ? 'en' : 'zh'
    // 替换路径中的语言代码
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
  }

  const currentLanguage = languages.find(lang => lang.code === locale)
  const nextLanguage = languages.find(lang => lang.code !== locale)

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="gap-2"
      onClick={switchLanguage}
      title={`Switch to ${nextLanguage?.name}`}
    >
      <Globe className="h-4 w-4" />
      <span>{currentLanguage?.name}</span>
    </Button>
  )
}
