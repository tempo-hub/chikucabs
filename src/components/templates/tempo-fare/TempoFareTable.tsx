"use client";

import { MessageCircle } from "lucide-react";

interface Props {
  city: string;
}

const fareOptions = [
  {
    vehicle: "9 Seater Tempo Traveller",
    rate: "₹20",
    minKm: "250 km",
    driver: "₹500",
    luggage: "8 Bags",
  },
  {
    vehicle: "12 Seater Tempo Traveller",
    rate: "₹22",
    minKm: "250 km",
    driver: "₹500",
    luggage: "12 Bags",
  },
  {
    vehicle: "15 Seater Tempo Traveller",
    rate: "₹23",
    minKm: "250 km",
    driver: "₹500",
    luggage: "15 Bags",
  },
  {
    vehicle: "16 Seater Tempo Traveller",
    rate: "₹25",
    minKm: "250 km",
    driver: "₹500",
    luggage: "16 Bags",
  },
  {
    vehicle: "20 Seater Tempo Traveller",
    rate: "₹29",
    minKm: "250 km",
    driver: "₹500",
    luggage: "20 Bags",
  },
  {
    vehicle: "26 Seater Tempo Traveller",
    rate: "₹30",
    minKm: "250 km",
    driver: "₹500",
    luggage: "26 Bags",
  },
];

export default function TempoFareTable({
  city,
}: Props) {
  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#19283e] md:text-4xl">
            Tempo Traveller Fare in {city}
          </h2>

          <p className="mt-2 text-sm text-[#64748b]">
            Indicative rates — final fare depends on route, days &amp;
            season. Get an exact quote in 2 minutes.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-[#dfe5ec] bg-white shadow-[0_12px_35px_rgba(25,40,62,0.06)]">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">

              {/* Header */}
              <thead>
                <tr className="bg-[#fff1e8]">
                  <th className="px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-wide text-primary">
                    Vehicle
                  </th>

                  <th className="px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-wide text-primary">
                    Rate / KM
                  </th>

                  <th className="px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-wide text-primary">
                    Min KM / Day
                  </th>

                  <th className="px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-wide text-primary">
                    Driver Allowance
                  </th>

                  <th className="px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-wide text-primary">
                    Luggage
                  </th>

                  <th className="px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-wide text-primary">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody>
                {fareOptions.map((fare) => (
                  <tr
                    key={fare.vehicle}
                    className="
                      border-t
                      border-[#dfe5ec]
                      transition-colors
                      hover:bg-[#fffaf7]
                    "
                  >
                    <td className="px-4 py-4 text-xs font-bold text-[#19283e]">
                      {fare.vehicle}
                    </td>

                    <td className="px-4 py-4 text-sm font-extrabold text-primary">
                      {fare.rate}
                    </td>

                    <td className="px-4 py-4 text-xs text-[#64748b]">
                      {fare.minKm}
                    </td>

                    <td className="px-4 py-4 text-xs text-[#64748b]">
                      {fare.driver}
                    </td>

                    <td className="px-4 py-4 text-xs text-[#64748b]">
                      {fare.luggage}
                    </td>

                    <td className="px-4 py-4">
                      <a
  href={`https://wa.me/916280820037?text=${encodeURIComponent(
    `Hello Chiku Cabs, I want to book a Tempo Traveller in ${city}. Please share the available vehicles, price and booking details.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex
    items-center
    gap-1.5
    whitespace-nowrap
    rounded-full
    bg-primary
    px-4
    py-2
    text-[11px]
    font-bold
    text-white
    shadow-sm
    transition
    hover:bg-[#e81b00]
  "
>
  <MessageCircle size={13} />
  Get Quote
</a>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-[10px] leading-5 text-[#64748b]">
          * Toll, parking, state tax &amp; entry fees extra. GST applicable.
          Final quote confirmed on WhatsApp.
        </p>

      </div>
    </section>
  );
}