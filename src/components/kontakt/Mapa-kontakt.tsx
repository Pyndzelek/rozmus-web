import React from "react";
import { MapPin, Star } from "lucide-react";
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from "@/lib/google-business";

// Zapytanie = nazwa z Profilu Firmy w Google + adres, żeby mapa pokazała wizytówkę, a nie sam adres
const MAPS_QUERY =
  "Filip Rozmus - Trener Personalny Nowy Targ, Aleja Tysiąclecia 74, 34-400 Nowy Targ";

export default function MapaKontakt() {
  const query = encodeURIComponent(MAPS_QUERY);

  return (
    <section className="md:py-20 py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl md:text-3xl font-bold mb-2 text-center">
          Jak dojechać?
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Treningi stacjonarne prowadzę w Studio Gorce przy Alei Tysiąclecia 74 w
          Nowym Targu.
        </p>
        <div className="rounded-lg overflow-hidden border border-gray-800">
          <iframe
            title="Mapa dojazdu - Studio Gorce, Nowy Targ"
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            className="w-full h-[350px] md:h-[450px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center mt-6">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--brand-accent)] hover:underline"
          >
            <MapPin className="w-5 h-5" />
            Otwórz w Google Maps
          </a>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--brand-accent)] hover:underline"
          >
            <Star className="w-5 h-5" />
            Wystaw opinię w Google
          </a>
        </div>
      </div>
    </section>
  );
}
