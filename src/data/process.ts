interface Stage {
  number: string;
  action: string;
  title: string;
  description: string;
  output: string;
}

export const stages: Stage[] = [
  {
    number: "01",
    action: "Escuchar",
    title: "Consulta inicial",
    description: "Entendemos la necesidad, el lugar y la información disponible para reconocer el verdadero punto de partida.",
    output: "Aclaramos qué necesitas y qué información tienes para empezar.",
  },
  {
    number: "02",
    action: "Revisar",
    title: "Diagnóstico técnico",
    description: "Leemos antecedentes y condiciones del predio para descubrir qué debe resolverse antes de avanzar.",
    output: "Identificamos qué datos del terreno o documentos faltan para avanzar.",
  },
  {
    number: "03",
    action: "Definir",
    title: "Alcance del trabajo",
    description: "Convertimos el diagnóstico en una secuencia clara de decisiones, entregables y responsabilidades.",
    output: "Acordamos qué incluye el servicio, qué se entrega y quién se encarga.",
  },
  {
    number: "04",
    action: "Desarrollar",
    title: "Ejecución coordinada",
    description: "Articulamos cada especialidad y comunicamos el avance para mantener una sola dirección técnica.",
    output: "Coordinamos a los responsables y te informamos de los avances.",
  },
  {
    number: "05",
    action: "Entregar",
    title: "Entrega y cierre",
    description: "Presentamos el resultado, explicamos la documentación y dejamos visibles los siguientes pasos.",
    output: "Revisamos contigo el resultado y la documentación de entrega.",
  },
];
