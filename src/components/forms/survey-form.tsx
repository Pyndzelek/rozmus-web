"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

import { surveyFormSchema, SurveyFormData } from "@/lib/schemas";
import { submitSurvey } from "@/lib/formularz-actions";

// Import UI components
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
import {
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";

const stepFields: (keyof SurveyFormData)[][] = [
  ["email", "name", "age", "height", "weight"],
  ["goals", "trainingDays"],
  ["activityLevel", "sittingTime"],
  ["sleepHours", "sleepQuality", "stressLevel"],
  ["nutrition"],
];

export default function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveyFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      age: undefined,
      height: undefined,
      weight: undefined,
      goals: [],
      trainingDays: [],
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
    },
  });

  const totalSteps = 5;

  const nextStep = async () => {
    const fieldsToValidate = stepFields[currentStep - 1];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const processForm: SubmitHandler<SurveyFormData> = async (data) => {
    setIsSubmitting(true);
    setServerError(null);

    const result = await submitSurvey(data);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setServerError(result.message || "Wystąpił nieznany błąd.");
    }
    setIsSubmitting(false);
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
          Dziękuję za wypełnienie formularza!
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-xl">
          Wkrótce się do Ciebie odezwę.
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
    <>
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
            <motion.div
              className="bg-[var(--brand-accent-strong)] h-2 rounded-full"
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(processForm)}>
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
                        Email *
                      </Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            className="bg-gray-800 border-gray-700 text-white mt-2"
                            placeholder="twoj@email.com"
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-white">
                        Imię i Nazwisko *
                      </Label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            className="bg-gray-800 border-gray-700 text-white mt-2"
                            placeholder="Jan Kowalski"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="age" className="text-white">
                          Wiek *
                        </Label>
                        <Controller
                          name="age"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="age"
                              type="number"
                              className="bg-gray-800 border-gray-700 text-white mt-2"
                              placeholder="25"
                              value={field.value ?? ""}
                            />
                          )}
                        />
                        {errors.age && (
                          <p className="text-[var(--brand-accent)] text-sm mt-1">
                            {errors.age.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="height" className="text-white">
                          Wzrost (cm) *
                        </Label>
                        <Controller
                          name="height"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="height"
                              type="number"
                              className="bg-gray-800 border-gray-700 text-white mt-2"
                              placeholder="175"
                              value={field.value ?? ""}
                            />
                          )}
                        />
                        {errors.height && (
                          <p className="text-[var(--brand-accent)] text-sm mt-1">
                            {errors.height.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="weight" className="text-white">
                          Waga (kg) *
                        </Label>
                        <Controller
                          name="weight"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="weight"
                              type="number"
                              className="bg-gray-800 border-gray-700 text-white mt-2"
                              placeholder="70"
                              value={field.value ?? ""}
                            />
                          )}
                        />
                        {errors.weight && (
                          <p className="text-[var(--brand-accent)] text-sm mt-1">
                            {errors.weight.message}
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
                      <Controller
                        name="goals"
                        control={control}
                        render={({ field }) => (
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
                                  id={`goal-${goal}`}
                                  checked={field.value?.includes(goal)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    return checked
                                      ? field.onChange([...current, goal])
                                      : field.onChange(
                                          current.filter((v) => v !== goal)
                                        );
                                  }}
                                  className="border-gray-600"
                                />
                                <Label
                                  htmlFor={`goal-${goal}`}
                                  className="ml-3 text-white font-normal cursor-pointer"
                                >
                                  {goal}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                      {errors.goals && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.goals.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-white mb-4 block">
                        Ile dni w tygodniu jesteś w stanie poświęcić na trening?
                        *
                      </Label>
                      <Controller
                        name="trainingDays"
                        control={control}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                              "2 dni",
                              "3 dni",
                              "4 dni",
                              "5 dni",
                              "6 dni",
                              "7 dni",
                            ].map((days) => (
                              <div key={days} className="flex items-center">
                                <Checkbox
                                  id={`days-${days}`}
                                  checked={field.value?.includes(days)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    return checked
                                      ? field.onChange([...current, days])
                                      : field.onChange(
                                          current.filter((v) => v !== days)
                                        );
                                  }}
                                  className="border-gray-600"
                                />
                                <Label
                                  htmlFor={`days-${days}`}
                                  className="ml-3 text-white font-normal cursor-pointer"
                                >
                                  {days}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                      {errors.trainingDays && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.trainingDays.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-white mb-4 block">
                        W jakie dni jest ci najłatwiej trenować?
                      </Label>
                      <Controller
                        name="preferredDays"
                        control={control}
                        render={({ field }) => (
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
                                  id={`day-${day}`}
                                  checked={field.value?.includes(day)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    return checked
                                      ? field.onChange([...current, day])
                                      : field.onChange(
                                          current.filter((v) => v !== day)
                                        );
                                  }}
                                  className="border-gray-600"
                                />
                                <Label
                                  htmlFor={`day-${day}`}
                                  className="ml-3 text-white font-normal cursor-pointer text-sm"
                                >
                                  {day}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-4 block">
                        Czy posiadasz priorytet na jakąś partię?
                      </Label>
                      <Controller
                        name="bodyPriorities"
                        control={control}
                        render={({ field }) => (
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
                                  id={`part-${part}`}
                                  checked={field.value?.includes(part)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    return checked
                                      ? field.onChange([...current, part])
                                      : field.onChange(
                                          current.filter((v) => v !== part)
                                        );
                                  }}
                                  className="border-gray-600"
                                />
                                <Label
                                  htmlFor={`part-${part}`}
                                  className="ml-3 text-white font-normal cursor-pointer text-sm"
                                >
                                  {part}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
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
                        Jak wygląda twoja dotychczasowa aktywność, styl życia
                        oraz praca? *
                      </Label>
                      <Controller
                        name="activityLevel"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="activityLevel"
                            className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[100px]"
                            placeholder="Opisz swój obecny poziom aktywności, rodzaj pracy, styl życia..."
                          />
                        )}
                      />
                      {errors.activityLevel && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.activityLevel.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-white mb-4 block">
                        Ile czasu w ciągu dnia spędzasz w pozycji siedzącej? *
                      </Label>
                      <Controller
                        name="sittingTime"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
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
                                  id={`time-${time}`}
                                  className="border-gray-600 data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                />
                                <Label
                                  htmlFor={`time-${time}`}
                                  className="ml-3 text-white font-normal cursor-pointer"
                                >
                                  {time}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.sittingTime && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.sittingTime.message}
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
                        <Controller
                          name="sleepHours"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
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
                          )}
                        />
                        {errors.sleepHours && (
                          <p className="text-[var(--brand-accent)] text-sm mt-1">
                            {errors.sleepHours.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-white mb-4 block">
                          Jakość snu *
                        </Label>
                        <Controller
                          name="sleepQuality"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
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
                          )}
                        />
                        {errors.sleepQuality && (
                          <p className="text-[var(--brand-accent)] text-sm mt-1">
                            {errors.sleepQuality.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-white mb-4 block">
                        Ilość stresu na co dzień? *
                      </Label>
                      <Controller
                        name="stressLevel"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
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
                                  id={`stress-${level}`}
                                  className="border-gray-600 data-[state=checked]:border-[var(--brand-accent-strong)] data-[state=checked]:bg-[var(--brand-accent-strong)]"
                                />
                                <Label
                                  htmlFor={`stress-${level}`}
                                  className="ml-3 text-white font-normal cursor-pointer"
                                >
                                  {level}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.stressLevel && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.stressLevel.message}
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
                        Sposób żywienia na co dzień? Spożywane używki,
                        narkotyki? *
                      </Label>
                      <Controller
                        name="nutrition"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="nutrition"
                            className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[100px]"
                            placeholder="Opisz swoje nawyki żywieniowe, używki, suplementy..."
                          />
                        )}
                      />
                      {errors.nutrition && (
                        <p className="text-[var(--brand-accent)] text-sm mt-1">
                          {errors.nutrition.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="injuries" className="text-white">
                        Przebyte kontuzje, problemy z aparatem ruchu?
                      </Label>
                      <Controller
                        name="injuries"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="injuries"
                            className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[80px]"
                            placeholder="Opisz ewentualne kontuzje, problemy z kręgosłupem, stawami..."
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardiovascular" className="text-white">
                        Czy masz problemy z układem sercowo-naczyniowym?
                      </Label>
                      <Controller
                        name="cardiovascular"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="cardiovascular"
                            className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[80px]"
                            placeholder="Arytmia serca, niskie ciśnienie, wysokie ciśnienie, niewydolność serca..."
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medications" className="text-white">
                        Jakie lekarstwa/suplementy zażywasz na co dzień?
                      </Label>
                      <Controller
                        name="medications"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="medications"
                            className="bg-gray-800 border-gray-700 text-white mt-2 min-h-[80px]"
                            placeholder="Wymień wszystkie regularnie przyjmowane leki i suplementy..."
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {serverError && (
              <div className="text-center font-semibold text-red-500 mt-4">
                {serverError}
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
              {/* Przyciski nawigacyjne - bez zmian */}
              <Button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Poprzedni</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white"
                >
                  Następny
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Wyślij formularz
                </Button>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </>
  );
}
