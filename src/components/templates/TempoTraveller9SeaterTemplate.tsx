"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { CiClock1 } from "react-icons/ci";
import routeData from "@/data/routeData.json";
import {
  FaCarSide,
  FaCheckCircle,
  FaUsers,
  FaSuitcase,
  FaSnowflake,
  FaShieldAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import Head from "next/head";
import Script from "next/script";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/* CONFIG - confirm every value marked TODO before publishing          */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://chikucabs.com";
const SITE_NAME = "Chiku Cabs";
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";
const PROMO_CODE = "CHIKUCABS10";

// TODO: confirm the real 9 seater rate. 20 is the 12 seater rate, copied
// here as a placeholder - a 9 seater is usually priced differently.
const PRICE_PER_KM = 20;

// These match the 12 seater template; confirm they apply to the 9 seater.
const DRIVER_CHARGE = 500;
const MIN_KM_PER_DAY = 250;
const NIGHT_ALLOWANCE = "₹400–₹500";

// TODO: only keep rating markup if it reflects real, verifiable reviews.
const RATING_VALUE = "4.9";
const REVIEW_COUNT = "1250";

const SEATER = 9;
const VEHICLE_LABEL = "9 Seater Tempo Traveller";

const CITY_ALIASES: Record<string, string> = {
  bengaluru: "bangalore",
  banglore: "bangalore",
  hydrabad: "hyderabad",
  chennie: "chennai",
};

const STATS = [
  // TODO: verify each of these figures before publishing.
  { num: "800+", label: "Monthly Group Trips" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
  { num: "24/7", label: "Booking Support" },
];

const STEPS = [
  {
    step: "01",
    title: `Choose ${SEATER} Seater`,
    desc: `Select the ${VEHICLE_LABEL} for your mid-size group.`,
  },
  {
    step: "02",
    title: "Confirm Booking",
    desc: "Share pickup location, date, time and trip details.",
  },
  {
    step: "03",
    title: "Enjoy Journey",
    desc: "A professional driver arrives on time for a smooth trip.",
  },
];

const FEATURES = [
  {
    icon: FaUsers,
    title: "Comfortable Seating",
    description:
      "Seating for up to 9 passengers so a mid-size group can travel together in comfort.",
  },
  {
    icon: FaSnowflake,
    title: "Air-Conditioned Cabin",
    description:
      "An air-conditioned cabin helps keep the whole group comfortable on longer drives.",
  },
  {
    icon: FaSuitcase,
    title: "Room for Luggage",
    description:
      "Dedicated luggage space for your group, with rooftop carrier options for bulkier trips.",
  },
  {
    icon: FaShieldAlt,
    title: "Experienced Chauffeurs",
    description:
      "Travel with a professional driver familiar with local and outstation routes.",
  },
  {
    icon: FaCheckCircle,
    title: "Group-Friendly Cabin",
    description:
      "One vehicle for family outings, friends' trips, events and short tours.",
  },
  {
    icon: FaCarSide,
    title: "Right-Sized for Mid-Size Groups",
    description:
      "Too many for an SUV, fewer than a full 12 seater - a good fit for groups of up to 9.",
  },
];

const TIME_OPTIONS: string[] = (() => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      times.push(`${displayHour}:${String(min).padStart(2, "0")} ${period}`);
    }
  }
  return times;
})();

const toTitleCase = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function TempoTraveller9SeaterTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const pathname = usePathname();

  /* ----------------------------- city ----------------------------- */

  const { city, cityName, citySlug } = useMemo(() => {
    const rawCity = parsedData.origin || "India";
    const rawName = rawCity !== "India" ? rawCity : "";
    const rawSlug = rawName.toLowerCase().trim().replace(/\s+/g, "-");
    const slug = CITY_ALIASES[rawSlug] ?? rawSlug;
    const name = CITY_ALIASES[rawSlug] ? toTitleCase(slug) : rawName;
    return { city: name || "India", cityName: name, citySlug: slug };
  }, [parsedData.origin]);

  const inCity = cityName ? ` in ${cityName}` : "";
  const pagePath = `/${SEATER}-seater-tempo-traveller${citySlug ? `-in-${citySlug}` : ""}`;
  const twelveSeaterPath = `/12-seater-tempo-traveller${citySlug ? `-in-${citySlug}` : ""}`;

  const pageTitle = `${VEHICLE_LABEL} on Rent${inCity} @ ₹${PRICE_PER_KM}/km – ${SITE_NAME}`;
  const pageDescription = cityName
    ? `Book ${VEHICLE_LABEL} in ${cityName} at ₹${PRICE_PER_KM}/km with ${SITE_NAME}. Comfortable seating for up to 9, AC cabin and experienced drivers for outstation, local tours & events. Call ${PHONE_NUMBER}.`
    : `Book ${VEHICLE_LABEL} on rent across India at ₹${PRICE_PER_KM}/km. Comfortable seating for up to 9, AC cabin and experienced drivers. Call ${PHONE_NUMBER}.`;

  const vehicleDescription = `Travel comfortably with our ${VEHICLE_LABEL} rental service in ${city}, ideal for groups of up to 9 passengers. Enjoy an air-conditioned cabin, comfortable seating and dedicated luggage space.`;

  /* ---------------------------- state ----------------------------- */

  const [distance, setDistance] = useState("50");
  const [isScrolled, setIsScrolled] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // One formula for slider AND preset buttons (they used to disagree).
  const estimatedPrice = useMemo(() => {
    const km = parseFloat(distance);
    if (isNaN(km) || km <= 0) return null;
    return Math.round(km * PRICE_PER_KM + DRIVER_CHARGE);
  }, [distance]);

  /* ----------------------------- FAQs ----------------------------- */

  const TEMPO_FAQS = useMemo(
    () => [
      {
        q: `What is the per-km rate for a ${VEHICLE_LABEL} in ${city}?`,
        a: `The ${VEHICLE_LABEL} outstation rate starts at ₹${PRICE_PER_KM}/km with a standard ${MIN_KM_PER_DAY} km daily billing minimum. Local packages are also available - share your hours and kilometres to get a quote.`,
      },
      {
        q: `How many passengers can a ${VEHICLE_LABEL} carry?`,
        a: `It is designed for up to ${SEATER} passengers. Share your final headcount when enquiring so the team can confirm the seating suits your group.`,
      },
      {
        q: `Should I choose a 9 seater or a 12 seater Tempo Traveller?`,
        a: `Choose the 9 seater for groups of up to 9 with comfortable room for luggage. If your group is larger, or may grow, a 12 seater is the safer choice. Tell us your headcount and bags and we will suggest the right size.`,
      },
      {
        q: `How much luggage can a ${VEHICLE_LABEL} accommodate?`,
        a: `Capacity depends on the number and size of bags. Mention suitcases, strollers or bulky items when enquiring so luggage arrangements, including a rooftop carrier where suitable, can be confirmed before travel.`,
      },
      {
        q: `Can a ${VEHICLE_LABEL} be used for hill stations and mountain routes?`,
        a: `Our drivers handle both highway and hill-route trips. Share your full route when enquiring so the team can confirm the vehicle is suitable for it.`,
      },
      {
        q: `Are toll taxes, driver allowance and state border permits included?`,
        a: `The per-km rate covers vehicle hire, fuel and chauffeur. Highway tolls, inter-state entry taxes and parking are payable as per actual receipts. A night driver allowance (${NIGHT_ALLOWANCE}) applies if travel extends beyond 10:00 PM.`,
      },
      {
        q: `How do I book a ${VEHICLE_LABEL} in ${city}?`,
        a: `Call ${PHONE_NUMBER} or message our WhatsApp desk at ${WHATSAPP_NUMBER}. Share your pickup, drop, date and group size and we will confirm availability and your quote.`,
      },
      {
        q: `Can I hire a ${VEHICLE_LABEL} for local sightseeing or airport transfers?`,
        a: `Yes. Enquire for local sightseeing, airport transfers, family functions and outstation trips. Share your itinerary and travel date so the team can check availability and give a trip-specific quote.`,
      },
      {
        q: `Can I book a round trip or multi-day outstation trip?`,
        a: `Yes. One-way, round-trip and multi-day trips are available. List every destination, overnight halt and return date in your request so the quote reflects the full itinerary.`,
      },
      {
        q: `What details should I share to get a ${VEHICLE_LABEL} quote?`,
        a: `Share your pickup location, destination or route, travel date and time, trip duration, passenger count and luggage. These help the team check availability and calculate the applicable fare.`,
      },
      {
        q: `How early should I book a ${VEHICLE_LABEL}?`,
        a: `Enquire as early as possible, especially for weekends, holidays and wedding dates. Availability depends on your pickup city and schedule, so contact the booking team to check your preferred dates.`,
      },
    ],
    [city]
  );

  /* -------------------------- structured data ---------------------- */

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${VEHICLE_LABEL} on Rent${inCity}`,
      description: `Hire ${VEHICLE_LABEL} on rent in ${city}. Comfortable seating for up to 9 passengers, air-conditioned cabin and luggage space. Suited to family trips, group travel, events and outstation journeys.`,
      brand: { "@type": "Brand", name: SITE_NAME },
      image: `${SITE_URL}/tempo_traveller.png`,
      category: "Ground Transportation",
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: String(PRICE_PER_KM),
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${pagePath}`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(PRICE_PER_KM),
          priceCurrency: "INR",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "KMT",
          },
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: RATING_VALUE,
        reviewCount: REVIEW_COUNT,
        bestRating: "5",
        worstRating: "1",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Seating Capacity",
          value: `${SEATER} Passengers`,
        },
        { "@type": "PropertyValue", name: "AC", value: "Air-conditioned" },
      ],
      areaServed: {
        "@type": "City",
        name: city !== "India" ? city : "All Major Cities in India",
      },
      serviceType: `${VEHICLE_LABEL} Rental`,
      url: `${SITE_URL}${pagePath}`,
    }),
    [city, inCity, pagePath]
  );

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: `${SITE_URL}/yt.png`,
    telephone: PHONE_NUMBER,
    address: {
      "@type": "PostalAddress",
      addressLocality: city !== "India" ? city : "Delhi",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE,
      reviewCount: REVIEW_COUNT,
    },
    priceRange: `₹${PRICE_PER_KM} per km`,
  };

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: TEMPO_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    }),
    [TEMPO_FAQS]
  );

  /* ------------------------- related seater pages ------------------ */

  const filteredRelatedRoutes = useMemo(() => {
    if (!citySlug) return [];

    const slugPattern = citySlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const seaterRoutePattern = new RegExp(
      `^/(\\d+)-seater-tempo-traveller-(?:in|on-rent-in|for-rent-in)-${slugPattern}$`,
      "i"
    );
    const fareRoutePattern = new RegExp(
      `^/tempo-traveller-fare-in-${slugPattern}$`,
      "i"
    );
    const rentalRoutePattern = new RegExp(
      `^/tempo-traveller-(?:on-rent-in-|for-rent-in-|in-)${slugPattern}$`,
      "i"
    );
    const currentPath = (pathname ?? "").replace(/\/$/, "");

    return (routeData as { url: string }[])
      .map((item) => {
        const seaterMatch = item.url.match(seaterRoutePattern);
        const isFareRoute = fareRoutePattern.test(item.url);
        const isRentalRoute = rentalRoutePattern.test(item.url);
        if (!seaterMatch && !isFareRoute && !isRentalRoute) return null;

        const seater = seaterMatch ? Number(seaterMatch[1]) : 0;
        return {
          url: item.url,
          title: seaterMatch
            ? `${seater} Seater Tempo Traveller in ${city}`
            : isFareRoute
              ? `Tempo Traveller Fare in ${city}`
              : `Tempo Traveller on Rent in ${city}`,
          seater,
        };
      })
      .filter(
        (r): r is { url: string; title: string; seater: number } => r !== null
      )
      .filter((r) => r.url.replace(/\/$/, "") !== currentPath)
      .sort((a, b) => {
        if (a.seater === 0) return 1;
        if (b.seater === 0) return -1;
        return a.seater - b.seater;
      });
  }, [city, citySlug, pathname]);

  /* ----------------------------- form ------------------------------ */

  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation || !dropLocation || !travelDate || !travelTime) {
      toast.error("Please fill all fields");
      return;
    }
    if (tripType === "round-trip" && !returnDate) {
      toast.error("Please select return date");
      return;
    }

    const message = `🚖 *${VEHICLE_LABEL} Estimate Request*

🚕 *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}
🛣️ *Route:* ${pickupLocation} → ${dropLocation}
📅 *Travel Date:* ${travelDate}
⏰ *Travel Time:* ${travelTime}
${tripType === "round-trip" ? `🔄 *Return Date:* ${returnDate}\n` : ""}
🚐 *Vehicle:* ${VEHICLE_LABEL} (${city})

Please share the best quote.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setPickupLocation("");
    setDropLocation("");
    setTravelDate("");
    setTravelTime("");
    setReturnDate("");
    setTripType("one-way");
  };

  const inputClass =
    "w-full h-13 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300";

  /* ----------------------------- render ---------------------------- */

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${SITE_URL}/tempo_traveller.png`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${SITE_URL}${pagePath}`} />
      </Head>

      <Script
        id="structured-data-9seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="organization-data-9seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="faq-data-9seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-background min-h-screen">
        {/* Sticky CTA Bar */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
            isScrolled ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="bg-gray-900 text-white shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-xl">🎁</span>
                    <span className="font-bold">Use Code:</span>
                    <code className="bg-gray-800 px-3 py-1 rounded font-mono text-yellow-400">
                      {PROMO_CODE}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(PROMO_CODE);
                        toast.success("Promo code copied!");
                      }}
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-sm opacity-90">
                    to get{" "}
                    <span className="font-bold text-yellow-400">10% OFF</span>
                  </div>
                </div>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                >
                  📞 Book {SEATER} Seater
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/tempotraveller.webp"
              alt="16 Seater Tempo Traveller"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm">
                    {RATING_VALUE} Rating • {REVIEW_COUNT}+ Reviews
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  {SEATER} Seater Tempo Traveller on Rent
                  {cityName && (
                    <>
                      {" "}in <span className="text-primary">{cityName}</span>
                    </>
                  )}
                  <span className="block text-primary text-2xl md:text-4xl mt-2">
                    Starting at ₹{PRICE_PER_KM}/km
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vehicleDescription}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    📞 Book Now
                  </a>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hi ${SITE_NAME}, I want to book a ${VEHICLE_LABEL} in ${city}. Please share details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">From ₹{PRICE_PER_KM}/km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      <CiClock1 />
                    </span>
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      <FaCarSide />
                    </span>
                    <span className="text-sm">Clean &amp; Well-Maintained</span>
                  </div>
                </div>
              </div>

              {/* Booking Widget */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Book {SEATER} Seater Tempo
                  </h3>
                  <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full">
                    ₹{PRICE_PER_KM}/km
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">
                  Quick quote on WhatsApp &amp; verified driver details
                </p>

                <form className="space-y-4" onSubmit={handleGetEstimate}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg">
                      📍
                    </span>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter Pickup Location"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg">
                      🎯
                    </span>
                    <input
                      type="text"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      placeholder="Enter Drop Location"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {(["one-way", "round-trip"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTripType(type)}
                        className={`py-2.5 rounded-xl font-semibold transition-all ${
                          tripType === type
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type === "one-way" ? "One Way" : "Round Trip"}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                        📅
                      </span>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                        ⏰
                      </span>
                      <select
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                        className={inputClass}
                        required
                      >
                        <option value="">Select Time</option>
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {tripType === "round-trip" && (
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                        🔄
                      </span>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={travelDate || undefined}
                        aria-label="Return date"
                        className={inputClass}
                        required
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="group w-full h-14 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get {SEATER} Seater Fare Quote
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                    <span>✓ ₹{PRICE_PER_KM}/km Base</span>
                    <span>•</span>
                    <span>✓ Transparent Quotes</span>
                    <span>•</span>
                    <span>✓ 24×7 Support</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pt-12 pb-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stat.num}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto">FEATURES &amp; COMFORT</div>
              <h2 className="section-title">
                Travel Together in a {SEATER} Seater Tempo Traveller
              </h2>
              <p className="section-subtitle mx-auto">
                A practical choice for mid-size groups who want to share one
                vehicle without paying for a full 12 seater.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9 vs 12 seater guide */}
        <section className="py-16 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="section-badge mx-auto">BEFORE YOU BOOK</span>
              <h2 className="section-title mt-4">
                9 Seater or 12 Seater Tempo Traveller in {city}?
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                The right size depends on your headcount, luggage and
                itinerary. Check these three points before confirming your
                Tempo Traveller booking in {city}.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Count passengers honestly",
                  description:
                    "The 9 seater is built for up to 9 passengers. If your group may grow or you are close to the limit, a 12 seater avoids a last-minute change.",
                },
                {
                  title: "Plan for luggage",
                  description:
                    "Mention suitcases, strollers or bulky items when enquiring. Heavy-luggage trips may need a rooftop carrier or a larger vehicle.",
                },
                {
                  title: "Check pickup and drop-off access",
                  description:
                    "Share exact pickup points and any narrow lanes or parking limits on your route so a suitable boarding point can be planned.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-slate-700">
              Travelling with more than 9 people?{" "}
              <Link
                href={twelveSeaterPath}
                className="font-semibold text-primary underline underline-offset-4"
              >
                See the 12 Seater Tempo Traveller{inCity}
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-12 px-4 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="section-badge mx-auto">
                POPULAR USE CASES &amp; COVERAGE
              </span>
              <h2 className="section-title mt-4">
                {SEATER} Seater Tempo Traveller Hire in {city}
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                Hiring a {SEATER} seater Tempo Traveller in {city} lets a
                mid-size group travel together with one pickup plan and a
                shared itinerary. Choose the trip type first, then share your
                route and schedule to check availability and get a quote.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Local sightseeing and airport transfers",
                  description:
                    "Plan pickup and drop-off points in advance, especially with several stops or flight timings. Share the locations and requested hours when enquiring.",
                },
                {
                  title: "Outstation, weekend and pilgrimage trips",
                  description:
                    "For a multi-day itinerary, include every destination, overnight halt and return date so the team can prepare a trip-specific estimate.",
                },
                {
                  title: "Family functions, friends' trips and small events",
                  description:
                    "One shared vehicle can simplify transport between hotels, venues and pickup points. Confirm passenger numbers and timings before booking.",
                },
              ].map((trip) => (
                <article
                  key={trip.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {trip.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {trip.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                What to share when requesting a {SEATER} seater quote
              </h3>
              <p className="text-slate-700 leading-7">
                Provide your pickup location in {city}, destination or full
                route, travel dates, pickup time, trip duration, passenger
                count and approximate luggage. For outstation journeys, say
                whether the trip is one-way or round-trip and list planned
                overnight stops. The final fare depends on your confirmed
                itinerary, so review the quote before booking.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Pickup and drop-off points in {city}
              </h3>
              <p className="text-slate-700 leading-7">
                Pickup can be requested from airports, railway or bus stations,
                hotels, homes, offices and event venues. Share the exact address
                and preferred time when enquiring, and the team will confirm
                serviceability and a suitable boarding point for your route.
              </p>
            </div>
          </div>
        </section>

        {/* Fare Calculator */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="section-badge mx-auto">
                {SEATER} SEATER CALCULATOR
              </div>
              <h2 className="section-title">Estimate {SEATER} Seater Fare</h2>
              <p className="text-muted-foreground">
                Base rate calculated at ₹{PRICE_PER_KM}/km + driver allowance
              </p>
            </div>

            <div className="premium-card">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label
                      htmlFor="distance-range"
                      className="text-sm font-bold"
                    >
                      Distance (in km)
                    </label>
                    <span className="text-2xl font-black text-primary">
                      {distance || 0} km
                    </span>
                  </div>

                  <input
                    id="distance-range"
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />

                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0 km</span>
                    <span>500 km</span>
                    <span>1000 km</span>
                    <span>1500 km</span>
                    <span>2000 km</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-6">
                    {[50, 100, 250, 500, 750, 1000].map((dist) => (
                      <button
                        key={dist}
                        type="button"
                        onClick={() => setDistance(String(dist))}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          Number(distance) === dist
                            ? "bg-primary text-white"
                            : "bg-muted hover:bg-primary/20"
                        }`}
                      >
                        {dist} km
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                  <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                    ESTIMATED {SEATER} SEATER FARE
                  </p>
                  <div className="text-5xl md:text-6xl font-black text-primary">
                    {estimatedPrice
                      ? `₹${estimatedPrice.toLocaleString("en-IN")}`
                      : "---"}
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-primary/10 px-4 py-1.5 rounded-full">
                      <p className="text-xs font-bold text-primary tracking-wide">
                        * RATE: ₹{PRICE_PER_KM}/KM
                      </p>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-6 pt-3 border-t border-border">
                    *Estimate only. Tolls, parking, state taxes and night
                    allowance are extra where applicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fare Transparency */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="section-badge mx-auto">
                TRANSPARENCY &amp; TRUST
              </span>
              <h2 className="section-title mt-4">
                Understand Your {SEATER} Seater Tempo Traveller Quote
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                The fare calculator is an estimate. Ask for a trip-specific,
                itemized quote based on your confirmed route and schedule
                before you book.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Starting rate and daily minimum",
                  description: `The listed outstation rate starts at ₹${PRICE_PER_KM}/km, with a standard ${MIN_KM_PER_DAY} km daily billing minimum.`,
                },
                {
                  title: "Review route-based charges",
                  description: `The per-kilometre fare covers vehicle hire, fuel and chauffeur. Highway tolls, inter-state entry taxes and parking are payable as per actual receipts. A ${NIGHT_ALLOWANCE} night driver allowance applies if travel extends past 10:00 PM.`,
                },
                {
                  title: "Confirm the trip details",
                  description:
                    "Have the route, travel dates, daily distance, overnight stops and applicable extras listed in your quote so you understand the estimated total before confirming.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related seater / fare pages for this city */}
        {filteredRelatedRoutes.length > 0 && (
          <section className="py-12 bg-white/95 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Tempo Traveller Options in {city}
                </h2>
                <p className="mt-2 text-sm md:text-base text-slate-600">
                  Explore other Tempo Traveller seating options and booking
                  pages for {city}.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRelatedRoutes.map((route) => (
                  <li key={route.url}>
                    <Link
                      href={route.url}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-primary">
                        {route.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-3 text-lg text-primary"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Steps */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-badge mx-auto">EASY 3 STEPS</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
                How to Book a {SEATER} Seater Tempo Traveller
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Matrix */}
        <section className="py-12 px-4 bg-white/95 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-badge mx-auto">
                SMART GROUP TRAVEL COMPARISON
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
                {SEATER} Seater Tempo Traveller vs 2 Separate Cabs
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase">
                    <th className="p-4 font-semibold">Parameter</th>
                    <th className="p-4 font-bold text-amber-400 bg-slate-800">
                      {SEATER} Seater Tempo Traveller
                    </th>
                    <th className="p-4 font-medium text-slate-300">
                      2 Separate Cabs (SUV / MUV)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaUsers className="text-primary" /> Travel Together
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Whole group in one vehicle
                    </td>
                    <td className="p-4 text-slate-600">
                      Group split across two cars
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary" /> Tolls &amp;
                      Allowances
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      One toll payment, one driver allowance
                    </td>
                    <td className="p-4 text-slate-600">
                      Two toll payments, two driver allowances
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary" /> Luggage
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Shared luggage space, rooftop carrier option
                    </td>
                    <td className="p-4 text-slate-600">
                      Luggage split between two boots
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaCarSide className="text-primary" /> Coordination
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      One pickup, one itinerary
                    </td>
                    <td className="p-4 text-slate-600">
                      Two vehicles to coordinate on the road
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-muted/30 py-20 border-y px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto">FAQ</div>
              <h2 className="section-title">
                {SEATER} Seater Tempo Traveller Rental FAQs{" "}
                {city !== "India" ? `in ${city}` : "Across India"}
              </h2>
            </div>

            {TEMPO_FAQS.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>
                  {faq.q}
                  <span className="faq-chevron">▼</span>
                </summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Reserve Your {SEATER} Seater Tempo Traveller Today
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call our reservations desk for a quick quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="btn-primary text-lg px-10 py-4 shadow-2xl"
              >
                📞 Call {PHONE_NUMBER.replace("+91", "")}
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi ${SITE_NAME}, I want to book a ${VEHICLE_LABEL} in ${city}. Please share best quote.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <EEATSection
          city={city !== "India" ? city : undefined}
          vehicle={VEHICLE_LABEL}
        />
      </div>
    </>
  );
}