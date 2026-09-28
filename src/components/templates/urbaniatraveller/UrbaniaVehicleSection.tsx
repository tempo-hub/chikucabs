"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaUsers,
  FaSuitcase,
  FaSnowflake,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";

interface UrbaniaVehicleSectionProps {
  city?: string;
}

interface UrbaniaVehicle {
  slug: string;
  name: string;
  seats: number;
  image: string;
  price: string;
  description: string;
  luggage: string;
  features: string[];
  popular?: boolean;
}

const URBANIA_VEHICLES: UrbaniaVehicle[] = [
  {
    slug: "12-seater-urbania",
    name: "12 Seater Urbania",
    seats: 12,
    image: "/urbania/12seaterurbania.webp",
    price: "Get Best Fare",
    description:
      "A premium Urbania Traveller for families, corporate groups and comfortable group journeys.",
    luggage: "Spacious luggage area",
    features: [
      "12 Comfortable Seats",
      "Air Conditioning",
      "Pushback Seating",
      "Premium Interior",
      "Experienced Driver",
      "Group-Friendly Space",
    ],
    popular: true,
  },
  {
    slug: "17-seater-urbania",
    name: "17 Seater Urbania",
    seats: 17,
    image: "/urbania/17seaterurbania.webp",
    price: "Get Best Fare",
    description:
      "A spacious 17 seater Urbania for larger families, group tours, weddings and corporate travel.",
    luggage: "Large luggage capacity",
    features: [
      "17 Comfortable Seats",
      "Air Conditioning",
      "Pushback Seating",
      "Premium Interior",
      "Experienced Driver",
      "Large Group Capacity",
    ],
  },
];

const getWhatsAppUrl = (city: string, vehicle: string) => {
  const message = encodeURIComponent(
    `Hi Chiku Cabs, I want to book a ${vehicle}${
      city ? ` in ${city}` : ""
    }. Please share the best fare and availability.`
  );

  return `https://wa.me/916280820037?text=${message}`;
};

export default function UrbaniaVehicleSection({
  city = "Noida",
}: UrbaniaVehicleSectionProps) {
  return (
    <section
      id="urbania-vehicles"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Choose Your Urbania
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            12 & 17 Seater Urbania Traveller
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Choose the right Urbania Traveller according to your group size,
            luggage and travel requirements in {city}.
          </p>
        </div>

        {/* VEHICLES */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {URBANIA_VEHICLES.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              {/* Popular badge */}
              {vehicle.popular && (
                <div className="absolute left-4 top-4 z-20">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* IMAGE */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.name} on rent in ${city} - Chiku Cabs`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                {/* Image overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Seat badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-extrabold text-slate-900 shadow-lg backdrop-blur">
                    <FaUsers className="text-primary" />
                    {vehicle.seats} Seater
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6">
                {/* Title + fare */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                      {vehicle.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Premium Urbania Traveller
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Fare
                    </p>

                    <p className="mt-0.5 text-sm font-black text-primary">
                      {vehicle.price}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {vehicle.description}
                </p>

                {/* Quick specs */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <FaUsers className="shrink-0 text-primary" />

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Capacity
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {vehicle.seats} Passengers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <FaSuitcase className="shrink-0 text-primary" />

                    <div>
                      <p className="text-[10px] text-slate-400">Luggage</p>
                      <p className="text-xs font-bold text-slate-800">
                        Spacious
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <FaSnowflake className="shrink-0 text-primary" />

                    <div>
                      <p className="text-[10px] text-slate-400">Comfort</p>
                      <p className="text-xs font-bold text-slate-800">
                        Air Conditioned
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <FaCheckCircle className="shrink-0 text-primary" />

                    <div>
                      <p className="text-[10px] text-slate-400">Service</p>
                      <p className="text-xs font-bold text-slate-800">
                        With Driver
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                    Included Features
                  </p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {vehicle.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-xs text-slate-600"
                      >
                        <FaCheckCircle className="mt-0.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-6 grid grid-cols-1 gap-2.5">
                  {/* <Link
                    href={`/urbania-traveller/${vehicle.slug}`}
                    className="
                      inline-flex
                      min-h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      px-3
                      text-xs
                      font-extrabold
                      text-slate-800
                      transition
                      hover:border-primary
                      hover:text-primary
                    "
                  >
                    View Details
                    <FaArrowRight className="text-[10px]" />
                  </Link> */}

                  <a
                    href={getWhatsAppUrl(city, vehicle.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-primary
                      px-3
                      text-xs
                      font-extrabold
                      text-white
                      transition
                      hover:bg-primary/90
                    "
                  >
                    <FaWhatsapp />
                    Get Fare
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-5 text-center sm:p-6">
          <p className="text-sm font-bold text-slate-800">
            Not sure which Urbania is right for your group?
          </p>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Tell us your passenger count and destination. Chiku Cabs will
            suggest the suitable Urbania Traveller.
          </p>

          <a
            href={getWhatsAppUrl(city, "Urbania Traveller")}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4
              inline-flex
              min-h-11
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
              hover:bg-slate-800
            "
          >
            <FaWhatsapp className="text-green-400" />
            Ask Chiku Cabs
          </a>
        </div>
      </div>
    </section>
  );
}