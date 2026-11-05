// Asset preparation only: preserve the supplied photographs, dimensions and colors.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const photos = [
  ['6c69b51b-d1bc-4a6c-b2e6-8b38a08a1a6e', 'fachada-amarilla-revestimiento'],
  ['16be20d8-4f06-4d8d-b317-135f1ab4d1f6', 'bano-ceramico-madera'],
  ['711893f7-95d3-468c-8d8e-ebf6388cb999', 'fachada-amarilla-zocalo-rojo'],
  ['7f3f2cf1-a226-47c4-a435-d7ae2ec7cf5a', 'fachada-area-lavado'],
  ['c5d56aa2-8677-47f9-a94d-0db947de14c7', 'viviendas-accesos-independientes'],
  ['e7ce0e5c-0c8a-4b80-a701-73c855aaf182', 'sala-piso-ceramico'],
  ['5448a318-d6e1-4137-9cf9-398066643c35', 'interior-dormitorios-cocina'],
  ['916bd3ad-d2c4-424d-af70-06ee10a05bed', 'fachada-acceso-abierto'],
  ['8cef6902-51ed-4774-b42a-607358104a9f', 'detalle-drenaje-pluvial'],
  ['1dea008a-9a5e-485c-908c-be4dbb0894a2', 'interior-lavadero-pasillo'],
  ['d82391fb-1884-4b3c-865d-81f16f338e88', 'bano-revestimiento-marmolado'],
  ['51d92a88-2658-4f8c-b6aa-4b8a78b69d86', 'fachada-iluminacion-muros'],
  ['e46ff5df-28e5-4147-ae95-c5790ec0d08a', 'fachada-puerta-madera'],
  ['52c0f26e-8b09-45cf-8e41-b20135271605', 'interior-cocina-circulacion'],
];

async function main() {
  const inputDirectory = process.argv[2];
  if (!inputDirectory) throw new Error('Provide the directory containing the supplied clipboard PNGs.');
  const outputDirectory = fileURLToPath(new URL('../public/images/obras/', import.meta.url));
  await fs.mkdir(outputDirectory, { recursive: true });
  let originalBytes = 0;
  let optimizedBytes = 0;
  for (const [id, name] of photos) {
    const source = path.join(inputDirectory, `codex-clipboard-${id}.png`);
    originalBytes += (await fs.stat(source)).size;
    const result = await sharp(source).webp({ quality: 85, effort: 6 }).toFile(path.join(outputDirectory, `${name}.webp`));
    optimizedBytes += result.size;
  }
  console.log(JSON.stringify({ photos: photos.length, originalBytes, optimizedBytes }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
