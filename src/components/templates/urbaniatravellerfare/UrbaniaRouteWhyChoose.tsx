import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaHeadset,
  FaRupeeSign,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

const BENEFITS = [
  {
    icon: FaUsers,
    title: "12 & 17 Seater Options",
    description:
      "Choose the Urbania capacity according to your group size and luggage requirements.",
  },
  {
    icon: FaRupeeSign,
    title: "Transparent Fare",
    description:
      "Get a route-specific fare based on your journey details before confirming your booking.",
  },
  {
    icon: FaShieldAlt,
    title: "Comfortable Group Travel",
    description:
      "Keep your group together in one spacious vehicle instead of arranging multiple cars.",
  },
  {
    icon: FaCheckCircle,
    title: "Professional Chauffeur",
    description:
      "A chauffeur-driven Urbania makes your outstation journey more convenient.",
  },
  {
    icon: FaHeadset,
    title: "Booking Assistance",
    description:
      "Connect with Chiku Cabs to discuss pickup, drop, passengers and trip requirements.",
  },
  {
    icon: FaClock,
    title: "Flexible Trip Planning",
    description:
      "Suitable for one-way, round-trip and longer group travel requirements.",
  },
];

export default function UrbaniaRouteWhyChoose({
  fromCity,
  toCity,
}: Props) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-12 bg-white/90 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Why Chiku Cabs
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Book an Urbania from {fromCity} to {toCity}?
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Chiku Cabs makes it easier to arrange comfortable group
            transportation for your {fromCity} to {toCity} journey.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-sm" />
                  </div>

                  <span className="text-[10px] font-black text-slate-200">
                    0{BENEFITS.indexOf(benefit) + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-black text-slate-900 sm:text-lg">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Conversion Strip */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-primary p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-white/80">
                <FaCheckCircle className="text-sm" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em]">
                  Ready for your journey?
                </span>
              </div>

              <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Travel together from {fromCity} to {toCity}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/75 sm:text-sm">
                Share your travel date and passenger count with Chiku Cabs
                to check the suitable Urbania and current availability.
              </p>
            </div>

            <a
              href="#urbania-booking"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-xs font-extrabold text-primary transition hover:bg-slate-50"
            >
              Book Urbania
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}