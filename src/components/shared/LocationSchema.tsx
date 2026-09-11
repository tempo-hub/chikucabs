type LocationSchemaProps = {
  city: string;
  locality: string;
  vehicle: string;
  url: string;
};

export default function LocationSchema({
  city,
  locality,
  vehicle,
  url,
}: LocationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: `hire ${vehicle} on Rent in ${locality}`,

    description: `Hire ${vehicle} on rent in ${locality}, ${city} for local travel, airport transfers, corporate travel and outstation trips.`,

    serviceType: `${vehicle} Car Rental`,

    provider: {
      "@type": "LocalBusiness",
      name: "Chiku Cabs",
      telephone: "+91-8448445504",
      url: "https://www.chikucabs.com",
    },

    areaServed: {
      "@type": "Place",
      name: locality,
      containedInPlace: {
        "@type": "City",
        name: city,
      },
    },

    url: `https://www.chikucabs.com${url}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}