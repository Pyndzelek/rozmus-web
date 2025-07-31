"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Anna Kowalska",
      age: 28,
      program: "Plan Premium - 8 tygodni",
      rating: 5,
      review: "Filip to chuj",
      results: "Schudła 12kg, zbudowała pewność siebie",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Piotr Nowak",
      age: 35,
      program: "Plan VIP - 12 tygodni",
      rating: 5,
      review: "chuj",
      results: "Zbudował 8kg masy mięśniowej, zmienił nawyki żywieniowe",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Magdalena Wiśniewska",
      age: 42,
      program: "Plan Premium - 8 tygodni",
      rating: 5,
      review: "chuj",
      results: "Poprawiła kondycję, zbudowała siłę, zwiększyła energię",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Jakub Kowalczyk",
      age: 24,
      program: "Plan Podstawowy - 4 tygodnie",
      rating: 5,
      review: "chuj",
      results: "Nauczył się podstaw, zbudował motywację do dalszego treningu",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Karolina Nowacka",
      age: 31,
      program: "Plan VIP - 12 tygodni",
      rating: 5,
      review: "chuj",
      results: "Całkowita transformacja stylu życia, -15kg, +100% energii",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Tomasz Wiśniewski",
      age: 29,
      program: "Plan Premium - 8 tygodni",
      rating: 5,
      review: "chuj",
      results:
        "Zoptymalizował czas, zbudował masę mięśniową, poprawił samopoczucie",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  const stats = [
    { number: "461+", label: "Zadowolonych klientów" },
    { number: "99%", label: "Skuteczność planów" },
    { number: "4.9/5", label: "Średnia ocena" },
    { number: "95%", label: "Poleca znajomym" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-red-500">Opinie</span> moich podopiecznych
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Prawdziwe historie, prawdziwe rezultaty. Zobacz, co mówią osoby,
              które zaufały mojemu doświadczeniu i osiągnęły swoje cele.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-2xl md:text-4xl font-bold text-red-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
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
              Co mówią moi klienci
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Każda opinia to historia prawdziwej transformacji
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-500/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-base md:text-lg">
                          {review.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {review.age} lat
                        </p>
                        <p className="text-red-500 text-sm">{review.program}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <Quote className="w-6 h-6 text-red-500 mb-3" />
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      &quote;{review.review}&quote;
                    </p>

                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-sm text-gray-400">
                        <strong className="text-red-500">Rezultaty:</strong>{" "}
                        {review.results}
                      </p>
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
