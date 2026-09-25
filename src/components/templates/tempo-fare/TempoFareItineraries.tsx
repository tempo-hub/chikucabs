import {
  CalendarDays,
  MapPin,
  Clock3,
  ShoppingBag,
} from "lucide-react";

interface Props {
  city: string;
}

const itineraries = [
  {
    days: "1-Day",
    title: "1-Day Tour",
    subtitle: "Approx. 8–10 hours",
    highlighted: false,
    steps: [
      "Morning: Pickup & local tour",
      "Main Temple / Landmark visit",
      "Lunch break at popular local restaurant",
      "Evening: Aarti / Sunset point",
    ],
  },
  {
    days: "2-Day",
    title: "2-Day Tour",
    subtitle: "Ideal for weekend trips",
    highlighted: true,
    steps: [
      "Day 1: Full-day city tour",
      "Day 2: Nearby attractions & sightseeing",
      "Optional: Shopping & local food trail",
      "Drop-off at preferred location",
    ],
  },
];

export default function TempoFareItineraries({
  city,
}: Props) {
  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <CalendarDays size={12} />
            Suggested Itineraries
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#19283e] md:text-4xl">
            {city} Tour Packages — 1 Day &amp; 2 Day
          </h2>

          <p className="mt-2 text-xs text-[#64748b]">
            Sample itineraries we customize daily. Share your preferences
            and we'll build a route for you.
          </p>
        </div>

        {/* Itinerary Cards */}
        <div className="grid gap-4 md:grid-cols-2">

          {itineraries.map((itinerary) => (
            <div
              key={itinerary.days}
              className={`
                relative
                overflow-hidden
                rounded-xl
                border
                bg-white
                p-4
                ${
                  itinerary.highlighted
                    ? "border-primary shadow-[0_8px_25px_rgba(255,107,0,0.08)]"
                    : "border-[#dfe5ec]"
                }
              `}
            >

              {/* Recommended Badge */}
              {itinerary.highlighted && (
                <div className="absolute right-3 top-0 rounded-b-md bg-primary px-3 py-1 text-[7px] font-extrabold uppercase text-white">
                  Most Popular
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-start gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff1e8]">
                  {itinerary.highlighted ? (
                    <Clock3
                      size={15}
                      className="text-primary"
                    />
                  ) : (
                    <MapPin
                      size={15}
                      className="text-primary"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#19283e]">
                    {itinerary.days} {city} {itinerary.title}
                  </h3>

                  <p className="mt-0.5 text-sm text-[#64748b]">
                    {itinerary.subtitle}
                  </p>
                </div>

              </div>

              {/* Steps */}
              <div className="mt-3">
                {itinerary.steps.map((step, index) => (
                  <div
                    key={step}
                    className={`
                      flex
                      items-center
                      gap-2
                      py-2
                      ${
                        index !== itinerary.steps.length - 1
                          ? "border-b border-dashed border-[#dfe5ec]"
                          : ""
                      }
                    `}
                  >
                    {/* Number */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>

                    <span className="text-sm leading-4 text-[#475569]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Customizable Note */}
              {itinerary.highlighted && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#fff1e8] px-3 py-2">
                  <ShoppingBag
                    size={12}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-sm font-medium text-primary">
                    Fully customizable · Hotel stays can be arranged
                  </span>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}