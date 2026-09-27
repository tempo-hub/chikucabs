import React from "react";
import UrbaniaRouteBreadcrumb from "./UrbaniaRouteBreadcrumb";
import UrbaniaRouteHero from "./UrbaniaRouteHero";
import UrbaniaRouteTrustBar from "./UrbaniaRouteTrustBar";
import UrbaniaRouteOverview from "./UrbaniaRouteOverview";
import UrbaniaRouteVehicleSection from "./UrbaniaRouteVehicleSection";
import UrbaniaRouteFare from "./UrbaniaRouteFare";
import UrbaniaRouteHighlights from "./UrbaniaRouteHighlights";
import UrbaniaRouteJourneyInfo from "./UrbaniaRouteJourneyInfo";
import UrbaniaRouteBooking from "./UrbaniaRouteBooking";
import UrbaniaRouteWhyChoose from "./UrbaniaRouteWhyChoose";
import UrbaniaRouteTravelTips from "./UrbaniaRouteTravelTips";
import UrbaniaRouteFAQ from "./UrbaniaRouteFAQ";
import UrbaniaRouteSEOContent from "./UrbaniaRouteSEOContent";
import UrbaniaRouteCTA from "./UrbaniaRouteCTA";



interface UrbaniaRouteTemplateProps {
  fromCity: string;
  toCity: string;
  distance?: number;
}

export default function UrbaniaRouteTemplate({
  fromCity,
  toCity,
  distance,
}: UrbaniaRouteTemplateProps) {
  return (
    <>
      {/* <UrbaniaRouteSchema
        fromCity={fromCity}
        toCity={toCity}
        distance={distance}
      /> */}

      <main className="min-h-screen bg-white">
        

        {/* Hero */}
        <UrbaniaRouteHero
          fromCity={fromCity}
          toCity={toCity}
          distance={distance}
        />

        {/* Trust points */}
        <UrbaniaRouteTrustBar />


        {/* Breadcrumb */}
        <UrbaniaRouteBreadcrumb
          fromCity={fromCity}
          toCity={toCity}
        />



        {/* Route introduction */}
        <UrbaniaRouteOverview
          fromCity={fromCity}
          toCity={toCity}
          distance={distance}
        />

        {/* 12 & 17 Seater Urbania */}
        <UrbaniaRouteVehicleSection
          fromCity={fromCity}
          toCity={toCity}
        />

        {/* Fare calculator */}
        <UrbaniaRouteFare
          fromCity={fromCity}
          toCity={toCity}
          distance={distance}
        />

        {/* Route highlights */}
        <UrbaniaRouteHighlights
          fromCity={fromCity}
          toCity={toCity}
        />

        {/* Journey information */}
        <UrbaniaRouteJourneyInfo
          fromCity={fromCity}
          toCity={toCity}
          distance={distance}
        />

        {/* Booking */}
        <UrbaniaRouteBooking
          fromCity={fromCity}
          toCity={toCity}
          distance={distance}
        />

        {/* Why Chiku Cabs */}
        <UrbaniaRouteWhyChoose
          fromCity={fromCity}
          toCity={toCity}
        />

        {/* Travel tips */}
        <UrbaniaRouteTravelTips
          fromCity={fromCity}
          toCity={toCity}
        />

        {/* FAQ */}
        <UrbaniaRouteFAQ
          fromCity={fromCity}
          toCity={toCity}
        />

        {/* SEO content */}
        <UrbaniaRouteSEOContent
          fromCity={fromCity}
          toCity={toCity}
          distance={distance}
        />

        {/* Final CTA */}
        <UrbaniaRouteCTA
          fromCity={fromCity}
          toCity={toCity}
        />
      </main>
    </>
  );
}