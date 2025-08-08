"use server";

import { Resend } from "resend";
import { contactFormSchema, TContactFormSchema } from "@/lib/schemas";
import { ContactFormEmail } from "@/components/emails/contact-form-email";
import { ratelimit } from "@/lib/ratelimit"; // You'll need to implement this

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

// Enhanced validation and security
export async function submitContactForm(data: TContactFormSchema) {
  console.log("--- CONTACT FORM SUBMISSION STARTED ---");
  console.log("Timestamp:", new Date().toISOString());

  // Validate environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
    return { success: false, error: "Konfiguracja serwera jest niepoprawna." };
  }

  // Sanitize and validate input data
  const sanitizedData = {
    name: data.name?.trim(),
    email: data.email?.toLowerCase().trim(),
    phone: data.phone?.trim() || undefined,
    subject: data.subject?.trim(),
    message: data.message?.trim(),
  };

  // Validate with Zod schema
  const validationResult = contactFormSchema.safeParse(sanitizedData);

  if (!validationResult.success) {
    console.error("Validation failed:", validationResult.error.flatten());
    return {
      success: false,
      error: "Dane w formularzu są nieprawidłowe. Sprawdź wszystkie pola.",
    };
  }

  const validData = validationResult.data;

  // Basic spam detection
  const spamKeywords = [
    "viagra",
    "casino",
    "bitcoin",
    "crypto",
    "loan",
    "dating",
  ];
  const messageContent =
    `${validData.name} ${validData.subject} ${validData.message}`.toLowerCase();

  if (spamKeywords.some((keyword) => messageContent.includes(keyword))) {
    console.warn("Potential spam detected:", { email: validData.email });
    return {
      success: false,
      error: "Wiadomość zawiera niedozwolone treści.",
    };
  }

  // Rate limiting
  try {
    const { success: rateLimitPassed } = await ratelimit.limit(validData.email);
    if (!rateLimitPassed) {
      return {
        success: false,
        error: "Zbyt wiele prób. Spróbuj ponownie później.",
      };
    }
  } catch (rateLimitError) {
    console.error("Rate limit check failed:", rateLimitError);
  }

  let lastError: any;
  const maxRetries = 2;

  if (!adminEmail) {
    console.error("ADMIN_EMAIL environment variable is not set");
    return {
      success: false,
      error: "Konfiguracja serwera jest niepoprawna.",
    };
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Email sending attempt ${attempt}/${maxRetries}`);

      const emailConfig = {
        from: "Formularz Kontaktowy <kontakt@filiprozmus.pl>",
        to: adminEmail,
        subject: `📧 Wiadomość z formularza: ${validData.subject}`,
        reply_to: validData.email,
        react: ContactFormEmail({ data: validData }),
        headers: {
          "X-Priority": "3",
          "X-Mailer": "Filip Rozmus Contact Form",
        },
      };

      const { data: emailData, error } = await resend.emails.send(emailConfig);

      if (error) {
        lastError = error;
        console.error(`Email sending attempt ${attempt} failed:`, error);

        // Don't retry for certain types of errors
        if (
          error.message?.includes("Invalid API key") ||
          error.message?.includes("Domain not verified")
        ) {
          throw error;
        }

        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          continue;
        }
      } else {
        console.log("Email sent successfully:", emailData);

        // Log successful submission (you might want to store this in a database)
        console.log("--- SUBMISSION SUCCESSFUL ---", {
          timestamp: new Date().toISOString(),
          email: validData.email,
          subject: validData.subject,
          emailId: emailData?.id,
        });

        return { success: true, emailId: emailData?.id };
      }
    } catch (error) {
      lastError = error;
      console.error(
        `Email sending attempt ${attempt} failed with exception:`,
        error
      );

      // Don't retry for configuration errors
      if (
        error instanceof Error &&
        (error.message.includes("API key") || error.message.includes("Domain"))
      ) {
        break;
      }
    }
  }

  // All attempts failed
  console.error("--- SUBMISSION FAILED ---", {
    timestamp: new Date().toISOString(),
    email: validData.email,
    error: lastError,
    attempts: maxRetries,
  });

  let errorMessage =
    "Nie udało się wysłać wiadomości. Spróbuj ponownie później.";

  if (lastError?.message?.includes("API key")) {
    errorMessage = "Wystąpił problem z konfiguracją serwera.";
  } else if (lastError?.message?.includes("rate")) {
    errorMessage =
      "Zbyt wiele prób wysłania. Odczekaj chwilę i spróbuj ponownie.";
  } else if (
    lastError?.message?.includes("network") ||
    lastError?.message?.includes("timeout")
  ) {
    errorMessage =
      "Problem z połączeniem. Sprawdź internet i spróbuj ponownie.";
  }

  return {
    success: false,
    error: errorMessage,
  };
}
