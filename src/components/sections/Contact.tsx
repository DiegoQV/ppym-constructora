"use client";

import { ArrowUpRight, Building2, MapPin, Phone } from "lucide-react";
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
  { label: "Línea directa", value: company.displayPhone, href: `tel:+51${company.phone}`, Icon: Phone },
  { label: "Oficina", value: `${company.address}, ${company.city}`, href: "https://maps.google.com/?q=Jr.+Sachapuyos+250,+Chachapoyas,+Peru", Icon: MapPin },
  { label: "Identificación", value: `RUC ${company.ruc}`, Icon: Building2 },
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
      <div aria-hidden className="technical-grid-dark absolute inset-0 opacity-35" />
      <span aria-hidden className="contact-ghost-number absolute right-2 top-[.08em] hidden font-heading text-[20rem] font-bold leading-none tracking-[-.1em] text-charcoal/[.03] lg:block xl:right-6">08</span>
      <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="contact-kicker flex items-center justify-between gap-6 border-b border-charcoal/20 pb-4">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-charcoal/65"><span className="h-px w-8 bg-charcoal" />08 / Contacto</p>
            <p className="hidden font-mono text-[8px] uppercase tracking-[.2em] text-charcoal/45 sm:block">Chachapoyas · Amazonas · Perú</p>
          </div>

        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1fr_.43fr] lg:items-end lg:gap-16 lg:py-16">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-charcoal/60">Una conversación concreta para empezar</p>
            <h2 id="contact-title" className="contact-heading mt-5 max-w-[11ch] font-heading text-[clamp(3.35rem,7.25vw,7.65rem)] font-bold leading-[.82] tracking-[-.085em]">
              <span className="contact-heading-mask"><span className="contact-heading-line">Hablemos de</span></span>
              <span className="contact-heading-mask"><span className="contact-heading-line">su próximo</span></span>
              <span className="contact-heading-mask"><span className="contact-heading-line">proyecto<span className="text-charcoal/35">.</span></span></span>
            </h2>
          </div>

          <div className="contact-brief relative overflow-hidden bg-charcoal p-7 text-white sm:p-9 lg:top-4">
            <span aria-hidden className="absolute right-5 top-4 font-mono text-[4.5rem] leading-none text-white/[.035]">↗</span>
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-technical-yellow/90">Punto de partida</p>
            <p className="relative mt-6 max-w-md text-base leading-7 text-white/68 sm:text-lg">Cuéntenos qué necesita resolver, dónde se ubica y en qué etapa se encuentra. Empezaremos por entender el contexto.</p>
            <a href={contactUrl} target="_blank" rel="noreferrer" className="contact-primary-cta group relative mt-8 flex min-h-16 items-center justify-between border-y border-white/20 py-4 font-heading text-lg font-semibold tracking-[-.035em] transition-colors hover:border-technical-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow sm:text-xl">
              Iniciar conversación
              <span className="contact-cta-icon grid h-11 w-11 place-items-center bg-technical-yellow text-charcoal"><ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </a>
            <p className="mt-5 font-mono text-[7px] uppercase tracking-[.16em] text-white/45">Respuesta directa vía WhatsApp</p>
          </div>
        </div>

        <div className="contact-details grid border-l border-t border-charcoal/25 sm:grid-cols-3">
          {contactDetails.map(({ label, value, Icon, ...detail }) => {
            const content = <><span className="flex items-center justify-between gap-4"><span className="font-mono text-[8px] uppercase tracking-[.18em] text-charcoal/60 transition-colors group-hover:text-white/55">{label}</span><Icon aria-hidden className="size-[18px] text-charcoal/65 transition-colors group-hover:text-technical-yellow" strokeWidth={1.7} /></span><span className="mt-5 block max-w-[22ch] text-sm font-medium leading-6 text-charcoal/80 transition-colors group-hover:text-white/80">{value}</span></>;
            const className = "contact-detail group min-h-32 border-b border-r border-charcoal/25 bg-technical-yellow/70 p-5 transition-colors hover:bg-charcoal sm:min-h-36 sm:p-6";
            return "href" in detail ? <a key={label} href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel={detail.href.startsWith("http") ? "noreferrer" : undefined} className={className}>{content}</a> : <div key={label} className={className}>{content}</div>;
          })}
        </div>
      </Container>
    </section>
  );
}
