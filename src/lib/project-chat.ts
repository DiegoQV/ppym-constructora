import { workCollections } from "@/data/projects";
import { services } from "@/data/services";
import { stages } from "@/data/process";
import { company } from "@/data/company";
import { technicalEntity } from "@/data/navigation";

// PPYM identifies the exteriors in Viviendas as works carried out under Techo Propio.
export const techoPropioHomes = workCollections.find(collection => collection.name === "Viviendas")?.photos ?? [];
const housingContext = "Estas fachadas son de viviendas que construimos en PPYM con el programa Techo Propio.";
export const accreditation = `PPYM cuenta con acreditación vigente como ${technicalEntity.label} por el ${technicalEntity.issuer}.`;

export const photos = workCollections.flatMap(collection => collection.photos);
export type Reply = { text: string; photos?: string[]; contact?: boolean };
export type Turn = Reply & { role: "user" | "assistant" };

export const shortcuts = ["Ver viviendas", "Consultar servicios", "Cómo empezar"];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function catalogReply(input: string, selected: string): Reply {
  const query = normalize(input);
  const construction = /\b(?:construccion|construir|edificar|edificacion)\b/.test(query);
  const wantsPhotos = /\b(?:ver|muestra\w*|ensena\w*|fotos?|imagenes|galeria|ejemplos?)\b/.test(query);
  if (query === "consultar servicios" || query === "servicios") return { text: "Podemos ayudarte con:\n" + services.map(s => "• " + s.title).join("\n") };
  if (/acredit|entidad tecnica|codigo (?:de )?et/.test(query)) {
    return { text: accreditation + " Nuestro código de Entidad Técnica es " + technicalEntity.code + "." };
  }
  if (/cotiz|precio|cuanto cuesta|presupuesto|whatsapp|hablar con (?:un |el )?asesor|plazo/.test(query)) {
    return { text: "El equipo puede evaluar el alcance y confirmar costos y plazos. Puedes revisar tu consulta antes de enviarla por WhatsApp.", contact: true };
  }
  if ((!construction || wantsPhotos) && /un (nivel|piso)|1 piso/.test(query)) {
    const item = techoPropioHomes.find(p => p.caption === "Vivienda de un nivel");
    if (item) return { text: "Construimos esta vivienda de un nivel con el programa Techo Propio. " + accreditation, photos: [item.src] };
  }
  if (/techo propio/.test(query) && !wantsPhotos) {
    return { text: accreditation + " ¿Te gustaría ver viviendas que construimos con el programa o contarnos qué necesitas para tu proyecto?" };
  }
  const collection = /interior|cocina|sala/.test(query) ? workCollections[1]
    : /acabado|baño|bano|revestimiento/.test(query) ? workCollections[2]
    : /casa|vivienda|fachada|foto|galeria|obra|techo propio/.test(query) ? workCollections[0] : null;
  if (collection && (!construction || wantsPhotos)) {
    const text = collection.photos === techoPropioHomes ? housingContext + " " + accreditation : collection.description;
    return { text, photos: collection.photos.map(p => p.src) };
  }
  if (/proceso|empezar|iniciar/.test(query)) {
    return { text: "Empezamos con una consulta sobre tu proyecto y los documentos que tienes. Luego seguimos estas etapas: " + stages.slice(1).map(s => s.title.toLowerCase()).join(", ") + "." };
  }
  if (/ubicacion|direccion|telefono|contacto/.test(query)) {
    return { text: "Puedes encontrarnos en " + company.address + ", " + company.city + ", o escribir al " + company.displayPhone + ".", contact: true };
  }
  // A broad interest in building is not evidence of a specific permit or service.
  if (construction && !/licencia|permiso|expediente|topogra|saneamiento|catastro|planos?|diseno|equipos?|ploteo|escaneo/.test(query)) {
    return { text: "Claro. ¿Qué te gustaría resolver sobre la construcción? Cuéntame si estás planeando la obra o si ya empezaste y tienes una duda concreta." };
  }
  const words = query.split(/\W+/).filter(w => w.length > 3 && w !== "construccion");
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
