"use client";

import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import SurveyForm from "@/components/forms/survey-form";

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SurveyForm />
        </div>
      </main>
      <ModernFooter />
    </div>
  );
}
