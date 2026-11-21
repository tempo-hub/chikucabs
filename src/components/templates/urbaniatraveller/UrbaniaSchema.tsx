import React from "react";
import {
  CHIKU_LOCAL_BUSINESS_SCHEMA,
  CHIKU_ORGANIZATION_SCHEMA,
} from "@/data/businessSchema";
import { createSchemaGraph } from "@/lib/structuredData";

interface UrbaniaSchemaProps {
  city?: string;
  pageUrl?: string;
}

export default function UrbaniaSchema({
  city = "Noida",
  pageUrl,
}: UrbaniaSchemaProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://chikucabs.com";

  const url =
    pageUrl ||
    `${baseUrl}/${city.toLowerCase().replace(/\s+/g, "-")}/urbania-traveller`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: city,
        item: `${baseUrl}/${city
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Urbania Traveller",
        item: url,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${city} Urbania Traveller Booking`,
    serviceType: "Urbania Traveller Rental",
    description: `Book a 12 Seater or 17 Seater Urbania Traveller from ${city} with Chiku Cabs for local and outstation group travel.`,
    url,
    provider: { "@id": "https://chikucabs.com/#localbusiness" },
    areaServed: {
      "@type": "City",
      name: city,
    },
    offers: [
      {
        "@type": "Offer",
        name: "12 Seater Urbania Traveller",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "17 Seater Urbania Traveller",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const schemaGraph = createSchemaGraph(
    CHIKU_ORGANIZATION_SCHEMA,
    CHIKU_LOCAL_BUSINESS_SCHEMA,
    breadcrumbSchema,
    serviceSchema,
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}