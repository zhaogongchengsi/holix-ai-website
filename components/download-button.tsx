"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { detectOS, getDownloadLink, getOSDisplayName } from "@/lib/download-utils"
import { useSyncExternalStore } from "react"
import Link from "next/link"

interface DownloadButtonProps {
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showPlatform?: boolean
}

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return detectOS()
}

function getServerSnapshot() {
  return 'unknown' as const
}

export function DownloadButton({ size = "lg", className = "", showPlatform = true }: DownloadButtonProps) {
  const os = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const downloadLink = getDownloadLink(os)
  const osName = getOSDisplayName(os)

  // 如果无法识别系统，跳转到下载页面
  if (os === 'unknown') {
    return (
      <Link href="/download">
        <Button size={size} className={`gap-2 ${className}`}>
          <Download className="h-5 w-5" />
          下载应用
        </Button>
      </Link>
    )
  }

  return (
    <a href={downloadLink} download>
      <Button size={size} className={`gap-2 ${className}`}>
        <Download className="h-5 w-5" />
        {showPlatform ? `下载 ${osName} 版本` : '下载应用'}
      </Button>
    </a>
  )
}
