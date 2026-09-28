import React from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaRoute,
  FaCalendarAlt,
  FaUsers,
  FaCar,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
  duration?: string;
}

export default function UrbaniaRouteJourneyInfo({
  fromCity,
  toCity,
  distance,
  duration,
}: Props) {
  const journeyDetails = [
    {
      icon: FaMapMarkerAlt,
      label: "Pickup",
      value: fromCity,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Drop",
      value: toCity,
    },
    {
      icon: FaRoute,
      label: "Distance",
      value: distance ? `${distance} KM` : "Route dependent",
    },
    {
      icon: FaClock,
      label: "Estimated Time",
      value: duration || "Depends on route & traffic",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-12 bg-white/90 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Journey Information
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {fromCity} to {toCity} Urbania Journey Details
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Plan your group journey with the key route information below.
            Actual travel time can vary depending on traffic, road
            conditions, stops and your travel schedule.
          </p>
        </div>

        {/* Route line */}
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="relative">
            {/* Desktop / mobile route line */}
            <div className="absolute left-[19px] top-10 bottom-10 w-px bg-slate-200 sm:left-[22px]" />

            <div className="relative space-y-7">
              <div className="flex gap-4 sm:gap-5">
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm sm:h-11 sm:w-11">
                  <FaMapMarkerAlt className="text-sm" />
                </div>

                <div className="pt-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                    Pickup Location
                  </p>

                  <h3 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                    {fromCity}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Confirm your preferred pickup point when booking.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5">
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-white shadow-sm sm:h-11 sm:w-11">
                  <FaMapMarkerAlt className="text-sm" />
                </div>

                <div className="pt-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                    Destination
                  </p>

                  <h3 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                    {toCity}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Share your final drop location with Chiku Cabs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information cards */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {journeyDetails.slice(2).map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="text-xs" />
                </div>

                <p className="mt-4 text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                  {item.label}
                </p>

                <p className="mt-1 text-sm font-black text-slate-900">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Planning information */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaCalendarAlt />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-900">
              Plan Your Trip
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              For long-distance group travel, booking in advance can help
              you confirm the preferred Urbania vehicle and travel date.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaUsers />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-900">
              Choose Your Capacity
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Select the 12 or 17 seater according to your passenger count,
              luggage and overall trip requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaCar />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-900">
              Confirm Before Travel
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Confirm the final fare, vehicle availability, pickup point
              and trip requirements with Chiku Cabs before your journey.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-7 rounded-2xl bg-primary/5 px-5 py-4 text-center">
          <p className="text-xs leading-6 text-slate-600 sm:text-sm">
            <strong className="text-slate-900">
              Route information:
            </strong>{" "}
            Distance and journey time shown on this page are estimates.
            Your actual travel time may change according to traffic,
            stops and road conditions.
          </p>
        </div>
      </div>
    </section>
  );
}