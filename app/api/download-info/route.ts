import { NextResponse } from 'next/server'
import yaml from 'js-yaml'

interface YmlData {
  version: string
  files: Array<{
    url: string
    size: number
  }>
  path: string
  releaseDate: string
}

interface DownloadInfo {
  windows: {
    version: string
    url: string
    size: number
    fileName: string
  } | null
  mac: {
    version: string
    url: string
    size: number
    fileName: string
  } | null
}

export async function GET() {
  try {
    const baseURL = 'https://github.com/zhaogongchengsi/holix-ai/releases/latest/download'
    
    // 获取 Windows 版本信息
    const windowsResponse = await fetch(`${baseURL}/latest.yml`, {
      cache: 'no-store' // 不缓存，始终获取最新版本
    })
    
    // 获取 macOS 版本信息
    const macResponse = await fetch(`${baseURL}/latest-mac.yml`, {
      cache: 'no-store'
    })

    const downloadInfo: DownloadInfo = {
      windows: null,
      mac: null
    }

    // 解析 Windows 信息
    if (windowsResponse.ok) {
      const windowsText = await windowsResponse.text()
      const windowsData = yaml.load(windowsText) as Partial<YmlData>
      
      if (windowsData.version && windowsData.path) {
        downloadInfo.windows = {
          version: windowsData.version,
          url: `${baseURL}/${windowsData.path}`,
          fileName: windowsData.path,
          size: windowsData.files?.[0]?.size || 0
        }
      }
    }

    // 解析 macOS 信息
    if (macResponse.ok) {
      const macText = await macResponse.text()
      const macData = yaml.load(macText) as Partial<YmlData>
      
      if (macData.version && macData.path) {
        downloadInfo.mac = {
          version: macData.version,
          url: `${baseURL}/${macData.path}`,
          fileName: macData.path,
          size: macData.files?.[0]?.size || 0
        }
      }
    }

    // 如果两个都失败了，返回错误
    if (!downloadInfo.windows && !downloadInfo.mac) {
      return NextResponse.json(
        { error: '无法获取版本信息' },
        { status: 500 }
      )
    }

    return NextResponse.json(downloadInfo, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 缓存5分钟
      },
    })
  } catch (error) {
    console.error('获取下载信息失败:', error)
    return NextResponse.json(
      { error: '获取下载信息失败' },
      { status: 500 }
    )
  }
}
