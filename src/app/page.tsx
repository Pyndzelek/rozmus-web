import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { CalorieCalculator } from "@/components/calorie-calculator";
import { MotivationSection } from "@/components/motivation-section";
import { WhyTrustSection } from "@/components/why-trust-section";
import { TransformationsSection } from "@/components/transformations-section";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <ServicesSection />

      <WhyTrustSection />
      <MotivationSection />
      <TransformationsSection />
      <CalorieCalculator />
      <FAQSection />
    </div>
  );
}
