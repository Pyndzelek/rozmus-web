"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export function HeroSection() {
  const [count, setCount] = useState(0);
  const [percentCount, setPercentCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate 107+ counter
      const duration = 2000;
      const increment = 107 / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= 107) {
          setCount(107);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      // Animate 100% counter
      const percentIncrement = 100 / (duration / 16);
      let percentCurrent = 0;

      const percentCounter = setInterval(() => {
        percentCurrent += percentIncrement;
        if (percentCurrent >= 100) {
          setPercentCount(100);
          clearInterval(percentCounter);
        } else {
          setPercentCount(Math.floor(percentCurrent));
        }
      }, 16);

      return () => {
        clearInterval(counter);
        clearInterval(percentCounter);
      };
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-black text-white pt-10 pb-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center min-h-[80vh]">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Czekaj! Już{" "}
              <span className="text-[var(--brand-accent)]">zakładam buty</span>{" "}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Jestem jebaną kurwą nieszanującą nikogo, ale jeśli mi zapłacisz to
              bede udawał najmądrzejszego trenera na świecie.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href="/plany-treningowe">
                <Button className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white px-8 py-3 text-lg hover:scale-105 transition-transform cursor-pointer">
                  Zaczynam przemianę <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex gap-12 mt-16 justify-center lg:justify-start">
              <div>
                <motion.div
                  className="text-2xl md:text-4xl font-bold"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {count}+
                </motion.div>
                <div className="text-gray-400">przemian podopiecznych</div>
              </div>
              <div>
                <motion.div
                  className="text-2xl md:text-4xl font-bold"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {percentCount}%
                </motion.div>
                <div className="text-gray-400">skuteczności i satysfakcji</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-12"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-12"></div>
            <Image
              src="/rozmus_nlt.png"
              alt="To jestem ja"
              width={400}
              height={600}
              className="z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
