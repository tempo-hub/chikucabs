"use client";

import React, { useState, useMemo } from "react";
import {
  Car,
  ArrowLeftRight,
  Building2,
  Plane,
  MapPin,
  Calendar,
  Clock,
  Smartphone,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { PHONE_NUMBER, PHONE_DISPLAY, waUrl, WHATSAPP_NUMBER } from "@/data/chikuData";
import { CITIES, ROUTES } from "@/data/chikuData";

type TripTab = "oneway" | "roundtrip" | "local" | "airport";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<TripTab>("oneway");

  // Form Fields State
  const [pickupCity, setPickupCity] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState(""); // For Hourly/Time input
  const [dropoffDate, setDropoffDate] = useState(""); // For Round Trip
  const [packageDuration, setPackageDuration] = useState("8 Hours"); // For Local Sightseeing
  const [phoneNo, setPhoneNo] = useState("");

  const filteredPickupCities = useMemo(() => {
  const query = pickupCity.trim().toLowerCase();

  // Don't show anything until user types
  if (!query) return [];

  return CITIES.filter((city) =>
    city.toLowerCase().includes(query)
  ).slice(0, 8);
}, [pickupCity]);

const availableDropCities = useMemo(() => {
  if (!pickupCity.trim()) return [];

  const matchedDrops = ROUTES
    .filter(
      (r) =>
        r.from.toLowerCase() === pickupCity.trim().toLowerCase()
    )
    .map((r) => r.to);

  return matchedDrops.length > 0
    ? Array.from(new Set(matchedDrops))
    : CITIES;
}, [pickupCity]);


const handleSwapCities = () => {
    setPickupCity(dropCity);
    setDropCity(pickupCity);
  };

const filteredDropCities = useMemo(() => {
  const query = dropCity.trim().toLowerCase();

  if (!query) return [];

  return availableDropCities
    .filter((city) =>
      city.toLowerCase().includes(query)
    )
    .slice(0, 8);
}, [dropCity, availableDropCities]);

  const handleSearchTaxi = (e: React.FormEvent) => {
    e.preventDefault();
    const tabLabels: Record<TripTab, string> = {
      oneway: "One Way",
      roundtrip: "Round Trip",
      local: "Local Sightseeing",
      airport: "Airport Transfer",
    };

    let details = `Hi Chiku Cabs, I want to book a ${tabLabels[activeTab]} cab.\n`;

    if (activeTab === "oneway") {
      details += `Pickup: ${pickupCity}\nDrop: ${dropCity}\nDate: ${pickupDate}\n`;
    } else if (activeTab === "roundtrip") {
      details += `Pickup City: ${pickupCity}\nTravel City: ${dropCity}\nPickup Date: ${pickupDate}\nDrop Off Date: ${dropoffDate}\n`;
    } else if (activeTab === "local") {
      details += `City: ${pickupCity}\nPickup Date: ${pickupDate}\nTime: ${pickupTime || "N/A"}\nPackage: ${packageDuration}\n`;
    } else if (activeTab === "airport") {
      details += `Arrival Airport: ${pickupCity}\nDrop Location: ${dropCity}\nPickup Date: ${pickupDate}\nTime: ${pickupTime || "N/A"}\n`;
    }

    details += `Contact No: +91 ${phoneNo}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details)}`, "_blank");
  };

  return (
    <section className="relative py-16 lg:py-16 overflow-hidden flex items-center bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/home/home.png')` }}
      />
      <div className="absolute inset-0 bg-slate-950/75 z-0" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 text-white space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
              ★ INDIA&apos;S MOST TRUSTED CAB SERVICE
            </div>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              Your Journey, <br />
              Our <span className="text-primary">Premium</span> Ride
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Book outstation cabs, airport taxis, tempo travellers &amp; luxury car rentals across <strong>100+ cities</strong> in India. Verified drivers. Transparent pricing. Zero hidden charges.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="px-6 py-3 bg-primary hover:bg-[#e01a13] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-sm shadow-md transition"
              >
                <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-sm shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Verified Drivers
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary fill-primary" /> 4.9/5 Rating
              </span>
              <span className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" /> 1L+ Completed Trips
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> 24/7 Roadside Support
              </span>
            </div>
          </div>

          {/* Right Column (Dynamic Booking Widget) */}
          <div className="lg:col-span-7">
            <div className="bg-transparent backdrop-blur-md rounded-sm shadow-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/15">
                <button
                  type="button"
                  onClick={() => setActiveTab("oneway")}
                  className={`relative flex items-center justify-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === "oneway" ? "bg-primary text-slate-50 font-bold" : "bg-[#0c3559]/70 text-white/90 hover:bg-[#0c3559]"
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>Oneway</span>
                  {activeTab === "oneway" && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary z-20" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("roundtrip")}
                  className={`relative flex items-center justify-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors border-l border-white/10 ${
                    activeTab === "roundtrip" ? "bg-primary text-slate-50 font-bold" : "bg-[#0c3559]/70 text-white/90 hover:bg-[#0c3559]"
                  }`}
                >
                  <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0" />
                  <span>Round Trip</span>
                  {activeTab === "roundtrip" && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary z-20" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("local")}
                  className={`relative flex items-center justify-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors border-l border-white/10 ${
                    activeTab === "local" ? "bg-primary text-slate-50 font-bold" : "bg-[#0c3559]/70 text-white/90 hover:bg-[#0c3559]"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>LocalSight Seeing</span>
                  {activeTab === "local" && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary z-20" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("airport")}
                  className={`relative flex items-center justify-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors border-l border-white/10 ${
                    activeTab === "airport" ? "bg-primary text-slate-50 font-bold" : "bg-[#0c3559]/70 text-white/90 hover:bg-[#0c3559]"
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Airport Transfer</span>
                  {activeTab === "airport" && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary z-20" />
                  )}
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSearchTaxi} className="p-5 sm:p-7 space-y-5">
                

                {/* Datalists for Autocomplete */}
                <datalist id="pickup-cities">
  {filteredPickupCities.map((city, idx) => (
    <option key={`pickup-${idx}`} value={city} />
  ))}
</datalist>

<datalist id="drop-cities">
  {filteredDropCities.map((city, idx) => (
    <option key={`drop-${idx}`} value={city} />
  ))}
</datalist>

                {/* ═══════════════ ROW 1: LOCATIONS ═══════════════ */}
                {activeTab === "local" ? (
                  // Local Sightseeing: Single City Input
                  <div>
                    <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                      CITY NAME
                    </label>
                    <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                      <input
                        type="text"
                        list="pickup-cities"
                        required
                        placeholder="E.g. Delhi"
                        value={pickupCity}
                        onChange={(e) => setPickupCity(e.target.value)}
                        className="w-full px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                      />
                      
                    </div>
                  </div>
                ) : (
                  // Oneway, Round Trip, Airport
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    <div>
                      <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                        {activeTab === "airport" ? "ARRIVAL AIRPORT" : "PICK UP CITY"}
                      </label>
                      <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                        <input
                          type="text"
                          list="pickup-cities"
                          required
                          placeholder={activeTab === "airport" ? "E.g. IGI Airport Terminal 3" : "E.g. New Delhi"}
                          value={pickupCity}
                          onChange={(e) => setPickupCity(e.target.value)}
                          className="w-full px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                        />
                        
                      </div>
                    </div>

                    {activeTab !== "airport" && (
                      <button
                        type="button"
                        onClick={handleSwapCities}
                        title="Swap Cities"
                        className="hidden md:flex absolute left-[calc(50%-12px)] top-[43px] -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white text-slate-700 border border-slate-300 shadow items-center justify-center hover:bg-slate-50 hover:text-black z-20 transition"
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                      </button>
                    )}

                    <div>
                      <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                        {activeTab === "roundtrip"
                          ? "TRAVEL CITY"
                          : activeTab === "airport"
                          ? "DROP LOCATION"
                          : "DROP CITY"}
                      </label>
                      <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                        <input
                          type="text"
                          list="drop-cities"
                          required
                          placeholder={activeTab === "airport" ? "E.g. Connaught Place, Delhi" : "E.g. Chandigarh"}
                          value={dropCity}
                          onChange={(e) => setDropCity(e.target.value)}
                          className="w-full px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                        />
                        
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════ ROW 2: DATES, TIMES & PACKAGES ═══════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div>
                    <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                      PICK UP DATE
                    </label>
                    <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                      <input
                        type="date"
                        required
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 text-sm text-slate-800 focus:outline-none bg-transparent"
                      />
                      
                    </div>
                  </div>

                  {/* Second Field: Drop Date (Round Trip) / Time (Local & Airport) */}
                  {activeTab === "roundtrip" && (
                    <div>
                      <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                        DROP OFF DATE
                      </label>
                      <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                        <input
                          type="date"
                          required
                          value={dropoffDate}
                          onChange={(e) => setDropoffDate(e.target.value)}
                          className="w-full px-3 text-sm text-slate-800 focus:outline-none bg-transparent"
                        />
                        
                      </div>
                    </div>
                  )}

                  {(activeTab === "local" || activeTab === "airport") && (
                    <div>
                      <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                        PICK UP TIME
                      </label>
                      <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                        <input
                          type="time"
                          required
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-3 text-sm text-slate-800 focus:outline-none bg-transparent"
                        />
                        
                      </div>
                    </div>
                  )}
                </div>

                {/* Local Hourly Packages Selection */}
                {activeTab === "local" && (
                  <div>
                    <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                      PACKAGE
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["4 Hours", "8 Hours", "12 Hours"].map((pkg) => (
                        <button
                          key={pkg}
                          type="button"
                          onClick={() => setPackageDuration(pkg)}
                          className={`h-11 text-xs font-bold uppercase transition-colors border ${
                            packageDuration === pkg
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-slate-700 border-gray-200 hover:bg-slate-50"
                          }`}
                        >
                          {pkg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ═══════════════ ROW 3: PHONE NUMBER ═══════════════ */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4">
                    <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                      CODE
                    </label>
                    <div className="bg-white text-slate-700 text-sm font-semibold h-11 flex items-center justify-center border border-gray-200">
                      +91
                    </div>
                  </div>
                  <div className="col-span-8">
                    <label className="block text-white text-[11px] font-bold tracking-wider uppercase mb-1">
                      PHONE NO.
                    </label>
                    <div className="flex bg-white overflow-hidden h-11 items-center border border-gray-200">
                      <input
                        type="tel"
                        required
                        placeholder="E.g. 9876661275"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="w-full px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                      />
                      <span className="px-3 text-slate-500 border-l border-slate-200 flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-64 py-3 bg-primary hover:bg-[#e01a13] text-slate-50 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all active:scale-[0.99]"
                  >
                    SEARCH TAXI
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}