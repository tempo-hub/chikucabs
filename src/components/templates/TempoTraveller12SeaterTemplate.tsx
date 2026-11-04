"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { cityRoutes } from "@/data/routes";
import toast from "react-hot-toast";
import { CiClock1 } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import routeData from "@/data/routeData.json";
import { CITY_DISPLAY_NAMES } from "@/data/cityCabRoutes";
import {
  FaCarSide,
  FaCheckCircle,
  FaUsers,
  FaSuitcase,
  FaSnowflake,
  FaShieldAlt,
  FaWhatsapp,
  FaMoneyBillWave,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Head from "next/head";
import Script from "next/script";
import { cities } from "@/data/cities";

// --- Type Definitions ---
interface FormData {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  distance: string;
}

interface VehicleDetails {
  icon: string;
  image: string;
  pricePerKm: number;
  capacity: string;
  luggage: string;
  description: string;
  features: string[];
}

interface StatItem {
  num: string;
  label: string;
}

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";
const currentYear = new Date().getFullYear();

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

const STEPS = [
  {
    step: "01",
    title: "Choose 12 Seater",
    desc: "Select the 12 Seater Tempo Traveller with pushback reclining seats.",
  },
  {
    step: "02",
    title: "Confirm Booking",
    desc: "Share pickup location, date, time and trip details.",
  },
  {
    step: "03",
    title: "Enjoy Journey",
    desc: "Professional commercial driver arrives on time for a smooth trip.",
  },
];

const TEMPO_DATAS = [
  { seater: 9, pricePerKm: 20 },
  { seater: 10, pricePerKm: 21 },
  { seater: 12, pricePerKm: 22, highlight: true },
  { seater: 15, pricePerKm: 23 },
  { seater: 16, pricePerKm: 25 },
  { seater: 17, pricePerKm: 26 },
  { seater: 18, pricePerKm: 27 },
  { seater: 20, pricePerKm: 29 },
  { seater: 26, pricePerKm: 32 },
];

const TEMPO_DATA = [
  {
    seater: 9,
    label: "9 Seater",
    tier: "PREMIUM",
    desc: "Perfect for small family trips & executive travel",
    price: 20,
    seating: "2+2+2+3 Pushback",
    luggage: "8-10 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 10,
    label: "10 Seater",
    tier: "PREMIUM",
    desc: "Ideal for small groups, family outings & comfortable travel",
    price: 21,
    seating: "Comfortable Pushback Seating",
    luggage: "8-10 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 12,
    label: "12 Seater",
    tier: "STANDARD",
    desc: "Most popular for medium groups, pilgrimages & family tours",
    price: 22,
    seating: "3+3+3+3 Pushback",
    luggage: "12-15 Bags",
    best: true,
    popular: true,
  },
  {
    seater: 15,
    label: "15 Seater",
    tier: "PREMIUM",
    desc: "Great for large families & group tours",
    price: 23,
    seating: "3+3+3+3+3 Pushback",
    luggage: "15-18 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 16,
    label: "16 Seater",
    tier: "STANDARD",
    desc: "Spacious for long journeys & luggage",
    price: 25,
    seating: "4+4+4+4 Pushback",
    luggage: "18-20 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 17,
    label: "17 Seater",
    tier: "PREMIUM",
    desc: "Suitable for group tours, family functions & outstation trips",
    price: 26,
    seating: "Comfortable Pushback Seating",
    luggage: "18-22 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 18,
    label: "18 Seater",
    tier: "PREMIUM",
    desc: "Perfect for big groups & destination weddings",
    price: 27,
    seating: "3+3+3+3+3+3 Pushback",
    luggage: "20-25 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 20,
    label: "20 Seater",
    tier: "LUXURY",
    desc: "Max capacity for large events & tours",
    price: 29,
    seating: "4+4+4+4+4 Pushback",
    luggage: "25-30 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 26,
    label: "26 Seater",
    tier: "LUXURY",
    desc: "Ideal for large groups, corporate events & destination weddings",
    price: 32,
    seating: "Comfortable Pushback Seating",
    luggage: "30+ Bags",
    best: false,
    popular: false,
  },
];

export default function TempoTraveller12SeaterTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const groupedTempoRoutes = useMemo(() => {
    const tempoRoutes = (routeData as { url: string }[]).filter((r) =>
      r.url.includes("tempo-traveller-hire-"),
    );
    const grouped: Record<string, { url: string; to: string }[]> = {};
    tempoRoutes.forEach((r) => {
      const parts = r.url.split("/");
      if (parts.length === 3) {
        const routeCity = parts[1];
        const routePart = parts[2];
        if (routePart.includes("-to-")) {
          const toRaw = routePart.split("-to-")[1];
          if (toRaw) {
            const to = toRaw.replace(/-/g, " ");
            if (!grouped[routeCity]) grouped[routeCity] = [];
            if (!grouped[routeCity].some((item) => item.url === r.url)) {
              grouped[routeCity].push({ url: r.url, to });
            }
          }
        }
      }
    });
    return grouped;
  }, []);

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

  const cityTabKeys = useMemo(() => {
    const keys = Object.keys(groupedTempoRoutes);
    if (normalizedCitySlug && keys.includes(normalizedCitySlug)) {
      return [
        normalizedCitySlug,
        ...keys.filter((k) => k !== normalizedCitySlug),
      ];
    }
    return keys;
  }, [groupedTempoRoutes, normalizedCitySlug]);

  const vehicleDetails: VehicleDetails = {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 22,
    capacity: "12 Passengers",
    luggage: "12-15 Bags",
    description: `Travel comfortably with our 12 Seater Tempo Traveller rental service in ${cityName || "India"}, ideal for 12 passengers. Enjoy 3+3+3+3 pushback reclining seats, dual AC, music system, and ample luggage space.`,
    features: [
      "12 Pushback Seats",
      "Powerful Dual AC",
      "Music & LED TV",
      "Rooftop Luggage Carrier",
    ],
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
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
  const [selectedVehicle, setSelectedVehicle] = useState("12-Seater");
  const [selectedDestinationCity, setSelectedDestinationCity] = useState(
    normalizedCitySlug || ""
  );
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [showAllFareCities, setShowAllFareCities] = useState(false);

  const pageTitle = cityName
    ? `12 Seater Tempo Traveller on Rent in ${cityName} @ ₹22/km – Chiku Cabs`
    : "12 Seater Tempo Traveller on Rent @ ₹22/km – Chiku Cabs";

  const pageDescription = cityName
    ? `Book 12 Seater Tempo Traveller in ${cityName} at ₹22/km with Chiku Cabs. Comfortable pushback seats, dual AC, expert drivers for outstation, local tours & weddings. Call +91-8448445504.`
    : "Book 12 Seater Tempo Traveller on rent across India at ₹22/km. Pushback seats, dual AC, generous boot space & certified drivers. Call +91-8448445504.";

  useEffect(() => {
    const cityKeys = Object.keys(groupedTempoRoutes);
    if (cityKeys.length > 0) {
      if (normalizedCitySlug && cityKeys.includes(normalizedCitySlug)) {
        setSelectedDestinationCity(normalizedCitySlug);
      } else if (
        !selectedDestinationCity ||
        !cityKeys.includes(selectedDestinationCity)
      ) {
        setSelectedDestinationCity(cityKeys[0]);
      }
    }
  }, [groupedTempoRoutes, normalizedCitySlug, selectedDestinationCity]);

  const popularDestinations = useMemo(() => {
    const fromCityRoutes =
      cityRoutes[city?.toLowerCase() as keyof typeof cityRoutes];
    if (fromCityRoutes && fromCityRoutes.length > 0) {
      return fromCityRoutes;
    }
    const routesFromGroup = groupedTempoRoutes[normalizedCitySlug] || [];
    return routesFromGroup.slice(0, 12).map((r) => r.to);
  }, [city, groupedTempoRoutes, normalizedCitySlug]);

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
    name: `12 Seater Tempo Traveller on Rent${city !== "India" ? ` in ${city}` : ""}`,
    description: `Hire 12 seater tempo traveller on rent in ${city !== "India" ? city : "India"}. Features 3+3+3+3 pushback reclining seats, dual AC, music system, and rooftop luggage space. Best for group travel, family vacations, weddings and outstation trips.`,
    brand: {
      "@type": "Brand",
      name: "Chiku Cabs",
    },
    image: "https://chikucabs.com/tempo_traveller.png",
    category: "Ground Transportation",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "22",
      highPrice: "24",
      offerCount: 1,
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/PerKilometer",
        price: "22",
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
        value: "12 Passengers + 1 Driver",
      },
      {
        "@type": "PropertyValue",
        name: "Seating Layout",
        value: "3+3+3+3 Pushback",
      },
      {
        "@type": "PropertyValue",
        name: "AC",
        value: "Dual Blower AC",
      },
      {
        "@type": "PropertyValue",
        name: "Luggage Space",
        value: "12-15 Bags + Rooftop Carrier",
      },
    ],
    areaServed: {
      "@type": "City",
      name: city !== "India" ? city : "All Major Cities in India",
    },
    serviceType: "12 Seater Tempo Traveller Rental",
    url: `https://chikucabs.com/12-seater-tempo-traveller${normalizedCitySlug ? `-${normalizedCitySlug}` : ""}`,
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
    priceRange: "₹22 per km",
  };

  const TEMPO_FAQS = useMemo(
    () => [
      {
        q: `What is the per-km rate for a 12 Seater Tempo Traveller in ${city !== "India" ? city : "India"}?`,
        a: `The 12 Seater Tempo Traveller rental rate starts at ₹22/km for outstation journeys with a standard 250 km daily calendar-day average run. Local packages (8 hours / 80 km) start from ₹4,800.`,
      },
      {
        q: `What is the seating arrangement of a 12 Seater Tempo Traveller?`,
        a: `The 12 Seater Tempo Traveller is arranged in a comfortable 3+3+3+3 pushback layout (or 1x1 Maharaja luxury captain seating depending on model), offering maximum legroom, individual armrests, and headrests.`,
      },
      {
        q: `How much luggage can a 12 Seater Tempo Traveller accommodate?`,
        a: `It easily accommodates 12 to 15 medium trolley bags in its dedicated boot space. For extra suitcases or trekking gear, a secure rooftop luggage carrier with waterproof tarpaulin is provided at no extra cost.`,
      },
      {
        q: `Can a 12 Seater Tempo Traveller travel to hill stations and mountain routes?`,
        a: `Yes! Our 12 Seater Tempo Travellers are powered by heavy-duty Force CRDI engines and driven by commercial-badge drivers with extensive experience navigating steep mountain hairpins in Himachal, Uttarakhand, and South Indian ghats.`,
      },
      {
        q: `Are toll taxes, driver allowance and state border permits included?`,
        a: `The per-km rate includes vehicle hire, fuel and chauffeur. Highway toll taxes, inter-state entry taxes, and parking fees are payable as per actual receipts. Night driver allowance (₹400–₹500) applies only if travel extends beyond 10:00 PM.`,
      },
      {
        q: `How do I book a 12 Seater Tempo Traveller in ${city !== "India" ? city : "India"}?`,
        a: `You can instantly book by calling +91-8448445504 or contacting our 24/7 WhatsApp desk at 916280820037. We will share actual photos of the vehicle and confirm your ride with a nominal advance deposit.`,
      },
      {
        q: `Can I hire a 12 Seater Tempo Traveller for local sightseeing or airport transfers?`,
        a: `Yes. You can enquire about a 12 seater for local sightseeing, airport transfers, family functions, and outstation trips. Share your itinerary and travel date so the team can check availability and provide a trip-specific quote.`,
      },
      {
        q: `What details should I provide to get a 12 Seater Tempo Traveller quote?`,
        a: `Provide your pickup location, destination or route, travel date and time, trip duration, passenger count, and luggage requirements. These details help the team check availability and calculate the applicable fare.`,
      },
      {
        q: `Is a 12 Seater Tempo Traveller suitable for a family trip or group tour?`,
        a: `A 12 seater lets a group travel together in one vehicle and is commonly considered for family outings, sightseeing, and group tours. Consider your passenger count and luggage when confirming that this seating capacity suits your trip.`,
      },
      {
        q: `How early should I book a 12 Seater Tempo Traveller?`,
        a: `Enquire as early as possible, especially for weekends, holidays, and wedding dates. Availability depends on your pickup city and travel schedule, so contact the booking team to check your preferred dates.`,
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

    const message = `🚖 *12 Seater Tempo Traveller Estimate Request*

🚕 *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}
🛣️ *Route:* ${pickupLocation} → ${dropLocation}
📅 *Travel Date:* ${travelDate}
⏰ *Travel Time:* ${travelTime}
${tripType === "round-trip" ? `🔄 *Return Date:* ${returnDate}\n` : ""}
🚐 *Vehicle:* 12 Seater Tempo Traveller (${city})

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
          url: `/12-seater-tempo-traveller-in-${slug}`,
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
          href={`https://chikucabs.com/12-seater-tempo-traveller${normalizedCitySlug ? `-${normalizedCitySlug}` : ""}`}
        />
      </Head>

      <Script
        id="structured-data-12seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="organization-data-12seater"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="faq-data-12seater"
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
                    📞 Book 12 Seater
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/tempotraveller.webp"
              alt="12 Seater Tempo Traveller"
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
                  12 Seater Tempo Traveller on Rent
                  {cityName && (
                    <>
                      {" "}in <span className="text-primary">{cityName}</span>
                    </>
                  )}
                  <span className="block text-primary text-2xl md:text-4xl mt-2">
                    Starting at ₹22/km
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vehicleDetails.description} Pushback reclining seats, crystal clear music system, dual AC, and courteous drivers.
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
                      `Hi Chiku Cabs, I want to book a 12 Seater Tempo Traveller in ${cityName || "India"}. Please share details.`
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
                    <span className="text-sm">Best Price ₹22/km</span>
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
                    Book 12 Seater Tempo
                  </h3>
                  <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full">
                    ₹22/km
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
                      Get 12 Seater Fare Quote
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                    <span>✓ ₹22/km Base</span>
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
                Relax and Travel Together in a 12 Seater
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

        {/* 12 Seater Outstation Rate Table */}
        <section className="py-16 px-4 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-badge mx-auto">OUTSTATION RATES</span>
              <h2 className="section-title mt-4">
                12 Seater &amp; Full Tempo Traveller Fare Chart
              </h2>
              <p className="max-w-3xl text-slate-700 mx-auto mt-2">
                Standard outstation minimum billing is 250 km/day. Transparent per-km rates with zero hidden charges.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Vehicle</th>
                    <th className="px-5 py-4 font-semibold">Per KM Rate</th>
                    <th className="px-5 py-4 font-semibold">Min Km/Day</th>
                    <th className="px-5 py-4 font-semibold">Driver Allowance</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMPO_DATAS.map((v) => (
                    <tr
                      key={v.seater}
                      className={`border-t border-slate-200 hover:bg-slate-50 ${
                        v.seater === 12 ? "bg-amber-50/70 font-semibold" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        {v.seater} Seater Tempo Traveller
                        {v.seater === 12 && (
                          <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                            Selected
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-bold text-primary">
                        ₹{v.pricePerKm}/km
                      </td>
                      <td className="px-5 py-4">250 km/day</td>
                      <td className="px-5 py-4">₹400–₹500 / day</td>
                      <td className="px-5 py-4">
                        <a
                          href="tel:+918448445504"
                          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 inline-block"
                        >
                          Book Now
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fare Calculator */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="section-badge mx-auto">12 SEATER CALCULATOR</div>
              <h2 className="section-title">Estimate 12 Seater Fare</h2>
              <p className="text-muted-foreground">
                Base rate calculated at ₹22/km + driver allowance
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
                          const newPrice = dist * 22 + DRIVER_CHARGE;
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
                    ESTIMATED 12 SEATER FARE
                  </p>
                  <div className="text-5xl md:text-6xl font-black text-primary">
                    {estimatedPrice ? `₹${estimatedPrice.toLocaleString()}` : "---"}
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-primary/10 px-4 py-1.5 rounded-full">
                      <p className="text-xs font-bold text-primary tracking-wide">
                        * RATE: ₹22/KM
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

        {/* Popular Destinations Tabs */}
        {/* <section className="py-12 bg-gray-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Popular 12 Seater Tempo Traveller Destinations
              </h2>
              <p className="text-gray-600">
                Explore top outstation and tourist routes across India
              </p>
            </div>

            <div className="mb-10">
              <div className="flex flex-wrap justify-center gap-3">
                {cityTabKeys.map((cityKey) => {
                  const name =
                    CITY_DISPLAY_NAMES[cityKey] ??
                    cityKey
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ");
                  const isSelected = selectedDestinationCity === cityKey;
                  return (
                    <button
                      key={cityKey}
                      type="button"
                      onClick={() => {
                        setSelectedDestinationCity(cityKey);
                        setShowAllDestinations(false);
                      }}
                      className={`px-5 py-2.5 rounded-full border text-sm font-semibold shadow-sm transition-all duration-300 ${
                        isSelected
                          ? "bg-[#BE1E23] text-white border-[#BE1E23] shadow-xl scale-105"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-[#BE1E23] hover:text-white hover:border-[#BE1E23]"
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            {(() => {
              const cityKey = selectedDestinationCity;
              const routes = groupedTempoRoutes[cityKey] ?? [];
              const visibleRoutes = showAllDestinations
                ? routes
                : routes.slice(0, 18);

              return (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {visibleRoutes.map((route, idx) => (
                      <Link
                        key={`${route.url}-${idx}`}
                        href={route.url}
                        className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                          <span className="text-lg">🚐</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-primary transition-colors capitalize">
                          {route.to}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-semibold text-primary">
                            From ₹22/km
                          </span>
                          <span className="text-xs text-gray-400">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {routes.length > 18 && (
                    <div className="flex justify-center mt-8">
                      <button
                        type="button"
                        onClick={() => setShowAllDestinations((p) => !p)}
                        className="px-7 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        {showAllDestinations
                          ? "View Less ↑"
                          : `View More (${routes.length - 18} more) ↓`}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section> */}

        {/* Choose Your Fare Pickup City */}
        <section className="py-10 bg-white border-b border-slate-200">
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
        </section>

        {/* Steps */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-badge mx-auto">EASY 3 STEPS</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
                How to Book a 12 Seater Tempo Traveller
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
        <section className="py-16 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-badge mx-auto">COMPARISON</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
                12 Seater Tempo Traveller vs 3 Small Cabs
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase">
                    <th className="p-4 font-semibold">Parameter</th>
                    <th className="p-4 font-bold text-amber-400 bg-slate-800">
                      12 Seater Tempo Traveller
                    </th>
                    <th className="p-4 font-medium text-slate-300">
                      3 Separate Sedans / Hatchbacks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaUsers className="text-primary" /> Travel Together
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      100% United, Sing &amp; Celebrate Together
                    </td>
                    <td className="p-4 text-slate-600">
                      Separated into 3 different cars
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary" /> Cost &amp; Tolls
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Single Toll, 1 Driver, 35-40% Cost Savings
                    </td>
                    <td className="p-4 text-slate-600">
                      Triple Toll &amp; 3x Driver Allowance
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary" /> Luggage
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      High boot space + Rooftop carrier
                    </td>
                    <td className="p-4 text-slate-600">
                      Cramped by CNG fuel tanks
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FaSnowflake className="text-primary" /> Comfort
                    </td>
                    <td className="p-4 font-semibold text-emerald-700 bg-amber-50/50">
                      Pushback reclining seats with ample leg space
                    </td>
                    <td className="p-4 text-slate-600">
                      Restricted legroom in back row
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
                12 Seater Tempo Traveller Rental FAQs{" "}
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
              Reserve Your 12 Seater Tempo Traveller Today
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
                  `Hi Chiku Cabs, I want to book a 12 Seater Tempo Traveller in ${city !== "India" ? city : "India"}. Please share best quote.`
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
          vehicle="12 Seater Tempo Traveller"
        />
      </div>
    </>
  );
}
