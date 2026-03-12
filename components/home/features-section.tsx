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
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featureIcons.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                className="group relative"
              >
                {/* Rotating gradient border glow */}
                <motion.div
                  className="absolute -inset-0.5 rounded-lg bg-linear-to-r from-primary via-secondary to-primary opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-75"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                />
                
                {/* Card content */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <motion.div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  </motion.div>
                  
                  <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                    {t(`items.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`items.${feature.key}.description`)}
                  </p>
                  
                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
