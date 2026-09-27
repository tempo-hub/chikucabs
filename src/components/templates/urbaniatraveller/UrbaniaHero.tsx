"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

interface UrbaniaHeroProps {
  city?: string;
  onBookNow?: () => void;
}

const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";

const formatPhone = PHONE_NUMBER.replace("+91", "");

const getWhatsAppUrl = (city?: string) => {
  const message = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller${
      city ? ` in ${city}` : ""
    }. Please share the best fare for 12 or 17 seater Urbania.`
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

const URBANIA_PRICE_PER_KM = 28;

export default function UrbaniaHero({
  city = "Noida",
}: UrbaniaHeroProps) {


  return (
    <section className="relative isolate overflow-hidden px-4 py-12 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-12">
      {/* Background */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/urbania/urbania.webp')",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 -z-20 bg-slate-950/50"
        aria-hidden="true"
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/40 via-slate-950/30 to-slate-950/30"
        aria-hidden="true"
      />

      <div
        className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4  sm:px-6  lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* LEFT CONTENT */}
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold backdrop-blur-md sm:text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px]">
                <FaCheckCircle />
              </span>

              Premium Urbania Traveller
            </div>

            {/* H1 */}
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
  Urbania Traveller in {city}
  <span className="mt-2 block text-primary">
    Fare From ₹28/KM
  </span>
</h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:text-xl">
              Book a premium Urbania Traveller with Chiku Cabs for family
              trips, corporate travel, weddings, group tours and comfortable
              outstation journeys.
            </p>

            {/* Vehicle pills */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                <FaUsers className="text-primary" />
                12 Seater Urbania
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                <FaUsers className="text-primary" />
                17 Seater Urbania
              </div>
            </div>

            {/* Trust */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-white">4.9/5</span>
                <span>Customer Rating</span>
              </div>

              <div className="hidden h-4 w-px bg-white/20 sm:block" />

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Verified Drivers
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                  href={getWhatsAppUrl(city)}
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
                  px-6
                  text-sm
                  font-extrabold
                  text-white
                  shadow-lg
                  shadow-primary/20
                  transition
                  hover:-translate-y-0.5
                  hover:bg-primary/90
                  active:translate-y-0
                  sm:min-h-14
                  sm:px-8
                "
              >
                Get Best Urbania Fare
                <FaArrowRight className="text-xs" />
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-6
                  text-sm
                  font-bold
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-white/15
                  sm:min-h-14
                "
              >
                <FaPhoneAlt className="text-primary" />
                Call {formatPhone}
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl(city)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-3
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-white/90
                transition
                hover:text-white
              "
            >
              <FaWhatsapp className="text-lg text-green-400" />
              Get Urbania Quote on WhatsApp
            </a>
          </div>

          {/* RIGHT BOOKING CARD */}
          <div className="lg:justify-self-end">
            <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/95 p-5 text-slate-900 shadow-2xl backdrop-blur-xl sm:p-6">
              {/* Card heading */}
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  Chiku Cabs
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  Book Urbania Traveller
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  12 & 17 seater options available
                </p>
              </div>

              {/* Pickup */}
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="urbania-pickup"
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Pickup Location
                  </label>

                  <input
                    id="urbania-pickup"
                    type="text"
                    placeholder={`Pickup in ${city}`}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-primary
                      focus:bg-white
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>

                {/* Destination */}
                <div>
                  <label
                    htmlFor="urbania-drop"
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Destination
                  </label>

                  <input
                    id="urbania-drop"
                    type="text"
                    placeholder="Where do you want to go?"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-primary
                      focus:bg-white
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>

                {/* Vehicle */}
                <div>
                  <label
                    htmlFor="urbania-seater"
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Urbania Traveller
                  </label>

                  <select
                    id="urbania-seater"
                    defaultValue="12"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      font-medium
                      outline-none
                      transition
                      focus:border-primary
                      focus:bg-white
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  >
                    <option value="12">12 Seater Urbania</option>
                    <option value="17">17 Seater Urbania</option>
                  </select>
                </div>
                <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
  <div className="flex items-center justify-between gap-4">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Urbania Starting Fare
      </p>

      <p className="mt-1 text-lg font-black text-slate-900">
        ₹28 <span className="text-sm text-slate-700">/ KM</span>
      </p>
    </div>

    <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm">
      <p className="text-[9px] font-bold uppercase text-slate-700">
        Available
      </p>

      <p className="text-xs font-black text-slate-800">
        12 & 17 Seater
      </p>
    </div>
  </div>
</div>

                {/* CTA */}
                <a
                  href={getWhatsAppUrl(city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-primary
                    px-5
                    text-sm
                    font-extrabold
                    text-white
                    transition
                    hover:bg-primary/90
                  "
                >
                  <FaWhatsapp />
                  Get Best Fare
                </a>
              </div>

              {/* Bottom trust */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] font-semibold text-slate-500">
                <span>✓ Transparent Pricing</span>
                <span>✓ Verified Drivers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
          border-t
          border-slate-200
          bg-white/95
          p-2
          shadow-[0_-8px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-md
          lg:hidden
        "
      >
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              text-xs
              font-extrabold
              text-slate-900
            "
          >
            <FaPhoneAlt className="text-primary" />
            Call Now
          </a>

          <a
            href={getWhatsAppUrl(city)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-green-600
              text-xs
              font-extrabold
              text-white
            "
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}