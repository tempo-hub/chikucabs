"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type UrlItem = {
  url: string;
};

type VehicleLocationLinksProps = {
  vehicleName: string;
  vehicleSlug: string;
  city: string;
  urls: UrlItem[];
  currentUrl?: string | null;
};

export default function VehicleLocationLinks({
  vehicleName,
  vehicleSlug,
  city,
  urls,
  currentUrl,
}: VehicleLocationLinksProps) {
  const [showAll, setShowAll] = useState(false);

  const citySlug = city
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const normalizedCurrentUrl =
    currentUrl?.toLowerCase().replace(/\/$/, "");

  const locations = urls
    .filter((item) => {
      const url = item.url
        .toLowerCase()
        .replace(/\/$/, "");

      return (
        url.startsWith(`/${citySlug}/`) &&
        url.includes(`/${vehicleSlug}`) &&
        url !== normalizedCurrentUrl
      );
    })
    .map((item) => {
      const parts = item.url.split("/").filter(Boolean);

      const area =
        parts.length >= 3
          ? parts[1]
          : parts[0];

      const areaName = area
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");

      return {
        url: item.url,
        area: areaName,
      };
    });

  const visibleLocations = showAll
    ? locations
    : locations.slice(0, 6);

  if (!locations.length) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-white border-t">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <div
            className="section-badge mx-auto mb-4"
            style={{ display: "inline-flex" }}
          >
            POPULAR LOCATIONS
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-950">
            {vehicleName} Rental Locations in {city}
          </h2>

          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Explore popular locations where you can hire{" "}
            {vehicleName} on rent in {city}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleLocations.map((location) => (
            <Link
              key={location.url}
              href={location.url}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    {location.area}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Hire {vehicleName} in {city}
                  </p>
                </div>

              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {locations.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              {showAll ? "View Less" : "View More"}

              {showAll ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}