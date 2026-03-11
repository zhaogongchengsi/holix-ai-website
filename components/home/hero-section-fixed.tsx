"use client"

import { Sparkles, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { DownloadButton } from "@/components/download-button"
import Image from "next/image"

export function HeroSection() {
  // Generate particle positions only on client side to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    left: number
    top: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  return (
    <section className="relative overflow-hidden border-b px-6 py-24 sm:py-32 lg:px-8">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-secondary/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-1/2 top-40 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
      
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative"
            >
              <Image 
                src="/icon_128.png" 
                alt="Holix AI Logo" 
                width={96} 
                height={96}
                className="h-24 w-24"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-2xl" />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            <span>面向开发者的 AI 工作台</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              Holix AI
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 text-xl text-muted-foreground sm:text-2xl"
          >
            本地优先 · 可扩展 · 可审计
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            一个基于 Electron 的跨平台桌面 AI 应用，统一管理多个模型供应商，
            通过 Skills 机制让 AI 从聊天升级为可执行任务的智能助手
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <DownloadButton 
              size="lg" 
              className="transition-transform hover:scale-105"
              showPlatform={true}
            />
            <a 
              href="https://github.com/zhaogongchengsi/holix-ai" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 transition-transform hover:scale-105"
              >
                <Github className="h-5 w-5" />
                查看源码
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
