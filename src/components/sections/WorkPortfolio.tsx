"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { workCollections, type WorkPhoto } from "@/data/projects";
import { WorkPageTurn } from "@/components/sections/WorkPageTurn";

const pages: { label: string; caption: string; photos: WorkPhoto[] }[] = [
  { label: "Fachadas", caption: "Vivienda y acabados exteriores", photos: [workCollections[0].photos[0]] },
  { label: "Interiores", caption: "Ambientes conectados", photos: [workCollections[1].photos[1]] },
  { label: "Detalles", caption: "Revestimientos y acabados de baño", photos: workCollections[2].photos.slice(0, 2) },
];

export function WorkPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<{ from: number; to: number; direction: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState<Set<string>>(() => new Set());
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const [requested, setRequested] = useState<{ to: number; direction: number } | null>(null);
  const displayed = turn?.to ?? index;
  const automatic = !paused;
  const playing = automatic && visible && pageVisible && !turn && !requested && pages[index].photos.every((photo) => ready.has(photo.src));

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const element = rootRef.current;
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
      : null;
    if (element) observer?.observe(element);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!requested || turn) return;
    if (!pages[requested.to].photos.every((photo) => ready.has(photo.src))) return;
    const frame = window.requestAnimationFrame(() => {
      setTurn({ from: index, ...requested });
      setRequested(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [requested, turn, ready, index]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setRequested({ to: (index + 1) % pages.length, direction: 1 }), 6000);
    return () => window.clearTimeout(timer);
  }, [playing, index]);

  const markReady = (src: string) => setReady((previous) => previous.has(src) ? previous : new Set([...previous, src]));
  const select = (to: number, direction: number) => {
    setPaused(true);
    if (turn) return;
    setRequested(to === index ? null : { to, direction });
  };

  const photos = (pageIndex: number, decorative = false) => (
    <div className={`work-portfolio-photos ${pages[pageIndex].photos.length > 1 ? "is-pair" : ""}`}>
      {pages[pageIndex].photos.map((photo) => (
        <div className="work-portfolio-photo" key={photo.src}>
          {failed.has(photo.src) ? <p className="p-6 text-sm text-white/70">Fotografía no disponible.</p> : (
            <Image
              src={photo.src}
              alt={decorative ? "" : photo.alt}
              fill
              sizes={pages[pageIndex].photos.length > 1 ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 50vw, 100vw"}
              className="object-cover"
              loading={decorative || pageIndex === requested?.to ? "eager" : "lazy"}
              onLoad={decorative ? undefined : () => markReady(photo.src)}
              onError={decorative ? undefined : () => { setFailed((previous) => new Set([...previous, photo.src])); markReady(photo.src); }}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="work-portfolio">
      <div className="work-portfolio-copy">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-technical-yellow">Álbum de obra · PPYM</p>
        <h2 id="differentiators-title" className="work-portfolio-title font-heading font-bold">
          Nuestras obras, <span>en detalle.</span>
        </h2>
        <p className="work-portfolio-description">De la fachada al interior, recorre los ambientes y acabados de las viviendas que hemos construido.</p>
        <a href="#proyectos" className="work-portfolio-link">Ver galería completa <ArrowDownRight aria-hidden size={18} /></a>
      </div>

      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Fotografías de obras de PPYM"
        className="work-portfolio-album"
        onFocusCapture={(event) => { if (!(event.target as HTMLElement).closest(".work-portfolio-play")) setPaused(true); }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const direction = event.key === "ArrowLeft" ? -1 : 1;
          select((index + direction + pages.length) % pages.length, direction);
        }}
      >
        <div className="work-portfolio-toolbar">
          <span className="font-mono text-[10px] uppercase tracking-[.16em] text-white/65">Registro fotográfico</span>
          <button type="button" className="work-portfolio-play" onClick={() => { setPaused(automatic); if (automatic) setRequested(null); }} aria-label={automatic ? "Pausar presentación" : "Reproducir presentación"}>
            {automatic ? <Pause aria-hidden size={14} /> : <Play aria-hidden size={14} />}
            <span>{automatic ? "Pausar" : "Reproducir"}</span>
          </button>
        </div>

        <div className="work-portfolio-frame" aria-busy={!!requested || !!turn}>
          {pages.map((page, pageIndex) => (
            <div key={page.label} role="group" aria-roledescription="diapositiva" aria-label={`${pageIndex + 1} de ${pages.length}: ${page.caption}`} aria-hidden={pageIndex !== displayed} className="work-portfolio-page" style={{ opacity: pageIndex === displayed ? 1 : 0 }}>
              {photos(pageIndex)}
            </div>
          ))}
          {turn && <WorkPageTurn direction={turn.direction} onComplete={() => { setIndex(turn.to); setTurn(null); }}>{photos(turn.from, true)}</WorkPageTurn>}
        </div>

        <div className="work-portfolio-caption">
          <div aria-live={automatic ? "off" : "polite"} aria-atomic="true">
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-technical-yellow">{index + 1} de {pages.length} · {pages[index].label}</p>
            <p className="mt-1.5 text-sm text-white/85">{pages[index].caption}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" className="work-portfolio-arrow" aria-label="Página anterior" disabled={!!turn} onClick={() => select((index - 1 + pages.length) % pages.length, -1)}><ChevronLeft aria-hidden size={19} /></button>
            <button type="button" className="work-portfolio-arrow" aria-label="Página siguiente" disabled={!!turn} onClick={() => select((index + 1) % pages.length, 1)}><ChevronRight aria-hidden size={19} /></button>
          </div>
        </div>

        <div className="work-portfolio-pagination" aria-label="Elegir página del portafolio">
          {pages.map((page, pageIndex) => (
            <button key={page.label} type="button" aria-label={`Ver ${page.label.toLowerCase()}`} aria-current={pageIndex === index ? "true" : undefined} disabled={!!turn} onClick={() => select(pageIndex, pageIndex > index ? 1 : -1)}>
              <span className="work-portfolio-page-label">{page.label}</span>
              <span className="work-portfolio-page-rule"><span key={`${index}-${playing}`} className={pageIndex === index && playing ? "is-playing" : ""} /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
