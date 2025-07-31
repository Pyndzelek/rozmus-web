"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function WhyTrustSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-8">
              Dlaczego warto mi zaufać?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Jestem doświadczonym trenerem personalnym z solidnym
              wykształceniem w dziedzinie programowania treningowego. Moje
              wieloletnie doświadczenie pozwoliło mi na zdobycie szerokiej
              wiedzy i umiejętności, które mogę wykorzystać, aby pomóc Ci w
              osiągnięciu Twoich celów treningowych.
            </p>
          </div>

          <motion.div
            className="relative"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/rozmus_jezioro.jpeg"
              alt="Personal trainer"
              width={500}
              height={600}
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
