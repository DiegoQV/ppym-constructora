import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { stages } from "@/data/process";

export function Process() {
  return (
    <section
      id="proceso"
      aria-labelledby="process-title"
      className="scroll-mt-20 bg-[#e9e8e2] py-14 text-charcoal sm:py-20 lg:scroll-mt-24"
    >
      <Container className="max-lg:max-w-4xl">
        <header className="border-b border-charcoal/15 pb-7 sm:pb-8">
          <p className="section-label flex items-center gap-3 text-charcoal">
            <span aria-hidden className="h-px w-8 bg-technical-yellow" />
            Método PPYM
          </p>
          <h2
            id="process-title"
            className="mt-4 max-w-4xl text-balance font-heading text-[clamp(2.375rem,8vw,3.5rem)] font-bold leading-[1.08] tracking-[-.045em]"
          >
            Decidir antes de construir.
          </h2>
        </header>

        <div className="mt-8 grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden bg-charcoal/10 sm:aspect-[16/10] lg:order-2 lg:aspect-auto">
            <Image
              src="/images/process/revision-predio-amazonas-v1.webp"
              alt="Dos profesionales consultan un plano sobre el terreno de un predio delimitado en una ladera de Amazonas"
              fill
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) calc((100vw - 7rem) / 2), (min-width: 896px) 848px, calc(100vw - 3rem)"
              className="object-cover object-[center_59%]"
            />
          </figure>

          <ol role="list" aria-label="Etapas del proceso" className="lg:order-1">
            {stages.map(({ number, title, output }) => (
              <li
                key={number}
                className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-5 before:absolute before:start-[1.0625rem] before:top-9 before:bottom-0 before:w-px before:bg-technical-yellow/60 last:pb-0 last:before:hidden sm:gap-x-5"
              >
                <span
                  aria-hidden
                  className="relative grid size-9 place-items-center rounded-full border border-technical-yellow bg-[#e9e8e2] font-mono text-sm font-semibold"
                >
                  {number}
                </span>
                <div className="pt-1">
                  <h3 className="font-heading text-lg leading-7 font-bold tracking-[-0.025em] sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-[44ch] text-base leading-6 text-charcoal/80">
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
