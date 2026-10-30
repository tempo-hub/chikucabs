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
import { MapPin } from "lucide-react";

import { cityCabRoutes, CITY_DISPLAY_NAMES } from "@/data/cityCabRoutes";
import EEATSection from "@/components/shared/EEATSection";

interface StatItem {
  num: string;
  label: string;
}

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const DISPLAY_PHONE = "8448445504";
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";
const SITE_URL = "https://chikucabs.com";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();
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

const formatCityName = (cityName: string) => {
  if (CITY_DISPLAY_NAMES[cityName]) return CITY_DISPLAY_NAMES[cityName];
  return cityName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

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

export default function CityCabRoutesTemplate({ city }: { city: string }) {
  const routes =
    cityCabRoutes[city as keyof typeof cityCabRoutes] ||
    cityCabRoutes[
      (Object.keys(cityCabRoutes).find(
        (k) => k.toLowerCase() === city.toLowerCase(),
      ) || city) as keyof typeof cityCabRoutes
    ] ||
    [];

  const formattedCity = formatCityName(city);

  // Form State for Interactive Estimator
  const [formData, setFormData] = useState({
    pickup: formattedCity,
    drop: "",
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
    return calculateFare(DEFAULT_DISTANCE, selectedVehicle.ratePerKm);
  }, [selectedVehicle]);

  const startingFare = calculateFare(DEFAULT_DISTANCE, 9);

  const buildWhatsAppUrl = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🚖 *Cab Booking Request from ${formattedCity}*

📍 *Pickup:* ${formData.pickup}
📍 *Drop Destination:* ${formData.drop || "To Confirm"}
🚘 *Vehicle:* ${selectedVehicle.name} (₹${selectedVehicle.ratePerKm}/km)
💰 *Estimated Base (~${DEFAULT_DISTANCE} km):* ${formatCurrency(dynamicEstimatedPrice)}
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please share the exact fare and driver details.`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleVehicleSelect = (vehicleObj: FleetTier) => {
    const fare = calculateFare(DEFAULT_DISTANCE, vehicleObj.ratePerKm);
    const msg = `🚖 *Instant Cab Quote from ${formattedCity}*

📍 *City:* ${formattedCity}
🚘 *Car:* ${vehicleObj.name} (${vehicleObj.models})
💰 *Rate:* ₹${vehicleObj.ratePerKm}/km (Est. ~${formatCurrency(fare)} for ${DEFAULT_DISTANCE} km)

Please share booking confirmation and driver assignment.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const isVaranasi = useMemo(() => {
    const s = city.toLowerCase();
    return s.includes("varanasi") || s.includes("kashi") || s.includes("banaras");
  }, [city]);

  // Structured Data (JSON-LD)
  const structuredData = useMemo(() => {
    const canonicalUrl = `${SITE_URL}/${city.toLowerCase()}-cab-service`;

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
          name: "Cab Services",
          item: `${SITE_URL}/outstation-cabs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${formattedCity} Cab Service`,
          item: canonicalUrl,
        },
      ],
    };

    const taxiService = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `Chiku Cabs - ${formattedCity} Cab Service`,
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
      areaServed: formattedCity,
      offers: {
        "@type": "Offer",
        price: startingFare,
        priceCurrency: "INR",
        description: `Cab service in ${formattedCity} starting @ ₹9/km (Approx. ₹${startingFare} for ${DEFAULT_DISTANCE} km)`,
      },
    };

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [breadcrumbs, taxiService],
    });
  }, [city, formattedCity, startingFare]);

  const services = [
    {
      icon: "🚖",
      title: "Local Sightseeing Taxi",
      desc: `Explore popular attractions, temples, markets, and landmarks with our local sightseeing taxi service in ${formattedCity}.`,
      url: "/local-sightseeing-taxi",
    },
    {
      icon: "🛣️",
      title: "Outstation Cab",
      desc: `Affordable one-way and round-trip outstation taxi service from ${formattedCity} to nearby cities and destinations.`,
      url: "/outstation-cabs",
    },
    {
      icon: "✈️",
      title: "Airport Taxi",
      desc: `24/7 airport pickup and drop taxi service with on-time arrivals and professional drivers.`,
      url: "/airport-taxi",
    },
    {
      icon: "🚐",
      title: "Tempo Traveller",
      desc: `12, 17, 20, and 26-seater Tempo Traveller rentals for family trips, tours, and group travel.`,
      url: "/tempo-traveller-on-rent",
    },
    {
      icon: "➡️",
      title: "One Way Cab",
      desc: `Book one-way taxi services and pay only for your journey without return fare charges.`,
      url: "/one-way-cabs",
    },
  ];

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
              alt={`${formattedCity} Cab Service & Outstation Taxi by Chiku Cabs`}
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
                {formattedCity} Cab Service
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
                Reliable doorstep pickup across all localities in{" "}
                <strong className="text-white">{formattedCity}</strong> for local sightseeing,
                airport transfers, and outstation trips. Clean AC cabs, polite chauffeurs, and
                transparent per-km rates starting at only{" "}
                <strong className="text-white underline decoration-primary decoration-2 underline-offset-4">
                  ₹9/km
                </strong>
                . Zero return fare penalty on one-way drops.
              </p>

              {/* Quick Trip Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                    <FaCar /> Sedan Rate
                  </div>
                  <div className="text-lg font-black">₹9 / KM</div>
                  <div className="text-[11px] text-slate-400">Dzire / Etios / Amaze</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                    <FaClock /> Availability
                  </div>
                  <div className="text-lg font-black">24×7 Service</div>
                  <div className="text-[11px] text-slate-400">On-Time Guarantee</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-0.5">
                    <FaShieldAlt /> Driver Safety
                  </div>
                  <div className="text-lg font-black text-emerald-400">Verified</div>
                  <div className="text-[11px] text-slate-400">Police Background Checked</div>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="space-y-2 text-sm text-slate-300 mb-8">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Doorstep pickup anywhere in {formattedCity} within 30 minutes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>No return fare penalty on one-way outstation drop journeys</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Free cancellation up to 24 hours prior to scheduled departure</span>
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
                    `Hi Chiku Cabs, I need to book a cab in ${formattedCity}. Please share the best fare.`,
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
                    Book {formattedCity} Cab
                  </h2>
                </div>
                <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-md text-slate-700">
                  Local & Outstation
                </span>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Pickup */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Location in {formattedCity}
                  </label>
                  <div className="relative">
                    <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                    <input
                      type="text"
                      required
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                      placeholder={`Doorstep / Hotel / Station in ${formattedCity}`}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Drop */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Drop City / Destination
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-sm" />
                    <input
                      type="text"
                      required
                      value={formData.drop}
                      onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                      placeholder="Enter Destination City or Local Point"
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
                      Estimated Outstation Fare (~{DEFAULT_DISTANCE} km)
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
            NEW SECTION 2: TRANSPARENT FARE BREAKDOWN TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Transparent Rate Card
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3 text-slate-900">
                {formattedCity} Cab Rate Card & Vehicle Options
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl mx-auto">
                Explore transparent cab fare estimates for your travels from {formattedCity}. Compare Sedans, SUVs, Innova Crysta, and Tempo Travellers with no hidden fees.
              </p>
            </div>

            {/* Desktop & Tablet Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-4">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Cab Type & Model</th>
                    <th className="px-4 py-4">Seating & Luggage</th>
                    <th className="px-4 py-4">Rate / KM</th>
                    <th className="px-4 py-4">Est. Total (~250 KM)</th>
                    <th className="px-4 py-4">Toll & Permits</th>
                    <th className="px-4 py-4 text-center">Instant Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FLEET_OPTIONS.map((item) => {
                    const totalFare = calculateFare(DEFAULT_DISTANCE, item.ratePerKm);
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
                Private Cab vs. Train vs. Public Bus in {formattedCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why taking a private cab from {formattedCity} is the most comfortable and flexible choice for families and business travelers.
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
                      ✔ 100% Doorstep Pickup across {formattedCity}
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
                      ✔ Direct gate drop at destination
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
            NEW SECTION 4: POPULAR PICKUP POINTS IN CITY
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                City Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Key Pickup Hubs in {formattedCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                We serve all major railway stations, airports, prominent hotels, and residential colonies in {formattedCity}.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-700">
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
                      <FaCheckCircle className="text-primary" /> Main Railway Station Hub
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-primary" /> Domestic / International Airport
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
                      <FaCheckCircle className="text-primary" /> Ring Road & Bypass Junctions
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPANDED CITY CAB SERVICE OVERVIEW & USE CASES
        ====================================================== */}
        <section className="py-20 px-4 bg-muted/20 border-b">
          <div className="max-w-7xl mx-auto">
            {/* Header & Main Introduction */}
            <div className="text-center max-w-7xl mx-auto mb-16">
              <div className="section-badge mb-4">
                🚕 {city.toUpperCase()} CAB SERVICE OVERVIEW
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Premium & Affordable {formattedCity} Cab Service
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Looking for dependable, stress-free transportation in{" "}
                <span className="font-semibold text-gray-800">{formattedCity}</span>?
                Chiku Cabs delivers verified chauffeur-driven taxi rentals for
                daily local commutes, punctual airport & railway transfers, heritage
                sightseeing, and intercity outstation routes. Whether you need an
                economical sedan for city errands, a premium Ertiga or Innova Crysta for
                family travel, or a spacious Tempo Traveller for group tours, our
                well-maintained fleet is available 24/7 with zero surge pricing.
              </p>
            </div>

            {/* 4 Core Travel Use Cases in the City */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-4">
                  🏙️
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Local Sightseeing & Hourly Rentals
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hire a dedicated cab for 4hr/40km, 8hr/80km, or full-day 12hr packages
                  to explore popular temples, shopping hubs, tourist spots, and corporate
                  meetings in {formattedCity} at your own pace.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl mb-4">
                  ✈️
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  24/7 Airport & Railway Transfers
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Catch early morning flights or late-night trains with guaranteed on-time
                  doorstep pickups from {formattedCity} Airport and all key Railway
                  Terminals. Enjoy flight tracking and zero wait-time anxiety.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl mb-4">
                  🛣️
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Outstation One-Way Dropping
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Traveling one-way to neighbouring cities? Pay only for the single-side
                  distance traveled without bearing the driver's empty return trip fare.
                  Save up to 40% compared to conventional round-trip billing.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-2xl mb-4">
                  🔄
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Round-Trip & Multi-Day Tours
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Plan family vacations, spiritual yatras, and business road trips with
                  the same seasoned highway chauffeur and clean AC vehicle for the entire
                  journey. Flexible halts and customized itineraries.
                </p>
              </div>
            </div>

            {/* Why Chiku Cabs in this City - Feature Highlights */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
                    Why Travel With Us
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                    The Smartest Way to Travel in & from {formattedCity}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    We eliminate common travel hassles like peak-hour price surges,
                    unpleasant last-minute driver cancellations, and unclean vehicles.
                    Get verified reliability at standardized per-km rates.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/25"
                    >
                      <FaPhoneAlt className="text-sm" /> Call {DISPLAY_PHONE}
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Chiku%20Cabs,%20I%20want%20to%20book%20a%20cab%20in%20${encodeURIComponent(formattedCity)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
                    >
                      <FaWhatsapp className="text-base" /> WhatsApp Booking
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2 font-bold text-white text-base">
                      <FaCheckCircle className="text-primary text-lg shrink-0" />
                      <span>Transparent Billing</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Rates start from ₹9/km for sedans. Clear pricing with zero hidden
                      convenience fees or peak-hour surge gouging.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2 font-bold text-white text-base">
                      <FaCheckCircle className="text-primary text-lg shrink-0" />
                      <span>Verified Chauffeurs</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      All drivers are police-verified, background-checked, and highly
                      experienced with local city routes and major national expressways.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2 font-bold text-white text-base">
                      <FaCheckCircle className="text-primary text-lg shrink-0" />
                      <span>Doorstep Pick & Drop</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Punctual pickup from any residential locality, hotel lobby, business
                      park, or railway junction across {formattedCity}.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2 font-bold text-white text-base">
                      <FaCheckCircle className="text-primary text-lg shrink-0" />
                      <span>GPS Tracked & Sanitized</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every car is GPS-monitored 24/7 by our central operations room,
                      cleaned before dispatch, and equipped with chilled AC.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Connected Outstation Routes Mention */}
              {routes && routes.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-primary uppercase tracking-wide mr-2">
                      Popular Highway Routes from {formattedCity}:
                    </span>
                    {routes.slice(0, 4).map((r, idx) => (
                      <span key={idx}>
                        {r.from} to {r.to} ({r.distance} km)
                        {idx < Math.min(routes.length, 4) - 1 ? " • " : ""}
                      </span>
                    ))}
                    {routes.length > 4 && " & many more."}
                  </div>
                  <span className="text-xs font-medium text-slate-400 shrink-0">
                    One-Way & Round-Trip Available Daily
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            TRUST METRICS & PERFORMANCE STATS
        ====================================================== */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="section-badge mx-auto mb-3">
                ★ PROVEN TRACK RECORD & TRUST
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Trusted by Over 50,000+ Happy Commuters
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Delivering reliable, comfortable, and pocket-friendly journeys in{" "}
                <span className="font-semibold text-gray-800">{formattedCity}</span> and
                across India with unmatched on-time performance.
              </p>
            </div>

            {/* Main 4 Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200/80 hover:border-primary/40 transition-all hover:-translate-y-1">
                <div className="text-3xl md:text-5xl font-black text-primary mb-2">
                  50K+
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1">
                  Completed Rides
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">
                  In & around {formattedCity}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200/80 hover:border-primary/40 transition-all hover:-translate-y-1">
                <div className="text-3xl md:text-5xl font-black text-amber-500 mb-2">
                  4.9★
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1">
                  Google & Verified Rating
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">
                  From 12,000+ happy customers
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200/80 hover:border-primary/40 transition-all hover:-translate-y-1">
                <div className="text-3xl md:text-5xl font-black text-emerald-600 mb-2">
                  99.4%
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1">
                  On-Time Guarantee
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Punctual airport & station pickup
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200/80 hover:border-primary/40 transition-all hover:-translate-y-1">
                <div className="text-3xl md:text-5xl font-black text-blue-600 mb-2">
                  24/7
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1">
                  Live Journey Support
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Dedicated operations command center
                </p>
              </div>
            </div>

            {/* Quality Commitment Badges Strip */}
            <div className="bg-white/70 backdrop-blur rounded-2xl p-5 border border-primary/10 flex flex-wrap items-center justify-around gap-4 text-center">
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                <FaShieldAlt className="text-primary text-base" /> Commercial Permits & Insurance
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                <FaCar className="text-primary text-base" /> Sanitized & Chilled AC Fleet
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                <FaCheckCircle className="text-primary text-base" /> Zero Cancellation Surcharges
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                <FaClock className="text-primary text-base" /> Instant Ride Booking Confirmation
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL AVAILABLE VEHICLES (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-16 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Available Vehicles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our fleet of well-maintained vehicles for your
                outstation trip
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Vehicle 1 - Dzire */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <img
                    src="/suzuki-dzire.png"
                    alt="Maruti Suzuki Dzire"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Maruti Suzuki Dzire
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>👥 4 Seats</span>
                    <span>🧳 2 Luggage</span>
                    <span>❄️ AC</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">₹9</span>
                    <span className="text-gray-500">/km</span>
                  </div>
                  <button
                    onClick={() => handleVehicleSelect(FLEET_OPTIONS[0])}
                    className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Vehicle 2 - Amaze */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                  <img
                    src="/honda-amaze.png"
                    alt="Honda Amaze"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Honda Amaze
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>👥 4 Seats</span>
                    <span>🧳 3 Luggage</span>
                    <span>❄️ AC</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">₹9</span>
                    <span className="text-gray-500">/km</span>
                  </div>
                  <button
                    onClick={() => handleVehicleSelect(FLEET_OPTIONS[0])}
                    className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Vehicle 3 - Ertiga */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <img
                    src="/maruti-ertiga.png"
                    alt="Maruti Ertiga"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Maruti Ertiga
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>👥 7 Seats</span>
                    <span>🧳 3 Luggage</span>
                    <span>❄️ AC</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">₹13</span>
                    <span className="text-gray-500">/km</span>
                  </div>
                  <button
                    onClick={() => handleVehicleSelect(FLEET_OPTIONS[1])}
                    className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Vehicle 4 - Innova Crysta */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <img
                    src="/innova-crysta.png"
                    alt="Toyota Innova Crysta"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Toyota Innova Crysta
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>👥 7 Seats</span>
                    <span>🧳 4 Luggage</span>
                    <span>❄️ AC | Premium</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">₹16</span>
                    <span className="text-gray-500">/km</span>
                  </div>
                  <button
                    onClick={() => handleVehicleSelect(FLEET_OPTIONS[2])}
                    className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL WHY CHIKU CABS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 border-y px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                WHY CHOOSE US
              </div>
              <h2 className="section-title">
                Why Choose Chiku Cabs for One Way Taxi Service?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "💰",
                  title: "Pay Only One Side",
                  desc: "Don't pay for the driver's empty return trip. Our one-way dropping service saves you up to 50% on your fare.",
                },
                {
                  icon: "🚪",
                  title: "Door-to-Door Service",
                  desc: `We pick you up from your doorstep in ${city} and drop you exactly at your destination.`,
                },
                {
                  icon: "👨‍✈️",
                  title: "Expert Outstation Drivers",
                  desc: "Our chauffeurs are highly trained in highway driving, ensuring a safe, smooth, and timely intercity journey.",
                },
                {
                  icon: "🚗",
                  title: "Dedicated Premium Fleet",
                  desc: "We use only well-maintained, newer model cars equipped with dual AC and GPS tracking for intercity drops.",
                },
                {
                  icon: "🚫",
                  title: "Zero Cancellation Fee",
                  desc: "Plans changed? No worries. Cancel your one-way cab up to 24 hours before pickup at absolutely no extra charge.",
                },
                {
                  icon: "📞",
                  title: "24/7 Journey Support",
                  desc: "Our command center monitors your intercity trip from start to finish, ready to help with any request.",
                },
              ].map((feature, i) => (
                <div key={i} className="premium-card group">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl"
                    style={{ background: "hsla(45,90%,50%,0.1)" }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL SERVICE TYPES (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24 px-4 border-y">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                SERVICES
              </div>

              <h2 className="section-title">
                Cab Services Available in {formattedCity}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <Link
                  key={i}
                  href={service.url}
                  className="premium-card block hover:scale-[1.02] transition-transform"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>

                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                  <p className="text-muted-foreground">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL POPULAR ROUTES (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24 px-4 bg-muted/20 border-y">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title">
                Popular Cab Routes from {formattedCity}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {routes.map((route, i) => (
                <Link key={i} href={route.url} className="route-card">
                  <div className="route-card-icon">🚕</div>

                  <div>
                    <div className="font-bold">
                      {route.from} to {route.to}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {route.distance} KM
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL TOURIST PLACES (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-24 px-4 border-y">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                TOURIST DESTINATIONS
              </div>

              <h2 className="section-title">
                Popular Places to Visit in {formattedCity}
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                "Airport",
                "Railway Station",
                "Temple",
                "Shopping Market",
                "Bus Stand",
                "Tourist Attractions",
                "Hotels",
                "Corporate Offices",
              ].map((place, i) => (
                <div key={i} className="premium-card text-center">
                  <div className="flex justify-center items-center text-4xl mb-4">
                    <MapPin />
                  </div>

                  <h3 className="font-bold text-lg">
                    {formattedCity} {place}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL AIRPORT TAXI (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/30 py-24 px-4 border-y">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                AIRPORT TRANSFER
              </div>

              <h2 className="section-title">
                Airport Taxi Service in {formattedCity}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "✈️",
                  title: "Airport Pickup",
                },
                {
                  icon: "🚖",
                  title: "Airport Drop",
                },
                {
                  icon: "🕒",
                  title: "24/7 Availability",
                },
              ].map((item, i) => (
                <div key={i} className="premium-card text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>

                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL CUSTOMER REVIEWS (PRESERVED IN FULL)
        ====================================================== */}
        <section className="bg-muted/20 py-24 px-4 border-y">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                REVIEWS
              </div>

              <h2 className="section-title">What Customers Say About Us</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rahul Sharma",
                  review:
                    "Excellent cab service. Driver was polite and car was clean.",
                },
                {
                  name: "Priya Verma",
                  review: "Best outstation taxi service with affordable pricing.",
                },
                {
                  name: "Amit Singh",
                  review:
                    "Professional drivers and smooth airport pickup experience.",
                },
              ].map((review, i) => (
                <div key={i} className="premium-card">
                  <div className="text-yellow-500 mb-4">★★★★★</div>

                  <p className="text-muted-foreground mb-4">"{review.review}"</p>

                  <div className="font-bold">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ORIGINAL FAQ (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                FAQ
              </div>
              <h2 className="section-title">
                Cab Rental Questions{" "}
                {city !== "India" ? `for ${formattedCity}` : ""}
              </h2>
            </div>
            {[
              {
  q: `What payment options are available for cab booking in ${formattedCity}?`,
  a: `You can pay via UPI, online payment, or other available methods. The accepted payment options are confirmed during booking.`,
},
{
  q: `Can I cancel or reschedule my cab booking in ${formattedCity}?`,
  a: `Yes, bookings can be cancelled or rescheduled as per our cancellation policy. Charges may apply depending on how close the change is to your pickup time.`,
},
{
  q: `Are toll, parking and state taxes included in the cab fare?`,
  a: `Toll, parking and interstate taxes are charged additionally where applicable, depending on your route. Applicable charges are shared when you confirm your booking.`,
},
{
  q: `What is the minimum kilometre limit for outstation trips from ${formattedCity}?`,
  a: `Outstation round trips are billed on a minimum daily kilometre limit; one-way trips are charged by route distance. // TODO: add your actual km/day figure`,
},
{
  q: `Is there any extra charge for night travel or driver allowance?`,
  a: `Night charges and driver allowance may apply on outstation and late-night trips. // TODO: add your actual night-charge and allowance amounts`,
},
{
  q: `How early should I book a cab in ${formattedCity}?`,
  a: `For local and airport rides, booking a few hours ahead is usually enough. For outstation trips, weddings, and festival or peak season travel, book at least 1–2 days in advance to guarantee availability.`,
},
{
  q: `Can I book a round-trip or multi-day outstation cab from ${formattedCity}?`,
  a: `Yes. We offer one-way, round-trip, and multi-day outstation cabs from ${formattedCity}, with the same car and driver for the full journey on round trips.`,
},
{
  q: `Which popular outstation destinations can I travel to from ${formattedCity}?`,
  a: `You can book cabs from ${formattedCity} to nearby cities, pilgrimage destinations, and hill stations across North India. // UNIQUE-PER-CITY: replace with 4–5 real destinations pulled from masterRoutes for this city`,
},
{
  q: `How many passengers and how much luggage can the vehicle carry?`,
  a: `Sedans like Dzire and Amaze seat 4 passengers, Ertiga and Innova Crysta seat 6–7, and Tempo Travellers seat larger groups. Tell us your group size and luggage when booking so we can suggest the right vehicle.`,
},
{
  q: `Do you offer local sightseeing or hourly cab rental in ${formattedCity}?`,
  a: `Yes, you can hire a cab with driver in ${formattedCity} for local sightseeing, shopping, and day-long city travel with flexible stops.`,
},
{
  q: `Is cab service available for early morning or late-night pickups?`,
  a: `Yes, our service runs 24/7, including early-morning and late-night airport and railway station transfers in ${formattedCity}. Share your pickup time in advance for guaranteed availability.`,
},
{
  q: `Can I book a Tempo Traveller for a group trip from ${formattedCity}?`,
  a: `Yes. Tempo Travellers in 12, 16, 20 and 24-seater options are available from ${formattedCity} for family trips, pilgrimages, weddings, and corporate group travel.`,
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
            ORIGINAL TRUST BADGES (PRESERVED IN FULL)
        ====================================================== */}
        <div className="py-12 border-y">
          <div className="flex flex-wrap justify-center gap-12 opacity-60">
            {[
              "🛡️ SafeTravels Certified",
              "📋 ISO 9001:2015",
              `⭐ Top Rated ${currentYear}`,
              "🌿 Eco Friendly Fleet",
            ].map((badge, i) => (
              <span
                key={i}
                className="font-bold text-sm uppercase tracking-widest"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* =====================================================
            ORIGINAL FINAL CTA (PRESERVED IN FULL)
        ====================================================== */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-black mb-6">
              Book Your Cab in {formattedCity} Today
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Affordable fares, verified drivers, and 24/7 support.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:+${PHONE_NUMBER}`}
                className="btn-primary text-xl px-12 py-5 shadow-2xl"
              >
                📞 Call {DISPLAY_PHONE}
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I am interested in booking a cab in ${formattedCity} through your website. Please help me with the booking.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105 shadow-lg"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <EEATSection city={formattedCity} vehicle="Cab" />
      </div>
    </>
  );
}
