import React from "react";
import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_MAPS_URL } from "@/lib/google-business";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena ${rating} na 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

// Opinie pobierane z Profilu Firmy w Google (renderowane na serwerze, więc są w HTML).
// Bez znaczników Review/AggregateRating - Google traktuje je na własnej stronie jako "self-serving".
export default async function GoogleReviewsOpinie() {
  const data = await getGoogleReviews();
  if (!data) return null;

  const ratingLabel = data.rating.toLocaleString("pl-PL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <p className="text-5xl font-bold mb-2">{ratingLabel}</p>
          <Stars rating={data.rating} />
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:underline mt-2"
          >
            na podstawie {data.userRatingCount} opinii w Google
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review, index) => (
            <article
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                {review.authorPhotoUri && (
                  // Zdjęcia autorów z Google - zwykły <img>, bez konfiguracji domen dla next/image
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.authorPhotoUri}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  {review.authorUri ? (
                    <a
                      href={review.authorUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                    >
                      {review.authorName}
                    </a>
                  ) : (
                    <p className="font-semibold">{review.authorName}</p>
                  )}
                  <p className="text-gray-500 text-sm">{review.relativeTime}</p>
                </div>
              </div>
              <Stars rating={review.rating} />
              <p className="text-gray-300 leading-relaxed mt-3 whitespace-pre-line">
                {review.text}
              </p>
            </article>
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center mt-6">Opinie z Google</p>
      </div>
    </section>
  );
}
