import { z } from "zod";

// SURVEY FORM SCHEMA
export const surveyFormSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy format email." }),
  name: z.string().min(1, { message: "Imię i nazwisko jest wymagane." }),
  age: z.coerce
    .number({ message: "Wprowadź prawidłowy wiek." })
    .min(16, { message: "Wiek musi być między 16 a 80 lat." })
    .max(80, { message: "Wiek musi być między 16 a 80 lat." }),
  height: z.coerce
    .number({ message: "Wprowadź prawidłowy wzrost w cm." })
    .min(140, { message: "Wzrost musi być między 140 a 220 cm." })
    .max(220, { message: "Wzrost musi być między 140 a 220 cm." }),
  weight: z.coerce
    .number({ message: "Wprowadź prawidłową wagę w kg." })
    .min(40, { message: "Waga musi być między 40 a 150 kg." })
    .max(150, { message: "Waga musi być między 40 a 150 kg." }),
  goals: z
    .array(z.string())
    .min(1, { message: "Wybierz przynajmniej jeden cel." }),
  trainingDays: z
    .array(z.string())
    .min(1, { message: "Wybierz przynajmniej jedną opcję." }),
  preferredDays: z.array(z.string()).optional(),
  bodyPriorities: z.array(z.string()).optional(),
  activityLevel: z
    .string()
    .min(1, { message: "Opisz swój poziom aktywności." }),
  sittingTime: z
    .string()
    .min(1, { message: "Podaj czas spędzany w pozycji siedzącej." }),
  sleepHours: z.string().min(1, { message: "Podaj liczbę godzin snu." }),
  sleepQuality: z.string().min(1, { message: "Oceń jakość snu." }),
  stressLevel: z.string().min(1, { message: "Oceń poziom stresu." }),
  nutrition: z.string().min(1, { message: "Opisz swoje nawyki żywieniowe." }),
  injuries: z.string().optional(),
  cardiovascular: z.string().optional(),
  medications: z.string().optional(),
  selectedPlan: z.string().optional(),
});

export type SurveyFormData = z.infer<typeof surveyFormSchema>;

//  CONTACT FORM SCHEMA
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Imię i nazwisko jest wymagane." }),

  email: z
    .string()
    .min(1, { message: "Email jest wymagany." })
    .email({ message: "Proszę podać prawidłowy adres email." }),

  phone: z.string().optional(),

  subject: z.string().min(2, { message: "Temat jest wymagany." }),

  message: z
    .string()
    .min(10, { message: "Wiadomość musi mieć co najmniej 10 znaków." }),
});

export type TContactFormSchema = z.infer<typeof contactFormSchema>;
