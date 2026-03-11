import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Holix AI</span>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            核心功能
          </a>
          <a href="#why-choose" className="text-sm font-medium transition-colors hover:text-primary">
            为什么选择
          </a>
          <a href="#quick-start" className="text-sm font-medium transition-colors hover:text-primary">
            快速开始
          </a>
          <a 
            href="https://github.com/zhaogongchengsi/holix-ai/blob/main/docs/SKILLS.md" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            文档
          </a>
        </div>
        
        <div className="flex items-center gap-4">
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
          <Button size="sm">下载</Button>
        </div>
      </nav>
    </header>
  )
}
