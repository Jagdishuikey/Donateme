import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  title: "KindBridge | Nonprofit Website Template",
  description:
    "A modern Next.js and Tailwind CSS nonprofit template for program discovery, transparent donations, and impact storytelling."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} font-sans antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
