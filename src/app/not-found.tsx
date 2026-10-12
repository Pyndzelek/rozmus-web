import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nie znaleziono strony - Filip Rozmus Trener Personalny",
};

export default function NotFound() {
  return (
    <section className="bg-black text-white md:py-32 py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[var(--brand-accent)] font-semibold mb-4">
          Błąd 404
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Nie znaleziono strony
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
          Sprawdź moją ofertę albo napisz do mnie – chętnie pomogę.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white px-8 py-3 text-lg"
          >
            <Link href="/">Strona główna</Link>
          </Button>
          <Button
            asChild
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg"
          >
            <Link href="/oferta">Oferta i cennik</Link>
          </Button>
          <Button
            asChild
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg"
          >
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
