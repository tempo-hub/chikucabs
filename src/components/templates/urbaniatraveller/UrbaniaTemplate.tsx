
import React from "react";

import UrbaniaBreadcrumb from "./UrbaniaBreadcrumb";
import UrbaniaHero from "./UrbaniaHero";
import UrbaniaTrustBar from "./UrbaniaTrustBar";
import UrbaniaIntro from "./UrbaniaIntro";
import UrbaniaVehicleComparison from "./UrbaniaVehicleComparison";
import UrbaniaVehicleSection from "./UrbaniaVehicleSection";
import UrbaniaWhyChooseChiku from "./UrbaniaWhyChooseChiku";
import UrbaniaHowItWorks from "./UrbaniaHowItWorks";
import UrbaniaFeatures from "./UrbaniaFeatures";
import UrbaniaFareSection from "./UrbaniaFareSection";
import UrbaniaUseCases from "./UrbaniaUseCases";
import UrbaniaPopularRoutes from "./UrbaniaPopularRoutes";
import UrbaniaServiceAreas from "./UrbaniaServiceAreas";
import UrbaniaTravelInfo from "./UrbaniaTravelInfo";
import UrbaniaFAQ from "./UrbaniaFAQ";
import UrbaniaSEOContent from "./UrbaniaSEOContent";
import UrbaniaFinalCTA from "./UrbaniaFinalCTA";
import UrbaniaStickyMobileCTA from "./UrbaniaStickyMobileCTA";
import UrbaniaSchema from "./UrbaniaSchema";

interface UrbaniaTemplateProps {
  city?: string;
}

export default function UrbaniaTemplate({
  city = "Noida",
}: UrbaniaTemplateProps) {
  return (
    <>
      {/* SEO / Structured Data */}
      {/* <UrbaniaSchema city={city} /> */}

      <main className="min-h-screen bg-white/95">

        {/* Hero */}
        <UrbaniaHero city={city} />

        {/* Quick Trust / Benefits */}
        <UrbaniaTrustBar city={city} />

        {/* Breadcrumb */}
        <UrbaniaBreadcrumb city={city} />

        {/* Introduction */}
        <UrbaniaIntro city={city} />

        {/* 12 & 17 Seater Comparison */}
        <UrbaniaVehicleComparison city={city} />

        {/* Vehicle Details */}
        <UrbaniaVehicleSection city={city} />

        {/* Why Choose Chiku Cabs */}
        {/* <UrbaniaWhyChooseChikuCabs city={city} /> */}

        {/* Additional Trust Section */}
        <UrbaniaWhyChooseChiku city={city} />

        {/* How Booking Works */}
        <UrbaniaHowItWorks city={city} />

        {/* Urbania Features */}
        <UrbaniaFeatures city={city} />

        {/* Fare */}
        <UrbaniaFareSection city={city} />

        {/* Use Cases */}
        <UrbaniaUseCases city={city} />

        {/* Popular Routes */}
        <UrbaniaPopularRoutes city={city} />

        {/* Service Areas */}
        <UrbaniaServiceAreas city={city} />

        {/* Travel Information */}
        <UrbaniaTravelInfo city={city} />

        {/* FAQ */}
        <UrbaniaFAQ city={city} />

        {/* SEO Content */}
        <UrbaniaSEOContent city={city} />

        {/* Final CTA */}
        <UrbaniaFinalCTA city={city} />
      </main>

      {/* Mobile Sticky CTA */}
      <UrbaniaStickyMobileCTA city={city} />
    </>
  );
}

