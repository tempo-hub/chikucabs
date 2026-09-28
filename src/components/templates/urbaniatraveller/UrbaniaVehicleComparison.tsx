"use client"
import React from "react";
import {
  FaUsers,
  FaSuitcase,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

interface UrbaniaVehicleComparisonProps {
  city?: string;
}

const VEHICLES = [
  {
    name: "12 Seater Urbania",
    capacity: "Up to 12 passengers",
    idealFor: "Small & medium groups",
    luggage: "Suitable group luggage",
    description:
      "A practical option for family trips, small group tours, corporate travel and events.",
    highlight: "For smaller groups",
  },
  {
    name: "17 Seater Urbania",
    capacity: "Up to 17 passengers",
    idealFor: "Large groups",
    luggage: "More passenger capacity",
    description:
      "A spacious option for larger family groups, corporate trips, events and outstation journeys.",
    highlight: "For larger groups",
  },
];

export default function UrbaniaVehicleComparison({
  city = "Noida",
}: UrbaniaVehicleComparisonProps) {
  const scrollToBooking = () => {
    document
      .getElementById("urbania-booking")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  return (
    <section
      id="urbania-vehicles"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <FaUsers className="text-[10px]" />
            Choose Your Urbania
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            12 Seater vs 17 Seater Urbania
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Choose the Urbania Traveller according to your group size, luggage
            requirements and journey from {city}.
          </p>
        </div>

        {/* VEHICLE CARDS */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {VEHICLES.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
              "
            >
              {/* Card Header */}
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                      {vehicle.highlight}
                    </span>

                    <h3 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">
                      {vehicle.name}
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <FaUsers />
                  </div>
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-500 sm:text-sm">
                  {vehicle.description}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 divide-x divide-slate-100">
                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Capacity
                  </p>

                  <p className="mt-1 text-xs font-extrabold text-slate-800 sm:text-sm">
                    {vehicle.capacity}
                  </p>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Ideal For
                  </p>

                  <p className="mt-1 text-xs font-extrabold text-slate-800 sm:text-sm">
                    {vehicle.idealFor}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-slate-100 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FaSuitcase className="text-xs" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Luggage
                    </p>

                    <p className="text-xs font-bold text-slate-700">
                      {vehicle.luggage}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    "Driver included",
                    "Local & outstation",
                    "Group travel",
                    "Booking support",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-600"
                    >
                      <FaCheckCircle className="shrink-0 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="
                    mt-6
                    inline-flex
                    min-h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-slate-900
                    px-5
                    text-xs
                    font-extrabold
                    text-white
                    transition
                    hover:bg-primary
                  "
                >
                  Enquire for {index === 0 ? "12" : "17"} Seater
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NOTE */}
        <div className="mt-6 text-center">
          <p className="text-[11px] leading-5 text-slate-400">
            Vehicle availability may vary by travel date, route and booking
            requirements.
          </p>
        </div>
      </div>
    </section>
  );
}