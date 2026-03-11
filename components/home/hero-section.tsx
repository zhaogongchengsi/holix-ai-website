import { Sparkles, Github, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-linear-to-b from-background to-muted/20 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>面向开发者的 AI 工作台</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Holix AI
          </h1>
          
          <p className="mb-4 text-xl text-muted-foreground sm:text-2xl">
            本地优先 · 可扩展 · 可审计
          </p>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            一个基于 Electron 的跨平台桌面 AI 应用，统一管理多个模型供应商，
            通过 Skills 机制让 AI 从聊天升级为可执行任务的智能助手
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              下载应用
            </Button>
            <a 
              href="https://github.com/zhaogongchengsi/holix-ai" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
              >
                <Github className="h-5 w-5" />
                查看源码
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75" />
      </div>
    </section>
  )
}
