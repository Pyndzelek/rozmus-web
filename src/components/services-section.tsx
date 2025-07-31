"use client";

import { Target, Calendar, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-16">
          Odkryj swoją drogę do sukcesu
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="text-center group cursor-pointer"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
              Prowadzenie online
            </h3>
          </motion.div>

          <motion.div
            className="text-center group cursor-pointer"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
              Plany treningowe
            </h3>
          </motion.div>

          <motion.div
            className="text-center group cursor-pointer"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Utensils className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
              Plany dietetyczne
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
