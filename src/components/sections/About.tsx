import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TechoPropioLogo } from "@/components/ui/TechoPropioLogo";
import { company } from "@/data/company";
import { technicalEntity } from "@/data/navigation";
import { featuredHousePhoto } from "@/data/projects";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function About() {
  const advisoryUrl = createWhatsAppUrl(
    company.phone,
    "Hola, quisiera recibir orientación sobre mi proyecto.",
  );

  return (
    <section
      id="nosotros"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-t border-charcoal/15 bg-[#ebeae5] py-10 text-charcoal sm:py-16 lg:scroll-mt-24 lg:py-[clamp(4rem,6vw,6rem)]"
    >
      <Container>
        <p className="flex items-center gap-3 border-b border-charcoal/20 pb-4 font-mono text-[11px] font-medium uppercase tracking-[.16em] text-charcoal/75 sm:pb-5">
          <span aria-hidden className="h-0.5 w-7 bg-technical-yellow" />
          Nosotros
        </p>

        <Reveal className="about-reveal mt-6 grid gap-y-5 sm:mt-8 sm:gap-y-7 lg:mt-10 lg:grid-cols-[minmax(0,.76fr)_minmax(0,1.24fr)] lg:items-center lg:gap-x-[clamp(3rem,6vw,6rem)]">
          <div className="about-intro">
            <h2
              id="about-title"
              className="font-heading text-[clamp(2.375rem,11.8vw,3rem)] font-[650] leading-[1.06] tracking-[-.035em] sm:text-[clamp(3rem,6vw,4.5rem)] lg:text-[clamp(3.375rem,4.65vw,4.25rem)] lg:leading-[1.02]"
            >
              <span className="lg:hidden">Somos PPYM.</span>
              <span className="hidden lg:block">Del terreno<br />a la obra.</span>
            </h2>
            <p className="mt-3 max-w-[28ch] text-balance font-heading text-xl font-semibold leading-[1.3] tracking-[-.015em] sm:mt-4 sm:text-2xl">
              Constructora y consultora en {company.city}, {company.region}.
            </p>
            <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-charcoal/78 sm:text-[1.0625rem] lg:hidden">
              Acompañamos tu proyecto desde la revisión del terreno hasta la ejecución de la obra.
            </p>
            <p className="mt-5 hidden max-w-[42ch] text-[1.0625rem] leading-relaxed text-charcoal/78 lg:block">
              En PPYM coordinamos la revisión del predio, los trámites, los planos y la construcción según las necesidades de cada proyecto.
            </p>
            <p className="mt-3 hidden max-w-[42ch] text-[1.0625rem] leading-relaxed text-charcoal/78 lg:block">
              Si ya tienes un terreno, un plano o una obra en marcha, revisamos contigo qué conviene resolver primero.
            </p>
          </div>

          <figure className="about-figure min-w-0">
            <div className="about-photo-frame relative aspect-[4/3] overflow-hidden bg-charcoal/10 sm:aspect-[16/10] lg:aspect-[3/2]">
              <Image
                src={featuredHousePhoto.src}
                alt={featuredHousePhoto.alt}
                fill
                sizes="(min-width: 1280px) 800px, (min-width: 1024px) 65vw, calc(100vw - 3rem)"
                className="object-cover lg:scale-[1.16]"
              />
            </div>
            <figcaption className="grid grid-cols-[minmax(0,1fr)_auto] border border-t-0 border-charcoal/20 lg:block lg:border-0">
              <div className="self-center px-3 py-3 sm:px-5 lg:flex lg:flex-wrap lg:items-baseline lg:gap-x-3 lg:px-0 lg:pb-0">
                <p className="font-mono text-[.625rem] font-medium uppercase leading-4 tracking-[.09em] text-charcoal/72 sm:text-[.6875rem]">
                  Vivienda terminada
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug sm:text-base lg:mt-0 lg:text-sm">{featuredHousePhoto.caption}</p>
              </div>
              <p className="flex flex-col justify-center border-l-2 border-technical-yellow bg-technical-yellow/12 px-3 py-3 sm:px-5 lg:hidden">
                <span className="font-mono text-[.625rem] font-medium uppercase leading-4 tracking-[.08em] text-charcoal/75 sm:text-[.6875rem]">
                  PPYM desde
                </span>
                <strong className="font-heading text-3xl font-semibold leading-none tracking-[-.04em] sm:text-[2.5rem]">
                  {company.activitiesStarted}
                </strong>
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="about-reveal about-facts mt-5 sm:mt-7 lg:grid lg:grid-cols-[minmax(0,.68fr)_minmax(0,1.45fr)_minmax(0,1.12fr)] lg:border-y lg:border-charcoal/20">
          <p className="hidden items-center gap-3 border-l-2 border-technical-yellow px-5 py-4 lg:flex xl:px-6">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[.1em] text-charcoal/75">Desde</span>
            <strong className="font-heading text-[2.5rem] font-semibold leading-none tracking-[-.04em]">{company.activitiesStarted}</strong>
          </p>

          <div className="hidden items-center gap-3.5 border-l border-charcoal/20 px-5 py-4 lg:flex xl:px-6">
            <TechoPropioLogo className="sm:size-12" />
            <div className="min-w-0">
              <p className="font-heading text-base font-semibold leading-tight">{technicalEntity.label}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-charcoal/78">
                <span>{technicalEntity.issuer}</span>
                <span className="font-mono text-[11px]">ET {technicalEntity.code}</span>
              </p>
            </div>
          </div>

          <div className="lg:flex lg:items-center lg:border-l lg:border-charcoal/20 lg:px-4 xl:px-6">
            <a
              href={advisoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 border-b-2 border-technical-yellow py-2 text-sm font-semibold transition-colors hover:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              Conversar sobre mi proyecto
              <ArrowUpRight aria-hidden className="size-4 shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
