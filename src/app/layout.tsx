import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnaltics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filip Rozmus - Trener Personalny Nowy Targ",
  description:
    "Szukasz trenera personalnego w Nowym Targu? Pomogę Ci osiągnąć cele! Oferuję indywidualne plany treningowe, dietę i wsparcie online. Zrób pierwszy krok i umów się na konsultację.",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  // --- SEKCJA SOCIAL MEDIA ---
  openGraph: {
    title: "Filip Rozmus - Trener Personalny w Nowym Targu",
    description:
      "Gotowy na zmianę? Osiągnij swoje cele treningowe z profesjonalnym wsparciem.",
    url: "https://www.filiprozmus.pl",
    siteName: "Filip Rozmus Trener Personalny",

    images: [
      {
        url: "https://www.filiprozmus.pl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Filip Rozmus - Trener Personalny Nowy Targ",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image", // Typ karty Twittera
    title: "Filip Rozmus - Trener Personalny w Nowym Targu",
    description:
      "Gotowy na zmianę? Osiągnij swoje cele treningowe z profesjonalnym wsparciem.",
    images: ["https://www.filiprozmus.pl/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Filip Rozmus - Trener Personalny Nowy Targ",
    image: "https://www.filiprozmus.pl/og-image.jpg",
    "@id": "https://www.filiprozmus.pl",
    url: "https://www.filiprozmus.pl",
    telephone: "+48 513 978 894",
    priceRange: "$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Aleje Tysiąclecia 74",
      addressLocality: "Nowy Targ",
      postalCode: "34-400",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.4763272,
      longitude: 20.0351173,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
    sameAs: [
      "https://www.facebook.com/filip.rozmus.5030",
      "https://www.instagram.com/rozmusik_",
    ],
  };

  return (
    <html lang="pl" className="h-auto">
      <body className={`${inter.className} h-auto min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="h-auto min-h-screen overflow-hidden">
          {children}
          <Analytics />
          <GoogleAnalytics />
        </div>
      </body>
    </html>
  );
}
