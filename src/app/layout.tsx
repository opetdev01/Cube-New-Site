import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
        <Script
          id="metricool-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"3934eb5fe64bea44252f980f8cd9d56b"})});`,
          }}
        />
      </body>
    </html>
  );
}
