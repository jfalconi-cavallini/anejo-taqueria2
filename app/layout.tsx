import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anejo Taqueria | Authentic Mexican Food | EST. 2022",
  description:
    "Anejo Taqueria — Authentic Mexican flavors. Tacos, brunch, papas, and more. Order online or visit us today.",
  keywords: ["Anejo Taqueria", "Mexican food", "tacos", "taqueria", "brunch tacos", "order online"],
  openGraph: {
    title: "Anejo Taqueria | EST. 2022",
    description: "Feed me tacos and tell me I'm pretty.",
    type: "website",
    images: ["/images/Anejo_logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0702",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}