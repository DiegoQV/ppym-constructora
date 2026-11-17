interface Stage {
  number: string;
  action: string;
  title: string;
  description: string;
  output: string;
}

export const stages: Stage[] = [
  { number: "01", action: "Escuchar", title: "Consulta inicial", description: "Entendemos la necesidad, el lugar y la información disponible para reconocer el verdadero punto de partida.", output: "Necesidad identificada" },
  { number: "02", action: "Revisar", title: "Diagnóstico técnico", description: "Leemos antecedentes y condiciones del predio para descubrir qué debe resolverse antes de avanzar.", output: "Escenario comprendido" },
  { number: "03", action: "Definir", title: "Ruta y alcance", description: "Convertimos el diagnóstico en una secuencia clara de decisiones, entregables y responsabilidades.", output: "Ruta de trabajo" },
  { number: "04", action: "Desarrollar", title: "Ejecución coordinada", description: "Articulamos cada especialidad y comunicamos el avance para mantener una sola dirección técnica.", output: "Servicio en desarrollo" },
  { number: "05", action: "Entregar", title: "Cierre claro", description: "Presentamos el resultado, explicamos la documentación y dejamos visibles los siguientes pasos.", output: "Resultado entregado" },
];
