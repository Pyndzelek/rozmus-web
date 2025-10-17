import type { Metadata } from "next";
import HeroOpinie from "@/components/opinie/Hero-opinie";
import ReviewsSectionOpinie from "@/components/opinie/ReviewsSection-opinie";

export const metadata: Metadata = {
  title: "Opinie i Metamorfozy Klientów - Trener Filip Rozmus | Nowy Targ",
  description:
    "Zobacz efekty mojej pracy! Przeczytaj prawdziwe opinie i zobacz spektakularne metamorfozy moich podopiecznych z Nowego Targu i okolic.",
  openGraph: {
    title: "Historie Sukcesu Moich Klientów | Filip Rozmus",
    description:
      "Zobacz, jakie efekty osiągnęli moi podopieczni. Ty też możesz!",
  },
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroOpinie />

      {/* Reviews Section */}
      <ReviewsSectionOpinie />
    </div>
  );
}
