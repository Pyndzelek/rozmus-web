"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PricingOferta() {
  const pathname = usePathname();
  const [konsultacja, setKonsultacja] = useState(false);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#oferta-cennik") {
      setKonsultacja(true);
    }
  }, [pathname]);

  const plans = [
    {
      name: "Darmowa konsultacja",
      price: "0 zł",
      description: "Poznajmy się i omówmy Twoje cele",
      features: [
        "Analiza celów treningowych i stylu życia",
        "Omówienie dotychczasowych doświadczeń z treningiem",
        "Wstępna ocena poziomu sprawności i zdrowia",
        "Propozycja dalszego planu działania dopasowanego do Twoich potrzeb",
      ],
      popular: false,
    },
    {
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
      name: "1 trening personalny",
      price: "120 zł",
      duration: "1 sesja",
      description: "Indywidualny trening personalny",
      features: ["Trening dostosowany do Twoich potrzeb"],
      popular: false,
    },
    {
      name: "6 treningów personalnych",
      higher_price: "720 zł",
      price: "600 zł",
      duration: "6 sesji",
      description: "6 indywidualnych treningów personalnych",
      features: ["Stały kontakt i wsparcie", "Analiza techniki"],
      popular: false,
    },

    {
      name: "12 treningów + plan",
      price: "1200 zł",
      higher_price: "1440 zł",
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
      name: "Prowadzenie online",
      price: "300 zł",
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
            const isKonsultacjaPopping =
              plan.name === "Darmowa konsultacja" && konsultacja;

            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col h-full"
              >
                <Card
                  className={`bg-gray-900 border-gray-800 h-full relative flex flex-col ${
                    isKonsultacjaPopping
                      ? "animate-in ring-2 ring-[var(--brand-accent)]"
                      : ""
                  }`}
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
                        className={`text-2xl md:text-4xl font-bold text-[var(--brand-accent)] ${
                          isKonsultacjaPopping && "animate-bounce"
                        }`}
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
