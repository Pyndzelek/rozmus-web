"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroOpinie() {
  return (
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
  );
}
