"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Karolina Żółta",
      role: "Podopieczna od roku",
      content:
        "Po treningu mieliśmy PIĘCIOSEKUNDOWE cardio. Troche lipa więc rezygnuje z dalszej współpracy.",
      rating: 1,
      image: "/przemiany/przemiana1.jpeg",
    },
    {
      name: "Anna Sranna",
      role: "Podopieczna od 8 miesięcy",
      content:
        "Zesrałam się ze śmiechu, ale też zbudowałam formę! Filip to prawdziwy pajac.",
      rating: 5,
      image: "/przemiany/przemiana3.jpeg",
    },
    {
      name: "Polaczek Księżycowy",
      role: "Podopieczna od 6 miesięcy",
      content: "W sieni siedzą i kupe sobie jedzą",
      rating: 5,
      image: "/przemiany/przemiana4.jpeg",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Co mówią moi podopieczni?
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Prawdziwe historie, prawdziwe rezultaty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-black border-gray-800 h-full hover:border-[var(--brand-accent)]/50 transition-colors duration-300">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-[var(--brand-accent)] mb-4" />
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-white/70">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
