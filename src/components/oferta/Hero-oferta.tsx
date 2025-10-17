"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroOferta() {
  return (
    <section className="md:py-25 py-10">
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
            Znajdziesz tutaj pakiety na treningi personalne, indywidualne online
            lub w Nowym Targu oraz konsultacje. Sprawdź cennik i wybierz
            rozwiązanie, które pomoże Ci osiągnąć wymarzoną formę.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
