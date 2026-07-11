import Image from "next/image";
import { ArrowDownRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { technicalEntity } from "@/data/navigation";
import { createWhatsAppUrl } from "@/lib/whatsapp";

function TechnicalOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
        <g stroke="currentColor" className="technical-lines text-white/16" strokeWidth="1">
          <path d="M700 175h610M700 160v30m610-30v30" />
          <path d="m712 175 14-5v10-5Zm586 0-14-5v10-5Z" fill="currentColor" />
          <path d="M735 215v455m165-455v455m195-455v455m165-455v455" strokeDasharray="5 8" />
          <path d="M680 670h650M680 655v30m650-30v30" />
          <circle className="technical-orbit" cx="1260" cy="250" r="38" />
          <path className="technical-orbit" d="M1260 204v92m-46-46h92" />
        </g>
        <g fill="currentColor" className="technical-labels text-white/36" fontFamily="monospace" fontSize="11" letterSpacing="1.5">
          <text x="930" y="157">ELEV. 01 / REFERENCIA CONCEPTUAL</text>
          <text x="1218" y="316">N / 00°</text>
          <text x="1228" y="688">NPT ±0.00</text>
        </g>
        <g stroke="currentColor" className="technical-markers text-technical-yellow/75" strokeWidth="2">
          <path d="M695 670h52" /><circle cx="900" cy="425" r="4" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}

export function Hero() {
  const advisoryUrl = createWhatsAppUrl(company.phone, "Hola, quisiera solicitar asesoría técnica.");

  return (
    <section id="inicio" className="relative isolate flex min-h-[760px] overflow-hidden bg-charcoal pb-16 pt-30 text-white sm:min-h-[800px] sm:pt-36 lg:min-h-[850px] lg:items-center lg:py-32">
      <Image
        src="/images/hero/ppym-large-construction-team-right-v4.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-photo-enter -z-30 object-cover object-[73%_center] sm:object-[68%_center] lg:object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,9,12,.98)_0%,rgba(4,9,12,.92)_32%,rgba(4,9,12,.52)_58%,rgba(4,9,12,.1)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(4,9,12,.96)_0%,rgba(4,9,12,.86)_55%,rgba(4,9,12,.48)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,9,12,.4)_0%,transparent_25%,transparent_70%,rgba(4,9,12,.75)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 hero-grid opacity-30" />
      <TechnicalOverlay />

      <Container className="relative">
        <div className="max-w-[47rem]">
          <p className="hero-enter mb-9 flex max-w-xl items-start gap-3 text-[11px] font-bold uppercase leading-5 tracking-[0.15em] text-technical-yellow sm:text-xs">
            <span className="mt-2 h-px w-8 shrink-0 bg-technical-yellow" />
            Ingeniería, construcción y consultoría técnica
          </p>
          <div className="hero-enter mb-6 inline-flex max-w-full items-center gap-3 border border-white/10 bg-charcoal/38 px-3.5 py-2.5 text-left backdrop-blur-sm">
            <ShieldCheck aria-hidden className="size-4 shrink-0 text-technical-yellow" />
            <p className="text-[10px] leading-4 text-white/76 sm:text-[11px]">
              <strong className="font-semibold text-white">{technicalEntity.label}</strong>
              <span className="mx-2.5 text-white/25" aria-hidden>•</span>
              {technicalEntity.issuer}
              <span className="ml-2.5 font-mono text-[9px] text-white/46">ET {technicalEntity.code}</span>
            </p>
          </div>
          <h1 className="max-w-[11.5ch] font-heading text-[clamp(2.85rem,6.5vw,5.45rem)] font-semibold leading-[1.04] tracking-[-0.048em] text-white md:leading-[1] lg:leading-[0.97]">
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-1 block whitespace-nowrap">Soluciones</span></span>
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-2 block whitespace-nowrap">técnicas para</span></span>
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-3 block whitespace-nowrap"><span className="cement-fill" data-text="construir">construir</span> con</span></span>
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-4 block whitespace-nowrap">seguridad.</span></span>
          </h1>
          <p className="hero-enter hero-enter-delay-2 mt-7 max-w-[42rem] text-base leading-7 text-white/88 sm:text-lg sm:leading-8">
            Saneamiento físico legal, expedientes técnicos, topografía, elaboración de planos y construcción en Chachapoyas y la región Amazonas.
          </p>
          <div className="hero-enter hero-enter-delay-3 mt-9 flex flex-col gap-3 min-[430px]:flex-row">
            <span className="block w-full min-[430px]:w-auto">
              <Button href={advisoryUrl} className="w-full" aria-label="Solicitar asesoría técnica por WhatsApp">
                <MessageCircle aria-hidden size={17} /> Solicitar asesoría técnica
              </Button>
            </span>
            <Button href="#servicios" variant="secondary" className="w-full bg-charcoal/20 backdrop-blur-[2px] min-[430px]:w-auto">
              Ver servicios y trámites <ArrowDownRight aria-hidden size={17} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
