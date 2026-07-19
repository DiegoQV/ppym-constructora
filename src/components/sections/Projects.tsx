"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const projects = [
  { number: "01", name: "Residencia Ladera", type: "Vivienda", location: "Chachapoyas", scope: "Arquitectura · estructura · ejecución", image: "/images/projects/residencia-ladera-v1.png", description: "Pendiente, lluvia y paisaje convertidos en implantación, materialidad y protección." },
  { number: "02", name: "Refugio de Niebla", type: "Hospitalidad", location: "Amazonas", scope: "Pabellones · recorridos · drenaje", image: "/images/projects/refugio-niebla-v1.png", description: "Piezas contenidas siguen la topografía y construyen una experiencia vinculada al bosque de montaña." },
  { number: "03", name: "Esquina Urbana", type: "Uso mixto", location: "Chachapoyas", scope: "Comercio · oficinas · envolvente", image: "/images/projects/edificio-urbano-v1.png", description: "Un edificio compacto que protege al peatón y responde al ritmo de una ciudad intermedia." },
  { number: "04", name: "Patio Común", type: "Equipamiento", location: "Chachapoyas", scope: "Espacio público · accesibilidad · estructura", image: "/images/projects/centro-comunitario-v1.png", description: "Cubierta, patio y circulación protegida articulan encuentro, formación y comunidad." },
  { number: "05", name: "Centro Productivo", type: "Agroindustria", location: "Región Amazonas", scope: "Producción · administración · logística", image: "/images/projects/centro-productivo-v1.png", description: "Infraestructura durable para transformar producción local en un entorno de montaña exigente." },
] as const;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [headingArmed, setHeadingArmed] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    setHeadingArmed(true);

    let frame = 0;
    const activateIfVisible = () => {
      const rect = heading.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.86 || rect.bottom < window.innerHeight * 0.08) return;
      setHeadingVisible(true);
    };
    const scheduleCheck = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(activateIfVisible);
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          setHeadingVisible(true);
          observer?.disconnect();
        }, { threshold: 0.35, rootMargin: "-5% 0px -15% 0px" })
      : null;

    observer?.observe(heading);
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
    <section ref={sectionRef} id="proyectos" aria-labelledby="projects-title" className={cn("projects-section relative scroll-mt-20 overflow-hidden bg-charcoal py-20 text-white lg:h-[calc(100svh-5.9rem)] lg:min-h-[780px] lg:scroll-mt-24 lg:py-8", headingArmed && "heading-armed", headingVisible && "heading-visible")}>
      <div aria-hidden className="technical-grid absolute inset-0 opacity-20" />
      <Container className="relative lg:flex lg:h-full lg:flex-col">
        <div className="flex items-center justify-between gap-6 border-b border-white/15 pb-4">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-white/55"><span className="h-px w-8 bg-technical-yellow" />06 / Proyectos</p>
          <p className="hidden font-mono text-[8px] uppercase tracking-[.2em] text-white/35 sm:block">Colección referencial · Amazonas</p>
        </div>

        <div className="projects-heading-block grid items-end gap-6 py-7 lg:grid-cols-[1fr_.75fr]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-technical-yellow">Cinco hipótesis de proyecto</p>
            <h2 ref={headingRef} id="projects-title" className="project-heading mt-3 max-w-[16ch] font-heading text-[clamp(3.2rem,5vw,5.8rem)] font-bold leading-[.9] tracking-[-.07em]">
              <span className="project-heading-mask"><span className="project-heading-line">El lugar cambia.</span></span>
              <span className="project-heading-mask"><span className="project-heading-line">La respuesta</span></span>
              <span className="project-heading-mask project-heading-mask-accent"><span className="project-heading-line">también.</span></span>
            </h2>
          </div>
          <div className="border-l border-technical-yellow/75 pl-6 lg:mb-1 lg:pl-8">
            <p className="max-w-lg text-base leading-7 text-white/62 sm:text-lg">Vivienda, hospitalidad, ciudad, comunidad y producción bajo una misma lectura territorial.</p>
            <p className="mt-3 font-mono text-[7px] uppercase tracking-[.16em] text-white/34">Visualizaciones conceptuales · No corresponden a obras ejecutadas</p>
          </div>
        </div>

        <div role="tablist" aria-label="Proyectos referenciales" className="project-blades flex min-h-[620px] flex-col gap-px bg-white/15 lg:min-h-0 lg:flex-1 lg:flex-row">
          {projects.map((project, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={project.number}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIndex(index)}
                onPointerEnter={() => setActiveIndex(index)}
                className={cn("project-blade group relative min-h-[420px] overflow-hidden bg-charcoal text-left focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-technical-yellow lg:min-h-0", selected ? "is-active lg:flex-[4.2]" : "lg:flex-[.72]")}
              >
                <Image src={project.image} alt={`Visualización conceptual: ${project.name}`} fill sizes={selected ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 180px, 100vw"} className="project-blade-image object-cover" />
                <span aria-hidden className="project-blade-shade absolute inset-0" />
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-technical-yellow transition-transform duration-500" />

                <span className="absolute left-5 top-5 z-10 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/70 lg:left-6 lg:top-6"><span className="text-technical-yellow">{project.number}</span><span className={cn("transition-opacity duration-300", selected ? "opacity-100" : "lg:opacity-0")}>{project.type}</span></span>

                <span className={cn("project-blade-vertical absolute inset-x-0 bottom-7 z-10 hidden items-center justify-center font-heading text-lg font-semibold tracking-[-.03em] text-white lg:flex", selected && "lg:pointer-events-none lg:opacity-0")}><span>{project.name}</span></span>

                <span className={cn("project-blade-content absolute inset-x-0 bottom-0 z-10 block p-7 sm:p-9 lg:p-10 xl:p-12", selected ? "opacity-100" : "lg:pointer-events-none lg:opacity-0")}>
                  <span className="font-mono text-[8px] uppercase tracking-[.18em] text-technical-yellow">{project.location} · {project.scope}</span>
                  <span className="mt-4 flex items-end justify-between gap-8">
                    <span>
                      <span className="project-blade-title block font-heading text-[clamp(2.8rem,4.4vw,5rem)] font-semibold leading-[.9] tracking-[-.065em]">{project.name}</span>
                      <span className="project-blade-description mt-5 block max-w-xl text-base leading-7 text-white/72 sm:text-lg">{project.description}</span>
                    </span>
                    <span className="project-blade-action hidden size-12 shrink-0 place-items-center border border-white/35 text-technical-yellow sm:grid"><ArrowUpRight aria-hidden className="size-5" /></span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
