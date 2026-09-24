import { Star } from "lucide-react";

interface Props {
  city: string;
}

const reviews = [
  {
    name: "Rahul Sharma",
    initial: "R",
    time: "2 weeks ago",
    review: `Excellent Tempo Traveller service in ${"Wokha"}. The vehicle was clean, comfortable and the driver was professional. The entire group journey was smooth and comfortable.`,
  },
  {
    name: "Priya Patel",
    initial: "P",
    time: "1 month ago",
    review: `Booked a Tempo Traveller for a family trip in ${"Wokha"}. The vehicle was spacious and the pricing was transparent. Overall, a comfortable experience.`,
  },
  {
    name: "Amit Kumar",
    initial: "A",
    time: "3 weeks ago",
    review: `Great experience with Chiku Cabs Tempo Traveller. The vehicle was comfortable for our group and the driver was polite and punctual throughout the journey.`,
  },
  {
    name: "Sneha Reddy",
    initial: "S",
    time: "2 months ago",
    review: `We had a comfortable group trip with Chiku Cabs. The Tempo Traveller was clean, spacious and the driver provided excellent support throughout the journey.`,
  },
];

export default function TempoFareReviews({
  city,
}: Props) {
  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <Star size={11} />
            Reviews
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#19283e] md:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-2 text-xs text-[#64748b]">
            Real travel experiences from customers who booked
            Tempo Traveller services with Chiku Cabs.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="
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
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={10}
                    fill="currentColor"
                    className="text-[#ffb000]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-2 min-h-[75px] text-sm italic leading-4 text-[#475569]">
                &quot;{review.review}&quot;
              </p>

              {/* Divider */}
              <div className="my-3 border-t border-[#dfe5ec]" />

              {/* Customer */}
              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                  {review.initial}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#19283e]">
                    {review.name}
                  </h3>

                  <p className="text-xs text-[#64748b]">
                    {review.time} · {city}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}