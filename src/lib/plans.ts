// Cennik - jedno źródło dla /oferta, FAQ, JSON-LD (layout.tsx) i ankiety (/formularz?plan=<id>)
export type Plan = {
  id: string;
  name: string;
  price: string;
  higher_price?: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
  // Plany z opisem ankiety prowadzą do /formularz?plan=<id>, pozostałe do formularza kontaktowego
  surveyDescription?: string;
};

export const plans: Plan[] = [
  {
    id: "indywidualny-plan",
    name: "Indywidualny plan treningowy",
    price: "150 zł",
    duration: "4-12 tygodni",
    description: "Plan treningowy dopasowany do Twoich potrzeb",
    features: [
      "Indywidualny plan treningowy",
      "Instrukcje wideo do każdego ćwiczenia",
    ],
    popular: false,
    surveyDescription:
      "Wypełnij formularz, aby otrzymać plan treningowy idealnie dopasowany do Twoich potrzeb i celów.",
  },
  {
    id: "1-trening-personalny",
    name: "1 trening personalny",
    price: "150 zł",
    duration: "1 sesja",
    description: "Indywidualny trening personalny",
    features: ["Trening dostosowany do Twoich potrzeb"],
    popular: false,
  },
  {
    id: "6-treningow-personalnych",
    name: "6 treningów personalnych",
    higher_price: "900 zł",
    price: "700 zł",
    duration: "6 sesji",
    description: "6 indywidualnych treningów personalnych",
    features: ["Stały kontakt i wsparcie", "Analiza techniki"],
    popular: false,
  },
  {
    id: "12-treningow-duo",
    name: "12 treningów duo",
    price: "1800 zł",
    duration: "12 sesji (dla 2 osób)",
    description: "12 treningów personalnych w duecie",
    features: [
      "Treningi z partnerem lub znajomym",

      "Stały kontakt i wsparcie",
      "Analiza techniki każdego uczestnika",
      "W grupie raźniej :)",
    ],
    popular: false,
  },

  {
    id: "12-treningow-plan",
    name: "12 treningów + plan",
    price: "1300 zł",
    higher_price: "1620 zł",
    duration: "12 sesji",
    description: "12 treningów personalnych + plan treningowy",
    features: [
      "Indywidualny plan treningowy",
      "Instrukcje wideo do każdego ćwiczenia",
      "Stały kontakt i wsparcie",
      "Analiza techniki",
    ],
    popular: true,
    surveyDescription:
      "Świetny wybór! Proszę, wypełnij ankietę, która pomoże nam maksymalnie wykorzystać nasze sesje. Na jej podstawie przygotuję dla Ciebie spersonalizowany plan treningowy.",
  },
  {
    id: "20-treningow-personalnych",
    name: "20 treningów personalnych",
    higher_price: "3000 zł",
    price: "2000 zł",
    duration: "20 sesji",
    description: "20 indywidualnych treningów personalnych",
    features: [
      "Stały kontakt i wsparcie",
      "Indywidualne podejście",
      "Treningi dostosowany do Twoich potrzeb",
      "Analiza techniki",
      "Wskazówki dietetyczne",
    ],
    popular: false,
  },
  {
    id: "prowadzenie-online",
    name: "Prowadzenie online",
    price: "200 zł",
    duration: "1 miesiąc",
    description: "Współpraca online",
    features: [
      "Indywidualny plan treningowy",
      "Instrukcje wideo do każdego ćwiczenia",
      "Stały kontakt i wsparcie",
      "Cotygodniowe raporty",
      "Analiza techniki",
      "Wskazówki dietetyczne",
    ],
    popular: false,
    surveyDescription:
      "Zaczynamy naszą współpracę! Wypełnij formularz, abym mógł przygotować dla Ciebie najlepszy możliwy start.",
  },
];

export const parsePrice = (price: string) => Number(price.replace(/[^0-9]/g, ""));

export const getPlan = (id: string | null) => plans.find((plan) => plan.id === id);

// Cena planu do tekstów (FAQ); pusty tekst, jeśli plan usunięto z cennika
export const planPrice = (id: string) => getPlan(id)?.price ?? "";

const prices = plans.map((plan) => parsePrice(plan.price));
export const PRICE_RANGE = `${Math.min(...prices)} zł - ${Math.max(...prices)} zł`;
