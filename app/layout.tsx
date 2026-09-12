import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "W75 Le Neubourg 2026 — Joueuses, scores & direct",
  description: "Le guide complet de l'Open International féminin ITF W75 du Neubourg 2026 : participantes, fiches joueuses, scores, tableaux, direct et palmarès.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
