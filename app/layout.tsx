import { Geist_Mono, Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html suppressHydrationWarning className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
