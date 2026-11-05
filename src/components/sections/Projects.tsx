"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WorkGallery } from "@/components/ui/WorkGallery";
import { workCollections } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
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
    <section ref={sectionRef} id="proyectos" aria-labelledby="projects-title" className={cn("projects-section relative scroll-mt-20 overflow-hidden bg-charcoal py-20 text-white lg:h-[calc(100svh-1.9rem)] lg:min-h-[844px] lg:scroll-mt-24 lg:pt-8 lg:pb-24", headingArmed && "heading-armed", headingVisible && "heading-visible")}>
      <div aria-hidden className="technical-grid absolute inset-0 opacity-20" />
      <Container className="relative lg:flex lg:h-full lg:flex-col">
        <div className="flex items-center justify-between gap-6 border-b border-white/15 pb-4">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-white/55"><span className="h-px w-8 bg-technical-yellow" />Proyectos</p>
          <p className="hidden font-mono text-[9px] uppercase tracking-[.2em] text-white/60 sm:block">Registro fotográfico · PPYM</p>
        </div>

        <div className="projects-heading-block grid items-end gap-6 py-7 lg:grid-cols-[1fr_.75fr]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-technical-yellow">Obras realizadas</p>
            <h2 ref={headingRef} id="projects-title" className="project-heading mt-3 max-w-[16ch] font-heading text-[clamp(3.2rem,5vw,5.8rem)] font-bold leading-[.9] tracking-[-.07em]">
              <span className="project-heading-mask"><span className="project-heading-line">Obras que hablan</span></span>
              <span className="project-heading-mask"><span className="project-heading-line">por</span></span>{" "}
              <span className="project-heading-mask project-heading-mask-accent"><span className="project-heading-line">nosotros.</span></span>
            </h2>
          </div>
          <div className="border-l border-technical-yellow/75 pl-6 lg:mb-1 lg:pl-8">
            <p className="projects-heading-description max-w-lg text-base leading-7 text-white/75 sm:text-lg">De la fachada a los detalles interiores. Conoce nuestras viviendas y los acabados de cada espacio.</p>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[.16em] text-white/55">Explora las galerías · 14 fotografías</p>
          </div>
        </div>

        <div aria-label="Galerías de obras realizadas" className="project-blades flex min-h-[620px] flex-col gap-px bg-white/15 lg:min-h-0 lg:flex-1 lg:flex-row">
          {workCollections.map((project, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={project.number}
                type="button"
                aria-label={`Ver galería de ${project.name.toLowerCase()}: ${project.photos.length} fotografías`}
                aria-haspopup="dialog"
                onClick={() => { setActiveIndex(index); setGalleryIndex(index); }}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={cn("project-blade group relative min-h-[420px] overflow-hidden bg-charcoal text-left focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-technical-yellow lg:min-h-0", selected ? "is-active lg:flex-[2.2]" : "lg:flex-1")}
              >
                <Image src={project.photos[0].src} alt={project.photos[0].alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="project-blade-image object-cover" />
                <span aria-hidden className="project-blade-shade absolute inset-0" />
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-technical-yellow transition-transform duration-500" />

                <span className="absolute left-5 top-5 z-10 flex items-center gap-3 bg-charcoal/65 px-3 py-2 font-mono text-[9px] uppercase tracking-[.18em] text-white/90 lg:left-6 lg:top-6"><span className="text-technical-yellow">{project.number}</span><span>{project.photos.length} fotografías</span></span>

                <span className={cn("project-blade-vertical absolute inset-x-0 bottom-7 z-10 hidden items-center justify-center font-heading text-lg font-semibold tracking-[-.03em] text-white lg:flex", selected && "lg:pointer-events-none lg:opacity-0")}><span>{project.name}</span></span>

                <span className={cn("project-blade-content absolute inset-x-0 bottom-0 z-10 block p-7 sm:p-9 lg:p-10 xl:p-12", selected ? "opacity-100" : "lg:pointer-events-none lg:opacity-0")}>
                  <span className="font-mono text-[9px] uppercase tracking-[.18em] text-technical-yellow">Obras realizadas por PPYM</span>
                  <span className="mt-4 flex items-end justify-between gap-8">
                    <span>
                      <span className="project-blade-title block font-heading text-[clamp(2.8rem,4.4vw,5rem)] font-semibold leading-[.9] tracking-[-.065em]">{project.name}</span>
                      <span className="project-blade-description mt-5 block max-w-xl text-base leading-7 text-white/72 sm:text-lg">{project.description}</span>
                      <span className="mt-4 inline-flex items-center gap-2 border-b border-technical-yellow/60 pb-1 text-xs font-semibold text-technical-yellow">Ver fotografías <ArrowUpRight aria-hidden size={15} /></span>
                    </span>
                    <span className="project-blade-action hidden size-12 shrink-0 place-items-center border border-white/35 text-technical-yellow sm:grid"><ArrowUpRight aria-hidden className="size-5" /></span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>
      {galleryIndex !== null && <WorkGallery collection={workCollections[galleryIndex]} onClose={() => setGalleryIndex(null)} />}
    </section>
  );
}
