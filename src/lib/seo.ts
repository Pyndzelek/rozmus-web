import type { Metadata } from "next";

// Wspólne pola OpenGraph. Strona z własnym openGraph zastępuje cały obiekt z layoutu,
// więc każda strona rozwija baseOpenGraph i dodaje swój url, title i description.
export const baseOpenGraph: NonNullable<Metadata["openGraph"]> = {
  siteName: "Filip Rozmus Trener Personalny",
  locale: "pl_PL",
  type: "website",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Filip Rozmus - Trener Personalny Nowy Targ",
    },
  ],
};
