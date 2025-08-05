"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  email: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  goals: string[];
  trainingDays: string[]; // FIX: Changed from string to string[]
  preferredDays: string[];
  activityLevel: string;
  sittingTime: string;
  sleepHours: string;
  sleepQuality: string;
  bodyPriorities: string[];
  stressLevel: string;
  nutrition: string;
  injuries: string;
  cardiovascular: string;
  medications: string;
}

export function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    age: "",
    height: "",
    weight: "",
    goals: [],
    trainingDays: [], // FIX: Changed from "" to []
    preferredDays: [],
    activityLevel: "",
    sittingTime: "",
    sleepHours: "",
    sleepQuality: "",
    bodyPriorities: [],
    stressLevel: "",
    nutrition: "",
    injuries: "",
    cardiovascular: "",
    medications: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 5;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    const {
      email,
      name,
      age,
      height,
      weight,
      goals,
      trainingDays,
      activityLevel,
      sittingTime,
      sleepHours,
      sleepQuality,
      stressLevel,
      nutrition,
    } = formData;

    switch (step) {
      case 1:
        if (!email) newErrors.email = "Email jest wymagany";
        else if (!/\S+@\S+\.\S+/.test(email))
          newErrors.email = "Nieprawidłowy format email";

        if (!name) newErrors.name = "Imię i nazwisko jest wymagane";

        if (!age) newErrors.age = "Wiek jest wymagany";
        else if (!/^\d+$/.test(age))
          newErrors.age = "Wprowadź prawidłowy wiek.";
        else if (Number.parseInt(age) < 16 || Number.parseInt(age) > 80)
          newErrors.age = "Wiek musi być między 16 a 80 lat";

        if (!height) newErrors.height = "Wzrost jest wymagany";
        else if (!/^\d+$/.test(height))
          newErrors.height = "Wprowadź prawidłowy wzrost w cm.";
        else if (Number.parseInt(height) < 140 || Number.parseInt(height) > 220)
          newErrors.height = "Wzrost musi być między 140 a 220 cm";

        if (!weight) newErrors.weight = "Waga jest wymagana";
        else if (!/^\d+$/.test(weight))
          newErrors.weight = "Wprowadź prawidłową wagę w kg.";
        else if (Number.parseInt(weight) < 40 || Number.parseInt(weight) > 150)
          newErrors.weight = "Waga musi być między 40 a 150 kg";
        break;
      case 2:
        if (goals.length === 0)
          newErrors.goals = ["Wybierz przynajmniej jeden cel treningowy"];
        // FIX: Changed validation from !trainingDays to length check
        if (trainingDays.length === 0)
          newErrors.trainingDays = ["Wybierz przynajmniej jedną opcję"];
        break;
      case 3:
        if (!activityLevel)
          newErrors.activityLevel = "Opisz swój poziom aktywności";
        if (!sittingTime)
          newErrors.sittingTime = "Podaj czas spędzany w pozycji siedzącej";
        break;
      case 4:
        if (!sleepHours) newErrors.sleepHours = "Podaj liczbę godzin snu";
        if (!sleepQuality) newErrors.sleepQuality = "Oceń jakość snu";
        if (!stressLevel) newErrors.stressLevel = "Oceń poziom stresu";
        break;
      case 5:
        if (!nutrition) newErrors.nutrition = "Opisz swoje nawyki żywieniowe";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    }
  };

  // FIX: Replaced `any` with a specific type to fix the TypeScript error
  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (
    field: keyof FormData,
    value: string,
    checked: boolean
  ) => {
    const currentArray = formData[field] as string[];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    updateFormData(field, newArray);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center p-4 py-20"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Dziękujemy za wypełnienie formularza!
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-xl">
          Twój spersonalizowany plan treningowy zostanie wysłany na podany adres
          email w ciągu 24-48 godzin.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white px-8 py-3"
        >
          Powrót do strony głównej
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <CardTitle className="text-white text-xl md:text-2xl mb-2 sm:mb-0">
            Formularz konsultacyjny
          </CardTitle>
          <div className="text-sm text-gray-400">
            Krok {currentStep} z {totalSteps}
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-[var(--brand-accent-strong)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[var(--brand-accent)] mb-6">
                  Dane podstawowe
                </h3>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email, na który będę mógł wysłać plan *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="twoj@email.com"
                  />
                  {errors.email && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="name" className="text-white">
                    Imię i Nazwisko *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="Jan Kowalski"
                  />
                  {errors.name && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-white">
                      Wiek *
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => updateFormData("age", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      placeholder="25"
                      min="16"
                      max="80"
                    />
                    {errors.age && (
                      <p className="text-[var(--brand-accent)] text-sm mt-1">
                        {errors.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-white">
                      Wzrost (cm) *
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateFormData("height", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      placeholder="175"
                      min="140"
                      max="220"
                    />
                    {errors.height && (
                      <p className="text-[var(--brand-accent)] text-sm mt-1">
                        {errors.height}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-white">
                      Waga (kg) *
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      placeholder="70"
                      min="40"
                      max="150"
                    />
                    {errors.weight && (
                      <p className="text-[var(--brand-accent)] text-sm mt-1">
                        {errors.weight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-[var(--brand-accent)] mb-2">
                  Cele treningowe
                </h3>
                <div>
                  <Label className="text-white mb-4 block">
                    Cel treningowy (wielokrotny wybór) *
                  </Label>
                  <div className="space-y-3">
                    {[
                      "Budowa masy mięśniowej",
                      "Zwiększenie siły",
                      "Utrata wagi",
                      "Poprawa wydolności",
                      "Poprawa samopoczucia",
                      "Inne",
                    ].map((goal) => (
                      <div key={goal} className="flex items-center">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "goals",
                              goal,
                              checked as boolean
                            )
                          }
                          className="border-gray-600"
                        />
                        <Label
                          htmlFor={goal}
                          className="ml-3 text-white font-normal cursor-pointer"
                        >
                          {goal}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.goals && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.goals[0]}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-white mb-4 block">
                    Ile dni w tygodniu jesteś w stanie poświęcić na trening? *
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {["2 dni", "3 dni", "4 dni", "5 dni", "6 dni", "7 dni"].map(
                      (days) => (
                        <div key={days} className="flex items-center">
                          <Checkbox
                            id={days}
                            checked={formData.trainingDays.includes(days)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                "trainingDays",
                                days,
                                checked as boolean
                              )
                            }
                            className="border-gray-600"
                          />
                          <Label
                            htmlFor={days}
                            className="ml-3 text-white font-normal cursor-pointer"
                          >
                            {days}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                  {errors.trainingDays && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.trainingDays}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-white mb-4 block">
                    W jakie dni jest ci najłatwiej trenować?
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                      "Poniedziałek",
                      "Wtorek",
                      "Środa",
                      "Czwartek",
                      "Piątek",
                      "Sobota",
                      "Niedziela",
                    ].map((day) => (
                      <div key={day} className="flex items-center">
                        <Checkbox
                          id={day}
                          checked={formData.preferredDays.includes(day)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "preferredDays",
                              day,
                              checked as boolean
                            )
                          }
                          className="border-gray-600"
                        />
                        <Label
                          htmlFor={day}
                          className="ml-3 text-white font-normal cursor-pointer text-sm"
                        >
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-white mb-4 block">
                    Czy posiadasz priorytet na jakąś partię?
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                      "Klatka piersiowa",
                      "Barki",
                      "Plecy",
                      "Ramiona",
                      "Pośladki",
                      "Nogi",
                      "Całe ciało",
                      "Brak priorytetu",
                    ].map((part) => (
                      <div key={part} className="flex items-center">
                        <Checkbox
                          id={part}
                          checked={formData.bodyPriorities.includes(part)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "bodyPriorities",
                              part,
                              checked as boolean
                            )
                          }
                          className="border-gray-600"
                        />
                        <Label
                          htmlFor={part}
                          className="ml-3 text-white font-normal cursor-pointer text-sm"
                        >
                          {part}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-[var(--brand-accent)] mb-2">
                  Poziom aktywności
                </h3>
                <div>
                  <Label htmlFor="activityLevel" className="text-white">
                    Jak wygląda twoja dotychczasowa aktywność, styl życia oraz
                    praca? *
                  </Label>
                  <Textarea
                    id="activityLevel"
                    value={formData.activityLevel}
                    onChange={(e) =>
                      updateFormData("activityLevel", e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[100px]"
                    placeholder="Opisz swój obecny poziom aktywności, rodzaj pracy, styl życia..."
                  />
                  {errors.activityLevel && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.activityLevel}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-white mb-4 block">
                    Ile czasu w ciągu dnia spędzasz w pozycji siedzącej? *
                  </Label>
                  <RadioGroup
                    value={formData.sittingTime}
                    onValueChange={(value) =>
                      updateFormData("sittingTime", value)
                    }
                    className="space-y-2"
                  >
                    {[
                      "Mniej niż 2 godziny",
                      "2-4 godziny",
                      "4-6 godzin",
                      "6-8 godzin",
                      "Więcej niż 8 godzin",
                    ].map((time) => (
                      <div key={time} className="flex items-center">
                        <RadioGroupItem
                          value={time}
                          id={time}
                          className="border-gray-600 data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                        />
                        <Label
                          htmlFor={time}
                          className="ml-3 text-white font-normal cursor-pointer"
                        >
                          {time}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.sittingTime && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.sittingTime}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-[var(--brand-accent)] mb-2">
                  Sen i stres
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-4 block">
                      Ilość snu (godziny) *
                    </Label>
                    <Select
                      value={formData.sleepHours}
                      onValueChange={(value) =>
                        updateFormData("sleepHours", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Wybierz liczbę godzin" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {[
                          "Mniej niż 5h",
                          "5-6h",
                          "6-7h",
                          "7-8h",
                          "8-9h",
                          "Więcej niż 9h",
                        ].map((hours) => (
                          <SelectItem key={hours} value={hours}>
                            {hours}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sleepHours && (
                      <p className="text-[var(--brand-accent)] text-sm mt-1">
                        {errors.sleepHours}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white mb-4 block">
                      Jakość snu *
                    </Label>
                    <Select
                      value={formData.sleepQuality}
                      onValueChange={(value) =>
                        updateFormData("sleepQuality", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Oceń jakość snu" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {[
                          "Bardzo dobra",
                          "Dobra",
                          "Średnia",
                          "Słaba",
                          "Bardzo słaba",
                        ].map((quality) => (
                          <SelectItem key={quality} value={quality}>
                            {quality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sleepQuality && (
                      <p className="text-[var(--brand-accent)] text-sm mt-1">
                        {errors.sleepQuality}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-4 block">
                    Ilość stresu na co dzień? *
                  </Label>
                  <RadioGroup
                    value={formData.stressLevel}
                    onValueChange={
                      (value) => updateFormData("stressLevel", value as string) // Casting here for type safety
                    }
                    className="space-y-2"
                  >
                    {[
                      "Nie stresuję się niczym",
                      "Lekki przewlekły stres związany z życiem codziennym",
                      "Średnia/duża ilość stresu",
                      "Bardzo duża ilość stresu",
                      "Często przyśpieszone tętno, brak apetytu itp.",
                    ].map((level) => (
                      <div key={level} className="flex items-center">
                        <RadioGroupItem
                          value={level}
                          id={level}
                          className="border-gray-600 data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                        />
                        <Label
                          htmlFor={level}
                          className="ml-3 text-white font-normal cursor-pointer"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.stressLevel && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.stressLevel}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[var(--brand-accent)] mb-6">
                  Zdrowie i żywienie
                </h3>
                <div>
                  <Label htmlFor="nutrition" className="text-white">
                    Sposób żywienia na co dzień? Spożywane używki, narkotyki? *
                  </Label>
                  <Textarea
                    id="nutrition"
                    value={formData.nutrition}
                    onChange={(e) =>
                      updateFormData("nutrition", e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[100px]"
                    placeholder="Opisz swoje nawyki żywieniowe, używki, suplementy..."
                  />
                  {errors.nutrition && (
                    <p className="text-[var(--brand-accent)] text-sm mt-1">
                      {errors.nutrition}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="injuries" className="text-white">
                    Przebyte kontuzje, problemy z aparatem ruchu?
                  </Label>
                  <Textarea
                    id="injuries"
                    value={formData.injuries}
                    onChange={(e) => updateFormData("injuries", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[80px]"
                    placeholder="Opisz ewentualne kontuzje, problemy z kręgosłupem, stawami..."
                  />
                </div>
                <div>
                  <Label htmlFor="cardiovascular" className="text-white">
                    Czy masz problemy z układem sercowo-naczyniowym?
                  </Label>
                  <Textarea
                    id="cardiovascular"
                    value={formData.cardiovascular}
                    onChange={(e) =>
                      updateFormData("cardiovascular", e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[80px]"
                    placeholder="Arytmia serca, niskie ciśnienie, wysokie ciśnienie, niewydolność serca..."
                  />
                </div>
                <div>
                  <Label htmlFor="medications" className="text-white">
                    Jakie lekarstwa/suplementy zażywasz na co dzień?
                  </Label>
                  <Textarea
                    id="medications"
                    value={formData.medications}
                    onChange={(e) =>
                      updateFormData("medications", e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[80px]"
                    placeholder="Wymień wszystkie regularnie przyjmowane leki i suplementy..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Poprzedni</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white"
            >
              Następny
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Wyślij formularz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
