import React from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaRoute,
  FaCheckCircle,
} from "react-icons/fa";

interface UrbaniaSEOContentProps {
  city?: string;
}

export default function UrbaniaSEOContent({
  city = "Noida",
}: UrbaniaSEOContentProps) {
  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-5xl">
        {/* SECTION HEADER */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <FaMapMarkerAlt className="text-[10px]" />
            Urbania Traveller in {city}
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Urbania Traveller Booking in {city}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="space-y-6 text-sm leading-7 text-slate-600 sm:text-base">
          <p>
            Looking for a comfortable group vehicle in{" "}
            <strong className="font-bold text-slate-900">{city}</strong>?
            Chiku Cabs offers Urbania Traveller booking for customers
            travelling with family, friends, colleagues and other groups.
            You can choose between a{" "}
            <strong className="font-bold text-slate-900">
              12 Seater Urbania
            </strong>{" "}
            and a{" "}
            <strong className="font-bold text-slate-900">
              17 Seater Urbania
            </strong>{" "}
            according to your passenger requirements.
          </p>

          <p>
            An Urbania can be useful when travelling as a group because
            everyone can travel together in the same vehicle. Instead of
            arranging multiple smaller cars, a suitable Urbania can provide
            one dedicated vehicle for the journey. This can be particularly
            useful for family trips, corporate travel, weddings, events,
            airport transfers and outstation journeys.
          </p>

          <h3 className="pt-2 text-xl font-black text-slate-900 sm:text-2xl">
            12 Seater Urbania in {city}
          </h3>

          <p>
            The 12 Seater Urbania can be considered for smaller groups that
            want to travel together. It provides passenger capacity for a
            group journey while keeping the booking focused on a single
            vehicle and driver.
          </p>

          <h3 className="pt-2 text-xl font-black text-slate-900 sm:text-2xl">
            17 Seater Urbania in {city}
          </h3>

          <p>
            The 17 Seater Urbania is designed for larger groups that need
            additional passenger capacity. It can be requested for family
            tours, group events, corporate journeys and outstation travel.
          </p>

          <h3 className="pt-2 text-xl font-black text-slate-900 sm:text-2xl">
            Urbania for Local and Outstation Travel
          </h3>

          <p>
            From {city}, customers can enquire about Urbania for local travel
            as well as outstation routes. Depending on your journey, you can
            request a one-way trip, round trip or a customised group travel
            plan. Share your pickup point, destination, travel date and
            passenger count with Chiku Cabs to discuss the available option.
          </p>
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FaUsers,
              title: "12 & 17 Seater",
            },
            {
              icon: FaRoute,
              title: "Local & Outstation",
            },
            {
              icon: FaCheckCircle,
              title: "Driver Included",
            },
            {
              icon: FaMapMarkerAlt,
              title: `${city} Pickup`,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="text-xs" />
                </div>

                <span className="text-xs font-extrabold text-slate-800">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* BOOKING PARAGRAPH */}
        <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-5 sm:p-6">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Book an Urbania Traveller with Chiku Cabs
          </h3>

          <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">
            To enquire about an Urbania booking, share your pickup location,
            destination, travel date, passenger count and preferred vehicle
            size. Chiku Cabs can help you check availability and provide the
            applicable fare for your journey.
          </p>
        </div>
      </div>
    </section>
  );
}