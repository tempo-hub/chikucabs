
import React from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaRoute,
  FaWhatsapp,
} from "react-icons/fa";

interface UrbaniaRoute {
  from?: string;
  to: string;
  slug?: string;
  distance?: string;
}

interface UrbaniaPopularRoutesProps {
  city?: string;
  routes?: UrbaniaRoute[];
}

const DEFAULT_ROUTES: UrbaniaRoute[] = [
  {
    to: "Ayodhya",
    distance: "Approx. 135 km",
  },
  {
    to: "Varanasi",
    distance: "Approx. 320 km",
  },
  {
    to: "Mathura",
    distance: "Approx. 390 km",
  },
  {
    to: "Vrindavan",
    distance: "Approx. 400 km",
  },
  {
    to: "Haridwar",
    distance: "Approx. 550 km",
  },
  {
    to: "Prayagraj",
    distance: "Approx. 200 km",
  },
];

export default function UrbaniaPopularRoutes({
  city = "Lucknow",
  routes,
}: UrbaniaPopularRoutesProps) {
  const routeList = routes?.length ? routes : DEFAULT_ROUTES;

  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${city}. Please share the best fare for my route.`
  );

  const filteredRoutes = routeList.filter((route) => {
  const fromCity = (route.from || city).trim().toLowerCase();
  const toCity = route.to.trim().toLowerCase();

  return fromCity !== toCity;
});

  return (
    <section
      id="urbania-routes"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FaRoute className="text-[10px]" />
              Urbania Routes
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Popular Urbania Traveller Routes from {city}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Book a 12 or 17 seater Urbania from {city} for popular pilgrimage
              and outstation destinations. Choose your destination to explore
              the journey details and request a fare from Chiku Cabs.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/916280820037?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              min-h-11
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              px-5
              text-xs
              font-extrabold
              text-white
              transition
              hover:bg-primary/90
            "
          >
            <FaWhatsapp />
            Ask for Route Fare
          </a>
        </div>

        {/* ROUTE GRID */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRoutes.map((route) => {
            const fromCity = route.from || city;
            const routeSlug = `/urbania/${fromCity
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")}-to-${route.to
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")}-urbania-fare`;

            return (
              <Link
                key={`${fromCity}-${route.to}`}
                href={routeSlug}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-lg
                  sm:p-6
                "
              >
                {/* Route icon */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaMapMarkerAlt />
                  </div>

                  <FaArrowRight
                    className="
                      text-xs
                      text-slate-300
                      transition
                      group-hover:translate-x-1
                      group-hover:text-primary
                    "
                  />
                </div>

                {/* Route */}
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Urbania Traveller
                  </p>

                  <h3 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                    {fromCity}{" "}
                    <span className="font-medium text-slate-400">
                      to
                    </span>{" "}
                    {route.to}
                  </h3>
                </div>

                {/* Distance */}
                {route.distance && (
                  <p className="mt-2 text-xs text-slate-500">
                    {route.distance}
                  </p>
                )}

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-bold text-primary">
                    View Route
                  </span>

                  <span className="text-[10px] font-semibold text-slate-400">
                    12 & 17 Seater
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CUSTOM ROUTE */}
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 sm:text-lg">
                Don&apos;t see your destination?
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Chiku Cabs can help with Urbania bookings for other routes and
                destinations. Share your pickup and drop location to get a
                route-specific fare.
              </p>
            </div>

            <a
              href={`https://wa.me/916280820037?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                min-h-11
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                text-xs
                font-extrabold
                text-slate-800
                transition
                hover:border-primary
                hover:text-primary
              "
            >
              <FaWhatsapp className="text-green-600" />
              Share Your Route
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

