import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "W75 Le Neubourg 2026 — Joueuses, scores & direct",
  description: "Le guide complet de l'Open International féminin ITF W75 du Neubourg 2026 : participantes, fiches joueuses, scores, tableaux, direct et palmarès.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
