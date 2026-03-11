import Image from "next/image"
import Link from "next/link"

const links = [
  { name: "GitHub", href: "https://github.com/zhaogongchengsi/holix-ai" },
  { name: "文档", href: "https://github.com/zhaogongchengsi/holix-ai/blob/main/docs/SKILLS.md" },
  { name: "反馈", href: "https://github.com/zhaogongchengsi/holix-ai/issues" }
]

export function Footer() {
  return (
    <footer className="border-t px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image 
              src="/icon_64.png" 
              alt="Holix AI Logo" 
              width={40} 
              height={40}
              className="h-10 w-10"
            />
            <span className="text-lg font-bold">Holix AI</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground max-w-md">
            本地优先的 AI 工作台 · 可扩展 · 可审计
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            © 2026 Holix AI. Licensed under MIT.
          </div>
          <div className="flex gap-6">
            {links.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
