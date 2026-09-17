import React from "react";
import { ShieldCheck, UserCheck, Stethoscope, Video, KeyRound, Clock8 } from "lucide-react";

export default function SafetyStandards() {
  const PROTOCOLS = [
    {
      icon: UserCheck,
      title: "Police & Identity Verified",
      desc: "Chauffeurs are vetted across regional police registers and local addresses before onboarding.",
    },
    {
      icon: Stethoscope,
      title: "Zero-Alcohol Breathalyzer Checks",
      desc: "Mandatory spot tests and physical fitness evaluations prior to all outstation departures.",
    },
    {
      icon: Video,
      title: "Real-Time Telematics & GPS",
      desc: "Live route tracking shared with dedicated response teams throughout your journey.",
    },
    {
      icon: Clock8,
      title: "Guaranteed Punctual Replacements",
      desc: "Backup vehicle dispatch readiness guaranteed within 45 minutes of any unforeseen mechanical snag.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" /> The Chiku Shield Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Your Physical Safety is Non-Negotiable
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Long-distance highway travel requires higher standards. We eliminate typical taxi-fleet shortcuts through strict driver verification and vehicle telemetry.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-amber-400 font-bold text-sm mb-1">SOS 24/7 Rapid Assistance</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every customer trip profile comes with dynamic GPS sharing links that family members can track in real time.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {PROTOCOLS.map((p, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl">
              <p.icon className="w-6 h-6 text-amber-500 mb-3" />
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}