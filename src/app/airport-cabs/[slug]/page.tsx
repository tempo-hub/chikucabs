import type { Metadata } from "next";
import AirportCityPage from "./AirportCityPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getCityName = (slug: string) => {
  const cityKey = slug.replace(/-airport$/, "");

  return cityKey
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const cityKey = slug.replace(/-airport$/, "");
  const cityName = getCityName(slug);

  const title = `${cityName} Airport Cab Service @ ₹10/km | Get 500 OFF Extra`;

  const description = `Book ${cityName} airport taxi and cab service with Chiku Cabs. Get reliable airport pickup and drop, professional drivers, transparent fares and 24x7 booking support. Call 9818022327 Book Now.`;

  return {
    title,

    description,

    keywords: [
      `${cityName} airport taxi`,
      `${cityName} airport cab`,
      `${cityName} airport taxi service`,
      `airport pickup ${cityName}`,
      `airport drop ${cityName}`,
      `${cityName} airport transfer`,
      `cab to ${cityName} airport`,
      `taxi from ${cityName} airport`,
    ],

    authors: [
      {
        name: "Chiku Cabs",
      },
    ],

    alternates: {
      canonical: `https://chikucabs.com/airport-cabs/${cityKey}-airport`,
    },

    openGraph: {
      title,
      description,
      url: `https://chikucabs.com/airport-cabs/${cityKey}-airport`,
      siteName: "Chiku Cabs",
      type: "website",
      images: [
        {
          url: "https://chikucabs.com/cab-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${cityName} Airport Cab Service - Chiku Cabs`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://chikucabs.com/cab-og-image.jpg"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <AirportCityPage />;
}