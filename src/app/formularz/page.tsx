import { Suspense } from "react";
import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo";

import SurveyContentFormularz from "@/components/formularz/SurveyContent-formularz";

export const metadata: Metadata = {
  title: "Formularz zgłoszeniowy - Filip Rozmus Trener Personalny",
  description:
    "Wypełnij krótką ankietę, abym mógł przygotować współpracę dopasowaną do Twoich celów.",
  alternates: { canonical: "/formularz" },
  openGraph: {
    ...baseOpenGraph,
    url: "/formularz",
    title: "Formularz zgłoszeniowy | Filip Rozmus Trener Personalny",
    description:
      "Wypełnij krótką ankietę, abym mógł przygotować współpracę dopasowaną do Twoich celów.",
  },
  // Krok konwersji z /oferta, nie strona docelowa z wyszukiwarki
  robots: { index: false, follow: true },
};

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={<div>Ładowanie...</div>}>
        <SurveyContentFormularz />
      </Suspense>
    </div>
  );
}
