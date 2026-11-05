"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { WorkCollection } from "@/data/projects";
import { cn } from "@/lib/utils";

export function WorkGallery({ collection, onClose }: { collection: WorkCollection; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = collection.photos[index];
  const move = (direction: number) => setIndex((value) => (value + direction + collection.photos.length) % collection.photos.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="work-gallery-title"
      className="work-gallery"
      onClose={() => { if (!dialogRef.current?.open) onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="work-gallery-panel">
        <header className="flex items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-technical-yellow">Obras realizadas · PPYM</p>
            <h3 id="work-gallery-title" className="mt-1 font-heading text-xl font-semibold">{collection.name}</h3>
          </div>
          <button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label="Cerrar galería" className="gallery-control"><X aria-hidden size={22} /></button>
        </header>

        <figure className="min-h-0 flex-1 flex flex-col">
          <div className="relative min-h-0 flex-1 bg-black/25">
            <Image key={current.src} src={current.src} alt={current.alt} fill loading="eager" sizes="(min-width: 1280px) 1200px, 100vw" className="object-contain" />
          </div>
          <figcaption className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-white/90">{current.caption}</p>
              <p className="mt-1 font-mono text-[10px] text-white/55">{String(index + 1).padStart(2, "0")} / {String(collection.photos.length).padStart(2, "0")}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Foto anterior" className="gallery-control"><ChevronLeft aria-hidden size={22} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Foto siguiente" className="gallery-control"><ChevronRight aria-hidden size={22} /></button>
            </div>
          </figcaption>
        </figure>

        <div aria-label="Seleccionar fotografía" className="flex shrink-0 gap-2 overflow-x-auto border-t border-white/15 px-4 py-3 sm:px-6">
          {collection.photos.map((item, photoIndex) => (
            <button key={item.src} type="button" aria-label={`Ver foto ${photoIndex + 1}: ${item.caption}`} aria-pressed={photoIndex === index} onClick={() => setIndex(photoIndex)} className={cn("gallery-thumbnail relative h-14 w-20 shrink-0 overflow-hidden border-2", photoIndex === index ? "border-technical-yellow" : "border-transparent opacity-60 hover:opacity-100")}>
              <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
