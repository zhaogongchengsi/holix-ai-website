import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Holix AI - 本地优先的 AI 工作台",
    template: "%s | Holix AI"
  },
  description: "一个基于 Electron 的跨平台桌面 AI 应用，统一管理多个模型供应商，通过 Skills 机制让 AI 从聊天升级为可执行任务的智能助手。本地优先 · 可扩展 · 可审计",
  keywords: ["Holix AI", "AI 工作台", "Electron", "桌面应用", "本地优先", "AI助手", "Skills", "多模型"],
  authors: [{ name: "Holix AI Team" }],
  creator: "Holix AI",
  publisher: "Holix AI",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://holix-ai.com",
    title: "Holix AI - 本地优先的 AI 工作台",
    description: "一个基于 Electron 的跨平台桌面 AI 应用，统一管理多个模型供应商，通过 Skills 机制让 AI 从聊天升级为可执行任务的智能助手",
    siteName: "Holix AI",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Holix AI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Holix AI - 本地优先的 AI 工作台",
    description: "一个基于 Electron 的跨平台桌面 AI 应用，统一管理多个模型供应商，通过 Skills 机制让 AI 从聊天升级为可执行任务的智能助手",
    images: ["/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/manifest.json"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
