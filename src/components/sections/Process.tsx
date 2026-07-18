"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { ClipboardCheck, FileSearch, MessageSquareText, Route, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface Stage {
  number: string;
  action: string;
  title: string;
  description: string;
  output: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const stages: Stage[] = [
  { number: "01", action: "Escuchar", title: "Consulta inicial", description: "Entendemos la necesidad, el lugar y la información disponible para reconocer el verdadero punto de partida.", output: "Necesidad identificada", Icon: MessageSquareText },
  { number: "02", action: "Revisar", title: "Diagnóstico técnico", description: "Leemos antecedentes y condiciones del predio para descubrir qué debe resolverse antes de avanzar.", output: "Escenario comprendido", Icon: FileSearch },
  { number: "03", action: "Definir", title: "Ruta y alcance", description: "Convertimos el diagnóstico en una secuencia clara de decisiones, entregables y responsabilidades.", output: "Ruta de trabajo", Icon: Route },
  { number: "04", action: "Desarrollar", title: "Ejecución coordinada", description: "Articulamos cada especialidad y comunicamos el avance para mantener una sola dirección técnica.", output: "Servicio en desarrollo", Icon: Wrench },
  { number: "05", action: "Entregar", title: "Cierre claro", description: "Presentamos el resultado, explicamos la documentación y dejamos visibles los siguientes pasos.", output: "Resultado entregado", Icon: ClipboardCheck },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [assembled, setAssembled] = useState(false);
  const activeStage = stages[activeIndex];
  const ActiveIcon = activeStage.Icon;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    const activate = () => {
      setAssembled(true);
    };
    const checkPosition = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.08) activate();
    };
    const scheduleCheck = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(checkPosition);
    };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      activate();
      observer?.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }) : null;

    observer?.observe(stage);
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck, { passive: true });
    scheduleCheck();
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, []);

  return (
    <section ref={sectionRef} id="proceso" aria-labelledby="process-title" className={cn("process-cinema relative scroll-mt-20 overflow-hidden bg-[#e9e8e2] py-20 text-charcoal sm:py-24 lg:h-[calc(100svh-5.9rem)] lg:min-h-[760px] lg:scroll-mt-24 lg:py-8", assembled && "is-assembled")}>
      <Container className="lg:flex lg:h-full lg:flex-col">
        <div className="flex items-center justify-between gap-6 border-b border-charcoal/15 pb-4">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-gray"><span className="h-px w-8 bg-technical-yellow" />05 / Proceso</p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-text-gray/60 sm:block">Del primer dato al resultado</p>
        </div>

        <div className="process-heading-block mb-7 mt-7 grid items-end gap-6 lg:grid-cols-[1fr_.72fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-gray">Método PPYM</p>
            <h2 id="process-title" className="mt-3 max-w-[15ch] font-heading text-[clamp(3.2rem,5vw,5.6rem)] font-bold leading-[.9] tracking-[-0.07em]">Decidir antes de construir.</h2>
          </div>
          <div className="border-l-2 border-technical-yellow pl-6 lg:mb-1 lg:pl-8">
            <p className="max-w-xl text-base leading-7 text-text-gray sm:text-lg">Cinco momentos conectados para convertir información, criterio y trabajo en un resultado claro.</p>
          </div>
        </div>

        <div className="process-experience grid lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_11.5rem]">
        <div ref={stageRef} className="process-stage relative isolate min-h-[600px] overflow-hidden bg-charcoal text-white lg:min-h-0">
          <Image src="/images/process/ppym-proceso-constructivo-v1.png" alt="Evolución conceptual de una obra desde el replanteo hasta el edificio terminado en un paisaje de Amazonas" fill sizes="(min-width: 1440px) 1216px, 100vw" className="object-cover object-center" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,13,.94)_0%,rgba(10,12,13,.67)_31%,rgba(10,12,13,.12)_67%,rgba(10,12,13,.25)_100%)]" />
          <div aria-hidden className="technical-grid absolute inset-0 opacity-20 mix-blend-screen" />

          <div aria-hidden className="process-reveal-grid absolute inset-0 z-20 grid grid-cols-5">
            {stages.map((stage) => <span key={stage.number} className="process-reveal-slab border-r border-technical-yellow/30 bg-charcoal" />)}
          </div>

          <div aria-hidden className="process-scan absolute inset-y-0 z-[4] w-px bg-technical-yellow/75" style={{ left: `${(activeIndex + 1) * 20}%` }}><span className="absolute right-0 top-0 h-20 w-1 bg-technical-yellow" /></div>

          <div key={activeStage.number} id={`process-panel-${activeIndex}`} role="tabpanel" aria-labelledby={`process-tab-${activeIndex}`} className="process-story-panel relative z-10 flex min-h-[600px] max-w-xl flex-col p-7 sm:p-10 lg:h-full lg:min-h-0 lg:p-10 xl:p-12">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center border border-technical-yellow/70 text-technical-yellow"><ActiveIcon aria-hidden className="size-5" strokeWidth={1.35} /></span>
              <div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/45">Etapa {activeStage.number} / 05</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[.2em] text-technical-yellow">{activeStage.action}</p></div>
            </div>

            <div className="process-story-copy my-auto py-10">
              <p aria-hidden className="process-story-number font-heading text-[clamp(5rem,8vw,8rem)] font-bold leading-[.72] tracking-[-.08em] text-white/[.08]">{activeStage.number}</p>
              <h3 className="process-story-title mt-5 max-w-[10ch] font-heading text-[clamp(2.7rem,4.2vw,4.8rem)] font-semibold leading-[.9] tracking-[-.065em]">{activeStage.title}</h3>
              <p className="process-story-description mt-5 max-w-md text-base leading-7 text-white/68 lg:text-[1.05rem]">{activeStage.description}</p>
            </div>

            <div className="flex items-center justify-between gap-6 border-t border-white/20 pt-5 font-mono text-[8px] uppercase tracking-[.18em]"><span className="text-white/38">Resultado de etapa</span><span className="text-right text-technical-yellow">{activeStage.output}</span></div>
          </div>

          <p className="absolute bottom-7 right-7 z-10 hidden bg-charcoal/75 px-3 py-2 font-mono text-[8px] uppercase tracking-[.18em] text-white/55 backdrop-blur-sm sm:block">Terreno · estructura · resultado</p>
        </div>

        <div role="tablist" aria-label="Etapas del proceso" className="process-cinema-tabs grid grid-cols-1 border-l border-charcoal/15 sm:grid-cols-5 lg:grid-cols-1 lg:grid-rows-5 lg:border-t">
          {stages.map((stage, index) => {
            const selected = index === activeIndex;
            return <button key={stage.number} id={`process-tab-${index}`} type="button" role="tab" aria-selected={selected} aria-controls={`process-panel-${index}`} onClick={() => setActiveIndex(index)} className={cn("process-cinema-tab min-h-24 border-b border-r border-charcoal/15 px-5 py-4 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-charcoal lg:min-h-0", selected ? "bg-technical-yellow text-charcoal" : "bg-[#efeee9] text-charcoal hover:bg-white")}><span className="flex items-center justify-between font-mono text-[9px] tracking-[.18em]"><span>{stage.number}</span><span className={cn("h-1.5 w-1.5 rounded-full", selected ? "bg-charcoal" : "bg-charcoal/20")} /></span><span className="mt-5 block font-heading text-base font-semibold tracking-[-.025em] lg:mt-3">{stage.action}</span></button>;
          })}
        </div>
        </div>
      </Container>
    </section>
  );
}
