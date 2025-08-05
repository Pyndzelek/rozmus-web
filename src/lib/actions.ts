"use server";

import { Resend } from "resend";
import { SurveyEmail } from "@/components/survey-email";
import { surveyFormSchema, SurveyFormData } from "./schemas";

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
    // Logowanie błędów walidacji może być pomocne w debugowaniu
    console.error(
      "Server-side validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: "Nieprawidłowe dane formularza.",
    };
  }

  // 3. Wysłanie maila za pomocą Resend
  try {
    await resend.emails.send({
      from: "Survey Form <onboarding@resend.dev>", // TODO: Zmień na zweryfikowaną domenę w Resend
      to: "twoj-prywatny-email@example.com", // TODO: Wpisz swój adres email, na który mają przychodzić powiadomienia
      subject: `Nowe zgłoszenie od: ${validatedFields.data.name}`,
      react: SurveyEmail({ data: validatedFields.data }),
      replyTo: validatedFields.data.email,
    });

    return { success: true, message: "Formularz wysłany pomyślnie!" };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Nie udało się wysłać formularza. Spróbuj ponownie później.",
    };
  }
}
