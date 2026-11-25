This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Asistente de PPYM

Configura `GEMINI_API_KEY` como variable del servidor. `GEMINI_MODEL` permite elegir el modelo principal y usa `gemini-3.1-flash-lite` por defecto.

`GROQ_API_KEY` activa Groq con `openai/gpt-oss-20b` como respaldo. Si Gemini falla, Groq recibe el mismo historial y genera la respuesta. Si solo se configura la clave de Groq, el asistente lo usa directamente. Puedes crear la clave en [GroqCloud](https://console.groq.com/keys).

Guarda la clave en las variables de entorno del proyecto en Vercel para Production y genera un nuevo despliegue. Para desarrollo local, usa `.env.local`.

Si Groq no está configurado, `GEMINI_FALLBACK_MODEL` permite reintentar con un segundo modelo de Gemini con la misma clave. Debe admitir respuestas JSON estructuradas. Si queda vacío, el asistente reintenta con el modelo principal después de un fallo temporal.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
