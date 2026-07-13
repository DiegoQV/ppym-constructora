import { Container } from "@/components/ui/Container";
import { trustIndicators } from "@/data/navigation";

export function Credentials() {
  return (
    <section
      aria-label="Indicadores de confianza"
      className="relative border-b border-white/8 bg-graphite text-white before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent_0%,rgba(231,185,40,.8)_28%,rgba(231,185,40,.32)_72%,transparent_100%)]"
    >
      <Container className="grid grid-cols-2 px-0 sm:px-6 lg:grid-cols-4">
        {trustIndicators.map((item, index) => (
          <div
            key={item.label}
            className="relative min-h-32 border-white/9 px-5 py-6 even:border-l [&:nth-child(n+3)]:border-t lg:min-h-36 lg:border-l lg:border-t-0 lg:px-7 lg:py-8 lg:first:border-l-0"
          >
            <span className="mb-4 block font-mono text-[11px] tracking-[0.16em] text-white/58">
              0{index + 1} / {item.overline}
            </span>
            <p className="max-w-[15rem] font-heading text-base font-semibold leading-5 text-white/92 sm:text-lg sm:leading-6">
              {item.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
