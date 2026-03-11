import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { WhyChooseSection } from "@/components/home/why-choose-section"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </div>
  )
}
