// API 返回的下载信息类型
export interface DownloadInfo {
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

/**
 * 检测当前操作系统
 */
export function detectOS(): 'windows' | 'mac' | 'mac-arm' | 'linux' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown'
  
  const userAgent = window.navigator.userAgent.toLowerCase()
  const platform = window.navigator.platform.toLowerCase()
  
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows'
  }
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'mac-arm'
  }
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux'
  }
  
  return 'unknown'
}

/**
 * 服务端获取最新的下载信息（用于 Server Components）
 */
export async function getDownloadInfo(): Promise<DownloadInfo | null> {
  try {
    // 在服务端直接调用 API，使用绝对 URL
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseURL}/api/download-info`, {
      next: { revalidate: 300 } // 缓存 5 分钟
    })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('获取下载信息失败:', error)
    return null
  }
}

/**
 * 根据操作系统和下载信息获取下载链接
 */
export function getDownloadLink(downloadInfo: DownloadInfo | null, os?: 'windows' | 'mac' | 'mac-arm' | 'linux' | 'unknown'): string {
  const detectedOS = os || detectOS()
  const fallbackURL = 'https://github.com/zhaogongchengsi/holix-ai/releases'
  
  // 如果有动态下载信息，优先使用
  if (downloadInfo) {
    switch (detectedOS) {
      case 'windows':
        return downloadInfo.windows?.url || fallbackURL
      case 'mac':
      case 'mac-arm':
        return downloadInfo.mac?.url || fallbackURL
      case 'linux':
        return fallbackURL
      default:
        return fallbackURL
    }
  }
  
  // 降级到 fallback
  return fallbackURL
}

/**
 * 获取系统显示名称
 */
export function getOSDisplayName(os: 'windows' | 'mac' | 'mac-arm' | 'linux' | 'unknown'): string {
  switch (os) {
    case 'windows':
      return 'Windows'
    case 'mac':
    case 'mac-arm':
      return 'macOS'
    case 'linux':
      return 'Linux'
    default:
      return '所有平台'
  }
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '未知大小'
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(0)} MB`
}

/**
 * 获取所有平台的下载信息
 */
export interface DownloadOption {
  os: 'windows' | 'mac' | 'linux'
  name: string
  icon: string
  link: string
  fileFormat: string
  description: string
  version?: string
  size?: string
}

export function getAllDownloadOptions(downloadInfo: DownloadInfo | null): DownloadOption[] {
  const fallbackURL = 'https://github.com/zhaogongchengsi/holix-ai/releases'
  
  return [
    {
      os: 'windows',
      name: 'Windows',
      icon: '🪟',
      link: downloadInfo?.windows?.url || fallbackURL,
      fileFormat: '.exe',
      description: 'Windows 10/11 (64位)',
      version: downloadInfo?.windows?.version,
      size: downloadInfo?.windows?.size ? formatFileSize(downloadInfo.windows.size) : undefined
    },
    {
      os: 'mac',
      name: 'macOS',
      icon: '🍎',
      link: downloadInfo?.mac?.url || fallbackURL,
      fileFormat: '.dmg',
      description: 'macOS 10.15+ (Apple Silicon)',
      version: downloadInfo?.mac?.version,
      size: downloadInfo?.mac?.size ? formatFileSize(downloadInfo.mac.size) : undefined
    },
    {
      os: 'linux',
      name: 'Linux',
      icon: '🐧',
      link: fallbackURL,
      fileFormat: '敬请期待',
      description: '即将推出'
    }
  ]
}
