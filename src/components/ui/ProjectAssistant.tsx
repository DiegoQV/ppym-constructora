"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageSquareText, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Step = "service" | "location" | "stage" | "details" | "summary";
type Message = { id: number; author: "assistant" | "visitor"; text: string };

const stageOptions = ["Solo es una idea", "Estoy evaluando opciones", "Ya tengo documentos o planos", "Necesito iniciar pronto"];
const initialMessages: Message[] = [
  { id: 1, author: "assistant", text: "Hola, soy el asistente de proyectos de PPYM." },
  { id: 2, author: "assistant", text: "Te ayudaré a ordenar tu consulta para que nuestro equipo pueda orientarte mejor. ¿Qué servicio necesitas?" },
];

function AssistantMark() {
  return (
    <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden bg-technical-yellow text-charcoal">
      <span aria-hidden className="absolute inset-0 opacity-20 technical-grid-dark" />
      <MessageSquareText aria-hidden className="relative size-4.5" strokeWidth={2.2} />
    </span>
  );
}

interface ProjectAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectAssistant({ open, onOpenChange }: ProjectAssistantProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(3);
  const [step, setStep] = useState<Step>("service");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [details, setDetails] = useState("");
  const [draft, setDraft] = useState("");

  const addMessages = (...items: Omit<Message, "id">[]) => {
    setMessages((current) => [...current, ...items.map((item) => ({ ...item, id: messageId.current++ }))]);
  };

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => panelRef.current?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const conversation = scrollRef.current;
    if (step === "service" && messages.length === initialMessages.length) {
      conversation?.scrollTo({ top: 0, behavior: "instant" });
    } else {
      conversation?.scrollTo({ top: conversation.scrollHeight, behavior: "smooth" });
    }
    if (step === "location" || step === "details") window.setTimeout(() => inputRef.current?.focus(), 220);
  }, [messages, open, step]);

  const chooseService = (value: string) => {
    setService(value);
    addMessages(
      { author: "visitor", text: value },
      { author: "assistant", text: "Perfecto. ¿En qué distrito, ciudad o zona se encuentra el proyecto?" },
    );
    setStep("location");
  };

  const submitText = (event: FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setDraft("");
    if (step === "location") {
      setLocation(value);
      addMessages(
        { author: "visitor", text: value },
        { author: "assistant", text: "¿En qué etapa se encuentra actualmente?" },
      );
      setStep("stage");
      return;
    }
    if (step === "details") {
      setDetails(value);
      addMessages(
        { author: "visitor", text: value },
        { author: "assistant", text: "Listo. Organicé tu consulta para enviarla directamente al equipo de PPYM." },
      );
      setStep("summary");
    }
  };

  const chooseStage = (value: string) => {
    setProjectStage(value);
    addMessages(
      { author: "visitor", text: value },
      { author: "assistant", text: "Cuéntame brevemente qué necesitas o qué dificultad deseas resolver." },
    );
    setStep("details");
  };

  const reset = () => {
    setStep("service");
    setMessages(initialMessages);
    setService("");
    setLocation("");
    setProjectStage("");
    setDetails("");
    setDraft("");
    messageId.current = 3;
  };

  const whatsappMessage = [
    "Hola, quisiera solicitar orientación para un proyecto.",
    "",
    `• Servicio: ${service}`,
    `• Ubicación: ${location}`,
    `• Etapa: ${projectStage}`,
    `• Necesidad: ${details}`,
    "",
    "Consulta preparada desde el asistente web de PPYM.",
  ].join("\n");

  const progress = ({ service: 1, location: 2, stage: 3, details: 4, summary: 5 } as const)[step];
  const showComposer = step === "location" || step === "details";

  return (
    <>
      <button
        type="button"
        aria-label="Abrir asistente de proyectos"
        aria-expanded={open}
        aria-controls="project-assistant"
        onClick={() => onOpenChange(true)}
        className={cn(
          "assistant-launcher group fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-40 grid size-13 place-items-center text-white transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow sm:bottom-[calc(6.5rem+env(safe-area-inset-bottom))] sm:right-6 sm:size-16",
          open && "pointer-events-none translate-y-2 scale-90 opacity-0",
        )}
      >
        <span aria-hidden className="assistant-launcher-shape absolute inset-0 bg-technical-yellow" />
        <span aria-hidden className="assistant-launcher-core absolute inset-[2px] bg-charcoal transition-colors duration-300 group-hover:bg-graphite" />
        <span aria-hidden className="absolute inset-[2px] opacity-55 technical-grid" />
        <span aria-hidden className="relative grid size-8 place-items-center sm:size-10">
          <span className="absolute inset-0 border border-white/18" />
          <span className="absolute -left-1 top-1/2 h-px w-2 bg-technical-yellow" />
          <span className="absolute -right-1 top-1/2 h-px w-2 bg-technical-yellow" />
          <span className="absolute left-1/2 -top-1 h-2 w-px bg-technical-yellow" />
          <span className="absolute bottom-[-4px] left-1/2 h-2 w-px bg-technical-yellow" />
          <MessageSquareText className="relative size-4.5 transition-transform duration-300 group-hover:scale-110 sm:size-5" strokeWidth={1.8} />
        </span>
        <span aria-hidden className="absolute right-1.5 top-1.5 size-2 bg-technical-yellow ring-2 ring-charcoal sm:right-2 sm:top-2" />
        <span role="tooltip" className="pointer-events-none absolute right-[calc(100%+.75rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap border border-white/12 bg-charcoal px-3 py-2 text-left text-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,.32)] transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100 sm:block">
          <span className="block font-heading text-xs font-semibold">Asistente de proyectos</span>
          <span className="mt-1 block font-mono text-[7px] uppercase tracking-[.14em] text-technical-yellow">Orientación inicial</span>
        </span>
      </button>

      <section
        id="project-assistant"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "assistant-panel fixed inset-x-2 bottom-[calc(.5rem+env(safe-area-inset-bottom))] z-60 flex h-[min(43rem,calc(100svh-1rem))] flex-col overflow-hidden border border-charcoal/10 bg-warm-white shadow-[0_28px_80px_rgba(0,0,0,.32)] outline-none transition-[opacity,transform,visibility] duration-400 sm:inset-x-auto sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] sm:right-7 sm:h-[min(42rem,calc(100svh-3.5rem))] sm:w-[25rem]",
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible pointer-events-none translate-y-8 scale-[.97] opacity-0",
        )}
      >
        <header className="relative shrink-0 overflow-hidden bg-charcoal px-5 pb-4 pt-5 text-white">
          <span aria-hidden className="absolute inset-0 opacity-60 technical-grid" />
          <span aria-hidden className="absolute -right-10 -top-16 size-36 rounded-full border border-technical-yellow/20" />
          <div className="relative flex items-start gap-3">
            <AssistantMark />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 id={titleId} className="font-heading text-base font-semibold tracking-[-.025em]">Asistente de proyectos</h2>
                <span className="inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[.16em] text-technical-yellow"><span className="size-1.5 rounded-full bg-technical-yellow" /> Activo</span>
              </div>
              <p className="mt-1 text-xs text-white/58">PPYM · Orientación inicial</p>
            </div>
            <button type="button" onClick={() => onOpenChange(false)} aria-label="Cerrar asistente" className="grid size-10 -translate-y-1 translate-x-1 place-items-center text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-technical-yellow"><X aria-hidden className="size-5" /></button>
          </div>
          <div className="relative mt-4 flex items-center gap-3">
            <div className="h-px flex-1 overflow-hidden bg-white/12"><span className="block h-full bg-technical-yellow transition-[width] duration-500" style={{ width: `${progress * 20}%` }} /></div>
            <span className="font-mono text-[8px] tracking-[.14em] text-white/50">0{progress} / 05</span>
          </div>
        </header>

        <div ref={scrollRef} className="assistant-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5" aria-live="polite" aria-relevant="additions">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("assistant-message flex items-end gap-2", message.author === "visitor" ? "assistant-message-visitor justify-end" : "assistant-message-system")}
                style={{ animationDelay: message.id === 1 ? "120ms" : message.id === 2 ? "520ms" : message.author === "assistant" ? "260ms" : "30ms" }}
              >
                {message.author === "assistant" && <span className="mb-1 grid size-6 shrink-0 place-items-center bg-charcoal text-technical-yellow"><Sparkles aria-hidden className="size-3" /></span>}
                <p className={cn(
                  "max-w-[82%] px-4 py-3 text-[13px] leading-5 shadow-[0_6px_18px_rgba(17,19,21,.07)]",
                  message.author === "assistant" ? "rounded-r-xl rounded-tl-xl border border-charcoal/8 bg-white text-charcoal" : "rounded-l-xl rounded-tr-xl bg-charcoal text-white",
                )}>{message.text}</p>
              </div>
            ))}
          </div>

          {step === "service" && (
            <div className="mt-5 grid gap-2 pl-8">
              {services.map((item, index) => <button key={item.id} type="button" onClick={() => chooseService(item.title)} style={{ animationDelay: `${880 + index * 65}ms` }} className="assistant-option group flex min-h-11 items-center justify-between border border-charcoal/12 bg-white px-3.5 py-2.5 text-left text-xs font-semibold text-charcoal transition hover:border-charcoal hover:bg-charcoal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technical-yellow"><span>{item.title}</span><ArrowRight aria-hidden className="size-3.5 shrink-0 text-technical-yellow transition-transform group-hover:translate-x-0.5" /></button>)}
              <button type="button" onClick={() => chooseService("Otro servicio o consulta general")} style={{ animationDelay: `${880 + services.length * 65}ms` }} className="assistant-option min-h-11 border border-dashed border-charcoal/25 px-3.5 py-2.5 text-left text-xs font-semibold text-text-gray transition hover:border-charcoal hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technical-yellow">Otro servicio o consulta general</button>
            </div>
          )}

          {step === "stage" && (
            <div className="mt-5 grid gap-2 pl-8">
              {stageOptions.map((option, index) => <button key={option} type="button" onClick={() => chooseStage(option)} style={{ animationDelay: `${560 + index * 70}ms` }} className="assistant-option group flex min-h-11 items-center gap-3 border border-charcoal/12 bg-white px-3.5 py-2.5 text-left text-xs font-semibold text-charcoal transition hover:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technical-yellow"><span className="grid size-5 shrink-0 place-items-center border border-charcoal/20 text-transparent transition group-hover:border-technical-yellow group-hover:bg-technical-yellow group-hover:text-charcoal"><Check aria-hidden className="size-3" /></span>{option}</button>)}
            </div>
          )}

          {step === "summary" && (
            <div className="ml-8 mt-5 border border-charcoal/12 bg-white shadow-[0_12px_28px_rgba(17,19,21,.08)]">
              <div className="flex items-center justify-between border-b border-charcoal/10 px-4 py-3"><span className="font-mono text-[8px] uppercase tracking-[.17em] text-text-gray">Resumen del proyecto</span><Check aria-hidden className="size-4 text-technical-yellow" /></div>
              <dl className="divide-y divide-charcoal/8 px-4">
                {[["Servicio", service], ["Ubicación", location], ["Etapa", projectStage], ["Necesidad", details]].map(([label, value]) => <div key={label} className="grid grid-cols-[5rem_1fr] gap-2 py-3"><dt className="text-[10px] font-semibold uppercase tracking-[.08em] text-text-gray">{label}</dt><dd className="text-xs leading-5 text-charcoal">{value}</dd></div>)}
              </dl>
              <a href={createWhatsAppUrl(company.phone, whatsappMessage)} target="_blank" rel="noopener noreferrer" className="group flex min-h-13 items-center justify-between bg-technical-yellow px-4 text-sm font-semibold text-charcoal transition hover:bg-technical-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"><span>Continuar por WhatsApp</span><Send aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></a>
              <button type="button" onClick={reset} className="flex min-h-11 w-full items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-text-gray transition hover:text-charcoal focus-visible:outline-2 focus-visible:outline-technical-yellow"><RotateCcw aria-hidden className="size-3.5" /> Iniciar otra consulta</button>
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-charcoal/10 bg-white p-3">
          {showComposer ? (
            <form onSubmit={submitText} className="flex gap-2">
              <label htmlFor={`${titleId}-input`} className="sr-only">{step === "location" ? "Ubicación del proyecto" : "Descripción de la necesidad"}</label>
              <input ref={inputRef} id={`${titleId}-input`} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={step === "location" ? 80 : 350} placeholder={step === "location" ? "Ej. Chachapoyas, Amazonas" : "Describe brevemente tu proyecto..."} className="min-w-0 flex-1 border border-charcoal/18 bg-warm-white px-3.5 text-sm text-charcoal outline-none transition placeholder:text-text-gray/65 focus:border-charcoal focus:ring-1 focus:ring-charcoal" />
              <button type="submit" disabled={!draft.trim()} aria-label="Enviar respuesta" className="grid size-12 shrink-0 place-items-center bg-charcoal text-white transition hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technical-yellow disabled:cursor-not-allowed disabled:opacity-35"><ArrowRight aria-hidden className="size-5" /></button>
            </form>
          ) : (
            <div className="flex min-h-12 items-center justify-center gap-2 text-center text-[10px] text-text-gray"><span className="size-1.5 rounded-full bg-technical-yellow" /> Tus respuestas solo se enviarán cuando abras WhatsApp.</div>
          )}
          {step !== "summary" && (
            <div className="mt-2 flex items-center justify-between gap-3">
              {step !== "service" ? <button type="button" onClick={reset} className="inline-flex min-h-8 items-center gap-1.5 px-1 text-[10px] font-semibold text-text-gray transition hover:text-charcoal focus-visible:outline-2 focus-visible:outline-technical-yellow"><ArrowLeft aria-hidden className="size-3" /> Volver a empezar</button> : <span />}
              <a href={createWhatsAppUrl(company.phone, "Hola, prefiero conversar directamente con un asesor de PPYM.")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-[10px] font-semibold text-charcoal underline decoration-technical-yellow decoration-2 underline-offset-4 transition hover:text-text-gray focus-visible:outline-2 focus-visible:outline-technical-yellow">Hablar con una persona <ArrowRight aria-hidden className="size-3" /></a>
            </div>
          )}
        </footer>
      </section>
    </>
  );
}
