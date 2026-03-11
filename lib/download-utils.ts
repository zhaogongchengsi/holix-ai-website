/**
 * 检测当前操作系统并返回对应的下载链接
 */
export function detectOS(): 'windows' | 'mac' | 'linux' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown'
  
  const userAgent = window.navigator.userAgent.toLowerCase()
  const platform = window.navigator.platform.toLowerCase()
  
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows'
  }
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'mac'
  }
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux'
  }
  
  return 'unknown'
}

/**
 * 获取对应系统的下载链接
 */
export function getDownloadLink(os?: 'windows' | 'mac' | 'linux' | 'unknown'): string {
  const detectedOS = os || detectOS()
  const baseURL = 'https://github.com/zhaogongchengsi/holix-ai/releases/latest/download'
  
  switch (detectedOS) {
    case 'windows':
      return `${baseURL}/Holix-AI-Setup.exe`
    case 'mac':
      return `${baseURL}/Holix-AI.dmg`
    case 'linux':
      return `${baseURL}/Holix-AI.AppImage`
    default:
      return 'https://github.com/zhaogongchengsi/holix-ai/releases'
  }
}

/**
 * 获取系统显示名称
 */
export function getOSDisplayName(os: 'windows' | 'mac' | 'linux' | 'unknown'): string {
  switch (os) {
    case 'windows':
      return 'Windows'
    case 'mac':
      return 'macOS'
    case 'linux':
      return 'Linux'
    default:
      return '所有平台'
  }
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
}

export function getAllDownloadOptions(): DownloadOption[] {
  return [
    {
      os: 'windows',
      name: 'Windows',
      icon: '🪟',
      link: getDownloadLink('windows'),
      fileFormat: '.exe',
      description: 'Windows 10/11 (64位)'
    },
    {
      os: 'mac',
      name: 'macOS',
      icon: '🍎',
      link: getDownloadLink('mac'),
      fileFormat: '.dmg',
      description: 'macOS 10.15+ (Intel & Apple Silicon)'
    },
    {
      os: 'linux',
      name: 'Linux',
      icon: '🐧',
      link: getDownloadLink('linux'),
      fileFormat: '.AppImage',
      description: 'Ubuntu, Debian, Fedora, Arch'
    }
  ]
}
