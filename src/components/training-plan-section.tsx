import { Calendar, Shield, Zap } from "lucide-react";
import Image from "next/image";
import { AnimatedFeature } from "./animated-plan-feature";

export function TrainingPlanSection() {
  return (
    <section className="bg-black text-white py-5 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">
          Zalety posiadania planu treningowego
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <Image
              src="/rozmus_plan.png"
              alt="Training app on phone"
              width={500}
              height={600}
              className="mx-auto rounded-2xl"
            />
          </div>

          <div className="space-y-8">
            {/* Use the new reusable component for each feature */}
            <AnimatedFeature
              delay={0.2}
              icon={
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-[var(--brand-accent)]" />
              }
              title="Organizacja"
              description="Dobrze przygotowany plan pomoże Ci w organizacji i systematyczności treningów, eliminując zgadywanie."
            />

            <AnimatedFeature
              delay={0.4}
              icon={
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-[var(--brand-accent)]" />
              }
              title="Wydajność"
              description="Dzięki progresywnemu podejściu, plan pomoże Ci zwiększyć wydajność i osiągać lepsze wyniki w krótszym czasie."
            />

            <AnimatedFeature
              delay={0.6}
              icon={
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-[var(--brand-accent)]" />
              }
              title="Bezpieczeństwo"
              description="Indywidualnie dopasowany plan minimalizuje ryzyko kontuzji i pozwala trenować w sposób bezpieczny i przemyślany."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
