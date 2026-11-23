import React from "react";
import {
  FaMapMarkerAlt,
  FaRoad,
  FaUsers,
  FaSuitcaseRolling,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

const HIGHLIGHTS = [
  {
    icon: FaRoad,
    title: "Comfortable Long-Distance Travel",
    description:
      "Enjoy a spacious Urbania journey designed for comfortable group travel between cities.",
  },
  {
    icon: FaUsers,
    title: "Ideal for Groups",
    description:
      "Choose between 12 and 17 seater Urbania options according to your passenger count.",
  },
  {
    icon: FaSuitcaseRolling,
    title: "Space for Luggage",
    description:
      "Travel together with your group luggage without needing multiple smaller cars.",
  },
  {
    icon: FaShieldAlt,
    title: "Professional Chauffeur",
    description:
      "Travel with a professional driver focused on a smooth and convenient journey.",
  },
  {
    icon: FaClock,
    title: "Flexible Travel Plans",
    description:
      "Suitable for family trips, group tours, pilgrimage journeys and other outstation plans.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Door-to-Door Convenience",
    description:
      "Discuss your preferred pickup and drop locations with Chiku Cabs when booking.",
  },
];

export default function UrbaniaRouteHighlights({
  fromCity,
  toCity,
}: Props) {
  return (
    <section className="bg-white/90 border-b border-slate-100 px-4 py-12 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Route Benefits
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Urbania for {fromCity} to {toCity}?
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A Force Urbania is a practical choice when your group wants to
            travel together instead of booking multiple cars for the
            {` ${fromCity} to ${toCity}`} journey.
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg sm:p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="text-sm" />
                </div>

                <h3 className="mt-5 text-base font-black text-slate-900 sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Route CTA strip */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-slate-900 p-5 text-white sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
                Group Travel
              </p>

              <h3 className="mt-1 text-lg font-black sm:text-xl">
                Travelling from {fromCity} to {toCity}?
              </h3>

              <p className="mt-1 text-xs leading-5 text-white/50 sm:text-sm">
                Share your passenger count and trip requirements to check
                the suitable Urbania option.
              </p>
            </div>

            <a
              href={`https://wa.me/916280820037?text=${encodeURIComponent(
                `Hi Chiku Cabs, I need an Urbania Traveller from ${fromCity} to ${toCity}. Please help me choose between the 12 and 17 seater.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-primary px-5 text-xs font-extrabold text-white transition hover:bg-primary/90"
            >
              Check Urbania Options
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}