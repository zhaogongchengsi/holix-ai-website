"use client"

import { Sparkles, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DownloadButton } from "@/components/download-button"
import { type DownloadInfo } from "@/lib/download-utils"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface HeroSectionProps {
  downloadInfo: DownloadInfo | null
}

export function HeroSection({ downloadInfo }: HeroSectionProps) {
  const t = useTranslations('hero')

  return (
    <section className="relative overflow-hidden border-b bg-background px-8 py-32 lg:px-12 lg:py-40">
      {/* Simplified Background */}
      <div className="absolute inset-0 -z-10">
        {/* Simplified grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-[0.03]" />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 inline-flex items-center rounded-full border bg-muted/30 px-4 py-1.5 text-sm text-foreground backdrop-blur-sm"
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
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              Holix AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mb-4 text-xl text-muted-foreground sm:text-2xl"
          >
            {t('subtitle')}
          </motion.p>

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
            <DownloadButton
              size="lg"
              className="transition-all duration-300 hover:-translate-y-0.5"
              showPlatform={true}
              downloadInfo={downloadInfo}
            />
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
