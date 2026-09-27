import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSuitcaseRolling,
  FaUsers,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

const TRAVEL_TIPS = [
  {
    icon: FaCalendarAlt,
    title: "Book in Advance",
    description:
      "For group travel, share your travel date early so the preferred Urbania can be checked for availability.",
  },
  {
    icon: FaUsers,
    title: "Confirm Passenger Count",
    description:
      "Tell Chiku Cabs your exact or approximate group size so you can choose between the 12 and 17 seater.",
  },
  {
    icon: FaSuitcaseRolling,
    title: "Plan Your Luggage",
    description:
      "Consider the amount of luggage your group will carry when selecting the suitable Urbania capacity.",
  },
  {
    icon: FaClock,
    title: "Keep Travel Time Flexible",
    description:
      "Long-distance journey times can change because of traffic, road conditions, breaks and other travel factors.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Confirm Pickup & Drop",
    description:
      "Share the exact pickup and destination details with Chiku Cabs before your journey.",
  },
  {
    icon: FaPhoneAlt,
    title: "Keep Booking Details Handy",
    description:
      "Keep your booking contact number and confirmed trip details available during your journey.",
  },
];

export default function UrbaniaRouteTravelTips({
  fromCity,
  toCity,
}: Props) {
  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Travel Tips
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Tips for Your {fromCity} to {toCity} Urbania Trip
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A little planning can make your group journey easier. Keep
            these points in mind when arranging your Urbania booking with
            Chiku Cabs.
          </p>
        </div>

        {/* Tips */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVEL_TIPS.map((tip, index) => {
            const Icon = tip.icon;

            return (
              <article
                key={tip.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="text-sm" />
                  </div>

                  <span className="text-[10px] font-black text-slate-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-black text-slate-900 sm:text-lg">
                  {tip.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {tip.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Route Reminder */}
        <div className="mt-8 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
                  Your Route
                </p>

                <h3 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
                  {fromCity} → {toCity}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Confirm the pickup point, destination, travel date and
                  passenger count before finalizing your booking.
                </p>
              </div>
            </div>

            <a
              href="#urbania-booking"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-primary px-5 text-xs font-extrabold text-white transition hover:bg-primary/90"
            >
              Plan My Trip
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}