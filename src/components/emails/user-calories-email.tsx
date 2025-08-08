import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface UserWelcomeEmailProps {
  name: string;
  calories: number;
}

export const UserWelcomeEmail = ({ name, calories }: UserWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Twój spersonalizowany plan kaloryczny</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Cześć {name.split(" ")[0]},</Heading>
        <Section style={mainContent}>
          <Text style={paragraph}>
            Dziękuję za skorzystanie z mojego kalkulatora kalorii! Na podstawie
            podanych przez Ciebie informacji obliczyłem Twoje szacunkowe dzienne
            zapotrzebowanie kaloryczne.
          </Text>
          <Section style={calorieCard}>
            <Text style={calorieText}>Twój dzienny cel kaloryczny to:</Text>
            <Text style={calorieValue}>{Math.round(calories)} kcal</Text>
          </Section>
          <Text style={paragraph}>
            Ta wartość to świetny punkt wyjścia do osiągnięcia Twojego celu.
            Pamiętaj, aby słuchać swojego ciała i w razie potrzeby dostosowywać
            kaloryczność.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Powodzenia na Twojej drodze do wymarzonej sylwetki!
            <br />
            Filip Rozmus
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default UserWelcomeEmail;

// Styles
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: "#eaeaea",
};

const container = {
  margin: "0 auto",
  padding: "20px 48px",
  width: "580px",
  backgroundColor: "#1e1e1e",
  borderRadius: "8px",
  border: "1px solid #333",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ffffff",
  textAlign: "center" as const,
};

const mainContent = {
  padding: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#d4d4d4",
};

const calorieCard = {
  backgroundColor: "#262626",
  borderRadius: "8px",
  padding: "24px",
  textAlign: "center" as const,
  margin: "24px 0",
};

const calorieText = {
  fontSize: "18px",
  color: "#a3a3a3",
  margin: "0 0 10px 0",
};

const calorieValue = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#34d399", // Przykładowy kolor akcentu
  margin: "0",
};

const hr = {
  borderColor: "#333333",
  margin: "20px 0",
};
