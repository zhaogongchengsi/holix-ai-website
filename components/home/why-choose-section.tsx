"use client"

import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
}

export function WhyChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-choose" className="border-y bg-muted/30 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            为什么选择 Holix AI
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            不只是一个 AI 聊天工具，更是生产力型的 AI 客户端基础设施
          </p>
        </motion.div>
        
        <div ref={ref} className="space-y-6">
          {advantages.map((advantage, i) => (
            <motion.div
              key={advantage.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.02, x: 10 }}
              className="group flex gap-4 rounded-lg border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg hover:shadow-primary/5"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="mb-1 font-semibold transition-colors group-hover:text-primary">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground">
                  {advantage.description}
                </p>
              </div>
              
              {/* Animated accent line */}
              <motion.div
                className="absolute left-0 top-0 h-full w-1 bg-primary"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.2 }}
                style={{ originY: 0 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
