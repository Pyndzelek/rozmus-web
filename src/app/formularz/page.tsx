"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import { SurveyForm } from "@/components/survey-form";

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[var(--brand-accent)]">Formularz</span>{" "}
              konsultacyjny
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Wypełnij formularz, aby otrzymać spersonalizowany plan treningowy
              dopasowany do Twoich potrzeb i celów.
            </p>
          </div>
          <SurveyForm />
        </div>
      </main>
      <ModernFooter />
    </div>
  );
}
