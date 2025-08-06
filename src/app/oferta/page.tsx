"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Star, Users, Clock, Target } from "lucide-react";
import Link from "next/link";

export default function TrainingPlansPage() {
  const plans = [
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
    {
      name: "12 treningów + plan",
      price: "1100 zł",
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
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Indywidualne podejście",
      description: "Każdy plan jest tworzony specjalnie dla Ciebie",
    },
    {
      icon: <Users className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Stałe wsparcie",
      description: "Jestem z Tobą przez cały proces transformacji",
    },
    {
      icon: <Clock className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Elastyczność",
      description: "Plany dostosowane do Twojego stylu życia",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="md:py-15 py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[var(--brand-accent)]">Oferta</span>{" "}
              dopasowana do Ciebie
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Wybierz ofertę, która najlepiej odpowiada Twoim celom i
              możliwościom. Każda z nich została stworzona z myślą o
              maksymalnych rezultatach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center px-6 md:py-6 py-2"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex justify-center md:mb-4 mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
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
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col h-full"
              >
                <Card
                  className={`bg-gray-900 border-gray-800 h-full relative flex flex-col`}
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
                      <span className="text-2xl md:text-4xl font-bold text-[var(--brand-accent)]">
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
                      <Link href="/formularz">
                        <Button
                          className={`w-full py-3 cursor-pointer ${
                            plan.popular
                              ? "bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)]"
                              : "bg-gray-700 hover:bg-gray-600"
                          } transition-all duration-300 hover:scale-105`}
                        >
                          Wybierz plan
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
}
