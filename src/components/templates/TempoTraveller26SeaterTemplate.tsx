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
/* CONFIG                                                             */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://chikucabs.com";
const SITE_NAME = "Chiku Cabs";
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";
const PROMO_CODE = "CHIKUCABS10";

const PRICE_PER_KM = 32;
const DRIVER_CHARGE = 600;
const MIN_KM_PER_DAY = 250;
const NIGHT_ALLOWANCE = "₹500–₹600";

const RATING_VALUE = "4.9";
const REVIEW_COUNT = "1420";

const SEATER = 26;
const VEHICLE_LABEL = "26 Seater Tempo Traveller";

const CITY_ALIASES: Record<string, string> = {
  bengaluru: "bangalore",
  banglore: "bangalore",
  hydrabad: "hyderabad",
  chennie: "chennai",
};

const STATS = [
  { num: "1200+", label: "Large Group Trips" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Commercial Drivers" },
  { num: "24/7", label: "Dispatch Desk" },
];

const STEPS = [
  {
    step: "01",
    title: `Choose ${SEATER} Seater`,
    desc: `Select the spacious ${VEHICLE_LABEL} for large group journeys.`,
  },
  {
    step: "02",
    title: "Confirm Itinerary",
    desc: "Share pickup points, travel dates, destinations, and headcount.",
  },
  {
    step: "03",
    title: "Travel in Comfort",
    desc: "A verified highway chauffeur arrives on schedule with a sanitized vehicle.",
  },
];

const FEATURES = [
  {
    icon: FaUsers,
    title: "Spacious Seating",
    description:
      "Comfortable 2x2 seating layout for up to 26 passengers so large groups travel together effortlessly.",
  },
  {
    icon: FaSnowflake,
    title: "High-Capacity Dual AC",
    description:
      "Powerful dual-blower climate control keeping every row evenly cooled during long summer drives.",
  },
  {
    icon: FaSuitcase,
    title: "Ample Luggage Storage",
    description:
      "Deep rear trunk capacity plus heavy-duty rooftop luggage carrier for large suitcases and event gear.",
  },
  {
    icon: FaShieldAlt,
    title: "Senior Highway Chauffeurs",
    description:
      "Police-vetted commercial drivers experienced with heavy-chassis vehicles on expressways and hills.",
  },
  {
    icon: FaCheckCircle,
    title: "Ideal for Events & Weddings",
    description:
      "One single vehicle replaces multiple cars for baraat transfers, pilgrimage tours, and corporate outings.",
  },
  {
    icon: FaCarSide,
    title: "Smooth Long-Distance Ride",
    description:
      "Air-suspension equipped chassis ensuring vibration-free highway cruising and passenger comfort.",
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

export default function TempoTraveller26SeaterTemplate({
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
    ? `Book ${VEHICLE_LABEL} in ${cityName} at ₹${PRICE_PER_KM}/km with ${SITE_NAME}. Comfortable seating for up to 26, dual AC, large luggage space & experienced drivers for weddings, corporate & tours. Call ${PHONE_NUMBER}.`
    : `Book ${VEHICLE_LABEL} on rent across India at ₹${PRICE_PER_KM}/km. Spacious seating for up to 26, dual AC, and expert drivers. Call ${PHONE_NUMBER}.`;

  const vehicleDescription = `Travel together with our ${VEHICLE_LABEL} rental service in ${city}, tailored for groups of up to 26 passengers. Enjoy pushback seats, dual-blower air conditioning, and massive luggage space.`;

  /* ---------------------------- state ----------------------------- */

  const [distance, setDistance] = useState("100");
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
        a: `The ${VEHICLE_LABEL} outstation tariff starts at ₹${PRICE_PER_KM}/km with a standard ${MIN_KM_PER_DAY} km daily minimum billing. For local 8hr/80km or 12hr/120km packages, please contact our desk for an exact quote.`,
      },
      {
        q: `How many passengers can a ${VEHICLE_LABEL} comfortably seat?`,
        a: `It accommodates up to ${SEATER} passengers plus a separate driver and co-driver seat. The 2x2 seating layout provides dedicated aisle space and comfortable legroom.`,
      },
      {
        q: `Is a 26 seater Tempo Traveller suitable for weddings and family events?`,
        a: `Yes. It is one of our most popular choices for wedding guest transfers, baraat caravans, and corporate outings because it eliminates the logistics of managing 4–5 separate cabs.`,
      },
      {
        q: `How much luggage can a ${VEHICLE_LABEL} carry?`,
        a: `It features a dedicated rear luggage compartment along with a heavy-duty rooftop carrier, easily holding 20–25 medium-to-large suitcases along with hand bags.`,
      },
      {
        q: `Can a 26 seater Tempo Traveller be driven on mountain routes and hill stations?`,
        a: `Yes, our heavy-chassis commercial vehicles are driven by certified senior chauffeurs familiar with hill routes like Shimla, Manali, Mussoorie, and Nainital.`,
      },
      {
        q: `Are highway toll taxes, parking, and state entry permits included in the per-km rate?`,
        a: `The base per-km rate covers the vehicle hire, fuel, and chauffeur services. State border entry taxes, commercial tolls, and parking fees are payable as per actual FASTag and receipts. A night allowance (${NIGHT_ALLOWANCE}) applies after 10:00 PM.`,
      },
      {
        q: `How do I book a ${VEHICLE_LABEL} in ${city}?`,
        a: `Call ${PHONE_NUMBER} or reach our reservation desk on WhatsApp at ${WHATSAPP_NUMBER}. Share your pickup point, route, travel dates, and group size to receive a confirmed booking voucher.`,
      },
      {
        q: `Can I hire a ${VEHICLE_LABEL} for local sightseeing or airport transfers in ${city}?`,
        a: `Yes. We provide fixed-rate local rental packages (8 Hours / 80 Km and 12 Hours / 120 Km) as well as group airport transfers to both domestic and international terminals.`,
      },
      {
        q: `Can I book a multi-day interstate round trip?`,
        a: `Yes. Multi-day outstation itineraries across northern, western, and central India are supported. Share your day-by-day plan so we can provide an all-inclusive estimate.`,
      },
      {
        q: `How early should I reserve a ${VEHICLE_LABEL}?`,
        a: `Because 26 seater vehicles are in high demand during wedding dates, festival weeks, and school vacation seasons, we recommend booking at least 5 to 7 days in advance.`,
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
      description: `Hire ${VEHICLE_LABEL} on rent in ${city}. Spacious seating for up to 26 passengers, dual air-conditioned cabin and large luggage carrier. Perfect for weddings, corporate groups, and outstation tours.`,
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
        { "@type": "PropertyValue", name: "AC", value: "Dual Air-Conditioned" },
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
💰 *Base Tariff:* ₹${PRICE_PER_KM}/km

Please share the best quote with driver allowance details.`;

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
        id="structured-data-26seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="organization-data-26seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="faq-data-26seater"
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
                    {RATING_VALUE} Rating • {REVIEW_COUNT}+ Large Group Trips
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
                      `Hi ${SITE_NAME}, I want to book a ${VEHICLE_LABEL} in ${city} at ₹${PRICE_PER_KM}/km. Please share quote and availability.`
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
                    <span className="text-sm">Clean &amp; Spacious Fleet</span>
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
                The ultimate transport solution for large families, wedding parties, student trips, and corporate offsites.
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

        {/* Seater Comparison Guide */}
        <section className="py-16 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="section-badge mx-auto">BEFORE YOU BOOK</span>
              <h2 className="section-title mt-4">
                Planning for a {SEATER} Seater Tempo Traveller in {city}?
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                Ensure your large group journey goes smoothly by verifying these key points before finalizing your reservation in {city}.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Headcount & Seating Comfort",
                  description:
                    "The 26 seater comfortably seats up to 26 guests with dedicated seats and high-back headrests, avoiding overcrowded private vehicles.",
                },
                {
                  title: "Large Event Luggage",
                  description:
                    "Travelling with wedding gifts or heavy trekking bags? Make use of the rear luggage compartment and top luggage carrier.",
                },
                {
                  title: "Access & Route Approvals",
                  description:
                    "Heavy-chassis vehicles require adequate turning radius. Confirm wide lane access or central pickup points for smooth boarding.",
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
              Need a smaller option for 10–12 passengers?{" "}
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
                Hiring a {SEATER} seater Tempo Traveller in {city} ensures everyone travels together with one unified schedule, coordinated refreshment stops, and simplified toll payments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Weddings, Baraats & Celebrations",
                  description:
                    "Move entire extended families, bridesmaids, and baraat guests between venues, banquet halls, and hotels without coordinating multiple cabs.",
                },
                {
                  title: "Pilgrimage & Sacred Yatra Tours",
                  description:
                    "Ideal for multi-day pilgrimage groups visiting sacred circuits, Char Dham shrines, and temple tours with senior citizens.",
                },
                {
                  title: "Corporate Conferences & Team Offsites",
                  description:
                    "Comfortable highway transit for corporate staff outings, leadership retreats, and airport shuttle services for delegators.",
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
                Provide your pickup address in {city}, complete destination itinerary, travel dates, scheduled pickup times, passenger count, and estimated luggage. For multi-day outstation tours, indicate all night halts so our team can provide a clear, all-inclusive quote.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Pickup and boarding points in {city}
              </h3>
              <p className="text-slate-700 leading-7">
                Doorstep pickup is available from all major sectors, apartment societies, transit hubs, railway terminals, and airports across {city}. Share your exact pickup location to verify wide-chassis road access.
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
                    {[100, 250, 500, 750, 1000, 1500].map((dist) => (
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
                    *Estimate only. Tolls, parking, inter-state road taxes, and night
                    allowance are extra as per actual receipts.
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
                Transparent commercial tariffs with zero hidden surges. Here is how your {SEATER} seater rental is computed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Base Outstation Rate",
                  description: `Our ${VEHICLE_LABEL} rate starts at ₹${PRICE_PER_KM}/km with a standard ${MIN_KM_PER_DAY} km daily billing minimum.`,
                },
                {
                  title: "Toll, Parking & Permits",
                  description: `Highway FASTag tolls, state border taxes, and venue parking are billed at actuals. A ${NIGHT_ALLOWANCE} chauffeur allowance applies for travel past 10:00 PM.`,
                },
                {
                  title: "Written Booking Confirmation",
                  description:
                    "Receive an itemized quote detailing the planned distance, travel dates, overnight halts, and driver charges before paying your deposit.",
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
                {SEATER} Seater Tempo Traveller vs Multiple Smaller Cabs
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
                      4–5 Separate SUVs / Cabs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaUsers className="text-primary" /> Group Unity
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Entire group travels together in one cabin
                    </td>
                    <td className="p-4 text-slate-600">
                      Group split across 4 to 5 separate cars
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary" /> Tolls &amp; Driver Allowance
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Single commercial toll &amp; one driver allowance
                    </td>
                    <td className="p-4 text-slate-600">
                      Multiplied toll charges &amp; 4–5 driver fees
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary" /> Luggage Handling
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Rear boot + rooftop carrier for all 26 bags
                    </td>
                    <td className="p-4 text-slate-600">
                      Cramped car trunks with bags on passenger laps
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaCarSide className="text-primary" /> Route Coordination
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Single pickup time, route, and pitstops
                    </td>
                    <td className="p-4 text-slate-600">
                      Constant tracking and waiting for separated cars
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
              Call our reservations desk for an instant, verified itinerary quote.
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
                  `Hi ${SITE_NAME}, I want to book a ${VEHICLE_LABEL} in ${city} at ₹${PRICE_PER_KM}/km. Please share the best quote.`
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