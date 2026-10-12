"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { plans, parsePrice } from "@/lib/plans";

export default function PricingOferta() {
  // Usługa powiązana z firmą z layout.tsx (@id), bez drugiej encji firmy
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://filiprozmus.pl/oferta#service",
    serviceType: "Trening personalny",
    name: "Treningi personalne i prowadzenie online",
    description:
      "Treningi personalne i treningi duo w Nowym Targu, indywidualne plany treningowe i prowadzenie online.",
    url: "https://filiprozmus.pl/oferta",
    provider: { "@id": "https://filiprozmus.pl/#business" },
    areaServed: { "@type": "City", name: "Nowy Targ" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cennik",
      itemListElement: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        price: parsePrice(plan.price),
        priceCurrency: "PLN",
        url: `https://filiprozmus.pl/oferta#${plan.id}`,
      })),
    },
  };

  return (
    <section className="py-20" id="oferta-cennik">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            const isRedirectPlan = Boolean(plan.surveyDescription);
            const href = `/formularz?plan=${plan.id}`;

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
                        <Link
                          href={`/kontakt?plan=${encodeURIComponent(plan.name)}#kontakt-form`}
                          passHref
                        >
                          <Button
                            className={`w-full py-3 cursor-pointer ${
                              plan.popular
                                ? "bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)]"
                                : "bg-gray-700 hover:bg-gray-600"
                            } transition-all duration-300 hover:scale-105`}
                          >
                            Umów się na trening
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
