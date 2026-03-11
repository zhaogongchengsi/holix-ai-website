import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { WhyChooseSection } from "@/components/home/why-choose-section"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/footer"
import { getDownloadInfo } from "@/lib/download-utils"

export default async function Page() {
  // 服务端获取下载信息，支持 SSR
  const downloadInfo = await getDownloadInfo()
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection downloadInfo={downloadInfo} />
      <FeaturesSection />
      <WhyChooseSection />
      <CTASection downloadInfo={downloadInfo} />
      <Footer />
    </div>
  )
}
