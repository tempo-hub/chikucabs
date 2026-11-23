
"use client";

import React, { useMemo, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaArrowRight,
  FaWhatsapp,
  FaInfoCircle,
} from "react-icons/fa";

interface UrbaniaFareSectionProps {
  city?: string;
}

const URBANIA_PRICE_PER_KM = 28;
const FARE_MULTIPLIER = 1.5;
const BASE_FARE = 500;

export default function UrbaniaFareSection({
  city = "Noida",
}: UrbaniaFareSectionProps) {
  const [distance, setDistance] = useState(40);
  const [seater, setSeater] = useState<12 | 17>(12);

  const estimatedFare = useMemo(() => {
    if (!distance || distance <= 0) {
      return null;
    }

    return Math.round(
      distance * FARE_MULTIPLIER * URBANIA_PRICE_PER_KM + BASE_FARE
    );
  }, [distance]);

  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I need a ${seater} Seater Urbania from ${city}. My approximate distance is ${distance} km. The estimated fare according to the ₹28/km Urbania fare formula is ₹${estimatedFare?.toLocaleString(
      "en-IN"
    )}. Please confirm the final fare and availability.`
  );

  return (
    <section
      id="urbania-fare"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Urbania Fare
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Urbania Traveller Fare in {city}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Urbania Traveller fare starts from ₹28/km. Enter your approximate
            distance below to calculate an indicative fare instantly.
          </p>
        </div>

        {/* FARE CALCULATOR */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* LEFT */}
              <div className="bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  Calculate Your Fare
                </p>

                <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  Know your Urbania price
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  Select your Urbania seating capacity and enter your approximate
                  travel distance. Your estimated fare will be calculated
                  automatically.
                </p>

                {/* PRICE */}
                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                    Urbania Starting Rate
                  </p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">
                      ₹28
                    </span>

                    <span className="text-xs font-bold text-white/50">
                      / KM
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] text-white/40">
                    12 & 17 Seater Urbania
                  </p>
                </div>

                {/* SEATER */}
                <div className="mt-7">
                  <p className="mb-3 text-xs font-bold text-white/70">
                    Choose Urbania
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[12, 17].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setSeater(value as 12 | 17)
                        }
                        className={`
                          rounded-xl
                          border
                          px-3
                          py-3
                          text-sm
                          font-extrabold
                          transition
                          ${
                            seater === value
                              ? "border-primary bg-primary text-white"
                              : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
                          }
                        `}
                      >
                        {value} Seater
                      </button>
                    ))}
                  </div>
                </div>

                {/* DISTANCE */}
                <div className="mt-5">
                  <label
                    htmlFor="urbania-distance"
                    className="mb-2 block text-xs font-bold text-white/70"
                  >
                    Enter Your Distance
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />

                    <input
                      id="urbania-distance"
                      type="number"
                      min={1}
                      inputMode="numeric"
                      value={distance}
                      onChange={(event) =>
                        setDistance(Number(event.target.value))
                      }
                      placeholder="Example: 40"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/10
                        pl-11
                        pr-14
                        text-sm
                        font-bold
                        text-white
                        outline-none
                        placeholder:text-white/30
                        focus:border-primary
                      "
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/50">
                      KM
                    </span>
                  </div>
                </div>

                {/* FORMULA */}
                <div className="mt-5 flex gap-2 text-[11px] leading-5 text-white/50">
                  <FaInfoCircle className="mt-0.5 shrink-0" />

                  <p>
                    Fare calculation: Distance × 1.5 × ₹28 + ₹500.
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                      Selected Vehicle
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                      {seater} Seater Urbania
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaUsers />
                  </div>
                </div>

                {/* ROUTE INFO */}
                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                      <FaMapMarkerAlt className="text-xs" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Starting From
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-800">
                        {city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                      <FaCalendarAlt className="text-xs" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Journey Distance
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-800">
                        {distance > 0
                          ? `${distance} KM`
                          : "Enter distance"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FARE */}
                <div className="mt-7 rounded-2xl border border-primary/10 bg-primary/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Your Estimated Urbania Price
                  </p>

                  {estimatedFare ? (
                    <>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                          ₹{estimatedFare.toLocaleString("en-IN")}
                        </span>

                        <span className="pb-1 text-xs font-semibold text-slate-400">
                          approx.
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
      Estimated fare for {distance} km Urbania journey.
    </p>

                      {/* FORMULA BREAKDOWN */}
                      {/* <div className="mt-4 rounded-xl bg-white p-3">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">
                            Distance
                          </span>

                          <span className="font-bold text-slate-700">
                            {distance} km
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">
                            Rate
                          </span>

                          <span className="font-bold text-slate-700">
                            ₹28/km
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">
                            Distance Factor
                          </span>

                          <span className="font-bold text-slate-700">
                            × 1.5
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                          <span className="text-slate-400">
                            Base Fare
                          </span>

                          <span className="font-bold text-slate-700">
                            ₹500
                          </span>
                        </div>
                      </div> */}
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-2xl font-black text-slate-900">
                        Enter Distance
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
                        Enter your journey distance above to calculate the
                        Urbania price.
                      </p>
                    </>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  <a
                    href={`https://wa.me/916280820037?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-primary
                      px-5
                      text-xs
                      font-extrabold
                      text-white
                      transition
                      hover:bg-primary/90
                    "
                  >
                    <FaWhatsapp />
                    Confirm Fare
                  </a>

                  <a
                    href="tel:+918448445504"
                    className="
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-5
                      text-xs
                      font-extrabold
                      text-slate-800
                      transition
                      hover:border-primary
                      hover:text-primary
                    "
                  >
                    Call Chiku Cabs
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FARE NOTES */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-extrabold text-slate-800">
              One-Way Trips
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              Enter your approximate distance to calculate the indicative
              Urbania fare.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-extrabold text-slate-800">
              Round Trips
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              Share your complete route and return details with Chiku Cabs
              for the final quotation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-extrabold text-slate-800">
              Custom Trips
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              Multi-day and group itineraries can be discussed with the
              Chiku Cabs team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
