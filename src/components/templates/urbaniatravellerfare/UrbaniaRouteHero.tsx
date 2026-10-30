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
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
  duration?: string;
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
}

const URBANIA_FLEET: UrbaniaFleetOption[] = [
  {
    id: "12-seater",
    name: "12 Seater Luxury Urbania",
    seats: "12 Luxury Captain Recliners",
    capacity: 12,
    ratePerKm: 28,
    luggage: "10-12 Bags + Dedicated Hold",
  },
  {
    id: "17-seater",
    name: "17 Seater Maharaja Urbania",
    seats: "17 Executive Recliners",
    capacity: 17,
    ratePerKm: 32,
    luggage: "15+ Bags + Massive Hold",
  },
];

function calculateFare(distanceKm: number, ratePerKm: number): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) return 0;
  return Math.round(distanceKm * 1.5 * ratePerKm + DRIVER_ALLOWANCE);
}

function formatCurrency(val: number): string {
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

export default function UrbaniaRouteHero({
  fromCity,
  toCity,
  distance,
  duration,
}: Props) {
  const effectiveDistance = distance && distance > 0 ? distance : DEFAULT_DISTANCE;
  const travelHours = duration || (effectiveDistance / 50).toFixed(1);

  const [formData, setFormData] = useState({
    pickup: fromCity || "",
    drop: toCity || "",
    date: "",
    time: "06:00",
    vehicleId: "12-seater",
  });

  const selectedVehicle =
    URBANIA_FLEET.find((v) => v.id === formData.vehicleId) || URBANIA_FLEET[0];

  const estimatedFare = useMemo(() => {
    return calculateFare(effectiveDistance, selectedVehicle.ratePerKm);
  }, [effectiveDistance, selectedVehicle]);

  const perSeatCost = Math.round(estimatedFare / selectedVehicle.capacity);
  const startingFare = calculateFare(effectiveDistance, URBANIA_FLEET[0].ratePerKm);
  const startingPerSeat = Math.round(startingFare / URBANIA_FLEET[0].capacity);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `🚐 *Force Urbania Booking Request*

📍 *Route:* ${formData.pickup || fromCity} → ${formData.drop || toCity}
📏 *Distance:* Approx. ${effectiveDistance} km
👥 *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.seats})
💰 *Estimated Fare:* ${formatCurrency(estimatedFare)} (~${formatCurrency(perSeatCost)}/seat)
🧳 *Luggage:* ${selectedVehicle.luggage}
📅 *Travel Date:* ${formData.date || "Immediate / To Confirm"}
⏰ *Pickup Time:* ${formData.time || "To Confirm"}

Please share the confirmed booking and vehicle pictures.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative isolate overflow-hidden bg-black text-white py-12 lg:py-16 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/outstation.webp"
          alt={`${fromCity} to ${toCity} Force Urbania Rental by Chiku Cabs`}
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
            <span>4.9 / 5 Rated (3,450+ Completed Intercity Trips)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            {fromCity} to {toCity} Force Urbania
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
            Direct doorstep pickup in <strong className="text-white">{fromCity}</strong> to{" "}
            <strong className="text-white">{toCity}</strong>. Travel approx.{" "}
            <span className="font-bold text-primary">{effectiveDistance} km</span> in about{" "}
            <span className="font-bold text-primary">{travelHours} hours</span> in ultra-luxury
            reclining captain seats with verified chauffeurs. Luxury Urbania fares start at{" "}
            <strong className="text-white underline decoration-primary decoration-2 underline-offset-4">
              {formatCurrency(startingFare)}
            </strong>
            . Economical at ~{formatCurrency(startingPerSeat)} per seat with zero return penalty.
          </p>

          {/* Quick Trip Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                <FaRoute /> Distance
              </div>
              <div className="text-lg font-black">{effectiveDistance} KM</div>
              <div className="text-[11px] text-slate-400">Road Distance</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                <FaClock /> Duration
              </div>
              <div className="text-lg font-black">~{travelHours} Hrs</div>
              <div className="text-[11px] text-slate-400">Via Highway Corridor</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-0.5">
                <FaCar /> Rate Per KM
              </div>
              <div className="text-lg font-black">₹28 / KM</div>
              <div className="text-[11px] text-slate-400">12 & 17 Seater</div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="space-y-2 text-sm text-slate-300 mb-8">
            <div className="flex items-center gap-2.5">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Doorstep pickup anywhere in {fromCity} to {toCity} doorstep drop</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>100% transparent billing: Chauffeur allowance, fuel & GST included</span>
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
                `Hi Chiku Cabs, I want to book a Force Urbania from ${fromCity} to ${toCity}. Please share the best fare.`
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
                Get {fromCity} → {toCity} Urbania
              </h2>
            </div>
            <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-md text-slate-700">
              Luxury Group Van
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pickup */}
            <div>
              <label htmlFor="urbania-pickup" className="block text-xs font-bold text-slate-700 mb-1">
                Pickup Location
              </label>
              <div className="relative">
                <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                <input
                  id="urbania-pickup"
                  type="text"
                  required
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  placeholder={`Enter pickup in ${fromCity}`}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* Drop */}
            <div>
              <label htmlFor="urbania-drop" className="block text-xs font-bold text-slate-700 mb-1">
                Drop Location
              </label>
              <div className="relative">
                <IoLocationSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base" />
                <input
                  id="urbania-drop"
                  type="text"
                  required
                  value={formData.drop}
                  onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                  placeholder={`Enter drop in ${toCity}`}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="urbania-date" className="block text-xs font-bold text-slate-700 mb-1">
                  Travel Date
                </label>
                <input
                  id="urbania-date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-primary focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="urbania-time" className="block text-xs font-bold text-slate-700 mb-1">
                  Pickup Time
                </label>
                <input
                  id="urbania-time"
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
              <label htmlFor="urbania-vehicle" className="block text-xs font-bold text-slate-700 mb-1">
                Select Urbania Seating Variant
              </label>
              <select
                id="urbania-vehicle"
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
                  Estimated Total Fare (~{effectiveDistance} km)
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