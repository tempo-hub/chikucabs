import Image from "next/image";
import Link from "next/link";
import { popularCities } from "@/lib/popularCities";

type PopularCitiesProps = {
  vehicleName: string;
  vehicleSlug: string;
  currentCity?: string;
};

export default function PopularCities({
  vehicleName,
  vehicleSlug,
   currentCity,
}: PopularCitiesProps) {
  // console.log("Vehicle Name:", vehicleName);
  // console.log("Vehicle Slug:", vehicleSlug);
  const filteredCities = popularCities.filter(
  (city) => city.slug.toLowerCase() !== currentCity?.toLowerCase()
);
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

          {filteredCities.map((city) => (

            <Link
              key={city.slug}
              href={`/${city.slug}/${vehicleSlug}`}
              className="group rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >

              <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-primary/10 bg-white shadow-md">
                <Image
                  src={city.image}
                  alt={city.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-5 text-center font-bold text-lg">
                {city.name}
              </h3>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}