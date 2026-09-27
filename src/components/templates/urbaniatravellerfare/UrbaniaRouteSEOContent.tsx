import React from "react";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
}

export default function UrbaniaRouteSEOContent({
  fromCity,
  toCity,
  distance,
}: Props) {
  const routeName = `${fromCity} to ${toCity}`;

  return (
    <section
      id="urbania-route-content"
      className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Route Guide
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Urbania Traveller from {fromCity} to {toCity}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Planning a group journey from {fromCity} to {toCity}? A
            chauffeur-driven Urbania can be a convenient option when you
            want your group to travel together in one vehicle.
          </p>
        </div>

        {/* Route Summary */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaMapMarkerAlt />
            </div>

            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
              Starting Point
            </p>

            <p className="mt-1 text-base font-black text-slate-900">
              {fromCity}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaRoute />
            </div>

            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
              Approx. Distance
            </p>

            <p className="mt-1 text-base font-black text-slate-900">
              {distance ? `${distance} KM` : "To be confirmed"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaUsers />
            </div>

            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
              Vehicle Options
            </p>

            <p className="mt-1 text-base font-black text-slate-900">
              12 & 17 Seater
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div>
            <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
              Book an Urbania for {routeName}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Chiku Cabs provides Urbania travel options for groups
              planning to travel from {fromCity} to {toCity}. Depending on
              the size of your group, you can enquire about a 12 seater or
              17 seater Urbania.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Instead of arranging multiple cars, a suitable Urbania allows
              your group to travel together. It can be useful for family
              journeys, group tours, pilgrimage trips, corporate travel
              and other outstation requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
              Plan Your {fromCity} to {toCity} Group Journey
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Before booking, share your travel date, passenger count,
              pickup location, destination and trip type with Chiku Cabs.
              These details help determine the appropriate vehicle and
              applicable fare for your journey.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              If your journey includes a return trip or multiple travel
              days, mention those requirements while making your enquiry
              so the booking can be planned accordingly.
            </p>
          </div>

          {/* Key points */}
          <div>
            <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
              Why Consider an Urbania?
            </h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Travel together in one vehicle",
                "12 and 17 seater options",
                "Suitable for group outstation travel",
                "Space for group luggage",
                "Chauffeur-driven travel",
                "Route-specific fare confirmation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5"
                >
                  <FaCheckCircle className="mt-0.5 shrink-0 text-sm text-primary" />

                  <span className="text-xs font-semibold leading-5 text-slate-600 sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fare information */}
          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
            <h3 className="text-base font-black text-slate-900 sm:text-lg">
              {routeName} Urbania Fare
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
              The fare shown on this page is an estimate based on the
              available route information. For the {routeName} journey,
              Chiku Cabs can confirm the applicable fare after checking
              your travel date, trip type, passenger count and other
              booking requirements.
            </p>

            <p className="mt-3 text-xs font-semibold leading-6 text-slate-500 sm:text-sm">
              Distance shown:{" "}
              <span className="font-black text-slate-900">
                {distance ? `${distance} KM` : "To be confirmed"}
              </span>
            </p>
          </div>

          {/* Final paragraph */}
          <div>
            <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
              Book Your Urbania with Chiku Cabs
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              To enquire about an Urbania from {fromCity} to {toCity},
              use the booking form on this page or contact Chiku Cabs
              through WhatsApp. Share your journey details and get help
              choosing between the 12 and 17 seater options.
            </p>
          </div>
        </div>

        {/* Internal CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-5 text-center sm:p-6 md:flex-row md:text-left">
          <div>
            <p className="text-sm font-black text-white">
              Planning {fromCity} to {toCity}?
            </p>

            <p className="mt-1 text-xs text-white/50">
              Check Urbania availability and request your route fare.
            </p>
          </div>

          <a
            href="#urbania-booking"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-xs font-extrabold text-white transition hover:bg-primary/90"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  );
}