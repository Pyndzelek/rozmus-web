"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { ModernFooter } from "@/components/modern-footer";
import SurveyForm from "@/components/forms/survey-form";

// We create a new component to safely use the hook
function FormularzContent() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan");

  return (
    <main className="bg-black md:py-20 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <SurveyForm selectedPlan={selectedPlan} />
      </div>
    </main>
  );
}

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Wrap the component in Suspense */}
      <Suspense fallback={<div>Ładowanie...</div>}>
        <FormularzContent />
      </Suspense>
      <ModernFooter />
    </div>
  );
}
