import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnaltics";
import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { GOOGLE_MAPS_URL } from "@/lib/google-business";
import { PRICE_RANGE } from "@/lib/plans";
import { baseOpenGraph } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  // Domena główna (www przekierowuje 301 na wersję bez www) - podstawa dla canonical i OG
  metadataBase: new URL("https://filiprozmus.pl"),
  title: "Filip Rozmus - Trener Personalny Nowy Targ",
  description:
    "Szukasz trenera personalnego w Nowym Targu? Pomogę Ci osiągnąć cele! Oferuję treningi personalne i duo, indywidualne plany treningowe, wskazówki żywieniowe i prowadzenie online. Zrób pierwszy krok!",
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    title: "Filip Rozmus - Trener Personalny w Nowym Targu",
    description:
      "Gotowy na zmianę? Osiągnij swoje cele treningowe z profesjonalnym wsparciem.",
  },
  // Tylko typ karty - Next uzupełnia tytuł, opis i obraz z openGraph danej strony
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Encje połączone przez @id; Pricing-oferta.tsx odwołuje się do #business
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://filiprozmus.pl/#website",
        url: "https://filiprozmus.pl",
        name: "Filip Rozmus - Trener Personalny Nowy Targ",
        inLanguage: "pl-PL",
        publisher: { "@id": "https://filiprozmus.pl/#business" },
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": "https://filiprozmus.pl/#business",
        name: "Filip Rozmus - Trener Personalny Nowy Targ",
        description:
          "Treningi personalne i treningi duo w Nowym Targu, indywidualne plany treningowe i prowadzenie online.",
        url: "https://filiprozmus.pl",
        image: "https://filiprozmus.pl/og-image.jpg",
        logo: "https://filiprozmus.pl/logo_nlt.png",
        telephone: "+48513978894",
        priceRange: PRICE_RANGE,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Aleja Tysiąclecia 74",
          addressLocality: "Nowy Targ",
          addressRegion: "małopolskie",
          postalCode: "34-400",
          addressCountry: "PL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 49.4763272,
          longitude: 20.0351173,
        },
        areaServed: { "@type": "City", name: "Nowy Targ" },
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
        hasMap: GOOGLE_MAPS_URL,
        founder: { "@id": "https://filiprozmus.pl/#filip" },
        sameAs: [
          GOOGLE_MAPS_URL,
          "https://www.facebook.com/filip.rozmus.5030",
          "https://www.instagram.com/rozmusik_",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://filiprozmus.pl/#filip",
        name: "Filip Rozmus",
        jobTitle: "Trener personalny",
        url: "https://filiprozmus.pl/o-mnie",
        image: "https://filiprozmus.pl/og-image.jpg",
        worksFor: { "@id": "https://filiprozmus.pl/#business" },
        sameAs: [
          "https://www.facebook.com/filip.rozmus.5030",
          "https://www.instagram.com/rozmusik_",
        ],
      },
    ],
  };

  return (
    <html lang="pl" className="h-auto">
      <body className={`${inter.className} h-auto min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
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
