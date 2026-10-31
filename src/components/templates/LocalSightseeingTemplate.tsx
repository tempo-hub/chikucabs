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
import { cityCabRoutes, CITY_DISPLAY_NAMES } from "@/data/cityCabRoutes";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
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
    image: "/innova-crysta.png",
    pricePerKm: 16,
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
    description: `Book a ${vehicle} for local sightseeing and city tours. Travel comfortably with a professional driver for sightseeing, shopping, local attractions and multiple stops with transparent pricing and easy booking.`,
  };
};

const generateFAQs = (vehicle: string): FAQItem[] => [
  {
    q: "What is included in the Chiku Cabs local sightseeing taxi package?",
    a: "Base sightseeing packages include a dedicated, clean air-conditioned private vehicle, professional uniformed chauffeur, fuel charges, doorstep pickup and drop from your hotel/home, and 5% GST. The driver assists with navigation and itinerary coordination for all agreed local tourist attractions.",
  },
  {
    q: "What hourly and kilometre sightseeing packages are available?",
    a: "We offer multiple sightseeing packages tailored to your schedule: Half Day (4 Hours / 40 KM), Full Day (8 Hours / 80 KM), Extended City Tour (10 Hours / 100 KM), and All-Day City Sightseeing (12 Hours / 120 KM). You can select the package that matches your sightseeing plan during booking.",
  },
  {
    q: "Can I customize my city sightseeing route and visit off-beat places?",
    a: "Yes, 100%. Our local sightseeing tours are completely customizable. You have full freedom to decide the tourist spots, temples, historical monuments, shopping bazaars, and restaurants you wish to visit. You can also ask our experienced local driver for personalized recommendations.",
  },
  {
    q: "Which vehicle is best suited for local sightseeing with family or elders?",
    a: "For solo travelers or couples, an AC Sedan (Dzire / Amaze) offers great fuel economy and nimble city navigation. For families of 4 to 6 with kids, the Maruti Ertiga provides extra legroom and dual AC. For senior citizens or luxury comfort, the Toyota Innova Crysta offers supreme ride quality. For large groups of 9 to 26, our Force Tempo Travellers keep the entire group together.",
  },
  {
    q: "Are monument entry tickets, parking fees, and toll taxes included?",
    a: "Base sightseeing quotes cover car rental, fuel, and chauffeur allowance. Parking slips at specific monuments/malls and monument entry tickets are payable at actuals. Toll charges within municipal city limits are generally not applicable, but any outer bypass toll is billed as per actual electronic Fastag receipt.",
  },
  {
    q: "What happens if my sightseeing trip exceeds the package hours or kilometres?",
    a: "If your trip exceeds the booked duration or distance (for example, beyond 8 Hours or 80 KM), nominal overtime charges apply: extra km starting at ₹12/km for Sedans and ₹15/km for SUVs, and extra waiting time at ₹150/hour. All overtime charges are transparently calculated and presented with zero hidden fees.",
  },
  {
    q: "Do your local chauffeurs act as local guides or know the city landmarks?",
    a: "Yes. Our local chauffeurs are thoroughly familiar with city landmarks, historical monuments, opening/closing hours of temples and museums, clean dining spots, and traffic shortcuts. While they are professional drivers, their local expertise ensures a hassle-free, well-paced sightseeing tour.",
  },
  {
    q: "Can I book a same-day or urgent local sightseeing cab?",
    a: "Yes. While advance booking is recommended during peak tourist weekends and holiday seasons, Chiku Cabs operates 24×7 and offers fast local dispatch within 45 to 60 minutes across major metro and heritage cities. Call us at +91-844-844-5504 or WhatsApp at +91-628-082-0037 for immediate booking.",
  },
  {
    q: "What is the cancellation and rescheduling policy for sightseeing bookings?",
    a: "Chiku Cabs offers a 100% free cancellation policy up to 24 hours prior to the scheduled pickup time with zero cancellation charges and instant refund. You can also reschedule your sightseeing date or time free of cost by contacting our 24×7 support desk.",
  },
  {
    q: "Do you provide doorstep pickup from railway stations, airports, or hotels?",
    a: "Yes. We provide 100% doorstep pickup and drop from any location in the city—including hotel lobbies, railway junctions, airport terminals, or residential addresses—at no additional surcharge.",
  },
  {
    q: "How does Chiku Cabs ensure safety for female travelers, children, and elderly tourists?",
    a: "All Chiku Cabs vehicles are GPS-tracked in real time with continuous operations monitoring. Our chauffeurs undergo mandatory police background verification and passenger etiquette training. Cabs are thoroughly sanitized and air-conditioned for a secure, worry-free tour.",
  },
  {
    q: "What payment modes are accepted for local sightseeing cab bookings?",
    a: "We accept all popular payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Credit/Debit Cards, and cash or digital wallet transfer to the chauffeur at the end of the trip. You can confirm your booking with a small token advance and settle the balance at trip completion.",
  },
];

// --- Main Component ---
export default function LocalSightseeingTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const vehicle = parsedData?.vehicle || DEFAULT_VEHICLE;
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
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [selectedVehicle, setSelectedVehicle] = useState("");

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
      `₹${vehicleDetails.pricePerKm} - ₹${vehicleDetails.pricePerKm * 2}`,
  };

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
    [faqs],
  );

  // Handle get estimate
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

    const message = `🚖 *Fare Estimate Request*

🚕 *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}
🛣️ *Route:* ${pickupLocation} → ${dropLocation}
📅 *Travel Date:* ${travelDate}
⏰ *Travel Time:* ${travelTime}
${tripType === "round-trip" ? `🔄 *Return Date:* ${returnDate}\n` : ""}
🚘 *Vehicle Type:* ${selectedVehicle || vehicle}

Please share the best fare.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Clear form fields
    setPickupLocation("");
    setDropLocation("");
    setTravelDate("");
    setTravelTime("");
    setReturnDate("");
    setSelectedVehicle("");
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
              src="/localcabservice.webp"
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
                  Local Sightseeing Cab Service
                  <br />
                  <span className="text-primary">
                    Starting at ₹{vehicleDetails?.pricePerKm || "10"}/km
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vehicleDetails.description}
                </p>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:+${PHONE_NUMBER}`}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    📞 Book Now
                  </a>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
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

              {/* Right Content - Booking Widget */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Book Your {vehicle || "Outstation Cab"}
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
                      placeholder="Enter Pickup Location"
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
                      placeholder="Enter Drop Location"
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
                      onClick={() => setTripType("one-way")}
                      className={`py-3 rounded-xl font-semibold transition-all ${tripType === "one-way"
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      One Way
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType("round-trip")}
                      className={`py-3 rounded-xl font-semibold transition-all ${tripType === "round-trip"
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      Round Trip
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

                  {/* Return Date (Only for Round Trip) */}
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
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl
                  focus:bg-white
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                  outline-none
                  transition-all duration-300"
                      />
                    </div>
                  )}

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
        <section className="pt-24 pb-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-slate-300">
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
        <section className="py-12 bg-gray-50 border-b border-slate-300">
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

        {/* Services We Offer */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80 border-b border-slate-300">
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
        <section className="py-12 bg-gray-50 border-b border-slate-300">
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

        {/* How It Works */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
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

        {/* Feature Grid - Modern UI with React Icons */}
        <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-primary/5 border-b border-slate-300">
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

        {/* =====================================================
            NEW SECTION 1: SIGHTSEEING CAB VS AUTO VS BUS VS SELF-DRIVE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Smart Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Private Sightseeing Cab vs. Auto vs. Public Bus vs. Self-Drive
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why booking a dedicated local sightseeing cab with Chiku Cabs is the most convenient, comfortable, and cost-effective choice for exploring the city.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Chiku Cabs (Dedicated Cab)</th>
                    <th className="px-5 py-3.5 text-slate-600">Auto-Rickshaw / E-Rickshaw</th>
                    <th className="px-5 py-3.5 text-slate-600">Public Bus / Metro</th>
                    <th className="px-5 py-3.5 text-slate-600">Self-Drive Rental</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Climate Comfort</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Chilled AC comfort all day
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heat, dust, humidity & traffic fumes</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded & long walking transfers</td>
                    <td className="px-5 py-3.5 text-slate-600">✔ AC car available</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Doorstep Hotel Pickup</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Direct porch pickup & doorstep drop
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must haggle on street corners</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must walk to bus stops/stations</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must visit vehicle depot</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Itinerary Flexibility</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Stop anywhere for food, photos & shopping
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Meter disputes & refused destinations</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed rigid transit lines</td>
                    <td className="px-5 py-3.5 text-slate-600">✔ Flexible routing</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Parking & Navigation</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Driver handles heavy traffic & parking
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Driver drops only on busy main roads</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ No personalized parking</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Stressful parking search & fines</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Elder & Family Friendly</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Direct gate drop at monuments & temples
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Bumpy suspension & jerky rides</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded coaches & stairs</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Driver fatigue for family member</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 2: LOCAL SIGHTSEEING PACKAGES & RATE CARD
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Transparent Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Local Sightseeing Rental Packages & Vehicle Rates
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Choose the package that fits your day plan. Every booking includes a sanitized vehicle, verified chauffeur, and fuel.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Vehicle Category</th>
                    <th className="px-4 py-4">Seating & Luggage</th>
                    <th className="px-4 py-4">Half Day (4h / 40km)</th>
                    <th className="px-4 py-4">Full Day (8h / 80km)</th>
                    <th className="px-4 py-4">Extended (12h / 120km)</th>
                    <th className="px-4 py-4">Extra KM / Hr</th>
                    <th className="px-4 py-4 text-center">Instant Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      name: "Sedan (Dzire / Amaze / Etios)",
                      seats: "4 Passengers + 2 Bags",
                      halfDay: "₹1,299",
                      fullDay: "₹1,999",
                      extDay: "₹2,699",
                      extra: "₹12/km • ₹150/hr",
                      tag: "Most Popular",
                    },
                    {
                      name: "Spacious SUV (Maruti Ertiga)",
                      seats: "6 Passengers + 3 Bags",
                      halfDay: "₹1,799",
                      fullDay: "₹2,799",
                      extDay: "₹3,699",
                      extra: "₹15/km • ₹150/hr",
                      tag: "Family Choice",
                    },
                    {
                      name: "Premium SUV (Innova Crysta)",
                      seats: "7 Passengers + 4 Bags",
                      halfDay: "₹2,499",
                      fullDay: "₹3,899",
                      extDay: "₹4,999",
                      extra: "₹18/km • ₹200/hr",
                      tag: "Luxury Travel",
                    },
                    {
                      name: "Mini Coach (Tempo Traveller)",
                      seats: "9 to 16 Passengers",
                      halfDay: "₹3,499",
                      fullDay: "₹5,499",
                      extDay: "₹7,299",
                      extra: "₹24/km • ₹300/hr",
                      tag: "Group Tour",
                    },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          {item.name}
                          {item.tag && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {item.tag}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-700">{item.seats}</td>
                      <td className="px-4 py-4 font-bold text-slate-900">{item.halfDay}</td>
                      <td className="px-4 py-4 font-black text-primary text-base">{item.fullDay}</td>
                      <td className="px-4 py-4 font-bold text-slate-900">{item.extDay}</td>
                      <td className="px-4 py-4 text-xs text-slate-600">{item.extra}</td>
                      <td className="px-4 py-4 text-center">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hi Chiku Cabs, I want to book a local sightseeing package for ${item.name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                        >
                          <FaWhatsapp className="text-sm" /> Book Now
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-2">
              <p>*Package includes base hours, kilometres, fuel, driver allowance, and GST. Monument entry tickets & parking slips payable at actuals.</p>
              <p className="font-semibold text-slate-700">Verified Pricing • Current Season</p>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 3: TOP SIGHTSEEING TRAILS & COVERAGE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Citywide Excursions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Curated Sightseeing Trails & Doorstep Pickup Hubs
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Discover the best of the city with our expertly planned local circuits and 100% doorstep hotel or residential pickup.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Trail 1: Heritage & History */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Heritage & Historical Forts
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Historic Forts, Palaces & Museums
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> UNESCO World Heritage Monuments
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Colonial Landmarks & Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Guided pacing without driver rush
                  </li>
                </ul>
              </div>

              {/* Trail 2: Temples & Spirituality */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Temples & Spiritual Shrines
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Famous Morning / Evening Aarti Visits
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Direct drop near temple entry gates
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Elder-friendly assistance & shoe stands
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Sacred river ghats & pilgrimage spots
                  </li>
                </ul>
              </div>

              {/* Trail 3: Markets & Shopping */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Bazaars & Traditional Handicrafts
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Famous street markets & silk emporiums
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Safe luggage storage while you shop
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Local souvenir & artisan workshops
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Driver coordinates pickup on phone call
                  </li>
                </ul>
              </div>

              {/* Trail 4: Food & Culinary */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Culinary & Food Hotspots
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Iconic street food lanes & sweets
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Traditional family restaurants & thalis
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> High-end rooftop dining & cafes
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Late evening return safely to hotel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 4: INCLUSIONS, EXCLUSIONS & SIGHTSEEING TERMS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                100% Transparent
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Sightseeing Inclusions, Exclusions & Booking Terms
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Zero surprise charges at the end of your day. Full clarity on inclusions, exclusions, and booking rules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-primary" /> What is Included in Your Package
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Dedicated Vehicle:</strong> Full private AC car reserved exclusively for your family.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Fuel & Maintenance:</strong> All petrol, diesel, or CNG expenses covered within the package limits.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Chauffeur Allowance:</strong> Driver fee, city navigation, and duty allowance included.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Doorstep Pickup & Drop:</strong> Direct pickup and drop at any hotel, residence, or station in the city.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Applicable Taxes:</strong> Goods and Services Tax (GST 5%) included with invoice.</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions & Terms */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-primary" /> Exclusions & Operational Terms
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Monument & Temple Entry:</strong> Entrance tickets to monuments, museums, or shrines payable directly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Parking Charges:</strong> Municipal or monument parking fees payable at actual receipts if applicable.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Extra Kilometres & Hours:</strong> Transparent nominal overtime rates applied only if package limits are exceeded.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Free Cancellation:</strong> 100% full refund on cancellations made at least 24 hours prior to departure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>24×7 Operations Desk:</strong> Immediate assistance, route adjustments, and support via WhatsApp and phone.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-12 bg-gray-50 border-b border-slate-300">
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

        {/* About Local Taxi Service (SEO Content) */}
        <section className="py-12 bg-white/95 border-b border-slate-300">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-bold mb-8">
              Local Sightseeing Taxi Service
            </h2>

            <div className="prose prose-lg max-w-none">
              <p>
                Chiku Cab provides reliable local taxi service for sightseeing,
                shopping, business travel, temple visits, airport transfers and
                city tours.
              </p>

              <p>
                Our fleet includes Dzire, Amaze, Ertiga and Innova Crysta
                vehicles operated by experienced drivers.
              </p>

              <p>
                Whether you need a half-day package or a full-day city tour, we
                provide affordable local cab services with transparent pricing.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 bg-muted/20 border-b border-slate-300">
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
        <div className="py-12 border-b broder-slate-300 bg-white/95">
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
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto cta-banner">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to Book Your Ride?
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call now and get instant confirmation for your {vehicle} rental.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:+${PHONE_NUMBER}`}
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
