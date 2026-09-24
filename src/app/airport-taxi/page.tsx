import type { Metadata } from "next";
import AirportTaxiTemplate from "@/components/templates/AirportTaxiTemplate";

export const metadata: Metadata = {
  title: "Airport Taxi Service | 24x7 Airport Pickup & Drop | Chiku Cabs",

  description:
    "Book reliable airport taxi service for pickup and drop across India. Get verified drivers, transparent fares and 24x7 support. Call 9818022327 to book now.",

  keywords: [
    "airport taxi service",
    "airport taxi",
    "airport cab service",
    "airport pickup service",
    "airport drop service",
    "airport taxi booking",
    "airport transfer service",
    "airport cab booking",
    "24x7 airport taxi",
    "Chiku Cabs",
  ],

  alternates: {
    canonical: "https://chikucabs.com/airport-taxi",
  },

  openGraph: {
    title: "Airport Taxi Service | 24x7 Airport Pickup & Drop | Chiku Cabs",
    description:
      "Book reliable airport taxi service for pickup and drop across India. Verified drivers, transparent fares and 24x7 support.",
    url: "https://chikucabs.com/airport-taxi",
    siteName: "Chiku Cabs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://chikucabs.com/cab-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chiku Cabs Airport Taxi Service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Airport Taxi Service | 24x7 Airport Pickup & Drop | Chiku Cabs",
    description:
      "Book reliable airport taxi service for pickup and drop across India. Verified drivers, transparent fares and 24x7 support.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AirportTaxiTemplate />;
}