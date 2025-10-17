"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function AchievementsOmnie() {
  return (
    <section className="md:py-20 py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
          <motion.div
            key="master-achievement"
            className="text-center p-6 bg-gray-800 rounded-lg border border-gray-800"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <div className="flex justify-center mb-4">
              <Award className="w-8 h-8 text-[var(--brand-accent)]" />
            </div>

            <h3 className="text-lg md:text-xl font-bold mb-2">Mistrz Polski</h3>
            <p className="text-gray-400">WRPF Powerlifting RAW j23 u75</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
