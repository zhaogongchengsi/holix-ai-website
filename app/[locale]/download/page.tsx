import { getDownloadInfo } from "@/lib/download-utils"
import { DownloadPageClient } from "@/components/download-page-client"

export const metadata = {
  title: '下载 Holix AI | AI 工作台',
  description: '下载适合你操作系统的 Holix AI 版本，开始使用强大的 AI 工作台',
}

export default async function DownloadPage() {
  // 服务端获取下载信息，支持 SSR，无 loading 状态
  const downloadInfo = await getDownloadInfo()
  
  return <DownloadPageClient downloadInfo={downloadInfo} />
}
