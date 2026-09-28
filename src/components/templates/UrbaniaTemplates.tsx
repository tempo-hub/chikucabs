"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChevronDown,
  FaMapMarkerAlt,
  FaRoute,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";

import { cities, cityToSlug } from "@/data/cities";
import { URBANIA_ROUTES } from "@/data/urbaniaRouteData";

interface UrbaniaTemplateProps {
  city?: string;
}

const URBANIA_RATE = 28;

// const cityToSlug = (value: string) =>
//   value
//     .toLowerCase()
//     .trim()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");

export default function UrbaniaTemplates({
  city,
}: UrbaniaTemplateProps) {
  const [distance, setDistance] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const normalizedCity = city?.trim() ?? "";
const [showAllRoutes, setShowAllRoutes] = useState(false);
const [showAllCities, setShowAllCities] = useState(false);

const cityPages = cities;

const visibleCities = showAllCities
  ? cityPages
  : cityPages.slice(0, 40);


const hasMoreCities = cityPages.length > 40;

const validRoutes = URBANIA_ROUTES.filter(
  (route) =>
    route.fromCity.trim().toLowerCase() !==
    route.toCity.trim().toLowerCase()
);

const visibleRoutes = showAllRoutes
  ? validRoutes
  : validRoutes.slice(0, 21);

const hasMoreRoutes = validRoutes.length > 21;
  /*
   * Routes starting from current city.
   *
   * Example:
   * /urbania-fare-in-ayodhya
   *
   * Ayodhya → Haridwar
   * Ayodhya → Varanasi
   * Ayodhya → Mathura
   */
  const cityRoutes = useMemo(() => {
    return URBANIA_ROUTES.filter(
      (route) =>
        route.fromCity.trim().toLowerCase() ===
          normalizedCity.toLowerCase() &&
        route.fromCity.trim().toLowerCase() !==
          route.toCity.trim().toLowerCase()
    );
  }, [normalizedCity]);

  /*
   * Other Urbania city pages
   */
  // const cityPages = useMemo(() => {
  //   return cities.filter(
  //     (item) =>
  //       item.name.trim().toLowerCase() !==
  //       normalizedCity.toLowerCase()
  //   );
  // }, [normalizedCity]);

  /*
   * Fare formula:
   *
   * Distance × 1.5 × ₹28 + ₹500
   */
  const estimatedFare = useMemo(() => {
    const km = Number(distance);

    if (!km || km <= 0) return 0;

    return Math.round(km * 1.5 * URBANIA_RATE + 500);
  }, [distance]);

  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${normalizedCity}.

Please share the best fare and availability.

Distance: ${
      distance ? `${distance} KM` : "Not specified"
    }

Estimated fare: ${
      estimatedFare
        ? `₹${estimatedFare.toLocaleString("en-IN")}`
        : "Please calculate"
    }`
  );

  const whatsappUrl = `https://wa.me/916280820037?text=${whatsappMessage}`;

  const handleBooking = () => {
    setSubmitted(true);

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-white/90">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-24">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('/urbania/urbania.webp')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* HERO CONTENT */}

          <div>

            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-extrabold tracking-wide text-white sm:text-xs">
  <span className="h-1.5 w-1.5 rounded-full bg-primary" />

  <span className="uppercase tracking-[0.14em] text-primary">
    Urbania
  </span>

  <span className="h-3 w-px bg-white/20" />

  <span className="text-yellow-400">
    ★ 4.9/5
  </span>

  <span className="h-3 w-px bg-white/20" />

  <span className="text-white/70">
    1250+ Reviews
  </span>
</div>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
  Book Urbania Traveller
  <span className="mt-2 block text-primary">
    12 & 17 Seater for Group Travel
  </span>
</h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg">
              Book a premium 12 or 17 seater Force
              Urbania from{" "}
              <strong className="text-white">
                {normalizedCity}
              </strong>{" "}
              for local and outstation travel with
              Chiku Cabs. Comfortable group travel,
              professional chauffeurs and transparent
              route-based fares.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold">
                <FaCheckCircle className="text-primary" />
                12 Seater
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold">
                <FaCheckCircle className="text-primary" />
                17 Seater
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold">
                <FaCheckCircle className="text-primary" />
                ₹28/KM
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold">
                <FaCheckCircle className="text-primary" />
                Chauffeur Included
              </div>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="#urbania-booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-extrabold text-white transition hover:bg-primary/90"
              >
                Book Urbania
                <FaArrowRight className="text-xs" />
              </a>

              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  `Hi Chiku Cabs, I want to book an Urbania Traveller from ${normalizedCity}. Please share the best fare and availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                <FaWhatsapp />
                Get Fare on WhatsApp
              </a>

            </div>

          </div>

          {/* HERO BOOKING CARD */}

          <div
            id="urbania-booking"
            className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-7"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <FaUsers />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                  Urbania Booking
                </p>

                <h2 className="text-lg font-black">
                  Get {normalizedCity} Urbania Fare
                </h2>
              </div>

            </div>

            <div className="mt-6 space-y-4">

              <div>
                <label className="mb-2 block text-xs font-bold text-white/70">
                  Pickup City
                </label>

                <div className="flex min-h-12 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold">
                  <FaMapMarkerAlt className="mr-3 text-primary" />
                  {normalizedCity}
                </div>
              </div>

              <div>
                <label
                  htmlFor="urbania-distance"
                  className="mb-2 block text-xs font-bold text-white/70"
                >
                  Approx. Distance
                </label>

                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <input
                    id="urbania-distance"
                    type="number"
                    min="1"
                    value={distance}
                    onChange={(e) =>
                      setDistance(e.target.value)
                    }
                    placeholder="Enter distance"
                    className="min-h-12 w-full bg-transparent px-4 text-sm font-bold text-white outline-none placeholder:text-white/30"
                  />

                  <span className="flex items-center border-l border-white/10 px-4 text-xs font-bold text-white/45">
                    KM
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-bold text-white/60">
                    Estimated Fare
                  </span>

                  <span className="text-xs font-bold text-primary">
                    ₹28/KM
                  </span>

                </div>

                <p className="mt-2 text-2xl font-black text-white">
                  {estimatedFare
                    ? `₹${estimatedFare.toLocaleString(
                        "en-IN"
                      )}`
                    : "Enter distance"}
                </p>

                <p className="mt-1 text-[10px] leading-5 text-white/40">
                  Final fare may vary according to trip
                  requirements and route.
                </p>

              </div>

              <button
                type="button"
                onClick={handleBooking}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary/90"
              >
                <FaWhatsapp />
                Get Booking Details
              </button>

              {submitted && (
                <div className="flex min-h-12 items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-xs font-semibold text-green-300">
                  <FaCheckCircle className="shrink-0" />
                  Opening WhatsApp with your booking details.
                </div>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          TRUST BAR
      ====================================================== */}

      <section className="border-b border-slate-100 bg-white px-4 py-5 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-4">

          {[
            ["12 Seater", "Premium Urbania"],
            ["17 Seater", "Large Group Travel"],
            ["₹28/KM", "Starting Rate"],
            ["Chauffeur", "Professional Driver"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-xl bg-slate-50 p-4 text-center"
            >
              <p className="text-sm font-black text-slate-900">
                {title}
              </p>

              <p className="mt-1 text-[10px] font-semibold text-slate-500">
                {text}
              </p>
            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          VEHICLES
      ====================================================== */}

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FaUsers />
              Urbania Options
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Choose the Right Urbania for Your Group
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Choose between 12 and 17 seater Urbania
              options depending on your passenger count,
              luggage and journey requirements.
            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            {[
              {
                seats: "12 Seater",
                title: "Force Urbania 12 Seater",
                text: "A comfortable option for family trips, corporate travel and medium-sized groups.",
              },
              {
                seats: "17 Seater",
                title: "Force Urbania 17 Seater",
                text: "A spacious option for larger groups travelling together on local and outstation routes.",
              },
            ].map((vehicle) => (

              <div
                key={vehicle.seats}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                      {vehicle.seats}
                    </span>

                    <h3 className="mt-4 text-xl font-black text-slate-900">
                      {vehicle.title}
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-primary">
                    <FaUsers />
                  </div>

                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {vehicle.text}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      Rate
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      ₹28/KM
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      Driver
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      Included
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FARE CALCULATOR
      ====================================================== */}

      <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FaRoute />
              Urbania Fare
            </div>

            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              Estimate Your Urbania Fare from{" "}
              {normalizedCity}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Enter your approximate travel distance to
              get an estimated Urbania fare.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <label
              htmlFor="fare-distance"
              className="text-sm font-bold text-slate-800"
            >
              Enter Distance
            </label>

            <div className="mt-3 flex overflow-hidden rounded-xl border border-slate-200">

              <input
                id="fare-distance"
                type="number"
                min="1"
                value={distance}
                onChange={(e) =>
                  setDistance(e.target.value)
                }
                placeholder="Example: 250"
                className="min-h-12 w-full px-4 text-sm font-bold text-slate-900 outline-none"
              />

              <span className="flex items-center border-l border-slate-200 bg-slate-50 px-5 text-xs font-bold text-slate-500">
                KM
              </span>

            </div>

            <div className="mt-5 rounded-2xl bg-slate-950 p-6 text-white">

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/50">
                  Estimated Urbania Fare
                </span>

                <span className="text-xs font-bold text-primary">
                  ₹28/KM
                </span>
              </div>

              <p className="mt-3 text-3xl font-black">
                {estimatedFare
                  ? `₹${estimatedFare.toLocaleString(
                      "en-IN"
                    )}`
                  : "₹0"}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/45">
                Enter a distance to calculate your
                approximate fare.
              </p>

            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary/90"
            >
              <FaWhatsapp />
              Confirm Fare on WhatsApp
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR ROUTES
      ====================================================== */}

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
  <div className="mx-auto max-w-7xl">

    {/* Header */}
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
        <FaRoute />
        Popular Routes
      </div>

      <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
        Popular Urbania Traveller Routes
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
        Explore popular Urbania Traveller routes with distance,
        journey time and route-specific fare information. Book a
        comfortable 12 or 17 seater Urbania for your group journey.
      </p>
    </div>

    {/* Routes */}
    {visibleRoutes.length > 0 ? (
  <>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleRoutes.map((route) => {
        const routeUrl = `/urbania/${cityToSlug(
          route.fromCity
        )}-to-${cityToSlug(
          route.toCity
        )}-urbania-fare`;

        return (
          <Link
            key={`${route.fromCity}-${route.toCity}`}
            href={routeUrl}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6"
          >
            {/* Icon */}
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaMapMarkerAlt />
              </div>

              <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            {/* Route */}
            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Urbania Traveller
              </p>

              <h3 className="mt-1 text-lg font-black text-slate-900">
                {route.fromCity}

                <span className="mx-2 font-medium text-slate-400">
                  to
                </span>

                {route.toCity}
              </h3>
            </div>

            {/* Distance / Duration */}
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Distance
                </p>

                <p className="mt-1 text-sm font-black text-slate-900">
                  {route.distance} KM
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Journey
                </p>

                <p className="mt-1 text-sm font-black text-slate-900">
                  {route.duration}
                </p>
              </div>
            </div>

            {/* Rate */}
            <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Urbania Rate
                </span>

                <span className="text-xs font-black text-slate-900">
                  ₹28/KM
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-extrabold text-primary">
                View Route Fare
              </span>

              <FaArrowRight className="text-[10px] text-primary transition group-hover:translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>

    {/* View More */}
    {hasMoreRoutes && !showAllRoutes && (
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAllRoutes(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md"
        >
          View More Routes
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    )}

    {/* Optional: Show Less */}
    {hasMoreRoutes && showAllRoutes && (
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAllRoutes(false)}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-extrabold text-slate-800 transition hover:border-primary hover:text-primary"
        >
          Show Less
        </button>
      </div>
    )}
  </>
) : (
  <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
    <FaRoute className="mx-auto text-2xl text-slate-300" />

    <p className="mt-3 text-sm font-semibold text-slate-500">
      Popular Urbania routes will be added soon.
    </p>
  </div>
)}

  </div>
</section>


      {/* =====================================================
          OTHER CITY FARE PAGES
      ====================================================== */}

     <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
  <div className="mx-auto max-w-7xl">

    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
        <FaMapMarkerAlt />
        Urbania Fare Locations
      </div>

      <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
        Urbania Fare in Other Cities
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
        Explore Urbania Traveller booking and fare information
        for other popular cities across India.
      </p>
    </div>

    {/* CITY GRID */}
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {visibleCities.map((item) => {
        const cityUrl = `/urbania-fare-in-${cityToSlug(
          item.name
        )}`;

        return (
          <Link
            key={item.name}
            href={cityUrl}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            {/* Icon */}
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaMapMarkerAlt />
              </div>

              <FaArrowRight className="text-xs text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            {/* City */}
            <h3 className="mt-5 text-base font-black text-slate-900">
              Urbania Fare in {item.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
              {item.description}
            </p>

            {/* CTA */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="text-xs font-bold text-primary">
                View City Fare
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    {/* VIEW MORE */}
    {hasMoreCities && (
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAllCities((prev) => !prev)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md"
        >
          {showAllCities ? "Show Less" : "View More Locations"}

          <FaArrowRight
            className={`text-xs transition-transform ${
              showAllCities ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>
    )}

  </div>
</section>


      {/* =====================================================
          WHY CHIKU CABS
      ====================================================== */}

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="inline-flex rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              Why Choose Chiku Cabs
            </div>

            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              Comfortable Urbania Travel from{" "}
              {normalizedCity}
            </h2>

          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Spacious Vehicles",
                text: "Comfortable Urbania options for group travel.",
              },
              {
                title: "Professional Chauffeurs",
                text: "Experienced drivers for local and outstation journeys.",
              },
              {
                title: "Transparent Pricing",
                text: "Route-based fares with clear pricing information.",
              },
              {
                title: "Easy Booking",
                text: "Share your trip details and confirm through WhatsApp.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <FaCheckCircle className="text-xl text-primary" />

                <h3 className="mt-5 text-base font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <div className="inline-flex rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              FAQs
            </div>

            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              Urbania Traveller FAQs
            </h2>

          </div>

          <div className="mt-10 space-y-3">

            {[
              {
                q: `What is the Urbania fare in ${normalizedCity}?`,
                a: `Urbania fares depend on the total travel distance, trip type and booking requirements. The standard calculation used on this page is based on ₹28 per kilometre with the applicable trip multiplier and fixed amount.`,
              },
              {
                q: "What is the Urbania rate per kilometre?",
                a: "The Urbania rate shown on this page is ₹28 per kilometre.",
              },
              {
                q: "Can I book a 12 seater Urbania?",
                a: "Yes. A 12 seater Urbania is suitable for medium-sized groups and family or corporate travel.",
              },
              {
                q: "Can I book a 17 seater Urbania?",
                a: "Yes. A 17 seater Urbania can be booked for larger groups, subject to availability.",
              },
              {
                q: `Can I book an Urbania from ${normalizedCity} for an outstation trip?`,
                a: `Yes. Urbania Traveller bookings can be requested from ${normalizedCity} for suitable outstation routes.`,
              },
              {
                q: "How can I confirm my Urbania booking?",
                a: "Enter your approximate distance and use the WhatsApp booking button to share your trip details and check availability.",
              },
            ].map((faq) => (

              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-slate-900 sm:text-base">

                  <span>{faq.q}</span>

                  <FaChevronDown className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180" />

                </summary>

                <p className="mt-4 pr-6 text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>

              </details>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950/50 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/urbania/urbaniadriver.webp')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/50" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl">
            <FaUsers />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Book an Urbania from {normalizedCity}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Planning a family trip, corporate journey or
            group tour? Book a 12 or 17 seater Urbania
            with Chiku Cabs.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href={`https://wa.me/916280820037?text=${encodeURIComponent(
                `Hi Chiku Cabs, I want to book an Urbania Traveller from ${normalizedCity}. Please share the best fare and availability.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-extrabold text-white transition hover:bg-primary/90"
            >
              <FaWhatsapp />
              Get Urbania Fare
            </a>

            <Link
              href="#urbania-routes"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              View Popular Routes
              <FaArrowRight className="text-xs" />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}