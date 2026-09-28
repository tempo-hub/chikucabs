import type { Metadata } from "next";
import UrbaniaTemplates from "@/components/templates/UrbaniaTemplates";

export const metadata: Metadata = {
  title: "Urbania on Rent @ ₹28/km | Get 500 OFF Extra",
  description:
    "Book luxury Force Urbania tempo traveller on rent with Chiku Cabs. Available in 10, 13 & 17 seater configurations with plush pushback seats, dual AC & verified chauffeurs.",
  keywords: [
    "force urbania on rent",
    "urbania luxury tempo traveller",
    "hire urbania van",
    "chiku cabs urbania rental",
    "luxury van hire india",
  ],
  openGraph: {
    title: "Force Urbania on Rent | Luxury Tempo Traveller Hire – Chiku Cabs",
    description:
      "Hire premium Force Urbania tempo traveller for outstation tours, airport transfers, weddings & corporate trips with Chiku Cabs.",
    url: "https://chikucabs.com/force-urbania-on-rent",
    siteName: "Chiku Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function UrbaniaPage() {
  return <UrbaniaTemplates />;
}