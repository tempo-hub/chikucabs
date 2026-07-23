import { MapPin, Landmark, Plane, Train, Navigation } from "lucide-react";
import { localDominanceData } from "@/data/localDominanceData";

interface LocalDominanceProps {
  city: string;
}

export default function LocalDominance({
  city,
}: LocalDominanceProps) {
  const data =
    localDominanceData[
      city.toLowerCase() as keyof typeof localDominanceData
    ];

  if (!data) return null;
   const sections = [
    {
      title: "Popular Areas",
      icon: <MapPin className="w-6 h-6 text-primary" />,
      items: data.localAreas,
    },
    {
      title: "Tourist Places",
      icon: <Landmark className="w-6 h-6 text-primary" />,
      items: data.touristPlaces,
    },
    {
      title: "Airports",
      icon: <Plane className="w-6 h-6 text-primary" />,
      items: data.airports,
    },
    {
      title: "Railway Stations",
      icon: <Train className="w-6 h-6 text-primary" />,
      items: data.railwayStations,
    },
    {
      title: "Nearby Cities",
      icon: <Navigation className="w-6 h-6 text-primary" />,
      items: data.nearbyCities,
    },
  ];

 return (
  <section>
    <div className="container mx-auto px-4">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          📍 Serving Across {data.city}
        </span>

        <h2 className="mt-5 text-4xl font-bold">
          Explore {data.city} With Chiku Cabs
        </h2>

        <p className="mt-4 text-muted-foreground leading-7">
          Book reliable taxi services across popular localities,
          tourist attractions, airports, railway stations and nearby
          cities with professional drivers.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {sections.map((section) => (
          <div
            key={section.title}
            className="group rounded-3xl bg-white border p-7 hover:border-primary hover:shadow-xl transition-all duration-300"
          >

            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition">
                {section.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {section.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {section.items.length} Locations
                </p>
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-3">

              {section.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-slate-50 px-4 py-2 text-sm hover:bg-primary hover:text-black hover:border-primary cursor-pointer transition"
                >
                  {item}
                </span>
              ))}

            </div>

            {/* CTA */}
             <a
                href="https://wa.me/918448445504"
                target="_blank"
                rel="noopener noreferrer"
                className=" mt-8 inline-flex w-full px-3 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
              >
                Book Cab in {data.city}
              </a>

          </div>
        ))}

      </div>

    </div>
  </section>
);
}