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

export function calculateFare(distanceKm: number, pricePerKm: number = 17): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  const rate = Number.isFinite(pricePerKm) && pricePerKm > 0 ? pricePerKm : 17;
  return Math.round(distanceKm * 1.5 * rate + DRIVER_ALLOWANCE);
}

interface InnovaTier {
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

const INNOVA_FLEET_OPTIONS: InnovaTier[] = [
  {
    id: "innova-standard",
    name: "Toyota Innova (Standard)",
    models: "Innova 2.5V / GX (7+1 Seater)",
    ratePerKm: 14,
    seats: "6-7 Passengers",
    luggage: "4 Large Bags",
    ac: "Dual AC Blower",
    image: "/innova.png",
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    models: "Innova Crysta 2.4 VX/ZX Captain Seats",
    ratePerKm: 17,
    seats: "7 Passengers",
    luggage: "5 Large Bags",
    ac: "Automatic Climate Control",
    image: "/innova-crysta.png",
    popular: true,
  },
  {
    id: "innova-hycross",
    name: "Toyota Innova HyCross",
    models: "Innova HyCross Hybrid Luxury Captain Seats",
    ratePerKm: 20,
    seats: "7 Passengers",
    luggage: "5 Large Bags",
    ac: "Multi-Zone Climate Control",
    image: "/innova-crysta.png",
  },
];

export default function InnovaRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const startCity = parsedData.origin || "Origin";
  const endCity = parsedData.destination || "Destination";

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
  const startingFare = calculateFare(distance, 14);
  const crystaFare = calculateFare(distance, 17);

  // Form State for Interactive Estimator
  const [formData, setFormData] = useState({
    pickup: startCity,
    drop: endCity,
    date: "",
    time: "",
    vehicleId: "innova-crysta",
  });

  const selectedVehicle = useMemo(() => {
    return (
      INNOVA_FLEET_OPTIONS.find((f) => f.id === formData.vehicleId) ||
      INNOVA_FLEET_OPTIONS[1]
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
    const msg = `✨ *Innova Crysta Booking Request*

📍 *Route:* ${formData.pickup} → ${formData.drop}
📏 *Distance:* Approx. ${distance} km
🚘 *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.models})
💰 *Estimated Fare:* ${formatCurrency(dynamicEstimatedPrice)} (₹${selectedVehicle.ratePerKm}/km)
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please confirm vehicle availability and driver details.`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleVehicleSelect = (vehicleObj: InnovaTier) => {
    const fare = calculateFare(distance, vehicleObj.ratePerKm);
    const msg = `✨ *Instant Innova Quote*

📍 *Route:* ${startCity} to ${endCity} (~${distance} km)
🚘 *Car:* ${vehicleObj.name}
💰 *Estimated Total:* ${formatCurrency(fare)} (₹${vehicleObj.ratePerKm}/km)

Please share booking confirmation and driver assignment.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const innovaRouteFaqs = useMemo(
    () => [
      {
        q: `What is the Innova and Innova Crysta cab fare from ${startCity} to ${endCity}?`,
        a: `Innova taxi rentals start at ₹14/km for standard Innova and ₹17/km for Toyota Innova Crysta. Total fare from ${startCity} to ${endCity} starts from ₹${startingFare} (standard) and ₹${crystaFare} (Crysta) for ${distance} km, including vehicle rental, fuel expenses, and driver allowances with zero hidden charges.`,
      },
      {
        q: `What seating configurations are available in Innova Crysta rentals?`,
        a: `We offer both 6+1 (luxurious middle-row captain seats with dual armrests) and 7+1 (comfortable bench seating for larger families) configurations. All variants include individual AC cooling vents across all three rows and ergonomic lumbar support.`,
      },
      {
        q: `What is the driving distance and travel duration between ${startCity} and ${endCity}?`,
        a: `The highway distance between ${startCity} and ${endCity} is approximately ${distance} km, which typically takes around ${travelHours} hours via major national expressways. Our chauffeurs plan the best routes to bypass city traffic bottlenecks.`,
      },
      {
        q: `How much luggage can fit in an Innova Crysta cab?`,
        a: `With 6 to 7 passengers, the rear boot accommodates 3 to 4 medium trolley bags plus duffels. If traveling with 4 to 5 passengers, the third-row 50:50 split seats can be folded to carry 6 to 8 large suitcases easily. Overhead carrier options are also available on request.`,
      },
      {
        q: `Are tolls, state entry taxes, and parking fees included in the fare?`,
        a: `Our fare quote clearly distinguishes between base trip rates and en-route statutory charges. FASTag toll charges, inter-state border entry road permits, and destination parking fees can be included in an all-inclusive package or billed transparently as per actual highway receipts.`,
      },
      {
        q: `Can we take multiple sightseeing breaks or highway food stops during the trip?`,
        a: `Yes, absolutely! When you rent an Innova taxi from ${startCity} to ${endCity}, you have total flexibility. You can halt at clean highway restaurants, scenic viewpoints, or local temples along the route without any extra driver objection.`,
      },
      {
        q: `Are Chiku Cabs Innova drivers experienced and background verified?`,
        a: `Every chauffeur assigned to our Innova outstation fleet is thoroughly background-verified, commercially licensed, and carries at least 5+ years of highway driving expertise with defensive driving certifications.`,
      },
      {
        q: `Is Innova Crysta available for round-trip outstation tours and multi-day packages?`,
        a: `Yes, we provide round-trip packages from ${startCity} to ${endCity} and back, as well as extended multi-day holiday circuits. Minimum daily running average is 250 km, offering substantial savings compared to daily point-to-point bookings.`,
      },
      {
        q: `Do you provide Innova Crysta pickups from the airport or railway station in ${startCity}?`,
        a: `Yes, we provide dedicated doorstep pickups from your residential address, airport terminal, or railway station in ${startCity} with flight tracking and 45 minutes complimentary wait time for delayed flights.`,
      },
      {
        q: `Can I hire an Innova Crysta for wedding guest transport or corporate delegates in ${startCity}?`,
        a: `Yes, we offer premium spotless Innova Crysta fleets for weddings, corporate events, and VIP delegations in ${startCity} with uniformed drivers, customized welcome signboards, and route fleet coordination.`,
      },
      {
        q: `What is the booking advance and cancellation policy for Innova cab rentals?`,
        a: `You can confirm your Innova booking with a minimal 15-20% advance token. We offer free cancellation and 100% full advance refund up to 24 hours prior to scheduled departure time.`,
      },
      {
        q: `How do I book an Innova cab from ${startCity} to ${endCity}?`,
        a: `You can book directly on chikucabs.com, call our 24/7 customer booking desk at 844-844-5504, or WhatsApp our dispatch team at 916280820037 for instant confirmation and driver assignment details.`,
      },
    ],
    [startCity, endCity, startingFare, crystaFare, distance, travelHours],
  );

  // Structured Data (JSON-LD)
  const structuredData = useMemo(() => {
    const canonicalUrl = `${SITE_URL}/${startCity.toLowerCase()}/${startCity.toLowerCase()}-to-${endCity.toLowerCase()}-innova-crysta`;

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
          name: `${startCity} to ${endCity} Innova Crysta`,
          item: canonicalUrl,
        },
      ],
    };

    const taxiService = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `Chiku Cabs - ${startCity} to ${endCity} Innova Crysta Cab Service`,
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
      areaServed: [startCity, endCity],
      offers: {
        "@type": "Offer",
        price: crystaFare,
        priceCurrency: "INR",
        description: `Toyota Innova Crysta from ${startCity} to ${endCity} starting @ ₹${crystaFare} for ${distance} km`,
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: innovaRouteFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    };

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [breadcrumbs, taxiService, faqSchema],
    });
  }, [startCity, endCity, distance, startingFare, crystaFare, travelHours, innovaRouteFaqs]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </Head>

      <div className="bg-background min-h-screen text-slate-900">
        {/* Accent Line */}
        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary)), transparent, hsl(var(--primary)))",
          }}
        />

        {/* =====================================================
            NEW SECTION 1: HERO WITH LIVE ESTIMATOR & /outstation.webp BG
        ====================================================== */}
        <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
          {/* Background Image */}
          <div className="absolute inset-0 -z-30">
            <Image
              src="/outstation.webp"
              alt={`${startCity} to ${endCity} Innova Crysta Taxi by Chiku Cabs`}
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
                {startCity} to {endCity} Innova Crysta
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
                Direct doorstep pickup in <strong className="text-white">{startCity}</strong> to{" "}
                <strong className="text-white">{endCity}</strong>. Travel approx.{" "}
                <span className="font-bold text-primary">{distance} km</span> in about{" "}
                <span className="font-bold text-primary">{travelHours} hours</span> in luxury captain
                seats with verified chauffeurs. Innova fares start at{" "}
                <strong className="text-white underline decoration-primary decoration-2 underline-offset-4">
                  {formatCurrency(startingFare)}
                </strong>
                . Zero return fare penalty.
              </p>

              {/* Quick Trip Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-xl">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                    <FaRoute /> Distance
                  </div>
                  <div className="text-lg font-black">{distance} KM</div>
                  <div className="text-[11px] text-slate-400">Road Distance</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                    <FaClock /> Duration
                  </div>
                  <div className="text-lg font-black">~{travelHours} Hrs</div>
                  <div className="text-[11px] text-slate-400">Via Highway</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                    <FaCar /> Innova Base
                  </div>
                  <div className="text-lg font-black">{formatCurrency(startingFare)}</div>
                  <div className="text-[11px] text-slate-400">₹14 / KM</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-0.5">
                    <FaStar /> Crysta
                  </div>
                  <div className="text-lg font-black text-amber-300">{formatCurrency(crystaFare)}</div>
                  <div className="text-[11px] text-slate-400">Captain Seats</div>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="space-y-2 text-sm text-slate-300 mb-8">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Doorstep pickup from any locality, hotel or airport in {startCity}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Plush captain recliners, dual AC climate control & boot space for 5 bags</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Transparent billing: No return-trip penalty, no hidden driver charges</span>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaPhoneAlt /> Call {DISPLAY_PHONE}
                </a>
                <a
                  href={buildWhatsAppUrl(
                    `Hi Chiku Cabs, I want to book an Innova Crysta from ${startCity} to ${endCity}. Please share the best fare.`,
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
                    Get {startCity} → {endCity} Innova
                  </h2>
                </div>
                <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-md text-slate-700">
                  7+1 Seater
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
                    Select Innova Variant
                  </label>
                  <select
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition font-medium"
                  >
                    {INNOVA_FLEET_OPTIONS.map((fleet) => (
                      <option key={fleet.id} value={fleet.id}>
                        {fleet.name} — ₹{fleet.ratePerKm}/km
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Fare Summary Box */}
                <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">
                      Estimated One-Way Fare (~{distance} km)
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
                    <p className="text-[10px] text-slate-400">{selectedVehicle.luggage}</p>
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
                {startCity} to {endCity} Innova Crysta Fare Breakdown
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl mx-auto">
                Explore transparent fare estimates for your {distance} km journey from{" "}
                {startCity} to {endCity}. Compare standard Innova, Innova Crysta, and HyCross options.
              </p>
            </div>

            {/* Desktop & Tablet Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-4">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Innova Model</th>
                    <th className="px-4 py-4">Seating & Luggage</th>
                    <th className="px-4 py-4">Rate / KM</th>
                    <th className="px-4 py-4">Approx. Total Fare</th>
                    <th className="px-4 py-4">Toll & Permits</th>
                    <th className="px-4 py-4 text-center">Instant Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INNOVA_FLEET_OPTIONS.map((item) => {
                    const totalFare = calculateFare(distance, item.ratePerKm);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            {item.popular && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.models}</div>
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
            NEW SECTION 3: INNOVA VS TRAIN VS BUS COMPARISON TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Smart Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Innova Crysta vs. Train vs. Public Bus
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why taking a private Innova Crysta is the premier choice for families, elders, and travelers with luggage.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Chiku Innova Crysta</th>
                    <th className="px-5 py-3.5 text-slate-600">Train (IRCTC)</th>
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
                    <td className="px-5 py-3.5 font-bold text-slate-900">Seating Comfort</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Plush Captain Recliners & Armrests
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded berths / waitlists</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Jerky motion & rigid seats</td>
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
                      ✔ Direct gate drop at temples & hotels
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Overbridge stairs & crowds</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ High climbing steps</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Handling</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Dedicated massive boot trunk (5 bags)
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heavy lifting across platforms</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Limited luggage hold</td>
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
            ORIGINAL HERO SECTION (PRESERVED IN FULL)
        ====================================================== */}
        <section className="relative py-20 px-4 overflow-hidden bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1">
              <div className="section-badge">✨ INNOVA CRYSTA HIRE</div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
                <span className="gradient-text">Innova Crysta</span> from <br />
                {startCity} to {endCity}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Experience premium <strong>cab booking</strong> and reserve an{" "}
                <strong>Innova Crysta</strong> from <strong>{startCity}</strong>{" "}
                to <strong>{endCity}</strong>. As a top-tier{" "}
                <strong>taxi service</strong>, we offer spacious 7+1 seating,
                captain seats, and expert drivers for reliable{" "}
                <strong>outstation cabs</strong>.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+918448445504"
                  className="btn-primary text-lg px-8 py-4 shadow-2xl"
                >
                  📞 Get Quote — 8448445504
                </a>

                <a
                  href={`https://wa.me/916280820037?text=${encodeURIComponent(
                    `Hi Chiku Cabs, I am interested in booking an Innova from ${startCity} to ${endCity}. Please help me with the booking.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-lg px-8 py-4"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
            <div className="flex-1 w-full" style={{ maxWidth: "28rem" }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9]">
                <img
                  src="/innova.png"
                  alt={`Innova outstation from ${startCity} to ${endCity} by Chiku Cabs`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL ROUTE STATS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="border-b py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="stats-grid">
              {[
                { num: "✨", label: `${startCity} → ${endCity}` },
                { num: "7+1", label: "Seating Capacity" },
                { num: "24/7", label: "Driver Included" },
                { num: "₹14+", label: "Per KM" },
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.num}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL PRICING CARDS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                PRICING
              </div>
              <h2 className="section-title">
                {startCity} to {endCity} Innova Rates
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Innova",
                  price: "₹14/km",
                  desc: "Standard Innova (7+1)",
                  features: [
                    "7+1 Seater",
                    "AC + Music",
                    "Driver + Fuel",
                    "Good Comfort",
                  ],
                  best: false,
                },
                {
                  name: "Innova Crysta",
                  price: "₹17/km",
                  desc: "Premium Crysta (7+1)",
                  features: [
                    "Captain Seats",
                    "Auto AC",
                    "Premium Interiors",
                    "Extra Luggage",
                  ],
                  best: true,
                },
                {
                  name: "HyCross",
                  price: "₹20/km",
                  desc: "Hybrid HyCross (7+1)",
                  features: [
                    "Luxury Seats",
                    "Hybrid Engine",
                    "Ultra Premium",
                    "Panoramic View",
                  ],
                  best: false,
                },
              ].map((pkg, i) => (
                <div
                  key={i}
                  className={`package-card ${pkg.best ? "popular" : ""}`}
                >
                  {pkg.best && <div className="package-badge">Best Value</div>}
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    ✨
                  </div>
                  <h3 className="text-xl font-black mb-1">{pkg.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{pkg.desc}</p>
                  <div
                    className="package-price"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {pkg.price}
                  </div>
                  <div className="package-unit">Per Kilometer</div>
                  <ul className="package-features">
                    {pkg.features.map((f, j) => (
                      <li key={j}>
                        <span className="text-green-500">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/916280820037?text=${encodeURIComponent(
                      `Hi Chiku Cabs, I am interested in booking ${pkg.name} through your website. Please help me with the booking.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-3 text-sm"
                    style={{ display: "block", textAlign: "center" }}
                  >
                    Book {pkg.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL INCLUSIONS VS EXCLUSIONS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="section-title">What's Included vs Not Included?</h2>
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
                  "Base fare per km",
                  "Driver allowance",
                  "Fuel charges",
                  "AC Innova Crysta",
                  "Night driving charges",
                  "GST (5%)",
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
                  "Toll taxes (as per actual)",
                  "Parking fees",
                  "State permit charges",
                  "Monument entry tickets",
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
            ORIGINAL WHY INNOVA (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title">
                Why Choose Innova for {startCity} to {endCity}?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: "👨‍👩‍👧‍👦",
                  title: "Family Comfort",
                  desc: `Innova's spacious 7+1 seating ensures your family travels comfortably from ${startCity} to ${endCity}.`,
                },
                {
                  icon: "🛣️",
                  title: "Highway Performance",
                  desc: "Powerful diesel engine handles long distances with ease. Smooth ride even on different road conditions.",
                },
                {
                  icon: "🧳",
                  title: "Luggage Space",
                  desc: "Massive boot space fits 4-5 large suitcases. No need to worry about packing light.",
                },
                {
                  icon: "🛡️",
                  title: "Safe & Reliable",
                  desc: "GPS-tracked vehicles with experienced, background-verified drivers who know the route well.",
                },
              ].map((feature, i) => (
                <div key={i} className="premium-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ background: "hsla(358,73%,43%,0.1)" }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL TESTIMONIALS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                REVIEWS
              </div>
              <h2 className="section-title">Innova Travelers Love Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sharma Family",
                  text: `Booked an Innova Crysta from ${startCity} to ${endCity}. The car was immaculate, captain seats were a game-changer, and the driver was exceptional.`,
                  rating: "★★★★★",
                },
                {
                  name: "Priya & Friends",
                  text: "The Innova had so much space for our luggage. Driver was punctual and drove smoothly. Will definitely book again for our next trip.",
                  rating: "★★★★★",
                },
                {
                  name: "Rajesh (Business)",
                  text: "Used for a client pickup. The Crysta made a great impression. On time, clean, and professional service.",
                  rating: "★★★★★",
                },
              ].map((review, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-stars">{review.rating}</div>
                  <p className="testimonial-text">"{review.text}"</p>
                  <div className="testimonial-author">{review.name}</div>
                  <div className="testimonial-route">
                    {startCity} → {endCity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL FAQ SECTION (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                FAQ
              </div>
              <h2 className="section-title">Innova Booking Questions</h2>
            </div>
            {innovaRouteFaqs.map((faq, i) => (
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
            ORIGINAL CTA (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Book Innova: {startCity} → {endCity}
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Premium family travel at the best rates. Call now!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-10 py-4 shadow-2xl"
              >
                📞 Call 8448445504
              </a>

              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I am interested in booking an Innova through your website. Please help me with the booking.`,
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

        <InternalLinks parsedData={parsedData} />
        <EEATSection city={startCity} vehicle="Innova Crysta" />
      </div>
    </>
  );
}
