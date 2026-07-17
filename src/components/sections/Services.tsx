import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="services-section relative scroll-mt-20 bg-warm-white py-24 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-charcoal/12" />
      <Container>
        <div className="services-layout grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:gap-28">
          <header className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-gray">
              <span className="h-px w-8 bg-technical-yellow" />
              03 / Servicios
            </p>
            <Reveal className="services-heading max-w-[32rem]">
              <h2 id="services-title" className="services-title font-heading text-[clamp(2.75rem,5.35vw,5.25rem)] font-bold leading-[0.94] tracking-[-0.06em] text-charcoal">
                <span className="services-heading-mask block overflow-hidden"><span className="services-heading-line services-heading-line-1 block whitespace-nowrap">Del predio</span></span>
                <span className="services-heading-mask block overflow-hidden"><span className="services-heading-line services-heading-line-2 block whitespace-nowrap">al proyecto.</span></span>
              </h2>
            </Reveal>
            <p className="mt-7 max-w-md text-base leading-7 text-text-gray sm:text-lg sm:leading-8">
              Desde el saneamiento y los planos hasta la topografía, la construcción y el soporte operativo que cada proyecto necesita.
            </p>
            <div className="mt-10 hidden items-center gap-4 border-t border-charcoal/15 pt-5 lg:flex">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-gray">Explora</span>
              <span aria-hidden className="h-px flex-1 bg-charcoal/15" />
              <span className="text-xs text-text-gray">07 líneas de servicio</span>
            </div>
          </header>

          <ServicesExplorer services={services} phone={company.phone} />
        </div>
      </Container>
    </section>
  );
}
