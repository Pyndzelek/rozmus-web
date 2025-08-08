"use client";

import { useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  calculateCaloriesAction,
  type ActionState,
} from "@/lib/calculator-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  ChevronLeft,
  Calculator,
  Target,
  Mail,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Interface for form data state
interface CalculatorData {
  weight: number[];
  height: number[];
  age: number[];
  gender: string;
  goal: string;
  activityLevel: string;
  name: string;
  email: string;
}

// Initial state for the server action
const initialState: ActionState = {
  status: "",
  message: "",
  calories: 0,
};

export function CalorieCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorData>({
    weight: [70],
    height: [175],
    age: [25],
    gender: "",
    goal: "",
    activityLevel: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CalculatorData, string>>
  >({});

  // Hook for server action state
  const [state, formAction] = useFormState(
    calculateCaloriesAction,
    initialState
  );
  const [isPending, startTransition] = useTransition();

  const totalSteps = 3;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof CalculatorData, string>> = {};

    switch (step) {
      case 1:
        if (!formData.gender) newErrors.gender = "Wybierz płeć";
        break;
      case 2:
        if (!formData.goal) newErrors.goal = "Wybierz swój cel";
        if (!formData.activityLevel)
          newErrors.activityLevel = "Wybierz poziom aktywności";
        break;
      case 3:
        if (!formData.name.trim()) newErrors.name = "Imię jest wymagane";
        if (!formData.email.trim()) newErrors.email = "Email jest wymagany";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Nieprawidłowy format email";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // On the last step, we trigger the form submission
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          // Handle array values (like from sliders) correctly
          const finalValue = Array.isArray(value) ? value[0] : value;
          payload.append(key, String(finalValue));
        });
        startTransition(() => formAction(payload));
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (field: keyof CalculatorData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Calculator className="w-5 h-5" />;
      case 2:
        return <Target className="w-5 h-5" />;
      case 3:
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "DANE PODSTAWOWE";
      case 2:
        return "CEL I AKTYWNOŚĆ";
      case 3:
        return "DANE KONTAKTOWE";
      default:
        return "";
    }
  };

  if (state.status === "success") {
    return (
      <section className="bg-black text-white py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900 border-gray-800 p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
              <h2 className="text-3xl font-bold text-white mb-1">Gotowe!</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Twoje spersonalizowane zapotrzebowanie kaloryczne zostało
                obliczone.
              </p>
              <div className="bg-gray-800 rounded-lg p-6 my-4">
                <p className="text-gray-400 text-base">
                  Twoje dzienne zapotrzebowanie kaloryczne to:
                </p>
                <p className="text-4xl md:text-5xl font-bold text-[var(--brand-accent-strong)] mt-2">
                  {Math.round(state.calories ?? 0)} kcal
                </p>
              </div>
              <p className="text-gray-400 text-sm">
                Wysłałem Ci wiadomość e-mail ze wszystkimi szczegółami. Sprawdź
                swoją skrzynkę odbiorczą!
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  // Main Calculator View
  return (
    <section className="bg-black text-white md:py-20 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right-side text content is now first in the code for mobile */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Pragniesz zdrowej i silnej sylwetki?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Sprawdzona rozpiska kaloryczna to Twoja droga do widocznych
              rezultatów. Oblicz swoje zapotrzebowanie kaloryczne i otrzymaj
              spersonalizowane rekomendacje!
            </p>

            <div className="space-y-4">
              <div
                className={`flex items-center gap-3 transition-all duration-300 ${
                  currentStep >= 1 ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= 1
                      ? "bg-[var(--brand-accent-strong)] text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  1
                </div>
                <span>Podaj podstawowe dane</span>
              </div>
              <div
                className={`flex items-center gap-3 transition-all duration-300 ${
                  currentStep >= 2 ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= 2
                      ? "bg-[var(--brand-accent-strong)] text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  2
                </div>
                <span>Wybierz cel i poziom aktywności</span>
              </div>
              <div
                className={`flex items-center gap-3 transition-all duration-300 ${
                  currentStep >= 3 ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= 3
                      ? "bg-[var(--brand-accent-strong)] text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  3
                </div>
                <span>Otrzymaj spersonalizowany plan</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:order-first" // This class moves the form to the first column on large screens
          >
            <form>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-xl md:text-2xl">
                    Kalkulator kalorii
                  </CardTitle>
                  <div className="flex gap-4 mt-4">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                          step === currentStep
                            ? "bg-[var(--brand-accent-strong)] scale-110"
                            : step < currentStep
                            ? "bg-green-600"
                            : "bg-gray-700"
                        }`}
                      >
                        {step < currentStep ? "✓" : step}
                      </div>
                    ))}
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <motion.div
                      className="bg-[var(--brand-accent-strong)] h-2 rounded-full transition-all duration-500"
                      initial={{ width: "33%" }}
                      animate={{
                        width: `${(currentStep / totalSteps) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="text-[var(--brand-accent)] text-sm font-semibold mt-4 flex items-center gap-2">
                    {getStepIcon(currentStep)}
                    {getStepTitle(currentStep)}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* AnimatePresence and motion.div for steps remain the same */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {/* All steps (1, 2, 3) remain visually the same */}
                      {currentStep === 1 && (
                        <>
                          {/* Weight Slider */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Label className="text-white text-base md:text-lg">
                                Waga:
                              </Label>
                              <div className="text-xl md:text-2xl font-bold text-[var(--brand-accent)]">
                                {formData.weight[0]} kg
                              </div>
                            </div>
                            <Slider
                              value={formData.weight}
                              onValueChange={(value) =>
                                updateFormData("weight", value)
                              }
                              max={150}
                              min={40}
                              step={1}
                              className="w-full [&_[data-radix-slider-range]]:bg-[var(--brand-accent-strong)] [&_[data-radix-slider-thumb]]:bg-[var(--brand-accent-strong)] [&_[data-radix-slider-thumb]]:border-white"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>40 kg</span>
                              <span>150 kg</span>
                            </div>
                          </div>

                          {/* Height Slider */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Label className="text-white text-base md:text-lg">
                                Wzrost:
                              </Label>
                              <div className="text-xl md:text-2xl font-bold text-[var(--brand-accent)]">
                                {formData.height[0]} cm
                              </div>
                            </div>
                            <Slider
                              value={formData.height}
                              onValueChange={(value) =>
                                updateFormData("height", value)
                              }
                              max={220}
                              min={140}
                              step={1}
                              className="w-full [&_[data-radix-slider-range]]:bg-[var(--brand-accent-darker)] [&_[data-radix-slider-thumb]]:bg-[var(--brand-accent-strong)] [&_[data-radix-slider-thumb]]:border-white"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>140 cm</span>
                              <span>220 cm</span>
                            </div>
                          </div>

                          {/* Age Slider */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Label className="text-white text-base md:text-lg">
                                Wiek:
                              </Label>
                              <div className="text-xl md:text-2xl font-bold text-[var(--brand-accent)]">
                                {formData.age[0]} lat
                              </div>
                            </div>
                            <Slider
                              value={formData.age}
                              onValueChange={(value) =>
                                updateFormData("age", value)
                              }
                              max={80}
                              min={16}
                              step={1}
                              className="w-full [&_[data-radix-slider-range]]:bg-[var(--brand-accent-strong)] [&_[data-radix-slider-thumb]]:bg-[var(--brand-accent-strong)] [&_[data-radix-slider-thumb]]:border-white"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>16 lat</span>
                              <span>80 lat</span>
                            </div>
                          </div>

                          {/* Gender Select */}
                          <div className="space-y-4">
                            <Label className="text-white text-base md:text-lg">
                              Płeć:
                            </Label>
                            <Select
                              value={formData.gender}
                              onValueChange={(value) =>
                                updateFormData("gender", value)
                              }
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Wybierz płeć" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                <SelectItem value="male">Mężczyzna</SelectItem>
                                <SelectItem value="female">Kobieta</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.gender && (
                              <p className="text-red-500 text-sm -mt-3">
                                {errors.gender}
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div className="space-y-6">
                            <div>
                              <Label className="text-white text-base md:text-lg mb-4 block">
                                Jaki jest Twój cel?
                              </Label>
                              <RadioGroup
                                value={formData.goal}
                                onValueChange={(value) =>
                                  updateFormData("goal", value)
                                }
                                className="md:space-y-3"
                              >
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.goal === "lose"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="lose"
                                    id="lose"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.goal === "lose"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="lose"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Chudnięcie
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Redukcja masy ciała
                                    </div>
                                  </Label>
                                </div>

                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.goal === "maintain"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="maintain"
                                    id="maintain"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.goal === "maintain"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="maintain"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Utrzymanie wagi
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Stabilizacja obecnej masy
                                    </div>
                                  </Label>
                                </div>
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.goal === "gain"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="gain"
                                    id="gain"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.goal === "gain"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="gain"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Przybranie na wadze
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Budowa masy mięśniowej
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                              {errors.goal && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.goal}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="text-white text-base md:text-lg mb-4 block">
                                Poziom aktywności fizycznej
                              </Label>
                              <RadioGroup
                                value={formData.activityLevel}
                                onValueChange={(value) =>
                                  updateFormData("activityLevel", value)
                                }
                                className="md:space-y-3"
                              >
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.activityLevel === "sedentary"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="sedentary"
                                    id="sedentary"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.activityLevel === "sedentary"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="sedentary"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Siedzący tryb życia
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Brak lub bardzo mało ćwiczeń
                                    </div>
                                  </Label>
                                </div>
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.activityLevel === "light"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="light"
                                    id="light"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.activityLevel === "light"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="light"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Lekka aktywność
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Lekkie ćwiczenia 1-3 dni w tygodniu
                                    </div>
                                  </Label>
                                </div>
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.activityLevel === "moderate"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="moderate"
                                    id="moderate"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.activityLevel === "moderate"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="moderate"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Umiarkowana aktywność
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Ćwiczenia 3-5 dni w tygodniu
                                    </div>
                                  </Label>
                                </div>
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.activityLevel === "active"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="active"
                                    id="active"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.activityLevel === "active"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="active"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Wysoka aktywność
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Intensywne ćwiczenia 6-7 dni w tygodniu
                                    </div>
                                  </Label>
                                </div>
                                <div
                                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                                    formData.activityLevel === "very_active"
                                      ? "bg-[var(--brand-accent-darker)]/10 ring-2 ring-[var(--brand-accent-strong)]"
                                      : ""
                                  }`}
                                >
                                  <RadioGroupItem
                                    value="very_active"
                                    id="very_active"
                                    className={`border-gray-600 cursor-pointer ${
                                      formData.activityLevel === "very_active"
                                        ? "data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                        : ""
                                    }`}
                                  />
                                  <Label
                                    htmlFor="very_active"
                                    className="text-white cursor-pointer flex-1"
                                  >
                                    <div className="font-semibold">
                                      Bardzo wysoka aktywność
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      Intensywne ćwiczenia, praca fizyczna
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                              {errors.activityLevel && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.activityLevel}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {currentStep === 3 && (
                        <>
                          <div className="space-y-6">
                            <div className="text-center mb-6">
                              <h3 className="text-lg font-semibold text-white mb-2">
                                Ostatni krok!
                              </h3>
                              <p className="text-gray-400">
                                Podaj swoje dane, aby otrzymać spersonalizowaną
                                odpowiedź.
                              </p>
                            </div>

                            <div>
                              <Label
                                htmlFor="name"
                                className="text-white text-base md:text-lg"
                              >
                                Imię i nazwisko
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) =>
                                  updateFormData("name", e.target.value)
                                }
                                className="bg-gray-800 border-gray-700 text-white mt-2"
                                placeholder="Jan Kowalski"
                              />
                              {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.name}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label
                                htmlFor="email"
                                className="text-white text-base md:text-lg"
                              >
                                Adres email
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) =>
                                  updateFormData("email", e.target.value)
                                }
                                className="bg-gray-800 border-gray-700 text-white mt-2"
                                placeholder="jan@example.com"
                              />
                              {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.email}
                                </p>
                              )}
                            </div>

                            <div className="bg-gray-700 p-4 rounded-lg">
                              <p className="text-sm text-gray-300">
                                📧 Twój spersonalizowany plan kalorii zostanie
                                wysłany na podany adres email.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Server Action Error Message */}
                  {state.status === "error" && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg flex items-center gap-3">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm">{state.message}</p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                    <Button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1 || isPending}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800 bg-transparent disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Poprzedni
                    </Button>

                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={isPending}
                      className="cursor-pointer bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Obliczanie...
                        </>
                      ) : currentStep === totalSteps ? (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Oblicz kalorie
                        </>
                      ) : (
                        <>
                          Następny
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
