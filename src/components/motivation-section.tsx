import { Button } from "@/components/ui/button";
import { ChevronRight, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MotivationSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:col-start-2">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-[var(--brand-accent)]" />
              <h2 className="text-3xl font-bold">Motywacja</h2>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Nie każdy potrzebuje motywacji, ale jeśli jesteś osobą, która jej
              potrzebuje to będę motywował Cię na każdym kroku, dopóki nie
              osiągniesz wymarzonego celu.
            </p>
            <Link href="/oferta" className="inline-block">
              <Button className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white px-8 py-3 text-lg hover:scale-105 transition-transform cursor-pointer">
                Zaczynam przemianę <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="relative lg:col-start-1 lg:row-start-1 mt-0 lg:mt-0">
            <Image
              src="/rozmus_motywacja.jpeg"
              alt="Motywacja"
              width={1280}
              height={905}
              className="mx-auto rounded-2xl"
              quality={70}
              sizes="(max-width: 640px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
