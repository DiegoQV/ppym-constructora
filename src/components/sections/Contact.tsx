"use client";

import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const contactUrl = createWhatsAppUrl(
  company.phone,
  "Hola, quisiera conversar sobre un proyecto y solicitar asesoría técnica.",
);

const contactDetails = [
  { label: "Línea directa", value: company.displayPhone, description: "", action: "Llamar", href: `tel:+51${company.phone}`, Icon: Phone },
  { label: "Oficina", value: company.address, description: `${company.city}, ${company.region}`, action: "Ver ubicación", href: "https://maps.google.com/?q=Jr.+Sachapuyos+250,+Chachapoyas,+Peru", Icon: MapPin },
] as const;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    setArmed(true);

    const reveal = () => setVisible(true);
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.08) reveal();

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          reveal();
          observer?.disconnect();
        }, { threshold: 0.16, rootMargin: "0px 0px -10% 0px" })
      : null;

    observer?.observe(section);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contacto" aria-labelledby="contact-title" className={cn("contact-section relative scroll-mt-20 overflow-hidden bg-technical-yellow text-charcoal lg:scroll-mt-24", armed && "contact-armed", visible && "contact-visible")}>
      <div aria-hidden className="technical-grid-dark absolute inset-0 opacity-[.07]" />
      <Container className="contact-container relative py-20 sm:py-24 lg:pb-24 lg:pt-20">
          <div className="contact-kicker flex items-center justify-between gap-6 border-b border-charcoal/20 pb-4">
            <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[.12em] text-charcoal"><span className="h-px w-8 bg-charcoal" />Contacto</p>
            <p className="hidden font-mono text-xs font-semibold uppercase tracking-[.08em] text-charcoal/85 sm:block">Chachapoyas · Amazonas · Perú</p>
          </div>

        <div className="contact-main grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14 lg:py-12">
          <div>
            <p className="max-w-md text-xs font-bold uppercase leading-6 tracking-[.1em] text-charcoal sm:text-sm">Una conversación concreta para empezar</p>
            <h2 id="contact-title" className="contact-heading mt-5 max-w-[11ch] font-heading text-[clamp(2.85rem,5.8vw,6.25rem)] font-bold leading-[.94] tracking-[-.065em]">
              <span className="contact-heading-mask"><span className="contact-heading-line">Hablemos de</span></span>
              <span className="contact-heading-mask"><span className="contact-heading-line">su próximo</span></span>
              <span className="contact-heading-mask"><span className="contact-heading-line">proyecto<span className="text-charcoal/35">.</span></span></span>
            </h2>
          </div>

          <div className="contact-brief relative overflow-hidden bg-charcoal p-6 text-white sm:p-9 lg:p-10">
            <span aria-hidden className="absolute right-5 top-4 font-mono text-[4.5rem] leading-none text-white/[.035]">↗</span>
            <p className="text-xs font-bold uppercase leading-5 tracking-[.1em] text-technical-yellow">Empecemos por su consulta</p>
            <h3 className="relative mt-5 max-w-[15ch] font-heading text-3xl font-semibold leading-[1.1] tracking-[-.04em] sm:text-4xl">¿Qué necesita resolver?</h3>
            <p className="relative mt-5 max-w-md text-base leading-7 text-white/75 sm:text-lg">Cuéntenos qué necesita, dónde está su proyecto y en qué etapa se encuentra.</p>
            <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="contact-primary-cta group relative mt-7 flex min-h-14 items-center justify-between gap-3 bg-technical-yellow px-4 py-4 text-sm font-bold text-charcoal transition-colors hover:bg-technical-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow sm:px-5 sm:text-base">
              <span className="flex items-center gap-2.5"><MessageCircle aria-hidden className="size-5 shrink-0" />Escribir por WhatsApp</span>
              <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-4 text-sm font-medium leading-5 text-white/80">Contacto directo con nuestro equipo.</p>
          </div>
        </div>

        <div className="contact-details grid gap-x-12 border-t border-charcoal/25 md:grid-cols-2 lg:gap-x-20">
          {contactDetails.map(({ label, value, description, action, href, Icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="contact-detail group flex items-center justify-between gap-4 py-6 text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal max-md:first:border-b max-md:first:border-charcoal/15">
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-charcoal/90"><Icon aria-hidden className="size-4 shrink-0" strokeWidth={2} />{label}</span>
                <span className="mt-2 block text-base font-semibold leading-6 sm:text-lg">{value}</span>
                {description && <span className="mt-0.5 block text-sm font-medium leading-5 text-charcoal/90">{description}</span>}
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium underline decoration-charcoal/35 underline-offset-4 transition-colors group-hover:decoration-charcoal group-focus-visible:decoration-charcoal">{action}<ArrowUpRight aria-hidden className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
