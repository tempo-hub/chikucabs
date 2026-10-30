import React, { useMemo } from "react";
import Head from "next/head";
import { FaCheckCircle, FaMapMarkerAlt, FaUsers, FaSuitcase, FaInfoCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

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

import { cityCabRoutes } from "@/data/cityCabRoutes";
import { POPULAR_ROUTES as airportCabRoutes } from "@/data/airportRoutes";
import EEATSection from "@/components/shared/EEATSection";

interface UrbaniaRouteTemplateProps {
  fromCity: string;
  toCity: string;
  distance?: number;
}

const PHONE_NUMBER = "+918448445504";
const SITE_NAME = "Chiku Cabs";
const SITE_URL = "https://chikucabs.com";
const DRIVER_ALLOWANCE = 500;
const DEFAULT_DISTANCE = 250;
const URBANIA_RATE_PER_KM = 28;

export function calculateFare(distanceKm: number, pricePerKm: number = URBANIA_RATE_PER_KM): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  return Math.round(distanceKm * 1.5 * pricePerKm + DRIVER_ALLOWANCE);
}

export function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export default function UrbaniaRouteTemplate({
  fromCity,
  toCity,
  distance: propDistance,
}: UrbaniaRouteTemplateProps) {
  // Dynamic Route Info Lookup if distance not provided
  const routeDistance = useMemo(() => {
    if (propDistance && propDistance > 0) return propDistance;

    const normalizedStart = fromCity.toLowerCase().trim();
    const normalizedEnd = toCity.toLowerCase().trim();

    const cityRoute = Object.values(cityCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase().trim() === normalizedStart &&
          route.to.toLowerCase().trim() === normalizedEnd,
      );

    if (cityRoute) return Number(cityRoute.distance);

    const airportRoute = Object.values(airportCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase().trim() === normalizedStart &&
          route.to.toLowerCase().trim() === normalizedEnd,
      );

    return airportRoute ? Number(airportRoute.distance) : DEFAULT_DISTANCE;
  }, [fromCity, toCity, propDistance]);

  const totalFare = calculateFare(routeDistance, URBANIA_RATE_PER_KM);
  const perPerson12 = Math.round(totalFare / 12);
  const perPerson17 = Math.round(totalFare / 17);
  const travelHours = (routeDistance / 50).toFixed(1);

  // Contextual intent helpers
  const isGaya = useMemo(() => {
    const s = fromCity.toLowerCase();
    const e = toCity.toLowerCase();
    return s.includes("gaya") || e.includes("gaya");
  }, [fromCity, toCity]);

  const isVaranasi = useMemo(() => {
    const s = fromCity.toLowerCase();
    return s.includes("varanasi") || s.includes("kashi") || s.includes("banaras");
  }, [fromCity]);

  // Structured Data (JSON-LD)
  const structuredData = useMemo(() => {
    const canonicalUrl = `${SITE_URL}/urbania/${fromCity.toLowerCase()}-to-${toCity.toLowerCase()}-urbania-fare`;

    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Force Urbania on Rent",
          item: `${SITE_URL}/urbania-on-rent`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${fromCity} to ${toCity} Urbania`,
          item: canonicalUrl,
        },
      ],
    };

    const taxiService = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `Chiku Cabs - ${fromCity} to ${toCity} Force Urbania Rental`,
      provider: {
        "@type": "LocalBusiness",
        name: SITE_NAME,
        telephone: PHONE_NUMBER,
        url: SITE_URL,
        priceRange: "₹₹₹",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "3450",
        },
      },
      areaServed: [fromCity, toCity],
      offers: {
        "@type": "Offer",
        price: totalFare,
        priceCurrency: "INR",
        description: `Force Urbania luxury van rental from ${fromCity} to ${toCity} (~${routeDistance} km) starting at ₹${totalFare}`,
      },
    };

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [breadcrumbs, taxiService],
    });
  }, [fromCity, toCity, routeDistance, totalFare]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <UrbaniaRouteHero
          fromCity={fromCity}
          toCity={toCity}
          distance={routeDistance}
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
          distance={routeDistance}
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
          distance={routeDistance}
        />

        {/* Route highlights */}
        <UrbaniaRouteHighlights
          fromCity={fromCity}
          toCity={toCity}
        />

        {/* =====================================================
            NEW SECTION 1: FORCE URBANIA VS TRAIN VS MULTIPLE CABS VS BUS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Luxury Value Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Force Urbania vs. Booking 3 Cabs vs. Train vs. Bus
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why luxury group travel in a single Force Urbania is more affordable, united, and comfortable for 10 to 17 people.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Force Urbania (12/17S)</th>
                    <th className="px-5 py-3.5 text-slate-600">Booking 3–4 Cabs</th>
                    <th className="px-5 py-3.5 text-slate-600">Train (IRCTC 2A/3A)</th>
                    <th className="px-5 py-3.5 text-slate-600">Sleeper Bus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Group Unity</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Group together in 1 van
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Split into multiple small cars</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Scattered berths across coaches</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Shared cabin with strangers</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Doorstep Pickup</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Doorstep pickup in {fromCity} & drop in {toCity}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Doorstep (difficult coordination)</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must reach railway station</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must reach bus depot</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Cost Per Person</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Economical: ~{formatCurrency(perPerson17)} / person
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ 3× Base fares & driver fees</td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Moderate if confirmed tickets</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed ticket price</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Passenger Comfort</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Ultra luxury reclining captain seats
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Standard sedan / SUV seats</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded railway stations</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ High vibration & jerky ride</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Space</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Deep boot hold + sealed rooftop carrier
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Small boot in CNG/petrol cars</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heavy platform lifting</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Limited baggage hold</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Journey information */}
        <UrbaniaRouteJourneyInfo
          fromCity={fromCity}
          toCity={toCity}
          distance={routeDistance}
        />

        {/* =====================================================
            NEW SECTION 2: POPULAR PICKUP & DROP POINTS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Complete Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Popular Pickup & Drop Hubs: {fromCity} → {toCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                We provide prompt door-to-door arrivals across railway junctions, international airports, banquet hotels, and residences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pickup in fromCity */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-xl" /> Top Pickup Points in {fromCity}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {isVaranasi ? (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Varanasi Cantt Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Banaras (Manduadih) Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Pt. Deen Dayal Upadhyaya (DDU)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Babatpur International Airport
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Godowlia & Dashashwamedh Ghat
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Assi Ghat & Lanka / BHU
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Main Central Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> City Airport Terminal
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Central Bus Terminals
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> 5-Star Hotels & Banquet Halls
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Major Residential Townships
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Express Bypass Junctions
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Drop in toCity */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> Key Drop Locations in {toCity}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {isGaya ? (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Vishnupad Mandir Gate
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Phalgu River Devghat
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gaya Junction Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Akshay Vat & Mangla Gauri Mandir
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gaya International Airport
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Bodh Gaya Monastery Hotels
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {toCity} Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {toCity} Domestic & Int'l Airport
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Pilgrimage Temples & Shrines
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Destination Resorts & Venues
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Corporate Convention Centers
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Doorstep Residential Addresses
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 3: INCLUSIONS, EXCLUSIONS & BOOKING TERMS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                100% Transparent
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Fare Inclusions, Exclusions & Payment Terms
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                No hidden costs. Full clarity on every charge for your Force Urbania journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Inclusions */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                <h3 className="font-bold text-emerald-900 text-base mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-600" /> What is Included in Your Fare?
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Complete vehicle rental for {routeDistance} km travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Fuel charges & driver allowance (Batta) included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Dual blower high-ton AC climate control throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Goods and Services Tax (GST 5%) included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Heavy-duty luggage boot + sealed roof carrier</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
                <h3 className="font-bold text-rose-900 text-base mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-rose-600" /> Exclusions & Highway Actuals
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Highway Toll Plaza Charges (payable at actual Fastag booths)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Inter-state border passenger tax/permit (driver assists at border checkposts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Parking charges at specific temples, monuments, or airport parking lots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Night driving charge (₹350 if travel is conducted between 10 PM and 6 AM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Additional detour distance beyond itinerary charged at standard per-km rate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Booking */}
        <UrbaniaRouteBooking
          fromCity={fromCity}
          toCity={toCity}
          distance={routeDistance}
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
          distance={routeDistance}
        />

        {/* Final CTA */}
        <UrbaniaRouteCTA
          fromCity={fromCity}
          toCity={toCity}
        />

        <EEATSection city={fromCity} vehicle="Force Urbania" />
      </main>
    </>
  );
}