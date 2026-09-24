"use client";

import {
  CalendarDays,
  MapPin,
  Users,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface Props {
  city: string;
}

export default function TempoFareHero({ city }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/tempotraveller.webp')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">

        {/* Breadcrumb */}
        <div className="mb-12 text-sm">
          <span className="text-white/70">Home</span>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white/70">Cities</span>
          <span className="mx-2 text-white/40">/</span>
          <span className="font-semibold text-primary">
            {city}
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="text-primary">♙</span>
              <span>Tempo Traveller Fare</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Tempo Traveller Fare
              <br />
              in{" "}
              <span className="text-primary">
                {city}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
              Book a comfortable Tempo Traveller in <span className="px-1">{city}</span>
              for family trips, group travel, sightseeing,
              weddings, corporate journeys and outstation
              travel.
            </p>

            {/* Trust points */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">★</span>
                <span>4.9/5 Rating</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>500+ Happy Groups</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>Safe & Reliable</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
  {/* WhatsApp */}
  <a
    href={`https://wa.me/916280820037?text=${encodeURIComponent(
      `Hello Chiku Cabs, I want to book a Tempo Traveller in ${city}. Please share the available vehicles, price and booking details.`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center gap-2
      rounded-full
      bg-primary
      px-6 py-3
      font-bold
      text-white
      shadow-lg
      transition
      hover:scale-[1.02]
    "
  >
    <MessageCircle size={18} />
    Get Instant Quote
  </a>

  {/* Call */}
  <a
    href="tel:+918448445504"
    className="
      inline-flex items-center gap-2
      rounded-full
      bg-white
      px-6 py-3
      font-bold
      text-primary
      transition
      hover:bg-gray-100
    "
  >
    <Phone size={18} />
    Call Us
  </a>
</div>

          </div>

          {/* RIGHT BOOKING CARD */}
          <div className="rounded-[24px] bg-white p-7 text-gray-900 shadow-2xl md:p-8">

            {/* Card Header */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <CalendarDays
                  className="text-primary"
                  size={23}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Plan Your City Trip
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Tell us your group size and travel requirement.
                </p>
              </div>
            </div>

            {/* Pickup */}
            <div className="mb-5">
              <label className="mb-2 flex items-center gap-2 text-xs font-medium">
                <MapPin
                  size={14}
                  className="text-primary"
                />
                Pickup City
              </label>

              <div className="flex h-11 items-center justify-between rounded-xl bg-[#fff1e8] px-4 text-sm font-semibold">
                <span>{city}</span>

                <span className="rounded-full bg-white px-3 py-1 text-[10px] text-gray-600 shadow-sm">
                  ✓ Verified
                </span>
              </div>
            </div>

            {/* Seater */}
            <div className="mb-5">
              <label className="mb-2 flex items-center gap-2 text-xs font-medium">
                <Users
                  size={14}
                  className="text-primary"
                />
                Seater Variant
              </label>

              <select className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-primary">
                <option>9 Seater Tempo Traveller</option>
                <option>12 Seater Tempo Traveller</option>
                <option>16 Seater Tempo Traveller</option>
                <option>20 Seater Tempo Traveller</option>
                <option>26 Seater Tempo Traveller</option>
              </select>
            </div>

            {/* CTA */}
            <a
  href={`https://wa.me/916280820037?text=${encodeURIComponent(
    `Hello Chiku Cabs, I want to book a Tempo Traveller in ${city}. Please share the available vehicles and fare details.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    flex h-11 w-full
    items-center
    justify-center
    gap-2
    rounded-full
    bg-primary
    font-bold
    text-white
    shadow-lg
    shadow-orange-500/20
    transition
    hover:bg-[#e80f00]
  "
>
  <MessageCircle size={17} />
  Request Fare
</a>

            {/* Bottom trust */}
            <div className="mt-6 border-t border-gray-100 pt-5">

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <Zap size={13} className="text-primary" />
                  Response within 2 minutes
                </span>

                <span className="text-primary">•</span>

                <span>
                  🟩 No Hidden Charges
                </span>

                <span className="text-primary">•</span>

                <span>
                  ★ 4.9/5 Rating
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}