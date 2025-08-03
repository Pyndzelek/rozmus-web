"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function WhyTrustSection() {
  return (
    <section className="bg-black text-white py-5 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Dlaczego warto mi zaufać?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Moja przygoda z siłownią zaczęła się dawno temu, chciałem zbudować
              masę mięśniową i nabrać siły, której ewidentnie brakowało mi
              grając wtedy w piłkę nożną. Szybko pokochałem trening siłowy co
              sprawiło że zacząłem się tym interesować, a zdobywana wiedza
              szybko przełożyła się na wyniki siłowe oraz zmianę sylwetki.
              Obecnie pracuję jako trener personalny. Zebrane doświadczenie
              sprawiło że pomogę Ci bez względu na wiek, płeć oraz przebyte
              kontuzje. Pomagam ludziom osiągać swoje cele. Będę Cię motywować
              na każdym etapie twojej drogi do sukcesu.
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
              src="/rozmus_zaufanie.jpg"
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
