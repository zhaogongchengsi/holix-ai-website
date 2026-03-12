import { getDownloadInfo } from "@/lib/download-utils"
import { DownloadPageClient } from "@/components/download-page-client"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'download.metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function DownloadPage() {
  // 服务端获取下载信息，支持 SSR，无 loading 状态
  const downloadInfo = await getDownloadInfo()
  
  return <DownloadPageClient downloadInfo={downloadInfo} />
}
