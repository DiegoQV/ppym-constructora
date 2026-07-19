"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import type { Service } from "@/types";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface ServicesExplorerProps {
  services: Service[];
  phone: string;
}

type TransitionPhase = "idle" | "exiting" | "entering";

export function ServicesExplorer({ services, phone }: ServicesExplorerProps) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (switchTimer.current) clearTimeout(switchTimer.current);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const selectService = (serviceId: string) => {
    if (serviceId === activeId || transitionPhase === "exiting") return;

    if (settleTimer.current) clearTimeout(settleTimer.current);
    setTransitionPhase("exiting");

    switchTimer.current = setTimeout(() => {
      setActiveId(serviceId);
      setTransitionPhase("entering");

      settleTimer.current = setTimeout(() => {
        setTransitionPhase("idle");
      }, 440);
    }, 180);
  };

  return (
    <div className="services-explorer border-t border-charcoal/18" aria-busy={transitionPhase !== "idle"}>
      {services.map((service) => {
        const isActive = activeId === service.id;
        const panelId = `service-panel-${service.id}`;

        return (
          <article key={service.id} className="border-b border-charcoal/18">
            <button
              type="button"
              aria-expanded={isActive}
              aria-disabled={isActive}
              aria-controls={panelId}
              onClick={() => selectService(service.id)}
              className={cn(
                "service-trigger group relative grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 overflow-hidden border-l-2 px-3 py-5 text-left transition-[color,border-color,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow sm:grid-cols-[3.5rem_1fr_auto] sm:px-4 sm:py-6",
                isActive ? "service-trigger-active cursor-default border-l-technical-yellow bg-[#f6f4e8] text-charcoal lg:sticky lg:top-24 lg:z-20 lg:shadow-[0_10px_22px_rgba(17,19,21,.06)]" : "border-l-transparent text-charcoal/68 hover:bg-charcoal/[.025] hover:text-charcoal",
              )}
            >
              {!isActive && <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-technical-yellow transition-transform duration-500 ease-out group-hover:scale-x-100" />}
              <span className={cn("font-mono text-[11px] tracking-[0.16em] transition-colors duration-300", isActive ? "text-technical-yellow" : "text-text-gray/70 group-hover:text-technical-yellow")}>
                {service.number}
              </span>
              <span className={cn("service-trigger-title font-heading text-xl font-semibold tracking-[-0.025em] transition-transform duration-300 ease-out sm:text-2xl lg:text-[1.7rem]", !isActive && "group-hover:translate-x-1")}>
                {service.title}
              </span>
              <span className={cn("grid size-9 place-items-center border transition duration-300", isActive ? "border-charcoal bg-charcoal text-white" : "border-charcoal/20 text-charcoal group-hover:border-charcoal/55")}>
                {isActive ? <Check aria-hidden className="size-4 text-technical-yellow" /> : <Plus aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:rotate-45" />}
              </span>
            </button>

            <div id={panelId} hidden={!isActive}>
              <div className={cn("service-panel relative mb-5 overflow-hidden bg-charcoal text-white sm:mb-6", transitionPhase === "exiting" ? "service-panel-exit" : "service-panel-enter")}>
                <div className="service-panel-image relative h-52 overflow-hidden border-b border-white/10 sm:h-60">
                  <Image
                    key={service.image}
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="service-image-enter object-cover brightness-[1.07]"
                    style={{ objectPosition: service.imagePosition }}
                  />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,21,.5),transparent_48%,rgba(17,19,21,.12))]" />
                  <span className="absolute bottom-3 right-3 bg-charcoal/78 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/68 backdrop-blur-sm">
                    Imagen referencial
                  </span>
                </div>

                <div className="service-panel-content relative px-5 py-6 sm:px-7 sm:py-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:px-9 lg:py-9">
                <span aria-hidden className="service-number-enter pointer-events-none absolute -right-2 -top-8 font-heading text-[8rem] font-bold leading-none tracking-[-0.08em] text-white/[.024] sm:text-[10rem]">
                  {service.number}
                </span>

                <div className="service-copy-enter relative">
                  <p className="service-description max-w-md text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                    {service.description}
                  </p>
                  <a
                    href={createWhatsAppUrl(phone, service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-cta group mt-6 inline-flex min-h-11 items-center gap-2 pb-2 text-sm font-semibold text-white transition-colors hover:text-technical-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow"
                  >
                    Consultar este servicio
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>

                <div className="service-scope-enter relative mt-8 border-t border-white/12 pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-technical-yellow">
                    Principales alcances
                  </p>
                  <ul className="service-scope-list grid gap-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="service-scope-item flex items-start gap-3 text-sm leading-5 text-white/82">
                        <span aria-hidden className="mt-2 size-1 shrink-0 bg-technical-yellow" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
