import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Hr,
  Preview,
} from "@react-email/components";
import { SurveyFormData } from "@/lib/schemas";

interface ConfirmationEmailProps {
  data: SurveyFormData;
}

export const ConfirmationEmail = ({ data }: ConfirmationEmailProps) => {
  const formatArray = (arr?: string[]) => {
    if (!arr || arr.length === 0) return "Nie podano";
    return arr.join(", ");
  };

  const firstName = data.name.trim().split(" ")[0];

  return (
    <Html>
      <Head />
      <Preview>Potwierdzenie otrzymania Twojego formularza</Preview>
      <Body style={{ backgroundColor: "#f3f4f6", fontFamily: "sans-serif" }}>
        <Container
          style={{
            margin: "40px auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ color: "#111827", fontSize: "24px" }}>
            Cześć, {firstName}!
          </Heading>
          <Text style={{ color: "#374151", fontSize: "16px" }}>
            Dziękuję za wypełnienie formularza konsultacyjnego. Poniżej
            znajdziesz kopię informacji, które nam przesłałeś.
          </Text>
          <Text style={{ color: "#374151", fontSize: "16px" }}>
            Wkrótce zapoznam się z Twoimi odpowiedziami oraz skontaktuję się z
            Tobą, aby omówić dalsze kroki.
          </Text>
          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Podsumowanie Twojego zgłoszenia:
            </Heading>
            <Text>
              <strong>Email:</strong> {data.email}
            </Text>
            <Text>
              <strong>Wiek:</strong> {data.age} lat
            </Text>
            <Text>
              <strong>Wzrost:</strong> {data.height} cm
            </Text>
            <Text>
              <strong>Waga:</strong> {data.weight} kg
            </Text>
            <Hr style={{ borderColor: "#e5e7eb" }} />
            <Text>
              <strong>Cele treningowe:</strong> {formatArray(data.goals)}
            </Text>
            <Text>
              <strong>Dni treningowe w tygodniu:</strong>{" "}
              {formatArray(data.trainingDays)}
            </Text>
            <Text>
              <strong>Preferowane dni:</strong>{" "}
              {formatArray(data.preferredDays)}
            </Text>
            <Hr style={{ borderColor: "#e5e7eb" }} />
            <Text>
              <strong>Opis aktywności:</strong> {data.activityLevel}
            </Text>
            <Text>
              <strong>Czas w pozycji siedzącej:</strong> {data.sittingTime}
            </Text>
            <Hr style={{ borderColor: "#e5e7eb" }} />
            <Text>
              <strong>Ilość snu:</strong> {data.sleepHours}
            </Text>
            <Text>
              <strong>Jakość snu:</strong> {data.sleepQuality}
            </Text>
            <Text>
              <strong>Poziom stresu:</strong> {data.stressLevel}
            </Text>
            <Hr style={{ borderColor: "#e5e7eb" }} />
            <Text>
              <strong>Sposób żywienia:</strong> {data.nutrition}
            </Text>
            <Text>
              <strong>Kontuzje:</strong> {data.injuries || "Nie podano"}
            </Text>
            <Text>
              <strong>Problemy sercowo-naczyniowe:</strong>{" "}
              {data.cardiovascular || "Nie podano"}
            </Text>
            <Text>
              <strong>Lekarstwa i suplementy:</strong>{" "}
              {data.medications || "Nie podano"}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />
          <Text style={{ color: "#52525b", fontSize: "14px" }}>
            Pozdrawiam
            <br />
            Filip Rozmus
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
