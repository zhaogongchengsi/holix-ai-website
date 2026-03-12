"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import Image from "next/image"

export function Navbar() {
  const t = useTranslations('nav')
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image 
            src="/icon_64.png" 
            alt="Holix AI Logo" 
            width={32} 
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">Holix AI</span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            {t('features')}
          </a>
          <a href="#why-choose" className="text-sm font-medium transition-colors hover:text-primary">
            {t('whyChoose')}
          </a>
          <Link href="/download" className="text-sm font-medium transition-colors hover:text-primary">
            {t('download')}
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <a 
            href="https://github.com/zhaogongchengsi/holix-ai" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </a>
          <Link href="/download">
            <Button size="sm">{t('download')}</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
