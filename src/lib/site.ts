const siteUrl = process.env.SITE_URL ?? "https://ppym-constructora.vercel.app";
const indexable = process.env.SITE_INDEXABLE === "true";

export const site = {
  name: "PPYM E.I.R.L.",
  legalName: "Constructora & Consultora PPYM E.I.R.L.",
  url: siteUrl.replace(/\/$/, ""),
  indexable,
  title: "PPYM | Construcción y consultoría en Chachapoyas",
  description:
    "Constructora y consultora en Chachapoyas, Amazonas: saneamiento físico-legal, planos, topografía, expedientes, construcción y soporte técnico.",
  locale: "es_PE",
} as const;
