import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { "es-PE": site.url },
      },
    },
    {
      url: `${site.url}/privacidad`,
      lastModified: new Date("2026-07-20"),
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: { "es-PE": `${site.url}/privacidad` },
      },
    },
  ];
}
