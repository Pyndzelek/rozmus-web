"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Jak długo trwa plan treningowy?",
      answer:
        "Standardowy plan treningowy trwa 12 tygodni, ale można go dostosować do indywidualnych potrzeb. Oferuję również plany 6-tygodniowe dla początkujących oraz długoterminowe programy rozwoju.",
    },
    {
      question: "Czy potrzebuję doświadczenia w treningu siłowym?",
      answer:
        "Nie! Tworzę plany dla osób na każdym poziomie zaawansowania - od kompletnych początkujących po zaawansowanych sportowców. Każdy plan jest indywidualnie dostosowany.",
    },
    {
      question: "Jak wygląda prowadzenie online?",
      answer:
        "Prowadzenie online obejmuje spersonalizowany plan treningowy, plan żywieniowy, cotygodniowe konsultacje video, stały kontakt przez komunikator oraz regularne modyfikacje planów.",
    },
    {
      question: "Czy mogę trenować w domu?",
      answer:
        "Oczywiście! Tworzę plany treningowe zarówno na siłownię, jak i na trening domowy z minimalnym sprzętem. Wszystko zależy od Twoich preferencji i możliwości.",
    },
    {
      question: "Jak szybko zobaczę pierwsze efekty?",
      answer:
        "Pierwsze efekty widoczne są już po 2-3 tygodniach regularnego treningu. Znaczące zmiany sylwetki następują po 6-8 tygodniach, a spektakularne rezultaty po 3-6 miesiącach.",
    },
  ]

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Często zadawane pytania</h2>
          <p className="text-lg md:text-xl text-gray-300">Znajdź odpowiedzi na najczęstsze pytania</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-base md:text-lg">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-red-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-300 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
