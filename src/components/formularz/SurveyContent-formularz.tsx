"use client";

import { useSearchParams } from "next/navigation";

import SurveyForm from "@/components/forms/survey-form";

// Osobny komponent, żeby bezpiecznie użyć useSearchParams (wymaga Suspense)
export default function SurveyContentFormularz() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan");

  return (
    <div className="bg-black md:py-20 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <SurveyForm selectedPlan={selectedPlan} />
      </div>
    </div>
  );
}
