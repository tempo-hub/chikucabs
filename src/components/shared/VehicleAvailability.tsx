"use client";

import Link from "next/link";
import { useState } from "react";

interface RouteItem {
  url: string;
}

interface VehicleAvailabilityProps {
  vehicleName: string;
  vehicleSlug: string;
  city: string;
  baseCity: string;
  currentUrl: string;
  urls: RouteItem[];
}

type ParsedRoute = {
  url: string;
  citySlug: string;
  subCitySlug: string;
  vehicleSlug: string;
};

const makeName = (slug: string) => {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export default function VehicleAvailability({
  vehicleName,
  vehicleSlug,
  city,
  baseCity,
  currentUrl,
  urls,
}: VehicleAvailabilityProps) {
  /*
   * ============================================================
   * STATES
   * ============================================================
   */

  const [showAllCities, setShowAllCities] =
    useState(false);

  const [showAllRoutes, setShowAllRoutes] =
    useState(false);

  /*
   * ============================================================
   * NORMALIZE
   * ============================================================
   */

  const normalizedVehicleSlug = vehicleSlug
    .toLowerCase()
    .replace(/^\/|\/$/g, "");

  const normalizedCurrentUrl = currentUrl
    .toLowerCase()
    .replace(/\/$/, "");

  const normalizedBaseCity = baseCity
    .toLowerCase()
    .replace(/\s+/g, "-");

  /*
   * ============================================================
   * PARSE ALL URLS
   * ============================================================
   *
   * /delhi/rohini/hire-dzire-on-rent
   *
   * city       = delhi
   * subcity    = rohini
   * vehicle    = hire-dzire-on-rent
   *
   */

  const vehicleRoutes: ParsedRoute[] = urls
    .map((route) => {
      const cleanUrl = route.url
        .toLowerCase()
        .replace(/\/$/, "")
        .trim();

      const parts = cleanUrl
        .split("/")
        .filter(Boolean);

      /*
       * We only need:
       *
       * /city/subcity/vehicle
       */

      if (parts.length < 3) {
        return null;
      }

      const citySlug = parts[0];
      const subCitySlug = parts[1];
      const routeVehicleSlug =
        parts[2];

      /*
       * Only return the selected vehicle.
       */

      if (
        routeVehicleSlug !==
        normalizedVehicleSlug
      ) {
        return null;
      }

      return {
        url: route.url,
        citySlug,
        subCitySlug,
        vehicleSlug: routeVehicleSlug,
      };
    })
    .filter(
      (route): route is ParsedRoute =>
        route !== null
    );

  /*
   * ============================================================
   * DETECT ROOT VEHICLE PAGE
   * ============================================================
   *
   * /hire-dzire-on-rent
   *
   * URL parts:
   *
   * ["hire-dzire-on-rent"]
   *
   */

  const currentParts = normalizedCurrentUrl
    .split("/")
    .filter(Boolean);

  const isVehicleRootPage =
    currentParts.length === 1 &&
    currentParts[0] ===
      normalizedVehicleSlug;

  /*
   * ============================================================
   * GET UNIQUE CITIES
   * ============================================================
   *
   * From:
   *
   * /delhi/rohini/...
   * /delhi/dwarka/...
   * /varanasi/assi-ghat/...
   *
   * result:
   *
   * Delhi
   * Varanasi
   * ...
   */

  const vehicleCities = Array.from(
    new Set(
      vehicleRoutes.map(
        (route) => route.citySlug
      )
    )
  );

  /*
   * ============================================================
   * ROOT PAGE
   *
   * /hire-dzire-on-rent
   *
   * Show every city + its subcities.
   * ============================================================
   */

  if (isVehicleRootPage) {
    const visibleCities = showAllCities
      ? vehicleCities
      : vehicleCities.slice(0, 12);

    return (
      <section className="py-16 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="text-center mb-12">
            <div
              className="section-badge mx-auto mb-4"
              style={{
                display: "inline-flex",
              }}
            >
              {vehicleName.toUpperCase()} CABS AVAILABLE
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {vehicleName} Cabs Available Across India
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Book a {vehicleName} from major cities and
              local areas across India.
            </p>
          </div>

          {/* ==================================================
              CITY LIST
          ================================================== */}

          {visibleCities.map((citySlug) => {
            /*
             * Get all subcities belonging to this city.
             */

            const cityRoutes =
              vehicleRoutes.filter(
                (route) =>
                  route.citySlug ===
                  citySlug
              );

            /*
             * Remove duplicate subcities.
             */

            const uniqueCityRoutes =
              Array.from(
                new Map(
                  cityRoutes.map(
                    (route) => [
                      route.subCitySlug,
                      route,
                    ]
                  )
                ).values()
              );

            /*
             * Show first 12 subcities.
             */

            const displayedRoutes =
              uniqueCityRoutes.slice(
                0,
                12
              );

            return (
              <div
                key={citySlug}
                className="mb-14"
              >

                {/* =================================================
                    CITY HEADING
                ================================================= */}

                <div className="flex items-center gap-3 mb-6">

                  <div
                    className="
                      w-10
                      h-10
                      bg-[#BE1E23]
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-white
                    "
                  >
                    📍
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800">
                    Top Destinations from{" "}
                    {makeName(citySlug)}
                  </h3>

                </div>

                {/* =================================================
                    SUBCITY CARDS
                ================================================= */}

                <div
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-6
                    gap-4
                  "
                >
                  {displayedRoutes.map(
                    (route, index) => (
                      <Link
                        key={`${route.url}-${index}`}
                        href={route.url}
                        className="
                          group
                          bg-white
                          rounded-2xl
                          p-4
                          border
                          border-gray-100
                          shadow-sm
                          hover:shadow-xl
                          hover:border-[#BE1E23]/30
                          hover:-translate-y-1
                          transition-all
                          duration-300
                        "
                      >

                        {/* Icon */}

                        <div
                          className="
                            w-10
                            h-10
                            bg-[#BE1E23]/10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            mb-4
                            group-hover:bg-[#BE1E23]/20
                          "
                        >
                          🚕
                        </div>

                        {/* Subcity */}

                        <h4
                          className="
                            font-bold
                            text-gray-800
                            text-sm
                            mb-1
                            group-hover:text-[#BE1E23]
                            leading-tight
                          "
                        >
                          {makeName(
                            route.subCitySlug
                          )}
                        </h4>

                        {/* Vehicle */}

                        <p className="text-xs text-gray-400">
                          {vehicleName}
                        </p>

                        {/* Bottom */}

                        <div className="flex items-center justify-between mt-4">

                          <span className="text-xs font-semibold text-[#BE1E23]">
                            Book Now
                          </span>

                          <span className="text-xs text-gray-400 group-hover:text-[#BE1E23]">
                            →
                          </span>

                        </div>

                      </Link>
                    )
                  )}
                </div>

                {/* =================================================
                    VIEW ALL CITY ROUTES
                ================================================= */}

                {uniqueCityRoutes.length >
                  12 && (
                  <div className="text-center mt-6">

                    <Link
                      href={`/${citySlug}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-6
                        py-2.5
                        rounded-full
                        bg-[#BE1E23]/10
                        text-[#BE1E23]
                        font-semibold
                        text-sm
                        hover:bg-[#BE1E23]
                        hover:text-white
                        transition-all
                      "
                    >
                      View all{" "}
                      {uniqueCityRoutes.length}{" "}
                      routes from{" "}
                      {makeName(citySlug)}

                      <span>→</span>
                    </Link>

                  </div>
                )}

              </div>
            );
          })}

          {/* ==================================================
              VIEW MORE CITIES
          ================================================== */}

          {vehicleCities.length > 12 && (
            <div className="flex justify-center mt-4">

              <button
                type="button"
                onClick={() =>
                  setShowAllCities(
                    (prev) => !prev
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3
                  rounded-full
                  border
                  border-[#BE1E23]
                  text-[#BE1E23]
                  bg-white
                  font-semibold
                  shadow-sm
                  hover:bg-[#BE1E23]
                  hover:text-white
                  transition-all
                "
              >
                {showAllCities
                  ? "Show Less Cities"
                  : `View More Cities (${vehicleCities.length - 12} more)`}

                <span
                  className={`transition-transform ${
                    showAllCities
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  ↓
                </span>

              </button>

            </div>
          )}

        </div>
      </section>
    );
  }

  /*
   * ============================================================
   * CITY / SUBCITY PAGE
   *
   * Example:
   *
   * /delhi/hire-dzire-on-rent
   *
   * OR
   *
   * /delhi/rohini/hire-dzire-on-rent
   *
   * Show only Delhi subcities.
   * ============================================================
   */

  const currentCityRoutes =
    vehicleRoutes.filter(
      (route) =>
        route.citySlug ===
        normalizedBaseCity
    );

  /*
   * Remove duplicate subcities.
   */

  const uniqueSubCities =
    Array.from(
      new Map(
        currentCityRoutes.map(
          (route) => [
            route.subCitySlug,
            route,
          ]
        )
      ).values()
    );

  /*
   * Don't show current URL as a card.
   */

  const filteredSubCities =
    uniqueSubCities.filter(
      (route) =>
        route.url
          .toLowerCase()
          .replace(/\/$/, "") !==
        normalizedCurrentUrl
    );

  /*
   * First 12.
   */

  const visibleRoutes =
    showAllRoutes
      ? filteredSubCities
      : filteredSubCities.slice(
          0,
          12
        );

  return (
    <section className="py-16 bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center mb-10">

          <div
            className="section-badge mx-auto mb-4"
            style={{
              display: "inline-flex",
            }}
          >
            {vehicleName.toUpperCase()} CABS AVAILABLE
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {vehicleName} Cabs Available in{" "}
            {city}
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Book a {vehicleName} from{" "}
            {city} for local, outstation,
            airport and long-distance travel.
          </p>

        </div>

        {/* ==================================================
            ALL CITIES PILLS
        ================================================== */}

        <div className="mb-12">

          <div className="flex flex-wrap justify-center gap-3">

            {vehicleCities.map(
              (citySlug) => {

                const isCurrentCity =
                  citySlug ===
                  normalizedBaseCity;

                return (
                  <Link
                    key={citySlug}
                    href={`/${citySlug}/${vehicleSlug}`}
                    className={`
                      px-7
                      py-3
                      rounded-full
                      border
                      font-semibold
                      shadow-sm
                      transition-all
                      duration-300
                      ${
                        isCurrentCity
                          ? "border-[#BE1E23] text-[#BE1E23] bg-red-50"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-[#BE1E23] hover:text-white hover:border-[#BE1E23] hover:shadow-lg"
                      }
                    `}
                  >
                    {makeName(
                      citySlug
                    )}
                  </Link>
                );
              }
            )}

          </div>

        </div>

        {/* ==================================================
            CURRENT CITY SUBCITIES
        ================================================== */}

        {filteredSubCities.length >
          0 && (
          <div>

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    bg-[#BE1E23]
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-white
                  "
                >
                  📍
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Top {vehicleName} Locations
                  in {city}
                </h3>

              </div>

              <span className="text-sm text-gray-500">
                {
                  filteredSubCities.length
                }{" "}
                locations
              </span>

            </div>

            {/* Cards */}

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                gap-4
              "
            >

              {visibleRoutes.map(
                (route, index) => (
                  <Link
                    key={`${route.url}-${index}`}
                    href={route.url}
                    className="
                      group
                      bg-white
                      rounded-2xl
                      p-4
                      border
                      border-gray-100
                      shadow-sm
                      hover:shadow-xl
                      hover:border-[#BE1E23]/30
                      hover:-translate-y-1
                      transition-all
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        bg-[#BE1E23]/10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                    >
                      🚕
                    </div>

                    <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-[#BE1E23]">
                      {makeName(
                        route.subCitySlug
                      )}
                    </h4>

                    <p className="text-xs text-gray-400">
                      {vehicleName}
                    </p>

                    <div className="flex items-center justify-between mt-4">

                      <span className="text-xs font-semibold text-[#BE1E23]">
                        Book Now
                      </span>

                      <span className="text-xs text-gray-400">
                        →
                      </span>

                    </div>

                  </Link>
                )
              )}

            </div>

            {/* View More */}

            {filteredSubCities.length >
              12 && (
              <div className="flex justify-center mt-8">

                <button
                  type="button"
                  onClick={() =>
                    setShowAllRoutes(
                      (prev) => !prev
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-7
                    py-3
                    rounded-full
                    bg-[#BE1E23]/10
                    text-[#BE1E23]
                    font-semibold
                    text-sm
                    hover:bg-[#BE1E23]
                    hover:text-white
                    transition-all
                  "
                >

                  {showAllRoutes
                    ? "Show Less Locations"
                    : `View More Locations (${filteredSubCities.length - 12} more)`}

                  <span
                    className={`transition-transform ${
                      showAllRoutes
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    ↓
                  </span>

                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}