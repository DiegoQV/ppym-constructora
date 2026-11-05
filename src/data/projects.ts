export interface WorkPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface WorkCollection {
  number: string;
  name: string;
  description: string;
  photos: WorkPhoto[];
}

const photo = (file: string, caption: string, alt: string): WorkPhoto => ({
  src: `/images/obras/${file}.webp`, caption, alt,
});

// Supplied and authorized by the client on 2026-11-03 as photographs of PPYM's work.
// Descriptive groupings only: project names, locations and dates were not supplied.
export const workCollections: WorkCollection[] = [
  {
    number: "01",
    name: "Viviendas",
    description: "Fachadas, accesos y exteriores de nuestras obras realizadas.",
    photos: [
      photo("fachada-puerta-madera", "Fachada con puerta de madera", "Vivienda terminada con fachada crema, puerta de madera, dos ventanas y revestimiento en el zócalo"),
      photo("fachada-amarilla-revestimiento", "Fachada y revestimiento exterior", "Vivienda amarilla con ventanas de marco negro, acceso central y revestimiento de piedra en el zócalo"),
      photo("fachada-amarilla-zocalo-rojo", "Vivienda de un nivel", "Fachada amarilla con zócalo rojo, dos ventanas y cubierta metálica"),
      photo("fachada-area-lavado", "Exterior con área de lavado", "Fachada crema con puerta abierta, lavadero exterior y bajante pluvial"),
      photo("viviendas-accesos-independientes", "Fachadas y accesos", "Vista amplia de viviendas terminadas con fachadas crema y amarilla y accesos independientes"),
      photo("fachada-acceso-abierto", "Acceso y acabados de fachada", "Vivienda con acceso abierto, ventana lateral y revestimiento exterior entre muros de ladrillo"),
      photo("fachada-iluminacion-muros", "Iluminación exterior", "Fachada de vivienda con puerta de madera, luminarias de muro y piso cerámico en el ingreso"),
    ],
  },
  {
    number: "02",
    name: "Interiores",
    description: "Ambientes de vivienda, circulación y espacios para el día a día.",
    photos: [
      photo("sala-piso-ceramico", "Sala y circulación interior", "Sala con sofá, piso cerámico gris y cielo raso blanco con iluminación empotrada"),
      photo("interior-dormitorios-cocina", "Distribución de ambientes", "Interior de vivienda con accesos a dormitorios y área de cocina con revestimiento azul"),
      photo("interior-lavadero-pasillo", "Área de lavado y circulación", "Lavadero interior con revestimiento azul junto a un pasillo de piso cerámico"),
      photo("interior-cocina-circulacion", "Cocina y ambientes conectados", "Espacio de cocina con lavadero, revestimiento cerámico y circulación hacia otros ambientes"),
    ],
  },
  {
    number: "03",
    name: "Acabados",
    description: "Revestimientos, instalaciones y detalles que completan cada espacio.",
    photos: [
      photo("bano-revestimiento-marmolado", "Baño con revestimiento marmolado", "Baño terminado con revestimiento marmolado, ducha, nicho iluminado, inodoro y lavamanos"),
      photo("bano-ceramico-madera", "Baño con cerámica tipo madera", "Baño con revestimiento cerámico tipo madera, ducha, lavamanos y repisas"),
      photo("detalle-drenaje-pluvial", "Detalle de evacuación pluvial", "Canaleta y bajante pluvial en encuentro de cubierta con fachada revestida"),
    ],
  },
];
