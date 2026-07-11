import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "PPYM E.I.R.L. | Constructora y Consultora", description: "Sitio corporativo de Constructora & Consultora PPYM E.I.R.L." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className="h-full antialiased"><body className="flex min-h-full flex-col">{children}</body></html>;
}
