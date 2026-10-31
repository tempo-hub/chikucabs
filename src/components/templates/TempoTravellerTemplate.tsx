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
  FaWhatsapp,
  FaShieldAlt,
} from "react-icons/fa";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
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
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();

const VEHICLE_DETAILS_MAP: Record<
  string,
  Omit<VehicleDetails, "description">
> = {
  tempo: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 20,
    capacity: "9-26 Passengers",
    luggage: "8-30+ Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Ample Luggage Space",
    ],
  },
  traveller: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 20,
    capacity: "9-26 Passengers",
    luggage: "8-30+ Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Ample Luggage Space",
    ],
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

  const baseDetails =
    lowerV.includes("tempo") || lowerV.includes("traveller")
      ? VEHICLE_DETAILS_MAP[lowerV.includes("tempo") ? "tempo" : "traveller"]
      : VEHICLE_DETAILS_MAP.traveller;

  return {
    ...baseDetails,
    description: `Travel comfortably with our ${vehicle} rental service, ideal for ${baseDetails.capacity}. Enjoy spacious seating and ample luggage space for your journey.`,
  };
};

const TEMPO_DATAS = [
  { seater: 9, pricePerKm: 20 },
  { seater: 10, pricePerKm: 21 },
  { seater: 12, pricePerKm: 22 },
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
    popular: true,
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
    desc: "Ideal for medium groups & corporate outings",
    price: 22,
    seating: "3+3+3+3 Pushback",
    luggage: "12-15 Bags",
    best: true,
    popular: false,
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

export default function TempoTravellerTemplate({
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
            grouped[routeCity].push({ url: r.url, to });
          }
        }
      }
    });
    return grouped;
  }, []);

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
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDestinationCity, setSelectedDestinationCity] = useState("");
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [showAllFareCities, setShowAllFareCities] = useState(false);
  const cityName = city !== "India" ? city : "";
  const citySlug = cityName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const pageTitle = cityName
  ? `Tempo Traveller on Rent in ${cityName} | 9–26 Seater – Chiku Cabs`
  : "Tempo Traveller on Rent | 9–26 Seater – Chiku Cabs";

  const pageDescription = cityName
  ? `Hire verified Tempo Traveller in ${cityName} for local sightseeing, airport transfers & corporate travel. City-expert drivers, clean AC cars. Call 9818022327.`
  : "Hire a verified Tempo Traveller for local sightseeing, airport transfers and corporate travel across India. Clean AC vehicles and professional drivers. Call 9818022327.";
  useEffect(() => {
    const cityKeys = Object.keys(groupedTempoRoutes);

    if (cityKeys.length > 0 && !cityKeys.includes(selectedDestinationCity)) {
      setSelectedDestinationCity(cityKeys[0]);
    }
  }, [groupedTempoRoutes, selectedDestinationCity]);



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
      lowPrice: "20",
      highPrice: "29",
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

  const TEMPO_FAQS = useMemo(() => [
    {
      q: `What seating capacities are available for Tempo Traveller rental in ${city !== "India" ? city : "India"}?`,
      a: `Chiku Cabs offers 9, 10, 12, 15, 16, 17, 18, 20, and 26-seater luxury and maharaja tempo travellers in ${city !== "India" ? city : "all major Indian cities"}. Configurations include 1x1 Maharaja pushback captain seats, 2x1 executive pushbacks, and 2x2 spacious group seating—all equipped with individual AC vents and high boot space.`,
    },
    {
      q: `What is the starting per-kilometer fare for Tempo Traveller hire in ${city !== "India" ? city : "India"}?`,
      a: `Tempo Traveller rentals start from ₹20/km for 9-seaters, ₹22/km for 12-seaters, ₹25/km for 16-seaters, and ₹29/km for 20-seaters. Outstation journeys have a standard 250 km or 300 km daily billing minimum. Local 8h/80km packages start from ₹4,500.`,
    },
    {
      q: `Are toll taxes, interstate permits, and driver charges included in the fare?`,
      a: `Our quotation clearly itemizes all costs. The base fare covers vehicle rental, fuel, and chauffeur services. State entry border permits, highway toll plazas, and parking slips are charged at actual government receipts. Night driver allowance (typically ₹400–₹500) applies only if travel extends beyond 10:00 PM.`,
    },
    {
      q: `What luxury amenities and entertainment systems are equipped in the vehicle?`,
      a: `Every Chiku Cabs tempo traveller is equipped with powerful dual-blower AC, ergonomic reclining pushback seats, individual USB mobile charging points, LED television with multimedia USB/Bluetooth audio, reading lights, ambient ceiling lighting, and clean neck rests for long journeys.`,
    },
    {
      q: `How much luggage capacity is available for 9, 12, 16, and 20 seater Tempo Travellers?`,
      a: `Our tempo travellers feature dedicated rear luggage compartments capable of carrying 8 to 25+ trolley suitcases depending on vehicle size. For extra gear or pilgrimage baggage, secure heavy-duty rooftop luggage carriers with waterproof tarpaulin protection are provided.`,
    },
    {
      q: `Can we book a Tempo Traveller for outstation round-trips and multi-day hill station tours?`,
      a: `Yes! Chiku Cabs specializes in outstation family tours, Char Dham pilgrimages, Rajasthan heritage trails, Himachal and Uttarakhand hill station excursions, and coastal trips. Our commercial-badge drivers have extensive mountain and highway experience.`,
    },
    {
      q: `Does the air conditioning work while driving in mountain ghats and hilly routes?`,
      a: `Yes, all our tempo travellers have heavy-duty engine and dual AC compressors. However, on steep uphill mountain hairpin bends, drivers may briefly moderate AC cooling to maintain optimal vehicle power and climbing safety, as per standard automotive protocols.`,
    },
    {
      q: `Can I hire a Tempo Traveller for wedding guest transfers and corporate offsites in ${city !== "India" ? city : "India"}?`,
      a: `Yes! We provide multi-vehicle fleets for wedding processions (baraat transfers), airport/railway station bulk arrivals, and corporate employee offsite conferences. We can coordinate multi-tempo logistics with designated on-ground supervisors.`,
    },
    {
      q: `What safety protocols and emergency roadside support do you provide?`,
      a: `All vehicles undergo rigorous 40-point fitness inspections before dispatch, including brake tests, tire health, and sanitization. Each tempo is equipped with GPS live tracking, a commercial speed governor (80 km/h compliance), a certified fire extinguisher, and a comprehensive first aid medical kit.`,
    },
    {
      q: `What is the cancellation, modification, and refund policy?`,
      a: `We provide complete flexibility with 100% free cancellation if canceled up to 24 hours prior to scheduled departure. Advance booking deposits are refunded instantly to your original payment mode without hidden penalty deductions.`,
    },
    {
      q: `How far in advance should I reserve a Tempo Traveller during peak holiday seasons?`,
      a: `For peak holiday seasons, summer vacations, wedding dates, and festive long weekends, we recommend reserving your tempo traveller 5 to 7 days in advance to guarantee your preferred seating layout and newest vehicle models.`,
    },
    {
      q: `How do I confirm my booking and verify vehicle photos/videos before the trip?`,
      a: `You can reserve instantly by calling +91-9818022327 or messaging our 24/7 WhatsApp desk at 916280820037. Our reservations team will share authentic photos and video walkarounds of the exact tempo traveller assigned to your journey along with driver credentials.`,
    },
  ], [city]);

  const faqSchema = useMemo(() => ({
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
  }), [TEMPO_FAQS]);

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

    const message = `🚖 *Tempo Traveller Fare Estimate Request*

🚕 *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}
🛣️ *Route:* ${pickupLocation} → ${dropLocation}
📅 *Travel Date:* ${travelDate}
⏰ *Travel Time:* ${travelTime}
${tripType === "round-trip" ? `🔄 *Return Date:* ${returnDate}\n` : ""}
🚐 *Tempo Traveller:* ${selectedVehicle || vehicle}

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

  const farePickupCities = useMemo(() => {
    const farePrefix = "/tempo-traveller-fare-in-";

    // Get only fare URLs
    const fareUrls = (routeData as { url: string }[])
      .filter((item) => item.url.startsWith(farePrefix));

    return fareUrls
      .map((item) => {
        const slug = item.url
          .replace(farePrefix, "")
          .replace(/\/$/, "");

        const city = cities.find(
          (city) =>
            city.name.toLowerCase().replace(/\s+/g, "-") ===
            slug.toLowerCase()
        );

        if (!city) return null;

        return {
          ...city,
          url: item.url,
        };
      })
      .filter(
        (
          city
        ): city is {
          name: string;
          description: string;
          url: string;
        } => city !== null
      );
  }, []);

  //fare list
  const visibleFarePickupCities = showAllFareCities
    ? farePickupCities
    : farePickupCities.slice(0, 40);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:image"
          content={`https://chikucabs.com${vehicleDetails.image}`}
        />

        <meta property="og:type" content="website" />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <link
          rel="canonical"
          href={`https://chikucabs.com/tempo-traveller${citySlug ? `-${citySlug}` : "-on-rent"}`}
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
              src="/tempotraveller.webp"
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
                  Tempo Traveller on Rent
                  {cityName && (
                    <>
                      {" "}in <span className="text-primary">{cityName}</span>
                    </>
                  )}
                   <span className="px-1 text-primary">– 9 to 26 Seater</span>,
                  
                  Starting at ₹{vehicleDetails.pricePerKm}/km
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
  {vehicleDetails.description} Professional drivers, clean AC vehicles, and reliable service for a comfortable journey.
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
                      "Hi Chiku Cabs, I am interested in booking a Tempo Traveller through your website. Please help me with the booking.",
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
        <section className="pt-12 pb-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-slate-300">
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

        {/* Tempo Traveller Fleet Gallery */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
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
                  className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${item.best
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
                  <div className="absolute top-1 left-3 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
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
                      href="tel:+918448445504"
                      className={`w-full py-4 rounded-xl font-black tracking-tight text-center block transition-all ${item.best || item.popular
                          ? "btn-primary shadow-lg hover:shadow-xl"
                          : "bg-gray-800 text-white hover:bg-gray-900"
                        }`}
                    >
                      📞 BOOK NOW
                    </a>

                    <a
                      href={`https://wa.me/916280820037?text=${encodeURIComponent(
                        `Hi Chiku Cabs, I am interested in booking a ${item.seater} seater Tempo Traveller through your website. Please help me with the booking.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
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

        {/* Tempo Traveller Outstation Rate Chart */}
<section className="py-16 px-4 bg-white border-y border-slate-200">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10">
      <span className="section-badge mx-auto">
        OUTSTATION FARE CHART
      </span>

      <h2 className="section-title mt-4">
        Tempo Traveller Outstation Rates
        {city !== "India" ? ` in ${city}` : " Across India"}
      </h2>

      <p className="max-w-7xl text-slate-700 mx-auto">
        Compare per-kilometre rates and applicable trip charges
        for different Tempo Traveller seating capacities.
      </p>
    </div>

    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-5 py-4 font-semibold">Vehicle Capacity</th>
            <th className="px-5 py-4 font-semibold">Outstation Rate</th>
            <th className="px-5 py-4 font-semibold">Minimum Km/Day</th>
            <th className="px-5 py-4 font-semibold">Driver Allowance</th>
            <th className="px-5 py-4 font-semibold">Night Charge</th>
            <th className="px-5 py-4 font-semibold">Toll & Parking</th>
            <th className="px-5 py-4 font-semibold">Booking</th>
          </tr>
        </thead>

        <tbody>
          {TEMPO_DATAS.map((vehicle) => (
            <tr
              key={vehicle.seater}
              className="border-t border-slate-200 hover:bg-slate-50"
            >
              <td className="px-5 py-4 font-medium">
                {vehicle.seater} Seater Tempo Traveller
              </td>

              <td className="px-5 py-4 font-bold text-primary">
                ₹{vehicle.pricePerKm}/km
              </td>

              <td className="px-5 py-4">250 km/day</td>
              <td className="px-5 py-4">fixed company policy</td>
              <td className="px-5 py-4">fixed company policy</td>
              <td className="px-5 py-4">Extra, as applicable</td>
              {/* Booking buttons in the last column */}
          <td className="px-5 py-4">
            <div className="flex min-w-[160px] flex-row gap-2">
              <a
                href="tel:+918448445504"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-bold text-white hover:opacity-90"
              >
                <span className="ml-2">Call Now</span>
              </a>

              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I need a ${vehicle.seater} Seater Tempo Traveller in ${city}. Please share the fare and applicable charges.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-green-600 px-4 py-2 font-bold text-green-700 hover:bg-green-50"
              >
                <span className="ml-2">WhatsApp</span>
              </a>
            </div>
          </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="mt-5 text-sm text-slate-500 leading-relaxed">
      Note: Final fares depend on the confirmed itinerary and applicable
      booking terms. Toll and parking charges are additional where applicable.
      Confirm minimum daily kilometres, driver allowance and night charges
      with the booking team before publishing the final rate card.
    </p>

    
  </div>
</section>

        {/* Route Calculator with Slider */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300">
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

        {/* Popular Travel Destinations - All Cities */}
        <section className="py-12 bg-gray-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Popular Tempo Traveller Destinations
              </h2>
              <p className="text-gray-600">
                Explore India's most beautiful destinations with our premium
                tempo travellers
              </p>
            </div>

            {/* City Filter Tabs */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {Object.keys(groupedTempoRoutes).map((cityKey) => {
                  const cityName =
                    CITY_DISPLAY_NAMES[cityKey] ??
                    cityKey
                      .split("-")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
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
                      className={`
            px-5
            py-2.5
            rounded-full
            border
            text-sm
            font-semibold
            shadow-sm
            transition-all
            duration-300
            ${isSelected
                          ? "bg-[#BE1E23] text-white border-[#BE1E23] shadow-xl scale-105"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-[#BE1E23] hover:text-white hover:border-[#BE1E23] hover:shadow-xl hover:scale-105"
                        }
          `}
                    >
                      {cityName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destination Cards by City - ALL ROUTES SHOWN */}
            {(() => {
              const cityKey = selectedDestinationCity;

              const routes = groupedTempoRoutes[cityKey] ?? [];

              const cityName =
                CITY_DISPLAY_NAMES[cityKey] ??
                cityKey
                  .split("-")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ");

              const visibleRoutes = showAllDestinations
                ? routes
                : routes.slice(0, 18);

              return (
                <div className="mb-14">
                  {/* City Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-lg">
                      <IoLocationSharp />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800">
                      Top Destinations from {cityName}
                    </h3>

                    <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {routes.length} routes
                    </span>
                  </div>

                  {/* Destination Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {visibleRoutes.map((route, idx) => (
                      <Link
                        key={`${route.url}-${idx}`}
                        href={route.url}
                        className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Icon */}
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                          <span className="text-lg">🚐</span>
                        </div>

                        {/* Destination Name */}
                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-primary transition-colors leading-tight capitalize">
                          {route.to}
                        </h4>

                        {/* Price */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-semibold text-primary">
                            Starting ₹20/km
                          </span>

                          <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View More / View Less */}
                  {routes.length > 18 && (
                    <div className="flex justify-center mt-8">
                      <button
                        type="button"
                        onClick={() =>
                          setShowAllDestinations((prev) => !prev)
                        }
                        className="px-7 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
        </section>


        {/* Choose Your Fare Pickup City */}
        {/* Choose Your Fare Pickup City */}
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">

            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Choose Your Fare Pickup City
              </h2>

              <p className="mt-2 text-sm md:text-base text-slate-500">
                Select your pickup city to check Tempo Traveller fare and booking
                options.
              </p>
            </div>

            {/* City Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleFarePickupCities.map((city) => (
                <Link
                  key={city.url}
                  href={city.url}
                  className="
            group
            relative
            flex
            items-center
            justify-between
            min-h-[84px]
            px-5
            py-4
            bg-white
            border
            border-slate-200
            border-l-4
            border-l-primary
            rounded-xl
            shadow-sm
            hover:shadow-md
            hover:-translate-y-0.5
            hover:border-primary/40
            transition-all
            duration-300
          "
                >
                  {/* Left Content */}
                  <div className="flex items-center gap-4 min-w-0">

                    {/* Location Icon */}
                    <div
                      className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
                group-hover:bg-primary
                group-hover:text-white
                transition-all
                duration-300
              "
                    >
                      <FaLocationDot size={16} />
                    </div>

                    {/* City */}
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {city.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                        {city.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
              ml-3
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
              group-hover:bg-primary
              group-hover:text-white
              transition-all
              duration-300
            "
                  >
                    <span className="text-lg leading-none">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Routes */}
            {farePickupCities.length > 40 && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() =>
                    setShowAllFareCities((prev) => !prev)
                  }
                  className="
            inline-flex
            items-center
            gap-2
            px-7
            py-3
            rounded-xl
            bg-primary
            text-white
            font-semibold
            shadow-md
            hover:shadow-lg
            hover:-translate-y-0.5
            transition-all
            duration-300
          "
                >
                  {showAllFareCities
                    ? "View Less ↑"
                    : `View All Routes (${farePickupCities.length - 40} more) ↓`}
                </button>
              </div>
            )}

          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <span className="text-sm font-bold uppercase tracking-wider">
                  Simple & Fast Booking
                </span>
              </div>

              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
                Book Your Cab in{" "}
                <span className="text-primary">3 Easy Steps</span>
              </h2>

             <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
  Book a Tempo Traveller on rent for outstation trips, family vacations,
  group tours, weddings, and corporate travel. Choose your seating capacity,
  share your trip details, and confirm your booking with Chiku Cabs.
</p>
            </div>

            {/* Steps */}
            <div className="relative grid md:grid-cols-3 gap-6 lg:gap-8">

              {/* Connecting Line */}
              <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

              {STEPS.map((item, i) => (
                <div
                  key={item.step}
                  className="relative z-10 group"
                >
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">

                    {/* Step Icon / Number */}
                    <div className="relative mx-auto w-20 h-20 mb-6">
                      <div
                        className="w-20 h-20 rounded-2xl bg-primary
                flex items-center justify-center shadow-lg
                shadow-primary/20
                group-hover:-translate-y-1
                transition-transform duration-300"
                      >
                        <span className="text-3xl font-extrabold text-white">
                          {item.step}
                        </span>
                      </div>

                      {/* Step Label */}
                      {/* <span
                className="absolute -top-2 -right-2 w-7 h-7
                rounded-full bg-slate-900 text-white text-xs
                font-bold flex items-center justify-center"
              >
                {i + 1}
              </span> */}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Mobile Arrow */}
                    {i < STEPS.length - 1 && (
                      <div className="md:hidden mt-5 text-primary text-xl">
                        ↓
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Need help with your booking?{" "}
                <a
                  href="tel:+918448445504"
                  className="font-semibold text-primary hover:underline"
                >
                  Call us for assistance
                </a>
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            AUDIT SECTION 1: SMART TRAVEL COMPARISON MATRIX
        ====================================================== */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                SMART GROUP TRAVEL COMPARISON
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Tempo Traveller vs Multiple Cabs, Bus &amp; Train
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                See why hiring a single verified Chiku Cabs Tempo Traveller saves up to 40% in cost while keeping your entire family or team united throughout the journey.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="p-4 md:p-5 font-semibold">Travel Parameter</th>
                    <th className="p-4 md:p-5 font-bold text-amber-400 bg-slate-800">
                      Chiku Tempo Traveller
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Multiple Small Cabs
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Private / State Bus
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Train Tickets
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaUsers className="text-primary text-lg" /> Group Bonding &amp; Privacy
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      100% Private, Entire Group Travels Together
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Split into 2-3 separate cars</td>
                    <td className="p-4 md:p-5 text-slate-600">Public crowd, zero privacy</td>
                    <td className="p-4 md:p-5 text-slate-600">Scattered berths &amp; coaches</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary text-lg" /> Doorstep Pickup &amp; Stops
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Single Doorstep Pickup, Unlimited Sightseeing Stops
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Multiple coordination headaches</td>
                    <td className="p-4 md:p-5 text-slate-600">Fixed bus stops, no detour flex</td>
                    <td className="p-4 md:p-5 text-slate-600">Station only, extra taxi needed</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary text-lg" /> Luggage &amp; Rooftop Carrier
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Deep Boot + Waterproof Rooftop Luggage Carrier
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Boot space crammed by CNG cylinders</td>
                    <td className="p-4 md:p-5 text-slate-600">Baggage lost risk in shared hold</td>
                    <td className="p-4 md:p-5 text-slate-600">Difficult luggage carrying &amp; coolie fees</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary text-lg" /> Cost per Person
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Most Economical (From ₹300-₹500 / person)
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">3x toll, 3x parking &amp; fuel costs</td>
                    <td className="p-4 md:p-5 text-slate-600">Individual high seasonal ticket pricing</td>
                    <td className="p-4 md:p-5 text-slate-600">Dynamic surge tatkal fares</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaSnowflake className="text-primary text-lg" /> AC &amp; Reclining Comfort
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Individual AC Vents + Pushback Reclining Seats
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Standard sedan cramped legroom</td>
                    <td className="p-4 md:p-5 text-slate-600">Uneven central AC &amp; fixed seats</td>
                    <td className="p-4 md:p-5 text-slate-600">No pushback reclining in chair cars</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaShieldAlt className="text-primary text-lg" /> Chauffeur &amp; Safety
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Verified Heavy-Commercial Badge Highway Chauffeur
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Varying driver skills &amp; convoy lag</td>
                    <td className="p-4 md:p-5 text-slate-600">Unregulated speed &amp; rash driving</td>
                    <td className="p-4 md:p-5 text-slate-600">Safe, but frequent waitlist cancellations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            AUDIT SECTION 3: CURATED GROUP ROUTES & PICKUP HUBS
        ====================================================== */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                POPULAR USE CASES &amp; COVERAGE
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Curated Group Travel Routes &amp; Doorstep Pickup Hubs
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                Seamless group transportation across {city !== "India" ? city : "all major Indian cities"} for family holidays, corporate events, weddings, and pilgrimage yatras.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: "🏔️",
                  title: "Outstation & Hill Stations",
                  desc: "Scenic family vacations to Manali, Shimla, Rishikesh, Nainital, Ooty, Munnar & Mahabaleshwar with hill-expert chauffeurs.",
                  benefits: "Mountain driving specialist, roof luggage rack with rain cover.",
                },
                {
                  icon: "💼",
                  title: "Corporate Team Offsites",
                  desc: "Hassle-free group commute for leadership conclaves, factory visits, tech summits, and annual employee retreats.",
                  benefits: "GST invoice with SAC code, onboard WiFi hotspot & USB ports.",
                },
                {
                  icon: "💒",
                  title: "Weddings & Baraat Transport",
                  desc: "Coordinated luxury convoy for guest pickups from airports, sangeet venues, hotel check-ins, and baraat processions.",
                  benefits: "Uniformed chauffeurs, decorated tempo option, on-time fleet coordination.",
                },
                {
                  icon: "🛕",
                  title: "Pilgrimage & Sacred Yatras",
                  desc: "Comfortable spiritual circuits for elders: Char Dham, Varanasi-Ayodhya, Tirupati, Shirdi-Shani Shingnapur, and Golden Temple.",
                  benefits: "Low-step boarding assistance, generous leg space, elder-friendly stops.",
                },
              ].map((card, cIdx) => (
                <div key={cIdx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{card.desc}</p>
                  <div className="bg-amber-50 rounded-lg p-3 text-xs font-semibold text-amber-900 border border-amber-200/60">
                    ⭐ {card.benefits}
                  </div>
                </div>
              ))}
            </div>

            {/* Doorstep Pickup Hubs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <IoLocationSharp className="text-primary text-2xl" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Doorstep Tempo Traveller Pickup Across {city !== "India" ? city : "India"}
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                Our chauffeurs arrive directly at your society gate, hotel lobby, corporate campus, or airport terminal 15 minutes before scheduled departure. We service all primary transport hubs, railway junctions, and suburban neighborhoods:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "International & Domestic Airport Terminals",
                  "Central Railway Stations & Intercity Bus Terminals",
                  "Major Tech Parks & Special Economic Zones",
                  "Gated Residential Townships & Societies",
                  "Destination Wedding Resorts & Luxury Banquet Halls",
                  "Heritage Sites & Outstation Highway Junctions",
                  "Suburban Commercial Hubs & Metro Junctions",
                  "Industrial Corridors & Corporate Training Campuses",
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
            AUDIT SECTION 4: INCLUSIONS, EXCLUSIONS & RENTAL TERMS
        ====================================================== */}
        <section className="py-20 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                TRANSPARENCY &amp; TRUST
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Tempo Traveller Inclusions, Exclusions &amp; Guidelines
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                100% crystal-clear terms with no hidden add-ons so your group can travel with complete peace of mind.
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
                    <span><strong>Dedicated Vehicle &amp; Fuel:</strong> Fully dedicated clean AC tempo traveller with all fuel expenses included for booked distance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Licensed Commercial Chauffeur:</strong> Heavy-passenger badge driver experienced with highway safety and mountain ghat navigation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Sanitization &amp; Safety Pack:</strong> Pre-trip deep sanitization, first aid kit, commercial speed governors (80 km/h), and fire extinguisher.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Complimentary Luggage Carrier:</strong> Heavy-duty rooftop carrier with waterproof tarpaulin cover for bulky group bags.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>GST Invoice &amp; 24x7 Control Room:</strong> Official corporate tax invoice with live GPS tracking support throughout the trip.</span>
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
                    <span><strong>Highway Tolls &amp; State Border Tax:</strong> Inter-state commercial vehicle entry permits and Fastag toll plazas payable directly as per actual receipts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Airport &amp; Monument Parking Slips:</strong> Parking charges at tourist monuments, hotels, or airports paid at actuals.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Driver Night Allowance:</strong> Nominal charge (₹400–₹500/night) applies only if driving occurs between 10:00 PM and 6:00 AM.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Free Cancellation:</strong> 100% refundable advance deposit upon cancellation 24 hours prior to journey pickup time.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Minimum Outstation Run:</strong> Standard 250 km or 300 km daily calendar-day average billing applies for outstation multi-day bookings.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Action CTA Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl md:text-3xl font-black mb-2 text-white">
                  Need a Custom Tempo Quote for Your Group?
                </h4>
                <p className="text-slate-300 text-sm md:text-base max-w-xl">
                  Talk to our senior fleet manager for customized hill station tours, wedding packages, or corporate bulk reservations.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Chiku Cabs, I need an immediate tempo traveller quotation for ${city !== "India" ? city : "India"}.`
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

        {/* Testimonials */}
        <section className="py-12 px-4 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                CUSTOMER REVIEWS
              </div>
              <h2 className="section-title">
                What Group Travelers in {city !== "India" ? city : "India"} Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Real reviews from families, corporate teams, and pilgrimage
                groups who traveled with us
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Review 1 - Family Pilgrimage Trip */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Booked a 16 seater tempo traveller for our family Char Dham
                  Yatra. The vehicle was brand new with comfortable pushback
                  seats. The driver was experienced with hill roads and very
                  patient. Made our pilgrimage stress-free and memorable!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    VK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Vikram & Family
                    </p>
                    <p className="text-xs text-gray-500">
                      Char Dham Yatra • 16 Seater
                    </p>
                  </div>
                </div>
              </div>

              {/* Review 2 - Corporate Team Outing */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Used Chiku Cabs for our office team outing of 20 people. The
                  20-seater tempo was spotless, spacious, and had great music
                  system. The driver was very professional and punctual.
                  Everyone in the team loved the experience!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    RK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Rahul (Corporate)
                    </p>
                    <p className="text-xs text-gray-500">
                      Team Outing • 20 Seater
                    </p>
                  </div>
                </div>
              </div>

              {/* Review 3 - Wedding Guest Transfer */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Booked 2 tempo travellers for our wedding guest transfers.
                  Both arrived on time, well-decorated, and the drivers handled
                  everything professionally. Our guests were very impressed with
                  the comfort and service. Highly recommend for wedding events!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    PM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Priya Mehta</p>
                    <p className="text-xs text-gray-500">
                      Wedding Transfer • 2 Tempos
                    </p>
                  </div>
                </div>
              </div>
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
        Tempo Traveller Rental FAQs{" "}
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
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  "Hi Chiku Cabs, I am interested in booking a Tempo Traveller through your website. Please help me with the booking.",
                )}`}
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
  <section className="py-12 px-4 bg-muted/10 border-t">
    <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
      <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
        Hire a Tempo Traveller on Rent in {city}
      </h2>

      <div className="space-y-6">
        <p>
          Planning a family vacation, wedding, pilgrimage, or corporate trip
          from <strong>{city}</strong>? Chiku Cabs offers reliable{" "}
          <strong>Tempo Traveller rental in {city}</strong> for comfortable
          group travel. Choose from 9, 10, 12, 15, 16, 17, 18, 20, and
          26-seater vehicles according to your group size. Whether you need
          a <strong>Tempo Traveller on rent in {city}</strong> for local
          sightseeing or an outstation journey, enjoy spacious seating,
          luggage space, and professional drivers.
        </p>

        <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
          Popular Uses for Tempo Traveller Rentals in {city}
        </h3>

        <ul className="space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1 text-xl">✔</span>
            <span>
              <strong>Local Sightseeing in {city}:</strong> Explore popular
              attractions and nearby destinations with your family or group
              using our comfortable{" "}
              <strong>local Tempo Traveller rental service</strong>.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-primary mt-1 text-xl">✔</span>
            <span>
              <strong>Outstation Trips from {city}:</strong> Plan weekend
              getaways, long-distance journeys, and multi-city tours with a
              suitable <strong>outstation Tempo Traveller</strong> and an
              experienced driver.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-primary mt-1 text-xl">✔</span>
            <span>
              <strong>Wedding and Corporate Travel:</strong> Arrange group
              transportation for wedding guests, office outings, corporate
              events, and family functions with a spacious{" "}
              <strong>Tempo Traveller on rent in {city}</strong>.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-primary mt-1 text-xl">✔</span>
            <span>
              <strong>Family Vacations and Pilgrimages:</strong> Travel
              together on family holidays, religious tours, and group
              excursions with comfortable seating and convenient luggage
              storage.
            </span>
          </li>
        </ul>

        <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
          <p className="mb-0 text-card-foreground">
            Booking a <strong>Tempo Traveller in {city}</strong> with
            Chiku Cabs is simple. Select your preferred seating capacity,
            share your pickup location and travel plans, and contact our
            booking team for a fare estimate. We provide Tempo Traveller
            options for local and outstation journeys, with pricing based
            on vehicle capacity and applicable trip charges.
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
