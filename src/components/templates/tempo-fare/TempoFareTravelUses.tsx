import {
  UsersRound,
  BriefcaseBusiness,
  Church,
  Heart,
  Palmtree,
  Plane,
} from "lucide-react";

interface Props {
  city: string;
}

const  getTravelUses = (city: string) => [
  {
    icon: UsersRound,
    title: "Family Trips",
    description: `Spacious travel for the whole family in ${city}.`,
  },
  {
    icon: BriefcaseBusiness,
    title: "Corporate Events",
    description: "Professional transport for business meetings.",
  },
  {
    icon: Church,
    title: "Pilgrimage Tours",
    description: `Comfortable journeys to temples near ${city}.`,
  },
  {
    icon: Heart,
    title: "Wedding Parties",
    description: "Luxury travel for wedding guests.",
    featured: true,
  },
  {
    icon: Palmtree,
    title: "Sightseeing Tours",
    description: `Explore the best attractions of ${city}.`,
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: `Reliable pickup to ${city} airport.`,
  },
];

export default function TempoFareTravelUses({
  city,
}: Props) {
    const travelUses = getTravelUses(city);
  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <span>♧</span>
            Perfect For
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#19283e] md:text-4xl">
            Your Ideal Travel Companion in
            <br className="hidden sm:block" />
            <span className="text-[#19283e]"> {city}</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-[#64748b]">
            Whether it&apos;s a family vacation, corporate event,
            or pilgrimage tour, Tempo Traveller is perfect for
            every journey in {city}.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

          {travelUses.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`
                  flex
                  min-h-[130px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  bg-white
                  px-3
                  py-4
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_8px_20px_rgba(25,40,62,0.06)]
                  ${
                    item.featured
                      ? "border-[#ffb27d]"
                      : "border-[#dfe5ec]"
                  }
                `}
              >
                {/* Icon */}
                <div className="mb-3 text-2xl">
                  <Icon
                    size={27}
                    strokeWidth={1.8}
                    className="text-[#19283e]"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-[#19283e]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-4 text-[#64748b]">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}