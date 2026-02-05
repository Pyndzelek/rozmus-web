"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function PricingOferta() {
  const plans = [
    {
      id: "indywidualny-plan",
      name: "Indywidualny plan treningowy",
      price: "150 zł",
      duration: "4-12 tygodni",
      description: "Plan treningowy dopasowany do Twoich potrzeb",
      features: [
        "Indywidualny plan treningowy",
        "Instrukcje wideo do każdego ćwiczenia",
      ],
      popular: false,
    },
    {
      id: "1-trening-personalny",
      name: "1 trening personalny",
      price: "150 zł",
      duration: "1 sesja",
      description: "Indywidualny trening personalny",
      features: ["Trening dostosowany do Twoich potrzeb"],
      popular: false,
    },
    {
      id: "6-treningow-personalnych",
      name: "6 treningów personalnych",
      higher_price: "900 zł",
      price: "600 zł",
      duration: "6 sesji",
      description: "6 indywidualnych treningów personalnych",
      features: ["Stały kontakt i wsparcie", "Analiza techniki"],
      popular: false,
    },
    {
      id: "12-treningow-duo",
      name: "12 treningów duo",
      price: "1800 zł",
      duration: "12 sesji (dla 2 osób)",
      description: "12 treningów personalnych w duecie",
      features: [
        "Treningi z partnerem lub znajomym",

        "Stały kontakt i wsparcie",
        "Analiza techniki każdego uczestnika",
        "W grupie raźniej :)",
      ],
      popular: false,
    },

    {
      id: "12-treningow-plan",
      name: "12 treningów + plan",
      price: "1200 zł",
      higher_price: "1620 zł",
      duration: "12 sesji",
      description: "12 treningów personalnych + plan treningowy",
      features: [
        "Indywidualny plan treningowy",
        "Instrukcje wideo do każdego ćwiczenia",
        "Stały kontakt i wsparcie",
        "Analiza techniki",
      ],
      popular: true,
    },
    {
      id: "prowadzenie-online",
      name: "Prowadzenie online",
      price: "200 zł",
      duration: "1 miesiąc",
      description: "Współpraca online",
      features: [
        "Indywidualny plan treningowy",
        "Instrukcje wideo do każdego ćwiczenia",
        "Stały kontakt i wsparcie",
        "Cotygodniowe raporty",
        "Analiza techniki",
        "Wskazówki dietetyczne",
      ],
      popular: false,
    },
  ];
  const parsePrice = (priceStr: string) => {
    return priceStr.replace(/[^0-9]/g, "");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Filip Rozmus Trener Personalny",
        description:
          "Profesjonalny trener personalny w Nowym Targu. Indywidualne plany treningowe, prowadzenie online i treningi w duecie.",
        url: "https://filiprozmus.pl",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nowy Targ",
          addressRegion: "Małopolskie",
          addressCountry: "PL",
        },
        priceRange: `${parsePrice(plans[0].price)} PLN - ${parsePrice(plans[3].price)} PLN`,
        image: "https://filiprozmus.pl/rozmus_zaufanie.jpg",
      },
      {
        "@type": "ItemList",
        itemListElement: plans.map((plan, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: plan.name,
            description: plan.description,
            image: "https://filiprozmus.pl/logo_nlt_czarne.jpg",
            offers: {
              "@type": "Offer",
              price: parsePrice(plan.price),
              priceCurrency: "PLN",
              availability: "https://schema.org/InStock",
              url: `https://filiprozmus.pl/oferta#${plan.id}`,
              priceValidUntil: "2026-12-31",
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Czas trwania",
                value: plan.duration,
              },
              {
                "@type": "PropertyValue",
                name: "Cechy",
                value: plan.features.join(", "),
              },
            ],
          },
        })),
      },
    ],
  };

  const createPlanSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, ""); // Remove all non-word chars
  };

  const plansWithRedirect = [
    "Indywidualny plan treningowy",
    "Prowadzenie online",
    "12 treningów + plan",
  ];
  return (
    <section className="py-20" id="oferta-cennik">
      <Script type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Wybierz swój plan
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Inwestycja w siebie, która się opłaci
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isRedirectPlan = plansWithRedirect.includes(plan.name);
            const href = isRedirectPlan
              ? `/formularz?plan=${createPlanSlug(plan.name)}`
              : "#"; // Fallback href for other plans, you can change this

            return (
              <motion.div
                id={plan.id}
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col h-full"
              >
                <Card
                  className={`bg-gray-900 border-gray-800 h-full relative flex flex-col `}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[var(--brand-accent-strong)] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Najpopularniejszy
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-xl md:text-2xl font-bold text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="my-4 flex items-baseline justify-center gap-2">
                      {plan.higher_price && (
                        <span className="text-xl md:text-2xl font-bold text-gray-500 line-through">
                          {plan.higher_price}
                        </span>
                      )}
                      <span
                        className={`text-2xl md:text-4xl font-bold text-[var(--brand-accent)] `}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <div className="text-gray-400">{plan.duration}</div>
                    <p className="text-gray-300 mt-4">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-1">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-[var(--brand-accent)] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      {isRedirectPlan ? (
                        <Link href={href} passHref>
                          <Button
                            asChild={!isRedirectPlan}
                            className={`w-full py-3 cursor-pointer ${
                              plan.popular
                                ? "bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)]"
                                : "bg-gray-700 hover:bg-gray-600"
                            } transition-all duration-300 hover:scale-105`}
                          >
                            Wybierz plan
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/kontakt#kontakt-form" passHref>
                          <Button
                            className={`w-full py-3 cursor-pointer ${
                              plan.popular
                                ? "bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)]"
                                : "bg-gray-700 hover:bg-gray-600"
                            } transition-all duration-300 hover:scale-105`}
                          >
                            {plan.name === "Darmowa konsultacja"
                              ? "Umów się na konsultację"
                              : "Umów się na trening"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
