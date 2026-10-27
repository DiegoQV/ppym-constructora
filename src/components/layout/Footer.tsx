import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-white">
      <div aria-hidden className="technical-grid absolute inset-0 opacity-[.07]" />
      <Container className="relative">
        <div className="grid gap-10 border-b border-white/12 py-10 sm:py-12 lg:grid-cols-[1.08fr_.52fr_.72fr] lg:gap-14 lg:py-12">
          <div>
            <a href="#inicio" aria-label={`${company.shortName}, volver al inicio`} className="group inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow">
              <span className="relative block h-22 w-40 overflow-hidden">
                <Image src="/logo/ppym-logo-navbar-inverse.webp" alt="" fill sizes="160px" className="scale-[1.14] object-contain object-left transition-transform duration-500 group-hover:scale-[1.19]" />
              </span>
              <span className="sr-only">{company.legalName}</span>
            </a>
            <p className="mt-5 max-w-md font-heading text-xl font-medium leading-8 tracking-[-.035em] text-white/72 sm:text-2xl">Arquitectura, ingeniería y construcción articuladas desde el territorio.</p>
            <p className="mt-5 font-mono text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-technical-yellow">Desde {company.activitiesStarted} · {company.city}, {company.region}</p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="text-xs font-semibold uppercase leading-5 tracking-[.1em] text-white/90">Navegación</p>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1 lg:grid-cols-1">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="footer-link group flex min-h-9 items-center text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-technical-yellow">
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase leading-5 tracking-[.1em] text-white/90">Información de la empresa</p>
            <dl className="mt-5 space-y-5 text-sm">
              <div><dt className="text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/70">Razón social</dt><dd className="mt-1.5 max-w-[25ch] leading-5 text-white/85">{company.legalName}</dd></div>
              <div><dt className="text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/70">RUC</dt><dd className="mt-1.5 text-white/85">{company.ruc}</dd></div>
              <div><dt className="text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/70">Ubicación</dt><dd className="mt-1.5 leading-5 text-white/85">{company.city}, {company.region}, {company.country}</dd></div>
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-white/75">© {new Date().getFullYear()} {company.shortName}. Todos los derechos reservados.</p>
          <div className="footer-bottom-actions flex items-center justify-between gap-6 sm:justify-end">
            <a href="/privacidad" className="flex min-h-11 items-center text-xs font-semibold text-white/85 transition-colors hover:text-technical-yellow focus-visible:outline-2 focus-visible:outline-technical-yellow">Privacidad</a>
            <a href="#inicio" aria-label="Volver arriba" className="footer-back-to-top group flex min-h-11 items-center gap-3 border-l border-white/20 pl-5 text-xs font-semibold text-white/85 transition-colors hover:text-technical-yellow focus-visible:outline-2 focus-visible:outline-technical-yellow">
              Volver arriba
              <span className="grid size-9 place-items-center border border-white/35 transition-colors group-hover:border-technical-yellow/70"><ArrowUp aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-1" /></span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
