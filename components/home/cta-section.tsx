import { Download, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const commands = [
  "pnpm install",
  "pnpm run dev",
  "pnpm run dev:app"
]

export function CTASection() {
  return (
    <section id="quick-start" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          立即开始使用
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">
          开源、免费、可自部署的 AI 工作台
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            下载最新版本
            <ArrowRight className="h-4 w-4" />
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
              GitHub 仓库
            </Button>
          </a>
        </div>
        
        <div className="mt-12 rounded-lg border bg-muted/50 p-6">
          <p className="mb-4 text-sm font-semibold">快速开始</p>
          <div className="space-y-2 text-left font-mono text-sm">
            {commands.map((command) => (
              <div key={command} className="rounded bg-background px-4 py-2">
                <span className="text-muted-foreground">$</span> {command}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
