import type React from "react";
import NewContactForm from "@/components/forms/contact-form-v2";
import KontaktInfoKontakt from "@/components/kontakt/KontaktInfo-kontakt";
import HeroKontakt from "@/components/kontakt/Hero-kontakt";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt - Trener Personalny Filip Rozmus | Nowy Targ",
  description:
    "Skontaktuj się, aby umówić bezpłatną konsultację. Znajdziesz tu telefon, e-mail, adres oraz formularz kontaktowy. Zacznijmy współpracę!",
  openGraph: {
    title: "Skontaktuj się ze Mną | Filip Rozmus",
    description:
      "Zrób pierwszy krok do lepszej formy. Czekam na Twoją wiadomość.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroKontakt />

      {/* Contact Info Section */}
      <KontaktInfoKontakt />

      {/* Contact Form Section */}
      <NewContactForm />
    </div>
  );
}
