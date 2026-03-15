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

const BEAM_CONFIG = [
  { rotate: -50, width: '1px',   darkOpacity: 0.25, lightOpacity: 0.15, duration: 9,  delay: 0   },
  { rotate: -25, width: '1.5px', darkOpacity: 0.45, lightOpacity: 0.30, duration: 7,  delay: 0.5 },
  { rotate:   0, width: '2px',   darkOpacity: 0.60, lightOpacity: 0.40, duration: 6,  delay: 1.0 },
  { rotate:  25, width: '1.5px', darkOpacity: 0.45, lightOpacity: 0.30, duration: 8,  delay: 1.5 },
  { rotate:  50, width: '1px',   darkOpacity: 0.25, lightOpacity: 0.15, duration: 10, delay: 2.0 },
] as const

interface HeroSectionProps {
  downloadInfo: DownloadInfo | null
}

export function HeroSection({ downloadInfo }: HeroSectionProps) {
  const t = useTranslations('hero')
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'
  const subtitleTags = t('subtitle').split(' · ')

  return (
    <section className="relative isolate overflow-hidden border-b bg-background px-8 py-32 lg:px-12 lg:py-40">
      {/* Background Layer: Grid + Spotlight */}
      <div className="absolute inset-0 -z-20">
        {/* Grid — 40px cells, primary-tinted, radial fade, theme-aware opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.58_0.18_260_/_7%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.58_0.18_260_/_7%)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,oklch(0.58_0.18_260_/_12%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.58_0.18_260_/_12%)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]" />
        {/* Spotlight — soft primary glow at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,oklch(0.58_0.18_260_/_6%),transparent)] dark:bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,oklch(0.58_0.18_260_/_18%),transparent)]" />
      </div>

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
                background: 'linear-gradient(to top, var(--primary), oklch(0.58 0.18 260 / 0))',
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

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          {/* Simplified Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex justify-center"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 inline-flex items-center rounded-full border border-primary/15 dark:border-primary/25 bg-primary/8 dark:bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>面向开发者的 AI 工作台</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-b from-[oklch(0.15_0.08_258)] to-primary dark:from-white dark:to-[oklch(0.75_0.12_258)] bg-clip-text text-transparent">
              Holix AI
            </span>
          </motion.h1>

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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {t('description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <div className="dark:[&>*]:shadow-[0_0_15px_oklch(0.58_0.18_260_/_35%)]">
              <DownloadButton
                size="lg"
                className="transition-all duration-300 hover:-translate-y-0.5"
                showPlatform={true}
                downloadInfo={downloadInfo}
              />
            </div>
            <a
              href="https://github.com/zhaogongchengsi/holix-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="gap-2 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Github className="h-5 w-5" />
                查看源码
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
