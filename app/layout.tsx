import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Tarot de Marseille — Oracle Intuitif",
  description:
    "Tirez le Tarot de Marseille en ligne, explorez différents tirages et préparez-vous à l'interprétation assistée par IA.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
