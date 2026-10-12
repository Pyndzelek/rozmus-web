import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo";
import HeroOpinie from "@/components/opinie/Hero-opinie";
import ReviewsSectionOpinie from "@/components/opinie/ReviewsSection-opinie";
import { GoogleReviewCta } from "@/components/google-review-cta";
import GoogleReviewsOpinie from "@/components/opinie/GoogleReviews-opinie";

export const metadata: Metadata = {
  alternates: { canonical: "/opinie" },
  title: "Opinie i Metamorfozy Klientów - Trener Filip Rozmus | Nowy Targ",
  description:
    "Zobacz efekty mojej pracy! Przeczytaj prawdziwe opinie i zobacz spektakularne metamorfozy moich podopiecznych z Nowego Targu i okolic.",
  openGraph: {
    ...baseOpenGraph,
    url: "/opinie",
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

      {/* Opinie z Google (wymaga GOOGLE_PLACES_API_KEY) */}
      <GoogleReviewsOpinie />

      {/* Reviews Section */}
      <ReviewsSectionOpinie />

      {/* Opinie w Google */}
      <GoogleReviewCta />
    </div>
  );
}
