import React from "react";
import {
  FaSnowflake,
  FaChair,
  FaSuitcase,
  FaChargingStation,
  FaMusic,
  FaShieldAlt,
  FaUserTie,
  FaRoad,
} from "react-icons/fa";

interface UrbaniaFeaturesProps {
  city?: string;
}

const FEATURES = [
  {
    icon: FaChair,
    title: "Comfortable Seating",
    description:
      "Spacious seating designed to make long-distance group journeys more comfortable.",
  },
  {
    icon: FaSnowflake,
    title: "Air Conditioned",
    description:
      "Enjoy a comfortable cabin throughout your local and outstation journey.",
  },
  {
    icon: FaSuitcase,
    title: "Luggage Space",
    description:
      "Practical luggage space for family trips, tours and group travel.",
  },
  {
    icon: FaChargingStation,
    title: "Charging Convenience",
    description:
      "Stay connected during your journey with convenient charging support.",
  },
  {
    icon: FaMusic,
    title: "Entertainment",
    description:
      "Make group journeys more enjoyable with in-cabin entertainment.",
  },
  {
    icon: FaShieldAlt,
    title: "Travel Safety",
    description:
      "Travel with an experienced driver for a comfortable and dependable journey.",
  },
  {
    icon: FaUserTie,
    title: "Professional Driver",
    description:
      "Urbania bookings are available with an experienced driver from Chiku Cabs.",
  },
  {
    icon: FaRoad,
    title: "Local & Outstation",
    description:
      "Suitable for city travel, one-way journeys and outstation trips.",
  },
];

export default function UrbaniaFeatures({
  city = "Noida",
}: UrbaniaFeaturesProps) {
  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Urbania Comfort
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Comfort & Features for Every Journey
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Travel comfortably with a premium Urbania Traveller from Chiku
            Cabs. Choose a 12 or 17 seater according to your group size and
            travel requirements in {city}.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-lg
                  sm:p-5
                "
              >
                {/* ICON */}
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                    transition
                    group-hover:bg-primary
                    group-hover:text-white
                    sm:h-11
                    sm:w-11
                  "
                >
                  <Icon className="text-sm sm:text-base" />
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-sm font-extrabold leading-5 text-slate-900 sm:text-base">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 text-[11px] leading-5 text-slate-500 sm:text-xs sm:leading-6">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM HIGHLIGHT */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950 p-5 text-white sm:p-7 lg:mt-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                Built for Group Travel
              </p>

              <h3 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
                Choose the Urbania that fits your group
              </h3>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
                Travelling with a smaller group? Choose the 12 Seater Urbania.
                Need additional passenger capacity? The 17 Seater Urbania is
                designed for larger groups.
              </p>
            </div>

            <a
              href="#urbania-vehicles"
              className="
                inline-flex
                min-h-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary
                px-5
                text-xs
                font-extrabold
                text-white
                transition
                hover:bg-primary/90
                sm:px-6
              "
            >
              Compare Urbania
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}