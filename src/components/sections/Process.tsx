import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { stages } from "@/data/process";

export function Process() {
  return (
    <section
      id="proceso"
      aria-labelledby="process-title"
      className="scroll-mt-20 bg-[#e9e8e2] py-14 text-charcoal sm:py-20 lg:scroll-mt-24 lg:py-24"
    >
      <Container>
        <p className="section-label flex items-center gap-3 text-charcoal">
          <span aria-hidden className="h-px w-8 bg-technical-yellow" />
          Método PPYM
        </p>
        <h2
          id="process-title"
          className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,10.5vw,3.8rem)] leading-[0.95] font-bold tracking-[-0.065em] text-balance lg:text-[clamp(3.5rem,5vw,5.6rem)]"
        >
          Decidir antes de construir.
        </h2>

        <div className="mt-6 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
          <figure className="lg:order-2">
            <div className="relative aspect-video overflow-hidden border-b-2 border-technical-yellow bg-charcoal">
              <Image
                src="/images/process/ppym-proceso-constructivo-v1.webp"
                alt="Una edificación en distintas etapas de construcción sobre una ladera de Amazonas"
                fill
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, calc(100vw - 3rem)"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs font-medium text-charcoal/85">
              Ilustración del proceso constructivo
            </figcaption>
          </figure>

          <ol role="list" aria-label="Etapas del proceso" className="lg:order-1">
            {stages.map(({ number, title, output }) => (
              <li
                key={number}
                className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3.5 pb-5 before:absolute before:start-4 before:top-4 before:h-full before:w-px before:bg-technical-yellow last:pb-0 last:before:hidden sm:gap-x-5"
              >
                <span
                  aria-hidden
                  className="relative grid size-8 place-items-center rounded-full border border-technical-yellow bg-[#e9e8e2] font-mono text-xs font-semibold"
                >
                  {number}
                </span>
                <div className="pt-0.5">
                  <h3 className="font-heading text-lg leading-tight font-bold tracking-[-0.025em] sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-lg text-sm font-medium leading-6 text-charcoal/85 sm:text-base">
                    {output}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
