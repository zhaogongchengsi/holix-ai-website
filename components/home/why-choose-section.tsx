"use client"

import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslations } from "next-intl"

interface Advantage {
  key: string
}

const advantageKeys: Advantage[] = [
  { key: 'localControl' },
  { key: 'extensible' },
  { key: 'securityBoundary' },
  { key: 'modelNeutral' },
  { key: 'desktopExperience' }
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
  const t = useTranslations('whyChoose')
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
            {t('title')}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>
        
        <div ref={ref} className="space-y-6">
          {advantageKeys.map((advantage, i) => (
            <motion.div
              key={advantage.key}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative flex gap-6 overflow-hidden rounded-2xl border bg-background/50 p-6 transition-colors hover:bg-muted/50 sm:p-8"
            >
              {/* Subtle tech border gradient on hover */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/50" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/20" />
              
              {/* Minimalist Icon wrapper */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background/50 shadow-sm transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {t(`items.${advantage.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${advantage.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
