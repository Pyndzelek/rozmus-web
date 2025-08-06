import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Hr,
} from "@react-email/components";
import { SurveyFormData } from "@/lib/schemas";

interface SurveyEmailProps {
  data: SurveyFormData;
}

export const SurveyEmail = ({ data }: SurveyEmailProps) => {
  const formatArray = (arr?: string[]) => arr?.join(", ") || "Nie podano";

  return (
    <Html>
      <Head />
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
            Nowe Zgłoszenie z Formularza Konsultacyjnego
          </Heading>
          <Text style={{ color: "#374151", fontSize: "16px" }}>
            Otrzymano nowe zgłoszenie od: <strong>{data.name}</strong> (
            {data.email}).
          </Text>
          <Hr style={{ borderColor: "#e5e7eb" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Dane Podstawowe
            </Heading>
            <Text>
              <strong>Wiek:</strong> {data.age} lat
            </Text>
            <Text>
              <strong>Wzrost:</strong> {data.height} cm
            </Text>
            <Text>
              <strong>Waga:</strong> {data.weight} kg
            </Text>
          </Section>
          <Hr style={{ borderColor: "#e5e7eb" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Cele Treningowe
            </Heading>
            <Text>
              <strong>Główne cele:</strong> {formatArray(data.goals)}
            </Text>
            <Text>
              <strong>Dni treningowe w tyg:</strong>{" "}
              {formatArray(data.trainingDays)}
            </Text>
            <Text>
              <strong>Preferowane dni:</strong>{" "}
              {formatArray(data.preferredDays)}
            </Text>
            <Text>
              <strong>Priorytetowe partie ciała:</strong>{" "}
              {formatArray(data.bodyPriorities)}
            </Text>
          </Section>
          <Hr style={{ borderColor: "#e5e7eb" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Styl Życia
            </Heading>
            <Text>
              <strong>Poziom aktywności, praca:</strong> {data.activityLevel}
            </Text>
            <Text>
              <strong>Czas w pozycji siedzącej:</strong> {data.sittingTime}
            </Text>
          </Section>
          <Hr style={{ borderColor: "#e5e7eb" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Sen i Stres
            </Heading>
            <Text>
              <strong>Ilość snu:</strong> {data.sleepHours}
            </Text>
            <Text>
              <strong>Jakość snu:</strong> {data.sleepQuality}
            </Text>
            <Text>
              <strong>Poziom stresu:</strong> {data.stressLevel}
            </Text>
          </Section>
          <Hr style={{ borderColor: "#e5e7eb" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Zdrowie i Żywienie
            </Heading>
            <Text>
              <strong>Sposób żywienia i używki:</strong> {data.nutrition}
            </Text>
            <Text>
              <strong>Kontuzje i problemy ruchowe:</strong>{" "}
              {data.injuries || "Nie podano"}
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
        </Container>
      </Body>
    </Html>
  );
};
