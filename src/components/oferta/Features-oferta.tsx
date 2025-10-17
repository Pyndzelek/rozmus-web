"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Target, Users } from "lucide-react";

export default function FeaturesOferta() {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Indywidualne podejście",
      description: "Każdy plan jest tworzony specjalnie dla Ciebie",
    },
    {
      icon: <Users className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Stałe wsparcie",
      description: "Jestem z Tobą przez cały proces transformacji",
    },
    {
      icon: <Clock className="w-8 h-8 text-[var(--brand-accent)]" />,
      title: "Elastyczność",
      description: "Plany dostosowane do Twojego stylu życia",
    },
  ];

  return (
    <section className="py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center px-6 md:py-6 py-2"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex justify-center md:mb-4 mb-2">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
