"use client";

import React, { FormEvent, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

interface UrbaniaBookingFormProps {
  city?: string;
}

export default function UrbaniaBookingForm({
  city = "Noida",
}: UrbaniaBookingFormProps) {
  const [formData, setFormData] = useState({
    pickup: city,
    destination: "",
    date: "",
    passengers: "",
    vehicle: "12 Seater Urbania",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = `
Hi Chiku Cabs,

I want to enquire about an Urbania Traveller.

Pickup: ${formData.pickup}
Destination: ${formData.destination}
Travel Date: ${formData.date}
Passengers: ${formData.passengers}
Vehicle: ${formData.vehicle}

Please share the fare and availability.
`.trim();

    const whatsappUrl = `https://wa.me/916280820037?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <section
      id="urbania-enquiry"
      className="bg-slate-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-slate-900 p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                Urbania Enquiry
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
                Plan Your
                <span className="block text-primary">
                  Urbania Journey
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Share your basic trip details and connect with Chiku Cabs on
                WhatsApp for the applicable fare and availability.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "12 & 17 Seater Urbania options",
                  "Local and outstation journeys",
                  "Driver-assisted bookings",
                  "Quick WhatsApp enquiry",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-xs font-semibold text-white/75"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                Get Your Urbania Fare
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Enter your trip details below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pickup */}
              <div>
                <label
                  htmlFor="urbania-pickup"
                  className="mb-1.5 block text-xs font-bold text-slate-700"
                >
                  Pickup Location
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-primary" />

                  <input
                    id="urbania-pickup"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    required
                    placeholder={`Enter pickup location in ${city}`}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-primary
                      focus:bg-white
                    "
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label
                  htmlFor="urbania-destination"
                  className="mb-1.5 block text-xs font-bold text-slate-700"
                >
                  Destination
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-primary" />

                  <input
                    id="urbania-destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    placeholder="Enter destination"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-primary
                      focus:bg-white
                    "
                  />
                </div>
              </div>

              {/* Date + Passengers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="urbania-date"
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Travel Date
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-primary" />

                    <input
                      id="urbania-date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-10
                        pr-3
                        text-sm
                        text-slate-800
                        outline-none
                        focus:border-primary
                        focus:bg-white
                      "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="urbania-passengers"
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Passengers
                  </label>

                  <div className="relative">
                    <FaUsers className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-primary" />

                    <select
                      id="urbania-passengers"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      className="
                        h-12
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-10
                        pr-3
                        text-sm
                        text-slate-800
                        outline-none
                        focus:border-primary
                        focus:bg-white
                      "
                    >
                      <option value="">Select</option>
                      {Array.from({ length: 17 }, (_, index) => index + 1).map(
                        (number) => (
                          <option key={number} value={number}>
                            {number}{" "}
                            {number === 1 ? "Passenger" : "Passengers"}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Vehicle */}
              <div>
                <label
                  htmlFor="urbania-vehicle"
                  className="mb-1.5 block text-xs font-bold text-slate-700"
                >
                  Preferred Urbania
                </label>

                <select
                  id="urbania-vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    text-slate-800
                    outline-none
                    focus:border-primary
                    focus:bg-white
                  "
                >
                  <option value="12 Seater Urbania">
                    12 Seater Urbania
                  </option>

                  <option value="17 Seater Urbania">
                    17 Seater Urbania
                  </option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  mt-2
                  flex
                  min-h-12
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
                  shadow-sm
                  transition
                  hover:bg-primary/90
                  active:scale-[0.99]
                "
              >
                <FaWhatsapp />
                Get Fare on WhatsApp
                <FaArrowRight className="text-[10px]" />
              </button>

              <p className="text-center text-[10px] leading-4 text-slate-400">
                Your details will be used to prepare your Urbania booking
                enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}