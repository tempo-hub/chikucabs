import React from "react";
import {
  FaUsers,
  FaSuitcaseRolling,
  FaSnowflake,
  FaCheckCircle,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

const VEHICLES = [
  {
    name: "12 Seater Urbania",
    capacity: "Up to 12 passengers",
    luggage: "Suitable for group luggage",
    ideal: "Families & small groups",
    description:
      "A comfortable option for family trips, pilgrimage journeys and medium-sized groups travelling from {fromCity} to {toCity}.",
  },
  {
    name: "17 Seater Urbania",
    capacity: "Up to 17 passengers",
    luggage: "More space for group luggage",
    ideal: "Large groups & tours",
    description:
      "A spacious Urbania option for larger families, tour groups, corporate trips and group outstation journeys.",
  },
];

export default function UrbaniaRouteVehicleSection({
  fromCity,
  toCity,
}: Props) {
  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${fromCity} to ${toCity}. Please share availability and fare for 12 and 17 seater Urbania.`
  );

  return (
    <section
      id="urbania-vehicles"
      className="bg-white/90 px-4 py-12 sm:px-6 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Choose Your Urbania
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            12 & 17 Seater Urbania for {fromCity} to {toCity}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Select the Urbania size according to your group. Both options
            are designed for comfortable long-distance and outstation
            travel with Chiku Cabs.
          </p>
        </div>

        {/* Vehicle Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {VEHICLES.map((vehicle, index) => {
            const description = vehicle.description
              .replace("{fromCity}", fromCity)
              .replace("{toCity}", toCity);

            return (
              <article
                key={vehicle.name}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Top */}
                <div className="relative overflow-hidden bg-slate-900 px-5 py-7 text-white sm:px-7">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                        <FaCheckCircle />
                        {index === 0 ? "Medium Group" : "Large Group"}
                      </div>

                      <h3 className="text-2xl font-black sm:text-3xl">
                        {vehicle.name}
                      </h3>

                      <p className="mt-2 max-w-md text-xs leading-6 text-white/60 sm:text-sm">
                        {description}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <FaUsers className="text-lg" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-7">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <FaUsers className="text-primary" />

                      <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Capacity
                      </p>

                      <p className="mt-1 text-xs font-extrabold text-slate-900">
                        {vehicle.capacity}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <FaSuitcaseRolling className="text-primary" />

                      <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Luggage
                      </p>

                      <p className="mt-1 text-xs font-extrabold text-slate-900">
                        {vehicle.luggage}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <FaSnowflake className="text-primary" />

                      <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Comfort
                      </p>

                      <p className="mt-1 text-xs font-extrabold text-slate-900">
                        Air Conditioned
                      </p>
                    </div>
                  </div>

                  {/* Suitable For */}
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FaCheckCircle className="text-sm" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Ideal For
                      </p>

                      <p className="mt-1 text-xs font-extrabold text-slate-800">
                        {vehicle.ideal}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/916280820037?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary/90"
                  >
                    <FaWhatsapp />
                    Check {index === 0 ? "12" : "17"} Seater Availability
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mx-auto mt-7 max-w-3xl rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4 text-center">
          <p className="text-xs leading-6 text-slate-600 sm:text-sm">
            <strong className="text-slate-900">
              Not sure which size to choose?
            </strong>{" "}
            Share your passenger count and luggage requirements with Chiku
            Cabs. We can help you select the suitable Urbania for your
            {` ${fromCity} to ${toCity}`} journey.
          </p>
        </div>
      </div>
    </section>
  );
}