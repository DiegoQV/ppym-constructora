"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const advisoryUrl = createWhatsAppUrl(company.phone, "Hola, quisiera solicitar asesoría técnica.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition duration-300", scrolled || open ? "border-white/10 bg-charcoal/95 shadow-[0_8px_30px_rgba(0,0,0,.14)] backdrop-blur-md" : "border-transparent bg-charcoal/20 backdrop-blur-[2px]")}>
      <Container className="flex h-20 items-center justify-between min-[1180px]:h-24">
        <a href="#inicio" className="group relative flex min-h-11 items-center text-white transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow" aria-label={`${company.shortName}, ir al inicio`}>
          <span aria-hidden className="absolute -inset-x-2 inset-y-1 -z-10 border-b border-technical-yellow/0 bg-white/0 transition duration-300 group-hover:border-technical-yellow/65 group-hover:bg-white/[.035]" />
          <span className="relative block h-17 w-32 overflow-hidden sm:h-19 sm:w-36">
            <Image
              src="/logo/ppym-logo-navbar-inverse.png"
              alt=""
              fill
              priority
              sizes="144px"
              className="scale-[1.16] object-contain brightness-105 drop-shadow-[0_5px_12px_rgba(0,0,0,.5)] transition duration-300 group-hover:scale-[1.2]"
            />
          </span>
          <span className="sr-only">{company.legalName}</span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 min-[1180px]:flex">
          {navigation.map((item) => <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center px-3 text-base font-medium tracking-[0.02em] text-white/88 transition hover:text-white focus-visible:outline-2 focus-visible:outline-technical-yellow">{item.label}</a>)}
        </nav>
        <a
          href={advisoryUrl}
          aria-label="Contactar a PPYM por WhatsApp"
          className="group hidden min-h-11 items-center gap-2 border-b border-white/35 px-1 text-sm font-semibold text-white/90 transition hover:border-technical-yellow hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow min-[1180px]:inline-flex"
        >
          Contactar
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <button type="button" className="grid size-11 place-items-center text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technical-yellow min-[1180px]:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden /> : <Menu aria-hidden />}</button>
      </Container>

      <div id="mobile-navigation" className={cn("overflow-hidden border-t border-white/10 bg-charcoal transition-[max-height,opacity] duration-300 min-[1180px]:hidden", open ? "max-h-[calc(100vh-5rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0")}>
        <nav aria-label="Navegación móvil" className="flex min-h-[calc(100vh-5rem)] flex-col px-6 pb-8 pt-5">
          {navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-13 items-center border-b border-white/10 font-heading text-xl font-semibold text-white focus-visible:outline-2 focus-visible:outline-technical-yellow"><span className="mr-4 text-xs font-normal text-technical-yellow">0{index + 1}</span>{item.label}</a>)}
          <Button href={advisoryUrl} className="mt-auto w-full" aria-label="Solicitar asesoría por WhatsApp">Solicitar asesoría</Button>
        </nav>
      </div>
    </header>
  );
}
