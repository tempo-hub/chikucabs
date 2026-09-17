import React from "react";
import { ShieldCheck, Car, Award, RefreshCw } from "lucide-react";

export default function TrustProtocols() {
  const PILLARS = [
    {
      icon: ShieldCheck,
      title: "Police Clearance Verification",
      desc: "Drivers are cleared through active background identification checks.",
    },
    {
      icon: Car,
      title: "Rigorous Vehicle Checkpoints",
      desc: "Every car passes multi-point checks including AC cooling, brakes, and tyre condition.",
    },
    {
      icon: RefreshCw,
      title: "Guaranteed Punctual Cab Switch",
      desc: "Immediate backup vehicle replacement is scheduled in case of an unforeseen breakdown.",
    },
    {
      icon: Award,
      title: "100% Guaranteed AC Outstation Trips",
      desc: "Enjoy clean, non-smoking cabins maintained with constant air purification.",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10 overflow-hidden">
      {/* Background Cityscape/Terrace Image */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      {/* Soft gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Left-Aligned Bold Header */}
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Benefits To Book Cab With Us
          </h2>
        </div>

        {/* 4-Card White Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-start min-h-[260px]"
              >
                {/* Thin outline icon */}
                <div className="mb-6 text-slate-900">
                  <Icon className="w-10 h-10 stroke-[1.5] text-slate-900" />
                </div>

                {/* Card Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}