import React from "react";
import {
  Banknote,
  PhoneCall,
  Smile,
  ShieldCheck,
  MapPin,
  Car,
  type LucideIcon,
} from "lucide-react";
import { REASONS } from "@/data/chikuData";

// Icon mapping to ensure exact relatable icons for all reasons
const ICON_MAP: Record<string, LucideIcon> = {
  "Transparent Pricing": Banknote,
  "24/7 Availability": PhoneCall,
  "Verified Chauffeurs": ShieldCheck,
  "Live GPS Tracking": MapPin,
  "Free Cancellation": Smile,
  "Premium Fleet": Car,
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10bg-[#fbf3d5] border-y border-[#f0e4b8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-white/70 text-slate-800 text-xs font-bold rounded-full mb-3 tracking-wider uppercase border border-slate-200/50">
            WHY CHIKU CABS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Why 1 Lakh+ Travelers Trust Us
          </h2>
        </div>

        {/* Floating Diamond Badge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 pt-4">
          {REASONS.map((reason, i) => {
            const IconComponent = ICON_MAP[reason.title] || ShieldCheck;

            return (
              <div
                key={i}
                className="relative bg-slate-100x  pt-14 pb-8 px-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-start"
              >
                {/* Blue Diamond Badge Floating on Top Center */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#1e73e8] rotate-45 flex items-center justify-center shadow-md">
                  {/* Counter-rotate the icon so it remains straight */}
                  <IconComponent className="w-6 h-6 text-white -rotate-45 stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}