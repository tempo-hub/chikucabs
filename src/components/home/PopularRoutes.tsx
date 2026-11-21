import React from "react";
import Image from "next/image";
import Link from "next/link";
import { POPULAR_ROUTE_CARDS } from "@/data/chikuData";

export default function PopularRoutes() {
  return (
    <section className="py-20 px-4 bg-slate-50" id="routes">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">
            Top Outstation Routes Across India
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Explore a selection of outstation travel routes and destinations.
          </p>
        </div>

        {/* Scrollable route cards */}
        <div className="relative w-full overflow-hidden">
          <div
            role="region"
            aria-label="Popular outstation routes"
            className="flex gap-6 py-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            {POPULAR_ROUTE_CARDS.map((r) => (
             <Link
                  href={r.href}
                key={r.href}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative w-full h-44 bg-slate-200 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(min-width: 640px) 320px, 280px"
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
            View Outstation Routes →
          </Link>
        </div>
      </div>
    </section>
  );
}