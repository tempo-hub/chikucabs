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
  FaBus,
  FaUsers,
  FaSuitcase,
  FaCalendarAlt,
  FaArrowRight,
  FaChevronDown,
  FaInfoCircle,
  FaSnowflake,
  FaUserTie,
  FaCar,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { ParsedRouteData } from "@/lib/urlParser";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import { POPULAR_ROUTES as airportCabRoutes } from "@/data/airportRoutes";
import { routesByCity } from "@/data/allRoutes";
import { getNearbyRoutes, getAnchorText } from "@/lib/internalLinks";
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

export function calculateFare(distanceKm: number, pricePerKm: number = 20): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  const rate = Number.isFinite(pricePerKm) && pricePerKm > 0 ? pricePerKm : 20;
  return Math.round(distanceKm * 1.5 * rate + DRIVER_ALLOWANCE);
}

interface TempoFleetTier {
  id: string;
  name: string;
  seating: string;
  capacity: number;
  ratePerKm: number;
  luggage: string;
  ac: string;
  features: string[];
  image: string;
  idealFor: string;
  popular?: boolean;
}

const TEMPO_FLEET_OPTIONS: TempoFleetTier[] = [
  {
    id: "9-seater",
    name: "9-10 Seater Luxury Maharaja",
    seating: "9-10 Passengers",
    capacity: 10,
    ratePerKm: 20,
    luggage: "8-10 Bags + Roof Carrier",
    ac: "Dual High-Cooling AC",
    features: [
      "1x1 Maharaja Recliner Seats",
      "Individual AC Vents",
      "LED Screen & Audio",
      "USB Charging Ports",
    ],
    image: "/tempo_traveller.png",
    idealFor: "Small families, VIP & senior citizen pilgrimage tours",
  },
  {
    id: "12-seater",
    name: "12-13 Seater Executive Traveller",
    seating: "12-13 Passengers",
    capacity: 13,
    ratePerKm: 22,
    luggage: "12-14 Bags + Roof Carrier",
    ac: "Full Cabin AC with Multi-Vents",
    features: [
      "2x1 Pushback Plush Seats",
      "Ample Legroom & Gangway",
      "Bluetooth Sound System",
      "Clean Sanitized Interiors",
    ],
    image: "/tempo_traveller.png",
    idealFor: "Family vacations, religious yatras & airport transfers",
    popular: true,
  },
  {
    id: "16-seater",
    name: "16-17 Seater Group Traveller",
    seating: "16-17 Passengers",
    capacity: 17,
    ratePerKm: 25,
    luggage: "16+ Bags + Spacious Carrier",
    ac: "Dual Blower High-Efficiency AC",
    features: [
      "2x1 Pushback Recliners",
      "Reading Lamps & Charging",
      "Spacious Boot & Roof Hold",
      "First Aid Kit & Chauffeur",
    ],
    image: "/tempo_traveller.png",
    idealFor: "Medium group tours, wedding guests & corporate outings",
  },
  {
    id: "20-seater",
    name: "20 Seater High-Capacity Traveller",
    seating: "20 Passengers",
    capacity: 20,
    ratePerKm: 29,
    luggage: "20+ Bags + Heavy Carrier",
    ac: "Front & Rear Dual AC Blowers",
    features: [
      "Wide Ergonomic Seats",
      "High-Roof Easy Walking Aisle",
      "PA System / Mic Setup",
      "Emergency Exit & GPS Tracking",
    ],
    image: "/tempo_traveller.png",
    idealFor: "Large joint families, college trips & conferences",
  },
  {
    id: "26-seater",
    name: "26 Seater Super Luxury Mini Bus",
    seating: "26 Passengers",
    capacity: 26,
    ratePerKm: 32,
    luggage: "25+ Heavy Bags + Massive Carrier",
    ac: "Dual High-Ton Climate Control",
    features: [
      "Pushback Comfortable Seats",
      "Wide Central Gangway",
      "Large Tinted Glass Windows",
      "Fire Extinguisher & GPS",
    ],
    image: "/tempo_traveller.png",
    idealFor: "Wedding baarat shuttles, major pilgrimage groups & events",
  },
];

export default function TempoTravellerRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const { origin, destination } = parsedData;
  const startCity = origin || "Origin";
  const endCity = destination || "Destination";

  const citySlug = startCity.toLowerCase().replace(/\s+/g, "-");
  const endCitySlug = endCity.toLowerCase().replace(/\s+/g, "-");

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
  const startingFare = calculateFare(distance, 20);
  const startingPerPerson = Math.round(startingFare / 10);

  // Form State for Interactive Estimator
  const [formData, setFormData] = useState({
    pickup: startCity,
    drop: endCity,
    date: "",
    time: "",
    vehicleId: "12-seater",
  });

  const selectedVehicle = useMemo(() => {
    return (
      TEMPO_FLEET_OPTIONS.find((f) => f.id === formData.vehicleId) ||
      TEMPO_FLEET_OPTIONS[1]
    );
  }, [formData.vehicleId]);

  const dynamicEstimatedPrice = useMemo(() => {
    return calculateFare(distance, selectedVehicle.ratePerKm);
  }, [distance, selectedVehicle]);

  const dynamicPerPerson = useMemo(() => {
    return Math.round(dynamicEstimatedPrice / selectedVehicle.capacity);
  }, [dynamicEstimatedPrice, selectedVehicle]);

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

  const isAyodhya = useMemo(() => {
    const s = startCity.toLowerCase();
    const e = endCity.toLowerCase();
    return s.includes("ayodhya") || e.includes("ayodhya");
  }, [startCity, endCity]);

  const isPilgrimage = useMemo(() => {
    const s = startCity.toLowerCase();
    const e = endCity.toLowerCase();
    return (
      s.includes("gaya") ||
      e.includes("gaya") ||
      s.includes("varanasi") ||
      e.includes("varanasi") ||
      s.includes("ayodhya") ||
      e.includes("ayodhya") ||
      s.includes("haridwar") ||
      e.includes("haridwar") ||
      s.includes("rishikesh") ||
      e.includes("rishikesh") ||
      s.includes("prayagraj") ||
      e.includes("prayagraj") ||
      s.includes("shirdi") ||
      e.includes("shirdi") ||
      s.includes("tirupati") ||
      e.includes("tirupati")
    );
  }, [startCity, endCity]);

  // Nearby Routes for Interlinking
  const currentUrl = `/${citySlug}/tempo-traveller-hire-${citySlug}-to-${endCitySlug}`;
  const routes = routesByCity[citySlug] || [];
  const routePages = routes.map((r: { slug: string }) => ({ slug: r.slug }));
  const nearbyRoutes = getNearbyRoutes(currentUrl, routePages);

  const buildWhatsAppUrl = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🚐 *Tempo Traveller Booking Request*

📍 *Route:* ${formData.pickup} → ${formData.drop}
📏 *Distance:* Approx. ${distance} km
👥 *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.seating})
💰 *Estimated Fare:* ${formatCurrency(dynamicEstimatedPrice)} (~${formatCurrency(dynamicPerPerson)}/seat)
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please confirm vehicle availability, luggage carrier, and driver details.`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleVehicleSelect = (vehicleObj: TempoFleetTier) => {
    const fare = calculateFare(distance, vehicleObj.ratePerKm);
    const perSeat = Math.round(fare / vehicleObj.capacity);
    const msg = `🚐 *Instant Tempo Traveller Quote*

📍 *Route:* ${startCity} to ${endCity} (~${distance} km)
👥 *Vehicle:* ${vehicleObj.name} (${vehicleObj.seating})
💰 *Estimated Total:* ${formatCurrency(fare)} (~${formatCurrency(perSeat)}/seat)
🧳 *Luggage:* ${vehicleObj.luggage}

Please share booking confirmation and vehicle pictures.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  // 12 High-Intent SEO FAQs
  const routeFaqs = useMemo(
    () => [
      {
        q: `How much does a Tempo Traveller cost from ${startCity} to ${endCity}?`,
        a: `The Tempo Traveller fare from ${startCity} to ${endCity} starts from ₹${startingFare} for a 9-10 Seater Maharaja Tempo Traveller (~₹${startingPerPerson} per seat), ₹${calculateFare(distance, 22)} for a 12-13 Seater AC Traveller, and ₹${calculateFare(distance, 25)} for a 16-17 Seater vehicle for ${distance} km. Base fuel, driver allowance, and GST are included.`,
      },
      {
        q: `Which Tempo Traveller seating size is best for our group from ${startCity} to ${endCity}?`,
        a: `For small family or VIP groups of up to 9 people, the 9-10 seater Maharaja Tempo Traveller with 1x1 recliners is the most luxurious. For 10-13 people, the 12-13 seater is the most popular choice. Larger groups of 14-26 can pick our 16, 20, or 26-seater Force Travellers.`,
      },
      {
        q: `Can our entire group travel with luggage?`,
        a: `Yes, all Chiku Cabs Tempo Travellers feature generous dedicated boot trunk storage space as well as robust waterproof covered roof luggage carriers to carry multiple large suitcases, duffel bags, and ritual puja samagri comfortably.`,
      },
      {
        q: `What is the road distance and travel time from ${startCity} to ${endCity}?`,
        a: `The road distance between ${startCity} and ${endCity} is approximately ${distance} km. The journey typically takes about ${travelHours} hours via the main highway corridor, depending on highway traffic and en-route refreshment stops.`,
      },
      {
        q: `Are highway toll taxes and state border permits included?`,
        a: `The base fare covers the vehicle hire, fuel, driver allowance, and GST. Highway toll charges and inter-state commercial passenger border taxes are payable at actuals at Fastag booths and border checkposts.`,
      },
      {
        q: isGaya
          ? `Can we book a same-day or multi-day Tempo Traveller for Pind Daan rituals in Gaya from ${startCity}?`
          : `Can we make stops for food or sightseeing between ${startCity} and ${endCity}?`,
        a: isGaya
          ? `Yes! We provide specialized same-day and multi-day packages for Pind Daan rituals at Vishnupad Mandir, Phalgu River, and Bodh Gaya. The driver stays with your family until all ceremonies are completed and drops you safely back at ${startCity}.`
          : `Yes, you can request en-route meal, tea, and restroom breaks at hygienic highway restaurants. If you wish to visit specific tourist or pilgrimage spots along the way, simply mention them during booking.`,
      },
      {
        q: `Is doorstep pickup available in ${startCity}?`,
        a: `Yes, 100% doorstep service. The Tempo Traveller will arrive directly at your residence, hotel, airport terminal, or railway junction in ${startCity} and take your group directly to your destination in ${endCity}.`,
      },
      {
        q: `How early should I book a Tempo Traveller from ${startCity}?`,
        a: `We recommend booking at least 2 to 4 days in advance, especially during wedding seasons, long weekends, and auspicious pilgrimage periods to ensure your preferred seating capacity is reserved.`,
      },
      {
        q: `Are music sound systems, TV screens, and USB mobile chargers available on board?`,
        a: `Yes! All our luxury Maharaja and executive Tempo Travellers are equipped with LED TVs, high-fidelity sound systems, and individual mobile fast-charging ports beside each pushback seat for passenger convenience.`,
      },
      {
        q: `Can we book a round-trip or multi-day outstation tour from ${startCity} to ${endCity}?`,
        a: `Yes, we offer both dedicated one-way drops and multi-day round-trip packages with customized itineraries, flexible night stays, and continuous chauffeur service throughout your journey.`,
      },
      {
        q: `Is the Tempo Traveller comfortable and accessible for elderly family members and children?`,
        a: `Yes. Our Tempo Travellers are equipped with easy-access retractable side foot-steps, wide center gangway aisles, and ergonomic pushback recliners, ensuring senior citizens travel safely without fatigue.`,
      },
      {
        q: `What payment methods are supported for Tempo Traveller booking?`,
        a: `You can confirm your booking with a nominal advance token payment via UPI, Google Pay, PhonePe, credit/debit card, or net banking. The remaining balance can be settled directly upon completion of your trip.`,
      },
    ],
    [startCity, endCity, distance, startingFare, startingPerPerson, travelHours, isGaya]
  );

  // Structured Data (JSON-LD)
  const structuredData = useMemo(() => {
    const canonicalUrl = `${SITE_URL}/${citySlug}/tempo-traveller-hire-${citySlug}-to-${endCitySlug}`;

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
          name: "Tempo Traveller on Rent",
          item: `${SITE_URL}/tempo-traveller-on-rent`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${startCity} to ${endCity} Tempo Traveller`,
          item: canonicalUrl,
        },
      ],
    };

    const taxiService = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `Chiku Cabs - ${startCity} to ${endCity} Tempo Traveller Hire`,
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
        price: startingFare,
        priceCurrency: "INR",
        description: `Tempo Traveller hire from ${startCity} to ${endCity} starting @ ₹${startingFare} for ${distance} km (~₹${startingPerPerson}/person)`,
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
  }, [startCity, endCity, citySlug, endCitySlug, distance, startingFare, startingPerPerson, travelHours, routeFaqs]);

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
            HERO SECTION WITH LIVE BOOKING FORM & BG IMAGE
        ====================================================== */}
        <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
          {/* Background Image */}
          <div className="absolute inset-0 -z-30">
            <Image
              src="/tempotraveller.webp"
              alt={`${startCity} to ${endCity} Tempo Traveller on Rent by Chiku Cabs`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 -z-20 bg-black/50" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-white/15 mb-4">
                <FaStar className="text-amber-400" />
                <span>4.9 / 5 Rated (3,450+ Completed Group & Intercity Trips)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                {startCity} to {endCity} Tempo Traveller
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
                Hire premium <strong className="text-white">9 to 26 seater Tempo Travellers</strong> from{" "}
                <strong className="text-white">{startCity}</strong> to{" "}
                <strong className="text-white">{endCity}</strong>. Travel together approx.{" "}
                <span className="font-bold text-primary">{distance} km</span> in about{" "}
                <span className="font-bold text-primary">{travelHours} hours</span> with luxury pushback
                seats, verified commercial drivers, and huge luggage carriers. Rates start at only{" "}
                <strong className="text-white underline decoration-primary decoration-2 underline-offset-4">
                  {formatCurrency(startingFare)}
                </strong>{" "}

              </p>

              {/* Quick Trip Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-xl">
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
                    <FaBus /> Starting Base
                  </div>
                  <div className="text-lg font-black">{formatCurrency(startingFare)}</div>
                  <div className="text-[11px] text-slate-400">9-10 Seater AC</div>
                </div>


              </div>

              {/* Trust Guarantees */}
              <div className="space-y-2 text-sm text-slate-300 mb-8">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Travel together in one vehicle — No need to split into multiple small cabs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Doorstep pickup from any home, hotel, station or airport in {startCity}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Pushback recliner seats, dual AC blowers, music system & heavy luggage carrier</span>
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
                    `Hi Chiku Cabs, I want to book a Tempo Traveller from ${startCity} to ${endCity}. Please share the best group travel fare.`,
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
                    Group Fare Estimator
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Get {startCity} → {endCity} Tempo
                  </h2>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                  9 to 26 Seater
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
                      placeholder={`Hotel / Temple / Station in ${endCity}`}
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

                {/* Seating Capacity Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Seating Capacity
                  </label>
                  <select
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition font-medium"
                  >
                    {TEMPO_FLEET_OPTIONS.map((fleet) => (
                      <option key={fleet.id} value={fleet.id}>
                        {fleet.name} ({fleet.seating}) — ₹{fleet.ratePerKm}/km
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Fare Summary Box */}
                <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">
                      Estimated Route Fare (~{distance} km)
                    </p>
                    <div className="text-2xl font-black text-primary">
                      {formatCurrency(dynamicEstimatedPrice)}
                    </div>

                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800">
                      ₹{selectedVehicle.ratePerKm}/km
                    </span>
                    <p className="text-[11px] text-slate-500">{selectedVehicle.seating}</p>
                    <p className="text-[10px] text-slate-400">Incl. Fuel & Driver</p>
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
            BREADCRUMB & ACCENT BAR
        ====================================================== */}
        <section className="bg-slate-50 border-b border-slate-200 py-3 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-600">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tempo-traveller-on-rent" className="hover:text-primary transition-colors">
                Tempo Traveller on Rent
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-900">
                {startCity} to {endCity} Tempo Traveller
              </span>
            </nav>
            <div className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
              Verified Rates • {CURRENT_UPDATE_DATE}
            </div>
          </div>
        </section>

        {/* =====================================================
            TOTAL FARE BREAKDOWN & SEATING CAPACITY RATE CARD
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Transparent Rate Card
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Tempo Traveller Fare Breakdown
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-7xl mx-auto">
                Explore transparent group travel rates for your {distance} km journey from{" "}
                {startCity} to {endCity}. Compare 9, 12, 16, 20, and 26-seater variants and pick
                the right vehicle for a comfortable, stress-free road trip.
              </p>
            </div>

            {/* Desktop & Tablet Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Tempo Seater & Model</th>
                    <th className="px-4 py-4">Seating & Luggage Capacity</th>
                    <th className="px-4 py-4">Rate / KM</th>
                    <th className="px-4 py-4">Approx. Total Fare</th>

                    <th className="px-4 py-4 text-center">Instant Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TEMPO_FLEET_OPTIONS.map((item) => {
                    const totalFare = calculateFare(distance, item.ratePerKm);
                    const perSeat = Math.round(totalFare / item.capacity);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            {item.popular && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.idealFor}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-slate-800 font-medium">{item.seating}</div>
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
                *Highway Toll taxes and Inter-state passenger permit taxes payable at actual booths
                en route. Driver batta, vehicle hire, fuel & GST included.
              </p>
              <p className="font-semibold text-slate-700">
                Rate card valid as of: {CURRENT_UPDATE_DATE}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            GROUP TRAVEL USE CASES & INTENT SECTION
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Tailored Group Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Ideal For Every Group Occasion: {startCity} to {endCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-5xl mx-auto">
                Whether you are traveling for religious blessings, family celebrations, or corporate
                meetings, our Tempo Travellers keep everyone together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Pilgrimage / Religious Yatra */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl mb-4">
                  🕉️
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {isPilgrimage ? "Spiritual & Pilgrimage Yatras" : "Family Holidays & Road Trips"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isGaya || isBodhGaya
                    ? `Dedicated Tempo service for sacred Pind Daan rituals at Vishnupad Mandir & Bodh Gaya monasteries. Pushback comfort for elders and roof carriers for puja samagri.`
                    : isAyodhya || isVaranasi
                      ? `Comfortable darshan tours with direct drop at temple gates, assistance for elderly devotees, and ample boot space for prasad and ritual items.`
                      : `Enjoy long journeys with family members without feeling cramped. AC pushback recliners make travel relaxing for senior citizens and young kids.`}
                </p>
              </div>

              {/* Card 2: Weddings & Baarat */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-2xl mb-4">
                  💍
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Weddings & Baarat Shuttles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seamlessly transport your wedding guests, baarat party, and relatives between{" "}
                  {startCity} and {endCity}. Multi-day vehicle rentals available with on-call chauffeurs.
                </p>
              </div>

              {/* Card 3: Corporate Offsites */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl mb-4">
                  💼
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Corporate Offsites & Events
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Keep your entire professional team synchronized. Punctual airport and hotel
                  transfers with spacious seating, mobile charging points, and verified drivers.
                </p>
              </div>

              {/* Card 4: Sightseeing & Vacations */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-2xl mb-4">
                  ⛰️
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Outstation Sightseeing Tours
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Customize your highway route with flexible stops at popular dhabas, heritage
                  monuments, and viewpoint rest spots between {startCity} and {endCity}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TEMPO TRAVELLER VS ALTERNATIVES COMPARISON
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Value Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Tempo Traveller vs. 2-3 Individual Cabs vs. Train vs. Bus
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-7xl mx-auto">
                Why renting a single Tempo Traveller from Chiku Cabs is the most economical and
                comfortable option for groups of 8 to 26 people.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Chiku Tempo Traveller</th>
                    <th className="px-5 py-3.5 text-slate-600">Booking 2–3 Cabs</th>
                    <th className="px-5 py-3.5 text-slate-600">Train (IRCTC)</th>
                    <th className="px-5 py-3.5 text-slate-600">Public / Sleeper Bus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Travel Together</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Group Together in 1 Vehicle
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Split into multiple cars</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Scattered seats across coaches</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Shared cabin with strangers</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Doorstep Pickup</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Direct Home/Hotel Pickup & Drop
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Doorstep (hard to coordinate 3 cars)</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must reach railway station</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must board at bus terminal</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Total Group Cost</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Most Economical (~₹{startingPerPerson}/seat)
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ High: 3x base fares & driver fees</td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Moderate if confirmed tickets</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Moderate, but fixed tickets</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Departure Timing</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 24×7 Depart at your exact schedule
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Flexible timing</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Strict timetable & waitlists</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed night timings</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Space</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Dedicated boot & roof carrier
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Cramped boot space in sedans</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heavy platform lifting</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Limited luggage hold</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Highway Rest Stops</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Stop at clean dhabas as per your wish
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Stops possible</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ No unscheduled stops</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Predetermined roadside motels</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            ROUTE DISTANCE, DURATION & HIGHWAY INSIGHTS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Highway Transit
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Route Distance & Travel Details
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Key highway transit milestones, road conditions, and travel advice for group travel.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Total Highway Distance</div>
                <div className="text-3xl font-black text-slate-900 mt-1">{distance} KM</div>
                <p className="text-xs text-slate-600 mt-2">
                  Optimal driving route mapped via major national and state express corridors.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Average Transit Time</div>
                <div className="text-3xl font-black text-slate-900 mt-1">~{travelHours} Hours</div>
                <p className="text-xs text-slate-600 mt-2">
                  Includes city exit transit, smooth 4-to-6 lane cruising, and food refreshment breaks.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
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
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <FaRoute className="text-primary" /> Key Highway Stops between Varanasi & Gaya
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Karmanasa UP-Bihar Border</span>
                    Chauffeur handles all commercial vehicle tax permits smoothly with zero passenger hassle.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Sasaram (Sher Shah Suri Tomb)</span>
                    Popular heritage stop on the GT Road for sightseeing and traditional Indian lunch breaks.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Aurangabad Dhabas</span>
                    Hygienic vegetarian family restaurants with separate washrooms and tea stalls.
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            POPULAR PICKUP & DROP POINTS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
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
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
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
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
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
            INCLUSIONS, EXCLUSIONS & BOOKING TERMS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                100% Honest Billing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Fare Inclusions, Exclusions & Group Travel Terms
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Complete clarity on what is covered in your Tempo Traveller package.
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
                    <span>Complete vehicle rental for {distance} km base journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Fuel charges, vehicle maintenance & driver allowance (Batta)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Air conditioning comfort throughout the travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Goods and Services Tax (GST 5%) included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>Spacious luggage carrier with protective waterproof rain cover</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
                <h3 className="font-bold text-rose-900 text-base mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-rose-600" /> Exclusions & Actuals Payable
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
                    <span>Parking charges at specific temple, monument or airport parking zones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Night driving charge (₹350 if travel is conducted between 10 PM and 6 AM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Additional detour distance beyond itinerary charged at vehicle per-km rate</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block mb-1">Easy Multi-Mode Payment</span>
                Pay booking token and balance easily via UPI (GPay, PhonePe, Paytm), Net Banking, or cash.
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block mb-1">24-Hour Free Cancellation</span>
                Change of itinerary? Cancel up to 24 hours prior to scheduled departure with zero penalty.
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block mb-1">Experienced Highway Drivers</span>
                Police-verified chauffeurs with over 7+ years of long-distance tourist group experience.
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CUSTOMER REVIEWS & TESTIMONIALS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Real Traveler Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                What Groups Say About Our {startCity} to {endCity} Service
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sunil Sharma & Family",
                  type: "Family Pilgrimage Tour",
                  text: `We booked a 12-seater Tempo Traveller from ${startCity} to ${endCity}. The vehicle was super clean, AC was chilling, and the driver drove very safely on the highway. My elderly parents were very comfortable throughout the journey.`,
                  rating: "★★★★★",
                },
                {
                  name: "Pooja Deshmukh",
                  type: "Wedding Guest Transfer",
                  text: `Hired a 20-seater for our wedding guests. Chiku Cabs coordinated everything punctually. The rooftop luggage carrier took all the heavy bags with ease. Outstanding service!`,
                  rating: "★★★★★",
                },
                {
                  name: "Rajesh Mathur",
                  type: "Corporate Team Outing",
                  text: `Used the 16-seater Maharaja Tempo for our annual team offsite. Pushback seats, good music system, and completely transparent pricing without hidden surprises. Highly recommend Chiku Cabs.`,
                  rating: "★★★★★",
                },
              ].map((rev, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-amber-400 text-sm mb-2">{rev.rating}</div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-4">
                    "{rev.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                    <span className="text-[11px] text-slate-400">{rev.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            NEARBY TEMPO TRAVELLER ROUTES
        ====================================================== */}
        {nearbyRoutes.length > 0 && (
          <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-7xl mx-auto mb-10">
                <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Explore More
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                  Nearby Tempo Traveller Routes from {startCity}
                </h2>
                <p className="text-slate-600 text-sm mt-2">
                  Plan your next group destination with transparent per-km rates.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {nearbyRoutes.map((route) => (
                  <Link
                    key={route.slug}
                    href={route.slug}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-primary hover:shadow transition group"
                  >
                    <div className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{getAnchorText(route.slug)}</span>
                      <FaArrowRight className="text-[10px] text-slate-400 group-hover:text-primary transition" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Tempo Traveller Hire</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
                {startCity} to {endCity} Tempo Traveller Booking FAQs
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Direct answers to common questions about seating capacities, luggage, and fares.
              </p>
            </div>

            <div className="space-y-3.5 max-w-4xl mx-auto">
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
            BOTTOM CTA SECTION
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Instant Confirmation
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                Book Your {startCity} to {endCity} Tempo Traveller Today
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Speak directly with our group travel coordinators for custom itineraries and transparent quotes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3 font-bold text-sm text-white hover:scale-105 transition shadow-lg"
              >
                <FaPhoneAlt /> Call {DISPLAY_PHONE}
              </a>
              <a
                href={buildWhatsAppUrl(
                  `Hi Chiku Cabs, I would like to book a Tempo Traveller from ${startCity} to ${endCity}. Please share the best fare.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-sm text-white hover:scale-105 transition shadow-lg"
              >
                <FaWhatsapp className="text-lg" /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTERNAL LINKS & SHARED EEAT SECTION
        ====================================================== */}
        <InternalLinks parsedData={parsedData} />
        <EEATSection city={startCity} vehicle="Tempo Traveller" />
      </div>
    </>
  );
}
