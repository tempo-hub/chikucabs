"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

interface UrbaniaHowItWorksProps {
  city?: string;
}

const STEPS = [
  {
    number: "01",
    icon: FaMapMarkerAlt,
    title: "Share Your Trip Details",
    description:
      "Tell Chiku Cabs your pickup location, destination, travel date and approximate group size.",
  },
  {
    number: "02",
    icon: FaUsers,
    title: "Choose Your Urbania",
    description:
      "Select the 12 Seater or 17 Seater Urbania according to your passenger and luggage requirements.",
  },
  {
    number: "03",
    icon: FaCheckCircle,
    title: "Confirm Your Booking",
    description:
      "Review the fare and trip details with our team, then confirm your Urbania Traveller booking.",
  },
];

export default function UrbaniaHowItWorks({
  city = "Noida",
}: UrbaniaHowItWorksProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${city}. Please help me with the booking.`
  );

  return (
    <section
      id="urbania-booking"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Easy Booking
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How to Book an Urbania Traveller
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Booking your 12 or 17 Seater Urbania with Chiku Cabs is simple.
            Share your trip details and our team will help you with the
            suitable vehicle and fare.
          </p>
        </div>

        {/* STEPS */}
        <div className="relative mt-10">
          {/* Desktop connector */}
          <div className="absolute left-[16.66%] right-[16.66%] top-14 hidden h-px bg-slate-200 lg:block" />

          <div className="relative grid gap-5 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="
                    relative
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    sm:p-6
                  "
                >
                  {/* Number + Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                      <Icon className="text-base" />
                    </div>

                    <span className="text-4xl font-black text-slate-100">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mt-5 text-base font-black text-slate-900 sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIRECT BOOKING PANEL */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950">
          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  <FaCheckCircle />
                  Chiku Cabs Urbania Booking
                </div>

                <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Ready to book your Urbania?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
                  Send us your pickup location, destination, travel date and
                  passenger count. We'll help you with the next step.
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2.5 sm:flex">
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
                  WhatsApp
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
                    border-white/15
                    bg-white/10
                    px-5
                    text-xs
                    font-extrabold
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  <FaPhoneAlt />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SMALL TRUST NOTE */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-500">
          <FaCheckCircle className="text-primary" />
          <span>
            Share your requirements first — we'll help you select the suitable
            Urbania.
          </span>
        </div>
      </div>
    </section>
  );
}