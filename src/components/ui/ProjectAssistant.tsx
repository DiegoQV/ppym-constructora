"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, RotateCcw, X, ZoomIn } from "lucide-react";
import { WorkGallery } from "@/components/ui/WorkGallery";
import { company, officeMap } from "@/data/company";
import type { WorkPhoto } from "@/data/projects";
import { catalogReply, photos, shortcuts, type Turn } from "@/lib/project-chat";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const greeting: Turn = { role: "assistant", text: "Hola, soy el asistente virtual de PPYM. ¿Quieres construir, conocer nuestras viviendas o consultar por un trámite?" };
const chip = "rounded-full border border-charcoal/20 bg-white px-3 py-2 text-xs font-semibold hover:border-charcoal";
type Gallery = { items: WorkPhoto[]; index: number };

export function ProjectAssistant({ open, onOpenChange, headerLauncher }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerLauncher: RefObject<HTMLButtonElement | null>;
}) {
  const [turns, setTurns] = useState<Turn[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [failedPrompt, setFailedPrompt] = useState<string | null>(null);
  const [selected, setSelected] = useState("");
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [summary, setSummary] = useState("");
  const [handoff, setHandoff] = useState<string | null>(null);
  const panel = useRef<HTMLElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const pending = useRef<AbortController | null>(null);
  const note = useRef<HTMLTextAreaElement>(null);
  const reviewingContact = handoff !== null;
  const reference = photos.find(photo => photo.src === selected);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus({ preventScroll: true });
    const target = launcher.current;
    const headerButton = headerLauncher.current;
    const viewport = window.visualViewport;
    const resize = () => {
      if (!viewport || !panel.current) return;
      panel.current.style.setProperty("--chat-height", viewport.height + "px");
      panel.current.style.setProperty("--keyboard", Math.max(0, innerHeight - viewport.height - viewport.offsetTop) + "px");
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
      const visibleLauncher = headerButton?.getClientRects().length ? headerButton : target;
      visibleLauncher?.focus({ preventScroll: true });
    };
  }, [open, headerLauncher]);
  useEffect(() => {
    if (open && feed.current) feed.current.scrollTop = feed.current.scrollHeight;
  }, [turns, busy, failedPrompt, open, reviewingContact]);
  useEffect(() => () => pending.current?.abort(), []);

  function restart() {
    pending.current?.abort();
    pending.current = null;
    setTurns([greeting]); setDraft(""); setSelected(""); setSummary("");
    setFailedPrompt(null); setHandoff(null); setBusy(false);
  }

  async function send(input: string, local = false, retry = false) {
    const text = input.trim();
    if (!text || pending.current) return;
    const history: Turn[] = retry ? turns : [...turns, { role: "user", text }];
    setTurns(history); setFailedPrompt(null); setHandoff(null);
    if (!retry) setDraft("");
    const catalog = catalogReply(text, selected, turns);
    if (catalog.directions || local || shortcuts.includes(text)) {
      setTurns([...history, { role: "assistant", ...catalog }]);
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true);
    const timeout = setTimeout(() => controller.abort(), 16000);
    try {
      const result = await fetch("/api/asistente", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ history: history.slice(-10), summary, selected }),
      });
      if (!result.ok) throw new Error("unavailable");
      const reply = await result.json();
      if (pending.current !== controller) return;
      setTurns([...history, { role: "assistant", text: reply.text, photos: reply.photos, contact: reply.contact, registration: catalog.registration }]);
      setSummary(reply.summary);
    } catch {
      if (pending.current !== controller) return;
      setFailedPrompt(text);
    } finally {
      clearTimeout(timeout);
      if (pending.current === controller) { pending.current = null; setBusy(false); }
    }
  }

  function useCatalog() {
    if (!failedPrompt || pending.current) return;
    const reply = catalogReply(failedPrompt, selected, turns.slice(0, -1));
    setTurns([...turns, { role: "assistant", ...reply }]);
    setSummary(previous => [previous, failedPrompt].filter(Boolean).join("\n").slice(-800));
    setFailedPrompt(null);
  }

  function prepareContact() {
    const details = summary
      ? [summary, failedPrompt].filter(Boolean).join("\n")
      : turns.filter(t => t.role === "user" && !shortcuts.includes(t.text)).slice(-4).map(t => t.text).join("\n");
    setHandoff(["Hola, quisiera consultar sobre un proyecto con PPYM.", details, reference && "Foto de referencia: " + reference.caption].filter(Boolean).join("\n\n"));
    requestAnimationFrame(() => note.current?.focus());
  }

  return <>
    <button ref={launcher} type="button" aria-label="Abrir asistente de proyectos" aria-expanded={open} aria-controls="project-assistant"
      hidden={open} onClick={() => onOpenChange(true)}
      className="assistant-launcher fixed right-6 bottom-26 z-40 size-16 rounded-2xl border-2 border-technical-yellow bg-charcoal text-technical-yellow shadow-lg max-[1180px]:hidden">
      <Image src="/ppym-assistant.webp" alt="" width={48} height={48} className="mx-auto size-12 object-contain drop-shadow-[0_0_5px_rgba(231,185,40,.25)]" />
    </button>
    {open && <section id="project-assistant" ref={panel} role="dialog" aria-labelledby="chat-title" tabIndex={-1}
      onKeyDown={e => { if (e.key === "Escape" && !gallery) onOpenChange(false); }}
      className="assistant-panel fixed inset-x-2 bottom-[calc(.5rem+env(safe-area-inset-bottom)+var(--keyboard,0px))] z-60 flex h-[min(44rem,calc(var(--chat-height,100dvh)-1rem-env(safe-area-inset-bottom)))] flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-warm-white text-charcoal shadow-[0_16px_64px_#11131545] outline-none sm:left-auto sm:right-6 sm:w-[26rem]">
      <header className="flex shrink-0 items-center gap-2 border-b border-technical-yellow/25 bg-charcoal px-3 py-4 text-white">
        <Image src="/ppym-assistant.webp" alt="" width={44} height={44} className="size-11 shrink-0 object-contain drop-shadow-[0_0_7px_rgba(231,185,40,.25)]" />
        <div className="min-w-0 flex-1">
          <h2 id="chat-title" className="font-heading text-lg font-bold leading-tight">Asistente <span className="text-technical-yellow">PPYM</span></h2>
          <p className="mt-1 text-xs leading-snug text-white/70">Conversemos sobre tu próxima obra</p>
        </div>
        {turns.length > 1 && <button type="button" aria-label="Nueva conversación" title="Nueva conversación" onClick={restart} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-white/10"><RotateCcw size={17}/></button>}
        <button type="button" aria-label="Cerrar asistente" onClick={() => onOpenChange(false)} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-white/10"><X size={20}/></button>
      </header>
      <div ref={feed} className="assistant-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5">
        <div role="log" aria-label="Conversación" aria-live="polite" className="space-y-3">
          {turns.map((turn, index) => {
            const items = (turn.photos || []).flatMap(src => photos.find(photo => photo.src === src) || []);
            return <div key={index} className={turn.role === "user" ? "ml-9 flex justify-end" : "mr-3"}>
              <div className={turn.role === "user" ? "rounded-2xl rounded-br-sm bg-charcoal px-4 py-3 text-white" : "min-w-0 rounded-2xl rounded-bl-sm border border-charcoal/10 bg-white p-3.5"}>
                <p className="whitespace-pre-line wrap-anywhere text-[15px] leading-relaxed">{turn.text}</p>
                {!!items.length && <div aria-label="Fotografías de PPYM" className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2">
                  {items.map((photo, i) => <button key={photo.src} type="button" aria-label={"Ampliar " + photo.caption} onClick={() => { setSelected(photo.src); setGallery({ items, index: i }); }}
                    className="w-[86%] max-w-64 shrink-0 snap-start overflow-hidden rounded-lg border border-charcoal/10 text-left">
                    <span className="relative block aspect-[4/3]"><Image src={photo.src} alt={photo.alt} fill sizes="250px" className="object-cover" /><ZoomIn aria-hidden size={23} className="absolute right-2 bottom-2 rounded bg-charcoal/80 p-1 text-white" /></span>
                    <span className="block px-2 py-2 font-heading text-xs font-semibold">{photo.caption}</span>
                  </button>)}
                </div>}
                {turn.directions && (
                  <a
                    href={officeMap.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={chip + " mt-3 inline-flex min-h-11 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"}
                  >
                    Cómo llegar en Google Maps
                    <ArrowUpRight aria-hidden className="size-3.5 shrink-0" />
                  </a>
                )}
                {turn.contact && <button type="button" onClick={prepareContact} className={chip + " mt-3"}>Preparar consulta</button>}
              </div>
            </div>;
          })}
        </div>
        {busy && <p role="status" className="mt-3 text-sm text-text-gray">Preparando respuesta…</p>}
        {failedPrompt && (
          <div className="mt-3 rounded-xl border border-charcoal/15 bg-white p-3">
            <p role="status" className="text-sm text-text-gray">La IA no pudo responder en este momento. Tu pregunta sigue en el chat.</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3">
              <button type="button" onClick={() => void send(failedPrompt, false, true)} className="min-h-11 rounded-lg bg-technical-yellow px-3 text-sm font-semibold">Reintentar con IA</button>
              <button type="button" onClick={useCatalog} className="min-h-11 text-xs font-semibold underline underline-offset-4">Consultar catálogo</button>
            </div>
          </div>
        )}
        {turns.length === 1 && <div className="mt-3 flex flex-wrap gap-2">{shortcuts.map(label => <button type="button" key={label} disabled={busy} onClick={() => send(label, true)} className={chip}>{label}</button>)}</div>}
        {handoff !== null && <div className="mt-4 rounded-xl border border-charcoal/15 bg-white p-3">
          <label htmlFor="ppym-handoff" className="font-heading text-sm font-bold">Tu consulta para el equipo</label>
          <textarea id="ppym-handoff" ref={note} rows={4} value={handoff} onChange={e => setHandoff(e.target.value)} className="my-2 block w-full rounded border border-charcoal/20 p-2 text-base" />
          <a href={createWhatsAppUrl(company.phone, handoff)} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-technical-yellow px-3 py-2 text-sm font-semibold">Abrir WhatsApp</a>
        </div>}
      </div>
      <footer className="shrink-0 border-t border-charcoal/10 bg-white p-3">
        {reference && <p className="mb-2 flex items-center gap-1 text-xs">Referencia: {reference.caption}<button aria-label="Quitar referencia" onClick={() => setSelected("")} className="p-1"><X size={14}/></button></p>}
        <form className="flex items-center gap-2" onSubmit={e => { e.preventDefault(); void send(draft); }}>
          <input aria-label="Tu mensaje" placeholder="Escribe tu consulta…" maxLength={1000} value={draft} onChange={e => setDraft(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-charcoal/20 bg-warm-white px-3 py-2.5 text-base focus:outline-charcoal" />
          <button aria-label="Enviar mensaje" disabled={busy || !draft.trim()} className="grid size-11 place-items-center rounded-xl bg-technical-yellow disabled:opacity-40"><ArrowUp size={21}/></button>
        </form>
        <p className="mt-2 text-[11px] leading-4 text-text-gray">Los proveedores de IA procesan tus mensajes. Evita incluir datos sensibles. <Link href="/privacidad" className="underline">Privacidad</Link></p>
        <button type="button" disabled={busy} onClick={prepareContact} className="mt-1 py-1.5 text-xs font-semibold underline decoration-technical-yellow underline-offset-4">Hablar con el equipo</button>
      </footer>
      {gallery && <WorkGallery collection={{ number: "", name: "Fotos de tu consulta", description: "", photos: gallery.items }} initialIndex={gallery.index} onSelect={setSelected} onClose={() => setGallery(null)} />}
    </section>}
  </>;
}
