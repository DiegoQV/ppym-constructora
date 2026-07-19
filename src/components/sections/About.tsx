import Image from "next/image";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";
import { technicalEntity } from "@/data/navigation";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const qualities = [
  "Soluciones técnicas y legales integrales",
  "Asesoría personalizada",
  "Confidencialidad y seguridad",
  "Entrega oportuna",
] as const;

export function About() {
  const advisoryUrl = createWhatsAppUrl(
    company.phone,
    "Hola, quisiera recibir orientación sobre mi proyecto.",
  );

  return (
    <section
      id="nosotros"
      aria-labelledby="about-title"
      className="about-section relative scroll-mt-20 overflow-hidden bg-[#ebeae5] py-24 text-charcoal sm:py-28 lg:scroll-mt-24 lg:py-32"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-charcoal/14" />
      <div aria-hidden className="absolute -right-28 top-40 size-[34rem] rounded-full border border-charcoal/[.045]" />
      <div aria-hidden className="absolute -right-12 top-56 size-[22rem] rounded-full border border-charcoal/[.045]" />

      <Container className="relative">
        <div className="about-section-index flex items-center justify-between gap-6 border-b border-charcoal/15 pb-6">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-gray">
            <span className="h-px w-8 bg-technical-yellow" />
            02 / Nosotros
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-text-gray/65 sm:block">
            Chachapoyas · Amazonas
          </p>
        </div>

        <div className="about-layout mt-14 grid gap-14 lg:grid-cols-[1.12fr_.88fr] lg:items-start lg:gap-20 xl:gap-28">
          <Reveal className="about-collage order-2 lg:order-1 lg:pt-0.5">
            <div className="grid grid-cols-[1.08fr_.92fr] gap-3 sm:gap-5">
              <figure className="about-photo-interactive about-photo-frame about-photo-frame-1 about-photo-primary relative min-h-[500px] overflow-hidden bg-charcoal sm:min-h-[650px]">
                <Image
                  src="/images/about/ppym-supervision-chachapoyas-v3.webp"
                  alt="Escena conceptual de supervisión profesional en una obra de Chachapoyas"
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 30vw, 54vw"
                  className="about-photo-image object-cover object-[52%_center]"
                />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(17,19,21,.62)_100%)]" />
                <div aria-hidden className="about-photo-weave absolute inset-0 z-[1]" />
                <div aria-hidden className="about-photo-lines absolute inset-0 z-[2]">
                  <span className="about-photo-line about-photo-line-top-left" />
                  <span className="about-photo-line about-photo-line-top-right" />
                  <span className="about-photo-line about-photo-line-bottom-left" />
                  <span className="about-photo-line about-photo-line-bottom-right" />
                </div>
                <span className="absolute bottom-4 left-4 z-[3] bg-charcoal/80 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/64 backdrop-blur-sm sm:bottom-5 sm:left-5">
                  Imagen conceptual
                </span>
              </figure>

              <div className="grid grid-rows-[1fr_auto] gap-3 sm:gap-5">
                <figure className="about-photo-interactive about-photo-frame about-photo-frame-2 about-photo-secondary relative min-h-[330px] overflow-hidden bg-charcoal sm:min-h-[450px]">
                  <Image
                    src="/images/about/ppym-vivienda-andina-v3.webp"
                    alt="Propuesta conceptual de vivienda contemporánea adaptada al entorno andino"
                    fill
                    sizes="(min-width: 1280px) 310px, (min-width: 1024px) 27vw, 46vw"
                    className="about-photo-image object-cover object-[56%_center]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(17,19,21,.38)_100%)]" />
                  <div aria-hidden className="about-photo-weave absolute inset-0 z-[1]" />
                  <div aria-hidden className="about-photo-lines absolute inset-0 z-[2]">
                    <span className="about-photo-line about-photo-line-top-left" />
                    <span className="about-photo-line about-photo-line-top-right" />
                    <span className="about-photo-line about-photo-line-bottom-left" />
                    <span className="about-photo-line about-photo-line-bottom-right" />
                  </div>
                  <span className="absolute bottom-4 right-4 z-[3] bg-charcoal/80 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/64 backdrop-blur-sm sm:bottom-5 sm:right-5">
                    Visual conceptual
                  </span>
                </figure>

                <div className="about-year-card flex min-h-40 flex-col justify-between bg-technical-yellow p-5 text-charcoal sm:min-h-44 sm:p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-charcoal/62">
                    Inicio de actividades
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <strong className="font-heading text-[clamp(3.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.07em]">2018</strong>
                    <span className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-charcoal/55">Chachapoyas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-credential mt-3 grid overflow-hidden bg-charcoal text-white sm:mt-5 sm:grid-cols-[1fr_auto]">
              <div className="about-credential-copy flex items-start gap-4 px-5 py-5 sm:px-6">
                <span className="grid size-10 shrink-0 place-items-center border border-white/12 text-technical-yellow">
                  <ShieldCheck aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">{technicalEntity.label}</p>
                  <p className="mt-1 text-sm text-white/52">por el {technicalEntity.issuer}</p>
                  <p className="mt-2 font-mono text-[9px] tracking-[0.08em] text-white/34">ET · {technicalEntity.code}</p>
                </div>
              </div>

              <a
                href={advisoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-20 items-center justify-between gap-5 bg-technical-yellow px-5 py-5 text-sm font-semibold text-charcoal transition-colors hover:bg-technical-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-charcoal sm:w-56 sm:px-6"
              >
                Conversar sobre mi proyecto
                <ArrowUpRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal className="about-copy order-1 lg:order-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-gray">
              Constructora &amp; Consultora
            </p>
            <h2
              id="about-title"
              className="about-title mt-6 max-w-[9ch] font-heading text-[clamp(3.5rem,6vw,5.6rem)] font-bold leading-[.92] tracking-[-0.065em]"
            >
              Somos PPYM.
            </h2>
            <h3 className="about-subtitle mt-8 max-w-xl font-heading text-2xl font-semibold leading-[1.15] tracking-[-0.035em] sm:text-3xl">
              Construcción, consultoría y gestión técnica desde Chachapoyas.
            </h3>
            <p className="about-paragraph about-paragraph-first mt-6 max-w-xl text-base leading-7 text-text-gray sm:text-lg sm:leading-8">
              Constructora &amp; Consultora PPYM E.I.R.L. inició actividades en 2018 con una propuesta orientada a resolver de manera integral las necesidades técnicas, legales y operativas de cada proyecto.
            </p>
            <p className="about-paragraph about-paragraph-second mt-4 max-w-xl text-base leading-7 text-text-gray sm:text-lg sm:leading-8">
              Desde el saneamiento del predio hasta la elaboración de planos, la topografía y la construcción, buscamos que el cliente encuentre orientación clara y continuidad en una sola empresa.
            </p>

            <ul className="about-qualities mt-9 grid gap-x-6 gap-y-4 border-y border-charcoal/15 py-7 sm:grid-cols-2">
              {qualities.map((quality) => (
                <li key={quality} className="flex items-start gap-3 text-sm leading-6 text-charcoal/78">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-technical-yellow" strokeWidth={2.5} />
                  {quality}
                </li>
              ))}
            </ul>

          </Reveal>
        </div>

      </Container>
    </section>
  );
}
