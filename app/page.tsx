"use client"

import { ArrowRight, Download, Github, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

const releaseUrl = "https://github.com/zhaogongchengsi/holix-ai/releases"

const features = [
  {
    icon: Zap,
    title: "快速响应",
    desc: "启动快、操作路径短，打开即可开始使用。",
  },
  {
    icon: ShieldCheck,
    title: "稳定更新",
    desc: "版本发布节奏清晰，更新记录可追踪、可回滚。",
  },
  {
    icon: Sparkles,
    title: "易用体验",
    desc: "简洁界面与清晰信息层级，降低学习成本。",
  },
]

export default function Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-medium">
            <span className="size-2 rounded-full bg-foreground/80" />
            Holix AI
          </a>
          <nav className="flex items-center gap-1 text-xs sm:gap-2 sm:text-sm">
            <a href="#features" className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground">
              功能
            </a>
            <a href="#download" className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground">
              下载
            </a>
            <a href="#footer" className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground">
              关于
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5" />
            Official Download Portal
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Holix AI
            <br />
            官方下载页
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            获取最新版本与更新说明。当前仅提供官方 GitHub Releases 下载入口，确保来源可靠、版本清晰。
          </p>

          <div id="download" className="mt-8 flex flex-wrap gap-3">
            <a href={releaseUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg" })}>
              <Download className="size-4" />
              立即下载
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </a>
            <a
              href={releaseUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Github className="size-4" />
              查看 Releases
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">Release Overview</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span>Latest stable build</span>
                <span className="text-muted-foreground">v1.x</span>
              </li>
              <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span>Platform packages</span>
                <span className="text-muted-foreground">macOS / Win</span>
              </li>
              <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span>Release notes</span>
                <span className="text-muted-foreground">Included</span>
              </li>
            </ul>
            <a
              href={releaseUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-muted-foreground"
            >
              前往 GitHub
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">功能介绍</h2>
          <span className="text-xs text-muted-foreground">持续迭代中</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-lg border border-border bg-background p-2 text-foreground">
                <Icon className="size-4" />
              </div>
              <h3 className="text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer id="footer" className="border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Holix AI. All rights reserved.</p>
          <a
            href={releaseUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub Releases
          </a>
        </div>
      </footer>
    </main>
  )
}
