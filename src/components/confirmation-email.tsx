import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Hr,
  Preview,
} from "@react-email/components";

interface ConfirmationEmailProps {
  name: string;
}

export const ConfirmationEmail = ({ name }: ConfirmationEmailProps) => {
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
            Cześć, {name}!
          </Heading>
          <Text style={{ color: "#374151", fontSize: "16px" }}>
            Dzięki za wypełnienie formularza konsultacyjnego. Otrzymałem Twoje
            zgłoszenie i jest ono bezpieczne.
          </Text>
          <Text style={{ color: "#374151", fontSize: "16px" }}>
            Wkrótce zapoznam się z Twoimi odpowiedziami oraz skontaktuję się z
            Tobą!
          </Text>
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
