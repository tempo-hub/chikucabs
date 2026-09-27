import React from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaUsers,
  FaRoute,
  FaSuitcaseRolling,
} from "react-icons/fa";

interface UrbaniaIntroProps {
  city?: string;
}

export default function UrbaniaIntro({
  city = "Noida",
}: UrbaniaIntroProps) {
  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT — CONTENT */}
          <div>
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Premium Group Travel
            </div>

            {/* Heading */}
            <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Urbania Traveller on Rent in{" "}
              <span className="text-primary">{city}</span>
            </h2>

            {/* Description */}
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                Looking for a comfortable and premium vehicle for your group
                journey? Chiku Cabs offers{" "}
                <strong className="font-bold text-slate-900">
                  Urbania Traveller rental
                </strong>{" "}
                for family trips, corporate travel, weddings, group tours and
                outstation journeys.
              </p>

              <p>
                Choose between our{" "}
                <strong className="font-bold text-slate-900">
                  12 Seater Urbania
                </strong>{" "}
                and{" "}
                <strong className="font-bold text-slate-900">
                  17 Seater Urbania
                </strong>{" "}
                depending on your group size and luggage requirements.
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Comfortable premium seating",
                "Air-conditioned cabin",
                "Spacious luggage area",
                "Experienced drivers",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                >
                  <FaCheckCircle className="shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* <Link
                href="/urbania-traveller-on-rent"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
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
                Explore Urbania
              </Link> */}

              <a
                href="#urbania-vehicles"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-primary
                  px-6
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:border-primary
                  hover:text-primary
                "
              >
                View 12 & 17 Seater
              </a>
            </div>
          </div>

          {/* RIGHT — QUICK INFO CARD */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
              {/* Card header */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  Choose Your Urbania
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Built for comfortable group travel
                </h3>
              </div>

              <div className="grid gap-3">
                {/* 12 Seater */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaUsers className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      12 Seater Urbania
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Suitable for families, small groups and corporate travel.
                    </p>
                  </div>
                </div>

                {/* 17 Seater */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaUsers className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      17 Seater Urbania
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Ideal for larger families, group tours and events.
                    </p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaRoute className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Local & Outstation
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Available for city travel, one-way and round trips.
                    </p>
                  </div>
                </div>

                {/* Luggage */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaSuitcaseRolling className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Group-Friendly Space
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Designed for comfortable passengers and travel luggage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="pointer-events-none absolute -bottom-3 -right-3 -z-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}