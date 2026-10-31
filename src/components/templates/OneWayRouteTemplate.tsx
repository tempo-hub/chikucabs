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
  FaGasPump,
  FaCalendarAlt,
  FaArrowRight,
  FaChevronDown,
  FaInfoCircle,
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

export default function OneWayRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const { origin, destination, vehicle } = parsedData;
  const startCity = origin || "Origin";
  const endCity = destination || "Destination";
  const vehicleType = vehicle || "Cab";

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
    const msg = `🚖 *One-Way Cab Booking Request*

📍 *Route:* ${formData.pickup} → ${formData.drop}
📏 *Distance:* Approx. ${distance} km
🚘 *Vehicle:* ${selectedVehicle.name} (₹${selectedVehicle.ratePerKm}/km)
💰 *Estimated Fare:* ${formatCurrency(dynamicEstimatedPrice)}
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please confirm vehicle availability and driver details.`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleVehicleSelect = (vehicleObj: FleetTier) => {
    const fare = calculateFare(distance, vehicleObj.ratePerKm);
    const msg = `🚖 *Instant Cab Quote*

📍 *Route:* ${startCity} to ${endCity} (~${distance} km)
🚘 *Car:* ${vehicleObj.name} (${vehicleObj.models})
💰 *Estimated Total:* ${formatCurrency(fare)}

Please share the final fare and booking confirmation.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  // 12 High-Intent SEO FAQs
  const routeFaqs = useMemo(
    () => [
      {
        q: `Do I have to pay for the return trip if I book a ${startCity} to ${endCity} one-way cab?`,
        a: `No, you do not have to pay for any return journey. Chiku Cabs offers dedicated one-way drop taxis where you strictly pay for the ${distance} km traveled. There are no dead-run or return kilometers charged to the customer.`,
      },
      {
        q: `What is the total one-way cab fare from ${startCity} to ${endCity}?`,
        a: `The one-way cab fare from ${startCity} to ${endCity} starts at ₹${startingFare} for an AC Sedan (Maruti Dzire / Honda Amaze), ₹${calculateFare(distance, 12)} for an SUV (Maruti Ertiga), and ₹${calculateFare(distance, 16)} for a Toyota Innova Crysta. Driver allowance and GST are already factored in.`,
      },
      {
        q: `What is the road distance and travel time from ${startCity} to ${endCity}?`,
        a: `The road distance from ${startCity} to ${endCity} is approximately ${distance} km. The journey usually takes around ${travelHours} hours by cab via the main national highway, allowing for comfortable cruising speeds and quick highway breaks.`,
      },
      {
        q: `Are highway toll taxes included in the fare?`,
        a: `Highway toll taxes are payable at actual Fastag booths en route as per government toll plaza rates. For a one-way trip, you only pay single-side tolls. State commercial permits and fuel are covered.`,
      },
      {
        q: isGaya
          ? `Can I book a same-day round trip for Pind Daan in Gaya from ${startCity}?`
          : `Can I make stops or take a detour during my ${startCity} to ${endCity} journey?`,
        a: isGaya
          ? `Yes, same-day and multi-day round-trip packages are available specifically for Pind Daan rituals at Vishnupad Mandir and Phalgu River. The driver will wait while you complete the ceremonies and bring you back safely to ${startCity}.`
          : `Yes, you can request en-route food and rest stops along the highway. If you have specific planned sightseeing detours, please inform us at the time of booking so the itinerary can be scheduled accordingly.`,
      },
      {
        q: `Is the ${startCity} to ${endCity} cab service door-to-door?`,
        a: `Yes, 100% door-to-door. Our chauffeur will pick you up directly from your doorstep, home, hotel, or railway station in ${startCity} and drop you directly at your specified destination in ${endCity}.`,
      },
      {
        q: `What is the cancellation policy for ${startCity} to ${endCity} cabs?`,
        a: `Chiku Cabs offers a zero cancellation fee policy up to 24 hours before your scheduled pickup time. If your plans change, simply notify our customer support team for an instant cancellation.`,
      },
      {
        q: `Which cars are available for ${startCity} to ${endCity} travel?`,
        a: `You can choose from Maruti Suzuki Dzire, Honda Amaze, Toyota Etios, Maruti Ertiga, Toyota Innova Crysta, and Force Tempo Travellers (12, 16, and 26 seaters) depending on your group size and luggage requirements.`,
      },
      {
        q: `How much luggage can I carry in a one-way sedan or SUV?`,
        a: `AC Sedans (Dzire/Amaze) carry 2 large trolley bags plus 2 cabin duffels. SUVs (Ertiga/Innova Crysta) carry 4 to 5 large suitcases comfortably with spacious trunk compartments and split rear seating.`,
      },
      {
        q: `Can I book an airport or railway station pickup in ${startCity} for direct drop to ${endCity}?`,
        a: `Yes! We provide 24×7 pickup from airports and major railway junctions in ${startCity}. Our driver will track your arrival schedule and be waiting at the designated terminal pickup point.`,
      },
      {
        q: `Are digital Fastag toll receipts and GST invoices provided?`,
        a: `Yes. All highway toll charges are billed accurately through electronic Fastag logs, and an official computerized GST tax invoice is automatically generated and sent to your email after trip completion.`,
      },
      {
        q: `How do I book a ${startCity} to ${endCity} one-way cab instantly?`,
        a: `You can book online on chikucabs.com, call our customer support at 8448445504, or connect via WhatsApp at +91 6280820037 for instant booking confirmation and driver assignment.`,
      },
    ],
    [startCity, endCity, distance, startingFare, travelHours, isGaya]
  );

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
          name: `${startCity} to ${endCity} Cab`,
          item: canonicalUrl,
        },
      ],
    };

    const taxiService = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `Chiku Cabs - ${startCity} to ${endCity} One Way Cab Service`,
      provider: {
        "@type": "LocalBusiness",
        name: SITE_NAME,
        telephone: PHONE_NUMBER,
        url: SITE_URL,
        priceRange: "₹₹",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "2840",
        },
      },
      areaServed: [startCity, endCity],
      offers: {
        "@type": "Offer",
        price: startingFare,
        priceCurrency: "INR",
        description: `One way cab from ${startCity} to ${endCity} starting @ ₹${startingFare} for ${distance} km`,
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: routeFaqs.map((faq) => ({
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
  }, [startCity, endCity, distance, startingFare, travelHours, routeFaqs]);

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
            HERO SECTION WITH LIVE BOOKING FORM
        ====================================================== */}
        <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
          {/* Background Image */}
          <div className="absolute inset-0 -z-30">
            <Image
              src="/outstation.webp"
              alt={`${startCity} to ${endCity} Outstation One Way Cab by Chiku Cabs`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 -z-20 bg-black/50" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-white/15 mb-4">
                <FaStar className="text-amber-400" />
                <span>4.9 / 5 Rated (3,450+ Completed Intercity Trips)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                {startCity} to {endCity} One Way Cab
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
                    `Hi Chiku Cabs, I need a one-way cab from ${startCity} to ${endCity}. Please share the best fare.`,
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
                  One-Way Drop
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
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
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
            BREADCRUMB & FRESHNESS BAR
        ====================================================== */}
        <section className="bg-slate-50 border-b border-slate-200 py-3 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-600">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/one-way-cabs" className="hover:text-primary transition-colors">
                One Way Cabs
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-900">
                {startCity} to {endCity} Cab
              </span>
            </nav>
            {/* <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified Fares • {CURRENT_UPDATE_DATE}
            </div> */}
          </div>
        </section>

        {/* =====================================================
            TOTAL FARE BREAKDOWN & VEHICLE COMPARISON TABLE
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

              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Explore transparent cab fare estimates for your {distance} km journey from{" "}
                {startCity} to {endCity}. Compare available vehicles and choose the
                right cab for a comfortable and hassle-free trip.
              </p>
            </div>

            {/* Desktop & Tablet Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Cab Type & Model</th>
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-2">
              <p>
                *Toll tax receipts provided transparently at highway toll plazas. Parking charges
                (if any) payable at actuals.
              </p>
              <p className="font-semibold text-slate-700">
                Fare quote valid as of: {CURRENT_UPDATE_DATE}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            ROUTE DISTANCE, HIGHWAY & TRANSIT STOPS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Journey Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Distance, Travel Time & Highway Route
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Key milestones, road conditions, and recommended rest stops for your road journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Total Road Distance</div>
                <div className="text-3xl font-black text-slate-900 mt-1">{distance} KM</div>
                <p className="text-xs text-slate-600 mt-2">
                  Optimal highway route mapped via national and state corridors.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Average Travel Time</div>
                <div className="text-3xl font-black text-slate-900 mt-1">~{travelHours} Hours</div>
                <p className="text-xs text-slate-600 mt-2">
                  Subject to city exit traffic, highway toll plazas, and food breaks.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Major Highway</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {isVaranasi && (isGaya || isBodhGaya) ? "NH-19 (Old NH-2)" : "National Highway"}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {isVaranasi && (isGaya || isBodhGaya)
                    ? "Grand Trunk Road via Mohania, Sasaram, and Aurangabad."
                    : "Multi-lane express highway with ample food dhabas & fuel stops."}
                </p>
              </div>
            </div>

            {/* Popular En-route Stops (Contextual) */}
            {isVaranasi && (isGaya || isBodhGaya) && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <FaRoute className="text-primary" /> Recommended En-Route Stops between Varanasi & Gaya
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Karmanasa Border</span>
                    UP-Bihar border crossing with clear commercial permit assistance handled by your chauffeur.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Sasaram Heritage Stop</span>
                    Famous Tomb of Sher Shah Suri (16th-century Indo-Islamic architecture surrounded by a lake).
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Aurangabad Highway Dhabas</span>
                    Clean family restaurants, washrooms, and North Indian vegetarian meals on the GT Road.
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            CAB VS TRAIN VS BUS COMPARISON TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Smart Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Cab vs. Train vs. Bus: {startCity} to {endCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Why taking a private one-way cab is the most comfortable and flexible choice for
                families, elders, and travelers with luggage.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
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
            PICKUP & DROP LOCALITIES
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                City Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Popular Pickup & Drop Points
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                We serve all major railway stations, airports, temples, hotels, and residential
                colonies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pickup in Origin */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-xl" /> Top Pickup Points in {startCity}
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
                        <FaCheckCircle className="text-primary" /> LBS International Airport (Babatpur)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Godowlia & Dashashwamedh Ghat
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Assi Ghat & Lanka (BHU)
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
                        <FaCheckCircle className="text-primary" /> Central Bus Stand
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> City Center & Major Hotels
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Residential Townships
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Bypass Highway Junctions
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Drop in Destination */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> Top Drop Locations in {endCity}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {isGaya ? (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Vishnupad Mandir Gate
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Phalgu River & Devghat
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gaya Junction Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Akshay Vat & Mangla Gauri Mandir
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gaya Airport (GAY)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Bodh Gaya Hotels / Monastery Drop
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {endCity} Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {endCity} Domestic / Int'l Airport
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Prominent City Hotels & Resorts
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Central Commercial Hubs
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Pilgrimage Shrines & Temples
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Doorstep Residential Drop
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INCLUSIONS, EXCLUSIONS & PRACTICAL TERMS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                100% Transparent
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Fare Inclusions, Exclusions & Booking Terms
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                No unpleasant billing surprises at the end of your trip.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Inclusions */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
                <h3 className="font-bold text-emerald-900 text-base mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-600" /> What is Included in Your Fare?
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>One-way base travel fare for {distance} km</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Fuel charges & vehicle wear/tear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Driver allowance (Batta) & food charges included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Goods and Services Tax (GST 5%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Commercial inter-state vehicle entry permits</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
                <h3 className="font-bold text-rose-900 text-base mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-rose-600" /> Exclusions & Additional Charges
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Highway Toll Plaza Charges (payable at actual Fastag booths)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Parking charges if vehicle is parked at specific monuments or temples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Night driving charge (₹250 applied only if journey is between 10 PM and 6 AM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Waiting time: First 45 mins free; ₹150 per hour thereafter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Additional detour distance beyond confirmed route charged at vehicle per-km rate</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment & Cancellation Highlights */}
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Easy Payment Modes</span>
                Pay advance or balance via UPI (Google Pay, PhonePe, Paytm), Net Banking, Cards, or
                cash to driver.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Zero Cancellation Fee</span>
                Plans changed? Cancel up to 24 hours before your pickup time with 100% refund.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Elderly & Child Friendly</span>
                Courteous drivers assist with luggage loading and respect frequent bio-break requests.
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RETURN ROUTE & SISTER ROUTES PROMPT
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Need a Return Trip?
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                Book {endCity} to {startCity} Return Cab
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Traveling back? Get special round-trip rates or return drop cabs with instant
                confirmation.
              </p>
            </div>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3 font-bold text-sm text-white shrink-0 hover:scale-105 transition"
            >
              <FaPhoneAlt /> Call For Return Fare
            </a>
          </div>
        </section>

        {/* =====================================================
            FREQUENTLY ASKED QUESTIONS (SNIPPET READY)
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Taxi Booking FAQs
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Quick, direct answers about fares, travel times, and vehicle options.
              </p>
            </div>

            <div className="space-y-3.5">
              {routeFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition open:bg-white open:shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-bold text-slate-900 text-sm sm:text-base list-none">
                    <span>{faq.q}</span>
                    <FaChevronDown className="text-xs text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-3" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            INTERNAL LINKS & SHARED EEAT SECTION
        ====================================================== */}
        <InternalLinks parsedData={parsedData} />
        <EEATSection city={startCity} vehicle={vehicleType} />
      </div>
    </>
  );
}
