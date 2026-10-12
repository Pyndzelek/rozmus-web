import React from "react";

export default function HeroOferta() {
  return (
    <section className="md:py-25 py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Bez animacji wejścia: nagłówek to element LCP, opacity: 0 do hydracji opóźniało go o ~3 s */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-[var(--brand-accent)]">Oferta</span>{" "}
            dopasowana do Ciebie
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Znajdziesz tutaj pakiety na treningi personalne, indywidualne online
            lub w Nowym Targu oraz treningi duo. Sprawdź cennik i wybierz
            rozwiązanie, które pomoże Ci osiągnąć wymarzoną formę.
          </p>
        </div>
      </div>
    </section>
  );
}
