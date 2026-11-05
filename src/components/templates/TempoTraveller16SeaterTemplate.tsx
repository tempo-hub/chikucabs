"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
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
import { FaLocationDot } from "react-icons/fa6";
import Head from "next/head";
import Script from "next/script";
import { cities } from "@/data/cities";
import { usePathname } from "next/navigation";

// --- Type Definitions ---
interface FormData {
  distance: string;
}

interface VehicleDetails {
  image: string;
  pricePerKm: number;
  description: string;
}

interface StatItem {
  num: string;
  label: string;
}

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

const STEPS = [
  {
    step: "01",
    title: "Choose 16 Seater",
    desc: "Select the 16 Seater Tempo Traveller for comfortable group journeys.",
  },
  {
    step: "02",
    title: "Confirm Booking",
    desc: "Share pickup location, travel date, timing and itinerary details.",
  },
  {
    step: "03",
    title: "Enjoy Journey",
    desc: "Courteous heavy-commercial badge chauffeur arrives on time.",
  },
];

export default function TempoTraveller16SeaterTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const rawCity = parsedData.origin || "India";
  const rawCityName = rawCity !== "India" ? rawCity : "";
  const rawCitySlug = rawCityName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const normalizedCitySlug =
    rawCitySlug === "bengaluru" || rawCitySlug === "banglore"
      ? "bangalore"
      : rawCitySlug === "hydrabad"
      ? "hyderabad"
      : rawCitySlug === "chennie"
      ? "chennai"
      : rawCitySlug;

  const cityName =
    normalizedCitySlug === "bangalore"
      ? "Bangalore"
      : normalizedCitySlug === "hyderabad"
      ? "Hyderabad"
      : normalizedCitySlug === "chennai"
      ? "Chennai"
      : normalizedCitySlug === "ludhiana"
      ? "Ludhiana"
      : rawCityName;

  const city = cityName || "India";

  const vehicleDetails: VehicleDetails = {
    image: "/tempo_traveller.png",
    pricePerKm: 25,
    description: `Travel effortlessly with our 16 Seater Tempo Traveller rental in ${cityName || "India"}. Features 4+4+4+4 pushback reclining seats, heavy-duty cooling AC, LED screen, and spacious luggage hold.`,
  };

  const [formData, setFormData] = useState<FormData>({
    distance: "50",
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [showAllFareCities, setShowAllFareCities] = useState(false);

  const pageTitle = cityName
    ? `16 Seater Tempo Traveller on Rent in ${cityName} @ ₹25/km – Chiku Cabs`
    : "16 Seater Tempo Traveller on Rent @ ₹25/km – Chiku Cabs";

  const pageDescription = cityName
    ? `Book 16 Seater Tempo Traveller in ${cityName} at ₹25/km with Chiku Cabs. Spacious 4+4+4+4 pushback seats, powerful dual AC, large luggage space & experienced drivers. Call +91-8448445504.`
    : "Book 16 Seater Tempo Traveller on rent across India at ₹25/km. Pushback seats, dual AC, large boot & certified highway drivers. Call +91-8448445504.";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateFare = useCallback(() => {
    const distance = parseFloat(formData.distance);
    const DRIVER_CHARGE = 500;

    if (!isNaN(distance) && distance > 0) {
      const rate = vehicleDetails.pricePerKm;
      const fare = Math.round(distance * 1.5 * rate + DRIVER_CHARGE);
      setEstimatedPrice(fare);
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.distance, vehicleDetails.pricePerKm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `16 Seater Tempo Traveller on Rent${city !== "India" ? ` in ${city}` : ""}`,
    description: `Hire 16 seater tempo traveller on rent in ${city !== "India" ? city : "India"}. Features 4+4+4+4 pushback reclining seats, heavy dual AC, music system, and large luggage capacity. Ideal for extended family trips, wedding baraat, corporate offsites, and pilgrimage tours.`,
    brand: {
      "@type": "Brand",
      name: "Chiku Cabs",
    },
    image: "https://chikucabs.com/tempo_traveller.png",
    category: "Ground Transportation",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "25",
      highPrice: "27",
      offerCount: 1,
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/PerKilometer",
        price: "25",
        priceCurrency: "INR",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Seating Capacity",
        value: "16 Passengers + 1 Driver",
      },
      {
        "@type": "PropertyValue",
        name: "Seating Layout",
        value: "4+4+4+4 Pushback",
      },
      {
        "@type": "PropertyValue",
        name: "AC",
        value: "Dual Blower AC",
      },
      {
        "@type": "PropertyValue",
        name: "Luggage Space",
        value: "18-20 Bags + Rooftop Carrier",
      },
    ],
    areaServed: {
      "@type": "City",
      name: city !== "India" ? city : "All Major Cities in India",
    },
    serviceType: "16 Seater Tempo Traveller Rental",
    url: `https://chikucabs.com/16-seater-tempo-traveller${normalizedCitySlug ? `-${normalizedCitySlug}` : ""}`,
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: "https://chikucabs.com/yt.png",
    telephone: PHONE_NUMBER,
    address: {
      "@type": "PostalAddress",
      addressLocality: city !== "India" ? city : "Delhi",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
    },
    priceRange: "₹25 per km",
  };

  const TEMPO_FAQS = useMemo(
    () => [
      {
        q: `What is the per-km rate for a 16 Seater Tempo Traveller in ${city !== "India" ? city : "India"}?`,
        a: `The 16 Seater Tempo Traveller starts at ₹25/km for outstation routes with a standard 250 km daily calendar-day billing minimum. Local 8 hours / 80 km full day packages start from ₹5,500.`,
      },
      {
        q: `What is the seating configuration of a 16 Seater Tempo Traveller?`,
        a: `The 16 Seater Tempo Traveller comes in a 4+4+4+4 configuration or luxury 2x1 pushback layout with wide center aisle, individual armrests, and 140-degree pushback reclining capability.`,
      },
      {
        q: `How many bags and trolley suitcases can a 16 Seater carry?`,
        a: `It holds 18 to 20 medium and large trolley bags inside the deep boot space. For extra family luggage or wedding boxes, a heavy-duty rooftop luggage carrier with rain-proof tarpaulin cover is attached.`,
      },
      {
        q: `Is the 16 Seater Tempo Traveller suitable for wedding guest transfers and corporate offsites?`,
        a: `Yes! The 16 Seater is the most frequently requested vehicle for wedding airport pickups, sangeet transfers, and corporate team offsite excursions. We also provide GST invoices for corporate bookings.`,
      },
      {
        q: `Are fuel, driver allowance, and toll charges covered?`,
        a: `Fuel and chauffeur services are included in the per-km fare. State border taxes, highway Fastag toll plazas, and parking fees are charged as per actual receipts. Night driver allowance (₹400–₹500) applies only if travel extends past 10:00 PM.`,
      },
      {
        q: `How can I reserve a 16 Seater Tempo Traveller in ${city !== "India" ? city : "India"}?`,
        a: `Call +91-8448445504 or message our 24/7 WhatsApp helpdesk at 916280820037. Our team will verify availability, provide actual photos of the vehicle, and send instant confirmation.`,
      },
      {
        q: `Can I hire a 16 Seater Tempo Traveller for local sightseeing and airport transfers?`,
        a: `Yes. A 16 seater can be requested for local sightseeing, airport transfers, events, and outstation journeys. Share your itinerary and travel date so the team can confirm availability and the applicable fare.`,
      },
      {
        q: `What information should I provide to get a 16 Seater Tempo Traveller quote?`,
        a: `Share your pickup city and location, destination or route, travel date and time, trip duration, passenger count, and luggage needs. These details help the team recommend a suitable vehicle and provide a trip-specific quote.`,
      },
      {
        q: `Can I request a rooftop luggage carrier with a 16 Seater Tempo Traveller?`,
        a: `Rooftop carrier availability can be requested when booking. Mention your luggage quantity and type in advance so the team can confirm the arrangement for your trip.`,
      },
      {
        q: `How early should I book a 16 Seater Tempo Traveller?`,
        a: `Book as early as possible, especially for holiday periods, weekends, and wedding dates. Availability depends on your city, travel date, and itinerary, so contact the team to check your preferred schedule.`,
      },
    ],
    [city]
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: TEMPO_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    }),
    [TEMPO_FAQS]
  );

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

    const message = `🚖 *16 Seater Tempo Traveller Estimate Request*

🚕 *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}
🛣️ *Route:* ${pickupLocation} → ${dropLocation}
📅 *Travel Date:* ${travelDate}
⏰ *Travel Time:* ${travelTime}
${tripType === "round-trip" ? `🔄 *Return Date:* ${returnDate}\n` : ""}
🚐 *Vehicle:* 16 Seater Tempo Traveller (${city})

Please share the best quote.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setPickupLocation("");
    setDropLocation("");
    setTravelDate("");
    setTravelTime("");
    setReturnDate("");
    setTripType("one-way");
  };

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        times.push(`${displayHour}:${String(min).padStart(2, "0")} ${period}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes();

  useEffect(() => {
    if (formData.distance === "50") {
      calculateFare();
    }
  }, [calculateFare, formData.distance]);

  const farePickupCities = useMemo(() => {
    const farePrefix = "/tempo-traveller-fare-in-";
    const fareUrls = (routeData as { url: string }[]).filter((item) =>
      item.url.startsWith(farePrefix)
    );

    return fareUrls
      .map((item) => {
        const slug = item.url.replace(farePrefix, "").replace(/\/$/, "");
        const matchedCity = cities.find(
          (c) =>
            c.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
        );
        if (!matchedCity) return null;
        return {
          ...matchedCity,
          url: `/16-seater-tempo-traveller-in-${slug}`,
        };
      })
      .filter(
        (
          c
        ): c is {
          name: string;
          description: string;
          url: string;
        } => c !== null
      );
  }, []);

  const visibleFarePickupCities = showAllFareCities
    ? farePickupCities
    : farePickupCities.slice(0, 40);

  const relatedCityVehicleRoutes = useMemo(() => {
    if (!normalizedCitySlug) return [];

    const citySlugPattern = normalizedCitySlug.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const seaterRoutePattern = new RegExp(
      `^/(\\d+)-seater-tempo-traveller-(?:in|on-rent-in|for-rent-in)-${citySlugPattern}$`,
      "i"
    );
    const fareRoutePattern = new RegExp(
      `^/tempo-traveller-fare-in-${citySlugPattern}$`,
      "i"
    );
    const rentalRoutePattern = new RegExp(
      `^/tempo-traveller-(?:on-rent-in-|for-rent-in-|in-)${citySlugPattern}$`,
      "i"
    );

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
        (
          route
        ): route is { url: string; title: string; seater: number } =>
          route !== null
      )
      .sort((a, b) => {
        if (a.seater === 0) return 1;
        if (b.seater === 0) return -1;
        return a.seater - b.seater;
      });
  }, [city, normalizedCitySlug]);

  const pathname = usePathname();
  const filteredRelatedRoutes = relatedCityVehicleRoutes.filter(
    (route) => route.url.replace(/\/$/, "") !== pathname.replace(/\/$/, "")
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`https://chikucabs.com${vehicleDetails.image}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://chikucabs.com/16-seater-tempo-traveller${normalizedCitySlug ? `-${normalizedCitySlug}` : ""}`}
        />
      </Head>

      <Script
        id="structured-data-16seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="organization-data-16seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="faq-data-16seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-background min-h-screen">
        {/* Sticky CTA */}
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
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-800 px-3 py-1 rounded font-mono text-yellow-400">
                        CHIKUCABS10
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("CHIKUCABS10");
                          toast.success("Promo code copied!");
                        }}
                        className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className="text-sm opacity-90">
                    to get{" "}
                    <span className="font-bold text-yellow-400">10% OFF</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:+918448445504"
                    className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                  >
                    📞 Book 16 Seater
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero */}
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
                  <span className="text-sm">4.9 Rating • 1250+ Reviews</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  16 Seater Tempo Traveller on Rent
                  {cityName && (
                    <>
                      {" "}in <span className="text-primary">{cityName}</span>
                    </>
                  )}
                  <span className="block text-primary text-2xl md:text-4xl mt-2">
                    Starting at ₹25/km
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vehicleDetails.description} Pushback luxury seats, high boot space, individual AC vents, and expert highway drivers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+918448445504"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    📞 Book Now
                  </a>

                  <a
                    href={`https://wa.me/916280820037?text=${encodeURIComponent(
                      `Hi Chiku Cabs, I want to book a 16 Seater Tempo Traveller in ${cityName || "India"}. Please share quotation.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                <div className="flex gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">Best Price ₹25/km</span>
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
                    <span className="text-sm">Sanitized &amp; Clean</span>
                  </div>
                </div>
              </div>

              {/* Right Booking Widget */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Book 16 Seater Tempo
                  </h3>
                  <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full">
                    ₹25/km
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">
                  Instant confirmation &amp; verified driver details
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
                      className="w-full h-13 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
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
                      className="w-full h-13 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTripType("one-way")}
                      className={`py-2.5 rounded-xl font-semibold transition-all ${
                        tripType === "one-way"
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      One Way
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType("round-trip")}
                      className={`py-2.5 rounded-xl font-semibold transition-all ${
                        tripType === "round-trip"
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Round Trip
                    </button>
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
                        className="w-full h-13 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
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
                        className="w-full h-13 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                        required
                      >
                        <option value="">Select Time</option>
                        {timeOptions.map((time) => (
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
                        placeholder="Return Date"
                        className="w-full h-13 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="group w-full h-14 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get 16 Seater Fare Quote
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                    <span>✓ ₹25/km Base</span>
                    <span>•</span>
                    <span>✓ Free Cancellation</span>
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
              {STATS.map((stat, i) => (
                <div key={i} className="text-center group">
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

        {/* 12 Seater Features & Comfort */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto">FEATURES &amp; COMFORT</div>
              <h2 className="section-title">
                Relax and Travel Together in a 16 Seater
              </h2>
              <p className="section-subtitle mx-auto">
                Thoughtful onboard amenities and spacious seating make group
                journeys comfortable from pickup to drop-off.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: FaUsers,
                  title: "Comfortable Pushback Seats",
                  description:
                    "Roomy, reclining seats let your group relax throughout the journey.",
                },
                {
                  icon: FaSnowflake,
                  title: "Dual Air Conditioning",
                  description:
                    "A dual AC setup helps keep the cabin cool for every passenger.",
                },
                {
                  icon: FaCarSide,
                  title: "Music System",
                  description:
                    "Enjoy music together and make long drives more pleasant.",
                },
                {
                  icon: FaSuitcase,
                  title: "Room for Luggage",
                  description:
                    "Dedicated luggage space, with rooftop carrier options for group trips.",
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
                    "Travel together in one vehicle for family outings, events, and tours.",
                },
              ].map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={22} />
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

        {/* 16 Seater Group Fit Guide */}
        <section className="py-12 px-4 bg-white/95 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="section-badge mx-auto">BEFORE YOU BOOK</span>
              <h2 className="section-title mt-4">
                Is a 16 Seater Tempo Traveller Right for Your Group?
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                A 16 seater can keep your group together for a city outing or
                an outstation journey. Check passenger numbers, luggage and
                pickup access before confirming your Tempo Traveller booking in{" "}
                {city}.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Count passengers",
                  description:
                    "The vehicle is designed for up to 16 passengers. Share your final headcount when enquiring so the team can confirm that the seating arrangement suits your group.",
                },
                {
                  title: "Plan for luggage",
                  description:
                    "The space available depends on the number and size of bags. Mention suitcases, strollers or other bulky items in advance and confirm luggage arrangements before travel.",
                },
                {
                  title: "Check pickup and drop-off access",
                  description:
                    "Share exact pickup points and any narrow lanes, restricted-access areas or parking limitations on your route. This helps plan a suitable boarding point for a larger vehicle.",
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
          </div>
        </section>

        {/* 16 Seater Trip Planning */}
        <section className="py-12 px-4 bg-white/95 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <span className="section-badge mx-auto">
                POPULAR USE CASES &amp; COVERAGE
              </span>
              <h2 className="section-title mt-4">
                16 Seater Tempo Traveller Hire in {city}
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                Hiring a 16 seater Tempo Traveller in {city} lets your group
                travel together, with one pickup plan and a shared itinerary.
                Choose the trip type first, then share your route and schedule
                to check vehicle availability and get a quote for your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Local sightseeing and airport transfers",
                  description:
                    "Plan your pickup and drop-off points in advance, especially when your group has several stops or flight timings to meet. Share the locations and requested hours when enquiring.",
                },
                {
                  title: "Outstation, weekend and pilgrimage trips",
                  description:
                    "For a multi-day itinerary, include every destination, overnight halt and return date in your request. This helps the team check the route and prepare a trip-specific estimate.",
                },
                {
                  title: "Weddings, family functions and group events",
                  description:
                    "A shared vehicle can simplify transport between hotels, venues and pickup points. Confirm passenger numbers, event timings and any luggage needs before booking.",
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
                What to share when requesting a 16 seater quote
              </h3>
              <p className="text-slate-700 leading-7">
                Provide your pickup location in {city}, destination or full
                route, travel dates, pickup time, trip duration, passenger
                count and approximate luggage. For outstation journeys, mention
                whether the trip is one-way or round-trip and list planned
                overnight stops. The final fare and inclusions depend on your
                confirmed itinerary, so review the quote before booking.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Pickup and drop-off points in {city}
              </h3>
              <p className="text-slate-700 leading-7">
                Pickup can be requested from locations such as airport
                terminals, railway or bus stations, hotels, homes, offices and
                event venues. Share the exact address and preferred time when
                enquiring. The team can confirm serviceability, vehicle access
                and any suitable nearby boarding point for your route.
              </p>
            </div>
          </div>
        </section>

        {/* Fare Calculator */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="section-badge mx-auto">16 SEATER CALCULATOR</div>
              <h2 className="section-title">Estimate 16 Seater Fare</h2>
              <p className="text-muted-foreground">
                Base rate calculated at ₹25/km + driver allowance
              </p>
            </div>

            <div className="premium-card">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold">Distance (in km)</label>
                    <span className="text-2xl font-black text-primary">
                      {formData.distance || 0} km
                    </span>
                  </div>

                  <input
                    type="range"
                    name="distance"
                    min="0"
                    max="2000"
                    step="10"
                    value={formData.distance}
                    onChange={handleInputChange}
                    onMouseUp={calculateFare}
                    onTouchEnd={calculateFare}
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
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            distance: dist.toString(),
                          }));
                          const DRIVER_CHARGE = 500;
                          const newPrice = dist * 25 + DRIVER_CHARGE;
                          setEstimatedPrice(newPrice);
                        }}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          Number(formData.distance) === dist
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
                    ESTIMATED 16 SEATER FARE
                  </p>
                  <div className="text-5xl md:text-6xl font-black text-primary">
                    {estimatedPrice ? `₹${estimatedPrice.toLocaleString()}` : "---"}
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-primary/10 px-4 py-1.5 rounded-full">
                      <p className="text-xs font-bold text-primary tracking-wide">
                        * RATE: ₹25/KM
                      </p>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-6 pt-3 border-t border-border">
                    *Includes standard vehicle fuel &amp; driver charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fare Transparency & Booking Terms */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="section-badge mx-auto">
                TRANSPARENCY &amp; TRUST
              </span>
              <h2 className="section-title mt-4">
                Understand Your 16 Seater Tempo Traveller Quote
              </h2>
              <p className="text-slate-700 mt-3 leading-7">
                The fare calculator is an estimate. Ask for a trip-specific,
                itemized quote based on your confirmed route and schedule before
                you book.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Starting rates and daily minimum",
                  description:
                    "The listed outstation rate starts at ₹25/km, with a standard 250 km daily billing minimum. Local 8-hour / 80-km packages start from ₹5,500, subject to availability and confirmed terms.",
                },
                {
                  title: "Review route-based charges",
                  description:
                    "Fuel and chauffeur services are included in the per-kilometre fare. Highway tolls, state border taxes and parking are charged as per actual receipts. A ₹400–₹500 night driver allowance applies if travel extends past 10:00 PM.",
                },
                {
                  title: "Confirm the trip details",
                  description:
                    "Have the route, travel dates, daily distance, overnight stops and applicable extras listed in your quote. This helps you understand the estimated total before confirming the booking.",
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

        {/* Choose Your Fare Pickup City */}
        {/* <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Choose Your Fare Pickup City
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-500">
                Select your pickup city to check Tempo Traveller fare and booking
                options.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleFarePickupCities.map((city) => (
                <Link
                  key={city.url}
                  href={city.url}
                  className="group relative flex items-center justify-between min-h-[84px] px-5 py-4 bg-white border border-slate-200 border-l-4 border-l-primary rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <FaLocationDot size={16} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {city.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                        {city.description}
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="text-lg leading-none">→</span>
                  </div>
                </Link>
              ))}
            </div>

            {farePickupCities.length > 40 && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowAllFareCities((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  {showAllFareCities
                    ? "View Less ↑"
                    : `View All Routes (${farePickupCities.length - 40} more) ↓`}
                </button>
              </div>
            )}
          </div>
        </section> */}

        {filteredRelatedRoutes.length > 0 && (
          <section className="py-12 bg-white/95 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Tempo Traveller Options in {city}
                </h2>
                <p className="mt-2 text-sm md:text-base text-slate-600">
                  Explore available Tempo Traveller seating options and
                  booking pages for {city}.
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
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-badge mx-auto">EASY 3 STEPS</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
                How to Book a 16 Seater Tempo Traveller
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
                16 Seater Tempo Traveller vs 4 Small Cabs
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase">
                    <th className="p-4 font-semibold">Parameter</th>
                    <th className="p-4 font-bold text-amber-400 bg-slate-800">
                      16 Seater Tempo Traveller
                    </th>
                    <th className="p-4 font-medium text-slate-300">
                      4 Separate Small Cabs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaUsers className="text-primary" /> Group Travel
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      All 16 passengers together, seamless coordination
                    </td>
                    <td className="p-4 text-slate-600">
                      Scattered across 4 cars, waiting for each other
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary" /> Fares &amp; Tolls
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      1 Toll slip, 1 Chauffeur, up to 40% savings
                    </td>
                    <td className="p-4 text-slate-600">
                      4x Highway tolls, 4x parking &amp; 4 drivers
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary" /> Baggage Volume
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Deep luggage boot + Rooftop carrier for 20 bags
                    </td>
                    <td className="p-4 text-slate-600">
                      Extremely limited boot space in sedans
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaSnowflake className="text-primary" /> Comfort
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      4+4+4+4 pushback ergonomic seating with individual AC
                    </td>
                    <td className="p-4 text-slate-600">
                      Cramped back row in compact sedans
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-muted/30 py-12 border-y px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto">FAQ</div>
              <h2 className="section-title">
                16 Seater Tempo Traveller Rental FAQs{" "}
                {city !== "India" ? `in ${city}` : "Across India"}
              </h2>
            </div>

            {TEMPO_FAQS.map((faq, i) => (
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

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Reserve Your 16 Seater Tempo Traveller Today
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call our reservations desk for instant quote and best discounts.
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
                  `Hi Chiku Cabs, I want to book a 16 Seater Tempo Traveller in ${city !== "India" ? city : "India"}. Please share quotation.`
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
          vehicle="16 Seater Tempo Traveller"
        />
      </div>
    </>
  );
}
