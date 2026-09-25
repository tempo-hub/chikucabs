import { BusFront, MessageCircle, Users, Briefcase } from "lucide-react";

interface Props {
  city: string;
}

const vehicles = [
  {
    seats: 9,
    luggage: 8,
    rate: "₹20",
    title: "9 Seater Tempo Traveller",
    description: "Perfect for small family trips & airport transfers",
  },
  {
    seats: 12,
    luggage: 12,
    rate: "₹22",
    title: "12 Seater Tempo Traveller",
    description: "Perfect for family outings & corporate travel",
  },
  {
    seats: 15,
    luggage: 15,
    rate: "₹23",
    title: "15 Seater Tempo Traveller",
    description: "Perfect for medium-sized groups & tours",
  },
  {
    seats: 16,
    luggage: 16,
    rate: "₹25",
    title: "16 Seater Tempo Traveller",
    description: "Ideal for group trips, pilgrimages & weddings",
  },
  {
    seats: 20,
    luggage: 20,
    rate: "₹29",
    title: "20 Seater Tempo Traveller",
    description: "Perfect for big family reunions & group tours",
  },
  {
    seats: 26,
    luggage: 26,
    rate: "₹30",
    title: "26 Seater Tempo Traveller",
    description: "Maximum capacity for large groups & events",
  },
];

export default function TempoFareFleet({ city }: Props) {

     const whatsappNumber = "916280820037";

  const whatsappMessage = encodeURIComponent(
    `Hello Chiku Cabs, I want to book a Tempo Traveller in ${city}. Please share the available vehicles, price and booking details.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="bg-white py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <span>♧</span>
            Our Fleet
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#19283e] md:text-4xl">
            Tempo Traveller Fleet in {city}
          </h2>

          <p className="mt-2 text-xs text-[#64748b]">
            Choose a vehicle according to your group size and travel requirement.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.seats}
              className="
                overflow-hidden
                rounded-xl
                border
                border-[#dfe5ec]
                bg-white
                shadow-[0_6px_20px_rgba(25,40,62,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_28px_rgba(25,40,62,0.09)]
              "
            >
              {/* Card Top */}
              <div className="bg-[#fff1e8] p-3">

                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <BusFront
                      size={17}
                      className="text-white"
                    />
                  </div>

                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-primary">
                    {vehicle.seats} Seater
                  </span>
                </div>

                <h3 className="mt-3 text-xs font-extrabold text-[#19283e]">
                  {vehicle.title}
                </h3>

                <p className="mt-1 text-xs leading-4 text-[#64748b]">
                  {vehicle.description}
                </p>
              </div>

              {/* Card Details */}
              <div className="px-3 pb-3">

                <div className="mt-2 flex items-center gap-5 border-t border-[#dfe5ec] pt-2 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1">
                    <Users size={10} />
                    {vehicle.seats} Seats
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase size={10} />
                    {vehicle.luggage} Bags
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-[#dfe5ec] pt-2">
                  <span className="text-xs text-[#64748b]">
                    Starting from
                  </span>

                  <span className="text-sm font-black text-primary">
                    {vehicle.rate}
                    <span className="text-xs font-medium text-[#64748b]">
                      /km
                    </span>
                  </span>
                </div>

                {/* CTA */}
                <a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-2
    flex
    h-8
    w-full
    items-center
    justify-center
    gap-1.5
    rounded-full
    bg-primary
    text-[9px]
    font-bold
    text-white
    transition
    hover:bg-[#e80000]
  "
>
  <MessageCircle size={12} />
  Get Quote
</a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}