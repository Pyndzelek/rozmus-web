import { Button } from "@/components/ui/button";
import { ChevronRight, Target } from "lucide-react";
import Image from "next/image";

export function MotivationSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/rozmus_motywacja.jpeg"
              alt="Training app mockup"
              width={400}
              height={500}
              className="mx-auto rounded-2xl"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold">Motywacja</h2>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Znajac wyraźne kroki i cele treningowe, łatwiej utrzymać motywację
              na dłuższą metę.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
              Zaczynam przemianę <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
