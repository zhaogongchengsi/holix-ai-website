"use client"

import { Download, Github, ExternalLink, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllDownloadOptions, detectOS } from "@/lib/download-utils"
import { useDownloadInfo } from "@/hooks/use-download-info"
import { motion } from "framer-motion"
import { useSyncExternalStore } from "react"
import Link from "next/link"

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return detectOS()
}

function getServerSnapshot() {
  return 'unknown' as const
}

export default function DownloadPage() {
  const currentOS = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { downloadInfo, loading } = useDownloadInfo()
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
              <img 
                src="/icon_64.png" 
                alt="Holix AI Logo" 
                className="h-8 w-8"
              />
            </motion.div>
            <span>Holix AI</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">返回首页</Button>
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
                下载 Holix AI
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                选择适合你操作系统的版本，开始使用 AI 工作台
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
                className="mb-12 text-center"
              >
                <p className="mb-4 text-sm text-muted-foreground">
                  检测到您的操作系统：<span className="font-semibold text-foreground">{currentOS === 'windows' ? 'Windows' : currentOS === 'mac' ? 'macOS' : 'Linux'}</span>
                </p>
              </motion.div>
            )}

            <div className="grid gap-6 md:grid-cols-3">
              {downloadOptions.map((option, index) => {
                const isRecommended = mounted && option.os === currentOS

                return (
                  <motion.div
                    key={option.os}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    {isRecommended && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          <CheckCircle2 className="h-3 w-3" />
                          推荐
                        </span>
                      </div>
                    )}

                    {/* Border glow effect */}
                    {isRecommended && (
                      <div className="absolute -inset-0.5 rounded-lg bg-linear-to-r from-primary to-secondary opacity-75 blur-sm" />
                    )}

                    <div className={`relative rounded-lg border bg-card p-8 transition-all hover:shadow-lg ${
                      isRecommended ? 'border-primary' : ''
                    }`}>
                      <div className="mb-4 text-center">
                        <div className="mb-2 text-5xl">{option.icon}</div>
                        <h3 className="text-2xl font-bold">{option.name}</h3>
                        {option.version && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            版本 {option.version}
                          </p>
                        )}
                      </div>

                      <div className="mb-6 space-y-2 text-center text-sm text-muted-foreground">
                        <p>{option.description}</p>
                        <p className="font-mono text-xs">{option.fileFormat}</p>
                        {option.size && (
                          <p className="text-xs">文件大小: {option.size}</p>
                        )}
                        {loading && !option.version && option.os !== 'linux' && (
                          <p className="text-xs italic">正在获取版本信息...</p>
                        )}
                      </div>

                      <a href={option.link} download className="block">
                        <Button 
                          className="w-full gap-2" 
                          size="lg"
                          variant={isRecommended ? "default" : "outline"}
                          disabled={loading && option.os !== 'linux'}
                        >
                          <Download className="h-5 w-5" />
                          {loading && option.os !== 'linux' ? '加载中...' : `下载 ${option.name}`}
                        </Button>
                      </a>
                    </div>
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
              <h2 className="mb-8 text-2xl font-bold">其他下载方式</h2>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a 
                  href="https://github.com/zhaogongchengsi/holix-ai/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Github className="h-5 w-5" />
                    查看所有版本
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
                    访问 GitHub 仓库
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              <div className="mt-12 rounded-lg border bg-muted/50 p-6">
                <h3 className="mb-4 text-lg font-semibold">系统要求</h3>
                <div className="grid gap-4 text-left sm:grid-cols-3">
                  <div>
                    <p className="mb-1 font-semibold">Windows</p>
                    <p className="text-sm text-muted-foreground">Windows 10/11 (64位)</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">macOS</p>
                    <p className="text-sm text-muted-foreground">macOS 10.15+ (Catalina 或更高)</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Linux</p>
                    <p className="text-sm text-muted-foreground">主流发行版 (Glibc 2.28+)</p>
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
          <p>© 2026 Holix AI. 开源项目，采用 MIT 协议</p>
        </div>
      </footer>
    </div>
  )
}
