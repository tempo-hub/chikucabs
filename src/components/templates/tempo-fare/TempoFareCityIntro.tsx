import {
  BusFront,
  MapPin,
  MessageCircle,
  ArrowRight,
  Users,
  Headphones,
  Star,
} from "lucide-react";

interface Props {
  city: string;
  description?: string;
}

export default function TempoFareCityIntro({
  city,
  description,
}: Props) {
  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">

          {/* LEFT CONTENT */}
          <div>
            {/* Location Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-2 text-xs font-bold text-primary">
              <MapPin size={14} />
              {city}
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-[#19283e] md:text-5xl">
              Tempo Traveller Service in{" "}
              <span className="text-primary">
                {city}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#64748b] md:text-base">
              {description ||
                `${city} is a convenient destination for family trips, sightseeing, group travel and outstation journeys.`}
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748b] md:text-base">
              Chiku Cabs provides comfortable group transportation
              for family holidays, religious journeys, sightseeing,
              weddings, corporate outings and long-distance tours
              from {city}.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
  href={`https://wa.me/916280820037?text=${encodeURIComponent(
    `Hello Chiku Cabs, I want to book a Tempo Traveller in ${city}. Please share the available vehicles, price and booking details.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex
    items-center
    gap-2
    rounded-full
    bg-primary
    px-6
    py-3
    text-sm
    font-bold
    text-white
    shadow-lg
    shadow-orange-500/20
    transition
    hover:bg-[#e85d00]
  "
>
  <MessageCircle size={17} />
  Book Now
</a>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-primary
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-primary
                  transition
                  hover:bg-[#fff1e8]
                "
              >
                Other Cities
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* RIGHT STATS CARD */}
          <div
            className="
              rounded-[22px]
              border
              border-[#dfe5ec]
              bg-white
              p-5
              shadow-[0_15px_40px_rgba(25,40,62,0.08)]
              md:p-6
            "
          >

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">

              {/* 9+ */}
              <div
                className="
                  flex
                  h-20
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#fff1e8]
                  text-center
                "
              >
                <span className="text-xl font-black text-primary">
                  9+
                </span>

                <span className="mt-1 text-[10px] text-[#64748b]">
                  Seater Options
                </span>
              </div>

              {/* 500+ */}
              <div
                className="
                  flex
                  h-20
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#fff1e8]
                  text-center
                "
              >
                <span className="text-xl font-black text-primary">
                  500+
                </span>

                <span className="mt-1 text-[10px] text-[#64748b]">
                  Happy Groups
                </span>
              </div>

              {/* 24/7 */}
              <div
                className="
                  flex
                  h-20
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#fff1e8]
                  text-center
                "
              >
                <span className="text-xl font-black text-primary">
                  24/7
                </span>

                <span className="mt-1 text-[10px] text-[#64748b]">
                  Support
                </span>
              </div>

              {/* Rating */}
              <div
                className="
                  flex
                  h-20
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#fff1e8]
                  text-center
                "
              >
                <span className="text-xl font-black text-primary">
                  4.9/5
                </span>

                <span className="mt-1 text-[10px] text-[#64748b]">
                  Customer Rating
                </span>
              </div>
            </div>

            {/* Bottom Feature */}
            <div className="mt-3 flex items-center gap-4 rounded-xl bg-[#fff1e8] px-4 py-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                <BusFront
                  size={21}
                  className="text-primary"
                />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#19283e]">
                  Comfortable Group Journeys
                </h3>

                <p className="mt-1 text-[10px] leading-5 text-[#64748b]">
                  Choose the vehicle according to your group size
                  and travel requirement.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}