import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { CalorieCalculator } from "@/components/calorie-calculator";
import { MotivationSection } from "@/components/motivation-section";
import { WhyTrustSection } from "@/components/why-trust-section";
import { TrainingPlanSection } from "@/components/training-plan-section";
import { TransformationsSection } from "@/components/transformations-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { ModernFooter } from "@/components/modern-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <ServicesSection />
      <TrainingPlanSection />
      <WhyTrustSection />
      <MotivationSection />
      <TransformationsSection />
      <CalorieCalculator />
      <TestimonialsSection />
      <FAQSection />
      <ModernFooter />
    </div>
  );
}
