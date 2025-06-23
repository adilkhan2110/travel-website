import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import ServicesGrid from "@/components/ServicesGrid"
import InternationalTours from "@/components/InternationalTours"
import GlobalVisaService from "@/components/GlobalVisaService"
import FeaturedDestinations from "@/components/FeaturedDestinations"
import StatsSection from "@/components/StatsSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import Footer from "@/components/Footer"
import WhatsAppWidget from "@/components/WhatsAppWidget"

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesGrid />
      <InternationalTours />
      <GlobalVisaService />
      {/* <FeaturedDestinations /> */}
      <StatsSection />
      <TestimonialsSection />
      <Footer />
      <WhatsAppWidget />
    </main>
  )
}
