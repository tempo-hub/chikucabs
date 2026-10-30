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
  FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { cityCabRoutes, CITY_DISPLAY_NAMES } from "@/data/cityCabRoutes";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";

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
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();
const DRIVER_ALLOWANCE = 500;


const calculateFareByDistance = (
  travelDistance: number,
  pricePerKm: number = 9,
) => {
  if (isNaN(travelDistance) || travelDistance <= 0) {
    return 0;
  }

  const rate = Number.isFinite(pricePerKm) && pricePerKm > 0 ? pricePerKm : 9;
  return Math.round(travelDistance * 1.5 * rate + DRIVER_ALLOWANCE);
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
  description: `Book a ${vehicle} for comfortable outstation travel. Enjoy well-maintained vehicles, professional drivers, spacious seating and reliable service for family trips, group journeys and long-distance travel.`,
};
};

const generateFAQs = (vehicle: string): FAQItem[] => [
  {
    q: "How is the outstation cab fare calculated per km with Chiku Cabs?",
    a: "Outstation taxi fares with Chiku Cabs are calculated transparently based on total travel distance, selected vehicle category, and trip type (one-way or round-trip). Rates start at ₹9/km for executive Sedans (Dzire, Amaze), ₹13/km for 6-seater SUVs (Ertiga), ₹16/km for luxury 7-seater Innova Crysta, and ₹28/km for tempo travellers. Quoted base fares include vehicle rental, fuel expenses, and standard driver allowance (₹500/day). Highway toll taxes and inter-state permits are billed at actuals with zero hidden charges.",
  },
  {
    q: "Can I book a dedicated one-way outstation cab without paying return fare?",
    a: "Yes, 100%. Chiku Cabs is a pioneer in point-to-point one-way outstation taxi booking across thousands of Indian cities and routes. You only pay for the exact one-way distance traveled from your doorstep in the origin city to your destination drop address. You are never billed for the driver's return trip or empty return mileage.",
  },
  {
    q: "Are toll charges, driver allowance (batta), and state border permits included in the fare?",
    a: "Base outstation fares transparently bundle vehicle hire, fuel charges, driver allowance (batta), and 5% GST. Highway toll charges are passed on at actuals through computerized Fastag receipts. If your road trip crosses state borders, commercial passenger state entry permits and specific airport/monument parking charges are payable at actuals with full electronic receipt clarity.",
  },
  {
    q: "Which vehicle is best suited for family, elder, or pilgrimage outstation road trips?",
    a: `For solo commuters or couples with 1-2 bags, an executive Sedan (Dzire or Amaze) delivers optimum economy and AC comfort. For families with children and luggage, the 6-seater Maruti Ertiga offers expansive boot space and dual air conditioning. For long-distance spiritual yatras (Varanasi, Ayodhya, Gaya, Shirdi, Tirupati) or senior citizens requiring superior highway shock absorption, the 7-seater Toyota Innova Crysta is highly recommended. Groups of 9 to 12 can reserve our luxury Force Tempo Travellers.`,
  },
  {
    q: "How far in advance should I book an outstation taxi, and is late-night dispatch available?",
    a: "While booking 12 to 24 hours in advance guarantees your preferred car model and chauffeur, Chiku Cabs operates 24×7 and provides on-demand emergency outstation dispatch within 2 to 3 hours across major hubs (Delhi NCR, Varanasi, Lucknow, Jaipur, Mumbai, Pune, Bangalore). You can reserve round the clock online, via WhatsApp at +91-628-082-0037, or by calling +91-844-844-5504.",
  },
  {
    q: "What is Chiku Cabs' cancellation and refund policy for outstation bookings?",
    a: "We offer a zero-risk 100% refund policy. If your travel schedule changes, you can cancel your outstation cab booking up to 24 hours prior to scheduled departure with zero cancellation fees. Refunds are processed immediately to your original payment method (UPI or bank account) within 24 to 48 hours. Cancellations within 24 hours of pickup incur only a nominal chauffeur dispatch charge.",
  },
  {
    q: "Can we request food, washroom, and sightseeing pauses along the highway?",
    a: "Yes, absolutely. Unlike rigid train or public bus schedules, one of the greatest benefits of booking a private outstation cab with Chiku Cabs is total route flexibility. Our polite, verified chauffeurs gladly accommodate stops at hygienic family highway dhabas, clean restrooms, fuel stations, and en-route tourist attractions or temples without any extra waiting penalty.",
  },
  {
    q: "Is there a night driving allowance or driver night charge for outstation journeys?",
    a: "Daytime driver allowance is already bundled into your standard quote. A nominal night driving charge (typically ₹250 to ₹300) applies only if the vehicle is actively in transit during overnight hours between 10:00 PM and 6:00 AM, compensating the chauffeur for overnight highway driving.",
  },
  {
    q: "Do you offer doorstep pickup from my home, hotel, railway station, or airport?",
    a: "Yes. Every Chiku Cabs outstation booking includes 100% doorstep pickup from any residential address, hotel lobby, railway junction, or airport terminal in the origin city, followed by doorstep drop directly at your final destination address with zero hidden city pick-and-drop surcharges.",
  },
  {
    q: "How does Chiku Cabs guarantee passenger safety for female, elderly, and family travelers?",
    a: "Every Chiku Cabs vehicle is GPS-tracked with 24×7 live monitoring by our centralized operations desk. Our chauffeurs undergo rigorous background checks, commercial license verification, and highway etiquette training. Vehicles undergo routine 30-point safety and AC hygiene inspections before every long-distance journey.",
  },
  {
    q: "What payment modes are accepted for outstation cab bookings?",
    a: "We support all modern and convenient payment channels including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Debit/Credit Cards, and cash or digital transfer to the driver upon trip completion. You can confirm your ride with a small advance deposit and pay the remaining balance comfortably during your trip.",
  },
  {
    q: "Can I book customized multi-city outstation tour packages with Chiku Cabs?",
    a: "Yes. In addition to direct one-way outstation drops, we organize customized multi-day, multi-city outstation tour circuits (such as Delhi–Agra–Jaipur Golden Triangle, Varanasi–Ayodhya–Prayagraj pilgrimage tours, Mumbai–Pune–Mahabaleshwar getaways, or Bangalore–Coorg–Ooty hill station tours) with dedicated vehicles, experienced chauffeurs, and competitive all-inclusive day package pricing.",
  },
];

// --- Main Component ---
export default function OutstationTemplate({
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
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  // Scroll handler for sticky CTA
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateFare = useCallback(() => {
  const distance = parseFloat(formData.distance);

  if (!isNaN(distance) && distance > 0) {
    const totalDistance =
      tripType === "round-trip" ? distance * 2 : distance;

    const finalFare = calculateFareByDistance(
      totalDistance,
      vehicleDetails.pricePerKm,
    );

    setEstimatedPrice(finalFare);
  } else {
    setEstimatedPrice(null);
  }
}, [
  formData.distance,
  vehicleDetails.pricePerKm,
  tripType,
]);

useEffect(() => {
  calculateFare();
}, [calculateFare]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

🚕 *Trip Type:* ${tripType}
🛣️ Route: ${pickupLocation} → ${dropLocation}
📅 *Travel Date:* ${travelDate}
⏰ *Travel Time:* ${travelTime}
${tripType === "round-trip" ? `🔄 *Return Date:* ${returnDate}\n` : ""}
🚘 *Vehicle Type:* ${selectedVehicle || "Not Selected"}

Please share the fare estimate.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

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
              src="/outstation.webp"
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
                  Outstation Cab Service
                  <br />
                  <span className="text-primary">
                    Starting at ₹{vehicleDetails?.pricePerKm || "10"}/km
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vehicleDetails?.description ||
                    "Safe, reliable, and affordable outstation taxi service for one-way & round trips. Professional drivers, sanitized cars, and 24/7 support."}
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

              {/* Right Content - Booking Widget */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Book Your {vehicle || "Outstation Cab"}
                </h3>
                <p className="text-gray-600 mb-6">
                  Get a quick fare estimate for your outstation journey
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
                      className={`py-3 rounded-xl font-semibold transition-all ${
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
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        tripType === "round-trip"
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
        <section className="py-12 bg-gray-50">
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
        <section className="py-12 bg-white">
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
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80">
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
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
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

        {/* Popular Travel Destinations - Enhanced UI */}
        <section className="py-12 bg-gray-50">
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
                              calculateFareByDistance(route.distance),
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
        <section className="py-12 bg-gray-50">
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
                      // Calculate One Way Price using shared route fare formula
                      const oneWayPrice = calculateFareByDistance(
                        route.distance,
                      );

                      // Calculate Round Trip Price (2x distance with 10% discount)
                      const roundTripBase =
                        calculateFareByDistance(route.distance * 2);
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

        {/* Outstation Travel Benefits */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                Travel Smarter
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Benefits of Booking Outstation Cabs
              </h2>

              <p className="max-w-3xl mx-auto text-gray-600">
                Enjoy comfortable, affordable, and hassle-free travel with our
                professional outstation taxi services. Travel at your own pace
                and experience a smoother journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <FaRoad className="text-2xl text-blue-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Door-to-Door Pickup
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Get picked up directly from your location and dropped at your
                  exact destination without changing vehicles.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                  <FaWallet className="text-2xl text-green-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Cost Effective Travel
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Affordable fares with transparent pricing, no hidden charges,
                  and attractive one-way outstation discounts.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <FaClock className="text-2xl text-purple-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Flexible Travel Schedule
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Travel whenever you want without depending on train or bus
                  timings. Make stops along the route as needed.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                  <FaUserShield className="text-2xl text-orange-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Safe & Reliable Rides
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Experienced chauffeurs, GPS-enabled vehicles, and 24×7
                  customer support ensure a safe travel experience.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center mb-5">
                  <FaSuitcaseRolling className="text-2xl text-pink-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Extra Luggage Space
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Carry your bags comfortably without worrying about luggage
                  limits commonly found in public transport.
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-yellow-50 flex items-center justify-center mb-5">
                  <FaMountain className="text-2xl text-yellow-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Scenic Road Trips
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Explore scenic routes, sightseeing spots, restaurants, and
                  local attractions during your journey.
                </p>
              </div>

              {/* Benefit 7 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-5">
                  <FaCarSide className="text-2xl text-indigo-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Wide Vehicle Options
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose from Hatchbacks, Sedans, SUVs, Tempo Travellers, and
                  Luxury Cars according to your travel needs.
                </p>
              </div>

              {/* Benefit 8 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                  <FaHeadset className="text-2xl text-red-600" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  24×7 Assistance
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Dedicated support team available round the clock for booking,
                  trip updates, and travel assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
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

        {/* =====================================================
            NEW SECTION 1: CAB VS TRAIN VS BUS COMPARISON TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Smart Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Outstation Cab vs. Train vs. Public Bus
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why booking a private outstation cab with Chiku Cabs is the most convenient, flexible, and comfortable choice for families, elders, and travelers with luggage.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Chiku Cabs (Private Outstation Cab)</th>
                    <th className="px-5 py-3.5 text-slate-600">Train (IRCTC)</th>
                    <th className="px-5 py-3.5 text-slate-600">Public / Sleeper Bus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Door-to-Door Pickup</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Doorstep Pickup & Drop at your home or hotel
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Reach station via auto/cab</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must reach bus depot / bypass</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Departure Flexibility</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Depart 24×7 at your exact convenient schedule
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed timetable / waitlists</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed evening schedules</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Senior Citizen Friendly</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Direct gate drop with zero stairs or crowds
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Overbridge stairs & crowded platforms</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ High steps & jerky motion</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Handling</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Dedicated boot trunk & safe carrier space
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heavy lifting across platforms & coolie charges</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Limited & insecure luggage hold</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Travel Privacy</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Private sanitized AC car with family
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded shared coach</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Shared cabin with strangers</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">En-Route Sightseeing</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Flexible stops at highway dhabas, temples & viewpoints
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ No midway stops permitted</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Strict scheduled stops only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 2: OUTSTATION FLEET RATE CARD & PER-KM MATRIX
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Transparent Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Outstation Cab Rates & Vehicle Options
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Clear per-kilometre outstation pricing across India. All bookings include clean AC vehicles, fuel, and experienced highway chauffeurs.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Vehicle Category</th>
                    <th className="px-4 py-4">Seating & Luggage</th>
                    <th className="px-4 py-4">Rate / KM</th>
                    <th className="px-4 py-4">Sample 250 KM Fare</th>
                    <th className="px-4 py-4">Best For</th>
                    <th className="px-4 py-4 text-center">Instant Quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      name: "Sedan (Dzire / Amaze / Etios)",
                      seats: "4 Passengers + 2 Bags",
                      rate: "₹9/km",
                      fare: calculateFareByDistance(250, 9),
                      best: "Couples, small families & business travelers",
                      tag: "Popular",
                    },
                    {
                      name: "Compact SUV (Maruti Ertiga)",
                      seats: "6 Passengers + 3 Bags",
                      rate: "₹13/km",
                      fare: calculateFareByDistance(250, 13),
                      best: "Families with extra luggage & weekend road trips",
                      tag: "Best Value",
                    },
                    {
                      name: "Premium SUV (Innova Crysta)",
                      seats: "7 Passengers + 4 Bags",
                      rate: "₹16/km",
                      fare: calculateFareByDistance(250, 16),
                      best: "Pilgrimage groups, executive comfort & mountain tours",
                      tag: "Top Rated",
                    },
                    {
                      name: "Luxury Mini Coach (Tempo Traveller)",
                      seats: "9 to 12 Passengers + 8 Bags",
                      rate: "₹28/km",
                      fare: calculateFareByDistance(250, 28),
                      best: "Joint families, wedding guests & pilgrimage yatras",
                      tag: "Group Travel",
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
                      <td className="px-4 py-4 font-bold text-slate-900">{item.rate}</td>
                      <td className="px-4 py-4">
                        <span className="font-black text-primary text-base">
                          ₹{item.fare.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 block">Incl. Fuel & Driver</span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-600">{item.best}</td>
                      <td className="px-4 py-4 text-center">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hi Chiku Cabs, I want to book an outstation cab for ${item.name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
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
              <p>*Estimated fare calculated with base rate and standard driver allowance. Highway Fastag tolls at actuals.</p>
              <p className="font-semibold text-slate-700">Verified Rates • 2026 Season</p>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 3: DOORSTEP PICKUP & DROP COVERAGE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Pan-India Presence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Doorstep Outstation Pickup & Drop Hubs
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                We serve thousands of routes across North, West, South, and Central India with zero hidden charges and verified local chauffeurs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Region 1: Delhi NCR & North India */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Delhi NCR & Northern Hubs
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Delhi to Agra, Jaipur, Chandigarh, Shimla
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Noida & Greater Noida Doorstep Pickup
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Gurgaon (Cyber Hub, Sohna Rd, Golf Course)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> IGI Airport (T1, T2, T3) Direct Transfers
                  </li>
                </ul>
              </div>

              {/* Region 2: Uttar Pradesh & Pilgrimage */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> UP & Spiritual Corridors
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Varanasi to Gaya, Bodh Gaya & Prayagraj
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Ayodhya Ram Mandir & Lucknow Circuits
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Mathura, Vrindavan & Agra Heritage Trips
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Cantt & DDU Railway Station Pickups
                  </li>
                </ul>
              </div>

              {/* Region 3: Western India */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Western India Routes
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Mumbai to Pune, Shirdi, Nashik, Lonavala
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Pune to Mahabaleshwar & Goa
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Ahmedabad to Udaipur, Surat, Vadodara
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Mumbai CSMIA Airport Outstation Pickups
                  </li>
                </ul>
              </div>

              {/* Region 4: Southern India */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-lg" /> Southern India Corridors
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Bangalore to Mysore, Coorg, Ooty, Chikmagalur
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Chennai to Pondicherry, Tirupati, Vellore
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Hyderabad to Vijayawada, Srisailam, Warangal
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-xs" /> Kempegowda (BLR) Airport Outstation Trips
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 4: INCLUSIONS, EXCLUSIONS & BOOKING TERMS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                100% Transparent
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Fare Inclusions, Exclusions & Rental Terms
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                No surprises at the end of your trip. Here is our full fare transparency policy for all outstation bookings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-600" /> What is Included in Your Fare
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Base Vehicle Hire:</strong> Clean, sanitized AC Sedan, SUV, or Tempo Traveller for your route.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Fuel & Maintenance:</strong> All fuel charges (petrol, diesel, CNG) are included in the quoted fare.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Driver Allowance:</strong> Daily driver bata/allowance and food expenses are 100% covered.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Doorstep Pickup & Drop:</strong> Direct pickup from your home, office, hotel, or station with zero city surcharges.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Applicable GST:</strong> Goods and Services Tax included with an official commercial GST invoice.</span>
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
                    <span><strong>Highway Toll Taxes:</strong> Payable at actual Fastag booths en route with complete electronic receipt clarity.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>State Border Tax Permits:</strong> Inter-state passenger commercial road tax permits payable at actuals if crossing state borders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Airport Parking / Monument Entry:</strong> Parking receipts payable only if vehicle enters paid airport/monument zones.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>24-Hour Free Cancellation:</strong> 100% full refund on bookings cancelled up to 24 hours prior to scheduled departure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>24×7 Human Support:</strong> Direct WhatsApp and phone re-dispatch assistance available around the clock.</span>
                  </li>
                </ul>
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
                Frequently Asked Questions About Outstation Cab Service
              </h2>
              <p className="text-muted-foreground mt-4">
                Everything you need to know about outstation taxi fares, vehicle options, doorstep pickup, toll policies &amp; booking terms across India.
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

        {/* About Outstation Cab Service */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Chiku Cabs Outstation Service
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Chiku Cabs offers reliable outstation taxi services for
                  one-way and round trips across India. With a fleet of
                  well-maintained vehicles and professional drivers, we ensure
                  safe and comfortable journeys for our customers. Whether
                  you're planning a weekend getaway, business trip, or family
                  vacation, our outstation cabs provide the perfect
                  transportation solution.
                </p>
                <p>
                  Our outstation service covers major routes including Delhi to
                  Jaipur, Mumbai to Pune, Bangalore to Mysore, Chennai to
                  Pondicherry, and many more. We offer competitive pricing with
                  no hidden charges, 24/7 customer support, and GPS-enabled
                  vehicles for your safety.
                </p>
                <p>
                  All our vehicles are regularly sanitized and maintained to the
                  highest standards. Our drivers are experienced, verified, and
                  trained to provide the best service. Book your outstation cab
                  with Chiku Cabs for a hassle-free travel experience.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-gray-500">Happy Customers</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-gray-500">Fleet of Cars</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-2xl font-bold text-primary">100+</div>
                    <div className="text-sm text-gray-500">Routes Covered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Documents Required */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📋</span>
                  <h3 className="text-xl font-bold text-gray-800">
                    Documents Required
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Valid Driving License",
                    "ID Proof (Aadhar/PAN/Passport)",
                    "Booking Confirmation",
                    "Address Proof (for outstation)",
                  ].map((doc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Measures */}
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">⚠️</span>
                  <h3 className="text-xl font-bold text-gray-800">
                    Safety Measures
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Regular Vehicle Sanitization",
                    "Driver Temperature Check",
                    "GPS Tracking",
                    "Emergency Contact Available",
                  ].map((safety, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">{safety}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Explore More Services
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                Other Taxi Services
              </h2>

              <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                Looking for more than outstation travel? Explore our airport
                transfers, one-way cabs, local sightseeing tours, and tempo
                traveller rentals for a comfortable and hassle-free journey.
              </p>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "One Way Cabs",
                  href: "/one-way-cabs",
                  icon: <FaRoute size={22} />,
                  description:
                    "Affordable one-way taxi services with no return fare charges.",
                },
                {
                  title: "Airport Taxi",
                  href: "/airport-taxi",
                  icon: <FaPlaneArrival size={22} />,
                  description:
                    "Reliable airport pickup and drop services available 24/7.",
                },
                {
                  title: "Local Sightseeing",
                  href: "/local-sightseeing-taxi",
                  icon: <FaMapMarkedAlt size={22} />,
                  description:
                    "Explore popular tourist attractions with comfortable local taxis.",
                },
                {
                  title: "Tempo Traveller",
                  href: "/tempo-traveller-on-rent",
                  icon: <FaBusAlt size={22} />,
                  description:
                    "Perfect for family trips, group tours, and corporate outings.",
                },
              ].map((service) => (
                <Link key={service.title} href={service.href}>
                  <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                      {service.title}
                    </h3>

                    <p className="text-sm leading-6 text-gray-600">
                      {service.description}
                    </p>

                    <div className="mt-5 flex items-center font-medium text-primary">
                      Explore Service
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 z-50 md:hidden">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500">Starting from</div>
              <div className="text-xl font-bold text-primary">₹12/km</div>
              <div className="text-xs text-gray-500">+ No Hidden Charges</div>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/30"
            >
              Book Now 📞
            </button>
          </div>
        </div>

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
