"use client"

import { Download, Github, ExternalLink, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllDownloadOptions, detectOS, type DownloadInfo } from "@/lib/download-utils"
import { motion } from "framer-motion"
import { useSyncExternalStore } from "react"
import { Link } from "@/navigation"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface DownloadPageClientProps {
  downloadInfo: DownloadInfo | null
}

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return detectOS()
}

function getServerSnapshot() {
  return 'unknown' as const
}

export function DownloadPageClient({ downloadInfo }: DownloadPageClientProps) {
  const t = useTranslations('download')
  const currentOS = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const mounted = currentOS !== 'unknown'
  
  const downloadOptions = getAllDownloadOptions(downloadInfo)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/icon_64.png" 
                alt="Holix AI Logo" 
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </motion.div>
            <span>Holix AI</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">{t('backToHome')}</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Download Options */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16 flex justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border bg-muted/30 px-5 py-2 text-sm text-muted-foreground backdrop-blur shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span>
                    {t('detectedOS')}: <span className="font-semibold text-foreground ml-1">{currentOS === 'windows' ? 'Windows' : currentOS === 'mac' || currentOS === 'mac-arm' ? 'macOS' : 'Linux'}</span>
                  </span>
                </div>
              </motion.div>
            )}

            <div className="grid gap-y-10 gap-x-6 pt-4 md:grid-cols-3 md:gap-y-6">
              {downloadOptions.map((option, index) => {
                const isRecommended = mounted && (option.os === currentOS || (option.os === 'mac' && currentOS === 'mac-arm'))

                return (
                  <motion.div
                    key={option.os}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Background tech glow effect */}
                    {isRecommended && (
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-50 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
                    )}

                    {/* Main Tech Card */}
                    <div className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isRecommended ? 'border-primary/50 shadow-lg' : 'border-border/50 hover:border-primary/30 hover:shadow-md'
                    }`}>
                      
                      {/* Tech decorative corners */}
                      <div className={`absolute -left-px -top-px h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 transition-colors duration-300 ${isRecommended ? 'border-primary/80' : 'border-transparent group-hover:border-primary/50'}`} />
                      <div className={`absolute -bottom-px -right-px h-8 w-8 rounded-br-2xl border-b-2 border-r-2 transition-colors duration-300 ${isRecommended ? 'border-primary/80' : 'border-transparent group-hover:border-primary/50'}`} />
                      
                      <div className="relative mb-6 text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-5xl text-primary ring-1 ring-primary/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          {option.icon}
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">{option.name}</h3>
                        {option.version && (
                          <p className="mt-2 text-xs font-medium tracking-wider text-primary/80">
                            VER {option.version}
                          </p>
                        )}
                      </div>

                      <div className="mb-8 flex flex-1 flex-col justify-between space-y-4 text-center text-sm text-muted-foreground">
                        <p className="leading-relaxed">{option.description}</p>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
                          <span className="rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 backdrop-blur-sm">
                            {option.fileFormat}
                          </span>
                          {option.size && (
                            <span className="rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 backdrop-blur-sm">
                              {option.size}
                            </span>
                          )}
                        </div>
                      </div>

                      <a href={option.link} download className="relative mt-auto block">
                        <Button 
                          className="w-full gap-2 transition-all duration-300"
                          size="lg"
                          variant={isRecommended ? "default" : "outline"}
                        >
                          <Download className="h-4 w-4" />
                          {t('download')} {option.name}
                        </Button>
                      </a>
                    </div>

                    {/* Recommended Badge fixed with z-20 to prevent overlap */}
                    {isRecommended && (
                      <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
                        <div className="relative flex items-center gap-1.5 rounded-full border border-primary/40 bg-zinc-950 px-4 py-1.5 shadow-[0_0_20px_-3px_rgba(0,0,0,0.5)] dark:bg-zinc-900">
                          <div className="absolute -inset-1 rounded-full bg-primary/20 blur-[6px]" />
                          <CheckCircle2 className="relative z-10 h-3.5 w-3.5 text-primary" />
                          <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-primary">
                            {t('recommended')}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional Links */}
        <section className="border-t px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="mb-8 text-2xl font-bold">{t('otherDownloads')}</h2>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a 
                  href="https://github.com/zhaogongchengsi/holix-ai/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Github className="h-5 w-5" />
                    {t('allReleases')}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>

                <a 
                  href="https://github.com/zhaogongchengsi/holix-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Github className="h-5 w-5" />
                    {t('visitGitHub')}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              <div className="mt-12 rounded-lg border bg-muted/50 p-6">
                <h3 className="mb-4 text-lg font-semibold">{t('systemRequirements')}</h3>
                <div className="grid gap-4 text-left sm:grid-cols-3">
                  <div>
                    <p className="mb-1 font-semibold">Windows</p>
                    <p className="text-sm text-muted-foreground">{t('requirements.windows')}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">macOS</p>
                    <p className="text-sm text-muted-foreground">{t('requirements.macos')}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Linux</p>
                    <p className="text-sm text-muted-foreground">{t('requirements.linux')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>{t('footerCopyright')}</p>
        </div>
      </footer>
    </div>
  )
}
