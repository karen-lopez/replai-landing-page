import { Header } from "@/components/sections/header"
import { HeroSection } from "@/components/sections/hero"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { FeaturesSection } from "@/components/sections/features"
import { LaunchOfferSection } from "@/components/sections/launch-offer"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { PricingSection } from "@/components/sections/pricing"
import { LuzAmigaSection } from "@/components/sections/luz-amiga"
import { LeadFormSection } from "@/components/sections/lead-form"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <LaunchOfferSection />
        <TestimonialsSection />
        <PricingSection />
        <LuzAmigaSection />
        <LeadFormSection />
      </main>
      <Footer />
    </>
  );
}
