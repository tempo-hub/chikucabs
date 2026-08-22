import Link from "next/link";
import { popularCities } from "@/lib/popularCities";
import { Building2, Castle, Landmark, MapPinned } from "lucide-react";

type PopularCitiesProps = {
  vehicleName: string;
  currentCity?: string;
};

type City = {
  name: string;
  slug: string;
};

const cityIcons = [
  Building2,
  Landmark,
  MapPinned,
  Castle,
];

export default function PopularCities({
  vehicleName,
  currentCity,
}: PopularCitiesProps) {
  const filteredCities: City[] = (
    popularCities[
      currentCity?.toLowerCase() as keyof typeof popularCities
    ] ?? []
  ).filter((city: City) => city.slug !== currentCity?.toLowerCase());

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <div
            className="section-badge mx-auto"
            style={{ display: "inline-flex" }}
          >
            POPULAR CITIES
          </div>

          <h2 className="section-title">
            {vehicleName} on Rent in Popular Cities
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Book premium {vehicleName} rental services across India's major
            cities with verified drivers and affordable pricing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCities.map((city, index) => {
            const Icon = cityIcons[index % cityIcons.length];

            return (
              <div
                key={city.slug}
                // href={`/${city.slug}`}
                className="group rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-orange-200 bg-orange-50 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                  <Icon className="h-10 w-10 text-orange-500 transition-colors duration-300 group-hover:text-white" />
                </div>

                <h3 className="mt-5 text-center font-bold text-lg">
                  {city.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}