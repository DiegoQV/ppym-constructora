import { workCollections } from "@/data/projects";
import { services } from "@/data/services";
import { stages } from "@/data/process";
import { company } from "@/data/company";

export const photos = workCollections.flatMap(collection => collection.photos);
export type Reply = { text: string; photos?: string[]; contact?: boolean };
export type Turn = Reply & { role: "user" | "assistant" };

export const shortcuts = ["Ver viviendas", "Consultar servicios", "Cómo empezar"];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function catalogReply(input: string, selected: string): Reply {
  const query = normalize(input);
  if (query === "consultar servicios" || query === "servicios") return { text: "Podemos ayudarte con:\n" + services.map(s => "• " + s.title).join("\n") };
  if (/cotiz|precio|cuanto cuesta|presupuesto|whatsapp|asesor|plazo/.test(query)) {
    return { text: "El equipo puede evaluar el alcance y confirmar costos y plazos. Puedes revisar tu consulta antes de enviarla por WhatsApp.", contact: true };
  }
  if (/un (nivel|piso)|1 piso/.test(query)) {
    const item = photos.find(p => p.caption === "Vivienda de un nivel");
    if (item) return { text: "Esta es la vivienda de un nivel del portafolio. Toca la foto para verla en detalle.", photos: [item.src] };
  }
  const collection = /interior|cocina|sala/.test(query) ? workCollections[1]
    : /acabado|baño|bano|revestimiento/.test(query) ? workCollections[2]
    : /casa|vivienda|fachada|foto|galeria|obra/.test(query) ? workCollections[0] : null;
  if (collection) return { text: collection.description, photos: collection.photos.map(p => p.src) };
  if (/proceso|empezar|iniciar/.test(query)) {
    return { text: "Empezamos con una consulta sobre tu proyecto y los documentos que tienes. Luego seguimos estas etapas: " + stages.slice(1).map(s => s.title.toLowerCase()).join(", ") + "." };
  }
  if (/ubicacion|direccion|telefono|contacto/.test(query)) {
    return { text: "Puedes encontrarnos en " + company.address + ", " + company.city + ", o escribir al " + company.displayPhone + ".", contact: true };
  }
  const words = query.split(/\W+/).filter(w => w.length > 3);
  const ranked = services.map(s => ({ service: s, score: words.filter(w => normalize([s.title, ...s.items].join(" ")).includes(w)).length }))
    .sort((a, b) => b.score - a.score);
  if (ranked[0].score) {
    const service = ranked[0].service;
    return { text: service.title + ". " + service.description + "\n\n" + service.items.join(" · ") };
  }
  if (/servicio|ofrecen/.test(query)) return { text: "Podemos ayudarte con:\n" + services.map(s => "• " + s.title).join("\n") };
  const reference = photos.find(p => p.src === selected);
  if (reference && /esa|esta|referencia/.test(query)) return { text: reference.alt + ". Puedes usarla como referencia para tu consulta.", contact: true };
  return { text: "Puedo mostrarte viviendas, consultar los servicios publicados o explicarte cómo empieza un proyecto. ¿Qué te gustaría explorar?" };
}
