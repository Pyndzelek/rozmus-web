"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageCircle,
  Clock,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { submitContactForm } from "@/lib/contact-actions";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Krok 1: Dodajemy nowy stan do zarządzania widocznością formularza
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Imię i nazwisko jest wymagane.";
    if (!formData.email) newErrors.email = "Adres email jest wymagany.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Proszę podać prawidłowy adres email.";
    if (!formData.subject) newErrors.subject = "Temat jest wymagany.";
    if (formData.message.length < 10)
      newErrors.message = "Wiadomość musi mieć co najmniej 10 znaków.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setFormStatus(null);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      const result = await submitContactForm(formData);
      setIsSubmitting(false);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus({
          success: false,
          message: result.error || "Błąd wysyłki.",
        });
      }
    }
  };

  return (
    <section className="md:py-20 py-10" id="kontakt-form">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isSubmitted ? (
              // Widok po pomyślnym wysłaniu
              <Card className="bg-gray-900 border-gray-800 text-center p-8 flex flex-col items-center justify-center min-h-[500px]">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4 text-green-500">
                    Wiadomość wysłana!
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Dziękuję za kontakt. Odpowiem Ci najszybciej, jak to
                    możliwe.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white"
                  >
                    Wyślij kolejną wiadomość
                  </Button>
                </motion.div>
              </Card>
            ) : (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <Send className="w-6 h-6 text-[var(--brand-accent)]" />
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
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                        />
                        {errors.name && (
                          <p className="text-[var(--brand-accent-strong)] text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Telefon (opcjonalnie)
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white mt-2"
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white mt-2"
                      />
                      {errors.email && (
                        <p className="text-[var(--brand-accent-strong)] text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-white">
                        Temat
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white mt-2"
                      />
                      {errors.subject && (
                        <p className="text-[var(--brand-accent-strong)] text-sm mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-white">
                        Wiadomość
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white mt-2 resize-none"
                      />
                      {errors.message && (
                        <p className="text-[var(--brand-accent-strong)] text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white py-3 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                    </Button>
                    {formStatus && !formStatus.success && (
                      <div className="mt-4 text-center p-2 rounded-md bg-red-900/50 text-red-300">
                        {formStatus.message}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
          {/* Additional Info - reszta bez zmian */}
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
                  <MessageCircle className="w-6 h-6 text-[var(--brand-accent)] mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Darmowa konsultacja</h3>
                    <p className="text-gray-400">
                      Pierwsza rozmowa jest zawsze darmowa - omówimy Twoje cele
                      i możliwości
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[var(--brand-accent)] mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Szybka odpowiedź</h3>
                    <p className="text-gray-400">
                      Odpowiadam na wszystkie wiadomości jak najszybciej to
                      możliwe
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-[var(--brand-accent)] mt-1" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
