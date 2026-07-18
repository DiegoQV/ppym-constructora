import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-white">
      <div aria-hidden className="technical-grid absolute inset-0 opacity-20" />
      <Container className="relative">
        <div className="grid gap-10 border-b border-white/12 py-10 sm:py-12 lg:grid-cols-[1.08fr_.52fr_.72fr] lg:gap-14 lg:py-12">
          <div>
            <a href="#inicio" aria-label={`${company.shortName}, volver al inicio`} className="group inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow">
              <span className="relative block h-22 w-40 overflow-hidden">
                <Image src="/logo/ppym-logo-navbar-inverse.png" alt="" fill sizes="160px" className="scale-[1.14] object-contain object-left transition-transform duration-500 group-hover:scale-[1.19]" />
              </span>
              <span className="sr-only">{company.legalName}</span>
            </a>
            <p className="mt-5 max-w-md font-heading text-xl font-medium leading-8 tracking-[-.035em] text-white/72 sm:text-2xl">Arquitectura, ingeniería y construcción articuladas desde el territorio.</p>
            <p className="mt-5 font-mono text-[8px] uppercase tracking-[.18em] text-technical-yellow">Desde {company.activitiesStarted} · {company.city}, {company.region}</p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/45">Recorrido</p>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1 lg:grid-cols-1">
              {navigation.map((item, index) => (
                <a key={item.href} href={item.href} className="footer-link group flex min-h-9 items-center gap-3 text-sm text-white/62 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-technical-yellow">
                  <span className="font-mono text-[7px] text-technical-yellow/65">0{index + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/45">Datos</p>
            <dl className="mt-5 space-y-5 text-sm">
              <div><dt className="font-mono text-[7px] uppercase tracking-[.16em] text-white/42">Razón social</dt><dd className="mt-1.5 max-w-[25ch] leading-5 text-white/70">{company.legalName}</dd></div>
              <div><dt className="font-mono text-[7px] uppercase tracking-[.16em] text-white/42">RUC</dt><dd className="mt-1.5 text-white/70">{company.ruc}</dd></div>
              <div><dt className="font-mono text-[7px] uppercase tracking-[.16em] text-white/42">Ubicación</dt><dd className="mt-1.5 leading-5 text-white/70">{company.city}, {company.region}, {company.country}</dd></div>
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/50">© {new Date().getFullYear()} {company.shortName}. Todos los derechos reservados.</p>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <span className="font-mono text-[7px] uppercase tracking-[.18em] text-white/40">Construir con criterio</span>
            <a href="#inicio" aria-label="Volver al inicio" className="group flex min-h-11 items-center gap-3 border-l border-white/15 pl-5 font-mono text-[8px] uppercase tracking-[.18em] text-white/50 transition-colors hover:text-technical-yellow focus-visible:outline-2 focus-visible:outline-technical-yellow">
              Volver arriba
              <span className="grid size-9 place-items-center border border-white/15 transition-colors group-hover:border-technical-yellow/50"><ArrowUp aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-1" /></span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
