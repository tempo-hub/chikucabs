import React from "react";
import { PhoneCall, MessageSquare, ShieldCheck, Zap, Clock, Sparkles } from "lucide-react";
import { PHONE_NUMBER, PHONE_DISPLAY, waUrl } from "@/data/chikuData";

export default function FinalCta() {
  return (
    <section className="py-6 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-14 text-center cta-banner text-white shadow-2xl relative overflow-hidden border border-white/10">
        {/* Subtle Ambient Backlight */}

        <div className="relative  z-10 max-w-2xl mx-auto">
          {/* Top Badge */}
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#fab017] text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Quick Dispatch & Booking
          </div> */}

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
            Ready to Book Your Ride?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Call now for instant confirmation. Best rates guaranteed across India.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Direct Phone Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold bg-primary hover:bg-primary text-slate-950 flex items-center justify-center gap-2.5 shadow-lg shadow-[#fab017]/20 transition-all active:scale-[0.98] text-sm tracking-wide uppercase"
            >
              <PhoneCall className="w-4 h-4" /> Call {PHONE_DISPLAY}
            </a>

            {/* Direct WhatsApp Message */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/30 transition-all active:scale-[0.98] text-sm tracking-wide uppercase"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>

          
        </div>
      </div>
    </section>
  );
}