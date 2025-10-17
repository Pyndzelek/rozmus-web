import AchievementsOmnie from "@/components/o-mnie/Achievements-omnie";
import HeroOmnie from "@/components/o-mnie/Hero-omnie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "O Mnie - Filip Rozmus, Certyfikowany Trener Personalny z Nowego Targu",
  description:
    "Poznaj mnie bliżej. Dowiedz się więcej o moim doświadczeniu, pasji do sportu i filozofii treningowej. Zaufaj certyfikowanemu trenerowi z Nowego Targu.",
  openGraph: {
    title: "Poznaj Swojego Trenera - Filip Rozmus",
    description:
      "Dowiedz się, dlaczego warto mi zaufać i rozpocząć współpracę.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroOmnie />

      <AchievementsOmnie />
    </div>
  );
}
