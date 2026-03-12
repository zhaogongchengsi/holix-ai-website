"use client"

import { 
  Sparkles, 
  Database, 
  Settings, 
  Shield, 
  Laptop, 
  Code2,
  LucideIcon
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslations } from "next-intl"

interface Feature {
  icon: LucideIcon
  key: string
}

const featureIcons: Feature[] = [
  { icon: Settings, key: 'multiModel' },
  { icon: Database, key: 'localFirst' },
  { icon: Code2, key: 'skills' },
  { icon: Shield, key: 'approval' },
  { icon: Laptop, key: 'desktop' },
  { icon: Sparkles, key: 'architecture' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export function FeaturesSection() {
  const t = useTranslations('features')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featureIcons.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border bg-background/50 p-8 transition-colors hover:bg-muted/50"
              >
                {/* Subtle tech border gradient on hover */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/50" />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/20" />
                
                {/* Minimalist Icon wrapper */}
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border bg-background/50 shadow-sm transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                
                <h3 className="mb-3 text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${feature.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
