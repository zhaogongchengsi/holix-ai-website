import { CheckCircle2 } from "lucide-react"

interface Advantage {
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    title: "本地掌控感强",
    description: "数据、配置、技能都在你的机器中可控，隐私安全有保障"
  },
  {
    title: "扩展性强",
    description: "通过 Skill 就能注入新能力，而不是等待官方功能排期"
  },
  {
    title: "安全边界清晰",
    description: "高风险工具审批 + 调用记录，适合真实生产环境"
  },
  {
    title: "模型中立",
    description: "不绑定单一供应商，方便策略切换和成本优化"
  },
  {
    title: "桌面端稳定体验",
    description: "更适合长时间工作流，而不是浏览器短会话"
  }
]

interface TechStack {
  category: string
  technologies: string
}

const techStack: TechStack[] = [
  { category: "Desktop", technologies: "Electron" },
  { category: "Frontend", technologies: "React 19, TypeScript, Vite, TanStack Router" },
  { category: "AI / LLM", technologies: "LangChain + 多 Provider 适配" },
  { category: "Data", technologies: "LibSQL, Drizzle ORM" },
  { category: "State / Utilities", technologies: "Zustand, i18next, ky" },
  { category: "Testing", technologies: "Vitest, Testing Library" }
]

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="border-y bg-muted/30 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              为什么选择 Holix AI
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              不只是一个 AI 聊天工具，更是生产力型的 AI 客户端基础设施
            </p>
            
            <div className="space-y-6">
              {advantages.map((advantage) => (
                <div key={advantage.title} className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-1 font-semibold">{advantage.title}</h3>
                    <p className="text-muted-foreground">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="rounded-lg border bg-card p-8">
              <h3 className="mb-6 text-2xl font-bold">技术栈</h3>
              <div className="space-y-4">
                {techStack.map((item) => (
                  <div key={item.category}>
                    <div className="mb-2 font-semibold">{item.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.technologies}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
