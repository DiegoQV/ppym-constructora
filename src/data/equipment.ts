interface Capability {
  number: string;
  short: string;
  title: string;
  role: string;
  image: string;
  applications: readonly string[];
  criterion: string;
}

export const capabilities: Capability[] = [
  { number: "01", short: "Conformar", title: "Movimiento compacto", role: "Preparación precisa en espacios de maniobra reducida.", image: "/images/equipment/minicargador-ladera-v1.webp", applications: ["Limpieza de plataforma", "Acarreo corto", "Nivelación y apoyo"], criterion: "Agilidad donde una máquina mayor comprometería accesos o control." },
  { number: "02", short: "Colocar", title: "Concreto coordinado", role: "Continuidad operativa para elementos estructurales y vaciados planificados.", image: "/images/equipment/mixer-concreto-v1.webp", applications: ["Losas y cimentaciones", "Elementos estructurales", "Control de secuencia"], criterion: "El equipo se define según volumen, acceso, tiempo y condición de obra." },
  { number: "03", short: "Excavar", title: "Terreno y drenaje", role: "Excavación controlada para resolver pendiente, plataforma y conducción de agua.", image: "/images/equipment/excavadora-drenaje-v1.webp", applications: ["Cortes y excavaciones", "Drenaje superficial", "Conformación de taludes"], criterion: "Intervenir la ladera exige reconocer suelo, agua y estabilidad antes de mover material." },
  { number: "04", short: "Controlar", title: "Precisión topográfica", role: "Información medible para replantear, verificar y documentar decisiones de campo.", image: "/images/equipment/control-topografico-v1.webp", applications: ["Levantamiento", "Replanteo", "Control geométrico"], criterion: "Medir antes, durante y después reduce incertidumbre y mantiene trazabilidad." },
];
