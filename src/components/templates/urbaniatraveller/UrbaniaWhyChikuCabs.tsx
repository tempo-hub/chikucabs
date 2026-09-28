import React from "react";
import {
  FaUserTie,
  FaRupeeSign,
  FaHeadset,
  FaMapMarkedAlt,
  FaSprayCan,
  FaCalendarCheck,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

interface UrbaniaWhyChikuCabsProps {
  city?: string;
}

const REASONS = [
  {
    icon: FaUserTie,
    title: "Experienced Drivers",
    description:
      "Travel with an experienced driver familiar with local and outstation journeys.",
  },
  {
    icon: FaRupeeSign,
    title: "Clear Fare",
    description:
      "Get your Urbania fare before confirming your booking, helping you plan your travel budget.",
  },
  {
    icon: FaHeadset,
    title: "Booking Support",
    description:
      "Get assistance from the Chiku Cabs team when planning your Urbania journey.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Flexible Routes",
    description:
      "Book Urbania for local travel, one-way trips, round trips and group journeys.",
  },
  {
    icon: FaSprayCan,
    title: "Clean Vehicle",
    description:
      "Urbania vehicles are prepared for comfortable passenger travel.",
  },
  {
    icon: FaCalendarCheck,
    title: "Advance Booking",
    description:
      "Plan your group journey in advance and request Urbania availability for your travel date.",
  },
];

export default function UrbaniaWhyChikuCabs({
  city = "Noida",
}: UrbaniaWhyChikuCabsProps) {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Why Chiku Cabs
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Book Your Urbania with Chiku Cabs
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:justify-self-end">
            From choosing the right Urbania size to arranging your pickup,
            Chiku Cabs helps make group travel simple. Request a fare for a
            12 or 17 seater Urbania in {city} and plan your journey with the
            details that matter to you.
          </p>
        </div>

        {/* REASONS */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  sm:p-6
                "
              >
                {/* Number */}
                <span className="absolute right-4 top-4 text-4xl font-black text-slate-100">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="
                    relative
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                    transition
                    group-hover:bg-primary
                    group-hover:text-white
                  "
                >
                  <Icon className="text-base" />
                </div>

                {/* Content */}
                <h3 className="relative mt-5 text-base font-extrabold text-slate-900">
                  {reason.title}
                </h3>

                <p className="relative mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {reason.description}
                </p>

                {/* Check */}
                <div className="relative mt-4 flex items-center gap-1.5 text-[11px] font-bold text-primary">
                  <FaCheckCircle />
                  <span>Available with Chiku Cabs</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA PANEL */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950">
          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            {/* Decorative */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  <FaCheckCircle />
                  Group Travel Made Simple
                </div>

                <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Need a 12 or 17 Seater Urbania?
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  Share your pickup, destination and travel date with Chiku
                  Cabs. We can help you check Urbania availability and get a
                  suitable fare.
                </p>
              </div>

              <a
                href="https://wa.me/916280820037"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-12
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-6
                  text-sm
                  font-extrabold
                  text-white
                  transition
                  hover:bg-primary/90
                "
              >
                Get Urbania Quote
                <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}