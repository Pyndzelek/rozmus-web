"use client"

import { Header } from "@/components/header"
import { ModernFooter } from "@/components/modern-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Star, Users, Clock, Target } from "lucide-react"

export default function TrainingPlansPage() {
  const plans = [
    {
      name: "Plan Podstawowy",
      price: "199 zł",
      duration: "4 tygodnie",
      description: "Idealny dla początkujących, którzy chcą rozpocząć swoją przygodę z treningiem",
      features: [
        "Spersonalizowany plan treningowy na 4 tygodnie",
        "Instrukcje wykonania ćwiczeń z opisami",
        "Plan żywieniowy dostosowany do celów",
        "Wsparcie mailowe",
        "Materiały edukacyjne",
      ],
      popular: false,
    },
    {
      name: "Plan Premium",
      price: "399 zł",
      duration: "8 tygodni",
      description: "Kompleksowe podejście dla osób chcących osiągnąć znaczące rezultaty",
      features: [
        "Spersonalizowany plan treningowy na 8 tygodni",
        "Szczegółowy plan żywieniowy z przepisami",
        "2 konsultacje video (60 min każda)",
        "Cotygodniowe modyfikacje planu",
        "Wsparcie przez komunikator",
        "Analiza składu ciała",
        "Materiały edukacyjne + suplementacja",
      ],
      popular: true,
    },
    {
      name: "Plan VIP",
      price: "699 zł",
      duration: "12 tygodni",
      description: "Najwyższy poziom wsparcia dla maksymalnych rezultatów",
      features: [
        "Spersonalizowany plan treningowy na 12 tygodni",
        "Indywidualny plan żywieniowy z przepisami",
        "4 konsultacje video (60 min każda)",
        "Cotygodniowe modyfikacje planów",
        "Codzienne wsparcie przez komunikator",
        "Analiza składu ciała co 2 tygodnie",
        "Materiały edukacyjne + plan suplementacji",
        "Dostęp do aplikacji mobilnej",
        "Gwarancja rezultatów",
      ],
      popular: false,
    },
  ]

  const features = [
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: "Indywidualne podejście",
      description: "Każdy plan jest tworzony specjalnie dla Ciebie",
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: "Stałe wsparcie",
      description: "Jestem z Tobą przez cały proces transformacji",
    },
    {
      icon: <Clock className="w-8 h-8 text-red-500" />,
      title: "Elastyczność",
      description: "Plany dostosowane do Twojego stylu życia",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-red-500">Plany treningowe</span> dopasowane do Ciebie
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Wybierz plan, który najlepiej odpowiada Twoim celom i możliwościom. Każdy z nich został stworzony z myślą
              o maksymalnych rezultatach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
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
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Wybierz swój plan</h2>
            <p className="text-lg md:text-xl text-gray-300">Inwestycja w siebie, która się opłaci</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className={`bg-gray-900 border-gray-800 h-full relative ${plan.popular ? "border-red-500" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Najpopularniejszy
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-xl md:text-2xl font-bold text-white">{plan.name}</CardTitle>
                    <div className="text-2xl md:text-4xl font-bold text-red-500 my-4">{plan.price}</div>
                    <div className="text-gray-400">{plan.duration}</div>
                    <p className="text-gray-300 mt-4">{plan.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-3 ${plan.popular ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"} transition-all duration-300 hover:scale-105`}
                    >
                      Wybierz plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}
