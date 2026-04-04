import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bath Theory | Ancient Indian Bathing Rituals, Modern Self-Care",
  description: "Handcrafted bath & body products inspired by the wisdom of Indian bathing rituals. Premium soaps, body butters, and self-care essentials for modern living.",
  keywords: ["handmade soaps", "Indian bathing rituals", "natural skincare", "bath products", "self-care", "ayurvedic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
