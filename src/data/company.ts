import type { Company } from "@/types";
export const company = { legalName: "Constructora & Consultora PPYM E.I.R.L.", shortName: "PPYM E.I.R.L.", ruc: "20602924379", phone: "900471682", displayPhone: "900 471 682", address: "Jr. Sachapuyos N.° 250", city: "Chachapoyas", region: "Amazonas", country: "Perú", activitiesStarted: 2018, status: "pending-verification" } satisfies Company;

export const officeMap = {
  embedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d991.565755237436!2d-77.86413872435867!3d-6.229013665415763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTMnNDQuNSJTIDc3wrA1MSc0Ni41Ilc!5e0!3m2!1ses!2spe!4v1795588850101!5m2!1ses!2spe",
  // The destination uses the pin coordinates, independently of the map's center.
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=-6.2290278%2C-77.8629167",
} as const;
