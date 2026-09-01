"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Script from "next/script";
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
  FaShieldAlt,
  FaArrowRight,
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
import { CiClock1 } from "react-icons/ci";
import toast from "react-hot-toast";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { cityCabRoutes, CITY_DISPLAY_NAMES } from "@/data/cityCabRoutes";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

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

interface FleetItem {
  tier: string;
  car: string;
  price: string;
  image: string;
  desc: string;
  best: boolean;
  capacity: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: string;
  location?: string;
}

interface CityService {
  name: string;
  services: string[];
}

// --- Constants ---
const PHONE_NUMBER = "+919818022327";
const WHATSAPP_NUMBER = "919818022327";
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
    image: "/suzuki-dzire.png",
    pricePerKm: 10,
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

const FEATURES = [
  {
    icon: "🛡️",
    title: "Verified Chauffeurs",
    desc: "Highly trained and background-verified drivers ensuring your safety.",
  },
  {
    icon: "🚗",
    title: "Luxury Fleet",
    desc: "Meticulously maintained vehicles equipped with modern amenities.",
  },
  {
    icon: "💰",
    title: "Transparent Billing",
    desc: "Fixed pricing with no hidden costs. Pay only what you see.",
  },
  {
    icon: "⏰",
    title: "24/7 Availability",
    desc: "Round the clock service for all your travel needs.",
  },
  {
    icon: "📍",
    title: "GPS Tracking",
    desc: "Real-time location tracking for every ride.",
  },
  {
    icon: "🔄",
    title: "Easy Cancellation",
    desc: "Cancel your booking up to 24 hours before the trip at zero charges.",
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

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajesh Khanna",
    text: "Best taxi service I've used. Professional drivers and spotless cars!",
    rating: "★★★★★",
    location: "Delhi",
  },
  {
    name: "Meera Joshi",
    text: "Used for family wedding trip. The Innova was luxurious and on time.",
    rating: "★★★★★",
    location: "Mumbai",
  },
  {
    name: "Aman Tiwari",
    text: "Excellent corporate cab service. Punctual, clean cars, and easy booking.",
    rating: "★★★★★",
    location: "Bangalore",
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
    feature: "Easy Cancellation",
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

const generateFAQs = (vehicle: string): FAQItem[] => [
  {
    q: `What is the minimum booking duration for ${vehicle} rental?`,
    a: `The minimum booking duration for ${vehicle} rental is 4 hours for local trips and 8 hours for outstation trips. For one-way trips, there is no minimum duration, you pay only for the distance traveled. Weekend packages start from 12 hours.`,
  },
  {
    q: `Does the ${vehicle} rental price include driver allowance and fuel?`,
    a: `Yes! Our ${vehicle} rental price is all-inclusive. It covers driver allowance, fuel cost, state permits (for outstation), toll taxes, and GST. Extra charges only apply for night travel (11 PM - 5 AM: 25% extra), parking fees, and waiting time beyond 15 minutes.`,
  },
  {
    q: `Can I book ${vehicle} for a one-way trip?`,
    a: `Absolutely! We offer one-way ${vehicle} rental at special discounted rates. You only pay for the distance traveled from pickup to drop location. No charges for the return journey. Perfect for airport transfers, one-way outstation trips, or inter-city travel.`,
  },
  {
    q: `What safety measures are followed for ${vehicle} rental?`,
    a: `Your safety is our priority! All our ${vehicle}s are sanitized before every trip. Drivers are police-verified, wear masks, and carry sanitizers. GPS tracking is active 24/7. Emergency buttons are installed in every vehicle for immediate assistance.`,
  },
  {
    q: `How much advance booking is required for ${vehicle}?`,
    a: `We recommend booking at least 24 hours in advance for guaranteed availability, especially during weekends and festival seasons. However, we also accept last-minute bookings subject to vehicle availability. Call us for immediate booking confirmation.`,
  },
  {
    q: `Do you provide child seats in ${vehicle}?`,
    a: `Yes, we provide child seats absolutely free on request. Please mention your requirement at the time of booking so we can arrange it. We have seats suitable for children aged 0-12 years.`,
  },
  {
    q: `What is the cancellation policy for ${vehicle} booking?`,
    a: `Easy cancellation up to 24 hours before the trip. 50% cancellation charges apply between 12-24 hours. No refund for cancellation within 12 hours or no-show. You can also reschedule your booking at no extra cost up to 12 hours before the trip.`,
  },
  {
    q: `Can I modify my ${vehicle} booking after confirmation?`,
    a: `Yes! Free modifications are allowed up to 12 hours before your scheduled trip. You can change pickup time, drop location, or date. Call our customer support at ${PHONE_NUMBER} for any modifications. Last-minute changes depend on vehicle availability.`,
  },
];

// --- Main Component ---
export default function OneWayTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const vehicle = parsedData?.vehicle || DEFAULT_VEHICLE;
  const startCity = parsedData?.origin || "your city";
  const endCity = parsedData?.destination || "your destination";
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
  const faqs = useMemo(() => generateFAQs(vehicle), [vehicle]);
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

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle} Rental Service`,
    description: `Book ${vehicle} for local, outstation, and airport transfers. Best price guaranteed. Professional drivers, 24/7 support.`,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: vehicleDetails.pricePerKm,
      highPrice: vehicleDetails.pricePerKm * 2,
      offerCount: 3,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
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
          className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${isScrolled ? "translate-y-0" : "translate-y-full"
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
                  One Way <span className="text-primary">{vehicle}</span> Rental
                  <br />
                  Starting at ₹{vehicleDetails.pricePerKm}/km
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
                    <span>✓ Easy Cancellation</span>
                    <span>•</span>
                    <span>✓ 24×7 Support</span>
                  </div>
                </form>
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

        {/* Available Vehicles */}
        <section className="py-16 bg-gray-50">
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
                    <span className="text-2xl font-bold text-primary">₹10</span>
                    <span className="text-gray-500">/km</span>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
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
                    <span className="text-2xl font-bold text-primary">₹10</span>
                    <span className="text-gray-500">/km</span>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
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
                  <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
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
                  <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Chiku Cabs for One Way */}
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
                Why Our One Way Service is the Best
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
                  desc: `We pick you up from your doorstep in ${startCity} and drop you exactly at your destination in ${endCity}.`,
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
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${Number(formData.distance) === dist
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

        {/* Popular Travel Destinations - Enhanced UI */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Popular Travel Destinations
              </h2>
              <p className="text-gray-600">
                Explore India's most beautiful destinations with Chiku Cabs
              </p>
            </div>

            {/* City Filter Tabs */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {Object.keys(cityCabRoutes).map((cityKey) => (
                  <a
                    key={cityKey}
                    href={`#dest-${cityKey}`}
                    className="
                  px-5
                  py-2.5
                  rounded-full
                  bg-white
                  border
                  border-gray-200
                  text-gray-700
                  text-sm
                  font-semibold
                  shadow-sm
                  hover:bg-[#BE1E23]
                  hover:text-white
                  hover:border-[#BE1E23]
                  hover:shadow-xl
                  hover:scale-105
                  transition-all
                  duration-300
                "
                  >
                    <span className="capitalize">
                      {CITY_DISPLAY_NAMES[cityKey] ??
                        cityKey
                          .split("-")
                          .map(
                            (word) => word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Destination Cards by City */}
            {Object.entries(cityCabRoutes).map(([cityKey, routes]) => {
              const cityRoutes = routes as {
                url: string;
                from: string;
                to: string;
                distance: number;
              }[];
              // Show first 12 destinations per city
              const displayRoutes = cityRoutes.slice(0, 12);
              // const cityName =
              //   cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
              const cityName =
                CITY_DISPLAY_NAMES[cityKey] ??
                cityKey
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

              return (
                <div
                  key={cityKey}
                  id={`dest-${cityKey}`}
                  className="mb-14 scroll-mt-24"
                >
                  {/* City Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-lg">
                      <IoLocationSharp />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Top Destinations from {cityName}
                    </h3>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {displayRoutes.map((route, idx) => (
                      <Link
                        key={idx}
                        href={route.url}
                        className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                          <span className="text-lg">🚕</span>
                        </div>

                        {/* Destination Name */}
                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-primary transition-colors leading-tight">
                          {route.to}
                        </h4>

                        {/* Distance */}
                        <p className="text-xs text-gray-400 mb-2">
                          {route.distance} km
                        </p>

                        {/* Price Indicator */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary">
                            ₹
                            {Math.round(
                              route.distance * 10 + 500,
                            ).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View All Link */}
                  {cityRoutes.length > 12 && (
                    <div className="text-center mt-6">
                      <Link
                        href={`/${cityKey}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-[#BE1E23] hover:text-white transition-all duration-300"
                      >
                        View all {cityRoutes.length} routes from {cityName}
                        <span>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Routes Table - Dynamic Pricing */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Popular Routes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Most frequently traveled routes by our customers.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        From
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        To
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Distance
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Price (One Way)
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Price (Round Trip)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { from: "Delhi", to: "Jaipur", distance: 280 },
                      { from: "Mumbai", to: "Pune", distance: 150 },
                      { from: "Bangalore", to: "Mysore", distance: 145 },
                      { from: "Chennai", to: "Pondicherry", distance: 160 },
                      { from: "Hyderabad", to: "Tirupati", distance: 550 },
                    ].map((route, index) => {
                      // Calculate One Way Price using same logic as calculateFare
                      const DRIVER_CHARGE = 500;
                      const oneWayPrice =
                        route.distance * vehicleDetails.pricePerKm +
                        DRIVER_CHARGE;

                      // Calculate Round Trip Price (2x distance + 2x driver charge with 10% discount)
                      const roundTripBase =
                        route.distance * 2 * vehicleDetails.pricePerKm +
                        DRIVER_CHARGE * 2;
                      const roundTripDiscount = roundTripBase * 0.1; // 10% discount
                      const roundTripPrice = roundTripBase - roundTripDiscount;

                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-800">
                            {route.from}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {route.to}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {route.distance} km
                          </td>
                          <td className="px-6 py-4 font-semibold text-primary">
                            ₹{Math.round(oneWayPrice).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 font-semibold text-green-600">
                            ₹{Math.round(roundTripPrice).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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

        {/* Service Coverage */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto">SERVICE AREAS</div>
              <h2 className="section-title">
                Available Across Major Indian Cities
              </h2>
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
          </div>
        </section>

        {/* Feature Grid - Modern UI with React Icons */}
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
                Why We're India's{" "}
                <span className="gradient-text">Most Trusted</span> Cab Service
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with our premium features and
                customer-first approach
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

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border-2 border-white"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Join <span className="text-primary font-bold">50,000+</span>{" "}
                  happy customers
                </span>
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
                <span className="text-gray-600">(1,250+ reviews)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Review 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent service! Driver was professional and car was clean.
                  Reached on time, very reasonable pricing."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    RK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Rajesh Kumar</p>
                    <p className="text-xs text-gray-500">Delhi to Jaipur</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Best outstation taxi service. On-time pickup and smooth ride.
                  Highly recommend Chiku Cabs!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    PS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Priya Sharma</p>
                    <p className="text-xs text-gray-500">Mumbai to Pune</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Great experience with Chiku Cabs. The driver was very polite
                  and knew the route well. Will book again!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    AS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Amit Singh</p>
                    <p className="text-xs text-gray-500">Bangalore to Mysore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto inline-flex">FAQ</div>
              <h2 className="section-title">
                Frequently Asked Questions About {vehicle} Rental
              </h2>
              <p className="text-muted-foreground mt-4">
                Everything you need to know before booking your {vehicle}
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
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
