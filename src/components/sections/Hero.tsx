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
        <g stroke="currentColor" className="technical-lines text-white/12" strokeWidth="1">
          <path d="M700 175h610M700 160v30m610-30v30" />
          <path d="m712 175 14-5v10-5Zm586 0-14-5v10-5Z" fill="currentColor" />
          <path d="M735 215v455m165-455v455m195-455v455m165-455v455" strokeDasharray="5 8" />
          <path d="M680 670h650M680 655v30m650-30v30" />
          <circle className="technical-orbit" cx="1260" cy="250" r="38" />
        </g>
        <g fill="currentColor" className="technical-labels text-white/28" fontFamily="monospace" fontSize="11" letterSpacing="1.5">
          <text x="930" y="157">ELEV. 01 / REFERENCIA CONCEPTUAL</text>
          <text x="1218" y="316">N / 00°</text>
          <text x="1228" y="688">NPT ±0.00</text>
        </g>
        <g stroke="currentColor" className="technical-markers text-technical-yellow/55" strokeWidth="2">
          <path d="M695 670h52" /><circle cx="900" cy="425" r="4" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}

export function Hero() {
  const advisoryUrl = createWhatsAppUrl(company.phone, "Hola, quisiera solicitar asesoría técnica.");

  return (
    <section id="inicio" className="hero-shell relative isolate flex min-h-[760px] overflow-hidden bg-charcoal pb-16 pt-30 text-white sm:min-h-[800px] sm:pt-36 lg:min-h-[850px] lg:items-center lg:py-32">
      <Image
        src="/images/hero/ppym-large-construction-team-right-v4.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-photo hero-photo-enter -z-30 object-cover object-[73%_center] sm:object-[68%_center] lg:object-center"
      />
      <div aria-hidden className="hero-primary-gradient absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,9,12,.96)_0%,rgba(4,9,12,.88)_30%,rgba(4,9,12,.42)_56%,rgba(4,9,12,.04)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(4,9,12,.96)_0%,rgba(4,9,12,.86)_55%,rgba(4,9,12,.48)_100%)]" />
      <div aria-hidden className="hero-secondary-gradient absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,9,12,.32)_0%,transparent_25%,transparent_70%,rgba(4,9,12,.68)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 hero-grid opacity-30" />
      <TechnicalOverlay />

      <Container className="relative">
        <div className="hero-copy max-w-[47rem]">
          <p className="hero-eyebrow hero-enter mb-7 flex max-w-xl items-start gap-3 text-[11px] font-bold uppercase leading-5 tracking-[0.15em] text-technical-yellow sm:mb-8 sm:text-xs">
            <span className="hero-eyebrow-rule mt-2 h-px w-8 shrink-0 bg-technical-yellow" />
            <span className="whitespace-nowrap sm:hidden">Ingeniería · Construcción · Consultoría</span>
            <span className="hidden sm:inline">Ingeniería, construcción y consultoría técnica</span>
          </p>
          <h1 className="hero-title max-w-[11.5ch] font-heading text-[clamp(2.5rem,11.7vw,3.15rem)] font-bold leading-[1.04] tracking-[-0.052em] text-white sm:text-[clamp(3.15rem,6.5vw,5.45rem)] md:leading-[1] lg:leading-[0.96]">
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-1 block whitespace-nowrap">Soluciones</span></span>
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-2 block whitespace-nowrap">técnicas para</span></span>
            <span className="hero-title-mask-v2 block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-3 block whitespace-nowrap"><span className="cement-fill" data-text="construir">construir</span> con</span></span>
            <span className="hero-title-mask-v2 hero-title-mask-descender block overflow-hidden"><span className="hero-title-line-v2 hero-title-line-v2-4 block whitespace-nowrap">seguridad.</span></span>
          </h1>
          <p className="hero-description hero-enter hero-enter-delay-2 mt-7 max-w-[42rem] text-base leading-7 text-white/88 sm:text-lg sm:leading-8">
            Saneamiento físico-legal, expedientes para licencias, elaboración de planos, topografía y construcción en Chachapoyas y la región Amazonas.
          </p>
          <div className="hero-trust hero-enter hero-enter-delay-3 relative mt-6 inline-flex max-w-full overflow-hidden border border-technical-yellow/34 bg-[radial-gradient(circle_at_12%_20%,rgba(231,185,40,.2),transparent_42%),linear-gradient(112deg,rgba(39,36,24,.94)_0%,rgba(21,23,24,.9)_72%)] px-3 py-2.5 text-left shadow-[0_16px_36px_rgba(0,0,0,.28),0_0_24px_rgba(231,185,40,.06)] backdrop-blur-md sm:px-3.5 sm:py-3">
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-technical-yellow" />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(231,185,40,.62),rgba(231,185,40,.12)_52%,transparent)]" />
            <span className="relative mr-2.5 mt-0.5 flex size-7 shrink-0 items-center justify-center bg-technical-yellow text-charcoal shadow-[0_6px_18px_rgba(231,185,40,.18)] sm:size-8">
              <ShieldCheck aria-hidden className="size-4 sm:size-[18px]" />
            </span>
            <div className="relative min-w-0">
              <span className="mb-0.5 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-technical-yellow sm:text-[9px]">
                <span aria-hidden className="size-1 rounded-full bg-technical-yellow" />
                Acreditación vigente
              </span>
              <strong className="block font-heading text-xs font-semibold leading-[18px] text-white sm:text-sm">{technicalEntity.label}</strong>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] leading-4 text-white/68 sm:text-[11px]">
                <span className="font-medium text-white/78">{technicalEntity.issuer}</span>
                <span className="text-white/25" aria-hidden>•</span>
                <span className="font-mono text-[8px] tracking-[0.04em] text-white/58 sm:text-[9px]">ET {technicalEntity.code}</span>
              </p>
            </div>
          </div>
          <div className="hero-actions hero-enter hero-enter-delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <span className="block w-full sm:w-auto">
              <Button href={advisoryUrl} target="_blank" rel="noopener noreferrer" className="min-h-12 w-full px-6 shadow-[0_10px_28px_rgba(231,185,40,.2)]" aria-label="Solicitar asesoría técnica por WhatsApp">
                <MessageCircle aria-hidden size={17} /> Solicitar asesoría técnica
              </Button>
            </span>
            <Button href="#servicios" variant="secondary" className="min-h-12 w-full bg-charcoal/20 px-6 backdrop-blur-[2px] sm:w-auto">
              Ver servicios y trámites <ArrowDownRight aria-hidden size={17} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
