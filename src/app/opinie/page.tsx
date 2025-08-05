"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function ReviewsPage() {
  const reviewImages = [
    "/opinie/opinia1.jpg",
    "/opinie/opinia2.jpg",
    "/opinie/opinia3.jpg",
    "/opinie/opinia4.jpg",
    "/opinie/opinia5.jpg",
    "/opinie/opinia6.jpg",
    "/opinie/opinia7.jpg",
    "/opinie/opinia8.jpg",
    "/opinie/opinia9.jpg",
    "/opinie/opinia10.jpg",
    "/opinie/opinia11.jpg",
    "/opinie/opinia12.jpg",
    "/opinie/opinia13.jpg",
    "/opinie/opinia14.jpg",
    "/opinie/opinia15.jpg",
    "/opinie/opinia16.jpg",
  ];

  const stats = [
    { number: "107+", label: "Zadowolonych klientów" },
    { number: "100%", label: "Skuteczność planów" },
    { number: "5/5", label: "Średnia ocena" },
    { number: "100%", label: "Poleca znajomym" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="md:pt-20 md:pb-10 py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[var(--brand-accent)]">Opinie</span> moich
              podopiecznych
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Prawdziwe historie, prawdziwe rezultaty. Zobacz, co mówią osoby,
              które zaufały mojemu doświadczeniu i osiągnęły swoje cele.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Masonry Grid Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {reviewImages.map((image, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid mb-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="bg-white rounded-2xl p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Opinia klienta ${index + 1}`}
                    width={300}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    style={{ aspectRatio: "auto" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
}
