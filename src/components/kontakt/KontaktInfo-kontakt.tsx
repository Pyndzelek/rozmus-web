"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function KontaktInfoKontakt() {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-[var(--brand-accent)]" />,
      title: "Email",
      content: "rozmus.nlt@gmail.com",
      description: "Najlepiej pisać na ten adres",
    },
    {
      icon: <Phone className="w-6 h-6 text-[var(--brand-accent)]" />,
      title: "Telefon",
      content: "+48 513978894",
      description: "Możesz dzwonić lub pisać SMS",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[var(--brand-accent)]" />,
      title: "Lokalizacja",
      content: "Studio Gorce, Aleje Tysiąclecia 74, 34-400 Nowy Targ",
      description: "Treningi online i stacjonarne",
    },
    {
      icon: <Clock className="w-6 h-6 text-[var(--brand-accent)]" />,
      title: "Godziny pracy",
      content: "Pon-Pt: 9:00-22:00",
      description: "Sob: 9:00-15:00",
    },
  ];
  return (
    <section className="md:py-20 py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-800 rounded-lg border border-gray-800"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{info.icon}</div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                {info.title}
              </h3>
              {info.title === "Telefon" ? (
                <a
                  href={`tel:${info.content}`}
                  className="text-base md:text-lg text-white mb-1"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-base md:text-lg text-white mb-1">
                  {info.content}
                </p>
              )}
              {info.description && (
                <p className="text-gray-400 text-sm">{info.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
