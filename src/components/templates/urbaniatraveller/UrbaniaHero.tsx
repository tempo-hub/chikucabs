"use client";

import React, { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaPhoneAlt,
  FaStar,
  FaRoute,
  FaClock,
  FaCar,
  FaShieldAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

interface UrbaniaHeroProps {
  city?: string;
  onBookNow?: () => void;
}

const PHONE_NUMBER = "+918448445504";
const DISPLAY_PHONE = "8448445504";
const WHATSAPP_NUMBER = "916280820037";
const DEFAULT_DISTANCE = 250;
const DRIVER_ALLOWANCE = 500;

interface UrbaniaFleetOption {
  id: string;
  name: string;
  seats: string;
  capacity: number;
  ratePerKm: number;
  luggage: string;
  local8hr: number;
  airport: number;
}

const URBANIA_FLEET: UrbaniaFleetOption[] = [
  {
    id: "12-seater",
    name: "12 Seater Luxury Urbania",
    seats: "12 Luxury Captain Recliners",
    capacity: 12,
    ratePerKm: 28,
    luggage: "10-12 Bags + Dedicated Hold",
    local8hr: 6500,
    airport: 4000,
  },
  {
    id: "17-seater",
    name: "17 Seater Maharaja Urbania",
    seats: "17 Executive Recliners",
    capacity: 17,
    ratePerKm: 32,
    luggage: "15+ Bags + Massive Hold",
    local8hr: 7500,
    airport: 4800,
  },
];

function calculateFare(distanceKm: number, ratePerKm: number): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  return Math.round(distanceKm * 1.5 * ratePerKm + DRIVER_ALLOWANCE);
}

function formatCurrency(val: number): string {
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

export default function UrbaniaHero({
  city = "Noida",
}: UrbaniaHeroProps) {
  const formattedCity = city || "Noida";

  const [formData, setFormData] = useState({
    pickup: formattedCity,
    drop: "",
    date: "",
    time: "06:00",
    vehicleId: "12-seater",
    tripType: "outstation", // 'outstation' | 'local' | 'airport'
  });

  const selectedVehicle =
    URBANIA_FLEET.find((v) => v.id === formData.vehicleId) || URBANIA_FLEET[0];

  const estimatedFare = useMemo(() => {
    if (formData.tripType === "local") {
      return selectedVehicle.local8hr;
    }
    if (formData.tripType === "airport") {
      return selectedVehicle.airport;
    }
    return calculateFare(DEFAULT_DISTANCE, selectedVehicle.ratePerKm);
  }, [formData.tripType, selectedVehicle]);

  const perSeatCost = Math.round(estimatedFare / selectedVehicle.capacity);
  const startingOutstationFare = calculateFare(DEFAULT_DISTANCE, URBANIA_FLEET[0].ratePerKm);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tripLabel =
      formData.tripType === "local"
        ? "Local 8hr/80km Sightseeing"
        : formData.tripType === "airport"
        ? "Airport Transfer"
        : `Outstation (~${DEFAULT_DISTANCE} km)`;

    const message = `🚐 *Force Urbania Booking Request*

📍 *City:* ${formattedCity}
📍 *Pickup:* ${formData.pickup}
📍 *Drop / Destination:* ${formData.drop || "Local / As per itinerary"}
🛣️ *Trip Type:* ${tripLabel}
👥 *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.seats})
💰 *Estimated Fare:* ${formatCurrency(estimatedFare)} (~${formatCurrency(perSeatCost)}/seat)
🧳 *Luggage:* ${selectedVehicle.luggage}
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please share booking confirmation and vehicle pictures.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/outstation.webp"
          alt={`Urbania Traveller Rental in ${formattedCity} by Chiku Cabs`}
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
        {/* ================= LEFT CONTENT ================= */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-white/15 mb-4">
            <FaStar className="text-amber-400" />
            <span>4.9 / 5 Rated (3,450+ Completed Group Trips)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            Force Urbania in {formattedCity}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
            Rent luxury 12 & 17 seater Force Urbania in <strong className="text-white">{formattedCity}</strong> for
            outstation tours, corporate events, family weddings, and VIP airport transfers.
            Starting at only <strong className="text-white underline decoration-primary decoration-2 underline-offset-4">₹28/km</strong> or{" "}
            <strong className="text-white">{formatCurrency(startingOutstationFare)}</strong> for intercity trips.
            Ultra-luxury reclining captain seats with polite verified chauffeurs.
          </p>

          {/* Quick Trip Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                <FaCar /> Rate Per KM
              </div>
              <div className="text-lg font-black">₹28 / KM</div>
              <div className="text-[11px] text-slate-400">12 & 17 Seater</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                <FaClock /> Local 8Hr/80Km
              </div>
              <div className="text-lg font-black">From ₹6,500</div>
              <div className="text-[11px] text-slate-400">Sightseeing / Events</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-0.5">
                <FaShieldAlt /> Chauffeur
              </div>
              <div className="text-lg font-black text-emerald-400">Verified</div>
              <div className="text-[11px] text-slate-400">Police Background Checked</div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="space-y-2 text-sm text-slate-300 mb-8">
            <div className="flex items-center gap-2.5">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Doorstep pickup across all sectors, hotels & terminals in {formattedCity}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Transparent billing: Chauffeur allowance, fuel & GST included</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Free cancellation up to 24 hours prior to scheduled departure</span>
            </div>
          </div>

          {/* Quick Phone & WhatsApp Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaPhoneAlt /> Call {DISPLAY_PHONE}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi Chiku Cabs, I want to rent a Force Urbania in ${formattedCity}. Please share the best quote.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-base text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaWhatsapp className="text-lg" /> Instant WhatsApp
            </a>
          </div>
        </div>

        {/* ================= RIGHT BOOKING FORM CARD ================= */}
        <div
          id="urbania-booking"
          className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-primary">
                Instant Fare Estimator
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Book Urbania in {formattedCity}
              </h2>
            </div>
            <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-md text-slate-700">
              12 & 17 Seater
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Trip Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Trip Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tripType: "outstation" })}
                  className={`py-2 text-xs font-bold rounded-lg border transition ${
                    formData.tripType === "outstation"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Outstation
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tripType: "local" })}
                  className={`py-2 text-xs font-bold rounded-lg border transition ${
                    formData.tripType === "local"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Local 8H/80K
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tripType: "airport" })}
                  className={`py-2 text-xs font-bold rounded-lg border transition ${
                    formData.tripType === "airport"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Airport
                </button>
              </div>
            </div>

            {/* Pickup */}
            <div>
              <label htmlFor="urbania-city-pickup" className="block text-xs font-bold text-slate-700 mb-1">
                Pickup Location in {formattedCity}
              </label>
              <div className="relative">
                <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                <input
                  id="urbania-city-pickup"
                  type="text"
                  required
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  placeholder={`Enter pickup address in ${formattedCity}`}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* Drop / Destination */}
            <div>
              <label htmlFor="urbania-city-drop" className="block text-xs font-bold text-slate-700 mb-1">
                {formData.tripType === "outstation"
                  ? "Destination City"
                  : formData.tripType === "airport"
                  ? "Airport Terminal"
                  : "Local Sightseeing Drop"}
              </label>
              <div className="relative">
                <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                <input
                  id="urbania-city-drop"
                  type="text"
                  required
                  value={formData.drop}
                  onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                  placeholder={
                    formData.tripType === "outstation"
                      ? "Enter destination city (e.g. Agra, Jaipur, Ayodhya)"
                      : formData.tripType === "airport"
                      ? "Enter Airport (Terminal 1, 2, or 3)"
                      : "Full day local itinerary / Hotels"
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="urbania-city-date" className="block text-xs font-bold text-slate-700 mb-1">
                  Travel Date
                </label>
                <input
                  id="urbania-city-date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="urbania-city-time" className="block text-xs font-bold text-slate-700 mb-1">
                  Pickup Time
                </label>
                <input
                  id="urbania-city-time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label htmlFor="urbania-city-vehicle" className="block text-xs font-bold text-slate-700 mb-1">
                Select Urbania Seating Variant
              </label>
              <select
                id="urbania-city-vehicle"
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition font-medium"
              >
                {URBANIA_FLEET.map((fleet) => (
                  <option key={fleet.id} value={fleet.id}>
                    {fleet.name} ({fleet.seats}) — ₹{fleet.ratePerKm}/km
                  </option>
                ))}
              </select>
            </div>

            {/* Live Fare Summary Box */}
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600">
                  {formData.tripType === "local"
                    ? "Local 8 Hr / 80 Km Package"
                    : formData.tripType === "airport"
                    ? "Airport Pickup / Drop Package"
                    : `Estimated Outstation Fare (~${DEFAULT_DISTANCE} km)`}
                </p>
                <div className="text-2xl font-black text-primary">
                  {formatCurrency(estimatedFare)}
                </div>
                <p className="text-[11px] text-slate-500">
                  Fuel, driver allowance & GST included
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800">
                  ~{formatCurrency(perSeatCost)} / seat
                </span>
                <p className="text-[11px] text-slate-500">
                  {selectedVehicle.seats}
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3.5 text-base font-black text-white shadow-md transition hover:bg-primary/95 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-lg" /> Get Final Booking on WhatsApp
            </button>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500" /> Quick Response
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500" /> Best Rate Guaranteed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500" /> Instant Confirmation
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}