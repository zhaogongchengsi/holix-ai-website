import { 
  Sparkles, 
  Database, 
  Settings, 
  Shield, 
  Laptop, 
  Code2,
  LucideIcon
} from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Settings,
    title: "多模型统一接入",
    description: "内置 Provider 管理，支持 OpenAI、Anthropic、Google GenAI、Ollama 等多个模型供应商，按会话灵活切换"
  },
  {
    icon: Database,
    title: "本地优先存储",
    description: "聊天数据持久化到本地数据库（LibSQL + Drizzle），完整保留上下文，适合长期项目型对话"
  },
  {
    icon: Code2,
    title: "Skills 技能系统",
    description: "支持内置与用户自定义 Skills，包含 JavaScript 工具、命令行工具、外部脚本，可自动重载"
  },
  {
    icon: Shield,
    title: "工具调用审批",
    description: "高风险工具调用前需审批，支持仅本次允许与始终允许策略，提升安全性与可审计性"
  },
  {
    icon: Laptop,
    title: "桌面端体验",
    description: "系统托盘、窗口管理、单实例运行、自动更新（electron-updater）、i18n 多语言支持"
  },
  {
    icon: Sparkles,
    title: "工程化架构",
    description: "React + TanStack Router + TypeScript，模块化服务、tRPC，具备完整的单元测试体系"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            核心功能
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            为生产力打造的 AI 客户端基础设施
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div 
                key={feature.title}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
