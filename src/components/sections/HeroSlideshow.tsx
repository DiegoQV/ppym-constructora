"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";

const slides = [
  { src: "/images/obras/fachada-amarilla-zocalo-rojo.webp", label: "Viviendas con identidad", position: "center 39%" },
  { src: "/images/obras/fachada-iluminada-panoramica.webp", label: "Fachada con iluminación exterior", position: "center 52%", scale: 1.03 },
];
const slideOffsets = slides.slice(1).map((_, index) => index + 1);

export function HeroSlideshow({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const [currentIndex, setIndex] = useState(0);
  const index = currentIndex % slides.length;
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [failed, setFailed] = useState<number[]>([]);
  const [requested, setRequested] = useState<number | null>(null);
  const playing = !paused && visible && pageVisible;

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
      : null;
    if (root.current) observer?.observe(root.current);
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const next = slideOffsets.map(offset => (index + offset) % slides.length).find(candidate => loaded.includes(candidate));
    if (next === undefined) return;
    const timer = window.setTimeout(() => setIndex(next), failed.includes(index) ? 0 : 7000);
    return () => window.clearTimeout(timer);
  }, [index, playing, loaded, failed]);

  const select = (next: number) => {
    setPaused(true);
    if (loaded.includes(next)) {
      setIndex(next);
      setRequested(null);
    } else {
      setRequested(next);
    }
  };
  const step = (direction: number) => {
    const next = slideOffsets.map(offset => (index + direction * offset + slides.length) % slides.length).find(candidate => !failed.includes(candidate));
    if (next !== undefined) select(next);
  };

  return (
    <section ref={root} id="inicio" className="hero-shell hero-immersive relative isolate overflow-hidden bg-charcoal text-white" aria-label="Presentación de PPYM y sus obras" aria-roledescription="carrusel">
      <div className="hero-slides" aria-hidden="true">
        {slides.map((slide, slideIndex) => (
          <div key={slide.src} className={`hero-slide ${slideIndex === index ? "is-active" : ""}`}>
            <div className="hero-slide-frame">
              <Image src={slide.src} alt="" fill sizes="100vw" preload={slideIndex === 0} loading={slideIndex === 0 ? undefined : "eager"} className="hero-slide-image" style={{ "--hero-image-position": slide.position, "--hero-image-scale": slide.scale ?? 1 } as CSSProperties}
                onLoad={() => {
                  setLoaded(current => current.includes(slideIndex) ? current : [...current, slideIndex]);
                  if (requested === slideIndex) {
                    setIndex(slideIndex);
                    setRequested(null);
                  }
                }}
                onError={() => {
                  setFailed(current => current.includes(slideIndex) ? current : [...current, slideIndex]);
                  setRequested(current => current === slideIndex ? null : current);
                }}
              />
            </div>
            <div className="hero-shade hero-shade-sunlit" />
          </div>
        ))}
      </div>
      {children}
      <Container className="hero-slider-footer">
        <span className="sr-only" aria-live={paused ? "polite" : "off"} aria-atomic="true">
          Fotografía {index + 1} de {slides.length}: {slides[index].label}
        </span>
        <div className="hero-slider-controls" role="group" aria-label="Controles de fotografías" onFocusCapture={event => {
          if (!(event.target as HTMLElement).closest(".hero-slider-toggle")) setPaused(true);
        }}>
          <button type="button" className="hero-slider-arrow" aria-label="Foto anterior" onClick={() => step(-1)}><ChevronLeft size={18} /></button>
          <button type="button" className="hero-slider-arrow" aria-label="Foto siguiente" onClick={() => step(1)}><ChevronRight size={18} /></button>
          <button type="button" className="hero-slider-arrow hero-slider-toggle" aria-label={paused ? "Reproducir presentación" : "Pausar presentación"} onClick={() => { setRequested(null); setPaused(!paused); }}>
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </Container>
    </section>
  );
}
