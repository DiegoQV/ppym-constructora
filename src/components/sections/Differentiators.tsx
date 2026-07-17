import {
  ArrowUpRight,
  DraftingCompass,
  MapPinned,
  MessagesSquare,
  Route,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DifferentiatorsMotion } from "@/components/sections/DifferentiatorsMotion";
import { company } from "@/data/company";
import { createWhatsAppUrl } from "@/lib/whatsapp";

interface Differentiator {
  number: string;
  action: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const differentiators: Differentiator[] = [
  {
    number: "01",
    action: "Integrar",
    title: "Sistema integral",
    description:
      "Construcción, consultoría, topografía, planos y gestión documental articulados en una sola ruta.",
    Icon: DraftingCompass,
  },
  {
    number: "02",
    action: "Ordenar",
    title: "Alcance definido",
    description:
      "Partimos del diagnóstico para entender la necesidad, definir el alcance y reconocer el siguiente paso.",
    Icon: Route,
  },
  {
    number: "03",
    action: "Comprender",
    title: "Lectura territorial",
    description:
      "Trabajamos desde Chachapoyas con una mirada cercana a las condiciones y necesidades de Amazonas.",
    Icon: MapPinned,
  },
  {
    number: "04",
    action: "Acompañar",
    title: "Cercanía directa",
    description:
      "Brindamos orientación personalizada y comunicación clara durante cada etapa del servicio.",
    Icon: MessagesSquare,
  },
];

export function Differentiators() {
  const projectUrl = createWhatsAppUrl(
    company.phone,
    "Hola, quisiera conversar sobre la ruta técnica de mi proyecto.",
  );

  return (
    <section
      id="diferenciadores"
      aria-labelledby="differentiators-title"
      className="differentiators-section relative overflow-hidden bg-charcoal py-24 text-white sm:py-28 lg:py-36"
    >
      <div aria-hidden className="technical-grid absolute inset-0 opacity-35" />
      <div
        aria-hidden
        className="absolute -right-24 top-12 size-[28rem] rounded-full border border-white/[.045] sm:size-[38rem]"
      />
      <div aria-hidden className="absolute right-20 top-48 size-2 rounded-full bg-technical-yellow" />

      <Container className="relative">
        <div className="flex items-center justify-between gap-6 border-b border-white/15 pb-6">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
            <span className="h-px w-8 bg-technical-yellow" />
            04 / Diferenciadores
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:block">
            Criterio · Cercanía · Continuidad
          </p>
        </div>

        <Reveal className="differentiators-scene mt-12">
        <figure className="differentiators-visual relative min-h-[560px] overflow-hidden border border-white/10 bg-graphite sm:min-h-[620px] lg:min-h-[680px]">
          <Image
            src="/images/about/ppym-del-predio-a-la-obra-v1.webp"
            alt="Visual conceptual que conecta planos topográficos, cimentación y arquitectura sobre un terreno andino"
            fill
            priority={false}
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="differentiators-image object-cover object-[62%_center] sm:object-center"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,11,.92)_0%,rgba(8,10,11,.72)_29%,rgba(8,10,11,.08)_66%,rgba(8,10,11,.12)_100%)]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,11,.08)_55%,rgba(8,10,11,.76)_100%)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
            <div className="differentiators-copy max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technical-yellow">
                Capacidad conectada
              </p>
              <DifferentiatorsMotion />
              <p className="mt-7 max-w-md text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
                Cada decisión técnica, documental y constructiva encuentra su lugar dentro de una misma ruta.
              </p>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="hidden items-center gap-3 sm:flex">
                <span className="size-2 bg-technical-yellow" />
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/52">
                  Plano · Terreno · Estructura
                </p>
              </div>
              <figcaption className="mr-auto bg-charcoal/85 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/58 backdrop-blur-sm sm:ml-auto sm:mr-0">
                Visual conceptual
              </figcaption>
            </div>
          </div>
          <span aria-hidden className="absolute right-0 top-0 h-1 w-1/3 bg-technical-yellow" />
          <span aria-hidden className="absolute bottom-0 left-0 h-1 w-20 bg-technical-yellow" />
        </figure>
        </Reveal>

        <div className="mt-7 flex items-center justify-between sm:hidden">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/42">Cuatro criterios</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-technical-yellow">Desliza →</p>
        </div>

        <Reveal className="differentiators-sequence relative -mx-6 mt-4 sm:mx-0 sm:mt-0">
        <div className="differentiators-track flex snap-x snap-mandatory overflow-x-auto px-6 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
          <span aria-hidden className="differentiators-sequence-line hidden lg:block" />
          {differentiators.map(({ number, action, title, description, Icon }) => (
              <article key={number} className="differentiator-step group relative flex min-h-64 h-full w-[82vw] shrink-0 snap-start flex-col border-b border-r border-t border-white/15 bg-charcoal/95 p-6 first:border-l sm:w-auto sm:shrink sm:p-7 lg:min-h-72 lg:border-l-0 lg:border-t-0 lg:bg-transparent lg:px-6 lg:pb-5 lg:pt-16 lg:first:border-l-0">
                <div className="flex items-start justify-between gap-5">
                  <span className="differentiator-number font-mono text-[10px] tracking-[0.18em] text-white/35">{number}</span>
                  <span className="differentiator-node hidden lg:block" />
                  <Icon aria-hidden className="differentiator-card-icon size-5 text-technical-yellow" strokeWidth={1.6} />
                </div>
                <div className="mt-auto pt-10">
                  <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-technical-yellow">{action}</p>
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.035em] sm:text-2xl lg:h-8 lg:text-xl xl:text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/52 lg:h-24">{description}</p>
                </div>
              </article>
          ))}
        </div>
        </Reveal>

        <div className="differentiators-closing mt-14 grid gap-8 border-t border-white/15 py-10 sm:grid-cols-[1fr_auto] sm:items-end sm:py-12">
          <div>
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/42">
              <span className="h-px w-8 bg-technical-yellow" />
              Siguiente paso
            </p>
            <p className="mt-5 max-w-2xl font-heading text-[clamp(2rem,3.8vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
              Tu proyecto merece una ruta clara desde el inicio.
            </p>
          </div>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-16 w-fit items-center gap-5 bg-technical-yellow px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-technical-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow sm:min-h-20 sm:px-8"
          >
            Solicitar orientación
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
