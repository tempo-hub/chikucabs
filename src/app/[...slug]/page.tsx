import { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { parseUrlSlug } from "@/lib/urlParser";
import routeData from "@/data/routeData.json";

// Import our premium modular UI templates
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import LocalServiceTemplate from "@/components/templates/LocalServiceTemplate";
import OneWayRouteTemplate from "@/components/templates/OneWayRouteTemplate";
import OutstationRouteFareTemplate from "@/components/templates/OutstationRouteFareTemplate";

// Vehicle-specific templates
import TempoTravellerRouteTemplate from "@/components/templates/TempoTravellerRouteTemplate";
import InnovaServiceTemplate from "@/components/templates/InnovaServiceTemplate";
import InnovaRouteTemplate from "@/components/templates/InnovaRouteTemplate";
import DriverServiceTemplate from "@/components/templates/DriverServiceTemplate";
import CityCabRoutesTemplate from "@/components/templates/CityCabRoutesTemplate";

import OneWayTemplate from "@/components/templates/OneWayTemplate";
import OutstationTemplate from "@/components/templates/OutstationTemplate";
import AirportTaxiTemplate from "@/components/templates/AirportTaxiTemplate";
import TempoTravellerTemplate from "@/components/templates/TempoTravellerTemplate";
import LocalSightseeingTemplate from "@/components/templates/LocalSightseeingTemplate";

// We do NOT pre-render all 4476 routes at build time (causes timeout on Vercel).
// Pages are generated on first request and cached via ISR (revalidate below).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const currentPath = `/${slug.join("/")}`;
  const isValidRoute = routeData.some(
    (r: { url: string }) =>
      r.url === currentPath || r.url === `${currentPath}.php`,
  );

  if (!isValidRoute) {
    notFound();
  }

  const parsed = parseUrlSlug(slug);

  let title =
    "Chiku Cabs | India's Most Trusted Cab Booking Service Since 2015";
  let description =
    "Book verified, GPS-tracked cabs, Tempo Travellers & Innova Crysta across 100+ cities. 1 Lakh+ trips completed. Safe & transparent. Call 8448445504 to book.";
  let keywords: string[] = [
    "cab booking India",
    "taxi service India",
    "outstation cabs",
    "Chiku Cabs",
    "online cab booking",
    "car rental India",
  ];

  if (parsed.routeType === "Outstation Route") {
    title = `${parsed.origin} to ${parsed.destination} One Way Cab | Chiku Cabs | Drop Taxi @ Best Price`;
    description = `Book outstation one way cab from ${parsed.origin} to ${parsed.destination}. Save on drop taxi fare with verified drivers & GPS tracking. Call 8448445504 to book now!`;
    keywords = [
      `${parsed.origin} to ${parsed.destination} one way cab`,
      `${parsed.origin} to ${parsed.destination} drop taxi`,
      `${parsed.origin} to ${parsed.destination} cab`,
      `${parsed.origin} to ${parsed.destination} taxi`,
      `${parsed.origin} to ${parsed.destination} ${parsed.vehicle?.toLowerCase()}`,
      `cab from ${parsed.origin}`,
      `${parsed.origin} to ${parsed.destination} cab fare`,
      `pay one side fare ${parsed.origin}`,
      `best cab service ${parsed.origin}`,
      `outstation cab ${parsed.origin}`,
      "Chiku Cabs",
    ];
  } else if (parsed.routeType === "Outstation Route Fare") {
    title = `${parsed.origin} to ${parsed.destination} ${parsed.vehicle} Fare | Rate Card | Chiku Cabs`;
    description = `Check ${parsed.origin} to ${parsed.destination} ${parsed.vehicle} fare. Complete rate card with Sedan, SUV, Innova & Tempo pricing. No hidden charges. Call 8448445504.`;
    keywords = [
      `${parsed.origin} to ${parsed.destination} cab fare`,
      `${parsed.origin} to ${parsed.destination} taxi rate`,
      `${parsed.origin} to ${parsed.destination} cab charges`,
      `${parsed.origin} to ${parsed.destination} per km rate`,
      `cheapest cab ${parsed.origin} to ${parsed.destination}`,
      "Chiku Cabs fare",
    ];
  } else if (parsed.routeType === "Local Service") {
    const seaterInfo =
      parsed.vehicleCategory === "tempo-traveller"
        ? " | 9-26 Seater"
        : parsed.vehicleCategory === "innova"
          ? " | 6-7 Seater"
          : "";
    title = `${parsed.vehicle} on Rent in ${parsed.origin} | Chiku Cabs${seaterInfo} @ Best Price`;
    description = `Hire verified ${parsed.vehicle} in ${parsed.origin} for local sightseeing, airport transfers & corporate travel. City-expert drivers, clean AC cars. Call 8448445504.`;
    keywords = [
      `${parsed.vehicle?.toLowerCase()} in ${parsed.origin}`,
      `cab in ${parsed.origin}`,
      `taxi ${parsed.origin}`,
      `${parsed.origin} cab service`,
      `${parsed.origin} taxi booking`,
      `local cab ${parsed.origin}`,
      `airport taxi ${parsed.origin}`,
      `${parsed.origin} sightseeing cab`,
      `cab near me ${parsed.origin}`,
      "Chiku Cabs",
    ];
  } else if (parsed.routeType === "Driver Service") {
    const cityStr = parsed.origin ? ` in ${parsed.origin}` : "";
    title = `Hire a Driver${cityStr} | Verified Chauffeurs on Rent | Chiku Cabs`;
    description = `Book professional, police-verified drivers${cityStr}. Driver on rent for local trips, outstation, and corporate events. 24/7 service. Call 8448445504 to book.`;
    keywords = [
      `hire driver${cityStr}`,
      `driver on rent${cityStr}`,
      `chauffeur service${cityStr}`,
      `permanent driver${cityStr}`,
      `driver agency${cityStr}`,
      `outstation driver${cityStr}`,
      "Chiku Cabs",
    ];
  } else if (parsed.routeType === "Service") {
    const vehicleLower = parsed.vehicle?.toLowerCase() || "cab";
    const seaterInfo =
      parsed.vehicleCategory === "tempo-traveller"
        ? " | 9-26 Seater"
        : parsed.vehicleCategory === "innova"
          ? " | 6-7 Seater"
          : "";
    title = `${parsed.vehicle} on Rent | Chiku Cabs${seaterInfo} | India's #1 Rental Service`;
    description = `Rent a premium ${parsed.vehicle} with Chiku Cabs. Verified drivers, 100+ cities. Travel outstation, local or airport trips safely. Call 8448445504 to book now.`;
    keywords = [
      `${vehicleLower} on rent`,
      `${vehicleLower} rental`,
      `${vehicleLower} hire India`,
      `${vehicleLower} booking online`,
      `best ${vehicleLower} service`,
      `${vehicleLower} near me`,
      `cheap ${vehicleLower} rental`,
      `${vehicleLower} with driver`,
      "Chiku Cabs",
    ];
  }

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Chiku Cabs", url: "https://chikucabs.com" }],
    creator: "Chiku Cabs",
    publisher: "Chiku Cabs",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large" as const,
      },
    },
    alternates: {
      canonical: `https://chikucabs.com/${slug.join("/")}`,
    },
    openGraph: {
      title,
      description,
      url: `https://chikucabs.com/${slug.join("/")}`,
      siteName: "Chiku Cabs",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "https://chikucabs.com/chikucabnewlogo.webp",
          width: 200,
          height: 60,
          alt: "Chiku Cabs Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const revalidate = 3600;
export const dynamicParams = true; // Allow on-demand ISR for all slug routes

export default async function DynamicRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const currentPath = `/${slug.join("/")}`;
  const isValidRoute = routeData.some(
    (r: { url: string }) =>
      r.url === currentPath || r.url === `${currentPath}.php`,
  );

  if (!isValidRoute) {
    notFound();
  }

  const parsed = parseUrlSlug(slug);
  const currentUrl = `https://chikucabs.com/${slug.join("/")}`;

  // --- STRUCTURED DATA (JSON-LD) ---

  // 1. Product / Service Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: parsed.routeType.includes("Outstation")
      ? `${parsed.vehicle} from ${parsed.origin} to ${parsed.destination}`
      : `${parsed.vehicle} Rental Service`,
    description: `Premium ${parsed.vehicle} rental service by Chiku Cabs. Verified drivers, GPS tracking, transparent pricing.`,
    brand: { "@type": "Brand", name: "Chiku Cabs" },
    offers: {
      "@type": "AggregateOffer",
      url: currentUrl,
      priceCurrency: "INR",
      lowPrice:
        parsed.vehicleCategory === "tempo-traveller"
          ? "18"
          : parsed.vehicleCategory === "innova"
            ? "14"
            : "9",
      highPrice:
        parsed.vehicleCategory === "tempo-traveller"
          ? "28"
          : parsed.vehicleCategory === "innova"
            ? "20"
            : "15",
      offerCount: "4",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "3250",
      reviewCount: "1850",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Nitin Agarwal",
        },
        reviewBody:
          "Excellent service and politely speaking driver. The trip was very comfortable and safe.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Priya Sharma",
        },
        reviewBody:
          "Booked an outstation cab with Chiku Cabs. The car was clean, AC worked perfectly, and driver was on time.",
      },
    ],
  };

  // 2. LocalBusiness with EEAT signals
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Chiku Cabs",
    alternateName: "Chiku Cabs Pvt Ltd",
    image: "https://chikucabs.com/chikucabnewlogo.webp",
    "@id": "https://chikucabs.com",
    url: "https://chikucabs.com",
    telephone: "+91-8448445504",
    email: "info@chikucabs.com",
    foundingDate: "2015",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 200,
    },
    slogan: "India's Most Trusted Cab Service",
    knowsAbout: [
      "Taxi Services",
      "Outstation Cabs",
      "Tempo Traveller Rental",
      "Innova Car Rental",
      "Airport Transfers",
      "Corporate Car Rental",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Noida Sector 2",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 28.5355, longitude: 77.391 },
    priceRange: "₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: ["https://wa.me/918448445504"],
  };

  // 3. BreadcrumbList for navigation
  const breadcrumbs: { name: string; url: string }[] = [
    { name: "Home", url: "https://chikucabs.com" },
  ];
  if (parsed.vehicleCategory === "tempo-traveller") {
    breadcrumbs.push({
      name: "Tempo Traveller",
      url: "https://chikucabs.com/tempo-traveller-on-rent",
    });
  } else if (parsed.vehicleCategory === "innova") {
    breadcrumbs.push({
      name: "Innova Crysta",
      url: "https://chikucabs.com/innova-car-rental",
    });
  } else if (parsed.vehicleCategory === "driver") {
    breadcrumbs.push({
      name: "Hire Driver",
      url: "https://chikucabs.com/hire-driver",
    });
  } else {
    breadcrumbs.push({
      name: "Cab Services",
      url: "https://chikucabs.com/outstation-cabs",
    });
  }
  if (parsed.origin && parsed.routeType !== "Service") {
    breadcrumbs.push({
      name: `${parsed.vehicle} in ${parsed.origin}`,
      url: currentUrl,
    });
  } else {
    breadcrumbs.push({ name: `${parsed.vehicle} Rental`, url: currentUrl });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((bc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: bc.name,
      item: bc.url,
    })),
  };

  // 4. FAQ Schema — dynamically generated per vehicle/route
  const faqItems =
    parsed.routeType === "Driver Service"
      ? [
          {
            q: `How much does it cost to hire a driver${parsed.origin ? ` in ${parsed.origin}` : ""}?`,
            a: `Hiring a driver starts at competitive rates for local travel. For outstation trips, the driver allowance is typically fixed per day depending on the route.`,
          },
          {
            q: `Are the drivers verified and safe?`,
            a: `Yes, all Chiku Cabs drivers undergo mandatory police verification, rigorous background checks, and driving tests before fulfilling any trips.`,
          },
          {
            q: `Can I hire a driver for an outstation trip?`,
            a: `Absolutely. You can hire an experienced outstation driver who is fully familiar with highway navigation and hill driving.`,
          },
        ]
      : parsed.vehicleCategory === "tempo-traveller"
        ? [
            {
              q: `How much does a Tempo Traveller cost${parsed.origin ? ` from ${parsed.origin}` : ""}${parsed.destination ? ` to ${parsed.destination}` : ""}?`,
              a: `Tempo Traveller pricing starts from ₹18/km for a 12-seater and goes up to ₹28/km for a 26-seater. The total cost depends on distance, number of days, and seating capacity. Call 8448445504 for an instant quote.`,
            },
            {
              q: "What seating options are available in Tempo Travellers?",
              a: "We offer 12 seater, 16 seater, 20 seater, and 26 seater AC Tempo Travellers. All come with pushback reclining seats, music system, charging points, and ample luggage space.",
            },
            {
              q: "Are Chiku Cabs Tempo Travellers safe for long trips?",
              a: "Yes. All Tempo Travellers are GPS-tracked, regularly serviced, and driven by background-verified, experienced drivers. We also provide first-aid kits, fire extinguishers, and 24/7 roadside assistance.",
            },
          ]
        : parsed.vehicleCategory === "innova"
          ? [
              {
                q: `What is the Innova Crysta rental price${parsed.origin ? ` in ${parsed.origin}` : ""}?`,
                a: `Innova rental starts from ₹14/km, Crysta from ₹17/km, and HyCross from ₹20/km. Prices include fuel, driver allowance, and GST. Call 8448445504 for exact pricing.`,
              },
              {
                q: "What's the difference between Innova and Innova Crysta?",
                a: "The standard Innova offers good comfort at a lower price. The Innova Crysta features premium captain seats, automatic climate control, better suspension, and more luxurious interiors. The HyCross adds a hybrid engine and panoramic sunroof.",
              },
              {
                q: "Can I hire an Innova for a wedding?",
                a: "Yes, Chiku Cabs offers decorated and non-decorated Innovas for weddings, including baarat, guest transfers, and VIP transportation. Book in advance for the best availability.",
              },
            ]
          : [
              {
                q: `How do I book a cab${parsed.origin ? ` in ${parsed.origin}` : ""}${parsed.destination ? ` to ${parsed.destination}` : ""} with Chiku Cabs?`,
                a: `Simply call 8448445504 or WhatsApp us with your travel details. You'll get an instant quote and confirmation. No app download required. We offer 24/7 booking across 100+ Indian cities.`,
              },
              {
                q: `What is the cab fare${parsed.origin ? ` from ${parsed.origin}` : ""}${parsed.destination ? ` to ${parsed.destination}` : ""}?`,
                a: `Sedan fares start from ₹9/km, SUV from ₹12/km, Innova from ₹15/km. All fares include driver allowance, fuel, and GST. Toll charges are at actuals. We offer a price match guarantee.`,
              },
              {
                q: "Why should I choose Chiku Cabs over Uber/Ola?",
                a: "Chiku Cabs offers fixed pricing (no surge), verified & dedicated drivers, 24/7 human support, free cancellation up to 24 hours, and vehicles specifically maintained for outstation/long-distance travel. With 1 Lakh+ completed trips since 2015, we're India's most trusted outstation cab service.",
              },
            ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // Select template: Vehicle category first, then route type
  const renderTemplate = () => {
    const CITY_SLUGS = [
      "delhi",
      "ujjain",
      "indore",
      "haridwar",
      "mumbai",
      "chennai",
      "varanasi",
      "ayodhya",
      "lucknow",
      "bangalore",
      "madurai",
      "hyderabad",
      "rameshwaram",
      "kanyakumari",
      "pondicherry",
      "mirzapur",
      "jaunpur",
      "sarnath",
    ];

    const slugValue = currentPath.replace(/^\/+/, "");

    if (CITY_SLUGS.includes(slugValue)) {
      return <CityCabRoutesTemplate city={slugValue} />;
    }

    if (slugValue === "outstation-cabs") {
      return <OutstationTemplate parsedData={parsed} />;
    }
    if (slugValue === "one-way-cabs") {
      return <OneWayTemplate parsedData={parsed} />;
    }
    if (slugValue === "local-sightseeing-taxi") {
      return <LocalSightseeingTemplate parsedData={parsed} />;
    }
    if (slugValue === "airport-taxi") {
      return <AirportTaxiTemplate parsedData={parsed} />;
    }
    if (slugValue === "tempo-traveller-on-rent") {
      return <TempoTravellerTemplate parsedData={parsed} />;
    }

    if (parsed.vehicleCategory === "tempo-traveller") {
      if (
        parsed.routeType === "Outstation Route" ||
        parsed.routeType === "Outstation Route Fare"
      ) {
        return <TempoTravellerRouteTemplate parsedData={parsed} />;
      }
      return <ServiceTemplate parsedData={parsed} />;
    }
    if (parsed.vehicleCategory === "innova") {
      if (
        parsed.routeType === "Outstation Route" ||
        parsed.routeType === "Outstation Route Fare"
      ) {
        return <InnovaRouteTemplate parsedData={parsed} />;
      }
      return <InnovaServiceTemplate parsedData={parsed} />;
    }
    if (parsed.routeType === "Driver Service") {
      return <DriverServiceTemplate parsedData={parsed} />;
    }
    switch (parsed.routeType) {
      case "Outstation Route":
        return <OneWayRouteTemplate parsedData={parsed} />;
      case "Outstation Route Fare":
        return <OutstationRouteFareTemplate parsedData={parsed} />;
      case "Local Service":
        return <LocalServiceTemplate parsedData={parsed} />;
      case "Service":
      default:
        return <ServiceTemplate parsedData={parsed} />;
    }
  };

  return (
    <>
      <Script
        id="json-ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {renderTemplate()}
    </>
  );
}
