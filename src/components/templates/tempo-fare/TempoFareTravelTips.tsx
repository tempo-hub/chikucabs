import {
  CalendarDays,
  ThermometerSun,
  CloudRain,
  Users,
  IndianRupee,
  Lightbulb,
} from "lucide-react";

interface Props {
  city: string;
}

const tips = [
  {
    icon: CalendarDays,
    title: "Best Time to Visit",
    description:
      "October to March is ideal for exploring local places. Pleasant weather, festive season, and great for sightseeing.",
  },
  {
    icon: ThermometerSun,
    title: "Summer (Apr–Jun)",
    description:
      "Hot afternoons — plan early morning or evening trips. AC Tempo Traveller highly recommended.",
  },
  {
    icon: CloudRain,
    title: "Monsoon (Jul–Sep)",
    description:
      "Occasional showers make trips lush. Carry umbrellas, expect minor route changes.",
  },
  {
    icon: Users,
    title: "Group Size Tip",
    description:
      "9–12 seats is best for families; 16–20 seater ideal for pilgrimages & weddings.",
  },
  {
    icon: IndianRupee,
    title: "Budget Planning",
    description:
      "Book 3–5 days in advance for the best rates. Off-season bookings are 15–20% cheaper.",
  },
  {
    icon: Lightbulb,
    title: "Local Tip",
    description:
      "Try local cuisine and shop at nearby markets. Ask your driver for hidden gems.",
  },
];

export default function TempoFareTravelTips({
  city,
}: Props) {
  return (
    <section className="bg-white py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-8 max-w-4xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <Lightbulb size={12} />
            Travel Tips
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#19283e] md:text-4xl">
            Plan Your {city} Trip the Smart Way
          </h2>

          <p className="mt-2 text-xs text-[#64748b]">
            Handy tips for {city} travel — from locals &amp; frequent visitors.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {tips.map((tip) => {
            const Icon = tip.icon;

            return (
              <div
                key={tip.title}
                className="
                  min-h-[120px]
                  rounded-xl
                  border
                  border-[#dfe5ec]
                  bg-white
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_20px_rgba(25,40,62,0.06)]
                "
              >
                {/* Icon */}
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff1e8]">
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className="text-primary"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-slate-900">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-4 text-slate-700">
                  {tip.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}