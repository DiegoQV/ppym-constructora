import { company } from "@/data/company";
import { services } from "@/data/services";
import { technicalEntity } from "@/data/navigation";
import { site } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#business`,
    name: company.shortName,
    legalName: company.legalName,
    url: site.url,
    logo: `${site.url}/logo/ppym-logo-navbar-inverse.webp`,
    image: `${site.url}/images/hero/ppym-large-construction-team-right-v4.webp`,
    description: site.description,
    taxID: company.ruc,
    foundingDate: String(company.activitiesStarted),
    telephone: `+51 ${company.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: "PE",
    },
    areaServed: [
      { "@type": "City", name: company.city },
      { "@type": "AdministrativeArea", name: company.region },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+51 ${company.phone}`,
      contactType: "customer service",
      availableLanguage: ["es"],
      areaServed: "PE",
    },
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "RUC",
        value: company.ruc,
      },
      {
        "@type": "PropertyValue",
        propertyID: "Código de Entidad Técnica",
        value: technicalEntity.code,
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: technicalEntity.label,
      credentialCategory: "Entidad Técnica",
      recognizedBy: {
        "@type": "Organization",
        name: technicalEntity.issuer,
      },
      identifier: technicalEntity.code,
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        areaServed: [company.city, company.region],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
