import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filip Rozmus - Trener Personalny",
  description:
    "Profesjonalny trener personalny - plany treningowe, dietetyczne i prowadzenie online",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="h-auto">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
      </head>
      <body className={`${inter.className} h-auto min-h-screen`}>
        <div className="h-auto min-h-screen">{children}</div>
      </body>
    </html>
  );
}
