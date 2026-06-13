"use client";

import Head from "next/head";
import {
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageCircle,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaCar,
  FaUserCheck,
  FaSuitcase,
  FaRoad,
  FaShieldAlt,
  FaHeadset,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCarSide,
  FaCaravan,
  FaBus,
  FaUsers,
  FaMicrochip,
  FaSnowflake,
  FaBatteryFull,
  FaMedal,
  FaStar,
  FaWifi,
  FaList,
  FaMoneyBillWave,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
  FaBriefcase,
  FaGem,
  FaRegLightbulb,
  FaUserTie,
  FaSyncAlt,
  FaSprayCan,
  FaChartLine,
} from "react-icons/fa";
import { MdFlightTakeoff, MdSupportAgent } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";
import { BsCashStack } from "react-icons/bs";
import EEATSection from "../shared/EEATSection";
import { ParsedRouteData } from "@/lib/urlParser";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { CiClock1 } from "react-icons/ci";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import Script from "next/script";

interface FleetItem {
  tier: string;
  car: string;
  price: string;
  image: string;
  desc: string;
  best: boolean;
  capacity: string;
}

interface StatItem {
  num: string;
  label: string;
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

interface CityService {
  name: string;
  services: string[];
}

// --- Constants ---
interface BookingFormData {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  distance: string;
}

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

const FEATURES = [
  {
    icon: "✈️",
    title: "Free Flight Tracking",
    desc: "Real-time flight monitoring with automatic pickup adjustment. No extra charges for delays or early arrivals.",
  },
  {
    icon: "💰",
    title: "Fixed Transparent Pricing",
    desc: "No surge pricing, no hidden charges. Get exact fare before booking. What you see is what you pay.",
  },
  {
    icon: "👨‍✈️",
    title: "Verified Professional Drivers",
    desc: "Background-verified, trained drivers with 500+ successful airport trips. Your safety is our priority.",
  },
  {
    icon: "🕐",
    title: "24/7 Availability",
    desc: "Round-the-clock service for early morning flights, late arrivals, and everything in between. 365 days a year.",
  },
  {
    icon: "🧼",
    title: "Clean & Sanitized Fleet",
    desc: "Every vehicle deep cleaned, sanitized, and inspected before each airport trip.",
  },
  {
    icon: "🎧",
    title: "Instant Customer Support",
    desc: "24x7 dedicated support team via call or WhatsApp for immediate assistance.",
  },
  {
    icon: "🚗",
    title: "Diverse Fleet Options",
    desc: "Choose from Hatchback, Sedan, SUV, Innova, Tempo Traveller, or Luxury cars.",
  },
  {
    icon: "🤝",
    title: "Meet & Greet Service",
    desc: "Driver waits at arrivals with name board, helps with luggage, and escorts you to vehicle.",
  },
  {
    icon: "📍",
    title: "Live Trip Tracking",
    desc: "Share live location with family. Receive driver details and real-time WhatsApp updates.",
  },
  {
    icon: "🛄",
    title: "Luggage Assistance",
    desc: "Drivers help load and unload luggage at pickup and drop locations.",
  },
  {
    icon: "✅",
    title: "Free Cancellation",
    desc: "Cancel free up to 2 hours before pickup. Flexible policy for flight changes.",
  },
  {
    icon: "🔒",
    title: "Safe & Secure Rides",
    desc: "GPS-tracked rides, emergency buttons, and 24/7 safety monitoring.",
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

const CITIES: CityService[] = [
  { name: "Delhi", services: ["Local", "Airport", "Outstation"] },
  { name: "Noida", services: ["Local", "Airport", "Outstation"] },
  { name: "Gurgaon", services: ["Local", "Airport", "Outstation"] },
  { name: "Agra", services: ["Local", "Airport", "Outstation"] },
  { name: "Jaipur", services: ["Local", "Airport", "Outstation"] },
  { name: "Lucknow", services: ["Local", "Airport", "Outstation"] },
  { name: "Chandigarh", services: ["Local", "Airport", "Outstation"] },
  { name: "Varanasi", services: ["Local", "Airport", "Outstation"] },
];

export default function AirportTaxiTemplate({
  parsedData,
}: {
  parsedData?: ParsedRouteData;
}) {
  const vehicle = parsedData?.vehicle || DEFAULT_VEHICLE;
  const vehicleDetails = useMemo(() => getVehicleDetails(vehicle), [vehicle]);
  const [formData, setFormData] = useState<BookingFormData>({
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

  const FLEET_DATA: FleetItem[] = [
    {
      tier: "STANDARD",
      car: "Hatchback",
      price: "9",
      image: "/hatchback.png",
      desc: "Swift, WagonR or similar",
      best: false,
      capacity: "4 Passengers",
    },
    {
      tier: "POPULAR",
      car: "Sedan",
      price: "11",
      image: "/sedan.png",
      desc: "Dzire, Ertiga or similar",
      best: true,
      capacity: "4 Passengers",
    },
    {
      tier: "LUXURY",
      car: "Innova",
      price: "17",
      image: "/innova.png",
      desc: "Innova Crysta, Force Urbania",
      best: false,
      capacity: "6-7 Passengers",
    },
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "Chiku Cabs Airport Taxi Service",
    description:
      "24x7 airport taxi service for Delhi IGI Airport pickup and drop. Professional drivers, fixed pricing, flight tracking, and instant booking.",
    image: "https://chikucabs.com/cab.png",
    telephone: "+918448445504",
    priceRange: "₹9 - ₹25 per km",
    areaServed: {
      "@type": "City",
      name: "Delhi NCR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Airport Taxi Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Pickup Service",
          },
          price: "800",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Drop Service",
          },
          price: "800",
          priceCurrency: "INR",
        },
      ],
    },
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
          Airport Taxi Service Delhi | 24x7 Airport Pickup & Drop | Chiku Cabs
        </title>
        <meta
          name="description"
          content="Book reliable airport taxi service for Delhi IGI Airport pickup & drop. Professional drivers, fixed pricing, flight tracking, 24x7 support. Call +91-8448445504 for instant booking."
        />
        <meta
          name="keywords"
          content="airport taxi service, delhi airport taxi, airport pickup, airport drop, IGI taxi, taxi to Noida from airport, taxi to Gurgaon from airport"
        />
        <meta name="author" content="Chiku Cabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Airport Taxi Service Delhi | 24x7 Airport Pickup & Drop"
        />
        <meta
          property="og:description"
          content="Professional airport transfer service with fixed pricing and flight tracking. Call now for instant booking."
        />
        <meta property="og:image" content="/cab-og-image.jpg" />
        <meta property="og:url" content="https://chikucabs.com/airport-taxi" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Airport Taxi Service Delhi | Chiku Cabs"
        />
        <meta
          name="twitter:description"
          content="24x7 airport taxi service with professional drivers and fixed pricing."
        />
        <meta name="twitter:image" content="/cab-twitter-image.jpg" />
        <link rel="canonical" href="https://chikucabs.com/airport-taxi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
                  We Track Your Flight.
                  <br />
                  <span className="text-primary">You Just Relax.</span>
                  <br />
                  Starting @ ₹{vehicleDetails.pricePerKm}/km
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  We monitor your flight in real-time and adjust pickup
                  accordingly. Free 60-minute waiting period. Professional
                  drivers, sanitized {vehicle}s, and 24/7 support.
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

        {/* Fleet Gallery */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <MdFlightTakeoff className="w-4 h-4" />
                24/7 AIRPORT TAXI SERVICE
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Delhi Airport Taxi - Pickup & Drop
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Book reliable airport taxi service for IGI Airport with
                professional drivers, fixed pricing, and flight tracking.
                Available 24x7 for all terminals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {FLEET_DATA.map((item, i) => (
                <div
                  key={i}
                  className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${
                    item.best
                      ? "border border-primary shadow-xl scale-105 z-10 bg-white"
                      : "border hover:border-primary hover:shadow-lg"
                  }`}
                >
                  {item.best && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-black uppercase rounded-bl-lg">
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
                  <div className="mt-auto mb-10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black opacity-50">
                        FROM
                      </span>
                      <span className="text-5xl font-black">₹{item.price}</span>
                      <span className="text-sm font-black opacity-50">
                        / KM
                      </span>
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
                        <span className="text-primary text-xl">✓</span>{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className={`w-full py-4 rounded-xl font-black tracking-tight text-center transition-all ${
                      item.best
                        ? "btn-primary shadow-lg"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    BOOK NOW
                  </a>
                </div>
              ))}
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

        {/* Why Choose Us */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <HiOutlineSparkles className="w-4 h-4" />
                WHY CHOOSE US
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Airport Taxi Service?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enjoy reliable airport transfers with professional drivers,
                fixed pricing, flight tracking, and 24x7 customer support.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <TbClock24 className="w-6 h-6" />,
                  text: "24x7 Availability",
                  desc: "Round the clock service",
                },
                {
                  icon: <BsCashStack className="w-6 h-6" />,
                  text: "Fixed Pricing",
                  desc: "No hidden charges",
                },
                {
                  icon: <FaUserCheck className="w-6 h-6" />,
                  text: "Verified Drivers",
                  desc: "Background checked",
                },
                {
                  icon: <MdFlightTakeoff className="w-6 h-6" />,
                  text: "Flight Tracking",
                  desc: "Real-time updates",
                },
                {
                  icon: <FiClock className="w-6 h-6" />,
                  text: "On-Time Pickup",
                  desc: "Never keep you waiting",
                },
                {
                  icon: <FaCar className="w-6 h-6" />,
                  text: "Clean Vehicles",
                  desc: "Sanitized & hygienic",
                },
                {
                  icon: <FiPhone className="w-6 h-6" />,
                  text: "Instant Booking",
                  desc: "Confirm in minutes",
                },
                {
                  icon: <MdSupportAgent className="w-6 h-6" />,
                  text: "Customer Support",
                  desc: "24x7 assistance",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.text}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Airport Pickup Features */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <HiOutlineSparkles className="w-4 h-4" />
                PREMIUM FEATURES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Airport Pickup & Drop Features
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience hassle-free airport transfers with real-time flight
                tracking, luggage assistance, and meet & greet services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <MdFlightTakeoff className="w-6 h-6" />,
                  text: "Flight Tracking",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: <FaUserCheck className="w-6 h-6" />,
                  text: "Meet & Greet",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: <FiMapPin className="w-6 h-6" />,
                  text: "Name Board Service",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: <FaSuitcase className="w-6 h-6" />,
                  text: "Luggage Assistance",
                  color: "from-orange-500 to-orange-600",
                },
                {
                  icon: <FiMessageCircle className="w-6 h-6" />,
                  text: "Live Driver Updates",
                  color: "from-teal-500 to-teal-600",
                },
                {
                  icon: <MdSupportAgent className="w-6 h-6" />,
                  text: "24x7 Assistance",
                  color: "from-red-500 to-red-600",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="group bg-white rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {item.text}
                  </span>
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

        {/* Service Areas Section - Clean Version */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  COVERAGE AREAS
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Airport Taxi Service Available In
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pickup and drop service for Delhi IGI Airport from all these
                locations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {CITIES.map((city) => (
                <div key={city.name} className="premium-card text-center">
                  <h3 className="font-bold text-lg">{city.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {city.services.join(" • ")}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="text-center mt-10">
              <p className="text-gray-500">
                Need airport taxi from another city?{" "}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-primary font-bold hover:underline"
                >
                  Call us now
                </a>
              </p>
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
                  price: "12",
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

        {/* Why Chiku Cabs - Airport Taxi Specialized Features */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-primary/5">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaShieldAlt className="text-primary text-sm" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  WHY CHIKU CABS
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Delhi NCR's{" "}
                <span className="gradient-text">
                  Most Reliable Airport Taxi
                </span>{" "}
                Service
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience stress-free airport transfers with our premium
                features and customer-first approach
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon with Animation */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <span className="text-white text-2xl">
                        {feature.icon}
                      </span>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.desc}
                  </p>

                  {/* Hover Underline Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>

            {/* Airport-Specific Bottom CTA */}
            <div className="text-center mt-12">
              <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border-2 border-white">
                    ✈️
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border-2 border-white">
                    🚕
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border-2 border-white">
                    ⭐
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Trusted by{" "}
                  <span className="text-primary font-bold">50,000+</span>{" "}
                  airport travelers
                </span>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★★ <span className="text-gray-600 ml-1">4.9</span>
                </div>
                <FaArrowRight className="text-primary text-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-bold text-sm uppercase">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                What Our Customers Say
              </h2>
              <div className="flex justify-center items-center gap-2 mt-4">
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                <span className="font-bold">4.9</span>
                <span className="text-gray-600">(2,350+ reviews)</span>
              </div>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Trusted by thousands of travelers for reliable airport transfers
                across Delhi NCR
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Khanna",
                  location: "Business Traveler, Mumbai",
                  text: "Booked an airport pickup from Delhi IGI at 2 AM. The driver was already waiting with a name board when my flight landed. Smooth experience, clean car, and very professional service. Will definitely use again!",
                  rating: "★★★★★",
                  type: "Airport Pickup",
                },
                {
                  name: "Neha Sharma",
                  location: "Frequent Flyer, Delhi",
                  text: "Chiku Cabs has been my go-to for airport transfers for over a year. The flight tracking feature is amazing - they adjusted my pickup when my flight was delayed. Cars are always spotless and drivers are courteous.",
                  rating: "★★★★★",
                  type: "Airport Drop",
                },
                {
                  name: "Amit Verma",
                  location: "Family Traveler, Noida",
                  text: "Booked an Innova for my family from Delhi Airport to Noida. The vehicle was spacious and clean, driver helped with all our luggage. Very reasonable pricing compared to other services. Highly recommended!",
                  rating: "★★★★★",
                  type: "Airport Transfer",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                        {review.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="text-yellow-400 text-sm">
                          {review.rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                      <span className="text-xs text-primary font-medium">
                        {review.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{review.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Reviews Badge */}
            <div className="text-center mt-10">
              <a
                href="https://g.page/r/CdF7jKp8xLZLEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full hover:shadow-md transition"
              >
                <span className="text-blue-600 font-bold">Google</span>
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="text-gray-600">4.9 (2,350+ reviews)</span>
                <FiArrowRight className="text-primary" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto inline-flex">FAQ</div>
              <h2 className="section-title">
                Frequently Asked Questions About Airport Taxi Service
              </h2>
              <p className="text-muted-foreground mt-4">
                Everything you need to know before booking your airport transfer
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "How do I book an airport taxi for pickup or drop?",
                  a: "You can book instantly by calling us at +91-8448445504 or sending a WhatsApp message. Our team will confirm your booking within 5 minutes and share driver details, vehicle information, and live tracking link before your trip.",
                },
                {
                  q: "What is the starting fare for airport taxi service?",
                  a: "Airport taxi fare starts from ₹9/km for hatchback, ₹12/km for sedan, ₹15/km for SUV, ₹17/km for Innova Crysta, ₹22/km for Tempo Traveller, and ₹45/km for luxury cars. Final fare depends on pickup location, drop point, vehicle type, waiting time, tolls, and travel timing. No surge pricing ever!",
                },
                {
                  q: "Do you provide 24x7 airport pickup and drop service?",
                  a: "Yes, we offer 24x7 airport taxi service for pickups, drops, late-night transfers, and early morning flights with professional drivers. Our team works round the clock, including public holidays and weekends. We never say 'no' to any time slot.",
                },
                {
                  q: "Is flight tracking included for airport pickups?",
                  a: "Absolutely! We offer free flight tracking for all airport pickups. Our drivers monitor your flight status in real-time and adjust pickup timing automatically in case of delays or early arrivals. You pay no extra waiting charges for flight delays.",
                },
                {
                  q: "Which airports do you serve?",
                  a: "We primarily serve Delhi IGI Airport (Terminals 1, 2, 3) and nearby NCR airport transfer routes including Noida, Gurgaon, Ghaziabad, Faridabad. We also provide outstation transfers to Agra, Jaipur, Haridwar, Chandigarh, and more. Contact us for other airport services.",
                },
                {
                  q: "What vehicles are available for airport transfers?",
                  a: "We offer a wide range of vehicles including Hatchback (Swift, WagonR), Sedan (Dzire, Amaze), SUV (Creta, Seltos), Innova Crysta, Tempo Traveller (9-12 seater), and luxury cars (Mercedes, BMW, Audi). Choose based on your travel needs and group size.",
                },
                {
                  q: "Are your drivers professionally trained and verified?",
                  a: "Yes, all our drivers are licensed, background-verified, and undergo professional training in customer service, safety protocols, route navigation, and airport procedures. Many have over 5 years of experience in airport transfers. Your safety is our priority.",
                },
                {
                  q: "What is your cancellation and refund policy?",
                  a: "You can cancel your booking free of charge up to 2 hours before the scheduled pickup time. Cancellations within 2 hours may incur a nominal fee (up to 50% of fare). For airport pickups, we understand flight changes and are flexible. Refunds are processed within 3-5 business days.",
                },
              ].map((faq, i) => (
                <details key={i} className="faq-item group">
                  <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none hover:bg-muted/50 transition-colors rounded-lg">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180 text-primary">
                      ▼
                    </span>
                  </summary>
                  <div className="pl-12 pt-4 pb-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
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

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to Book Your Ride?
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call now and get instant confirmation for your {vehicle} rental.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="btn-primary text-xl px-12 py-5 shadow-2xl"
              >
                📞 Call {PHONE_NUMBER}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105 shadow-lg"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <EEATSection vehicle={vehicle} />
      </div>
    </>
  );
}
