import React from "react";
import Image from "next/image";
import Link from "next/link";
import { POPULAR_ROUTE_CARDS } from "@/data/chikuData";

export default function PopularRoutes() {
  // Duplicate array to achieve seamless infinite looping
  const duplicatedRoutes = [...POPULAR_ROUTE_CARDS, ...POPULAR_ROUTE_CARDS];

  return (
    <section className="py-20 px-4 bg-slate-50 overflow-hidden" id="routes">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">
            Top Outstation Routes Across India
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Serving 1200+ routes with the best rates. Here are some of our most booked tour packages.
          </p>
        </div>

        {/* Carousel Container with Edge Fades */}
        <div className="relative w-full overflow-hidden ">
          <div className="animate-scroll-ltr flex gap-6 py-4">
            {duplicatedRoutes.map((r, i) => (
             <Link
                  href={r.href}
                key={i}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative w-full h-44 bg-slate-200 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="320px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 text-left">
                    <h3 className="text-center text-slate-900 font-extrabold text-sm sm:text-base mb-3">
                      {r.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom Full-Width CTA Button */}
                {/* <Link
                  href={r.href}
                  className={`w-full py-3 text-center text-xs font-bold tracking-wider uppercase transition-colors block ${
                    r.buttonVariant === "red"
                      ? "bg-[#b73c33] hover:bg-[#903828] text-white"
                      : "bg-[#fbb03b] hover:bg-[#e69e31] text-white"
                  }`}
                >
                  MORE
                </Link> */}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Link to all routes */}
        <div className="text-center mt-12">
          <Link
            href="/outstation-cabs"
            className="inline-block px-8 py-3 rounded border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider transition"
          >
            View All 1200+ Routes →
          </Link>
        </div>
      </div>
    </section>
  );
}