import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Construcción y consultoría",
  keywords: [
    "constructora en Chachapoyas",
    "consultoría de construcción Amazonas",
    "saneamiento físico legal",
    "elaboración de planos",
    "topografía en Chachapoyas",
    "expedientes para licencias",
    "PPYM",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-PE": "/" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: site.indexable,
    follow: site.indexable,
    nocache: !site.indexable,
    googleBot: {
      index: site.indexable,
      follow: site.indexable,
      noimageindex: !site.indexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${manrope.variable} h-full antialiased`}><body className="flex min-h-full flex-col">{children}</body></html>;
}
