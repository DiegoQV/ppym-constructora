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
export type Reply = {
  text: string;
  photos?: string[];
  contact?: boolean;
  directions?: boolean;
  registration?: "documents" | "review";
};
export type Turn = Reply & { role: "user" | "assistant" };

export const shortcuts = ["Ver viviendas", "Consultar servicios", "Cómo empezar", "Cómo llegar"];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const genericServiceTerms = new Set([
  "como", "construccion", "esta", "estan", "este", "esto", "hacer", "hago", "hola",
  "para", "proyecto", "proyectos", "puedo", "quiero", "servicio", "servicios", "sobre",
  "tengo", "trabajo", "trabajos",
]);

export function officeLocationReply(input: string): Reply | undefined {
  const query = normalize(input).replace(/[¿?¡!.,]/g, " ").replace(/\s+/g, " ").trim();
  const directQuestion = /^(?:como (?:llego|llegar)|donde (?:quedan|estan(?: ubicados)?|se (?:ubican|encuentran)|los encuentro)|(?:cual es )?(?:(?:su|tu|la) )?(?:direccion|ubicacion))$/.test(query);
  const officeMention = /\b(?:oficinas?|sede)\b/.test(query);
  const locationQuestion = /\b(?:direccion|ubicacion|mapa|como (?:llego|llegar)|donde (?:quedan?|estan?|se (?:ubican?|encuentran?)))\b/.test(query);
  const companyLocation = /\b(?:(?:direccion|ubicacion|mapa) de|como (?:llego|llegar) a|donde (?:queda|esta|se ubica|se encuentra)) ppym\b/.test(query);

  if (directQuestion || (officeMention && locationQuestion) || companyLocation) {
    return {
      text: `Nuestra oficina está en ${company.address}, ${company.city}, ${company.region}.`,
      directions: true,
    };
  }
}

function landRegistrationReply(query: string, previousReply: Turn | undefined): Reply | undefined {
  const mentionsProperty = /\b(?:terrenos?|predios?|lotes?|propiedad(?:es)?)\b/.test(query);
  const mentionsRegistration = /\b(?:inscri\w*|registr\w*|titulos?|titulacion)\b/.test(query);
  const isRegistrationQuestion = (mentionsProperty && mentionsRegistration) || /\b(?:sunarp|inmatriculacion)\b/.test(query);
  const stage = previousReply?.role === "assistant" ? previousReply.registration : undefined;
  if (!stage && !isRegistrationQuestion) return;

  const answer = query.replace(/[¿?¡!.,]/g, " ").replace(/\s+/g, " ").trim();
  const mentionsDocument = /\b(?:planos?|croquis|contratos?|escrituras?|constancias?|titulos?|documentos?)\b/.test(answer);
  const describesDocuments = /^(?:(?:solo|solamente|por ahora) )?(?:tengo|tenemos|se tiene|cuento con|contamos con|se cuenta con|hay)\b/.test(answer);
  const namesDocument = /^(?:solo )?(?:(?:el|la|un|una|mi) )?(?:plano|croquis|contrato|escritura|constancia|titulo)$/.test(answer);
  const hasNoDocuments = /^(?:(?:aun|todavia) )?no (?:tengo|tenemos|se tiene) (?:ningun documento|documentos|nada)$/.test(answer);
  if ((mentionsDocument && describesDocuments) || namesDocument || hasNoDocuments) {
    if (hasNoDocuments) {
      return {
        text: "Si por ahora no tienes documentos, el equipo de saneamiento físico-legal puede orientarte a partir de la información que sí tengas del predio.",
        registration: "review",
      };
    }
    const startingPoint = /\bplanos?\b/.test(answer)
      ? "Gracias, con el plano podemos empezar a revisar qué información hay sobre el terreno."
      : "Gracias, eso aclara con qué documentación podemos empezar a revisar el terreno.";
    return {
      text: startingPoint + " El equipo de saneamiento físico-legal puede ayudarte a identificar qué falta para evaluar la inscripción.",
      registration: "review",
    };
  }

  if (stage && /^(?:y )?(?:que paso|que hago|que sigue|que hago ahora|ahora que hago|ahora que|como sigo|cual es el siguiente paso)$/.test(answer)) {
    return {
      text: stage === "review"
        ? "Seguimos con la consulta sobre la inscripción del terreno. El siguiente paso es revisar qué información hay del predio. Puedes preparar esa consulta desde «Hablar con el equipo»."
        : "Seguimos revisando cómo orientar la inscripción del terreno. Para empezar, dime si tienes un plano, un contrato u otro documento del predio.",
      registration: stage,
    };
  }

  if (isRegistrationQuestion) {
    return {
      text: "Podemos orientarte con el servicio de saneamiento físico-legal. El primer paso es revisar la situación del terreno y los documentos que ya tienes. ¿Con qué documento cuentas sobre el terreno?",
      registration: "documents",
    };
  }
}

export function catalogReply(input: string, selected: string, history: readonly Turn[] = []): Reply {
  const location = officeLocationReply(input);
  if (location) return location;

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
  const registration = landRegistrationReply(query, history.at(-1));
  if (registration) return registration;
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
  const words = [...new Set(query.split(/\W+/))].filter(word => word.length > 3 && !genericServiceTerms.has(word));
  const [best, runnerUp] = services.map(service => {
    const terms = new Set(normalize([service.title, ...service.items].join(" ")).split(/\W+/));
    return { service, score: words.filter(word => terms.has(word)).length };
  }).sort((a, b) => b.score - a.score);
  if (best && best.score > (runnerUp?.score ?? 0)) {
    const { service } = best;
    return { text: service.title + ". " + service.description + "\n\n" + service.items.join(" · ") };
  }
  if (/servicio|ofrecen/.test(query)) return { text: "Podemos ayudarte con:\n" + services.map(s => "• " + s.title).join("\n") };
  const reference = photos.find(p => p.src === selected);
  if (reference && /esa|esta|referencia/.test(query)) return { text: reference.alt + ". Puedes usarla como referencia para tu consulta.", contact: true };
  return { text: "Puedo mostrarte viviendas, consultar los servicios publicados o explicarte cómo empieza un proyecto. ¿Qué te gustaría explorar?" };
}
