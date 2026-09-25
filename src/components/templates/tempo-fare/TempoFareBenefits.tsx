import {
  Users,
  MapPin,
  Award,
  ShieldCheck,
} from "lucide-react";

interface Props {
  city: string;
}

const benefits = [
  {
    icon: Users,
    title: "Multiple Seaters",
    description:
      "9 to 20 seater options for different group sizes.",
  },
  {
    icon: MapPin,
    title: "Doorstep Pickup",
    description:
      "Pickup from homes, hotels, stations and airports.",
  },
  {
    icon: Award,
    title: "Experienced Drivers",
    description:
      "Professional chauffeurs for city and highway journeys.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Travel",
    description:
      "Comfortable vehicles with reliable travel support.",
  },
];

export default function TempoFareBenefits({
  city,
}: Props) {
  return (
    <section className="bg-white py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-9 max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <span>♧</span>
            Why Choose Chiku Cabs
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#19283e] md:text-4xl">
            Comfortable Group Travel in {city}
          </h2>

          <p className="mt-3 text-sm text-[#64748b] md:text-base">
            Book a reliable Tempo Traveller in {city} for
            local and outstation group journeys.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  rounded-2xl
                  border border-[#dfe5ec]
                  bg-white
                  p-5
                  shadow-[0_4px_18px_rgba(25,40,62,0.04)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_10px_28px_rgba(25,40,62,0.08)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#fff1e8]
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={2}
                    className="text-primary"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-[#19283e]">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-5 text-[#64748b]">
                  {benefit.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}