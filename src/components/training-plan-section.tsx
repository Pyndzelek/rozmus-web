import { Calendar, Shield, Zap } from "lucide-react";
import Image from "next/image";

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
              src="/rozmus_zjeb.jpeg"
              alt="Training app on phone"
              width={500}
              height={600}
              className="mx-auto rounded-2xl"
            />
          </div>

          <div className="space-y-8">
            {/* Sekcja 1: Organizacja */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Responsywny kontener dla ikony */}
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-zinc-800 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-3">
                  Organizacja
                </h3>
                <p className="text-gray-300">
                  Jestem niezorganizowanym debilem, ale plan treningowy pomoże
                  Ci zorganizować siebie
                </p>
              </div>
            </div>

            {/* Sekcja 2: Wydajność */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Responsywny kontener dla ikony */}
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-zinc-800 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-3">
                  Wydajność
                </h3>
                <p className="text-gray-300">
                  Nie przebiegnę 400 metrów, bo się za bardzo spompuję, ale mój
                  plan treningowy pomoże Ci zwiększyć wydajność i osiągnąć
                  lepsze wyniki.
                </p>
              </div>
            </div>

            {/* Sekcja 3: Bezpieczeństwo */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Responsywny kontener dla ikony */}
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-zinc-800 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              </div>
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
