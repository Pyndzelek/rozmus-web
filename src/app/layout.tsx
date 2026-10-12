import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnaltics";
import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Domena główna (www przekierowuje 301 na wersję bez www) - podstawa dla canonical i OG
  metadataBase: new URL("https://filiprozmus.pl"),
  title: "Filip Rozmus - Trener Personalny Nowy Targ",
  description:
    "Szukasz trenera personalnego w Nowym Targu? Pomogę Ci osiągnąć cele! Oferuję treningi personalne i duo, indywidualne plany treningowe, wskazówki żywieniowe i prowadzenie online. Zrób pierwszy krok!",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  // --- SEKCJA SOCIAL MEDIA ---
  openGraph: {
    title: "Filip Rozmus - Trener Personalny w Nowym Targu",
    description:
      "Gotowy na zmianę? Osiągnij swoje cele treningowe z profesjonalnym wsparciem.",
    url: "https://filiprozmus.pl",
    siteName: "Filip Rozmus Trener Personalny",

    images: [
      {
        url: "https://filiprozmus.pl/og-image.jpg",
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
    images: ["https://filiprozmus.pl/og-image.jpg"],
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
    image: "https://filiprozmus.pl/og-image.jpg",
    "@id": "https://filiprozmus.pl",
    url: "https://filiprozmus.pl",
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
    // Godziny muszą zgadzać się z KontaktInfo-kontakt.tsx
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
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
          <Header />
          {children}
          <ModernFooter />
          <Analytics />
          <GoogleAnalytics />
        </div>
      </body>
    </html>
  );
}
