import {
  Snowflake,
  UserRoundCheck,
  Fuel,
  MapPinned,
  ShieldCheck,
  Music2,
  Wifi,
  CircleCheck,
} from "lucide-react";

interface Props {
  city: string;
}

const inclusions = [
  {
    icon: Snowflake,
    title: "AC & Non-AC Options",
    description: "Choose as per season & budget",
  },
  {
    icon: UserRoundCheck,
    title: "Experienced Driver",
    description: "Verified, polite & route-aware",
  },
  {
    icon: Fuel,
    title: "Fuel Included",
    description: "No surprise fuel charges",
  },
  {
    icon: MapPinned,
    title: "Doorstep Pickup",
    description: "Home, hotel, station, airport",
  },
  {
    icon: ShieldCheck,
    title: "Sanitized Vehicles",
    description: "Deep cleaned after every trip",
  },
  {
    icon: Music2,
    title: "Music System",
    description: "AUX, USB ports, speaker",
  },
  {
    icon: Wifi,
    title: "24/7 Support",
    description: "Live trip assistance on call",
  },
  {
    icon: CircleCheck,
    title: "Toll & Parking",
    description: "Transparent billing",
  },
];

export default function TempoFareInclusions({
  city,
}: Props) {
  return (
    <section className="bg-white py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-9 max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <span>♧</span>
            What's Included
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#19283e] md:text-4xl">
            Every Booking in {city} Comes With
          </h2>

          <p className="mt-3 text-sm text-[#64748b] md:text-base">
            Transparent inclusions — no surprises, no hidden charges, ever.
          </p>
        </div>

        {/* Inclusion Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {inclusions.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  flex
                  min-h-[72px]
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[#dfe5ec]
                  bg-white
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_20px_rgba(25,40,62,0.06)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#fff1e8]
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className="text-primary"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-xs font-extrabold text-[#19283e]">
                    {item.title}
                  </h3>

                  <p className="mt-0.5 text-[10px] leading-4 text-[#64748b]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}