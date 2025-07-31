"use client";

import type React from "react";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-red-500" />,
      title: "Email",
      content: "filipzabijaka.pl",
      description: "Odpowiadam w ciągu 24 godzin",
    },
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "Telefon",
      content: "+48 6969696969",
      description: "Pon-Pt: 9:00-18:00",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      title: "Lokalizacja",
      content: "Zacisze, Polska",
      description: "Treningi online i stacjonarne",
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: "Godziny pracy",
      content: "Pon-Pt: 9:00-18:00",
      description: "Sob: 10:00-14:00",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-red-500">Skontaktuj się</span> ze mną
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Masz pytania? Chcesz rozpocząć swoją transformację? Napisz do mnie
              - odpowiem na wszystkie Twoje wątpliwości.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-black rounded-lg border border-gray-800"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {info.title}
                </h3>
                <p className="text-base md:text-lg text-white mb-1">
                  {info.content}
                </p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <Send className="w-6 h-6 text-red-500" />
                    Wyślij wiadomość
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          Imię i nazwisko
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Telefon
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="bg-gray-800 border-gray-700 text-white mt-2"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-white">
                        Temat
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        className="bg-gray-800 border-gray-700 text-white mt-2"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">
                        Wiadomość
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="bg-gray-800 border-gray-700 text-white mt-2 resize-none"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Wyślij wiadomość
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-6">
                  Dlaczego warto się skontaktować?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">
                        Bezpłatna konsultacja
                      </h3>
                      <p className="text-gray-400">
                        Pierwsza rozmowa jest zawsze darmowa - omówimy Twoje
                        cele i możliwości
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Szybka odpowiedź</h3>
                      <p className="text-gray-400">
                        Odpowiadam na wszystkie wiadomości w ciągu 24 godzin
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">
                        Indywidualne podejście
                      </h3>
                      <p className="text-gray-400">
                        Każda rozmowa jest dostosowana do Twoich potrzeb i celów
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg md:text-xl font-bold mb-4">
                  Często zadawane pytania
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong className="text-red-500">Q:</strong> Czy oferujesz
                    treningi stacjonarne?
                  </p>
                  <p className="text-gray-400 mb-4">
                    <strong>A:</strong> Tak, prowadzę treningi zarówno online
                    jak i stacjonarne w Warszawie.
                  </p>

                  <p>
                    <strong className="text-red-500">Q:</strong> Ile kosztuje
                    konsultacja?
                  </p>
                  <p className="text-gray-400 mb-4">
                    <strong>A:</strong> Pierwsza konsultacja jest bezpłatna,
                    kolejne ustalamy indywidualnie.
                  </p>

                  <p>
                    <strong className="text-red-500">Q:</strong> Jak długo trwa
                    plan treningowy?
                  </p>
                  <p className="text-gray-400">
                    <strong>A:</strong> Oferuję plany od 4 do 12 tygodni, w
                    zależności od Twoich celów.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
}
