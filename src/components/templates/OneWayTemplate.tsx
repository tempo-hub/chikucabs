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
  FaWhatsapp,
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
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";
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
    pricePerKm: 20,
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
    description: `Book a ${vehicle} for a comfortable one way journey. Travel from your pickup city to your destination with a professional driver, reliable service and transparent pricing. Ideal for family trips, business travel and outstation journeys.`,
  };
};

const generateFAQs = (vehicle: string): FAQItem[] => [
  {
    q: `Why is booking a one-way ${vehicle} cab more cost-effective than a round-trip taxi?`,
    a: `With Chiku Cabs one-way service, you only pay for the exact distance traveled from your origin to destination. Unlike traditional taxi operators who force you to pay two-way round-trip fares and double driver allowances, our one-way dropped pricing saves you up to 50% on intercity travel.`,
  },
  {
    q: `Do I have to pay for the cab's return journey or empty kilometer charges?`,
    a: `No! Absolutely never. You are only billed for the one-way drop route. We never charge return journey fuel, dead kilometers, or empty run-back charges for any confirmed one-way trip.`,
  },
  {
    q: `How is the one-way ${vehicle} fare calculated?`,
    a: `One-way fares are calculated based on transparent per-kilometer rates for the specific vehicle category (e.g., ₹9/km for Sedans, ₹13/km for SUVs, ₹16/km for Innova Crysta) multiplied by the standardized highway route distance, plus standard driver day allowance.`,
  },
  {
    q: `Are highway toll taxes, state border permits, and GST included in the fare?`,
    a: `We provide complete transparency before you travel. Base one-way packages cover vehicle rental, fuel, and chauffeur charges. Fastag highway toll plazas and inter-state commercial road entry permits are either clearly included in all-inclusive packages or billed at actual government toll gate receipts.`,
  },
  {
    q: `Can we take meal stops or short sightseeing breaks during our one-way drive?`,
    a: `Yes! Your dedicated one-way chauffeur will gladly stop at hygienic highway food courts, rest areas, or popular roadside attractions along your route for refreshments, tea breaks, and restroom visits at no extra waiting penalty.`,
  },
  {
    q: `Does Chiku Cabs provide guaranteed doorstep pickup and drop at residential addresses?`,
    a: `Yes. Unlike public buses or trains where you have to lug luggage to crowded stations, our chauffeur arrives right at your home doorstep, society gate, hotel lobby, or airport terminal, and drops you precisely at your final destination address.`,
  },
  {
    q: `What vehicle options are available for one-way intercity travel?`,
    a: `We offer fuel-efficient Hatchbacks (WagonR), spacious Sedans (Dzire, Etios, Amaze), family SUVs (Ertiga), executive luxury MPVs (Innova Crysta), and 9 to 26 seater Tempo Travellers for larger group movements.`,
  },
  {
    q: `How far in advance should I reserve a one-way cab?`,
    a: `While we accept on-demand bookings with just 1 to 2 hours dispatch notice depending on city availability, we recommend booking 12 to 24 hours in advance to secure preferred vehicle models and confirmed chauffeur assignment.`,
  },
  {
    q: `What safety protocols and emergency roadside support do you provide?`,
    a: `All vehicles undergo thorough multi-point safety inspections, tire pressure checks, and sanitized cabins before dispatch. Every ride is tracked via real-time GPS by our 24/7 central support team, with instant replacement vehicle dispatch in the rare event of mechanical trouble.`,
  },
  {
    q: `Are your drivers licensed with commercial badges and experienced on highways?`,
    a: `Yes, 100% of Chiku Cabs chauffeurs possess verified commercial yellow-badge licenses, verified police backgrounds, and a minimum of 5+ years of highway long-distance driving experience.`,
  },
  {
    q: `What is the cancellation and refund policy for one-way bookings?`,
    a: `We offer a 100% free cancellation guarantee when canceled up to 24 hours prior to scheduled departure. Any advance booking token is refunded immediately with zero cancellation deductions.`,
  },
  {
    q: `Can I book an early-morning or late-night one-way cab safely?`,
    a: `Yes. Our dispatch operations run 24x7x365. Chauffeurs are assigned and verified for late-night airport departures and early 4:00 AM pickups with active SOS safety tracking throughout the night drive.`,
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
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    }),
    [faqs]
  );
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
      const rate = vehicleDetails?.pricePerKm || 9;
      const fare = Math.round(distance * 1.5 * rate + DRIVER_CHARGE);
      setEstimatedPrice(fare);
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.distance, vehicleDetails?.pricePerKm]);

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

      <Script
        id="faq-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                    href="tel:+918448445504"
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
              src="/oneway.webp"
              alt="Chiku Cabs Premium Fleet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
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
                  {vehicleDetails.description}
                </p>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+918448445504"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    📞 Book Now
                  </a>

                  <a
                    href={`https://wa.me/916280820037?text=${encodeURIComponent(
                      "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
        <section className="pt-24 pb-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-slate-300">
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
        <section className="py-16 bg-gray-50 border-b border-slate-300">
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
                    <span className="text-2xl font-bold text-primary">₹9</span>
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
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-primary flex items-center justify-center">
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
        <section className="bg-muted/30 py-24 border-b border-slate-300 px-4">
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
        <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300">
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
        <section className="py-16 bg-gray-50 border-b border-slate-300">
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
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
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
        <section className="py-16 bg-gray-50 border-b border-slate-300">
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
                      const rate = vehicleDetails?.pricePerKm || 9;
                      const oneWayPrice = Math.round(
                        route.distance * 1.5 * rate + DRIVER_CHARGE,
                      );

                      // Calculate Round Trip Price (2x distance with 10% discount)
                      const roundTripBase = Math.round(
                        route.distance * 2 * 1.5 * rate + DRIVER_CHARGE,
                      );
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
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
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
              {/* <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0">
                <div className="absolute left-1/3 right-1/3 h-full bg-primary"></div>
              </div> */}

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
        <section className="py-24 border-b border-slate-300">
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

        {/* =====================================================
            AUDIT SECTION 1: SMART ONE-WAY COMPARISON MATRIX
        ====================================================== */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                SMART TRAVEL COMPARISON
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                One-Way Cab vs Round-Trip Taxi, Bus &amp; Train
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                See why thousands of intercity travelers choose Chiku Cabs dedicated one-way drops to save up to 50% without compromising comfort or schedule.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="p-4 md:p-5 font-semibold">Travel Parameter</th>
                    <th className="p-4 md:p-5 font-bold text-amber-400 bg-slate-800">
                      Chiku One-Way Cab
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Traditional Round-Trip Taxi
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      State / Private Bus
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Indian Railways
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary text-lg" /> Billing Fairness &amp; Dead-KM
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Pay ONLY for One-Way Distance (Save Up to 50%)
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Forces 2x return journey &amp; double driver charges</td>
                    <td className="p-4 md:p-5 text-slate-600">Fixed ticket per seat, expensive for families</td>
                    <td className="p-4 md:p-5 text-slate-600">Dynamic surge fares in premium quotas</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary text-lg" /> Doorstep Pickup &amp; Drop
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      100% Home Doorstep Pickup to Exact Destination Drop
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Often demands extra pickup point allowance</td>
                    <td className="p-4 md:p-5 text-slate-600">Strict bus terminal pickup; auto required to reach</td>
                    <td className="p-4 md:p-5 text-slate-600">Crowded stations; expensive local cab needed</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary text-lg" /> Luggage Space &amp; Handling
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Private Dedicated Boot Space, Zero Luggage Fee
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Dedicated boot space, but high overall rental cost</td>
                    <td className="p-4 md:p-5 text-slate-600">Strict luggage limits, baggage risk in public belly</td>
                    <td className="p-4 md:p-5 text-slate-600">Staircase climbing &amp; expensive coolie charges</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaRegClock className="text-primary text-lg" /> Schedule &amp; Timing Flexibility
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      24x7 On-Demand Departure, Free Highway Meal Breaks
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Flexible departure, but strict calendar day minimums</td>
                    <td className="p-4 md:p-5 text-slate-600">Rigid timetables, no unscheduled bathroom stops</td>
                    <td className="p-4 md:p-5 text-slate-600">Fixed timings with notorious seasonal fog delays</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaShieldAlt className="text-primary text-lg" /> Safety, Privacy &amp; Hygiene
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Verified Commercial Chauffeur, Sanitized Private Car
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Private car, but unverified independent operators</td>
                    <td className="p-4 md:p-5 text-slate-600">Shared cabin with zero privacy or sanitization</td>
                    <td className="p-4 md:p-5 text-slate-600">Overcrowded coaches and compromised hygiene</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            AUDIT SECTION 3: ONE-WAY CORRIDORS & PICKUP HUBS
        ====================================================== */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                HIGHWAY NETWORKS &amp; COVERAGE
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Pan-India One-Way Corridors &amp; Doorstep Pickup Hubs
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                Connecting top tier-1, tier-2 cities, commercial hubs, and remote destinations with reliable one-way intercity drops.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: "🏙️",
                  title: "Metropolitan Intercity",
                  desc: "Frequent one-way drops between major industrial and business capitals with express expressway routing.",
                  tag: "Delhi • Mumbai • Bangalore • Hyderabad",
                },
                {
                  icon: "✈️",
                  title: "Airport One-Way Transfers",
                  desc: "Guaranteed on-time drops to international and domestic airport terminals from peripheral cities and towns.",
                  tag: "IGI Delhi • BOM Mumbai • BLR Airport",
                },
                {
                  icon: "🏔️",
                  title: "Hill Station Gateways",
                  desc: "Safe mountain journeys to Shimla, Manali, Nainital, Mussoorie, Ooty, and Coorg with verified hill chauffeurs.",
                  tag: "Scenic Hill Route Specialist",
                },
                {
                  icon: "🛕",
                  title: "Pilgrimage One-Way Drops",
                  desc: "Dedicated spiritual drops to Varanasi, Ayodhya, Prayagraj, Haridwar, Rishikesh, Mathura, and Tirupati.",
                  tag: "Elderly & Family Friendly",
                },
              ].map((card, cIdx) => (
                <div key={cIdx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{card.desc}</p>
                  <div className="bg-amber-50 rounded-lg p-2.5 text-xs font-semibold text-amber-900 border border-amber-200/60">
                    📍 {card.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Doorstep Pickup Hubs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <IoLocationSharp className="text-primary text-2xl" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Doorstep Pickup Across Residential &amp; Transit Hubs
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                No need to haul your baggage across the city. Our chauffeur arrives directly at your specified residential colony, society gate, business park, or transit terminal:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Residential Townships & Apartment Gates",
                  "Airport Departure & Arrival Curbs",
                  "Railway Stations & Bus Transit Terminals",
                  "Corporate Tech Parks & SEZ Campuses",
                  "Hotels, Guest Houses & Resorts",
                  "University & College Campuses",
                  "Suburban Highway Toll Interchanges",
                  "Hospitals & Medical Care Centers",
                ].map((hub, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs md:text-sm font-semibold rounded-full border border-slate-200 transition-colors"
                  >
                    <FaCheckCircle className="text-emerald-500 text-xs" /> {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            AUDIT SECTION 4: INCLUSIONS, EXCLUSIONS & BOOKING TERMS
        ====================================================== */}
        <section className="py-20 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                TRANSPARENCY &amp; INTEGRITY
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                One-Way Inclusions, Exclusions &amp; Booking Guidelines
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                Clear policies with zero hidden surprises. What you see is what you pay.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 rounded-2xl p-7 border border-emerald-200 shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">What is Included</h3>
                </div>
                <ul className="space-y-3.5 text-slate-700 text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Dedicated One-Way Vehicle &amp; Fuel:</strong> 100% private sanitized AC car reserved exclusively for your route.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Commercial Yellow-Badge Driver:</strong> Background-verified, polite chauffeur experienced on national and state expressways.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Doorstep Pickup &amp; Destination Drop:</strong> Exact pickup from your home gate to your destination address with zero mid-route transfer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Flexible Highway Breaks:</strong> Stop at clean highway dhabas, food plazas, or restroom facilities along the highway at your convenience.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>GST Tax Invoice &amp; Live Tracking:</strong> Transparent digital GST billing and continuous 24x7 control room GPS monitoring.</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions & Guidelines */}
              <div className="bg-amber-50/40 rounded-2xl p-7 border border-amber-200 shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl">
                    ℹ️
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">What is Excluded &amp; Payable at Actuals</h3>
                </div>
                <ul className="space-y-3.5 text-slate-700 text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Fastag Highway Tolls &amp; State Entry Permits:</strong> Electronic toll plaza charges and inter-state road taxes billed at actuals (unless booked under an all-inclusive package).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Airport / Railway Parking Slips:</strong> Official parking fees at airport pick/drop lanes paid at actual government receipts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>No Return Journey Charges:</strong> You will never be billed for the driver's return trip or dead kilometer run back.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>100% Free Cancellation:</strong> Cancel without any deduction up to 24 hours before your scheduled pickup time.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Night Travel Allowance:</strong> Standard night driver allowance (₹250–₹300) applies only if driving between 10:00 PM and 6:00 AM.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl md:text-3xl font-black mb-2 text-white">
                  Ready to Book Your One-Way Cab?
                </h4>
                <p className="text-slate-300 text-sm md:text-base max-w-xl">
                  Get instant confirmation and driver assignment within minutes. Contact our 24/7 one-way dispatch desk.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Chiku Cabs, I need to book a one-way cab. Please share the best fare.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-sm md:text-base transition-all shadow-lg"
                >
                  <FaWhatsapp className="text-xl" /> WhatsApp Booking
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm md:text-base transition-all shadow-lg"
                >
                  Call +91-8448445504
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-20 bg-gray-50 border-b border-slate-300">
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
        <section className="py-24 px-4 bg-muted/20 border-b border-slate-300">
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
        <div className="py-12 border-b border-slate-300">
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
        <section className="py-20 px-4 border-b border-slate-300">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to Book Your Ride?
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call now and get instant confirmation for your {vehicle} rental.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-xl px-12 py-5 shadow-2xl"
              >
                📞 Call {PHONE_NUMBER}
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
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

        <EEATSection vehicle={vehicle} />
      </div>
    </>
  );
}
