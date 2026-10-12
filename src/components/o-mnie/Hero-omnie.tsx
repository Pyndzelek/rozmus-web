import Image from "next/image";
import React from "react";

export default function HeroOmnie() {
  return (
    <section className="md:pt-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Cześć, jestem{" "}
              <span className="text-[var(--brand-accent)]">
                Trenerem Personalnym{" "}
              </span>
              w Nowym Targu
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Nazywam się Filip Rozmus, mam 21 lat i na co dzień pracuję jako
              trener personalny. Specjalizuję się w metamorfozach sylwetki oraz
              poprawie wyników siłowych. Zanim zacząłem pomagać innym,
              przeszedłem długą drogę, żeby poprawić swoją sylwetkę i wyniki.
              Popełniłem masę błędów, ale to właśnie one dały mi najwięcej
              doświadczenia. Teraz dzielę się wiedzą, którą zdobywałem przez
              lata.
            </p>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                <span className="text-[var(--brand-accent)]">✓</span>{" "}
                Certyfikowany instruktor
              </p>
              <p>
                <span className="text-[var(--brand-accent)]">✓</span>{" "}
                Certyfikowany trener personalny
              </p>
              <p>
                <span className="text-[var(--brand-accent)]">✓</span>{" "}
                Certyfikowany trener trójboju siłowego
              </p>
              <p>
                <span className="text-[var(--brand-accent)]">✓</span> Zawodnik
                trójboju siłowego
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/rozmus_nlt.png"
              alt="Filip Rozmus - Trener Personalny"
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
