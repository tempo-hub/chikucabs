import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import LazyFleetShowcase from "@/components/home/LazyFleetShowcase";
import HeroSection from "@/components/home/HeroBooking";
import HowItWorks from "@/components/home/HowItWorks";
import PopularRoutes from "@/components/home/PopularRoutes";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustProtocols from "@/components/home/TrustProtocols";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Metadata } from "next";
import {
  CHIKU_LOCAL_BUSINESS_SCHEMA,
  CHIKU_ORGANIZATION_SCHEMA,
} from "@/data/businessSchema";


export const metadata: Metadata = {
  title: "Book Cabs, Airport Taxis & Tempo Travellers | Chiku Cabs",
  description:
    "Book outstation cabs, airport taxis, and tempo travellers across India. Get comfortable rides, professional drivers, and clear pricing from Chiku Cabs. Call 9818022327.",
  keywords: [
    "cab booking India",
    "outstation cabs",
    "taxi service",
    "tempo traveller",
    "airport taxi",
    "one way cab",
    "Chiku Cabs",
  ],
  openGraph: {
    title: "Book Cabs, Airport Taxis & Tempo Travellers | Chiku Cabs",
    description:
      "Book outstation cabs, airport taxis, and tempo travellers across India with professional drivers and clear pricing.",
    url: "https://chikucabs.com",
    siteName: "Chiku Cabs",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://chikucabs.com/",
  },
};

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    CHIKU_ORGANIZATION_SCHEMA,
    {
      "@type": "WebSite",
      "@id": "https://chikucabs.com/#website",
      url: "https://chikucabs.com/",
      name: "Chiku Cabs",
      publisher: { "@id": "https://chikucabs.com/#organization" },
      inLanguage: "en-IN",
    },
    CHIKU_LOCAL_BUSINESS_SCHEMA,
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      <div className="">
        <HeroSection />
        <StatsSection />
        <ServicesGrid />
        <HowItWorks />
        <LazyFleetShowcase />
        <TrustProtocols />
        <PopularRoutes />
        <WhyChooseUs />
        <TestimonialsSection />
        <FaqSection />
        <FinalCta />
      </div>
    </>
  );
}