"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export function AnimatedFeature({
  icon,
  title,
  description,
  delay,
}: AnimatedFeatureProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-zinc-800 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-lg md:text-2xl font-bold mb-3">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
