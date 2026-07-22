import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Información sobre el tratamiento de datos personales en el sitio web de ${company.shortName}.`,
  alternates: { canonical: `${site.url}/privacidad` },
};

const sections = [
  {
    title: "Responsable del tratamiento",
    content: (
      <p>
        El responsable es {company.legalName}, RUC {company.ruc}, con domicilio en {company.address}, {company.city}, {company.region}, {company.country}.
      </p>
    ),
  },
  {
    title: "Datos que podemos tratar",
    content: (
      <>
        <p>Este sitio no contiene cuentas de usuario, pagos en línea ni herramientas propias de analítica o publicidad. El asistente de proyectos organiza las respuestas localmente en tu navegador: PPYM no las recibe, almacena ni procesa desde el sitio.</p>
        <p>La información solo se incorpora a una conversación externa cuando eliges continuar por WhatsApp y confirmas el envío desde esa plataforma.</p>
        <p>Si decides contactarnos por WhatsApp o teléfono, podremos recibir los datos que proporciones voluntariamente, como nombre, número telefónico, ubicación del proyecto, documentos y detalles de tu consulta.</p>
        <p>El proveedor de alojamiento puede generar registros técnicos limitados, como dirección IP, navegador, fecha y solicitudes realizadas, necesarios para seguridad y funcionamiento del servicio.</p>
      </>
    ),
  },
  {
    title: "Finalidades y base del tratamiento",
    content: (
      <p>
        Usamos la información para responder consultas, evaluar necesidades técnicas, preparar propuestas, ejecutar servicios solicitados, mantener la comunicación y cumplir obligaciones contractuales o legales. El tratamiento se sustenta en tu solicitud, consentimiento o en la relación contractual que corresponda. No utilizaremos tus datos para prospección comercial no solicitada sin el consentimiento exigible.
      </p>
    ),
  },
  {
    title: "Destinatarios y servicios externos",
    content: (
      <p>
        No vendemos datos personales. Solo podrán acceder proveedores indispensables para alojamiento, comunicaciones o soporte, y autoridades cuando exista una obligación legal. Al elegir WhatsApp, la comunicación también queda sujeta a las condiciones y políticas de Meta/WhatsApp, una plataforma externa a PPYM.
      </p>
    ),
  },
  {
    title: "Conservación y seguridad",
    content: (
      <p>
        Conservaremos la información durante el tiempo necesario para atender la consulta o relación de servicio y, posteriormente, durante los plazos exigidos por obligaciones legales o para la atención de responsabilidades. Aplicamos medidas razonables para limitar accesos y usos no autorizados.
      </p>
    ),
  },
  {
    title: "Tus derechos ARCO",
    content: (
      <>
        <p>Puedes solicitar acceso, rectificación, cancelación u oposición respecto de tus datos personales. El ejercicio es gratuito.</p>
        <p>
          Presenta tu solicitud al WhatsApp <a className="font-semibold underline decoration-technical-yellow decoration-2 underline-offset-4" href={`https://wa.me/51${company.phone}`} target="_blank" rel="noopener noreferrer">+51 {company.displayPhone}</a> o en el domicilio indicado arriba. Incluye tu nombre, documento de identidad, derecho que deseas ejercer, descripción clara de la solicitud y documentos de sustento cuando correspondan.
        </p>
        <a className="inline-flex items-center gap-2 font-semibold text-charcoal underline decoration-technical-yellow decoration-2 underline-offset-4" href="https://www.gob.pe/9270-que-son-los-derechos-arco" target="_blank" rel="noopener noreferrer">
          Información oficial sobre derechos ARCO <ExternalLink aria-hidden className="size-4" />
        </a>
      </>
    ),
  },
  {
    title: "Menores de edad y actualizaciones",
    content: (
      <p>
        Los servicios no están dirigidos a menores de edad. Esta política podrá actualizarse para reflejar cambios operativos o normativos; la versión vigente se publicará siempre en esta página.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-warm-white text-charcoal">
      <header className="border-b border-white/10 bg-charcoal text-white">
        <Container className="flex min-h-20 items-center justify-between gap-6">
          <Link href="/" aria-label={`${company.shortName}, volver al inicio`} className="flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow">
            <span className="relative block h-16 w-30 overflow-hidden">
              <Image src="/logo/ppym-logo-navbar-inverse.webp" alt="" fill sizes="120px" className="scale-[1.13] object-contain" />
            </span>
            <span className="sr-only">{company.legalName}</span>
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-technical-yellow focus-visible:outline-2 focus-visible:outline-technical-yellow">
            <ArrowLeft aria-hidden className="size-4" /> Volver al sitio
          </Link>
        </Container>
      </header>

      <Container className="py-16 sm:py-20 lg:grid lg:grid-cols-[.55fr_1fr] lg:gap-20 lg:py-24">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-text-gray">Información legal</p>
          <h1 className="mt-4 max-w-[10ch] font-heading text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[.9] tracking-[-.07em]">Política de privacidad.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-text-gray">Última actualización: 20 de julio de 2026.</p>
          <div className="mt-8 border-l-2 border-technical-yellow pl-5 text-sm leading-6 text-text-gray lg:sticky lg:top-10">
            Esta política describe el tratamiento asociado a este sitio informativo y a las consultas iniciadas voluntariamente por sus visitantes.
          </div>
        </div>

        <div className="mt-14 divide-y divide-charcoal/15 border-y border-charcoal/15 lg:mt-0">
          {sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`privacy-section-${index}`} className="grid gap-4 py-8 sm:grid-cols-[2.75rem_1fr] sm:py-10">
              <span aria-hidden className="font-mono text-[9px] tracking-[.18em] text-technical-yellow">0{index + 1}</span>
              <div>
                <h2 id={`privacy-section-${index}`} className="font-heading text-2xl font-semibold tracking-[-.04em]">{section.title}</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-text-gray">{section.content}</div>
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
