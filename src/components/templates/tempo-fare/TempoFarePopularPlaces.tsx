import { MapPin } from "lucide-react";

interface Props {
  city: string;
}

export default function TempoFarePopularPlaces({
  city,
}: Props) {
  const places = [
    `Popular Places in ${city}`,
    "Local Sightseeing",
    "Nearby Tourist Attractions",
    `Famous Temples in ${city}`,
    `Tourist Attractions in ${city}`,
    `Best Places to Visit in ${city}`,
    "Family Tourist Places in the City",
    `Nearby Places to Visit from ${city}`,
  ];

  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-7 max-w-4xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <MapPin size={12} />
            Explore
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#19283e] md:text-4xl">
            Popular Places Around {city}
          </h2>

          <p className="mt-2 text-xs text-[#64748b]">
            Plan comfortable group trips to popular attractions and nearby
            destinations.
          </p>
        </div>

        {/* Places */}
        <div className="flex flex-wrap justify-center gap-2">

          {places.map((place) => (
            <div
              key={place}
              className="
                flex
                min-h-[42px]
                w-full
                items-center
                gap-2
                rounded-lg
                border
                border-[#dfe5ec]
                bg-white
                px-3
                py-2
                shadow-[0_2px_8px_rgba(25,40,62,0.02)]
                transition
                hover:border-primary/40
                hover:shadow-[0_5px_15px_rgba(25,40,62,0.05)]
                sm:w-[calc(50%-4px)]
                md:w-[calc(33.333%-6px)]
                lg:w-[calc(20%-7px)]
              "
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#fff1e8]">
                <MapPin
                  size={13}
                  className="text-primary"
                />
              </span>

              <span className="text-xs font-semibold leading-4 text-[#19283e]">
                {place}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}