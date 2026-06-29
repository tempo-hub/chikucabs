"use client";

import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageCircle,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaCar,
  FaUserCheck,
  FaSuitcase,
  FaShieldAlt,
  FaHeadset,
  FaMapMarkerAlt,
  FaCarSide,
  FaUsers,
  FaClock,
  FaRegCalendarAlt,
  FaWallet,
  FaMedal,
  FaStar,
} from "react-icons/fa";
import { MdFlightTakeoff, MdSupportAgent } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";
import { BsCashStack } from "react-icons/bs";
import toast from "react-hot-toast";
import Script from "next/script";
import {
  POPULAR_AIRPORT_CITIES,
  POPULAR_ROUTES,
  getRoutesByCity,
  getRoutesByCityAndType,
  getPickupRoutes,
  getDropRoutes,
  getRouteWithPrice,
  getRoutesWithPrices,
  calculateFare,
  getPricePerKm,
} from "@/data/airportRoutes";
import { CiClock1 } from "react-icons/ci";
import React, { useMemo } from "react";
import { ParsedRouteData } from "@/lib/urlParser";

// --- Constants ---
interface BookingFormData {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  distance: string;
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
    image: "/innova-crysta.png",
    pricePerKm: 16,
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

// --- About Section Data ---
const ABOUT_STATS = [
  { number: "800+", label: "Monthly Airport Trips", icon: <MdFlightTakeoff /> },
  { number: "₹2M+", label: "Happy Customers", icon: <FaUsers /> },
  { number: "4.9/5", label: "Average Rating", icon: <FaStar /> },
  { number: "24/7", label: "Support Available", icon: <FaHeadset /> },
];

const ABOUT_FEATURES = [
  {
    icon: <FaShieldAlt />,
    title: "Safety First",
    description:
      "All vehicles are sanitized, and drivers follow strict safety protocols.",
  },
  {
    icon: <FaWallet />,
    title: "Transparent Pricing",
    description:
      "No hidden charges. Get the exact fare estimate before booking.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Customer Support",
    description: "Our team is always available to assist you with any queries.",
  },
  {
    icon: <FaMedal />,
    title: "Trusted Service",
    description:
      "Over 1250+ satisfied customers trust us for airport transfers.",
  },
];

// --- Sample FAQ Data ---
const generateFAQs = (cityName: string, airportName: string): FAQ[] => [
  {
    id: 1,
    question: `How do I book a ${cityName} airport taxi?`,
    answer: `You can book your ${cityName} airport taxi by calling us at ${PHONE_NUMBER}, sending a WhatsApp message, or filling the booking form on this page. We provide instant confirmation and driver details.`,
  },
  {
    id: 2,
    question: `Do you provide flight tracking service?`,
    answer: `Yes! Our professional drivers track your flight in real-time and adjust pickup time accordingly. If your flight is delayed, we'll be there when you arrive. Free 60-minute waiting period included.`,
  },
  {
    id: 3,
    question: `What types of vehicles are available for airport transfers?`,
    answer: `We offer a range of vehicles including Swift Dzire (4 seater), Honda Amaze (4 seater), Maruti Ertiga (7 seater), Toyota Innova Crysta (7 seater), and Tempo Traveller (9-12 seater) for group transfers. Choose based on your group size and luggage.`,
  },
  {
    id: 4,
    question: `How much does a ${cityName} airport cab cost?`,
    answer: `Our ${cityName} airport taxi fares start from ₹10/km. The final fare depends on vehicle type, distance, and time of travel. We offer transparent pricing with no hidden charges. Check our popular routes above for estimated fares.`,
  },
  {
    id: 5,
    question: `Is it safe to book airport cabs online?`,
    answer: `Absolutely! We prioritize your safety. All our drivers are verified with proper background checks. Our vehicles are regularly sanitized and maintained. We also share driver details and GPS tracking with you before your trip.`,
  },
  {
    id: 6,
    question: `Can I cancel my airport cab booking?`,
    answer: `Yes, you can cancel your booking up to 4 hours before pickup without any charges. Cancellations within 4 hours may attract minimal cancellation fees. Contact our support team for assistance.`,
  },
  {
    id: 7,
    question: `Do you provide cabs for early morning or late night flights?`,
    answer: `Yes! We offer 24x7 service. Whether you have an early morning flight or a red-eye flight, we'll be there to pick you up. Our drivers are available round the clock.`,
  },
  {
    id: 8,
    question: `How can I pay for the airport taxi?`,
    answer: `You can pay online via UPI, credit/debit cards, or pay directly to the driver. We accept cash and all digital payment methods. Advance payment is not required unless you need a special booking.`,
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

// Helper to get city name from slug
const getCityName = (slug: string) => {
  // Remove "-airport" from slug
  const cityKey = slug.replace("-airport", "");

  const city = POPULAR_AIRPORT_CITIES.find(
    (c) => c.slug.toLowerCase() === cityKey.toLowerCase(),
  );
  return city ? city.name : cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
};

// Helper to get airport name
const getAirportName = (city: string) => {
  const airportNames: Record<string, string> = {
    kolkata: "Netaji Subhash Chandra Bose International Airport",
    ahmedabad: "Sardar Vallabhbhai Patel International Airport",
    jaipur: "Jaipur International Airport",
    lucknow: "Chaudhary Charan Singh International Airport",
    chandigarh: "Chandigarh International Airport",
    indore: "Devi Ahilya Bai Holkar Airport",
    goa: "Goa International Airport (Dabolim)",
    bhubaneswar: "Biju Patnaik International Airport",
    mangalore: "Mangalore International Airport",
    amritsar: "Sri Guru Ram Dass Jee International Airport",
    gwalior: "Gwalior Airport",
  };
  return airportNames[city.toLowerCase()] || `${city} Airport`;
};

// Helper to get city-specific page URL
const getCityPageUrl = (city: string) => {
  return `/airport-cabs/${city.toLowerCase()}-airport`;
};

export default function AirportCityPage({
  parsedData,
}: {
  parsedData?: ParsedRouteData;
}) {
  const params = useParams();
  const slug = params?.slug as string;

  // Extract city name from slug (remove "-airport" if present)
  const cityKey = slug?.replace("-airport", "") || "kolkata";
  const cityName = getCityName(slug);
  const airportName = getAirportName(cityKey);
  const cityRoutes = getRoutesByCity(cityKey);
  const pickupRoutes = getPickupRoutes(cityKey);
  const dropRoutes = getDropRoutes(cityKey);
  const faqs = generateFAQs(cityName, airportName);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [tripType, setTripType] = useState("pickup");
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    distance: "50",
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [activeCity, setActiveCity] = useState("Kolkata");
  const [activeTab, setActiveTab] = useState<"pickup" | "drop">("pickup");
  const vehicle = parsedData?.vehicle || DEFAULT_VEHICLE;
  const vehicleDetails = useMemo(() => getVehicleDetails(vehicle), [vehicle]);

  const PHONE_NUMBER = "+918448445504";
  const WHATSAPP_NUMBER = "918448445504";

  // Filter routes based on active tab
  const filteredRoutes = activeTab === "pickup" ? pickupRoutes : dropRoutes;

  // Generate time options
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

  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation || !dropLocation || !travelDate || !travelTime) {
      toast.error("Please fill all fields");
      return;
    }

    const message = `🚖 *Airport Taxi Booking Request*
  
  ✈️ *Transfer Type:* ${tripType === "pickup" ? "Airport Pickup" : "Airport Drop"}
  
  📍 *Pickup Location:* ${pickupLocation}
  🎯 *Drop Location:* ${dropLocation}
  
  📅 *Travel Date:* ${travelDate}
  ⏰ *Travel Time:* ${travelTime}
  
  🚘 *Vehicle Type:* ${selectedVehicle || vehicleDetails?.name || "Cab"}
  
  Please share the best fare.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");

    // Reset Form
    setPickupLocation("");
    setDropLocation("");
    setTravelDate("");
    setTravelTime("");
    setSelectedVehicle("");
    setTripType("pickup");
  };

  // Scroll handler for sticky CTA
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>
          {cityName} Airport Cab Service | Book Airport Taxi Online | Chiku Cabs
        </title>
        <meta
          name="description"
          content={`Book reliable ${cityName} airport taxi service for pickup & drop. Professional drivers, fixed pricing, flight tracking, 24x7 support. Call +91-8448445504 for instant booking.`}
        />
        <meta
          name="keywords"
          content={`${cityName} airport taxi, ${cityName} airport cab, airport pickup ${cityName}, airport drop ${cityName}, ${cityKey} airport taxi service`}
        />
        <meta name="author" content="Chiku Cabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content={`${cityName} Airport Cab Service | Chiku Cabs`}
        />
        <meta
          property="og:description"
          content={`Professional ${cityName} airport transfer service with fixed pricing and flight tracking. Call now for instant booking.`}
        />
        <meta property="og:image" content="/cab-og-image.jpg" />
        <meta
          property="og:url"
          content={`https://chikucabs.com/airport-cabs/${cityKey}-airport`}
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href={`https://chikucabs.com/airport-cabs/${cityKey}-airport`}
        />
      </Head>

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
                  {cityName} Airport Taxi
                  <br />
                  <span className="text-primary">Book Now & Save 10%</span>
                  <br />
                  Starting @ ₹{vehicleDetails.pricePerKm}/km
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  Book reliable {cityName} airport taxi service for{" "}
                  {airportName}. We monitor your flight in real-time and adjust
                  pickup accordingly. Free 60-minute waiting period.
                  Professional drivers, sanitized {vehicle}s, and 24/7 support.
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

              {/* Right Content - Booking Widget */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Book Your {vehicleDetails?.name || "Airport Taxi"}
                </h3>

                <p className="text-gray-600 mb-6">
                  Get instant confirmation & best price
                </p>

                <form className="space-y-5" onSubmit={handleGetEstimate}>
                  {/* Pickup Location */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg">
                      📍
                    </span>

                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder={
                        tripType === "pickup"
                          ? "Airport Name"
                          : "Enter Pickup Address"
                      }
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
            focus:bg-white
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
            outline-none
            transition-all duration-300"
                      required
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
                      placeholder={
                        tripType === "pickup"
                          ? "Enter Drop Address"
                          : "Airport Name"
                      }
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
            focus:bg-white
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
            outline-none
            transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Trip Type Selection (Outstation Specific) */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTripType("pickup")}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        tripType === "pickup"
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Airport Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType("drop")}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        tripType === "drop"
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Airport Drop
                    </button>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pickup Date */}
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
                        required
                      />
                    </div>

                    {/* Pickup Time */}
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base">
                        ⏰
                      </span>
                      <select
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
                          focus:bg-white
                          focus:border-primary
                          focus:ring-4
                          focus:ring-primary/10
                          outline-none
                          transition-all duration-300"
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
                    type="submit"
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
                    <span>•</span>
                    <span>✓ Driver Details</span>
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

        {/* Fleet Gallery */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <MdFlightTakeoff className="w-4 h-4" />
                24/7 AIRPORT TAXI SERVICE
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Airport Taxi - Pickup & Drop
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Book reliable airport taxi service for IGI Airport with
                professional drivers, fixed pricing, and flight tracking.
                Available 24x7 for all terminals.
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

        {/* Popular Routes Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Popular Cab Routes from {cityName} Airport
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Handpicked routes our travellers book the most. Transparent
                fares, verified cabs, and premium comfort.
              </p>
            </div>

            {/* Pickup/Drop Tabs */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-white rounded-xl shadow-md p-1.5 border border-gray-200">
                <button
                  onClick={() => setActiveTab("pickup")}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "pickup"
                      ? "bg-[#BE1E23] text-white shadow-lg shadow-[#BE1E23]/20"
                      : "text-gray-600 hover:text-[#BE1E23] hover:bg-gray-50"
                  }`}
                >
                  ✈️ Airport Pickup
                </button>
                <button
                  onClick={() => setActiveTab("drop")}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "drop"
                      ? "bg-[#BE1E23] text-white shadow-lg shadow-[#BE1E23]/20"
                      : "text-gray-600 hover:text-[#BE1E23] hover:bg-gray-50"
                  }`}
                >
                  🏠 Airport Drop
                </button>
              </div>
            </div>

            {/* Routes Grid */}
            {filteredRoutes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRoutes.map((route) => (
                  <Link
                    key={route.id}
                    href={route.url}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#BE1E23] transition-colors">
                          {route.from} to {route.to}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {route.distance}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm font-semibold text-gray-700">
                          {route.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {route.time}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full capitalize">
                        Recommended: {route.recommended}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          route.type === "pickup"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {route.type === "pickup"
                          ? "Airport Pickup"
                          : "Airport Drop"}
                      </span>
                    </div>

                    {/* Price and CTA with Dynamic Pricing */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400">
                          Starting from
                        </span>
                        <p className="text-2xl font-bold text-[#BE1E23]">
                          ₹{getRouteWithPrice(route).calculatedPrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#BE1E23] group-hover:underline transition-all">
                          View Cabs
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                <p className="text-gray-500 text-lg">
                  No {activeTab === "pickup" ? "pickup" : "drop"} routes
                  available
                </p>
              </div>
            )}

            {/* View All Button */}
            {filteredRoutes.length > 0 && (
              <div className="text-center mt-10">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#BE1E23] text-white rounded-xl font-semibold hover:bg-[#a0191e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Your {cityName} Airport Cab Now
                  <span>→</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Airport Cities Image Grid Section - Exactly as per image */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Airport Transfers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Book Pickup & Drop at Popular Airports
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Book your guaranteed airport transfer now and enjoy peace of
                mind with our double refund promise!
              </p>
            </div>

            {/* City Image Grid - 3 columns as shown in image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1 - Delhi & Varanasi */}
              <div className="flex flex-col gap-4">
                {/* Delhi */}
                <Link
                  href="/airport-cabs/delhi-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] block flex-1"
                >
                  <img
                    src="/delhi-airport.jpg"
                    alt="Delhi Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold group-hover:text-primary transition-colors">
                      Delhi Airport Transfer
                    </h3>
                  </div>
                </Link>

                {/* Varanasi */}
                <Link
                  href="/airport-cabs/varanasi-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block flex-1"
                >
                  <img
                    src="/varanasi-airport.jpg"
                    alt="Varanasi Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">
                      Varanasi Airport Transfer
                    </h3>
                  </div>
                </Link>
              </div>

              {/* Column 2 - Mumbai & Chennai (Stacked) */}
              <div className="flex flex-col gap-4">
                {/* Mumbai */}
                <Link
                  href="/airport-cabs/mumbai-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block flex-1"
                >
                  <img
                    src="/mumbai-airport.jpg"
                    alt="Mumbai Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">
                      Mumbai Airport Transfer
                    </h3>
                  </div>
                </Link>

                {/* Chennai */}
                <Link
                  href="/airport-cabs/chennai-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block flex-1"
                >
                  <img
                    src="/chennai-airport.jpg"
                    alt="Chennai Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">
                      Chennai Airport Transfer
                    </h3>
                  </div>
                </Link>
              </div>

              {/* Column 3 - Bengaluru, Hyderabad, Pune (Stacked) */}
              <div className="flex flex-col gap-4">
                {/* Bengaluru */}
                <Link
                  href="/airport-cabs/bangalore-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                >
                  <img
                    src="/bangalore-airport.jpg"
                    alt="Bengaluru Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">
                      Bengaluru Airport Transfer
                    </h3>
                  </div>
                </Link>

                {/* Hyderabad */}
                <Link
                  href="/airport-cabs/hyderabad-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                >
                  <img
                    src="/hyderabad-airport.jpg"
                    alt="Hyderabad Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">
                      Hyderabad Airport Transfer
                    </h3>
                  </div>
                </Link>

                {/* Pune */}
                <Link
                  href="/airport-cabs/pune-airport"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                >
                  <img
                    src="/pune-airport.jpg"
                    alt="Pune Airport Transfer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">
                      Pune Airport Transfer
                    </h3>
                  </div>
                </Link>
              </div>
            </div>

            {/* Bottom Note - As shown in image */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                ✈️ {cityName} Airport Transfer • 24/7 Service • Best Price
                Guarantee
              </p>
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

            <div className="grid md:grid-cols-3 gap-8">
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
                  "Excellent {cityName} airport taxi service! The driver was
                  waiting at arrivals with a name board. Car was spotless and AC
                  was perfect. Even with a 2-hour flight delay, the driver
                  tracked my flight and was there when I landed. Highly
                  recommend for airport pickups!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    RK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Rajesh Kumar</p>
                    <p className="text-xs text-gray-500">
                      {cityName} Airport Pickup
                    </p>
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
                  "Best airport drop service in {cityName}! Booked a cab for my
                  4 AM flight. The driver arrived 15 minutes early and helped
                  with luggage. Very professional, safe driving, and fixed
                  pricing with no hidden charges. Will definitely use again!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    PS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Priya Sharma</p>
                    <p className="text-xs text-gray-500">
                      {cityName} Airport Drop
                    </p>
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
                  "Amazing experience with Chiku Cabs for {cityName} airport
                  transfer! Had a midnight flight and was worried about getting
                  a cab. The driver was professional, car was comfortable, and
                  pricing was reasonable. They even provided a child seat for my
                  baby. 5-star service!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    AS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Amit Singh</p>
                    <p className="text-xs text-gray-500">
                      Late Night {cityName} Airport
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Why Choose {cityName} Airport Taxi Service?
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Experience reliable airport transfers with professional drivers
                and premium comfort.
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
                  className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#BE1E23]/10 rounded-xl flex items-center justify-center text-[#BE1E23] mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.text}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Airport Specific */}
        <section className="py-24 px-4" id="faq">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                FAQ
              </div>
              <h2 className="section-title">
                Frequently Asked Questions About {cityName} Airport Taxi
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
                Find answers to common questions about booking airport cabs in{" "}
                {cityName}. Get instant help for your airport transfers.
              </p>
            </div>

            {[
              {
                q: `How do I book a ${cityName} airport taxi?`,
                a: `Booking your ${cityName} airport taxi is simple! Call us at ${PHONE_NUMBER} or send a WhatsApp message with your flight details. You'll get an instant quote and confirmation. We also offer online booking through our website. No app download needed.`,
              },
              {
                q: `Do you provide flight tracking for ${cityName} airport pickups?`,
                a: `Yes! Our drivers track your flight in real-time using advanced flight tracking systems. If your flight is delayed or arrives early, we adjust the pickup time accordingly. You get a FREE 60-minute waiting period from the actual landing time.`,
              },
              {
                q: `What types of vehicles are available for ${cityName} airport transfers?`,
                a: `We offer a variety of vehicles for ${cityName} airport transfers including Swift Dzire (4 seater), Honda Amaze (4 seater), Maruti Ertiga (7 seater), Toyota Innova Crysta (7 seater), and Tempo Traveller (9-12 seater). Choose based on your group size and luggage requirements.`,
              },
              {
                q: `How much does a ${cityName} airport cab cost?`,
                a: `Our ${cityName} airport taxi fares start from ₹10/km. The final fare depends on the vehicle type, distance to your destination, and time of travel. We offer transparent pricing with no hidden charges. Check our popular routes above for estimated fares.`,
              },
              {
                q: `Is it safe to book ${cityName} airport cabs with Chiku Cabs?`,
                a: `Absolutely! Safety is our top priority. All our drivers are verified with background checks and police verification. Our vehicles are regularly sanitized, and we follow all safety protocols. We also share driver details and live GPS tracking with you before your trip.`,
              },
              {
                q: `Can I cancel my ${cityName} airport cab booking?`,
                a: `Yes, you can cancel your booking up to 4 hours before pickup without any charges. Cancellations within 4 hours may attract minimal cancellation fees. Contact our 24/7 support team at ${PHONE_NUMBER} for cancellation assistance.`,
              },
              {
                q: `Do you provide cabs for early morning or late night flights at ${cityName} airport?`,
                a: `Yes! We offer 24x7 service for ${cityName} airport. Whether you have a 4 AM flight or a midnight arrival, our drivers are available round the clock. We specialize in early morning and late night airport transfers.`,
              },
              {
                q: `How can I pay for the ${cityName} airport taxi?`,
                a: `You can pay online via UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, or pay directly to the driver. We accept both cash and digital payments. Advance payment is not required unless you need a special booking.`,
              },
              {
                q: `Do you offer one-way airport taxi service in ${cityName}?`,
                a: `Yes! We offer one-way airport taxi service in ${cityName} that can save you up to 50% compared to round-trip bookings. You only pay for the distance traveled from the airport to your destination.`,
              },
              {
                q: `How early should I book a ${cityName} airport cab?`,
                a: `We recommend booking at least 4-6 hours in advance for guaranteed availability. However, we also accept last-minute bookings based on vehicle availability. For early morning flights, we suggest booking the night before.`,
              },
            ].map((faq, i) => (
              <details key={i} className="faq-item" id={`faq-${i}`}>
                <summary>
                  {faq.q}
                  <span className="faq-chevron">▼</span>
                </summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* 📖 About Chiku Cabs Section - NEW */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/cab.png"
                    alt="About Chiku Cabs"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-2xl font-bold">Chiku Cabs</p>
                    <p className="text-sm opacity-90">
                      Your Trusted Airport Taxi Partner
                    </p>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-4xl font-black">5+</p>
                  <p className="text-sm font-semibold">Years of Service</p>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full mb-4">
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                  Your Trusted{" "}
                  <span className="text-primary">Airport Taxi</span> Partner
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  At Chiku Cabs, we understand that airport travel can be
                  stressful. That's why we've built a reliable, professional,
                  and customer-focused airport taxi service that you can count
                  on.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  With over 5 years of experience, thousands of satisfied
                  customers, and a fleet of well-maintained vehicles, we're
                  committed to making your airport transfers seamless,
                  comfortable, and affordable.
                </p>

                {/* About Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {ABOUT_STATS.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center gap-2 text-primary text-2xl mb-2">
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {stat.number}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {ABOUT_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Your Airport Cab Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to Book Your{" "}
              <span className="text-[#BE1E23]">{cityName}</span> Airport Cab?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Call now for instant confirmation and best rates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="bg-white text-[#BE1E23] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                📞 Call {PHONE_NUMBER}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl text-lg inline-flex items-center gap-2"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
