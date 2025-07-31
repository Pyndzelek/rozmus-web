"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      title: "Certyfikowany Kutas",
      description:
        "Kiedys pozyczyłem telefon od kolegi, rozjebałem go i mu go nie oddałem",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Poznaj <span className="text-red-500">mnie</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Jestem certyfikowanym zjebem
              </p>
              <div className="space-y-4 text-gray-300">
                <p>✓ Brak wykształcenia</p>
                <p>✓ ujebałem anatomie na podhalance choć mieliśmy baze</p>
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
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Moje osiągnięcia
            </h2>
            <p className="text-xl text-gray-300">
              Liczby, które mówią same za siebie
            </p>
          </motion.div>

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

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-8">
              Moja filozofia treningu
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Biało białko białko
            </p>
            <p className="text-base md:text-lg text-gray-400">
              &quote;Granulocyty&quote;
            </p>
          </motion.div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
}
