import { NextResponse } from 'next/server'

interface GitHubAsset {
  name: string
  browser_download_url: string
  size: number
}

interface GitHubRelease {
  tag_name: string
  assets: GitHubAsset[]
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
    // 使用 GitHub API 获取最新 release
    const response = await fetch(
      'https://api.github.com/repos/zhaogongchengsi/holix-ai/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'holix-ai-website'
        },
        cache: 'no-store' // 不缓存，始终获取最新版本
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API 请求失败: ${response.status}`)
    }

    const release: GitHubRelease = await response.json()
    const downloadInfo: DownloadInfo = {
      windows: null,
      mac: null
    }

    // 查找 Windows 安装包 (.exe)
    // 优先查找 x64 版本，如果没有则查找任意 .exe 文件
    const windowsAsset = release.assets.find(asset =>
      asset.name.includes('x64') && asset.name.endsWith('.exe') && !asset.name.includes('blockmap')
    ) || release.assets.find(asset =>
      asset.name.endsWith('.exe') && !asset.name.includes('blockmap')
    )

    if (windowsAsset) {
      downloadInfo.windows = {
        version: release.tag_name.replace(/^v/, ''),
        url: windowsAsset.browser_download_url,
        fileName: windowsAsset.name,
        size: windowsAsset.size
      }
    }

    // 查找 macOS 安装包 (.dmg)
    // 优先查找 ARM64 版本（Apple Silicon），如果没有则查找 x64 或通用版本
    const macAsset = release.assets.find(asset =>
      asset.name.includes('arm64') && asset.name.endsWith('.dmg') && !asset.name.includes('blockmap')
    ) || release.assets.find(asset =>
      asset.name.includes('x64') && asset.name.endsWith('.dmg') && !asset.name.includes('blockmap')
    ) || release.assets.find(asset =>
      asset.name.endsWith('.dmg') && !asset.name.includes('blockmap')
    )

    if (macAsset) {
      downloadInfo.mac = {
        version: release.tag_name.replace(/^v/, ''),
        url: macAsset.browser_download_url,
        fileName: macAsset.name,
        size: macAsset.size
      }
    }

    // 如果两个都没找到，返回错误
    if (!downloadInfo.windows && !downloadInfo.mac) {
      return NextResponse.json(
        { error: '未找到可用的安装包' },
        { status: 404 }
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
