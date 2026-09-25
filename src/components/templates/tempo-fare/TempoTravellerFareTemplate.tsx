import TempoFareBenefits from "./TempoFareBenefits";
import TempoFareBookingProcess from "./TempoFareBookingProcess";
import TempoFareCityIntro from "./TempoFareCityIntro";
import TempoFareComparison from "./TempoFareComparison";
import TempoFareCTA from "./TempoFareCTA";
import TempoFareFAQs from "./TempoFareFAQs";
import TempoFareFleet from "./TempoFareFleet";
import TempoFareHero from "./TempoFareHero";
import TempoFareInclusions from "./TempoFareInclusions";
import TempoFareItineraries from "./TempoFareItineraries";
import TempoFarePopularPlaces from "./TempoFarePopularPlaces";
import TempoFareReviews from "./TempoFareReviews";
import TempoFareTable from "./TempoFareTable";
import TempoFareTravelInfo from "./TempoFareTravelInfo";
import TempoFareTravelTips from "./TempoFareTravelTips";
import TempoFareTravelUses from "./TempoFareTravelUses";

interface Props {
  city: string;
}

export default function TempoTravellerFareTemplate({
  city,
}: Props) {
  return (
    <main className="bg-[#19283e] text-white">

      {/* 1. Hero */}
      <TempoFareHero city={city} />

       {/* 6. Travel Information */}
      <TempoFareTravelInfo city={city} />

      {/* 4. Benefits */}
      <TempoFareBenefits city={city} />

       {/* Section 3 */}
      <TempoFareCityIntro city={city} />

      {/* Section 4 */}
      <TempoFareInclusions city={city} />


      {/* 2. Tempo Traveller Options */}
      {/* <TempoFareOptions city={city} /> */}

      {/* 3. Fare Table */}
      <TempoFareTable city={city} />

       {/* Section 6 */}
  <TempoFareFleet city={city} />

   {/* Section 7 */}
  <TempoFareItineraries city={city} />

   {/* Section 8 */}
  <TempoFarePopularPlaces city={city} />

  {/* Section 9 */}
  <TempoFareTravelUses city={city} />

{/* Section 10 */}
<TempoFareComparison city={city} />

{/* 5. Booking Process */}
      <TempoFareBookingProcess />

{/* Section 11 */}
<TempoFareTravelTips city={city} />

{/* Section 12 */}
<TempoFareReviews city={city} />

      {/* 7. Popular Routes */}
      {/* <TempoFareRoutes city={city} /> */}

      {/* 8. FAQs */}
      <TempoFareFAQs city={city} />

      {/* 9. CTA */}
      <TempoFareCTA city={city} />

    </main>
  );
}