"use client";

import React, { FormEvent, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
}

export default function UrbaniaRouteBooking({
  fromCity,
  toCity,
  distance,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    passengers: "",
    tripType: "One Way",
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `
Hi Chiku Cabs,

I want to book an Urbania Traveller.

Route: ${fromCity} to ${toCity}
Distance: ${distance ? `${distance} KM` : "To be confirmed"}
Name: ${form.name}
Phone: ${form.phone}
Travel Date: ${form.date}
Passengers: ${form.passengers}
Trip Type: ${form.tripType}

Please share the final fare and Urbania availability.
    `.trim();

    const whatsappUrl = `https://wa.me/916280820037?text=${encodeURIComponent(
      message
    )}`;

    setSubmitted(true);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
  id="urbania-booking"
  className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-10"
>
  {/* Background Image */}
  <div
    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/urbania/urbaniadriver.webp')",
    }}
    aria-hidden="true"
  />

  {/* Dark Overlay */}
  <div
    className="absolute inset-0 -z-10 bg-slate-950/80"
    aria-hidden="true"
  />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
              <FaWhatsapp />
              Book with Chiku Cabs
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Book an Urbania from{" "}
              <span className="text-primary">{fromCity}</span> to{" "}
              <span className="text-primary">{toCity}</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Share your basic trip details and connect with Chiku Cabs on
              WhatsApp. We will help you confirm the suitable 12 or 17
              seater Urbania and final trip fare.
            </p>

            {/* Benefits */}
            <div className="mt-7 space-y-3">
              {[
                "12 & 17 seater Urbania options",
                "Professional chauffeur",
                "Route-specific fare confirmation",
                "Quick WhatsApp assistance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <FaCheckCircle className="shrink-0 text-sm text-primary" />

                  <span className="text-xs font-semibold text-white/75 sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Phone */}
            <a
              href="tel:+916280820037"
              className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-white transition hover:border-primary/40 hover:bg-white/10"
            >
              <FaPhoneAlt className="text-primary" />
              Call Chiku Cabs
            </a>
          </div>

          {/* Form */}
          <div className="rounded-3xl bg-white p-5 shadow-2xl sm:p-7 lg:p-8">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
                Booking Request
              </p>

              <h3 className="mt-2 text-2xl font-black text-slate-900">
                Get Your Urbania Fare
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Enter your trip details. You will be redirected to
                WhatsApp to complete your enquiry.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="urbania-name"
                  className="mb-1.5 block text-xs font-extrabold text-slate-700"
                >
                  Your Name
                </label>

                <input
                  id="urbania-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="urbania-phone"
                  className="mb-1.5 block text-xs font-extrabold text-slate-700"
                >
                  Mobile Number
                </label>

                <input
                  id="urbania-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="10-digit mobile number"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Date + Passengers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="urbania-date"
                    className="mb-1.5 block text-xs font-extrabold text-slate-700"
                  >
                    Travel Date
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      id="urbania-date"
                      type="date"
                      required
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        updateField("date", e.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="urbania-passengers"
                    className="mb-1.5 block text-xs font-extrabold text-slate-700"
                  >
                    Passengers
                  </label>

                  <div className="relative">
                    <FaUsers className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      id="urbania-passengers"
                      type="number"
                      required
                      min={1}
                      max={17}
                      inputMode="numeric"
                      value={form.passengers}
                      onChange={(e) =>
                        updateField(
                          "passengers",
                          e.target.value
                        )
                      }
                      placeholder="No. of passengers"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>

              {/* Trip Type */}
              <div>
                <label
                  htmlFor="urbania-trip-type"
                  className="mb-1.5 block text-xs font-extrabold text-slate-700"
                >
                  Trip Type
                </label>

                <select
                  id="urbania-trip-type"
                  value={form.tripType}
                  onChange={(e) =>
                    updateField("tripType", e.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                >
                  <option value="One Way">One Way</option>
                  <option value="Round Trip">Round Trip</option>
                  <option value="Multiple Days">
                    Multiple Days
                  </option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.99]"
              >
                <FaWhatsapp />
                Check Availability on WhatsApp
              </button>

              {/* Success */}
              {submitted && (
                <div className="flex items-start gap-2 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-700">
                  <FaCheckCircle className="mt-0.5 shrink-0" />
                  Opening WhatsApp with your booking details.
                </div>
              )}

              <p className="text-center text-[10px] leading-5 text-slate-400">
                Your details are used to process this booking enquiry.
                Final fare and vehicle availability will be confirmed
                by Chiku Cabs.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}