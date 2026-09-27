"use client"
import React from "react";
import {
  FaCar,
  FaUserTie,
  FaRoute,
  FaHeadset,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";

interface UrbaniaWhyChooseChikuProps {
  city?: string;
}

const BENEFITS = [
  {
    icon: FaCar,
    title: "12 & 17 Seater Options",
    description:
      "Choose the Urbania capacity according to your group size and travel requirements.",
  },
  {
    icon: FaUserTie,
    title: "Driver-Assisted Travel",
    description:
      "Urbania bookings can be arranged with a driver for your planned journey.",
  },
  {
    icon: FaRoute,
    title: "Local & Outstation",
    description:
      "Enquire about Urbania for local travel, one-way trips, round trips and outstation journeys.",
  },
  {
    icon: FaCalendarCheck,
    title: "Trip-Based Booking",
    description:
      "Share your travel date, route and passenger count so your enquiry can be handled according to your trip.",
  },
  {
    icon: FaHeadset,
    title: "Booking Assistance",
    description:
      "Get help with your Urbania enquiry and share your journey details directly with Chiku Cabs.",
  },
  {
    icon: FaCheckCircle,
    title: "Simple Enquiry Process",
    description:
      "Submit your trip details or connect through WhatsApp to enquire about availability and fare.",
  },
];

export default function UrbaniaWhyChooseChiku({
  city = "Noida",
}: UrbaniaWhyChooseChikuProps) {
  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <FaCheckCircle className="text-[10px]" />
            Why Chiku Cabs
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Urbania Booking Made Simple
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Planning an Urbania journey from {city}? Chiku Cabs provides a
            straightforward enquiry process for group travel and helps you
            select the suitable vehicle for your trip.
          </p>
        </div>

        {/* BENEFITS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition
                  duration-200
                  hover:border-primary/20
                  hover:bg-white
                  hover:shadow-sm
                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-primary
                    shadow-sm
                    transition
                    group-hover:bg-primary
                    group-hover:text-white
                  "
                >
                  <Icon className="text-sm" />
                </div>

                <h3 className="mt-5 text-sm font-black text-slate-900 sm:text-base">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950 p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                Plan your group journey
              </p>

              <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Tell us where you want to go from {city}
              </h3>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/55 sm:text-sm">
                Share your pickup, destination, travel date and passenger
                count to start your Urbania booking enquiry.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("urbania-enquiry")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
              }
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
              "
            >
              Start Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}