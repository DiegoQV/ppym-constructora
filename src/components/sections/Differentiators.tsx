import {
  ArrowUpRight,
  DraftingCompass,
  MapPinned,
  MessagesSquare,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { createWhatsAppUrl } from "@/lib/whatsapp";

interface Differentiator {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const differentiators: Differentiator[] = [
  {
    title: "Sistema integral",
    description:
      "Construcción, consultoría, topografía, planos y gestión documental articulados en una sola ruta.",
    Icon: DraftingCompass,
  },
  {
    title: "Alcance definido",
    description:
      "Partimos del diagnóstico para entender la necesidad, definir el alcance y reconocer el siguiente paso.",
    Icon: Route,
  },
  {
    title: "Lectura territorial",
    description:
      "Trabajamos desde Chachapoyas con una mirada cercana a las condiciones y necesidades de Amazonas.",
    Icon: MapPinned,
  },
  {
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
      className="relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-charcoal py-14 text-white sm:py-16 lg:scroll-mt-24 lg:py-20"
    >
      <div aria-hidden className="technical-grid absolute inset-0 opacity-20" />

      <Container className="relative">
        <h2
          id="differentiators-title"
          className="max-w-2xl font-heading text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-balance"
        >
          Qué puedes esperar de PPYM
        </h2>

        <ul className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {differentiators.map(({ title, description, Icon }) => (
            <li key={title} className="flex items-start gap-3.5 border-t border-white/20 py-4 lg:block lg:py-5">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-technical-yellow lg:mt-0 lg:mb-3" strokeWidth={1.6} />
              <div>
                <h3 className="font-heading text-lg leading-tight font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/85">{description}</p>
              </div>
            </li>
          ))}
        </ul>

        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-12 items-center gap-2.5 bg-technical-yellow px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-technical-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow sm:mt-6"
        >
          Solicitar orientación por WhatsApp
          <ArrowUpRight aria-hidden className="size-4 shrink-0" />
        </a>
      </Container>
    </section>
  );
}
