import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import FleetShowcase from "@/components/home/FleetShowcase";
import HeroSection from "@/components/home/HeroBooking";
import HowItWorks from "@/components/home/HowItWorks";
import PopularRoutes from "@/components/home/PopularRoutes";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustProtocols from "@/components/home/TrustProtocols";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Chiku Cabs | India's #1 Premium Taxi & Cab Rental Service",
  description:
    "Book premium outstation cabs, tempo travellers, and airport taxis across 100+ cities in India. Verified drivers, transparent pricing, 24/7 support. Call 9818022327.",
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
    title: "Chiku Cabs | India's #1 Premium Taxi & Cab Rental Service",
    description:
      "Book premium outstation cabs, tempo travellers, and airport taxis across 100+ cities in India.",
    url: "https://chikucabs.com",
    siteName: "Chiku Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <HowItWorks />
      <FleetShowcase />
      <TrustProtocols />
      <PopularRoutes />
      <WhyChooseUs />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </div>
  );
}