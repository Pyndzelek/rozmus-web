"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ModernFooter() {
  return (
    <motion.footer
      className="bg-gray-900 text-white relative overflow-hidden"
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-accent-strong)]/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo_nlt.png"
                alt="Filip Rozmus - Trener Personalny"
                width={40}
                height={40}
              />
              <div>
                <div className="text-2xl font-bold">Filip</div>
                <div className="text-[var(--brand-accent)] font-semibold">
                  Rozmus
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com/rozmusik_"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[var(--brand-accent-strong)] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/filip.rozmus.5030?locale=pl_PL"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[var(--brand-accent-strong)] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Szybkie linki</h3>
            <ul className="space-y-3">
              {[
                { href: "/o-mnie", label: "O mnie" },
                { href: "/oferta", label: "Oferta" },
                { href: "/opinie", label: "Opinie" },
                { href: "/kontakt", label: "Kontakt" },
                { href: "/formularz", label: "Formularz" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[var(--brand-accent)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--brand-accent)]" />
                <span className="text-gray-300">rozmus.nlt@gmail.com</span>
              </div>
              <a
                href="tel:+48696969696"
                className="flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 text-red-500" />
                <span>+48 696 969 696</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--brand-accent)]" />
                <span className="text-gray-300">
                  Studio Gorce, Aleje Tysiąclecia 74, 34-400 Nowy Targ
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Filip Rozmus. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
