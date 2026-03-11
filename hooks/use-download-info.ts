"use client"

import { useState, useEffect } from 'react'
import { fetchDownloadInfo, type DownloadInfo } from '@/lib/download-utils'

export function useDownloadInfo() {
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchDownloadInfo()
      .then((info) => {
        if (mounted) {
          setDownloadInfo(info)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('获取下载信息失败:', error)
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return { downloadInfo, loading }
}
