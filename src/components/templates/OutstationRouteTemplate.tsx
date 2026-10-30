"use client";

import React, { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaRoute,
  FaShieldAlt,
  FaStar,
  FaCar,
  FaUsers,
  FaSuitcase,
  FaChevronDown,
  FaInfoCircle,
  FaArrowRight,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { ParsedRouteData } from "@/lib/urlParser";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import { POPULAR_ROUTES as airportCabRoutes } from "@/data/airportRoutes";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";

// ============================================================
// CONSTANTS & HELPERS
// ============================================================

const PHONE_NUMBER = "+918448445504";
const DISPLAY_PHONE = "8448445504";
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";
const SITE_URL = "https://chikucabs.com";

const DRIVER_ALLOWANCE = 500;
const DEFAULT_DISTANCE = 250;
const CURRENT_UPDATE_DATE = "October 2026";

export function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function calculateFare(distanceKm: number, pricePerKm: number = 9): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  const rate = Number.isFinite(pricePerKm) && pricePerKm > 0 ? pricePerKm : 9;
  return Math.round(distanceKm * 1.5 * rate + DRIVER_ALLOWANCE);
}

interface FleetTier {
  id: string;
  name: string;
  models: string;
  ratePerKm: number;
  seats: string;
  luggage: string;
  ac: string;
  image: string;
  popular?: boolean;
}

const FLEET_OPTIONS: FleetTier[] = [
  {
    id: "sedan",
    name: "Executive Sedan",
    models: "Dzire, Etios, Amaze",
    ratePerKm: 9,
    seats: "4 Passengers",
    luggage: "2 Bags",
    ac: "Air Conditioned",
    image: "/suzuki-dzire.png",
    popular: true,
  },
  {
    id: "suv",
    name: "Spacious SUV",
    models: "Maruti Ertiga, Marazzo",
    ratePerKm: 13,
    seats: "6 Passengers",
    luggage: "4 Bags",
    ac: "Dual AC",
    image: "/ertiga.png",
  },
  {
    id: "innova",
    name: "Luxury Innova Crysta",
    models: "Toyota Innova Crysta",
    ratePerKm: 16,
    seats: "7 Passengers",
    luggage: "5 Bags",
    ac: "Premium Climate Control",
    image: "/innova.png",
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    models: "Force Traveller (12/16 Seater)",
    ratePerKm: 20,
    seats: "12-16 Passengers",
    luggage: "8+ Bags",
    ac: "High-Cooling AC",
    image: "/tempo_traveller.png",
  },
];

export default function OutstationRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const { origin, destination, vehicle } = parsedData;
  const startCity = origin || "Origin";
  const endCity = destination || "Destination";
  const vehicleName = vehicle || "Cab";

  // Dynamic Route Info Lookup
  const routeInfo = useMemo(() => {
    const normalizedStart = startCity.toLowerCase().trim();
    const normalizedEnd = endCity.toLowerCase().trim();

    const cityRoute = Object.values(cityCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase().trim() === normalizedStart &&
          route.to.toLowerCase().trim() === normalizedEnd,
      );

    if (cityRoute) return cityRoute;

    const airportRoute = Object.values(airportCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase().trim() === normalizedStart &&
          route.to.toLowerCase().trim() === normalizedEnd,
      );

    return airportRoute;
  }, [startCity, endCity]);

  const distance = Number(routeInfo?.distance || DEFAULT_DISTANCE);
  const travelHours = (distance / 50).toFixed(1);
  const startingFare = calculateFare(distance, 9);

  // Form State for Interactive Estimator
  const [formData, setFormData] = useState({
    pickup: startCity,
    drop: endCity,
    date: "",
    time: "",
    vehicleId: "sedan",
  });

  const selectedVehicle = useMemo(() => {
    return (
      FLEET_OPTIONS.find((f) => f.id === formData.vehicleId) || FLEET_OPTIONS[0]
    );
  }, [formData.vehicleId]);

  const dynamicEstimatedPrice = useMemo(() => {
    return calculateFare(distance, selectedVehicle.ratePerKm);
  }, [distance, selectedVehicle]);

  // Contextual intent helpers
  const isGaya = useMemo(() => {
    const s = startCity.toLowerCase();
    const e = endCity.toLowerCase();
    return (
      (s.includes("gaya") && !s.includes("bodh")) ||
      (e.includes("gaya") && !e.includes("bodh"))
    );
  }, [startCity, endCity]);

  const isBodhGaya = useMemo(() => {
    const s = startCity.toLowerCase();
    const e = endCity.toLowerCase();
    return s.includes("bodh") || e.includes("bodh");
  }, [startCity, endCity]);

  const isVaranasi = useMemo(() => {
    const s = startCity.toLowerCase();
    return s.includes("varanasi") || s.includes("kashi") || s.includes("banaras");
  }, [startCity]);

  const buildWhatsAppUrl = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🚖 *Outstation Cab Booking Request*

📍 *Route:* ${formData.pickup} → ${formData.drop}
📏 *Distance:* Approx. ${distance} km
🚘 *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.models})
💰 *Estimated Fare:* ${formatCurrency(dynamicEstimatedPrice)} (₹${selectedVehicle.ratePerKm}/km)
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please confirm vehicle availability and driver details.`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleVehicleSelect = (vehicleObj: FleetTier) => {
    const fare = calculateFare(distance, vehicleObj.ratePerKm);
    const msg = `🚖 *Instant Outstation Cab Quote*

📍 *Route:* ${startCity} to ${endCity} (~${distance} km)
🚘 *Car:* ${vehicleObj.name} (${vehicleObj.models})
💰 *Estimated Total:* ${formatCurrency(fare)} (₹${vehicleObj.ratePerKm}/km)

Please share booking confirmation and driver assignment.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  // Structured Data (JSON-LD)
  const structuredData = useMemo(() => {
    const canonicalUrl = `${SITE_URL}/${startCity.toLowerCase()}/${startCity.toLowerCase()}-to-${endCity.toLowerCase()}-cab`;

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
          name: "Outstation Cabs",
          item: `${SITE_URL}/outstation-cabs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${startCity} to ${endCity} Outstation Cab`,
          item: canonicalUrl,
        },
      ],
    };

    const taxiService = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `Chiku Cabs - ${startCity} to ${endCity} Outstation Cab Service`,
      provider: {
        "@type": "LocalBusiness",
        name: SITE_NAME,
        telephone: PHONE_NUMBER,
        url: SITE_URL,
        priceRange: "₹₹",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "3450",
        },
      },
      areaServed: [startCity, endCity],
      offers: {
        "@type": "Offer",
        price: startingFare,
        priceCurrency: "INR",
        description: `Outstation cab from ${startCity} to ${endCity} starting @ ₹${startingFare} for ${distance} km`,
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the cab fare from ${startCity} to ${endCity}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The outstation cab fare from ${startCity} to ${endCity} starts from ₹${startingFare} for an AC Sedan (Dzire/Etios), ₹${calculateFare(distance, 13)} for an SUV (Ertiga), and ₹${calculateFare(distance, 16)} for an Innova Crysta. Toll taxes as per actual Fastag are payable en route.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the road distance and travel time from ${startCity} to ${endCity}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The road distance between ${startCity} and ${endCity} is approximately ${distance} km, which typically takes around ${travelHours} hours by cab via the primary highway corridor.`,
          },
        },
      ],
    };

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [breadcrumbs, taxiService, faqSchema],
    });
  }, [startCity, endCity, distance, startingFare, travelHours]);

  const getVehicleDetails = (v: string | null) => {
    const lowerV = (v || "cab").toLowerCase();
    if (
      lowerV.includes("tempo") ||
      lowerV.includes("traveller") ||
      lowerV.includes("bus")
    ) {
      return { icon: "🚐", image: "/tempo_traveller.png" };
    } else if (lowerV.includes("innova")) {
      return { icon: "✨", image: "/innova.png" };
    } else {
      return { icon: "🚘", image: "/cab.png" };
    }
  };
  const vDetails = getVehicleDetails(vehicle);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </Head>

      <div className="bg-background min-h-screen text-slate-900">
        {/* =====================================================
            NEW SECTION 1: HERO WITH LIVE ESTIMATOR & /outstation.webp BG
        ====================================================== */}
        <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
          {/* Background Image */}
          <div className="absolute inset-0 -z-30">
            <Image
              src="/outstation.webp"
              alt={`${startCity} to ${endCity} Outstation Cab by Chiku Cabs`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 -z-20 bg-black/60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-white/15 mb-4">
                <FaStar className="text-amber-400" />
                <span>4.9 / 5 Rated (3,450+ Completed Intercity Trips)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                {startCity} to {endCity} Outstation Cab
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
                Direct doorstep pickup in <strong className="text-white">{startCity}</strong> to{" "}
                <strong className="text-white">{endCity}</strong>. Travel approx.{" "}
                <span className="font-bold text-primary">{distance} km</span> in about{" "}
                <span className="font-bold text-primary">{travelHours} hours</span> with verified
                chauffeurs. Pay one-way only starting at{" "}
                <strong className="text-white underline decoration-primary decoration-2 underline-offset-4">
                  {formatCurrency(startingFare)}
                </strong>
                . Zero return fare penalty.
              </p>

              {/* Quick Trip Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                    <FaRoute /> Distance
                  </div>
                  <div className="text-lg font-black">{distance} KM</div>
                  <div className="text-[11px] text-slate-400">Road Distance</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                    <FaClock /> Duration
                  </div>
                  <div className="text-lg font-black">~{travelHours} Hrs</div>
                  <div className="text-[11px] text-slate-400">Via Main Highway</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                    <FaCar /> One-Way Base
                  </div>
                  <div className="text-lg font-black">{formatCurrency(startingFare)}</div>
                  <div className="text-[11px] text-slate-400">AC Sedan Dzire</div>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="space-y-2 text-sm text-slate-300 mb-8">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Doorstep pickup from any locality or hotel in {startCity}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Transparent billing: No return-trip penalty, no hidden driver night fees</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Free cancellation up to 24 hours prior to scheduled departure</span>
                </div>
              </div>

              {/* Quick Phone Action */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaPhoneAlt /> Call {DISPLAY_PHONE}
                </a>
                <a
                  href={buildWhatsAppUrl(
                    `Hi Chiku Cabs, I need an outstation cab from ${startCity} to ${endCity}. Please share the best fare.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaWhatsapp className="text-lg" /> Instant WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Interactive Booking & Fare Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-primary">
                    Instant Fare Estimator
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Get {startCity} → {endCity} Cab
                  </h2>
                </div>
                <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-md text-slate-700">
                  Outstation Ride
                </span>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Pickup */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Location in {startCity}
                  </label>
                  <div className="relative">
                    <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                    <input
                      type="text"
                      required
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                      placeholder={`Doorstep / Hotel / Station in ${startCity}`}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Drop */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Drop Destination in {endCity}
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-sm" />
                    <input
                      type="text"
                      required
                      value={formData.drop}
                      onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                      placeholder={`Hotel / Temple / Junction in ${endCity}`}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Vehicle Category
                  </label>
                  <select
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition font-medium"
                  >
                    {FLEET_OPTIONS.map((fleet) => (
                      <option key={fleet.id} value={fleet.id}>
                        {fleet.name} ({fleet.models}) — ₹{fleet.ratePerKm}/km
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Fare Summary Box */}
                <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">
                      Estimated Outstation Fare (~{distance} km)
                    </p>
                    <div className="text-2xl font-black text-primary">
                      {formatCurrency(dynamicEstimatedPrice)}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Includes fuel, driver allowance & GST
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800">
                      ₹{selectedVehicle.ratePerKm}/km
                    </span>
                    <p className="text-[11px] text-slate-500">{selectedVehicle.seats}</p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-3.5 text-base font-black text-white shadow-md transition hover:bg-primary/95 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-lg" /> Get Final Booking on WhatsApp
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 2: TOTAL FARE BREAKDOWN TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Transparent Rate Card
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Cab Fare Breakdown
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl mx-auto">
                Explore transparent cab fare estimates for your {distance} km journey from{" "}
                {startCity} to {endCity}. Compare available vehicles and choose the right cab.
              </p>
            </div>

            {/* Desktop & Tablet Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-4">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">  </th>
                    <th className="px-4 py-4">Seating & Luggage</th>
                    <th className="px-4 py-4">Rate / KM</th>
                    <th className="px-4 py-4">Approx. Total Fare</th>
                    <th className="px-4 py-4">Toll & Permits</th>
                    <th className="px-4 py-4 text-center">Instant Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FLEET_OPTIONS.map((item) => {
                    const totalFare = calculateFare(distance, item.ratePerKm);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.models}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-slate-800 font-medium">{item.seats}</div>
                          <div className="text-xs text-slate-500">{item.luggage}</div>
                        </td>
                        <td className="px-4 py-4 font-bold text-slate-900">
                          ₹{item.ratePerKm}/km
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-lg font-black text-primary">
                            {formatCurrency(totalFare)}
                          </div>
                          <div className="text-[11px] text-slate-500">Incl. Fuel & Driver</div>
                        </td>
                        <td className="px-4 py-4 text-xs text-slate-600">
                          <div>Tolls as per actual Fastag</div>
                          <div className="text-emerald-700 font-medium">State Permit Included</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleVehicleSelect(item)}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow transition"
                          >
                            <FaWhatsapp /> Book Now
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footnote */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-2">
              <p>
                *Highway Toll taxes payable at actual Fastag booths. Driver allowance, vehicle hire, fuel & GST included.
              </p>
              <p className="font-semibold text-slate-700">
                Rate card valid as of: {CURRENT_UPDATE_DATE}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 3: CAB VS TRAIN VS BUS COMPARISON TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Smart Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Cab vs. Train vs. Public Bus: {startCity} to {endCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why taking a private outstation cab is the most convenient and flexible choice for families, elders, and travelers with luggage.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Chiku Cabs (Private Taxi)</th>
                    <th className="px-5 py-3.5 text-slate-600">Train</th>
                    <th className="px-5 py-3.5 text-slate-600">Public / Sleeper Bus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Door-to-Door Pickup</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Doorstep Pickup & Drop
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Reach station via auto/cab</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must reach bus depot</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Departure Flexibility</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Depart 24×7 at your exact time
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed timetable / waitlists</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed evening schedules</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Senior Citizen Friendly</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Direct gate drop at temples/hotels
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Overbridge stairs & crowds</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ High steps & jerky motion</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Handling</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Dedicated boot trunk space
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heavy lifting across platforms</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Limited luggage hold</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Travel Privacy</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Private sanitized AC car
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded shared coach</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Shared cabin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 4: HIGHWAY TRANSIT & EN-ROUTE REST STOPS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Highway Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Route Distance & Travel Details
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Key highway transit milestones, road conditions, and recommended rest stops.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Total Highway Distance</div>
                <div className="text-3xl font-black text-slate-900 mt-1">{distance} KM</div>
                <p className="text-xs text-slate-600 mt-2">
                  Optimal driving route mapped via national and state express corridors.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Average Travel Time</div>
                <div className="text-3xl font-black text-slate-900 mt-1">~{travelHours} Hours</div>
                <p className="text-xs text-slate-600 mt-2">
                  Smooth 4-to-6 lane highway cruising with comfortable bio-breaks.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Primary Corridor</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {isVaranasi && (isGaya || isBodhGaya) ? "NH-19 (Grand Trunk Road)" : "National Highway Corridor"}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {isVaranasi && (isGaya || isBodhGaya)
                    ? "Well-paved multi-lane highway via Mohania, Sasaram, and Aurangabad."
                    : "Comfortable toll highway with ample family dhabas, petrol bunks, and clean washrooms."}
                </p>
              </div>
            </div>

            {/* Contextual Highway En-route Highlights */}
            {isVaranasi && (isGaya || isBodhGaya) && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <FaRoute className="text-primary" /> Key Highway Stops between Varanasi & Gaya
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Karmanasa UP-Bihar Border</span>
                    Chauffeur handles all commercial vehicle tax permits smoothly with zero passenger hassle.
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Sasaram (Sher Shah Suri Tomb)</span>
                    Popular heritage stop on the GT Road for sightseeing and traditional Indian lunch breaks.
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Aurangabad Dhabas</span>
                    Hygienic vegetarian family restaurants with separate washrooms and tea stalls.
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 5: POPULAR PICKUP & DROP POINTS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Extensive Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Popular Pickup & Drop Points
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Direct doorstep pickup across all residential colonies, railway junctions, and
                airports in {startCity} with drop anywhere in {endCity}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pickup in Origin */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-xl" /> Top Pickup Hubs in {startCity}
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
                        <FaCheckCircle className="text-primary" /> Main Railway Station Hubs
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Domestic / International Airport
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Central Bus Terminals
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> City Center Hotels & Banquets
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Residential Colonies & Societies
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Highway Ring Road Junctions
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Drop in Destination */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> Key Drop Locations in {endCity}
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
                        <FaCheckCircle className="text-primary" /> {endCity} Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {endCity} Airport Terminal
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Pilgrimage Shrines & Temples
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Hotel Resorts & Convention Centers
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Commercial Tech Parks & Hubs
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
            ORIGINAL HERO + BOOKING CARD (PRESERVED IN FULL)
        ====================================================== */}
        <section className="relative py-16 lg:py-24 px-4 border-b">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
            <div style={{ flex: "1.5" }}>
              <div
                className="section-badge"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  borderColor: "rgba(34,197,94,0.2)",
                  color: "#16a34a",
                }}
              >
                ● AVAILABLE NOW
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Best <span className="gradient-text">{vehicleName}</span> from <br />
                {startCity} to {endCity}
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                <div className="flex-1 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-muted aspect-[16/9]">
                  <img
                    src={vDetails.image}
                    alt={`${vehicleName} from ${startCity} to ${endCity} by Chiku Cabs`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Planning a trip from <strong>{startCity}</strong> to{" "}
                    <strong>{endCity}</strong>? Enjoy hassle-free{" "}
                    <strong>cab booking</strong> and reserve a premium {vehicleName}{" "}
                    with Chiku Cabs. As a top-rated <strong>taxi service</strong>,
                    we offer safe and reliable <strong>outstation cabs</strong>{" "}
                    with fixed rates, verified drivers, and 24/7 support.
                  </p>
                </div>
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { label: "DISTANCE", val: `~${distance} KM`, icon: "🛣️" },
                  { label: "EST. TIME", val: `~${travelHours} HRS`, icon: "⏱️" },
                  { label: "RATING", val: "4.9/5", icon: "⭐" },
                  { label: "FLEET", val: "100+ CARS", icon: "🚗" },
                ].map((stat, i) => (
                  <div key={i} className="premium-card p-4 text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xs font-black opacity-50 mb-1">
                      {stat.label}
                    </div>
                    <div className="font-bold text-sm">{stat.val}</div>
                  </div>
                ))}
              </div>

              {/* Safety Bar */}
              <div className="flex flex-wrap gap-8 items-center py-6 border-y border-dashed">
                {[
                  "GPS TRACKED",
                  "SOS ASSIST",
                  "VERIFIED DRIVERS",
                  "24/7 HELPLINE",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 font-bold text-sm"
                  >
                    <span className="text-green-500">✔</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Booking Card */}
            <div className="flex-1 w-full lg:sticky lg:top-24">
              <div className="premium-card p-8 border-2 border-primary shadow-2xl">
                <h3 className="text-2xl font-black mb-6 flex items-center justify-between">
                  Quick Booking
                  <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                    INSTANT
                  </span>
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black opacity-50">FROM</label>
                    <input
                      type="text"
                      defaultValue={startCity}
                      className="w-full p-4 rounded-xl border-2 font-bold"
                      style={{ borderColor: "hsl(var(--border))" }}
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black opacity-50">TO</label>
                    <input
                      type="text"
                      defaultValue={endCity}
                      className="w-full p-4 rounded-xl border-2 font-bold"
                      style={{ borderColor: "hsl(var(--border))" }}
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black opacity-50">
                      PICKUP DATE
                    </label>
                    <input
                      type="date"
                      className="w-full p-4 rounded-xl border-2"
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black opacity-50">
                      PICKUP TIME
                    </label>
                    <input
                      type="time"
                      className="w-full p-4 rounded-xl border-2"
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </div>
                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <div className="text-2xl font-black">{formatCurrency(startingFare)}</div>
                        <div className="text-xs opacity-50 font-bold">
                          ALL INCLUSIVE
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold opacity-60 line-through">
                          {formatCurrency(startingFare * 1.2)}
                        </div>
                        <div className="text-green-500 font-bold text-xs">
                          SAVE 15%
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="btn-primary w-full py-5 text-xl shadow-xl"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      📞 BOOK NOW
                    </a>
                    <p className="text-center text-xs font-bold opacity-40 mt-4">
                      FREE CANCELLATION UP TO 24H BEFORE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL HOW IT WORKS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                HOW IT WORKS
              </div>
              <h2 className="section-title">Book Your Ride in 3 Simple Steps</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="steps-container">
              {[
                {
                  num: "1",
                  icon: "🔍",
                  title: "Search Your Route",
                  desc: `Enter ${startCity} to ${endCity} and choose your travel date.`,
                },
                {
                  num: "2",
                  icon: "🚗",
                  title: "Choose Your Vehicle",
                  desc: "Pick from Sedan, SUV, Innova or Tempo Traveller based on your group size.",
                },
                {
                  num: "3",
                  icon: "✅",
                  title: "Confirm & Travel",
                  desc: "Get instant confirmation. Your verified driver arrives on time, every time.",
                },
              ].map((step, i) => (
                <div key={i} className="step-card">
                  <div className="step-number">{step.num}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL FLEET COMPARISON TABLE (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                OUR FLEET
              </div>
              <h2 className="section-title">
                Compare Our Premium {endCity} Fleet
              </h2>
              <p className="section-subtitle mx-auto">
                Select the perfect ride for your {startCity} to {endCity} journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  tier: "STANDARD",
                  car: "Hatchback",
                  price: "9",
                  desc: "Swift, WagonR or similar",
                  best: false,
                },
                {
                  tier: "POPULAR",
                  car: "Sedan",
                  price: "12",
                  desc: "Dzire, Ertiga or similar",
                  best: true,
                },
                {
                  tier: "LUXURY",
                  car: "Innova",
                  price: "18",
                  desc: "Innova Crysta, Force Urbania",
                  best: false,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${
                    item.best ? "border-primary scale-105 z-10" : ""
                  }`}
                  style={
                    item.best
                      ? {
                          boxShadow: "0 0 0 4px hsla(45,90%,50%,0.12)",
                        }
                      : {}
                  }
                >
                  {item.best && (
                    <div
                      className="absolute text-white"
                      style={{
                        top: 0,
                        right: 0,
                        background: "hsl(var(--primary))",
                        padding: "0.35rem 1rem",
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="text-xs font-black opacity-40 mb-2 uppercase">
                    {item.tier} CHOICE
                  </div>

                  <h3 className="text-2xl font-black mb-2">{item.car}</h3>

                  <p className="text-muted-foreground text-sm mb-8">
                    {item.desc}
                  </p>

                  <div style={{ marginTop: "auto", marginBottom: "2.5rem" }}>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black opacity-50">FROM</span>

                      <span className="text-5xl font-black">₹{item.price}</span>

                      <span className="text-sm font-black opacity-50">/ KM</span>
                    </div>

                    <div className="text-xs font-bold text-green-600 mt-2 italic">
                      INTERCITY BEST PRICE GUARANTEE
                    </div>
                  </div>

                  <ul className="space-y-3 mb-10 list-none">
                    {[
                      "Driver Allowance Included",
                      "State Permit Included",
                      "Clean & Sanitized Vehicle",
                      "24×7 Customer Support",
                    ].map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <span className="text-primary text-xl">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/916280820037?text=${encodeURIComponent(
                      `Hi Chiku Cabs, I am interested in booking ${item.car} from ${startCity} to ${endCity}. Please help me with the booking.`,
                    )}`}
                    className={`w-full py-4 rounded-xl font-black tracking-tight text-center ${
                      item.best ? "btn-primary" : ""
                    }`}
                    style={
                      !item.best
                        ? {
                            background: "hsl(var(--muted))",
                            display: "block",
                          }
                        : {
                            display: "block",
                          }
                    }
                  >
                    BOOK NOW
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL INCLUSIONS & EXCLUSIONS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                TRANSPARENT PRICING
              </div>
              <h2 className="section-title">What's Included in Your Fare?</h2>
            </div>
            <div className="incl-excl-grid">
              <div className="incl-card">
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ color: "#16a34a" }}
                >
                  ✅ Included
                </h3>
                {[
                  "Base Fare (per km)",
                  "Driver Allowance / Batta",
                  "Fuel Charges",
                  "GST (5%)",
                  "Toll Taxes (as applicable)",
                  "State Permit Charges",
                  "Night Driving Charges",
                ].map((item, i) => (
                  <div key={i} className="incl-item">
                    <span className="text-green-500">✔</span> {item}
                  </div>
                ))}
              </div>
              <div className="excl-card">
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ color: "#dc2626" }}
                >
                  ❌ Not Included
                </h3>
                {[
                  "Parking Fees at destinations",
                  "Entry tickets to monuments",
                  "Extra km beyond package",
                  "Extra hours beyond package",
                  "Driver tip (optional)",
                ].map((item, i) => (
                  <div key={i} className="excl-item">
                    <span style={{ color: "#dc2626" }}>✗</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL SEO CONTENT (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose max-w-none">
              <h2 className="text-4xl font-black mb-8">
                {startCity} to {endCity} Cab Service — Your Complete Guide
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Looking for the most reliable{" "}
                  <strong>
                    {startCity} to {endCity} taxi service
                  </strong>
                  ? Chiku Cabs provides a premium intercity travel experience that
                  prioritizes your comfort and safety. Whether you require
                  standard <strong>outstation cabs</strong>, a reliable{" "}
                  <strong>airport taxi</strong> drop, or a spacious{" "}
                  <strong>tempo traveller on rent</strong> for a family wedding,
                  our{" "}
                  <strong>
                    {startCity} to {endCity} cab booking
                  </strong>{" "}
                  ensures a stress-free journey.
                </p>
                <div
                  className="premium-card bg-primary border-none"
                  style={{ color: "black" }}
                >
                  <h3 className="text-2xl font-black mb-4">
                    Why Our {startCity} to {endCity} Route is #1
                  </h3>
                  <p className="font-medium opacity-80">
                    We use AI-optimized routing to avoid traffic congestion on the{" "}
                    {startCity} - {endCity} highway, saving you up to 45 minutes
                    on average. Plus, our dedicated safety service offers solo
                    travelers an extra layer of security on this route.
                  </p>
                </div>
                <p>
                  Our{" "}
                  <strong>
                    one-way cabs from {startCity} to {endCity}
                  </strong>{" "}
                  are perfect for those who don't need a return journey, offering
                  a flat-rate price that is often 50% cheaper than round-trip
                  bookings. With Chiku Cabs, you get the best value for every
                  kilometer traveled.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL TESTIMONIALS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                CUSTOMER REVIEWS
              </div>
              <h2 className="section-title">What Our Travelers Say</h2>
              <p className="section-subtitle mx-auto">
                Trusted by thousands of travelers across India.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rahul Sharma",
                  route: `${startCity} → ${endCity}`,
                  text: "Excellent service! The driver was very professional and the car was spotlessly clean. Reached on time. Will definitely book again for my next trip.",
                  rating: "★★★★★",
                },
                {
                  name: "Priya Gupta",
                  route: `${startCity} → ${endCity}`,
                  text: "Best cab service I've ever used. Transparent pricing with no hidden charges. The Innova Crysta was super comfortable for our family trip.",
                  rating: "★★★★★",
                },
                {
                  name: "Amit Verma",
                  route: `${startCity} → ${endCity}`,
                  text: "Booked a one-way cab and saved so much money compared to other services. Driver was punctual and polite. Highly recommended!",
                  rating: "★★★★★",
                },
              ].map((review, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-stars">{review.rating}</div>
                  <p className="testimonial-text">"{review.text}"</p>
                  <div className="testimonial-author">{review.name}</div>
                  <div className="testimonial-route">{review.route}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL STATS BAR (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-16 border-b">
          <div className="max-w-5xl mx-auto px-4">
            <div className="stats-grid">
              {[
                { num: "1 Lakh+", label: "Happy Customers" },
                { num: "500+", label: "Verified Drivers" },
                { num: "100+", label: "Cities Covered" },
                { num: "4.9 ★", label: "Average Rating" },
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.num}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InternalLinks parsedData={parsedData} />

        {/* =====================================================
            ORIGINAL FAQ SECTION (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                FAQ
              </div>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
            {[
              {
                q: `How much does a ${vehicleName} from ${startCity} to ${endCity} cost for outstation taxi service?`,
                a: `The ${vehicleName} fare from ${startCity} to ${endCity} starts from ₹${startingFare} for a sedan Dzire. Prices vary based on vehicle type and trip type. Our transparent cab booking ensure you get the best outstation cabs rates without hidden fees.`,
              },
              {
                q: `How long does the ${startCity} to ${endCity} taxi service journey take?`,
                a: `The ${startCity} to ${endCity} journey typically takes ~${travelHours} hours. Our professional drivers for outstation cabs are familiar with the fastest routes and prioritize your safety.`,
              },
              {
                q: `Can I book a one-way cab from ${startCity} to ${endCity}?`,
                a: `Yes! We are specialists in one-way cab booking. It saves you up to 50% compared to round-trip taxi service charges. Perfect for those needing a dedicated drop taxi.`,
              },
              {
                q: `Is it safe to travel by outstation cabs from ${startCity} to ${endCity}?`,
                a: `Absolutely. Chiku Cabs provides 24/7 GPS-tracked taxi service, police-verified drivers, and SOS support, ensuring a secure outstation cabs experience for families and solo travelers.`,
              },
              {
                q: `What vehicle options are available for cab booking through Chiku Cabs?`,
                a: `Our fleet for outstation cabs includes Hatchbacks, Sedans, SUVs like Innova Crysta, and even a tempo traveller on rent for larger groups traveling to ${endCity}.`,
              },
              {
                q: `How do I book an airport taxi for ${startCity} to ${endCity}?`,
                a: `You can easily book an airport taxi for outstation drops via our website or by calling 8448445504. We provide punctual pickups directly from the airport arrival.`,
              },
              {
                q: `Are there any hidden charges in your outstation taxi service?`,
                a: `No. We believe in 100% transparent cab booking. Your quote includes the base fare, driver allowance, and GST. Tolls and parking are paid as per actuals.`,
              },
              {
                q: `Do you provide a tempo traveller on rent for this route?`,
                a: `Yes, for group travel to ${endCity}, we highly recommend booking a tempo traveller on rent. It offers more comfort and is cheaper than booking multiple outstation cabs.`,
              },
              {
                q: `What if I need to cancel my taxi service booking?`,
                a: `We offer free cancellation for all outstation cabs up to 24 hours before your scheduled pickup. Flexibility is key to our premium cab booking experience.`,
              },
              {
                q: `Do you offer luxury cab booking for the ${startCity} to ${endCity} route?`,
                a: `Yes, for a more premium experience, you can choose luxury cab booking options like the Innova Crysta, featuring captain seats and extra legroom.`,
              },
            ].map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>
                  {faq.q}
                  <span className="faq-chevron">▼</span>
                </summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* =====================================================
            ORIGINAL CTA BANNER (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Travel?</h2>
            <p className="text-xl opacity-70 mb-8">
              Book your {startCity} to {endCity} {vehicleName} now and enjoy a premium
              journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="btn-primary text-lg px-10 py-4 shadow-2xl"
              >
                📞 Call {DISPLAY_PHONE}
              </a>

              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I am interested in booking a ${vehicleName} from ${startCity} to ${endCity}. Please help me with the booking.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-10 py-4"
                style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <EEATSection city={startCity} vehicle={vehicleName} />
      </div>
    </>
  );
}
