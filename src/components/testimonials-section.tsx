"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Klientka od 8 miesięcy",
      content:
        "Dzięki Miłoszowi schudłam 15kg i czuję się fantastycznie! Plan treningowy był idealnie dopasowany do moich możliwości.",
      rating: 5,
      image: "/przemiany/przemiana1.jpeg",
    },
    {
      name: "Piotr Nowak",
      role: "Klient od roku",
      content:
        "Profesjonalne podejście i motywacja na najwyższym poziomie. Osiągnąłem cele, o których marzyłem od lat!",
      rating: 5,
      image: "/przemiany/przemiana4.jpeg",
    },
    {
      name: "Magdalena Wiśniewska",
      role: "Klientka od 6 miesięcy",
      content:
        "Indywidualne podejście i stały kontakt sprawiły, że treningi stały się moją pasją, a nie obowiązkiem.",
      rating: 5,
      image: "/przemiany/przemiana3.jpeg",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
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
              <Card className="bg-black border-gray-800 h-full hover:border-red-500/50 transition-colors duration-300">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-red-500 mb-4" />
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
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
