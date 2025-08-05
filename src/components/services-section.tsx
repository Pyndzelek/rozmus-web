"use client";

import { Target, Calendar, Home } from "lucide-react";
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <section className="bg-black text-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          Twoja droga, twój sukces
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="text-center group "
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.div className="w-16 h-16 bg-[var(--brand-accent-strong)] rounded-lg flex items-center justify-center mx-auto mb-3  transition-colors">
              <Target className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 transition-colors">
              Prowadzenie online
            </h3>
          </motion.div>

          <motion.div
            className="text-center group"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div className="w-16 h-16 bg-[var(--brand-accent-strong)] rounded-lg flex items-center justify-center mx-auto mb-3  transition-colors">
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 transition-colors">
              Plany treningowe
            </h3>
          </motion.div>
          <motion.div
            className="text-center group"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div className="w-16 h-16 bg-[var(--brand-accent-strong)] rounded-lg flex items-center justify-center mx-auto mb-3  transition-colors">
              <Home className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 transition-colors">
              Prowadzenie stacjonarne
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
