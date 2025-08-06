"use server";

import { Resend } from "resend";
import { SurveyEmail } from "@/components/survey-email";
import { surveyFormSchema, SurveyFormData } from "./schemas";
import { ConfirmationEmail } from "@/components/confirmation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Zmieniamy typ argumentu, aby nie oczekiwał już tokena
export async function submitSurvey(formData: SurveyFormData) {
  // --- SEKCJA RECAPTCHA (POMINIĘTA ZGODNIE Z PROŚBĄ) ---
  /*
  // 1. Validate reCAPTCHA
  const recaptchaRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${formData.recaptchaToken}`,
    }
  );

  const recaptchaData = await recaptchaRes.json();
  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return {
      success: false,
      message: "Błąd weryfikacji reCAPTCHA. Spróbuj ponownie.",
    };
  }
  */
  // --- KONIEC SEKCJI RECAPTCHA ---

  // 2. Walidacja danych formularza na serwerze
  const validatedFields = surveyFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    console.error(
      "Server-side validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: "Nieprawidłowe dane formularza.",
    };
  }

  const { data } = validatedFields;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Nowe Zgłoszenie <formularz@filiprozmus.pl>",
        to: "rozmus.nlt@gmail.com",
        subject: `Nowe zgłoszenie od: ${data.name}`,
        react: SurveyEmail({ data }),
        replyTo: data.email,
      }),

      //potwierdzenie wysłania formularza do użytkownika
      resend.emails.send({
        from: "Filip Rozmus <formularz@filiprozmus.pl>",
        to: data.email,
        subject: "Potwierdzenie otrzymania formularza",
        react: ConfirmationEmail({ name: data.name }),
      }),
    ]);

    return { success: true, message: "Formularz wysłany pomyślnie!" };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Nie udało się wysłać formularza. Spróbuj ponownie później.",
    };
  }
}
