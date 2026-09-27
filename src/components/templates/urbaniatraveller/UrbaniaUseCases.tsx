import React from "react";
import {
  FaUsers,
  FaBriefcase,
  FaHeart,
  FaPlaneDeparture,
  FaPrayingHands,
  FaMapMarkedAlt,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";

interface UrbaniaUseCasesProps {
  city?: string;
}

const USE_CASES = [
  {
    icon: FaUsers,
    title: "Family Trips",
    description:
      "Travel together with family and friends in a spacious Urbania Traveller without needing multiple cars.",
  },
  {
    icon: FaBriefcase,
    title: "Corporate Travel",
    description:
      "A practical option for team outings, corporate events, conferences and employee group travel.",
  },
  {
    icon: FaHeart,
    title: "Weddings & Events",
    description:
      "Arrange comfortable group transportation for weddings, functions, ceremonies and special occasions.",
  },
  {
    icon: FaPlaneDeparture,
    title: "Airport Transfers",
    description:
      "Travel with your group and luggage between the airport and your pickup or destination location.",
  },
  {
    icon: FaPrayingHands,
    title: "Pilgrimage Trips",
    description:
      "Plan group visits to religious destinations with a dedicated Urbania and driver.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Outstation Tours",
    description:
      "Suitable for weekend trips, multi-city journeys and longer outstation group tours.",
  },
];

export default function UrbaniaUseCases({
  city = "Noida",
}: UrbaniaUseCasesProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${city}. Please help me plan my group trip.`
  );

  return (
    <section className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Group Travel
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Urbania Traveller for Every Group Journey
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Whether you are travelling with family, colleagues or a larger
            group, choose a 12 or 17 Seater Urbania from Chiku Cabs for your
            journey from {city}.
          </p>
        </div>

        {/* USE CASE GRID */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-lg
                  sm:p-6
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                    transition
                    group-hover:bg-primary
                    group-hover:text-white
                  "
                >
                  <Icon className="text-base" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-base font-black text-slate-900 sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {item.description}
                </p>

                {/* Bottom indicator */}
                <div className="mt-5 flex items-center gap-2 text-[11px] font-bold text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  12 & 17 Seater Available
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950">
          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  Planning a Group Trip?
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Tell Chiku Cabs where you want to go
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  Share your group size, pickup location, destination and
                  travel date. We can help you choose between the 12 and
                  17 Seater Urbania.
                </p>
              </div>

              <a
                href={`https://wa.me/916280820037?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-12
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-6
                  text-sm
                  font-extrabold
                  text-white
                  transition
                  hover:bg-primary/90
                "
              >
                <FaWhatsapp />
                Plan My Urbania Trip
                <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}