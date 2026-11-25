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
    output: "Aclaramos qué necesitas y con qué información cuentas.",
  },
  {
    number: "02",
    action: "Revisar",
    title: "Diagnóstico técnico",
    description: "Leemos antecedentes y condiciones del predio para descubrir qué debe resolverse antes de avanzar.",
    output: "Identificamos qué falta resolver antes de avanzar.",
  },
  {
    number: "03",
    action: "Definir",
    title: "Alcance del trabajo",
    description: "Convertimos el diagnóstico en una secuencia clara de decisiones, entregables y responsabilidades.",
    output: "Definimos qué incluye el servicio, qué se entregará y quién se encarga de cada tarea.",
  },
  {
    number: "04",
    action: "Desarrollar",
    title: "Ejecución coordinada",
    description: "Articulamos cada especialidad y comunicamos el avance para mantener una sola dirección técnica.",
    output: "Coordinamos el trabajo y te comunicamos cómo avanza.",
  },
  {
    number: "05",
    action: "Entregar",
    title: "Entrega y cierre",
    description: "Presentamos el resultado, explicamos la documentación y dejamos visibles los siguientes pasos.",
    output: "Te explicamos el resultado, la documentación y los pasos que siguen.",
  },
];
