"use server";

import { Resend } from "resend";
import { z } from "zod";
import { UserWelcomeEmail } from "@/components/emails/user-calories-email";
import { AdminNotificationEmail } from "@/components/emails/admin-calories-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

// Zod schema for validation
const calculatorSchema = z.object({
  weight: z.array(z.number()),
  height: z.array(z.number()),
  age: z.array(z.number()),
  gender: z.enum(["male", "female"]),
  goal: z.enum(["lose", "maintain", "gain"]),
  activityLevel: z.enum([
    "sedentary",
    "light",
    "moderate",
    "active",
    "very_active",
  ]),
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
});

// Define state for the action's response
export type ActionState = {
  status: "success" | "error" | "";
  message: string;
  calories?: number;
};

export async function calculateCaloriesAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 1. Extract and Convert form data
  const rawData = {
    weight: [Number(formData.get("weight"))],
    height: [Number(formData.get("height"))],
    age: [Number(formData.get("age"))],
    gender: formData.get("gender"),
    goal: formData.get("goal"),
    activityLevel: formData.get("activityLevel"),
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const validatedFields = calculatorSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Nieprawidłowe dane formularza. Sprawdź wprowadzone wartości.",
    };
  }
  const { data } = validatedFields;
  const { weight, height, age, gender, activityLevel, goal, name, email } =
    data;

  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weight[0] + 6.25 * height[0] - 5 * age[0] + 5;
  } else {
    bmr = 10 * weight[0] + 6.25 * height[0] - 5 * age[0] - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const tdee = bmr * activityMultipliers[activityLevel];

  let finalCalories: number;
  switch (goal) {
    case "lose":
      finalCalories = tdee - 400;
      break;
    case "gain":
      finalCalories = tdee + 400;
      break;
    case "maintain":
    default:
      finalCalories = tdee;
      break;
  }

  try {
    // Email to User
    await resend.emails.send({
      from: "Kalkulator kalorii <kontakt@filiprozmus.pl>",
      to: email,
      subject: "Twój spersonalizowany plan kaloryczny 💪",
      react: UserWelcomeEmail({ name, calories: finalCalories }),
    });

    // Email to Admin
    if (adminEmail) {
      await resend.emails.send({
        from: "Kalkulator kalorii <kalkulator@filiprozmus.pl>",
        to: adminEmail,
        subject: `Nowe zgłoszenie z kalkulatora: ${name}`,
        react: AdminNotificationEmail({
          formData: data,
          calories: finalCalories,
        }),
      });
    }

    return {
      status: "success",
      message: "Obliczenia zakończone!",
      calories: finalCalories,
    };
  } catch (error) {
    console.error("Błąd wysyłania e-maila:", error);
    return {
      status: "error",
      message: "Nie udało się wysłać e-maila. Spróbuj ponownie później.",
    };
  }
}
