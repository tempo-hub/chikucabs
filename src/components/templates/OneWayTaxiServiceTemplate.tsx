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
  FaRoad,
  FaClock,
  FaUserShield,
  FaSuitcaseRolling,
  FaMountain,
  FaBusAlt,
  FaRoute,
  FaPlaneArrival,
  FaMapMarkedAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { cityCabRoutes, CITY_DISPLAY_NAMES } from "@/data/cityCabRoutes";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";

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

interface FAQItem {
  q: string;
  a: string;
}

interface CityService {
  name: string;
  services: string[];
}

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "918448445504";
const SITE_NAME = "Chiku Cabs";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();
const DRIVER_ALLOWANCE = 500;

const calculateFareByDistance = (travelDistance: number) => {
  if (isNaN(travelDistance) || travelDistance <= 0) {
    return 0;
  }

  const perKmRate = travelDistance < 200 ? 16 : 13;
  return travelDistance * perKmRate + DRIVER_ALLOWANCE;
};

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

const generateFAQs = (): FAQItem[] => [
  {
    q: "What is a One Way Taxi Service?",
    a: "A One Way Taxi Service allows you to travel to your destination by paying only for a single journey. It is more economical than round-trip bookings because there are no return fare charges.",
  },
  {
    q: "Why should I choose a one way taxi instead of a round trip?",
    a: "One way taxis are more affordable since you pay only for the distance travelled. They are ideal for airport transfers, city-to-city travel, business trips, and pilgrimages.",
  },
  {
    q: "How do I book a One Way Taxi with Chiku Cabs?",
    a: "You can easily book online through our website, call our customer support, or contact us on WhatsApp. We provide instant booking confirmation and driver details before pickup.",
  },
  {
    q: "What types of vehicles are available?",
    a: "We offer Sedan, SUV, MUV, Luxury Cars, and Tempo Travellers to suit solo travellers, families, and large groups.",
  },
  {
    q: "Are toll taxes and parking charges included in the fare?",
    a: "Fare inclusions depend on the selected package. Any applicable tolls, parking charges, or state taxes will be clearly communicated before booking confirmation.",
  },
  {
    q: "Can I book a one way taxi from the airport?",
    a: "Yes. We provide one way airport taxi services with doorstep pickup and drop from all major airports, railway stations, hotels, and residential locations.",
  },
  {
    q: "Do you provide taxis for long-distance travel?",
    a: "Yes. Chiku Cabs offers one way taxi services for intercity travel across major cities with experienced drivers and well-maintained vehicles.",
  },
  {
    q: "Are your drivers verified and experienced?",
    a: "Yes. All our drivers are professionally trained, police verified, and experienced in long-distance driving to ensure a safe and comfortable journey.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes. You can cancel or reschedule your booking according to our cancellation policy. Please contact our support team as early as possible.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, debit cards, credit cards, net banking, cash, and other secure online payment options for your convenience.",
  },
  {
    q: "Is advance booking required?",
    a: "Advance booking is recommended to get the best fares and ensure vehicle availability, especially during weekends, holidays, and festival seasons.",
  },
  {
    q: "Are your vehicles sanitized before every trip?",
    a: "Yes. Every vehicle is cleaned and sanitized before pickup to provide a safe, hygienic, and comfortable travel experience.",
  },
];

// Generate time options for select dropdown
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

export default function OneWayTaxiServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const vehicle = parsedData?.vehicle || DEFAULT_VEHICLE;
  const vehicleDetails = useMemo(() => getVehicleDetails(vehicle), [vehicle]);

  // State variables
  const [isScrolled, setIsScrolled] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    distance: "50",
  });
  const faqs = useMemo(() => generateFAQs(), []);

  const timeOptions = useMemo(() => generateTimes(), []);

  // Scroll handler for sticky CTA
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateFare = useCallback(() => {
    const distance = parseFloat(formData.distance);

    if (!isNaN(distance) && distance > 0) {
      setEstimatedPrice(calculateFareByDistance(distance));
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.distance]);

  useEffect(() => {
    calculateFare();
  }, [calculateFare]);

  // Handle form submission for fare estimate
  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation || !dropLocation || !travelDate || !travelTime) {
      toast.error("Please fill all fields");
      return;
    }

    const message = `🚖 *One-Way Taxi Service Fare Estimate Request*

📍 Pickup: ${pickupLocation}
🎯 Drop: ${dropLocation}
📅 Travel Date: ${travelDate}
⏰ Travel Time: ${travelTime}
🚗 Vehicle: ${selectedVehicle || "Not Selected"}

Please share the best fare estimate.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");

    // Show success message
    toast.success("Fare estimate request sent successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>
          One-Way Taxi Service - Book Best Outstation Cabs | Chiku Cabs
        </title>
        <meta
          name="description"
          content={`Book one-way taxi service at ₹${vehicleDetails?.pricePerKm || "10"}/km. Best price guaranteed for one-way outstation trips. Professional drivers, sanitized cars, 24/7 support.`}
        />
        <meta
          name="keywords"
          content="one-way taxi, one-way cab, outstation taxi, one-way outstation cab, taxi service, cab booking, one-way trip, Chiku Cabs"
        />
        <meta
          property="og:title"
          content="One-Way Taxi Service - Book Best Outstation Cabs"
        />
        <meta
          property="og:description"
          content={`Affordable one-way taxi service at ₹${vehicleDetails?.pricePerKm || "10"}/km. Book now for safe and reliable outstation trips.`}
        />
        <meta
          property="og:image"
          content={`https://chikucabs.com${vehicleDetails.image}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://chikucabs.com/one-way-taxi-service"
        />
      </Head>

      <Script
        id="hero-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "One-Way Taxi Service - Book Best Outstation Cabs",
            description: `Book one-way taxi service at ₹${
              vehicleDetails?.pricePerKm || "10"
            }/km. Best price guaranteed for one-way outstation trips. Professional drivers, sanitized cars, 24/7 support.`,
            url: "https://chikucabs.com/one-way-taxi-service",
            mainEntity: {
              "@type": "Service",
              name: "One-Way Taxi Service",
              provider: {
                "@type": "LocalBusiness",
                name: SITE_NAME,
                telephone: PHONE_NUMBER,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Delhi",
                  addressCountry: "IN",
                },
              },
              areaServed: {
                "@type": "Place",
                name: "Pan India",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "One-Way Cab Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "One-Way Outstation Cab",
                    price: vehicleDetails?.pricePerKm || "10",
                    priceCurrency: "INR",
                    availability: "https://schema.org/InStock",
                  },
                ],
              },
            },
          }),
        }}
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

        {/* Hero Section - Professional Redesign for Outstation Cabs */}
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
                  One Way Taxi Service
                  <br />
                  <span className="text-primary">
                    Starting at ₹{vehicleDetails?.pricePerKm || "9"}/km
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  Book affordable One Way Taxi Service with Chiku Cabs. Enjoy
                  transparent pricing, verified drivers, sanitized AC cars,
                  doorstep pickup, and instant booking confirmation. Pay only
                  for the one-way distance with no return charges.
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
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg">
                      📍
                    </span>

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
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg">
                      🎯
                    </span>

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
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                        📅
                      </span>

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
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                        ⏰
                      </span>

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

                  {/* Vehicle Selection (Outstation Specific) */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                      🚙
                    </span>
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
                focus:bg-white
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                outline-none
                transition-all duration-300"
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="swift-dzire">
                        Swift Dzire (4 Seater)
                      </option>
                      <option value="innova-crysta">Innova Crysta</option>
                      <option value="amaze">Amaze</option>
                      <option value="ertiga">Ertiga (7 Seater)</option>
                      <option value="tempo">Tempo Traveller (12 Seater)</option>
                      <option value="9-Seater">
                        9-Seater (Best for families)
                      </option>
                      <option value="12-Seater">
                        12-Seater (Popular for pilgrimages)
                      </option>
                      <option value="13-Seater">
                        13-Seater (Popular for pilgrimages)
                      </option>
                      <option value="20-Seater">
                        20-Seater (Large groups)
                      </option>
                      <option value="21-Seater">
                        21-Seater (Large groups)
                      </option>
                      <option value="24-Seater">
                        24-Seater (Large groups)
                      </option>
                      <option value="26-Seater">
                        26-Seater (Wedding/Baraat special)
                      </option>
                    </select>
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
                Choose from our fleet of well-maintained vehicles for your one
                way trip
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

        {/* Why Choose Chiku Cabs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Chiku Cabs?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide the best outstation taxi service with unmatched
                benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                  <span className="text-3xl group-hover:text-white transition-colors">
                    🕐
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  24/7 Customer Support
                </h3>
                <p className="text-gray-500 text-sm">
                  Round the clock assistance for all your travel needs
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors duration-300">
                  <span className="text-3xl group-hover:text-white transition-colors">
                    🧼
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  100% Hygienic Cars
                </h3>
                <p className="text-gray-500 text-sm">
                  Regularly sanitized vehicles for your safety
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500 transition-colors duration-300">
                  <span className="text-3xl group-hover:text-white transition-colors">
                    ⚡
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Instant Booking
                </h3>
                <p className="text-gray-500 text-sm">
                  Quick confirmation within minutes
                </p>
              </div>

              {/* Feature 4 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                  <span className="text-3xl group-hover:text-white transition-colors">
                    💰
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  No Hidden Charges
                </h3>
                <p className="text-gray-500 text-sm">
                  Transparent pricing with no surprises
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services We Offer */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Services We Offer
              </h2>
              <p className="text-black/90 max-w-2xl mx-auto">
                Comprehensive outstation travel solutions for every need
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: "🚗", name: "One Way & Round Trip" },
                { icon: "💼", name: "Corporate Travel" },
                { icon: "💒", name: "Wedding Car Rental" },
                { icon: "✈️", name: "Airport Transfer" },
                { icon: "🏞️", name: "Local Sightseeing" },
                { icon: "🚙", name: "Long Drive Packages" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <p className="text-black text-sm font-medium">
                    {service.name}
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
                          setFormData((prev) => ({
                            ...prev,
                            distance: dist.toString(),
                          }));
                          setEstimatedPrice(calculateFareByDistance(dist));
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
                    over 200 km, the fare changes to ₹24/km plus a fixed driver
                    allowance of ₹500.
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

        {/* About One Way Taxi Service */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Chiku Cabs One Way Taxi Service
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Chiku Cabs offers affordable and reliable One Way Taxi
                  Services across India, making intercity travel convenient,
                  comfortable, and budget-friendly. Whether you're traveling for
                  business, family visits, airport transfers, pilgrimages, or
                  vacations, our one way cab service ensures you pay only for
                  the distance you travel without unnecessary return charges.
                </p>

                <p>
                  Our one way taxi service connects major cities, airports,
                  railway stations, and tourist destinations with verified
                  professional drivers and well-maintained AC vehicles. We
                  provide Sedan, SUV, Innova Crysta, Ertiga, and Tempo Traveller
                  options suitable for solo travelers, families, and large
                  groups at competitive prices with complete fare transparency.
                </p>

                <p>
                  With instant booking confirmation, doorstep pickup, 24×7
                  customer support, GPS-enabled vehicles, and sanitized cars,
                  Chiku Cabs delivers a safe and hassle-free travel experience.
                  Book your One Way Taxi online or by phone and enjoy
                  comfortable rides at the best fares without hidden charges.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-primary">
                      10,000+
                    </div>
                    <div className="text-sm text-gray-500">
                      Successful One Way Trips
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-gray-500">
                      Cities & Routes Covered
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-primary">24×7</div>
                    <div className="text-sm text-gray-500">
                      Booking & Customer Support
                    </div>
                  </div>
                </div>
              </div>
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
                <span className="gradient-text">Most Trusted</span> Taxi Service
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
