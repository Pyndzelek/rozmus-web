import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AdminNotificationEmailProps {
  formData: {
    name: string;
    email: string;
    weight: number[];
    height: number[];
    age: number[];
    gender: string;
    goal: string;
    activityLevel: string;
  };
  calories: number;
}

export const AdminNotificationEmail = ({
  formData,
  calories,
}: AdminNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nowe zgłoszenie: {formData.name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nowe zgłoszenie w kalkulatorze</Heading>
        <Text style={paragraph}>
          Użytkownik <strong>{formData.name}</strong> ({formData.email})
          przesłał formularz.
        </Text>
        <Hr style={hr} />
        <Section>
          <Text style={listItem}>
            <strong>Waga:</strong> {formData.weight[0]} kg
          </Text>
          <Text style={listItem}>
            <strong>Wzrost:</strong> {formData.height[0]} cm
          </Text>
          <Text style={listItem}>
            <strong>Wiek:</strong> {formData.age[0]} lat
          </Text>
          <Text style={listItem}>
            <strong>Płeć:</strong>{" "}
            {formData.gender === "male" ? "Mężczyzna" : "Kobieta"}
          </Text>
          <Text style={listItem}>
            <strong>Cel:</strong> {formData.goal}
          </Text>
          <Text style={listItem}>
            <strong>Poziom aktywności:</strong> {formData.activityLevel}
          </Text>
        </Section>
        <Hr style={hr} />
        <Section style={highlightSection}>
          <Text style={highlightText}>
            <strong>Obliczone dzienne zapotrzebowanie:</strong>
          </Text>
          <Text style={highlightValue}>{Math.round(calories)} kcal</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminNotificationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  width: "580px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  color: "#1f2937",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  color: "#374151",
  padding: "0 40px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const listItem = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#374151",
  padding: "0 40px",
  margin: "8px 0",
};

const highlightSection = {
  backgroundColor: "#f3f4f6",
  padding: "20px",
  margin: "0 40px",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const highlightText = {
  color: "#1f2937",
  fontSize: "16px",
  margin: 0,
};

const highlightValue = {
  color: "#059669",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "8px 0 0 0",
};
