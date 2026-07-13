import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = { title: "PPYM E.I.R.L. | Constructora y Consultora", description: "Sitio corporativo de Constructora & Consultora PPYM E.I.R.L." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${manrope.variable} h-full antialiased`}><body className="flex min-h-full flex-col">{children}</body></html>;
}
