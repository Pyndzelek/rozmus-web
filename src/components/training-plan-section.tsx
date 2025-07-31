import { Calendar, Shield, Zap } from "lucide-react";
import Image from "next/image";

export function TrainingPlanSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-16">
          Zalety posiadania planu treningowego
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <Image
              src="/rozmus_zjeb.jpeg"
              alt="Training app on phone"
              width={500}
              height={600}
              className="mx-auto"
            />
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <Calendar className="w-8 h-8 text-red-500 mt-1" />
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-3">
                  Organizacja
                </h3>
                <p className="text-gray-300">
                  Jestem niezorgannizowanym debilem, ale plan treningowy pomoże
                  Ci zorganizować siebie
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Zap className="w-8 h-8 text-red-500 mt-1" />
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-3">
                  Wydajność
                </h3>
                <p className="text-gray-300">
                  nie przebiegne 400 metrów bo sie za bardzo spompuje, ale mój
                  plan treningowy pomoże Ci zwiększyć wydajność i osiągnąć
                  lepsze wyniki.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-red-500 mt-1" />
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-3">
                  Bezpieczeństwo
                </h3>
                <p className="text-gray-300">
                  Nie jestem w stanie zapewnić Ci bezpieczeństwa, ale plan
                  treningowy pomoże Ci unikać kontuzji i trenować bezpiecznie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
