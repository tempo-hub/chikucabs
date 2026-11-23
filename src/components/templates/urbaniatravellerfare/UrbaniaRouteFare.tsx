"use client";

import React, { useMemo, useState } from "react";
import {
  FaCalculator,
  FaCheckCircle,
  FaRoute,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
}

const RATE_PER_KM = 28;
const DISTANCE_MULTIPLIER = 1.5;
const FIXED_CHARGE = 500;

export default function UrbaniaRouteFare({
  fromCity,
  toCity,
  distance,
}: Props) {
  const [customDistance, setCustomDistance] = useState(
    distance ? String(distance) : ""
  );

  const selectedDistance = Number(customDistance) || 0;

  const estimatedFare = useMemo(() => {
    if (selectedDistance <= 0) return 0;

    return Math.round(
      selectedDistance * DISTANCE_MULTIPLIER * RATE_PER_KM +
        FIXED_CHARGE
    );
  }, [selectedDistance]);

  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want an Urbania Traveller from ${fromCity} to ${toCity}. Distance: ${selectedDistance || "Not specified"} km. Please confirm the final fare and availability.`
  );

  return (
    <section
      id="urbania-fare"
      className="px-4 py-12 sm:px-6 lg:px-8 lg:py-23 bg-white/90 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            <FaCalculator />
            Urbania Fare Estimate
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Estimate Your {fromCity} to {toCity} Urbania Fare
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Enter your approximate travel distance to get an estimated
            Urbania fare. The final fare may vary based on your trip
            requirements, route and booking details.
          </p>
        </div>

        {/* Calculator */}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            {/* Input */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaRoute />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                    Your Journey
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    {fromCity} → {toCity}
                  </p>
                </div>
              </div>

              <label
                htmlFor="urbania-distance"
                className="mt-7 block text-xs font-extrabold text-slate-800"
              >
                Enter Approximate Distance
              </label>

              <div className="relative mt-2">
                <input
                  id="urbania-distance"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={customDistance}
                  onChange={(e) => setCustomDistance(e.target.value)}
                  placeholder="Enter distance"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-16 text-base font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                  KM
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-slate-400">
                You can enter your estimated total route distance.
              </p>

              {/* Quick distances */}
              <div className="mt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                  Quick Select
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {[100, 200, 300, 500, 700].map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => setCustomDistance(String(km))}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-primary hover:text-primary"
                    >
                      {km} KM
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-slate-950 p-5 text-white sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
                Estimated Fare
              </p>

              <div className="mt-4">
                <span className="text-4xl font-black sm:text-5xl">
                  ₹{estimatedFare.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-white/50">
                Estimated for approximately {selectedDistance || 0} KM
              </p>

              <div className="my-6 h-px bg-white/10" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Urbania rate</span>
                  <span className="font-bold">₹28/KM</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Vehicle options</span>
                  <span className="font-bold">12 & 17 Seater</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Route</span>
                  <span className="max-w-[55%] truncate font-bold">
                    {fromCity} → {toCity}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/916280820037?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary/90"
              >
                <FaWhatsapp />
                Confirm This Fare
              </a>

              <p className="mt-4 text-center text-[10px] leading-5 text-white/40">
                Final pricing is confirmed by Chiku Cabs after reviewing
                your complete trip details.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-2 sm:grid-cols-3">
          {[
            "12 & 17 Seater Options",
            "Professional Chauffeur",
            "Route-Specific Fare",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-center"
            >
              <FaCheckCircle className="shrink-0 text-xs text-primary" />

              <span className="text-[11px] font-bold text-slate-600">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}