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
import { TContactFormSchema } from "@/lib/schemas";

interface ContactFormEmailProps {
  data: TContactFormSchema;
}

export const ContactFormEmail = ({ data }: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nowa wiadomość z formularza kontaktowego</Preview>
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
            Nowa wiadomość z formularza
          </Heading>
          <Text style={{ color: "#374151", fontSize: "16px" }}>
            Otrzymano nową wiadomość od: <strong>{data.name}</strong>.
          </Text>
          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />
          <Section>
            <Text>
              <strong>Email:</strong> {data.email}
            </Text>
            <Text>
              <strong>Telefon:</strong> {data.phone || "Nie podano"}
            </Text>
            <Text>
              <strong>Temat:</strong> {data.subject}
            </Text>
            <Hr style={{ borderColor: "#e5e7eb" }} />
            <Heading as="h2" style={{ fontSize: "20px", color: "#1f2937" }}>
              Treść wiadomości:
            </Heading>
            <Text style={{ whiteSpace: "pre-wrap", color: "#374151" }}>
              {data.message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
