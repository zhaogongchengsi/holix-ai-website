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
                  {t(`items.${advantage.key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`items.${advantage.key}.description`)}
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
