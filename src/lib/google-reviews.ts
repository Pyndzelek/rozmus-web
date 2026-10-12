import { GOOGLE_PLACE_ID } from "@/lib/google-business";

export type GoogleReview = {
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  rating: number;
  text: string;
  relativeTime: string;
  googleMapsUri?: string;
};

export type GoogleReviewsData = {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  googleMapsUri?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
};

// Places API (New) zwraca maksymalnie 5 opinii. Odświeżane raz na dobę (ISR),
// więc to ok. 30 zapytań miesięcznie. Bez klucza zwraca null i sekcja się nie wyświetla.
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=pl`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 60 * 60 * 24 },
      }
    );

    if (!res.ok) {
      console.error("Google Places API error:", res.status, await res.text());
      return null;
    }

    const data: PlacesResponse = await res.json();
    if (!data.rating || !data.userRatingCount) return null;

    return {
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      reviews: (data.reviews ?? [])
        .map((r) => ({
          authorName: r.authorAttribution?.displayName ?? "Klient Google",
          authorUri: r.authorAttribution?.uri,
          authorPhotoUri: r.authorAttribution?.photoUri,
          rating: r.rating ?? 0,
          text: r.originalText?.text ?? r.text?.text ?? "",
          relativeTime: r.relativePublishTimeDescription ?? "",
          googleMapsUri: r.googleMapsUri,
        }))
        .filter((r) => r.text.length > 0),
    };
  } catch (error) {
    console.error("Google Places API fetch failed:", error);
    return null;
  }
}
