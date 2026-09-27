import React from "react";
import {
  FaRoute,
  FaClock,
  FaSuitcase,
  FaUsers,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

interface UrbaniaTravelInfoProps {
  city?: string;
}

const INFO_ITEMS = [
  {
    icon: FaRoute,
    title: "Local & Outstation Routes",
    text: "Book an Urbania for local group travel, one-way journeys, round trips and longer outstation routes.",
  },
  {
    icon: FaUsers,
    title: "Choose the Right Capacity",
    text: "Select a 12 Seater or 17 Seater according to your passenger count and travel requirements.",
  },
  {
    icon: FaSuitcase,
    title: "Group Luggage",
    text: "Tell us your luggage requirements while booking so the suitable vehicle can be arranged.",
  },
  {
    icon: FaClock,
    title: "Plan Your Travel Date",
    text: "Availability can depend on your travel date and route, so sharing your trip details in advance is helpful.",
  },
];

export default function UrbaniaTravelInfo({
  city = "Noida",
}: UrbaniaTravelInfoProps) {
  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FaInfoCircle className="text-[10px]" />
              Travel Information
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Things to Know Before Booking an Urbania
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Planning a group journey from {city}? Keep these points in mind
              when choosing an Urbania Traveller for your trip.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:block">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-900">
                  Starting from {city}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Share your complete route with Chiku Cabs for a
                  destination-specific enquiry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFO_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition
                  hover:border-primary/20
                  hover:bg-white
                  hover:shadow-sm
                  sm:p-6
                "
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <Icon className="text-sm" />
                </div>

                <h3 className="mt-5 text-sm font-black text-slate-900 sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>

        {/* TRAVEL PLANNING BOX */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                <FaRoute />
                Before You Book
              </div>

              <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Keep your trip details ready
              </h3>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/60 sm:text-sm">
                For a quicker quotation, share your pickup location,
                destination, travel date, passenger count and preferred
                Urbania size with Chiku Cabs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <div className="rounded-xl bg-white/5 px-4 py-3 text-center">
                <p className="text-[10px] font-bold uppercase text-white/40">
                  Vehicle
                </p>
                <p className="mt-1 text-xs font-extrabold text-white">
                  12 / 17
                </p>
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-3 text-center">
                <p className="text-[10px] font-bold uppercase text-white/40">
                  Journey
                </p>
                <p className="mt-1 text-xs font-extrabold text-white">
                  Local / Outstation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}