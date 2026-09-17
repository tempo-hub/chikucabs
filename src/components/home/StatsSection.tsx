import React from "react";
import { STATS } from "@/data/chikuData";

export default function StatsSection() {
  return (
    <section className="pt-12 pb-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          {/* <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
            OUR REVIEWS
          </div> */}
          <h2 className="text-3xl md:text-4xl font-black mb-3">What Our Customers Say About Us</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Trusted by thousands of travelers across India. Here&apos;s what they have to say about their experience with Chiku Cabs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-105 transition-transform">
                {stat.num}
              </div>
              <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}