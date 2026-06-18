"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import { POPULAR_ROUTES as airportCabRoutes } from "@/data/airportRoutes";
import RouteMapSection from "../shared/RouteMapSection";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaArrowRight,
  FaCarSide,
  FaUserTie,
  FaRoad,
  FaClock,
  FaStar,
  FaShieldAlt,
  FaSyncAlt,
  FaHeadset,
  FaSprayCan,
  FaChartLine,
  FaMapMarkerAlt,
  FaRoute,
  FaCheckCircle,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Head from "next/head";

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "918448445504";
const SITE_NAME = "Chiku Cabs";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();

// Helper function to generate SEO-friendly slug
const generateRouteSlug = (origin: string, destination: string) => {
  return `${origin.toLowerCase()}-to-${destination.toLowerCase()}-cab`;
};

// Helper function to generate structured data
const generateStructuredData = (
  startCity: string,
  endCity: string,
  distance: number,
  pricePerKm: number,
  vehicleName: string,
) => {
  const baseFare = distance * pricePerKm + 500;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: `${startCity} to ${endCity} ${vehicleName} Service`,
        description: `Book affordable ${vehicleName} from ${startCity} to ${endCity}. One-way and round-trip options available. Professional drivers, sanitized cars, 24/7 support.`,
        brand: {
          "@type": "Brand",
          name: "Chiku Cabs",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: baseFare,
          availability: "https://schema.org/InStock",
          validFrom: new Date().toISOString(),
          priceValidUntil: new Date(currentYear + 1, 11, 31).toISOString(),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1250",
        },
      },
      {
        "@type": "Service",
        serviceType: "Outstation Cab Service",
        provider: {
          "@type": "LocalBusiness",
          name: "Chiku Cabs",
          telephone: PHONE_NUMBER,
          image: "https://chikucabs.com/yt.png",
          address: {
            "@type": "PostalAddress",
            addressLocality: startCity,
            addressCountry: "IN",
          },
        },
        areaServed: {
          "@type": "City",
          name: startCity,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cab Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "One Way Cab",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Round Trip Cab",
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://chikucabs.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Outstation Cabs",
            item: "https://chikucabs.com/outstation-cabs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${startCity} to ${endCity}`,
            item: `https://chikucabs.com/route/${generateRouteSlug(startCity, endCity)}`,
          },
        ],
      },
    ],
  };

  return JSON.stringify(structuredData);
};

export default function OutstationRouteFareTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const { origin, destination, vehicle } = parsedData;
  const startCity = origin || "Origin";
  const endCity = destination || "Destination";

  // State for sticky bar and form
  const [isScrolled, setIsScrolled] = useState(false);
  const [tripType, setTripType] = useState("one-way");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    distance: "50",
  });

  const routeInfo =
    Object.values(cityCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase() === startCity.toLowerCase() &&
          route.to.toLowerCase() === endCity.toLowerCase(),
      ) ||
    Object.values(airportCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase() === startCity.toLowerCase() &&
          route.to.toLowerCase() === endCity.toLowerCase(),
      );

  const distance = routeInfo?.distance || 0;
  const estimatedHours = Math.ceil(distance / 55);

  const getVehicleDetails = (v: string | null) => {
    const lowerV = (v || "cab").toLowerCase();
    if (
      lowerV.includes("tempo") ||
      lowerV.includes("traveller") ||
      lowerV.includes("bus")
    ) {
      return {
        icon: "🚐",
        image: "/tempo_traveller.png",
        pricePerKm: 18,
        name: "Tempo Traveller",
        description:
          "Spacious 12-16 seater perfect for group travel and family outings.",
        seoKeywords: "tempo traveller, group travel, family outing, 12 seater",
      };
    } else if (lowerV.includes("innova")) {
      return {
        icon: "✨",
        image: "/innova-crysta.png",
        pricePerKm: 16,
        name: "Innova Crysta",
        description: "Luxury 7-seater with premium comfort for long journeys.",
        seoKeywords: "innova crysta, luxury cab, premium comfort, 7 seater",
      };
    } else if (lowerV.includes("suv") || lowerV.includes("ertiga")) {
      return {
        icon: "🚙",
        image: "/suv.png",
        pricePerKm: 12,
        name: "SUV",
        description: "Comfortable 6-seater with ample luggage space.",
        seoKeywords: "suv cab, ertiga, family cab, 6 seater",
      };
    } else {
      return {
        icon: "🚘",
        image: "/suzuki-dzire.png",
        pricePerKm: 10,
        name: "Cab",
        description:
          "Economical 4-seater perfect for small families and business travel.",
        seoKeywords: "dzire cab, economical cab, 4 seater, business travel",
      };
    }
  };

  const vDetails = getVehicleDetails(vehicle);
  const vehicleDetails = useMemo(() => getVehicleDetails(vehicle), [vehicle]);
  // Generate meta description
  const metaDescription = `Book affordable ${vehicleDetails.name} from ${startCity} to ${endCity} at just ₹${vehicleDetails.pricePerKm}/km. One-way & round trip options. ✓24/7 Support ✓Sanitized Cars ✓Best Price Guarantee. Call ${PHONE_NUMBER}`;
  const canonicalUrl = `https://chikucabs.com/route/${generateRouteSlug(startCity, endCity)}${vehicle ? `?vehicle=${vehicle.toLowerCase()}` : ""}`;
  // Generate keywords
  const keywords = `${startCity} to ${endCity} cab, ${startCity} to ${endCity} taxi, ${startCity} to ${endCity} ${vehicleDetails.name} fare, one way cab ${startCity} to ${endCity}, round trip cab ${startCity} to ${endCity}, outstation cab ${startCity} to ${endCity}, ${vehicleDetails.seoKeywords}`;

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

  // Generate time options
  useEffect(() => {
    const generateTimes = () => {
      const times = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const period = hour >= 12 ? "PM" : "AM";
          const displayHour = hour % 12 || 12;
          times.push(
            `${displayHour}:${String(min).padStart(2, "0")} ${period}`,
          );
        }
      }
      return times;
    };
    setTimeOptions(generateTimes());
  }, []);

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
🚘 *Vehicle Type:* ${selectedVehicle || vDetails.name}

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

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          {startCity} to {endCity} {vehicleDetails.name} Fare | Book One Way Cab
          at ₹{vehicleDetails.pricePerKm}/km | Chiku Cabs
        </title>
        <meta
          name="title"
          content={`${startCity} to ${endCity} ${vehicleDetails.name} Fare | Book One Way Cab at ₹${vehicleDetails.pricePerKm}/km`}
        />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Chiku Cabs" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:title"
          content={`${startCity} to ${endCity} ${vehicleDetails.name} - Best Fare ₹${vehicleDetails.pricePerKm}/km`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:image"
          content={`https://chikucabs.com${vDetails.image}`}
        />
        <meta property="og:site_name" content="Chiku Cabs" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta
          property="twitter:title"
          content={`${startCity} to ${endCity} ${vehicleDetails.name} - Book Now`}
        />
        <meta property="twitter:description" content={metaDescription} />
        <meta
          property="twitter:image"
          content={`https://chikucabs.com${vDetails.image}`}
        />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content={startCity} />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData(
              startCity,
              endCity,
              distance,
              vehicleDetails.pricePerKm,
              vehicleDetails.name,
              routeInfo,
            ),
          }}
        />
      </Head>

      <div className="bg-background min-h-screen">
        {/* Accent Line */}
        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary)), transparent, hsl(var(--primary)))",
          }}
        ></div>

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
              src={vDetails.image}
              alt="Chiku Cabs Premium Fleet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                {/* Route Display */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <span className="flex items-center gap-2">
                    <IoLocationSharp className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{startCity}</span>
                  </span>
                  <FaArrowRight className="w-3 h-3 opacity-70" />
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{endCity}</span>
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6 ml-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm">4.9 Rating • 1250+ Reviews</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  {startCity} to {endCity}
                  <br />
                  <span className="text-primary">
                    {vehicle || vDetails.name} Fare
                  </span>
                </h1>

                <p className="text-lg mb-8 opacity-90 max-w-lg">
                  {vDetails.description ||
                    `Safe, reliable, and affordable ${vehicle || vDetails.name} service from ${startCity} to ${endCity} for one-way & round trips. Professional drivers, sanitized cars, and 24/7 support.`}
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
                <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🕐</span>
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚗</span>
                    <span className="text-sm">Sanitized Cars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🛡️</span>
                    <span className="text-sm">Insurance Covered</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Booking Widget */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-2">
                  Get Outstation Cab Price
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Fill the details & get price on WhatsApp instantly
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
                      placeholder={`Enter Pickup Location (e.g., ${startCity})`}
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
                      placeholder={`Enter Drop Location (e.g., ${endCity})`}
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

        {/* Distance Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                ROUTE DISTANCE
              </div>

              <h2 className="section-title">
                Distance Between {startCity} and {endCity}
              </h2>

              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                Planning your journey from {startCity} to {endCity}? Knowing the
                distance helps estimate travel time, fuel requirements, and cab
                fare accurately.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="premium-card text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-bold mb-2">Estimated Distance</h3>
                <p className="text-4xl font-black text-primary">
                  {distance || "Approx."} km
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold mb-2">Travel Time</h3>
                <p className="text-4xl font-black text-primary">
                  {Math.ceil((distance || 250) / 55)} Hours
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">🚖</div>

                <h3 className="text-xl font-bold mb-2">One Way Fare Starts</h3>

                <p className="text-4xl font-black text-primary">
                  ₹{(distance || 250) * vehicleDetails.pricePerKm + 500}
                </p>

                <p className="text-sm text-muted-foreground mt-2">
                  Including driver allowance
                </p>
              </div>
            </div>

            <div className="premium-card mt-10">
              <p className="text-lg leading-relaxed text-muted-foreground">
                The road distance from <strong>{startCity}</strong> to{" "}
                <strong>{endCity}</strong> is approximately{" "}
                <strong>{distance || "varies"} km</strong>. The average travel
                duration is around{" "}
                <strong>{Math.ceil((distance || 250) / 55)} hours</strong>,
                depending on traffic, road conditions, and weather. Chiku Cabs
                provides comfortable one-way and round-trip taxi services on
                this route with experienced drivers and transparent pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Travel Time Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto">JOURNEY PLANNER</div>

              <h2 className="section-title">
                {startCity} to {endCity} Travel Guide
              </h2>
            </div>

            <div className="space-y-8">
              <div className="premium-card flex gap-4">
                <div className="text-4xl">🌅</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Best Departure Time
                  </h3>
                  <p className="text-muted-foreground">
                    Start between 5 AM and 8 AM to avoid city traffic and reach
                    your destination faster.
                  </p>
                </div>
              </div>

              <div className="premium-card flex gap-4">
                <div className="text-4xl">🍴</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Food & Refreshment Stops
                  </h3>
                  <p className="text-muted-foreground">
                    Multiple restaurants, fuel stations and restrooms are
                    available on the route.
                  </p>
                </div>
              </div>

              <div className="premium-card flex gap-4">
                <div className="text-4xl">🚦</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Traffic Conditions</h3>
                  <p className="text-muted-foreground">
                    Weekend and holiday traffic may increase travel time.
                  </p>
                </div>
              </div>

              <div className="premium-card flex gap-4">
                <div className="text-4xl">🛡️</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Safe Travel Tips</h3>
                  <p className="text-muted-foreground">
                    Keep your phone charged and share trip details with family
                    members.
                  </p>
                </div>
              </div>
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

        {/* Toll Tax Information */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                TOLL TAX INFORMATION
              </div>

              <h2 className="section-title">
                Toll Tax Information for {startCity} to {endCity}
              </h2>

              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                Before booking your cab from {startCity} to {endCity}, it's
                important to understand how toll charges are handled during the
                trip.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="premium-card">
                <div className="text-5xl mb-4">🛣️</div>

                <h3 className="text-2xl font-bold mb-4">Toll Charges</h3>

                <p className="text-muted-foreground leading-relaxed">
                  Toll taxes are generally charged as per actual usage during
                  the journey. The exact amount depends on the route taken
                  between {startCity} and {endCity}.
                </p>
              </div>

              <div className="premium-card">
                <div className="text-5xl mb-4">💳</div>

                <h3 className="text-2xl font-bold mb-4">Transparent Billing</h3>

                <p className="text-muted-foreground leading-relaxed">
                  Chiku Cabs follows a transparent pricing policy. Toll charges,
                  parking fees, and state taxes (if applicable) are shared with
                  customers clearly before or during the trip.
                </p>
              </div>
            </div>

            <div className="premium-card mt-10">
              <h3 className="text-xl font-bold mb-4">Important Information</h3>

              <ul className="space-y-3 text-muted-foreground">
                <li>✓ Toll tax is charged as per actual.</li>
                <li>✓ Fastag-enabled vehicles are provided.</li>
                <li>✓ Parking charges are extra where applicable.</li>
                <li>✓ State entry taxes may apply on some routes.</li>
                <li>✓ No hidden charges in your final bill.</li>
              </ul>
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg text-muted-foreground">
                For the latest toll information and exact fare estimate for the{" "}
                <strong>
                  {startCity} to {endCity}
                </strong>{" "}
                route, call us at <strong>8448445504</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Driver Information Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                DRIVER INFORMATION
              </div>

              <h2 className="section-title">
                Professional Drivers for {startCity} to {endCity} Cab Service
              </h2>

              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                Our experienced and verified drivers ensure a safe, comfortable,
                and hassle-free journey from {startCity} to {endCity}. Every
                driver is trained for long-distance travel and customer service
                excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="premium-card text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="font-bold mb-2">Verified Drivers</h3>
                <p className="text-muted-foreground">
                  All drivers undergo identity verification and background
                  checks.
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">🚖</div>
                <h3 className="font-bold mb-2">Route Experts</h3>
                <p className="text-muted-foreground">
                  Experienced drivers familiar with the {startCity} to {endCity}{" "}
                  route.
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="font-bold mb-2">GPS Enabled</h3>
                <p className="text-muted-foreground">
                  Real-time route navigation for safer and faster travel.
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="font-bold mb-2">Customer Rated</h3>
                <p className="text-muted-foreground">
                  Drivers are rated regularly based on customer feedback.
                </p>
              </div>
            </div>

            <div className="premium-card mt-10">
              <h3 className="text-2xl font-black mb-4">
                Why Our Drivers Are Trusted
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Chiku Cabs assigns professional drivers for every {startCity} to{" "}
                {endCity} booking. Drivers are trained in highway driving,
                passenger safety, route planning, and customer assistance.
                Whether you book a one-way cab, round-trip taxi, airport
                transfer, or tempo traveller, our drivers focus on providing a
                smooth travel experience.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    <li>✅ Police verified drivers</li>
                    <li>✅ Well-groomed and professional</li>
                    <li>✅ Experienced in long-distance trips</li>
                    <li>✅ Assistance with luggage handling</li>
                  </ul>
                </div>

                <div>
                  <ul className="space-y-3">
                    <li>✅ Familiar with highways and alternate routes</li>
                    <li>✅ 24×7 travel support</li>
                    <li>✅ Trained for customer safety</li>
                    <li>✅ Punctual pickup and drop service</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-muted/50">
                <p className="text-muted-foreground">
                  Driver details including driver's name, contact number, and
                  vehicle information are shared before the trip begins,
                  ensuring complete transparency and peace of mind for
                  travelers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Route Map Section */}
        <RouteMapSection
          startCity={startCity}
          endCity={endCity}
          distance={distance}
          estimatedHours={estimatedHours}
        />

        {/* One Way Cab Fare Section */}
        <section className="py-24 px-4 bg-muted/30 border-y">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                ONE WAY CAB
              </div>

              <h2 className="section-title">
                {startCity} to {endCity} One Way Cab Fare
              </h2>

              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                Save money with our affordable one-way cab service from{" "}
                {startCity} to {endCity}. Pay only for the distance you travel
                without worrying about return-trip charges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="premium-card text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2">Lower Cost</h3>
                <p className="text-muted-foreground">
                  One-way bookings help reduce travel expenses compared to
                  traditional round-trip taxi services.
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">🚖</div>
                <h3 className="text-xl font-bold mb-2">No Return Fare</h3>
                <p className="text-muted-foreground">
                  Pay only for your journey from {startCity} to {endCity}, not
                  for the driver's return travel.
                </p>
              </div>

              <div className="premium-card text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
                <p className="text-muted-foreground">
                  Quick confirmation and flexible pickup timing for your
                  outstation travel plans.
                </p>
              </div>
            </div>

            <div className="premium-card mt-10">
              <h3 className="text-2xl font-black mb-4">
                Benefits of One Way Taxi Service
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Chiku Cabs offers affordable one-way taxi service from{" "}
                <strong>{startCity}</strong> to <strong>{endCity}</strong> with
                transparent pricing and professional drivers. One-way cab
                booking is ideal for business trips, airport transfers, family
                travel, and tourist journeys where you do not need the vehicle
                to return.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    <li>✅ Affordable per-km pricing</li>
                    <li>✅ No hidden charges</li>
                    <li>✅ Verified drivers</li>
                    <li>✅ Clean & sanitized vehicles</li>
                  </ul>
                </div>

                <div>
                  <ul className="space-y-3">
                    <li>✅ 24×7 booking assistance</li>
                    <li>✅ Doorstep pickup service</li>
                    <li>✅ GPS-enabled cabs</li>
                    <li>✅ Instant trip confirmation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-10 py-4"
              >
                📞 Book One Way Cab - 8448445504
              </a>
            </div>
          </div>
        </section>

        {/* Booking Process */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                BOOKING PROCESS
              </div>

              <h2 className="section-title">
                How to Book a Cab from {startCity} to {endCity}
              </h2>

              <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
                Booking a taxi from {startCity} to {endCity} with Chiku Cabs is
                quick, simple, and hassle-free. Follow these easy steps to
                confirm your ride.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: "📞",
                  title: "Contact Us",
                  desc: `Call 8448445504 or send a WhatsApp message to share your ${startCity} to ${endCity} travel requirements.`,
                },
                {
                  step: "02",
                  icon: "🚖",
                  title: "Choose Vehicle",
                  desc: "Select from Dzire, Amaze, Ertiga, Innova Crysta, or Tempo Traveller according to your needs.",
                },
                {
                  step: "03",
                  icon: "💳",
                  title: "Confirm Booking",
                  desc: "Receive fare details, confirm pickup time, and complete the booking process.",
                },
                {
                  step: "04",
                  icon: "✅",
                  title: "Enjoy Your Ride",
                  desc: `Our verified driver arrives at your pickup location and takes you safely to ${endCity}.`,
                },
              ].map((item, index) => (
                <div key={index} className="premium-card text-center">
                  <div className="text-sm font-black text-primary mb-2">
                    STEP {item.step}
                  </div>

                  <div className="text-5xl mb-4">{item.icon}</div>

                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="premium-card mt-12">
              <h3 className="text-2xl font-black mb-4">
                Why Book with Chiku Cabs?
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    <li>✅ Instant booking confirmation</li>
                    <li>✅ Transparent pricing</li>
                    <li>✅ No hidden charges</li>
                    <li>✅ Professional drivers</li>
                  </ul>
                </div>

                <div>
                  <ul className="space-y-3">
                    <li>✅ One-way & round-trip options</li>
                    <li>✅ Clean and sanitized vehicles</li>
                    <li>✅ 24×7 customer support</li>
                    <li>✅ Nationwide cab availability</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-10">
                <a
                  href="tel:+918448445504"
                  className="btn-primary text-lg px-10 py-4"
                >
                  📞 Book Now - 8448445504
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                REVIEWS
              </div>
              <h2 className="section-title">
                Travelers Love Our Transparent Pricing
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sanjay Kumar",
                  text: "The fare was exactly what was quoted. No extra charges, no surprises at the end. Very transparent service. Highly recommended!",
                  rating: "★★★★★",
                },
                {
                  name: "Neha Singh",
                  text: "Compared rates with Ola, Uber, and local operators. Chiku Cabs was the most affordable for our one-way trip. Great value for money.",
                  rating: "★★★★★",
                },
                {
                  name: "Vikram Patel",
                  text: "I was skeptical about the low fare, but the service quality was top-notch. Clean car, professional driver, and no hidden costs.",
                  rating: "★★★★★",
                },
              ].map((review, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-stars">{review.rating}</div>
                  <p className="testimonial-text">"{review.text}"</p>
                  <div className="testimonial-author">{review.name}</div>
                  <div className="testimonial-route">
                    {startCity} → {endCity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                FAQ
              </div>
              <h2 className="section-title">Fare Related Questions</h2>
            </div>
            {[
              {
                q: `What is the ${vehicle} fare from ${startCity} to ${endCity} cab fare details?`,
                a: `The ${vehicle} fare from ${startCity} to ${endCity} starts from ₹10 per km for a maruti suzuki dzire. The total fare depends on the vehicle type, trip type (one-way or round-trip), and any applicable tolls. Call 8448445504 for an exact quote.`,
              },
              {
                q: `Are toll charges included in the ${vehicle} fare?`,
                a: `Toll charges are applicable as per actual and are not included in the base fare of our ${vehicle} taxi service. However, all other charges like driver allowance, fuel, GST, and night charges are included.`,
              },
              {
                q: `Do you charge extra for night travel with outstation cabs?`,
                a: `No, Chiku Cabs does not charge any extra for night travel. Our outstation cabs' night driving charges are included in the per km fare itself.`,
              },
              {
                q: `How do I get the best cab booking fare for ${startCity} to ${endCity}?`,
                a: `Book a one-way cab instead of a round trip to save up to 50% on your taxi service. Also, booking in advance through our cab booking platform can help you get better rates.`,
              },
              {
                q: `Is it cheaper to hire a tempo traveller on rent for a group?`,
                a: `Yes, if you have a group of 10 or more, a tempo traveller on rent is much more cost-effective than booking multiple outstation cabs.`,
              },
              {
                q: `What are the Innova Crysta hire charges from ${startCity}?`,
                a: `The Innova Crysta hire charges typically range from ₹15-18 per km. It's the most premium option for luxury cab booking for the ${startCity} to ${endCity} route.`,
              },
              {
                q: `Are there any hidden costs in the taxi service booking?`,
                a: `Zero. Chiku Cabs prides itself on transparent cab booking. The quote you get for your outstation cabs is what you pay, excluding only tolls and parking.`,
              },
              {
                q: `Can I book an airport taxi for an outstation drop to ${endCity}?`,
                a: `Absolutely. We provide specialized airport taxi services for direct outstation drops from the airport to ${endCity} at flat rates.`,
              },
              {
                q: `Do you offer one-way cab booking from ${startCity}?`,
                a: `Yes, we are specialists in one-way cab booking, ensuring you only pay for the distance you travel without any return fare.`,
              },
              {
                q: `How can I calculate the total outstation taxi service cost?`,
                a: `Total cost = (Per km rate × Estimated distance) + Driver allowance. Use our cab booking app or call 8448445504 for an instant exact calculation.`,
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
              Get Your Exact Fare Now
            </h2>
            <p className="text-xl opacity-70 mb-8">
              Call us for the best {startCity} to {endCity} {vehicle} rates.
              Price match guaranteed.
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
                className="text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  border: "none",
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* <InternalLinks parsedData={parsedData} /> */}
        <EEATSection city={startCity} vehicle={vehicle || "Cab"} />
      </div>
    </>
  );
}
