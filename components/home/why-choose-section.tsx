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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

export function WhyChooseSection() {
  const t = useTranslations('whyChoose')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-choose" className="border-y bg-background px-8 py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <div ref={ref} className="space-y-8 lg:space-y-10">
          {advantageKeys.map((advantage) => (
            <motion.div
              key={advantage.key}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative flex gap-6 overflow-hidden rounded-xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md hover:-translate-y-1 lg:p-10"
            >
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
