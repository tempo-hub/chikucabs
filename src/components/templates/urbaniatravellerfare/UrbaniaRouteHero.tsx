"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
  duration?: string;
}

export default function UrbaniaRouteHero({
  fromCity,
  toCity,
  distance,
  duration,
}: Props) {
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [pickup, setPickup] = useState(fromCity);
  const [drop, setDrop] = useState(toCity);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `
Hi Chiku Cabs, I want to book an Urbania Traveller.

Route: ${fromCity} to ${toCity}
Travel Date: ${travelDate}
Passengers: ${passengers}
Pickup: ${pickup}
Drop: ${drop}
Vehicle: 12/17 Seater Urbania
Rate: ₹28/KM
Approx. Distance: ${distance ? `${distance} KM` : "To be confirmed"}

Please share the final fare and availability.
    `.trim();

    const whatsappUrl = `https://wa.me/916280820037?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      {/* Background */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/urbania/urbania.webp')",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 -z-20 bg-slate-950/50"
        aria-hidden="true"
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/40 via-slate-950/30 to-slate-950/30"
        aria-hidden="true"
      />

      <div
        className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_420px] lg:gap-14">
          {/* ================= LEFT CONTENT ================= */}
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-primary backdrop-blur-sm sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Urbania Traveller Fare
            </div>

            {/* H1 */}
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {fromCity} to {toCity}

              <span className="mt-2 block text-primary">
                Urbania Traveller
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base lg:text-lg">
              Book a premium 12 or 17 seater Urbania from{" "}
              <strong className="text-white">{fromCity}</strong> to{" "}
              <strong className="text-white">{toCity}</strong> with
              Chiku Cabs. Comfortable group travel with a professional
              chauffeur and route-based fare.
            </p>

            {/* Benefits */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 py-3 text-xs font-bold backdrop-blur-sm">
                <FaCheckCircle className="text-primary" />
                12 Seater
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 py-3 text-xs font-bold backdrop-blur-sm">
                <FaCheckCircle className="text-primary" />
                17 Seater
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 py-3 text-xs font-bold backdrop-blur-sm">
                <FaCheckCircle className="text-primary" />
                ₹28/KM
              </div>
            </div>

            {/* Route Details */}
            <div className="mt-6 grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-3">
              {distance && (
                <div className="rounded-xl border border-white/10 bg-black/25 p-3.5 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">
                    Distance
                  </p>

                  <p className="mt-1 text-base font-black">
                    {distance} KM
                  </p>
                </div>
              )}

              {duration && (
                <div className="rounded-xl border border-white/10 bg-black/25 p-3.5 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">
                    Journey
                  </p>

                  <p className="mt-1 text-base font-black">
                    {duration}
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-black/25 p-3.5 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">
                  Rate
                </p>

                <p className="mt-1 text-base font-black">
                  ₹28/KM
                </p>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:hidden">
              <Link
                href="#urbania-booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-extrabold text-white"
              >
                Book Urbania
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT BOOKING FORM ================= */}
          <div
            id="urbania-booking"
            className="w-full rounded-3xl border border-white/15 bg-white p-5 text-slate-900 shadow-2xl sm:p-6"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                <FaWhatsapp />
                Quick Booking
              </div>

              <h2 className="mt-3 text-xl font-black sm:text-2xl">
                Get Your Urbania Fare
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Enter your trip details and continue on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Pickup */}
              <div>
                <label
                  htmlFor="urbania-pickup"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >
                  Pickup Location
                </label>

                <input
                  id="urbania-pickup"
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder={`Pickup in ${fromCity}`}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
                />
              </div>

              {/* Drop */}
              <div>
                <label
                  htmlFor="urbania-drop"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >
                  Drop Location
                </label>

                <input
                  id="urbania-drop"
                  type="text"
                  required
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder={`Drop in ${toCity}`}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
                />
              </div>
               {/* Date + Passengers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="urbania-date"
                    className="mb-1.5 block text-[11px] font-bold text-slate-600"
                  >
                    Travel Date
                  </label>

                  <input
                    id="urbania-date"
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="urbania-passengers"
                    className="mb-1.5 block text-[11px] font-bold text-slate-600"
                  >
                    Passengers
                  </label>

                  <select
                    id="urbania-passengers"
                    required
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none transition focus:border-primary focus:bg-white"
                  >
                    <option value="">Select</option>
                    <option value="1-6">1–6</option>
                    <option value="7-12">7–12</option>
                    <option value="13-17">13–17</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 active:scale-[0.99]"
              >
                <FaWhatsapp />
                Get Fare on WhatsApp
              </button>

              <p className="text-center text-[10px] leading-4 text-slate-400">
                Your details will be shared with Chiku Cabs on WhatsApp
                for booking assistance.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}