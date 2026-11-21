import Link from "next/link";
import { FEATURED_CITY_HUBS } from "@/data/cityHubs";

export default function PopularCityHubs() {
  return (
    <section
      aria-labelledby="popular-city-hubs-heading"
      className="bg-slate-50 px-4 py-12"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="popular-city-hubs-heading"
          className="mb-6 text-center text-2xl font-bold text-slate-900"
        >
          Explore Cab Routes by City
        </h2>
        <nav
          aria-label="Popular city cab hubs"
          className="flex flex-wrap justify-center gap-3"
        >
          {FEATURED_CITY_HUBS.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              {city.name} cab routes
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
