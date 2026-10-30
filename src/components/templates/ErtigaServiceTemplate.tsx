"use client";
import Image from "next/image";
import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import PopularCities from "@/components/shared/PopularCities";
import StatsBar from "../shared/StatsBar";
import { useState } from "react";
import LocalDominance from "../shared/LocalDominance";
import { localDominanceData } from "@/data/localDominanceData";
import routeData from "@/data/routeData.json";
import VehicleAvailability from "../shared/VehicleAvailability";
import LocationSchema from "../shared/LocationSchema";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaCar,
  FaClock,
  FaShieldAlt,
  FaRoute,
  FaStar,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const relatedVehicles = [
  {
    name: "Dzire",
    slug: "hire-dzire-on-rent",
  },
  {
    name: "Innova Crysta",
    slug: "hire-innova-crysta-on-rent",
  },
];

const services = [
  {
    id: "airport",
    image: "/ertiga/ertiga_airport.webp",
    title: "Airport Transfers",
    description:
      "Enjoy hassle-free airport pickup and drop services with professional chauffeurs. We monitor flight timings and ensure timely pickups with enough luggage space for families and groups.",
    features: ["24×7 Service", "Flight Tracking", "Extra Luggage Space"],
  },
  {
    id: "wedding",
    image: "/ertiga/ertiga_wedding.webp",
    title: "Wedding Travel",
    description:
      "Book premium Innova rentals for weddings, guest transportation, baraat processions, and family functions. Travel comfortably while making every celebration memorable.",
    features: ["Guest Transfers", "Luxury Experience", "Decor Friendly"],
  },
  {
    id: "corporate",
    image: "/ertiga/ertiga_corporate.webp",
    title: "Corporate Travel",
    description:
      "Professional transportation for business meetings, airport transfers, conferences, client visits, and executive travel with punctual drivers.",
    features: ["Executive Service", "GST Invoice", "Professional Drivers"],
  },
  {
    id: "vacation",
    image: "/ertiga/ertiga_pligrimage.webp",
    title: "Vacations",
    description:
      "Enjoy vacations, sightseeing, and weekend getaways with spacious seating, ample luggage space, and comfortable rides for the entire family.",
    features: ["Large Boot Space", "Comfort Seats", "Weekend Trips"],
  },
  {
    id: "hill",
    image: "/ertiga/ertiga_hill.webp",
    title: "Hill Station",
    description:
      "Plan memorable road trips to Shimla, Manali, Mussoorie, Nainital, Ooty, and more with experienced drivers and comfortable seating for long journeys.",
    features: ["Experienced Drivers", "Long Distance", "Safe Journey"],
  },
];

export default function ErtigaServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const displayCity = parsedData.origin || "india";
  const city = parsedData.displayCity || "India";
  const localDominanceCity = localDominanceData[
    city.toLowerCase() as keyof typeof localDominanceData
  ]
    ? city
    : displayCity;
  const [activeService, setActiveService] = useState(services[0]);
  const locality = parsedData.origin || city;
  const currentUrl = `/${parsedData.slugs.join("/")}`;
  const baseCity = parsedData.slugs?.length > 1 ? parsedData.slugs[0] : "";

  const [heroForm, setHeroForm] = useState({
    pickup: city !== "India" ? city : "",
    tripType: "Local Sightseeing (8hr/80km)",
    date: "",
    time: "",
  });

  const handleHeroBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `🚖 *Maruti Ertiga Booking Request*
📍 *Pickup Location:* ${heroForm.pickup || city}
🎯 *Trip Package:* ${heroForm.tripType}
📅 *Travel Date:* ${heroForm.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${heroForm.time || "To Confirm"}

Please share the best quote and driver details.`;
    window.open(`https://wa.me/916280820037?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
        <LocationSchema
          city={city}
          locality={locality}
          vehicle="Ertiga"
          url={currentUrl}
        />
    <div className="bg-background min-h-screen">
      {/* =====================================================
          HERO SECTION WITH LIVE BOOKING FORM & /outstation.webp BG
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 -z-30">
          <Image
            src="/outstation.webp"
            alt={`Hire Ertiga on Rent in ${city !== "India" ? city : "India"} by Chiku Cabs`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 -z-20 bg-black/60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-white/15 mb-4">
              <FaStar className="text-amber-400" />
              <span>4.9 / 5 Rated (12,500+ Completed Trips in {city !== "India" ? city : "India"})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
              Hire <span className="text-primary">Maruti Ertiga</span> on Rent
              {city !== "India" && <> in {city}</>}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
              Spacious 6+1 family travel with dual AC comfort, generous luggage space,
              and verified drivers. Perfect for local full-day tours, airport transfers,
              family vacations, and outstation pilgrimages.
            </p>

            {/* Quick Trip Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-xl">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                  <FaCar /> Rate Starting
                </div>
                <div className="text-lg font-black">₹13 / KM</div>
                <div className="text-[11px] text-slate-400">Outstation / Local</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                  <FaShieldAlt /> Seating
                </div>
                <div className="text-lg font-black">6+1 Pax</div>
                <div className="text-[11px] text-slate-400">Family SUV Space</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                  <FaClock /> Availability
                </div>
                <div className="text-lg font-black">24×7</div>
                <div className="text-[11px] text-slate-400">Instant Dispatch</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xs mb-0.5">
                  <FaRoute /> Service Type
                </div>
                <div className="text-lg font-black">Doorstep</div>
                <div className="text-[11px] text-slate-400">Local & Outstation</div>
              </div>
            </div>

            {/* Trust Guarantees */}
            <div className="space-y-2 text-sm text-slate-300 mb-8">
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>Punctual doorstep pickup anywhere across {city !== "India" ? city : "the city"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>Save 35% compared to booking 2 separate cabs for your family</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>Free cancellation up to 24 hours prior to scheduled departure</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:+918448445504"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaPhoneAlt /> Call 8448445504
              </a>
              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I want to book an Ertiga in ${city !== "India" ? city : "India"}. Please share the best fare.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaWhatsapp className="text-lg" /> Instant WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Interactive Booking & Fare Estimator Card */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-primary">
                  Fast Booking Request
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Book Ertiga {city !== "India" ? `in ${city}` : ""}
                </h2>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                Verified Chauffeur
              </span>
            </div>

            <form onSubmit={handleHeroBookingSubmit} className="space-y-4">
              {/* Pickup Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pickup Location {city !== "India" ? `in ${city}` : ""}
                </label>
                <div className="relative">
                  <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                  <input
                    type="text"
                    required
                    value={heroForm.pickup}
                    onChange={(e) => setHeroForm({ ...heroForm, pickup: e.target.value })}
                    placeholder={`Doorstep / Hotel / Station in ${city !== "India" ? city : "city"}`}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              {/* Trip Package */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trip Type / Package
                </label>
                <select
                  value={heroForm.tripType}
                  onChange={(e) => setHeroForm({ ...heroForm, tripType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition font-medium"
                >
                  <option value="Local Sightseeing (8hr/80km)">Local Full Day (8 Hours / 80 KM) — ₹2,499</option>
                  <option value="Local Half Day (4hr/40km)">Local Half Day (4 Hours / 40 KM) — ₹1,599</option>
                  <option value="Airport Pickup / Drop">Airport Transfer (Pickup / Drop) — From ₹1,099</option>
                  <option value="Outstation One-Way Drop">Outstation One-Way Drop — ₹13/km</option>
                  <option value="Outstation Round-Trip">Outstation Round-Trip (Multi-Day) — ₹13/km</option>
                  <option value="Wedding / Corporate Event">Wedding / Corporate Event</option>
                </select>
              </div>

              {/* Travel Date & Pickup Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={heroForm.date}
                    onChange={(e) => setHeroForm({ ...heroForm, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={heroForm.time}
                    onChange={(e) => setHeroForm({ ...heroForm, time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              {/* Summary Highlight Box */}
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-600">Starting Rental Rate</p>
                  <div className="text-2xl font-black text-primary">Starting ₹13 / KM</div>
                  <p className="text-[11px] text-slate-500">Includes Fuel, Driver & Dual AC</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800">6+1 Passengers</span>
                  <p className="text-[11px] text-slate-500">3-4 Large Bags</p>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3.5 text-base font-black text-white shadow-md transition hover:bg-primary/95 flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-lg" /> Get Instant Quote on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-y py-8"
        style={{
          background: "hsl(var(--foreground))",
          color: "hsl(var(--background))",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          {/* <div className="stats-grid">
            {[
              { num: "1 Lakh+", label: "Trips Completed" },
              { num: "1,000+", label: "Ertigas in Fleet" },
              { num: "100+", label: "Cities Covered" },
              { num: "4.9 ★", label: "Customer Rating" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div
                  className="stat-number"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {stat.num}
                </div>
                <div
                  className="stat-label"
                  style={{ color: "hsla(0,0%,100%,0.5)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
          <StatsBar />
        </div>
      </section>

      {/* Ertiga Variants */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              CHOOSE YOUR Ertiga
            </div>
            <h2 className="section-title">Ertiga Models Available</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ertiga",
                model: "Maruti Ertiga (6+1)",
                image: "/ertiga-base.png",
                price: "₹13/km",
                features: [
                  "6+1 Seating",
                  "AC + Music",
                  "Good Legroom",
                  "Budget Friendly",
                ],
                best: false,
              },
              {
                name: "Ertiga VXi AT",
                model: "Maruti Ertiga",
                image: "/ertiga-base.png",
                price: "₹15/km",
                features: [
                  "6+1 Captain Seats",
                  "Auto AC",
                  "Premium Interiors",
                  "Extra Luggage Space",
                ],
                best: true,
              },
              {
                name: "Ertiga ZXi Plus AT",
                model: "Maruti Ertiga (Hybrid)",
                image: "/ertiga-base.png",
                price: "₹16/km",
                features: [
                  "6+1 Luxury Seats",
                  "Hybrid Engine",
                  "Panoramic Sunroof",
                  "Ultra Premium",
                ],
                best: false,
              },
            ].map((variant, i) => (
              <div
                key={i}
                className={`package-card ${variant.best ? "popular" : ""}`}
              >
                {variant.best && (
                  <div className="package-badge">Most Popular</div>
                )}
                <div className="mb-5">
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-black mb-1">{variant.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {variant.model}
                </p>
                <div
                  className="package-price"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {variant.price}
                </div>
                <div className="package-unit">Per Kilometer</div>
                <ul className="package-features">
                  {variant.features.map((f, j) => (
                    <li key={j}>
                      <span className="text-green-500">✔</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/916280820037?text=${encodeURIComponent(
                    `Hi Chiku Cabs, I am interested in booking a ${variant.name} through your website. Please help me with the booking.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm"
                  style={{ display: "block", textAlign: "center" }}
                >
                  Book {variant.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ertiga */}
      <section className="bg-muted/30 py-12 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY Ertiga
            </div>
            <h2 className="section-title">
              Why Ertiga is India's Favorite Family Car
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Friendly",
                desc: "Spacious 6+1 seating with ample legroom. Captain seats in ertiga model for ultimate comfort.",
              },
              {
                icon: "🛣️",
                title: "Highway King",
                desc: "Powerful diesel engine built for long-distance outstation trips. Smooth ride even on rough roads.",
              },
              {
                icon: "💼",
                title: "Corporate Choice",
                desc: "The preferred vehicle for corporate travel, client pickups, and executive transportation.",
              },
              {
                icon: "🧳",
                title: "Massive Boot Space",
                desc: "Can easily fit 4-5 large suitcases plus cabin bags. Perfect for airport trips and vacations.",
              },
              {
                icon: "❄️",
                title: "Powerful AC",
                desc: "Automatic climate control that keeps all rows equally cool. Rear AC vents for passengers.",
              },
              {
                icon: "🛡️",
                title: "Safety First",
                desc: "ABS, airbags, hill assist, and professional drivers trained for all road conditions.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card group">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl"
                  style={{ background: "hsla(358,73%,43%,0.1)" }}
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

      {/* Use Cases */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <div
              className="section-badge mx-auto mb-4"
              style={{ display: "inline-flex" }}
            >
              POPULAR USE CASES
            </div>
            <h2 className="section-title">
              Popular Ertiga Rental Use Cases{" "}
              {city !== "India" ? `in ${city}` : ""}
            </h2>
          </div>
          {/* Tabs */}
          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`rounded-xl border px-4 py-5 text-center font-semibold transition-all duration-300
            ${
              activeService.id === service.id
                ? "bg-primary text-white border-primary shadow-lg"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}

            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-[260px] md:h-[420px] object-cover"
              />
            </div>

            {/* Content */}

            <div className="flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {activeService.title}
              </h3>

              <p className="text-muted-foreground text-lg leading-8 mb-8">
                {activeService.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {activeService.features.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-white border rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                      ✓
                    </div>

                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I am interested in booking ${activeService.title} through your website. Please help me with the booking.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-fit px-8 py-4"
              >
                Book {activeService.title}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRANSPARENT ERTIGA FARE & RENTAL RATE CARD
      ====================================================== */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-7xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3 text-slate-900">
              Maruti Ertiga Rental Rate Card {city !== "India" ? `in ${city}` : ""}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl mx-auto">
              Comfortable 6-seater family travel at budget-friendly rates. Compare local packages,
              airport transfers, and outstation per-km rates with zero hidden charges.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Trip Package</th>
                  <th className="px-4 py-4">Included Distance / Hours</th>
                  <th className="px-4 py-4">Estimated Fare</th>
                  <th className="px-4 py-4">Extra KM / Hour</th>
                  <th className="px-4 py-4">Toll & Taxes</th>
                  <th className="px-4 py-4 text-center">Instant Booking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">Local Half-Day Rental</div>
                    <div className="text-xs text-slate-500">Shopping, Family Events & Meetings</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700 font-medium">4 Hours / 40 KM</td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-black text-primary">₹1,599</div>
                    <div className="text-[11px] text-slate-500">6+1 AC Ertiga + Driver</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">₹13/km • ₹150/hr</td>
                  <td className="px-4 py-4 text-xs text-slate-600">Parking at actuals</td>
                  <td className="px-4 py-4 text-center">
                    <a
                      href={`https://wa.me/916280820037?text=${encodeURIComponent(
                        `Hi Chiku Cabs, I want to book an Ertiga for 4hr/40km local rental in ${city}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow transition"
                    >
                      <FaWhatsapp /> Book Now
                    </a>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">Local Full-Day Sightseeing</div>
                    <div className="text-xs text-slate-500">Temples, Family Tour & Events</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700 font-medium">8 Hours / 80 KM</td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-black text-primary">₹2,499</div>
                    <div className="text-[11px] text-slate-500">Top Choice for Families</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">₹13/km • ₹150/hr</td>
                  <td className="px-4 py-4 text-xs text-slate-600">Parking at actuals</td>
                  <td className="px-4 py-4 text-center">
                    <a
                      href={`https://wa.me/916280820037?text=${encodeURIComponent(
                        `Hi Chiku Cabs, I want to book an Ertiga for 8hr/80km local package in ${city}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow transition"
                    >
                      <FaWhatsapp /> Book Now
                    </a>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">Airport Pickup / Drop</div>
                    <div className="text-xs text-slate-500">Spacious Luggage Transfer</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700 font-medium">Point-to-Point Terminal Drop</td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-black text-primary">Starting ₹1,099</div>
                    <div className="text-[11px] text-slate-500">Flight Tracking Included</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">Fixed Flat Slab</td>
                  <td className="px-4 py-4 text-xs text-slate-600">Airport toll as applicable</td>
                  <td className="px-4 py-4 text-center">
                    <a
                      href={`https://wa.me/916280820037?text=${encodeURIComponent(
                        `Hi Chiku Cabs, I need an Ertiga airport cab in ${city}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow transition"
                    >
                      <FaWhatsapp /> Book Now
                    </a>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">Outstation One-Way Drop</div>
                    <div className="text-xs text-slate-500">Single side intercity journey</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700 font-medium">As per route distance</td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-black text-primary">₹12 - ₹14 / KM</div>
                    <div className="text-[11px] text-slate-500">Zero return-trip penalty</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">Actual KM billing</td>
                  <td className="px-4 py-4 text-xs text-slate-600">One-way highway Fastag tolls</td>
                  <td className="px-4 py-4 text-center">
                    <a
                      href={`https://wa.me/916280820037?text=${encodeURIComponent(
                        `Hi Chiku Cabs, I need an outstation one-way Ertiga cab from ${city}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow transition"
                    >
                      <FaWhatsapp /> Book Now
                    </a>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">Outstation Round-Trip</div>
                    <div className="text-xs text-slate-500">Multi-day vacation & family pilgrimage</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700 font-medium">Min. 250 KM / Day</td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-black text-primary">₹13 / KM</div>
                    <div className="text-[11px] text-slate-500">+ ₹500/day driver allowance</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">₹13/km beyond limit</td>
                  <td className="px-4 py-4 text-xs text-slate-600">Tolls & state tax at actuals</td>
                  <td className="px-4 py-4 text-center">
                    <a
                      href={`https://wa.me/916280820037?text=${encodeURIComponent(
                        `Hi Chiku Cabs, I need an Ertiga for outstation round-trip from ${city}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow transition"
                    >
                      <FaWhatsapp /> Book Now
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================
          SMART COMPARISON MATRIX
      ====================================================== */}
      <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-7xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Value Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
              Maruti Ertiga 6-Seater vs. Booking 2 Cabs vs. Train vs. Public Bus
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-3xl mx-auto">
              Discover why hiring a single Ertiga is significantly cheaper and more enjoyable than
              splitting your family across two smaller hatchbacks or taking crowded public transit.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Feature</th>
                  <th className="px-5 py-3.5 text-primary font-extrabold">Chiku Ertiga (6+1 Seater)</th>
                  <th className="px-5 py-3.5 text-slate-600">Booking 2 Hatchbacks/Sedans</th>
                  <th className="px-5 py-3.5 text-slate-600">Train (IRCTC)</th>
                  <th className="px-5 py-3.5 text-slate-600">Public Bus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-900">Travel Together</td>
                  <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                    ✔ Entire Family (6 Pax) in 1 Car
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Split across 2 different cars</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Scattered berths across coaches</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Shared cabin with strangers</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-900">Total Group Cost</td>
                  <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                    ✔ 30%–40% Cheaper than 2 Cabs
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Double base fares & toll costs</td>
                  <td className="px-5 py-3.5 text-slate-600">✔ Affordable if tickets confirmed</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Fixed individual ticket cost</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Space</td>
                  <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                    ✔ Foldable 3rd Row for Extra Bags
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Small boot (often CNG occupied)</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Heavy platform lifting</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Limited baggage hold</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-900">Doorstep Convenience</td>
                  <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                    ✔ Direct Home to Destination
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">✔ Doorstep (hard to coordinate 2 cabs)</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Auto/cab needed for station</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Must board at bus depot</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-900">AC & Comfort</td>
                  <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                    ✔ Dual AC Vents for 2nd & 3rd Rows
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">✔ AC sedan comfort</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ AC only in select coaches</td>
                  <td className="px-5 py-3.5 text-slate-600">❌ Cramped legroom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================
          PICKUP & DROP HUBS IN THIS CITY
      ====================================================== */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-7xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Citywide Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
              Popular Ertiga Pickup & Drop Points {city !== "India" ? `in ${city}` : ""}
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
              Chauffeur-driven Ertiga available 24/7 across all major transit hubs and residential zones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                  🚆
                </div>
                <h3 className="font-bold text-slate-900 text-base">Railway Terminals</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Main Central Railway Station
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Suburban & Outstation Junctions
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Punctual Platform Exit Pickups
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-lg">
                  ✈️
                </div>
                <h3 className="font-bold text-slate-900 text-base">Airport Terminals</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Domestic & International Departure Gates
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Arrival Pickups with Flight Tracking
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Aerocity & Terminal Hotel Transfers
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-lg">
                  🏙️
                </div>
                <h3 className="font-bold text-slate-900 text-base">City & Doorstep Hubs</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Gated Societies & Residential Townships
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Heritage Temples & Spiritual Shrines
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary shrink-0" /> Corporate Parks, Banquet Halls & Resorts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INCLUSIONS, EXCLUSIONS & BOOKING TERMS
      ====================================================== */}
      <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-7xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
              100% Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
              Fare Inclusions, Exclusions & Rental Terms
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
              Everything is clearly outlined upfront so your group experiences a stress-free trip.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Inclusions */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
              <h3 className="font-bold text-emerald-900 text-base mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" /> What is Included in Your Ertiga Rental?
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span>Chauffeur-driven Maruti Suzuki Ertiga 6+1 MUV</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span>Fuel charges for booked kilometers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span>Driver allowance (Batta) on outstation trips</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span>Goods and Services Tax (GST 5%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span>Commercial vehicle permits & insurance</span>
                </li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
              <h3 className="font-bold text-rose-900 text-base mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-rose-600" /> Exclusions & Additional Charges
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Highway Toll Plaza Charges (payable at actual Fastag booths)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Parking fees at monuments, airports, or specific venues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Night driving charges (₹250 applied only between 10 PM and 6 AM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Extra distance/time beyond package limits charged at standard per-km/hr rates</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-900 block mb-1">Easy Payment Modes</span>
              UPI, Google Pay, PhonePe, Cards, Netbanking, Corporate Invoices with GST, or Cash.
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-900 block mb-1">Zero Cancellation Surcharge</span>
              Cancel up to 24 hours prior to scheduled departure for an instant 100% refund.
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-900 block mb-1">24/7 Operations Support</span>
              Real-time GPS ride monitoring and dedicated roadside assistance for your family's safety.
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-12 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              REVIEWS
            </div>
            <h2 className="section-title">
              What Ertiga Customers in {city !== "India" ? city : "India"} Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sharma Family",
                text: "Booked an Ertiga for our family trip to Shimla. The captain seats were incredibly comfortable and the kids loved the space. Best road trip ever!",
                rating: "★★★★★",
              },
              {
                name: "Raj (CEO)",
                text: "We use Chiku Cabs Ertiga service for all our corporate client pickups. Always on time, impeccably clean cars, and professional drivers.",
                rating: "★★★★★",
              },
              {
                name: "Neha & Friends",
                text: "Hired an Ertiga for a weekend Jaipur trip from Delhi. The car was practically new, AC was amazing, and we had ample space for all our luggage.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">{city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>
            <h2 className="section-title">
              Ertiga Rental Questions {city !== "India" ? `for ${city}` : ""}
            </h2>
          </div>
          {[
            {
              q: `Where can I hire an Ertiga on rent in ${city}?`,
              a: `You can hire a Maruti Ertiga on rent in ${city} for local travel, airport transfers, outstation trips, corporate travel, and family vacations. Advance booking helps you get better availability and competitive pricing.`,
            },
            {
              q: `What is the price of Ertiga rental in ${city}?`,
              a: `The Ertiga rental price in ${city} depends on your trip type, travel distance, duration, and whether you need a local or outstation cab. Contact us for the latest fare and customized quotation.`,
            },
            {
              q: `Can I book an Ertiga for airport pickup from ${city}?`,
              a: `Yes. You can easily book an Ertiga for airport pickup or drop from ${city}. The service is available 24/7 with professional drivers and timely pickups.`,
            },
            {
              q: `Is Ertiga suitable for a family trip from ${city}?`,
              a: `Yes. The Maruti Ertiga is one of the best family cars for comfortable travel. It offers spacious seating for up to 6–7 passengers along with ample luggage space, making it ideal for family vacations and weekend getaways from ${city}.`,
            },
            {
              q: `Can I book an Ertiga for an outstation trip from ${city}?`,
              a: `Absolutely. You can hire an Ertiga from ${city} for outstation destinations like Agra, Jaipur, Haridwar, Rishikesh, Chandigarh, Shimla, Manali, and many other cities across India.`,
            },
            {
              q: `How many passengers can travel in an Ertiga?`,
              a: `A Maruti Ertiga can comfortably accommodate up to 6–7 passengers along with luggage, making it a popular choice for group travel and family tours.`,
            },
            {
              q: `Is driver charge included in the Ertiga rental price?`,
              a: `Yes. Driver charges are generally included in the rental package. However, toll tax, parking charges, and state taxes (if applicable) may be charged separately depending on your itinerary.`,
            },
            {
              q: `Can I book an Ertiga online in ${city}?`,
              a: `Yes. You can book an Ertiga online by submitting your travel details, calling our booking team, or sending your trip requirements through WhatsApp for instant confirmation.`,
            },
            {
              q: `Which places can I visit by Ertiga from ${city}?`,
              a: `You can hire an Ertiga from ${city} to visit popular tourist attractions, nearby cities, hill stations, pilgrimage destinations, business hubs, and other places based on your travel requirements.`,
            },
            {
              q: `Is Ertiga available for corporate travel in ${city}?`,
              a: `Yes. We provide Ertiga rental services for corporate meetings, office transfers, business events, hotel pickups, conferences, and employee transportation in ${city}.`,
            },
            {
              q: `Can I hire an Ertiga for a one-day trip in ${city}?`,
              a: `Yes. You can rent an Ertiga for a full-day local sightseeing tour, business meetings, shopping, family outings, or multiple stops within ${city} according to your travel plan.`,
            },
            {
              q: `Why should I choose an Ertiga instead of a sedan?`,
              a: `If you're traveling with family or a group, the Ertiga offers more seating capacity, better luggage space, and greater comfort than a standard sedan while remaining budget-friendly.`,
            },
            {
              q: `Is advance booking required for Ertiga rental in ${city}?`,
              a: `Advance booking is recommended, especially during weekends, holidays, wedding season, and festive periods, to ensure vehicle availability and the best rental rates in ${city}.`,
            },
            {
              q: `Is Ertiga available for wedding and event transportation in ${city}?`,
              a: `Yes. You can hire an Ertiga for weddings, family functions, corporate events, guest transportation, and special occasions in ${city}.`,
            },
            {
              q: `Why book an Ertiga on rent in ${city} with us?`,
              a: `We offer clean and well-maintained vehicles, experienced chauffeurs, transparent pricing, on-time pickups, 24/7 customer support, and reliable taxi services for local as well as outstation travel from ${city}.`,
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

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">Book Your Ertiga Now</h2>
          <p className="text-xl opacity-70 mb-8">
            India's most loved family car, at the best rental rates.
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
                "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-10 py-4"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {city !== "India" && (
        <section className="py-12 px-4 bg-muted/10 border-t">
          <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
              Premium Ertiga Rentals in {city}
            </h2>
            <div className="space-y-6">
              <p>
                When it comes to luxurious and spacious family travel in{" "}
                <strong>{city}</strong>, Ertiga is the undisputed king. Whether
                you are navigating the busy streets or heading out on a scenic
                highway trip, choosing an <strong>Ertiga on Rent</strong> in{" "}
                {city} via our <strong>cab booking</strong> app guarantees a
                smooth ride. As a premier <strong>taxi service</strong>, we
                ensure your <strong>outstation cabs</strong> experience is
                unparalleled.
              </p>
              <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                Why Book an Ertiga Cab in {city}?
              </h3>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Outstation Cabs from {city}:</strong> Perfect for
                    weekend getaways and long-distance travel securely with our
                    verified <strong>taxi service</strong> drivers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>{city} Airport Taxi:</strong> Never worry about
                    fitting your luggage. Our massive boot space easily holds
                    bags for the whole family during{" "}
                    <strong>airport transfer</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Corporate & Wedding Car Rental:</strong> Arrive in
                    style. The premium feel of our{" "}
                    <strong>Ertiga on Rent</strong> makes it ideal for executive
                    transit or as an elegant wedding car in {city}.
                  </span>
                </li>
              </ul>
              <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                <p className="mb-0 text-card-foreground">
                  At Chiku Cabs, we offer both the standard 6+1-seater Ertiga for <strong>cab booking</strong>{" "}
                  in {city} at highly competitive rates. With our transparent
                  per-km billing and pristine fleet, we ensure your journey is
                  absolutely perfect.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Local Dominance Section */}
      <section className="py-8 px-4 bg-muted/10 border-t">
        <LocalDominance city={localDominanceCity} />
      </section>

      <InternalLinks parsedData={parsedData} />
      <EEATSection
        city={city !== "India" ? city : undefined}
        vehicle="Ertiga"
      />
      <VehicleAvailability
        vehicleName="Ertiga"
        vehicleSlug="hire-ertiga-on-rent"
        city={city}
        baseCity={baseCity}
        currentUrl={currentUrl}
        urls={routeData}
      />
      {/* <VehicleLocationLinks
        vehicleName="Innova Crysta"
        vehicleSlug="hire-innova-crysta-on-rent"
        city={baseCity}
        urls={routeData}
        currentUrl={currentUrl}
      /> */}

      <section className="py-12 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <PopularCities
            vehicleName={parsedData.vehicle || "Ertiga" || "Innova"}
            currentCity={parsedData.origin?.toLowerCase()}
          />
        </div>
      </section>

      {/* related vehicles */}
      <section className="py-8 px-4 border-t bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Other Vehicles Available in {city}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedVehicles.map((vehicle) => {
              const url = `/${[
                ...parsedData.slugs.slice(0, -1),
                vehicle.slug,
              ].join("/")}`;

              return (
                <a
                  key={vehicle.slug}
                  href={url}
                  className="border bg-white rounded-lg px-6 py-5 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold leading-7">
                    Hire {vehicle.name} on Rent in {city}
                  </h3>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
