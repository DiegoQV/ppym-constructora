"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type SVGProps } from "react";
import { Boxes, Crosshair, Move3d, Waves } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Capability {
  number: string;
  short: string;
  title: string;
  role: string;
  image: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  applications: readonly string[];
  criterion: string;
}

const capabilities: Capability[] = [
  { number: "01", short: "Conformar", title: "Movimiento compacto", role: "Preparación precisa en espacios de maniobra reducida.", image: "/images/equipment/minicargador-ladera-v1.png", Icon: Move3d, applications: ["Limpieza de plataforma", "Acarreo corto", "Nivelación y apoyo"], criterion: "Agilidad donde una máquina mayor comprometería accesos o control." },
  { number: "02", short: "Colocar", title: "Concreto coordinado", role: "Continuidad operativa para elementos estructurales y vaciados planificados.", image: "/images/equipment/mixer-concreto-v1.png", Icon: Waves, applications: ["Losas y cimentaciones", "Elementos estructurales", "Control de secuencia"], criterion: "El equipo se define según volumen, acceso, tiempo y condición de obra." },
  { number: "03", short: "Excavar", title: "Terreno y drenaje", role: "Excavación controlada para resolver pendiente, plataforma y conducción de agua.", image: "/images/equipment/excavadora-drenaje-v1.png", Icon: Boxes, applications: ["Cortes y excavaciones", "Drenaje superficial", "Conformación de taludes"], criterion: "Intervenir la ladera exige reconocer suelo, agua y estabilidad antes de mover material." },
  { number: "04", short: "Controlar", title: "Precisión topográfica", role: "Información medible para replantear, verificar y documentar decisiones de campo.", image: "/images/equipment/control-topografico-v1.webp", Icon: Crosshair, applications: ["Levantamiento", "Replanteo", "Control geométrico"], criterion: "Medir antes, durante y después reduce incertidumbre y mantiene trazabilidad." },
];

export function Equipment() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [headingArmed, setHeadingArmed] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const active = capabilities[activeIndex];
  const ActiveIcon = active.Icon;

  const selectTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % capabilities.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + capabilities.length) % capabilities.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = capabilities.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectTab(nextIndex);
  };

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    setHeadingArmed(true);

    const reveal = () => setHeadingVisible(true);
    const rect = heading.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.08) reveal();

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          reveal();
          observer?.disconnect();
        }, { threshold: 0.35, rootMargin: "-5% 0px -12% 0px" })
      : null;

    observer?.observe(heading);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="equipos" aria-labelledby="equipment-title" className={cn("equipment-section relative scroll-mt-20 overflow-hidden bg-[#deddd7] py-20 text-charcoal sm:py-24 lg:h-[calc(100svh-5.9rem)] lg:min-h-[780px] lg:scroll-mt-24 lg:py-8", headingArmed && "heading-armed", headingVisible && "heading-visible")}>
      <div aria-hidden className="absolute inset-0 technical-grid-dark opacity-[.18]" />
      <Container className="relative lg:flex lg:h-full lg:flex-col">
        <div className="flex items-center justify-between gap-6 border-b border-charcoal/15 pb-4">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-text-gray"><span className="h-px w-8 bg-technical-yellow" />07 / Capacidad operativa</p>
          <p className="hidden font-mono text-[8px] uppercase tracking-[.2em] text-text-gray/60 sm:block">Equipo · criterio · coordinación</p>
        </div>

        <Reveal className="mb-5 mt-6 grid items-end gap-5 sm:mb-6 sm:mt-7 lg:mb-7 lg:grid-cols-[1fr_.72fr] lg:gap-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-text-gray">Recursos que responden</p>
            <h2 ref={headingRef} id="equipment-title" className="equipment-heading mt-3 max-w-[14ch] font-heading text-[clamp(3.25rem,5.2vw,5.7rem)] font-bold leading-[.88] tracking-[-.075em]">
              {["La", "capacidad", "se", "organiza"].map((word) => (
                <span key={word} className="equipment-heading-mask">
                  <span className="equipment-heading-word">{word}{word === "organiza" && <span className="equipment-heading-period">.</span>}</span>
                </span>
              ))}
            </h2>
          </div>
          <div className="border-l-2 border-technical-yellow pl-6 lg:mb-2 lg:pl-8">
            <p className="max-w-lg text-base leading-7 text-text-gray sm:text-lg">No se trata de acumular máquinas. Se trata de articular el recurso correcto con el momento correcto.</p>
            <p className="mt-3 font-mono text-[7px] uppercase tracking-[.16em] text-text-gray/55">Visualizaciones referenciales · Disponibilidad según alcance</p>
          </div>
        </Reveal>

        <Reveal className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <div role="tablist" aria-label="Capacidades operativas" className="grid grid-cols-2 border-l border-t border-charcoal/15 lg:grid-cols-4">
          {capabilities.map((item, index) => {
            const selected = index === activeIndex;
            return <button ref={(element) => { tabRefs.current[index] = element; }} key={item.number} id={`equipment-tab-${item.number}`} type="button" role="tab" tabIndex={selected ? 0 : -1} aria-selected={selected} aria-controls="equipment-panel" onClick={() => setActiveIndex(index)} onKeyDown={(event) => handleTabKeyDown(event, index)} className={cn("equipment-tab flex min-h-18 items-center justify-between gap-4 border-b border-r border-charcoal/15 px-4 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-charcoal sm:px-5", selected ? "bg-technical-yellow" : "bg-[#e9e8e3] hover:bg-white")}><span><span className="font-mono text-[8px] tracking-[.18em] text-charcoal/50">{item.number}</span><span className="mt-1 block font-heading text-base font-semibold tracking-[-.025em] sm:text-lg">{item.short}</span></span><span className={cn("size-1.5 rounded-full", selected ? "bg-charcoal" : "bg-charcoal/20")} /></button>;
          })}
        </div>

        <div className="equipment-console grid border-x border-b border-charcoal/15 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_22rem]">
          <div className="relative min-h-[540px] overflow-hidden bg-charcoal lg:min-h-0">
            <Image key={active.image} src={active.image} alt={`Visualización referencial de ${active.title.toLowerCase()} en Amazonas`} fill sizes="(min-width: 1024px) 860px, 100vw" className="equipment-image-enter equipment-image object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15" />
            <div aria-hidden className="technical-grid absolute inset-0 opacity-20 mix-blend-screen" />
            <div aria-hidden className="equipment-scan absolute inset-y-0 left-0 z-10 w-px bg-technical-yellow"><span className="absolute -left-1 top-1/2 size-2 rounded-full bg-technical-yellow shadow-[0_0_0_6px_rgba(231,185,40,.12)]" /></div>
            <span aria-hidden className="absolute bottom-4 left-6 font-heading text-[clamp(8rem,18vw,17rem)] font-bold leading-none tracking-[-.09em] text-white/[.08] sm:left-10">{active.number}</span>
            <div className="absolute bottom-6 right-6 border border-white/25 bg-charcoal/75 px-4 py-3 backdrop-blur-sm sm:bottom-8 sm:right-8"><p className="font-mono text-[7px] uppercase tracking-[.18em] text-white/45">Campo de aplicación</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[.18em] text-technical-yellow">Amazonas · operación coordinada</p></div>
          </div>

          <div key={active.number} id="equipment-panel" role="tabpanel" aria-labelledby={`equipment-tab-${active.number}`} className="equipment-panel-enter flex min-h-[500px] flex-col bg-charcoal p-7 text-white sm:p-9 lg:min-h-0 lg:p-6">
            <div className="flex items-start justify-between gap-5">
              <div><p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/38">Capacidad {active.number} / 04</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[.2em] text-technical-yellow">{active.short}</p></div>
              <span className="grid size-12 place-items-center border border-white/15 text-technical-yellow"><ActiveIcon aria-hidden className="size-5" strokeWidth={1.35} /></span>
            </div>
            <div className="my-auto py-5 lg:py-3">
              <h3 className="font-heading text-[clamp(2.35rem,2.8vw,3.2rem)] font-semibold leading-[.92] tracking-[-.06em]">{active.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{active.role}</p>
              <div className="mt-4 border-t border-white/15">
                {active.applications.map((application, index) => <p key={application} className="flex items-center gap-4 border-b border-white/15 py-2 text-[.82rem] text-white/72"><span className="font-mono text-[7px] text-technical-yellow">0{index + 1}</span>{application}</p>)}
              </div>
            </div>
            <div className="border-l border-technical-yellow pl-4"><p className="font-mono text-[7px] uppercase tracking-[.16em] text-white/35">Criterio operativo</p><p className="mt-1.5 text-xs leading-5 text-white/68">{active.criterion}</p></div>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
