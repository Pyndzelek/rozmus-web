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
                  Posiadanie planu treningowego ułatwia skoncentrowanie się na
                  celach i efektywne wykorzystanie czasu treningowego.
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
                  Posiadanie dobrze rozpisanego planu treningowego jest
                  niezbędne, jeżeli zależy Ci na wykorzystaniu Twojego
                  potencjału w 100%.
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
                  Posiadanie mądre rozpisanego planu treningowego pozwoli Ci
                  uniknąć przetrenowania i kontuzji.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Plan treningowy to Twoja droga do sukcesu!
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              W treningu siłowym chodzi o maksymalizację zysków i indukowanie
              zmęczenia, plan treningowy z odpowiednio dobranymi ćwiczeniami,
              objętością i intensywnością pozwoli Ci osiągnąć progresywne
              przeciążenie, dzięki któremu osiągniesz rezultaty treningowe. Nie
              czekaj długo — zainwestuj w swój rozwój i osiągnij wspaniałe
              rezultaty dzięki dostosowanemu do Twoich potrzeb planowi
              treningowemu.
            </p>
            <div className="text-red-500 font-semibold mb-4">MOJA OFERTA</div>
          </div>

          <div className="relative">
            <Image
              src="/rozmus_las.JPG"
              alt="Trainer in gym"
              width={500}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
