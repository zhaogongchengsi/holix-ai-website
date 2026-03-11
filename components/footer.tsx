const links = [
  { name: "GitHub", href: "https://github.com/zhaogongchengsi/holix-ai" },
  { name: "文档", href: "https://github.com/zhaogongchengsi/holix-ai/blob/main/docs/SKILLS.md" },
  { name: "反馈", href: "https://github.com/zhaogongchengsi/holix-ai/issues" }
]

export function Footer() {
  return (
    <footer className="border-t px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
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
