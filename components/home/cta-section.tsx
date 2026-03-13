"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DownloadButton } from "@/components/download-button"
import { type DownloadInfo } from "@/lib/download-utils"
import { useTranslations } from "next-intl"

interface CTASectionProps {
  downloadInfo: DownloadInfo | null
}

export function CTASection({ downloadInfo }: CTASectionProps) {
  const t = useTranslations('cta')

  return (
    <section id="quick-start" className="relative overflow-hidden px-8 py-32 lg:px-12 lg:py-40">
      {/* Subtle purple background */}
      <div className="absolute inset-0 -z-10 bg-primary/[0.02]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mb-12 text-lg text-muted-foreground lg:mb-14">
          {t('subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <DownloadButton
            size="lg"
            className="gap-2 transition-all duration-300 hover:-translate-y-0.5"
            showPlatform={false}
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
              GitHub 仓库
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
