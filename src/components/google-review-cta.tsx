import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from "@/lib/google-business";

export function GoogleReviewCta() {
  return (
    <section className="md:py-20 py-10 bg-gray-900">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-xl md:text-3xl font-bold mb-4">
          Współpracowaliśmy? Zostaw opinię w Google
        </h2>
        <p className="text-gray-400 mb-8">
          Twoja opinia pomaga innym osobom z Nowego Targu i okolic znaleźć
          trenera, który pomoże im osiągnąć cel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white px-8 py-3 text-lg"
          >
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              <Star className="w-5 h-5" />
              Wystaw opinię w Google
            </a>
          </Button>
          <Button
            asChild
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 text-lg"
          >
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
              <MapPin className="w-5 h-5" />
              Zobacz opinie w Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
