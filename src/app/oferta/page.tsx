import FeaturesOferta from "@/components/oferta/Features-oferta";
import HeroOferta from "@/components/oferta/Hero-oferta";
import PricingOferta from "@/components/oferta/Pricing-oferta";
import { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/oferta" },
  title: "Oferta i Cennik - Trening Personalny Nowy Targ | Filip Rozmus",
  description:
    "Sprawdź ofertę treningów personalnych i duo w Nowym Targu oraz indywidualnych planów i prowadzenia online. Zobacz cennik i zacznij swoją przemianę!",
  openGraph: {
    ...baseOpenGraph,
    url: "/oferta",
    title: "Oferta i Cennik | Filip Rozmus Trener Personalny",
    description:
      "Zobacz, jak mogę Ci pomóc osiągnąć Twoje cele treningowe i sylwetkowe.",
  },
};

export default function TrainingPlansPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroOferta />

      <FeaturesOferta />

      <PricingOferta />
    </div>
  );
}
