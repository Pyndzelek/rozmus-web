"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Mistrz Polski",
      description: "WRPF Powerlifting RAW j23 u75",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="md:pt-20 pt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Poznaj <span className="text-[var(--brand-accent)]">mnie</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Nazywam się Filip Rozmus, mam 21 lat i na co dzień pracuję jako
                trener personalny. Specjalizuję się w metamorfozach sylwetki
                oraz poprawie wyników siłowych. Zanim zacząłem pomagać innym,
                przeszedłem długą drogę, żeby poprawić swoją sylwetkę i wyniki.
                Popełniłem masę błędów, ale to właśnie one dały mi najwięcej
                doświadczenia. Teraz dzielę się wiedzą, którą zdobywałem przez
                lata.
              </p>
              <div className="space-y-4 text-gray-300">
                <p>✓ Certyfikowany instruktor</p>
                <p>✓ Certyfikowany trener personalny</p>
                <p>✓ Certyfikowany trener trójboju siłowego</p>
                <p>✓ Zawodnik trójboju siłowego</p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/rozmus_nlt.png"
                alt="Filip Rozmus - Trener Personalny"
                width={500}
                height={600}
                className="rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="md:py-20 py-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-black rounded-lg border border-gray-800"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
}
