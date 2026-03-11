"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DownloadButton } from "@/components/download-button"

export function CTASection() {
  return (
    <section id="quick-start" className="relative overflow-hidden px-6 py-24 lg:px-8">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/50 to-background" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          立即开始使用
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">
          开源、免费、可自部署的 AI 工作台
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <DownloadButton 
              size="lg" 
              className="gap-2"
              showPlatform={false}
            />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a 
              href="https://github.com/zhaogongchengsi/holix-ai" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
              >
                <Github className="h-5 w-5" />
                GitHub 仓库
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
