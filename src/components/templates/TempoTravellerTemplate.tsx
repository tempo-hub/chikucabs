"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { cityRoutes } from "@/data/routes";
import toast from "react-hot-toast";
import { CiClock1 } from "react-icons/ci";
import {
  FaCarSide,
  FaUserTie,
  FaWallet,
  FaHeadset,
  FaSyncAlt,
  FaMapMarkerAlt,
  FaSprayCan,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaChartLine,
  FaCar,
  FaCaravan,
  FaBus,
  FaList,
  FaMoneyBillWave,
  FaUsers,
  FaUser,
  FaSuitcase,
  FaSnowflake,
  FaWifi,
  FaBatteryFull,
  FaMedal,
  FaBriefcase,
  FaGem,
  FaMicrochip,
  FaRegLightbulb,
} from "react-icons/fa";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import Head from "next/head";
import Script from "next/script";

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
const WHATSAPP_NUMBER = "918448445504";
const SITE_NAME = "Chiku Cabs";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();

const VEHICLE_DETAILS_MAP: Record<
  string,
  Omit<VehicleDetails, "description">
> = {
  tempo: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 24,
    capacity: "9-12 Passengers",
    luggage: "8-10 Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Luggage Space",
    ],
  },
  traveller: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 19,
    capacity: "9-12 Passengers",
    luggage: "8-10 Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Luggage Space",
    ],
  },
  bus: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 19,
    capacity: "9-12 Passengers",
    luggage: "8-10 Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Luggage Space",
    ],
  },
  innova: {
    icon: "✨",
    image: "/innova.png",
    pricePerKm: 17,
    capacity: "6-7 Passengers",
    luggage: "4-5 Bags",
    features: ["Leather Seats", "AC", "WiFi", "Charging Ports"],
  },
  default: {
    icon: "🚘",
    image: "/hatchback.png",
    pricePerKm: 9,
    capacity: "4 Passengers",
    luggage: "2-3 Bags",
    features: ["AC", "Comfortable Seats", "Charging Ports", "Boot Space"],
  },
};

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

const STEPS = [
  {
    step: "01",
    title: "Choose Vehicle",
    desc: "Select your preferred cab according to passengers and luggage.",
  },
  {
    step: "02",
    title: "Confirm Booking",
    desc: "Share pickup location, date and travel details.",
  },
  {
    step: "03",
    title: "Enjoy Journey",
    desc: "Professional driver arrives on time for a comfortable trip.",
  },
];

const COMPARISON_FEATURES = [
  {
    feature: "Professional Drivers",
    chiku: "✓ Verified & Trained",
    other: "❌ Not always",
  },
  {
    feature: "Transparent Pricing",
    chiku: "✓ No hidden charges",
    other: "⚠️ Hidden costs",
  },
  {
    feature: "24/7 Customer Support",
    chiku: "✓ Live human support",
    other: "❌ Chat bot only",
  },
  {
    feature: "Free Cancellation",
    chiku: "✓ Up to 24 hours",
    other: "❌ Cancellation fee",
  },
  { feature: "GPS Tracking", chiku: "✓ Real-time", other: "⚠️ Sometimes" },
  {
    feature: "Clean & Sanitized",
    chiku: "✓ After every trip",
    other: "❌ Not guaranteed",
  },
];

// --- Helper Functions ---
const getVehicleDetails = (vehicle: string): VehicleDetails => {
  const lowerV = vehicle.toLowerCase();
  let baseDetails;

  if (
    lowerV.includes("tempo") ||
    lowerV.includes("traveller") ||
    lowerV.includes("bus")
  ) {
    baseDetails = VEHICLE_DETAILS_MAP.tempo;
  } else if (lowerV.includes("innova")) {
    baseDetails = VEHICLE_DETAILS_MAP.innova;
  } else {
    baseDetails = VEHICLE_DETAILS_MAP.default;
  }

  return {
    ...baseDetails,
    description: `Experience premium travel with our ${vehicle} rental service. Perfect for ${baseDetails.capacity} with ${baseDetails.luggage} capacity.`,
  };
};

const TEMPO_DATA = [
  {
    seater: 9,
    tier: "PREMIUM",
    desc: "Perfect for small family trips & executive travel",
    price: 24,
    seating: "2+2+2+3 Pushback",
    luggage: "8-10 Bags",
    best: false,
    popular: true,
  },
  {
    seater: 12,
    tier: "STANDARD",
    desc: "Ideal for medium groups & corporate outings",
    price: 25,
    seating: "3+3+3+3 Pushback",
    luggage: "12-15 Bags",
    best: true,
    popular: false,
  },
  {
    seater: 15,
    tier: "PREMIUM",
    desc: "Great for large families & group tours",
    price: 26,
    seating: "3+3+3+3+3 Pushback",
    luggage: "15-18 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 16,
    tier: "STANDARD",
    desc: "Spacious for long journeys & luggage",
    price: 26,
    seating: "4+4+4+4 Pushback",
    luggage: "18-20 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 18,
    tier: "PREMIUM",
    desc: "Perfect for big groups & destination weddings",
    price: 28,
    seating: "3+3+3+3+3+3 Pushback",
    luggage: "20-25 Bags",
    best: false,
    popular: false,
  },
  {
    seater: 20,
    tier: "LUXURY",
    desc: "Max capacity for large events & tours",
    price: 30,
    seating: "4+4+4+4+4 Pushback",
    luggage: "25-30 Bags",
    best: false,
    popular: false,
  },
];

export default function TempoTravellerTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const city = parsedData.origin || "India";
  const vehicle = parsedData.vehicle || DEFAULT_VEHICLE;
  const vehicleDetails = useMemo(() => getVehicleDetails(vehicle), [vehicle]);
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

  // Scroll handler for sticky CTA
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateFare = useCallback(() => {
    const distance = parseFloat(formData.distance);
    const DRIVER_CHARGE = 500;

    if (!isNaN(distance) && distance > 0) {
      const fare = distance * vehicleDetails.pricePerKm + DRIVER_CHARGE;
      setEstimatedPrice(fare);
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.distance, vehicleDetails.pricePerKm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Don't calculate here - let onMouseUp handle it for better UX
  };

  // Structured Data for Tempo Traveller SEO - Improved Version
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Tempo Traveller Rental Service${city !== "India" ? ` in ${city}` : ""}`,
    description: `Book 9, 12, 15, 16, 18, and 20 seater tempo traveller on rent in ${city !== "India" ? city : "India"}. Perfect for group travel, outstation trips, weddings, corporate events, and local sightseeing. All vehicles come with AC, pushback reclining seats, music system, LED TV (in most models), and dedicated luggage space. Professional drivers, 24/7 customer support, and best price guarantee.`,
    brand: {
      "@type": "Brand",
      name: "Chiku Cabs",
    },
    image: "https://chikucabs.com/tempo_traveller.png",
    category: "Ground Transportation",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "24",
      highPrice: "30",
      offerCount: 6,
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/PerKilometer",
        price: "24",
        priceCurrency: "INR",
        eligibleTransactionVolume: {
          "@type": "QuantitativeValue",
          minValue: 50,
          maxValue: 2000,
          unitCode: "KMT",
        },
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
        name: "Seating Options",
        value: "9, 12, 15, 16, 18, 20 Seater",
      },
      {
        "@type": "PropertyValue",
        name: "Vehicle Type",
        value: "Tempo Traveller",
      },
      {
        "@type": "PropertyValue",
        name: "AC",
        value: "Yes",
      },
      {
        "@type": "PropertyValue",
        name: "Pushback Reclining Seats",
        value: "Yes",
      },
      {
        "@type": "PropertyValue",
        name: "Music System",
        value: "Yes",
      },
      {
        "@type": "PropertyValue",
        name: "LED TV",
        value: "In Most Models",
      },
      {
        "@type": "PropertyValue",
        name: "Luggage Space",
        value: "Ample dedicated luggage carrier",
      },
    ],
    areaServed: {
      "@type": "City",
      name: city !== "India" ? city : "All Major Cities in India",
    },
    audience: {
      "@type": "Audience",
      name: "Group Travelers, Families, Corporate Teams, Wedding Parties, Pilgrims",
    },
    serviceType: "Tempo Traveller Rental",
    url: `https://chikucabs.com/tempo-traveller-on-rent${city !== "India" ? `-in-${city.toLowerCase().replace(/\s+/g, "-")}` : ""}`,
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: "https://chikucabs.com/yt.png",
    telephone: PHONE_NUMBER,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
    },
    priceRange:
      "₹${vehicleDetails.pricePerKm} - ₹${vehicleDetails.pricePerKm * 2}",
  };

  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation || !dropLocation || !travelDate || !travelTime) {
      toast.error("Please fill all fields");
      return;
    }

    const message = `
🚖 Fare Estimate Request

📍 Pickup: ${pickupLocation}
🎯 Drop: ${dropLocation}
📅 Date: ${travelDate}
⏰ Time: ${travelTime}
🚘 Vehicle: ${vehicle}
`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
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

  // Calculate initial fare for default 50 km with driver charge
  useEffect(() => {
    if (formData.distance === "50") {
      calculateFare(); // This already includes ₹500 driver charge
    }
  }, []); // Empty dependency array - runs once on mount

  return (
    <>
      <Head>
        <title>
          Book {vehicle} Rental | Best {vehicle} Hire Service in India | Chiku
          Cabs
        </title>
        <meta
          name="description"
          content={`Book ${vehicle} for local, outstation, and airport transfers. Best price guaranteed. Professional drivers, sanitized cars, 24/7 support. Call ${PHONE_NUMBER}.`}
        />
        <meta
          name="keywords"
          content={`${vehicle} rental, ${vehicle} hire, ${vehicle} on rent, cab booking, taxi service, outstation cabs, ${vehicle} cab, ${vehicle} taxi`}
        />
        <meta
          property="og:title"
          content={`Book ${vehicle} Rental | Best ${vehicle} Hire Service`}
        />
        <meta
          property="og:description"
          content={`Affordable ${vehicle} rental with professional drivers. Best price guarantee. Book now for local, outstation, and airport transfers.`}
        />
        <meta
          property="og:image"
          content={`https://chikucabs.com${vehicleDetails.image}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://chikucabs.com/${vehicle.toLowerCase().replace(/\s+/g, "-")}-rental`}
        />
      </Head>

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Script
        id="organization-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      <div className="bg-background min-h-screen">
        {/* Sticky CTA Bar with Promo Code */}
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
                    href={`tel:${PHONE_NUMBER}`}
                    className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                  >
                    📞 Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section - Professional Redesign */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/cab.png"
              alt="Chiku Cabs Premium Fleet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm">4.9 Rating • 1250+ Reviews</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Premium <span className="text-primary">{vehicle}</span> Rental
                  <br />
                  Starting @ ₹{vehicleDetails.pricePerKm}/km
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vehicleDetails.description} Professional drivers, sanitized
                  cars, and 24/7 support.
                </p>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    📞 Book Now
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">Best Price Guarantee</span>
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
                    <span className="text-sm">Sanitized Cars</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Booking Widget (Like Uber) */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-4">Book Your {vehicle}</h3>
                <p className="text-gray-600 mb-6">
                  Get instant confirmation & best price
                </p>

                <form className="space-y-5">
                  {/* Pickup Location */}
                  <div className="relative">
                    <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg" />

                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter Pickup Location"
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
            focus:bg-white
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
            outline-none
            transition-all duration-300"
                    />
                  </div>

                  {/* Drop Location */}
                  <div className="relative">
                    <TbTargetArrow className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg" />

                    <input
                      type="text"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      placeholder="Enter Drop Location"
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
            focus:bg-white
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
            outline-none
            transition-all duration-300"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="relative">
                      <SlCalender className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base" />

                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
              focus:bg-white
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              outline-none
              transition-all duration-300"
                      />
                    </div>

                    {/* Time */}
                    <div className="relative">
                      <FaRegClock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base" />

                      <select
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl"
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

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={handleGetEstimate}
                    className="group w-full h-14 rounded-2xl bg-primary text-white font-semibold text-lg
          shadow-lg shadow-primary/20
          hover:shadow-xl hover:shadow-primary/30
          hover:-translate-y-0.5
          active:translate-y-0
          transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get Fare Estimate
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </button>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 pt-1">
                    <span>✓ No Booking Fee</span>
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

        {/* Tempo Traveller Fleet Gallery */}
        <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto">TEMPO TRAVELLER FLEET</div>
              <h2 className="section-title">Group Travel Made Comfortable</h2>
              <p className="section-subtitle mx-auto">
                Spacious Tempo Travellers for family trips, corporate outings,
                and group adventures. Choose your perfect seater.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEMPO_DATA.map((item, i) => (
                <div
                  key={i}
                  className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${
                    item.best
                      ? "border-2 border-primary shadow-xl scale-105 z-10 bg-white"
                      : item.popular
                        ? "border border-primary/50 hover:border-primary shadow-lg"
                        : "border hover:border-primary hover:shadow-lg"
                  }`}
                >
                  {/* Badges */}
                  {item.best && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-black uppercase rounded-bl-lg">
                      Best Value
                    </div>
                  )}
                  {item.popular && !item.best && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-xs font-black uppercase rounded-bl-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Seater Badge */}
                  <div className="absolute top-4 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                    {item.seater} Seater
                  </div>

                  {/* Vehicle Icon/Emoji */}
                  <div className="text-5xl mb-4">
                    {item.seater <= 12 ? "🚐" : item.seater <= 16 ? "🚌" : "🚍"}
                  </div>

                  <div className="text-xs font-black opacity-40 mb-2 uppercase">
                    {item.tier} CHOICE
                  </div>

                  <h3 className="text-2xl font-black mb-2">
                    Tempo Traveller <br />
                    <span className="text-primary">{item.seater} Seater</span>
                  </h3>

                  <p className="text-muted-foreground text-sm mb-8">
                    {item.desc}
                  </p>

                  {/* Price */}
                  <div className="mt-auto mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black opacity-50">
                        FROM
                      </span>
                      <span className="text-5xl font-black text-primary">
                        ₹{item.price}
                      </span>
                      <span className="text-sm font-black opacity-50">
                        / KM
                      </span>
                    </div>
                    <div className="text-xs font-bold text-green-600 mt-2 italic">
                      INTERCITY BEST PRICE GUARANTEE
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-8 list-none">
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-primary text-lg">✓</span>
                      {item.seating} Comfortable Seats
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-primary text-lg">✓</span>
                      Luggage Space: {item.luggage}
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-primary text-lg">✓</span>
                      AC/Non-AC Available
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-primary text-lg">✓</span>
                      Driver + Fuel Included
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-primary text-lg">✓</span>
                      State Permit & Insurance
                    </li>
                  </ul>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className={`w-full py-4 rounded-xl font-black tracking-tight text-center block transition-all ${
                        item.best || item.popular
                          ? "btn-primary shadow-lg hover:shadow-xl"
                          : "bg-gray-800 text-white hover:bg-gray-900"
                      }`}
                    >
                      BOOK NOW
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20book%20${item.seater}%20seater%20Tempo%20Traveller`}
                      target="_blank"
                      className="w-full py-3 rounded-xl font-medium text-center block border border-green-500 text-green-600 hover:bg-green-50 transition-all"
                    >
                      💬 Get Best Deal on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Banner */}
            <div className="mt-16 bg-primary/5 rounded-2xl p-6 text-center border border-primary/20">
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎉</span>
                  <span className="text-sm font-medium">
                    Group Discount Available
                  </span>
                </div>
                <div className="w-px h-8 bg-primary/20 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  <span className="text-sm font-medium">All India Permit</span>
                </div>
                <div className="w-px h-8 bg-primary/20 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👨‍✈️</span>
                  <span className="text-sm font-medium">
                    Experienced Drivers
                  </span>
                </div>
                <div className="w-px h-8 bg-primary/20 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧼</span>
                  <span className="text-sm font-medium">
                    Sanitized Before Every Trip
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar - Professional Version */}
        <section className="pt-24 pb-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto">OUR REVIEWS</div>
              <h2 className="section-title">What Our Customers Say About Us</h2>
              <p className="section-subtitle mx-auto">
                Trusted by thousands of travelers across India. Here's what they
                have to say about their experience with Chiku Cabs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="relative inline-block">
                    <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.num}
                    </div>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                  </div>
                  <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto animate-pulse">
                ⚡ SIMPLE & FAST
              </div>
              <h2 className="section-title mt-4">
                Book Your Ride in{" "}
                <span className="gradient-text">3 Easy Steps</span>
              </h2>
              <p className="section-subtitle mx-auto mt-4">
                Experience hassle-free cab booking with our streamlined process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0">
                <div className="absolute left-1/3 right-1/3 h-full bg-primary"></div>
              </div>

              {STEPS.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Step Number Circle */}
                  <div className="relative z-10">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
                          <div className="text-4xl font-black text-black">
                            {item.step}
                          </div>
                        </div>
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 bg-primary rounded-2xl opacity-0 group-hover:opacity-20 animate-ping"></div>
                      </div>

                      {/* Step Content */}
                      <div className="mt-6 premium-card text-center group-hover:-translate-y-2 transition-all duration-300">
                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Arrow Indicator (Desktop) */}
                      {i < STEPS.length - 1 && (
                        <div className="hidden md:block absolute top-12 -right-6 text-3xl text-primary/50 group-hover:text-primary transition-colors">
                          →
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Route Calculator with Slider */}
        <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="section-badge mx-auto">CALCULATE FARE</div>
              <h2 className="section-title">Estimate Your {vehicle} Fare</h2>
              <p className="text-muted-foreground">
                Slide to select distance and get instant price estimate
              </p>
            </div>

            <div className="premium-card">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side - Slider Input */}
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold">
                        Distance (in km)
                      </label>
                      <span className="text-2xl font-black text-primary">
                        {formData.distance || 0} km
                      </span>
                    </div>

                    {/* Range Slider */}
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

                    {/* Slider Markers */}
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>0 km</span>
                      <span>500 km</span>
                      <span>1000 km</span>
                      <span>1500 km</span>
                      <span>2000 km</span>
                    </div>
                  </div>

                  {/* Quick Select Buttons - Driver charge included silently */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {[50, 100, 250, 500, 750, 1000].map((dist) => (
                      <button
                        key={dist}
                        onClick={() => {
                          // Update distance
                          setFormData((prev) => ({
                            ...prev,
                            distance: dist.toString(),
                          }));
                          // Calculate fare WITH driver charge (hidden)
                          const DRIVER_CHARGE = 500;
                          const newPrice =
                            dist * vehicleDetails.pricePerKm + DRIVER_CHARGE;
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

                  {/* Distance Info Note */}
                  <div className="mt-4 text-xs text-muted-foreground text-center bg-muted/30 p-3 rounded-lg">
                    <span className="font-semibold">Tip:</span> For distances
                    above 2000 km, additional charges apply at ₹
                    {vehicleDetails.pricePerKm}/km
                  </div>
                </div>

                {/* Right Side - Price Display (No driver charge visible) */}
                <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                  {/* Estimated Distance */}
                  <div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                      ESTIMATED DISTANCE
                    </p>
                    <div className="text-5xl md:text-6xl font-black text-primary">
                      {formData.distance
                        ? `${Number(formData.distance).toLocaleString()}`
                        : "---"}
                    </div>
                    <div className="text-xl font-semibold text-primary/70">
                      KM
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-5"></div>

                  {/* Your Estimated Fare - Clean, no breakdown */}
                  <div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                      YOUR ESTIMATED FARE
                    </p>
                    <div className="text-5xl md:text-7xl font-black text-primary">
                      {estimatedPrice
                        ? `₹${estimatedPrice.toLocaleString()}`
                        : "---"}
                    </div>
                  </div>

                  {/* Fixed Badge - Keep it simple */}
                  <div className="mt-4">
                    <span className="inline-block bg-primary/10 px-4 py-1.5 rounded-full">
                      <p className="text-xs font-bold text-primary tracking-wide">
                        * ONE WAY PRICE
                      </p>
                    </span>
                  </div>

                  {/* Distance Range Indicators */}
                  <div className="flex justify-between items-center mt-5 px-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-muted-foreground">
                        MIN
                      </div>
                      <div className="text-lg font-black">50 KM</div>
                    </div>
                    <div className="text-primary text-xl">→</div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-muted-foreground">
                        MAX
                      </div>
                      <div className="text-lg font-black">2000 KM</div>
                    </div>
                  </div>

                  {/* Footer Note - Keep generic */}
                  <p className="text-xs text-muted-foreground mt-5 pt-3 border-t border-border">
                    *Includes all taxes & driver allowance | No hidden charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Comparison - Modern UI with React Icons */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaCar className="text-primary text-sm" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  COMPARE VEHICLES
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Choose Your <span className="gradient-text">Perfect Ride</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Compare our fleet and find the perfect vehicle for your journey
              </p>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {[
                {
                  name: "Hatchback",
                  price: "9",
                  capacity: "4",
                  luggage: "2-3",
                  ac: true,
                  wifi: false,
                  charging: true,
                  bestFor: "Budget Travel",
                  popular: false,
                  icon: <FaCar />,
                },
                {
                  name: "Sedan",
                  price: "11",
                  capacity: "4",
                  luggage: "3-4",
                  ac: true,
                  wifi: true,
                  charging: true,
                  bestFor: "Corporate & Family",
                  popular: true,
                  icon: <FaCarSide />,
                },
                {
                  name: "Innova",
                  price: "17",
                  capacity: "6-7",
                  luggage: "5-6",
                  ac: true,
                  wifi: true,
                  charging: true,
                  bestFor: "Luxury Travel",
                  popular: false,
                  icon: <FaCaravan />,
                },
                {
                  name: "Tempo Traveller",
                  price: "19",
                  capacity: "9-12",
                  luggage: "10-12",
                  ac: true,
                  wifi: true,
                  charging: true,
                  bestFor: "Group Tours",
                  popular: false,
                  icon: <FaBus />,
                },
              ].map((vehicle, idx) => (
                <div
                  key={idx}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg border ${vehicle.popular ? "border-primary shadow-xl" : "border-gray-100"}`}
                >
                  {vehicle.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-black px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-xs" />
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${vehicle.popular ? "bg-gradient-to-r from-primary to-secondary text-white" : "bg-primary/10 text-primary"}`}
                    >
                      {vehicle.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{vehicle.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-primary">
                          ₹{vehicle.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /km
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaUsers className="text-primary text-xs" /> Capacity
                      </span>
                      <span className="font-semibold">
                        {vehicle.capacity} Persons
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaSuitcase className="text-primary text-xs" /> Luggage
                      </span>
                      <span className="font-semibold">
                        {vehicle.luggage} Bags
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaMicrochip className="text-primary text-xs" />{" "}
                        Features
                      </span>
                      <div className="flex gap-2">
                        {vehicle.ac && (
                          <FaSnowflake
                            className="text-blue-500 text-sm"
                            title="AC"
                          />
                        )}
                        {vehicle.wifi && (
                          <FaWifi
                            className="text-green-500 text-sm"
                            title="WiFi"
                          />
                        )}
                        {vehicle.charging && (
                          <FaBatteryFull
                            className="text-yellow-500 text-sm"
                            title="Charging Ports"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaMedal className="text-primary text-xs" /> Best For
                      </span>
                      <span
                        className={`text-sm font-bold ${vehicle.popular ? "text-primary" : ""}`}
                      >
                        {vehicle.bestFor}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View - PERFECT THEAD ALIGNMENT */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                    <th className="p-5 text-left text-white font-bold text-base w-48 rounded-tl-2xl">
                      <div className="flex items-center gap-2">
                        <FaList className="text-primary text-lg" />
                        <span>Features</span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaCar className="text-xl" />
                          <span>Hatchback</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Economy
                        </span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base relative">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaCarSide className="text-xl" />
                          <span>Sedan</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Popular Choice
                        </span>
                      </div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 whitespace-nowrap shadow-md z-10">
                        <FaStar className="text-xs text-yellow-700" /> Most
                        Popular
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaCaravan className="text-xl" />
                          <span>Innova</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Luxury
                        </span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base rounded-tr-2xl">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaBus className="text-xl" />
                          <span>Tempo Traveller</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Group
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Price per km */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        Price per km
                      </div>
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700">
                      ₹9
                    </td>
                    <td className="p-5 text-center bg-primary/5 font-extrabold text-primary text-lg">
                      ₹12
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700">
                      ₹17
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700">
                      ₹19
                    </td>
                  </tr>

                  {/* Capacity */}
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-gray-100 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-primary" />
                        Capacity
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaUser className="text-gray-500 text-sm" /> 4 Persons
                      </div>
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <div className="flex items-center justify-center gap-1">
                        <FaUser className="text-primary text-sm" /> 4 Persons
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaUser className="text-gray-500 text-sm" /> 6-7 Persons
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaUsers className="text-gray-500 text-sm" /> 9-12
                        Persons
                      </div>
                    </td>
                  </tr>

                  {/* Luggage Capacity */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <FaSuitcase className="text-primary" />
                        Luggage Capacity
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaSuitcase className="text-gray-400 text-xs" /> 2-3
                        Bags
                      </div>
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <div className="flex items-center justify-center gap-1 font-semibold">
                        <FaSuitcase className="text-primary text-xs" /> 3-4 Bags
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaSuitcase className="text-gray-400 text-xs" /> 5-6
                        Bags
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaSuitcase className="text-gray-400 text-xs" /> 10-12
                        Bags
                      </div>
                    </td>
                  </tr>

                  {/* AC */}
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-gray-100 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaSnowflake className="text-primary" />
                        Air Conditioning
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                  </tr>

                  {/* WiFi */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <FaWifi className="text-primary" />
                        WiFi Connectivity
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <FaTimesCircle className="text-red-400 inline text-xl" />
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                  </tr>

                  {/* Charging Ports */}
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-gray-100 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaBatteryFull className="text-primary" />
                        USB / Charging Ports
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                  </tr>

                  {/* Best For */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50 rounded-bl-2xl">
                      <div className="flex items-center gap-2">
                        <FaMedal className="text-primary" />
                        Best For
                      </div>
                    </td>
                    <td className="p-5 text-center text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <FaWallet className="text-gray-500 text-sm" /> Budget
                        Travel
                      </div>
                    </td>
                    <td className="p-5 text-center bg-primary/5 font-bold text-primary text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <FaBriefcase className="text-primary text-sm" />{" "}
                        Corporate & Family
                      </div>
                    </td>
                    <td className="p-5 text-center text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <FaGem className="text-gray-500 text-sm" /> Luxury
                        Travel
                      </div>
                    </td>
                    <td className="p-5 text-center text-sm rounded-br-2xl">
                      <div className="flex items-center justify-center gap-1">
                        <FaUsers className="text-gray-500 text-sm" /> Group
                        Tours
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation Note */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <FaRegLightbulb className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Not sure which vehicle to choose?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Our experts can help you find the perfect ride for your
                      needs
                    </p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition shadow-md">
                  Get Expert Advice
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us vs Competitors - Modern UI with React Icons */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  WHY WE'RE BETTER
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Chiku Cabs <span className="gradient-text">vs</span> Others
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See why thousands of customers choose us over traditional cab
                services
              </p>
            </div>

            {/* Comparison Cards - Mobile Friendly */}
            <div className="lg:hidden space-y-4">
              {COMPARISON_FEATURES.map((row, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                >
                  <div className="font-bold text-lg mb-4 pb-2 border-b border-gray-100">
                    {row.feature}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <FaCarSide className="text-primary text-sm" />
                        </div>
                        <span className="font-semibold">Chiku Cabs</span>
                      </div>
                      <div className="text-green-600 font-medium">
                        {row.chiku}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaCarSide className="text-gray-500 text-sm" />
                        </div>
                        <span className="font-semibold text-gray-500">
                          Others
                        </span>
                      </div>
                      <div className="text-red-500 font-medium">
                        {row.other}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="p-6 text-left bg-gray-900 rounded-tl-2xl text-white font-bold text-lg">
                      Features
                    </th>
                    <th className="p-6 text-center bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-lg">
                      <div className="flex items-center justify-center gap-2 text-[#BE1E23]">
                        <FaCarSide className="text-xl" />
                        Chiku Cabs
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                          Winner
                        </span>
                      </div>
                    </th>
                    <th className="p-6 text-center bg-gray-800 rounded-tr-2xl text-white font-bold text-lg">
                      Other Services
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((row, i) => {
                    // Icon mapping for features
                    const getFeatureIcon = (feature: string) => {
                      switch (feature) {
                        case "Professional Drivers":
                          return <FaUserTie className="text-primary text-lg" />;
                        case "Transparent Pricing":
                          return <FaWallet className="text-primary text-lg" />;
                        case "24/7 Customer Support":
                          return <FaHeadset className="text-primary text-lg" />;
                        case "Free Cancellation":
                          return <FaSyncAlt className="text-primary text-lg" />;
                        case "GPS Tracking":
                          return (
                            <FaMapMarkerAlt className="text-primary text-lg" />
                          );
                        case "Clean & Sanitized":
                          return (
                            <FaSprayCan className="text-primary text-lg" />
                          );
                        default:
                          return (
                            <FaCheckCircle className="text-primary text-lg" />
                          );
                      }
                    };

                    return (
                      <tr
                        key={i}
                        className={`transition-all duration-300 hover:shadow-lg ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="p-5 font-bold text-gray-800 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            {getFeatureIcon(row.feature)}
                            <span>{row.feature}</span>
                          </div>
                        </td>
                        <td className="p-5 text-center border-b border-gray-100 bg-primary/5">
                          <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                            <span className="text-green-600 font-bold">
                              {row.chiku}
                            </span>
                            <FaCheckCircle className="text-green-600 text-sm" />
                          </div>
                        </td>
                        <td className="p-5 text-center border-b border-gray-100">
                          <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
                            <FaTimesCircle className="text-red-500 text-sm" />
                            <span className="text-red-500 font-medium">
                              {row.other}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full flex-wrap justify-center">
                <div className="flex text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="fill-current" />
                  ))}
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <span className="font-bold text-primary">
                  Trusted by 50,000+ Customers
                </span>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <FaChartLine className="text-green-500" /> 4.9/5 Rating
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities - Modern Redesign */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <span className="text-primary text-lg">✨</span>
                <span className="section-badge !inline-block !mx-0">
                  PREMIUM AMENITIES
                </span>
              </div>
              <h2 className="section-title mb-4">
                What's Inside Our Tempo Travellers
                {city !== "India" ? ` in ${city}` : ""}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience comfort, convenience, and luxury with our
                thoughtfully equipped fleet
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: "❄️",
                  title: "Powerful AC",
                  desc: "High-capacity air conditioning that keeps the entire cabin cool even in peak summer.",
                  gradient: "from-blue-500/10 to-cyan-500/10",
                  color: "blue",
                },
                {
                  icon: "💺",
                  title: "Pushback Reclining Seats",
                  desc: "Comfortable reclining seats with individual armrests for long journeys.",
                  gradient: "from-purple-500/10 to-pink-500/10",
                  color: "purple",
                },
                {
                  icon: "🎵",
                  title: "Music & Entertainment",
                  desc: "Bluetooth-enabled music system with speakers throughout the cabin.",
                  gradient: "from-green-500/10 to-emerald-500/10",
                  color: "green",
                },
                {
                  icon: "🧳",
                  title: "Spacious Luggage",
                  desc: "Dedicated luggage space and overhead carrier to store all your bags safely.",
                  gradient: "from-orange-500/10 to-amber-500/10",
                  color: "orange",
                },
                {
                  icon: "🔌",
                  title: "Charging Points",
                  desc: "USB and mobile charging points at every seat row to keep devices powered.",
                  gradient: "from-indigo-500/10 to-violet-500/10",
                  color: "indigo",
                },
                {
                  icon: "🪟",
                  title: "Large Windows",
                  desc: "Wide windows with curtains for scenic views and privacy during travel.",
                  gradient: "from-teal-500/10 to-cyan-500/10",
                  color: "teal",
                },
              ].map((amenity, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${amenity.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Icon with Animation */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{amenity.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {amenity.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {amenity.desc}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases - Modern Grid Layout */}
        <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <span className="text-primary text-lg">🎯</span>
                <span className="text-sm font-bold text-primary tracking-wide">
                  USE CASES
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Perfect for Every{" "}
                <span className="text-primary">Group Occasion</span>
                {city !== "India" ? ` in ${city}` : ""}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                From spiritual journeys to corporate retreats, we've got you
                covered
              </p>
              <div className="w-20 h-1 bg-primary/30 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🕉️",
                  title: "Pilgrimages",
                  desc: "Char Dham, Vaishno Devi, Golden Temple, Tirupati & more",
                  color: "from-orange-500/10 to-red-500/10",
                  borderColor: "border-orange-200",
                  iconBg: "bg-orange-100",
                  stat: "500+ Trips",
                },
                {
                  icon: "💒",
                  title: "Weddings",
                  desc: "Baarat pickup, guest transfers, family travel & destination weddings",
                  color: "from-pink-500/10 to-rose-500/10",
                  borderColor: "border-pink-200",
                  iconBg: "bg-pink-100",
                  stat: "200+ Weddings",
                },
                {
                  icon: "🏔️",
                  title: "Hill Stations",
                  desc: "Manali, Shimla, Nainital, Mussoorie, Munnar & Ooty",
                  color: "from-blue-500/10 to-cyan-500/10",
                  borderColor: "border-blue-200",
                  iconBg: "bg-blue-100",
                  stat: "1000+ Trips",
                },
                {
                  icon: "🏢",
                  title: "Corporate Outings",
                  desc: "Team building, offsites, annual retreats & conference transfers",
                  color: "from-indigo-500/10 to-purple-500/10",
                  borderColor: "border-indigo-200",
                  iconBg: "bg-indigo-100",
                  stat: "300+ Events",
                },
                {
                  icon: "🎓",
                  title: "School/College Trips",
                  desc: "Educational tours, sports events, picnics & excursion",
                  color: "from-green-500/10 to-emerald-500/10",
                  borderColor: "border-green-200",
                  iconBg: "bg-green-100",
                  stat: "150+ Trips",
                },
                {
                  icon: "✈️",
                  title: "Airport Transfers",
                  desc: "Large group airport pickups, drops & flight tracking included",
                  color: "from-purple-500/10 to-violet-500/10",
                  borderColor: "border-purple-200",
                  iconBg: "bg-purple-100",
                  stat: "24/7 Service",
                },
              ].map((useCase, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer"
                >
                  {/* Hover Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    {/* Icon with Animation */}
                    <div
                      className={`w-16 h-16 rounded-2xl ${useCase.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-3xl">{useCase.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {useCase.desc}
                    </p>

                    {/* Stat Badge */}
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                      <span className="text-primary">✓</span>
                      {useCase.stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Banner */}
            <div className="mt-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 text-center">
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span className="font-semibold">10,000+ Happy Groups</span>
                </div>
                <div className="w-px h-6 bg-primary/20 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">
                    4.9 Rating (2000+ Reviews)
                  </span>
                </div>
                <div className="w-px h-6 bg-primary/20 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚐</span>
                  <span className="font-semibold">
                    50+ Tempo Travellers Fleet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                CUSTOMER REVIEWS
              </div>
              <h2 className="section-title">
                What Group Travelers in {city !== "India" ? city : "India"} Say
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Vikram & Family",
                  text: "Booked a 16 seater for our Char Dham Yatra. The tempo was brand new with pushback seats. Driver was experienced with hill roads. Amazing trip!",
                  rating: "★★★★★",
                },
                {
                  name: "Rahul (Corporate)",
                  text: "Used Chiku Cabs for our office team outing of 20 people. The 20-seater tempo was clean, spacious, and the driver was very courteous. Will use again!",
                  rating: "★★★★★",
                },
                {
                  name: "Priya Wedding Group",
                  text: "Booked 2 tempo travellers for our wedding guest transfers. Both arrived on time, well-decorated, and the drivers handled everything professionally.",
                  rating: "★★★★★",
                },
              ].map((review, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-stars">{review.rating}</div>
                  <p className="testimonial-text">"{review.text}"</p>
                  <div className="testimonial-author">{review.name}</div>
                  <div className="testimonial-route">
                    Tempo Traveller Service
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-24 border-y px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                FAQ
              </div>
              <h2 className="section-title">
                Tempo Traveller Rental Questions{" "}
                {city !== "India" ? `for ${city}` : ""}
              </h2>
            </div>
            {[
              {
                q: `What seating options are available for tempo traveller on rent in ${city}?`,
                a: `We offer 9 seater, 12 seater, 15 seater, 16 seater, 18 seater, and 20 seater tempo traveller on rent in ${city}. All options come with AC, pushback reclining seats, and ample luggage space.`,
              },
              {
                q: `How much does a tempo traveller booking cost per day in ${city}?`,
                a: `Pricing for tempo traveller booking in ${city} starts from ₹24/km. Total cost depends on distance, duration, and the seating capacity you choose.`,
              },
              {
                q: `Are the vehicles well-maintained for outstation tempo traveller trips?`,
                a: `Yes! Our entire outstation tempo traveller fleet in ${city} is regularly serviced and deeply sanitized to provide a premium group travel service.`,
              },
              {
                q: `Can I book a tempo traveller on rent for a one-way trip from ${city}?`,
                a: `Yes, we offer specialized one-way tempo traveller booking from ${city} to various destinations at special reduced rates for group travel service.`,
              },
              {
                q: `Is the driver experienced with outstation tempo traveller routes?`,
                a: `Absolutely. Every driver for our outstation tempo traveller service in ${city} is specifically trained for long-distance and mountain road driving.`,
              },
              {
                q: `Do you provide tempo traveller on rent for local sightseeing in ${city}?`,
                a: `Yes, our local tempo traveller on rent packages in ${city} are perfect for family outings, corporate groups, and local city tours.`,
              },
              {
                q: `What are the amenities included in your tempo traveller booking?`,
                a: `Every tempo traveller booking includes high-quality AC, a music system, LED TV (in most models), pushback seats, and a dedicated luggage carrier.`,
              },
              {
                q: `Is it possible to hire a tempo traveller on rent for a wedding in ${city}?`,
                a: `Yes, we specialize in tempo traveller booking for weddings in ${city}, providing guest transfers and luxury travel for the bridal party.`,
              },
              {
                q: `How can I calculate the per km rate for tempo traveller booking?`,
                a: `The per km rate for tempo traveller booking starts at ₹24. Use our app or call 8448445504 for a transparent quote for your ${city} itinerary.`,
              },
              {
                q: `Are there any night charges for outstation tempo traveller service?`,
                a: `Our outstation tempo traveller service includes night charges in the package, ensuring a stress-free and transparent tempo traveller booking experience.`,
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

        {/* Trust Badges */}
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

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to Book Your Tempo Traveller?
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call now for the best group travel rates. Instant confirmation
              guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-10 py-4 shadow-2xl"
              >
                📞 Call 8448445504
              </a>
              <a
                href="https://wa.me/918448445504"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Popular Routes Section */}
        {city !== "India" && (
          <section className="py-24 px-4 bg-muted/20 border-y">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div
                  className="section-badge mx-auto"
                  style={{ display: "inline-flex" }}
                >
                  POPULAR ROUTES
                </div>

                <h2 className="section-title">
                  Popular Tempo Traveller Routes from {city}
                </h2>

                <p className="section-subtitle mx-auto">
                  Explore the most booked outstation tempo traveller routes.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(
                  cityRoutes[city?.toLowerCase() as keyof typeof cityRoutes] ||
                  []
                ).map((destination, i) => (
                  <Link
                    key={i}
                    href={`/${city.toLowerCase()}/tempo-traveller-hire-${city.toLowerCase()}-to-${destination
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="group rounded-3xl border bg-card p-6 hover:border-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">🚐</div>

                      <span className="text-primary text-sm font-bold">
                        Popular
                      </span>
                    </div>

                    <h3 className="text-xl font-black mb-2">
                      {city} to {destination}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Book tempo traveller from {city} to {destination}.
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-primary font-bold">
                        View Route →
                      </span>

                      <span className="text-xs text-muted-foreground">
                        Starting ₹18/km
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SEO Content Section */}
        {city !== "India" && (
          <section className="py-24 px-4 bg-muted/10 border-t">
            <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
              <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
                Hire the Best Tempo Traveller in {city}
              </h2>
              <div className="space-y-6">
                <p>
                  Are you planning a group trip from <strong>{city}</strong>?
                  Whether for a wedding or corporate offsite, hiring a{" "}
                  <strong>tempo traveller on rent in {city}</strong> is the most
                  comfortable choice. Chiku Cabs offers premium{" "}
                  <strong>tempo traveller booking</strong> for 12 to 26-seater
                  vehicles, ensuring a reliable{" "}
                  <strong>group travel service</strong> for all your{" "}
                  <strong>outstation tempo traveller</strong> needs.
                </p>
                <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                  Top Uses for Tempo Traveller Rentals in {city}
                </h3>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">✔</span>
                    <span>
                      <strong>Local Sightseeing in {city}:</strong> Explore
                      tourist attractions comfortably with our{" "}
                      <strong>local tempo traveller service</strong> specialized
                      for groups.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">✔</span>
                    <span>
                      <strong>Outstation tempo traveller from {city}:</strong>{" "}
                      Plan weekend getaways securely with our verified
                      commercial <strong>tempo traveller service</strong>{" "}
                      drivers.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">✔</span>
                    <span>
                      <strong>{city} Airport Taxi:</strong> Need to transfer a
                      large group? Our <strong>airport transfer</strong> service
                      with spacious luggage carriers has you covered.
                    </span>
                  </li>
                </ul>
                <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                  <p className="mb-0 text-card-foreground">
                    Booking your{" "}
                    <strong>tempo traveller on rent in {city}</strong> is easy
                    via our <strong>tempo traveller booking</strong> app. We
                    offer 100% transparent pricing for both local and{" "}
                    <strong>outstation tempo traveller</strong> trips from{" "}
                    {city}.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <EEATSection
          city={city !== "India" ? city : undefined}
          vehicle="Tempo Traveller"
        />
      </div>
    </>
  );
}
