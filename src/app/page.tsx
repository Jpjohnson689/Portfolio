import { Navbar } from '@/components/marketing/Navbar'
import { Hero } from '@/components/marketing/Hero'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { PricingSection } from '@/components/marketing/PricingSection'
import { WhyUs } from '@/components/marketing/WhyUs'
import { Testimonials } from '@/components/marketing/Testimonials'
import { ServiceArea } from '@/components/marketing/ServiceArea'
import { CTASection } from '@/components/marketing/CTASection'
import { Footer } from '@/components/marketing/Footer'
import { StickyMobileBar } from '@/components/marketing/StickyMobileBar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <PricingSection />
      <WhyUs />
      <Testimonials />
      <ServiceArea />
      <CTASection />
      <Footer />
      <StickyMobileBar />
    </>
  )
}
