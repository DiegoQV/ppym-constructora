export const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Equipos", href: "#equipos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const technicalEntity = {
  label: "Entidad Técnica autorizada",
  issuer: "Fondo Mivivienda",
  code: "AMA-1096-26-2N-25",
  status: "verified",
} as const;

export const trustIndicators = [
  { overline: "Trayectoria", label: "Desde 2018" },
  { overline: "Acreditación", label: technicalEntity.label, status: technicalEntity.status },
  { overline: "Enfoque", label: "Soluciones integrales" },
  { overline: "Sede", label: "Chachapoyas, Amazonas" },
] as const;
