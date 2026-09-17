"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Users, Fuel, Gauge, ChevronLeft, ChevronRight } from "lucide-react";
import { FLEET, waUrl } from "@/data/chikuData";

export default function FleetShowcase() {
  const [filter, setFilter] = useState<"ALL" | "Sedan" | "SUV">("ALL");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayedCars =
    filter === "ALL" ? FLEET : FLEET.filter((car) => car.category === filter);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Approx width of card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="py-12 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10"
      id="fleet"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            Choose Your Preferred Car Model
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Book individual sedans and SUVs with transparent per-kilometer pricing and professional chauffeurs.
          </p>

          {/* Category Filter Tabs & Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div className="hidden sm:block w-24" /> {/* Spacer for centering */}

            <div className="flex justify-center gap-2">
              {(["ALL", "Sedan", "SUV"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                    filter === type
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {type === "ALL" ? "All Cars" : `${type}s`}
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous Car"
                className="w-10 h-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground text-foreground flex items-center justify-center transition-all shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next Car"
                className="w-10 h-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground text-foreground flex items-center justify-center transition-all shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 py-2 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayedCars.map((car, i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[320px] shrink-0 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Header Tag & Capacity */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded-md">
                      {car.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-primary" /> {car.capacity}
                    </span>
                  </div>

                  <h3 className="text-lg font-black mb-1 group-hover:text-primary transition-colors">
                    {car.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-muted-foreground block mb-3">
                    Class: {car.category}
                  </span>

                  {/* Model Vehicle Image Container */}
                  <div className="relative w-full h-36 rounded-xl bg-muted/40 border border-border/60 overflow-hidden mb-4 flex items-center justify-center">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="320px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Feature Tags */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground mb-4 pb-4 border-b border-border/70">
                    <span className="flex items-center gap-1.5 bg-background px-2 py-1 rounded border border-border/50">
                      <Gauge className="w-3 h-3 text-primary" /> Dual AC
                    </span>
                    <span className="flex items-center gap-1.5 bg-background px-2 py-1 rounded border border-border/50">
                      <Fuel className="w-3 h-3 text-primary" /> Verified Fuel
                    </span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div>
                  <div className="mb-3">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      FARE STARTS FROM
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-foreground">
                        {car.price}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {car.unit}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`${waUrl}&text=${encodeURIComponent(
                      `Hi Chiku Cabs, I want to book the ${car.name} (${car.category}). Please share availability and current rates.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs text-center block hover:opacity-95 shadow-sm transition-all active:scale-[0.98]"
                  >
                    Book {car.name.split(" ")[car.name.split(" ").length - 1]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}