import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cube Consultants | Architecture & Urban Planning",
  description: "Constructing ecosystems that embody Spirit Care, Earth Care, and the seamless melding of Science, Technology, & Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <Navigation />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
