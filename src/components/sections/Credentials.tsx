import { Container } from "@/components/ui/Container";
import { trustIndicators } from "@/data/navigation";

export function Credentials() {
  return <section aria-label="Indicadores de confianza" className="relative border-b border-charcoal/10 bg-warm-white before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent_0%,rgba(231,185,40,.75)_28%,rgba(231,185,40,.28)_72%,transparent_100%)]"><Container className="grid grid-cols-2 px-0 sm:px-6 lg:grid-cols-4">{trustIndicators.map((item, index) => <div key={item.label} className="relative min-h-32 border-charcoal/10 px-5 py-6 even:border-l lg:min-h-36 lg:border-l lg:px-7 lg:py-8 lg:first:border-l-0"><span className="mb-4 block font-mono text-[10px] tracking-[0.18em] text-text-gray">0{index + 1} / {item.overline}</span><p className="max-w-[15rem] font-heading text-base font-semibold leading-5 text-charcoal sm:text-lg sm:leading-6">{item.label}</p></div>)}</Container></section>;
}
