import React from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaCity,
  FaRoute,
} from "react-icons/fa";

interface ServiceArea {
  name: string;
  slug: string;
  type?: "city" | "area";
}

interface UrbaniaServiceAreasProps {
  city?: string;
  areas?: ServiceArea[];
}

const DEFAULT_AREAS: ServiceArea[] = [
  {
    name: "Ayodhya",
    slug: "/urbania-fare-in-ayodhya",
    type: "city",
  },
  {
    name: "Varanasi",
    slug: "/urbania-fare-in-varanasi",
    type: "city",
  },
  {
    name: "Mathura",
    slug: "/urbania-fare-in-mathura",
    type: "city",
  },
  {
    name: "Vrindavan",
    slug: "/urbania-fare-in-vrindavan",
    type: "city",
  },
  {
    name: "Haridwar",
    slug: "/urbania-fare-in-haridwar",
    type: "city",
  },
  {
    name: "Rishikesh",
    slug: "/urbania-fare-in-rishikesh",
    type: "city",
  },
  {
    name: "Prayagraj",
    slug: "/urbania-fare-in-prayagraj",
    type: "city",
  },
  {
    name: "Chitrakoot",
    slug: "/urbania-fare-in-chitrakoot",
    type: "area",
  },
];

export default function UrbaniaServiceAreas({
  city = "Noida",
  areas,
}: UrbaniaServiceAreasProps) {
  const serviceAreas = areas?.length ? areas : DEFAULT_AREAS;

  return (
    <section
      id="urbania-service-areas"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FaMapMarkerAlt className="text-[10px]" />
              Service Areas
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Urbania Traveller Service Areas
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Chiku Cabs provides Urbania Traveller booking support from{" "}
              <strong>{city}</strong> for local and outstation group travel.
              Explore the service areas below to find a relevant Urbania
              booking page.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaRoute />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-900">
                  Local & Outstation
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Choose your location to explore Urbania availability and
                  route-specific information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICE AREA GRID */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {serviceAreas.map((area) => (
            <Link
              key={`${area.name}-${area.slug}`}
              href={area.slug}
              className="
                group
                flex
                min-h-[92px]
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                transition
                duration-300
                hover:-translate-y-0.5
                hover:border-primary/30
                hover:shadow-md
                sm:p-5
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                  transition
                  group-hover:bg-primary
                  group-hover:text-white
                "
              >
                {area.type === "city" ? (
                  <FaCity className="text-xs" />
                ) : (
                  <FaMapMarkerAlt className="text-xs" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-xs font-extrabold text-slate-800 sm:text-sm">
                  {area.name}
                </h3>

                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  Urbania Traveller
                </p>
              </div>

              <FaArrowRight
                className="
                  shrink-0
                  text-[10px]
                  text-slate-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-primary
                "
              />
            </Link>
          ))}
        </div>

        {/* INTERNAL LINKING NOTE */}
        <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 sm:text-base">
                Looking for a specific destination?
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Explore our Urbania route pages for destination-specific
                information and booking options.
              </p>
            </div>

            <Link
              href="#urbania-routes"
              className="
                inline-flex
                min-h-10
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                px-4
                text-xs
                font-extrabold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              Explore Routes
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}