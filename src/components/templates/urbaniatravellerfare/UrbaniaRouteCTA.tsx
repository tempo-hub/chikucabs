import React from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

export default function UrbaniaRouteCTA({
  fromCity,
  toCity,
}: Props) {
  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${fromCity} to ${toCity}. Please share the available 12/17 seater options and final fare.`
  );

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Content */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
                <FaCheckCircle />
                Urbania Booking
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Travel from{" "}
                <span className="text-primary">{fromCity}</span> to{" "}
                <span className="text-primary">{toCity}</span>?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Book a comfortable 12 or 17 seater Urbania for your group
                journey. Share your travel details with Chiku Cabs and
                check the current fare and availability.
              </p>

              {/* Quick points */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                {[
                  "12 & 17 Seater",
                  "Chauffeur Driven",
                  "Route Fare",
                  "WhatsApp Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-semibold text-white/70"
                  >
                    <FaCheckCircle className="text-[11px] text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <a
                href="#urbania-booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-extrabold text-white transition hover:bg-primary/90 active:scale-[0.99]"
              >
                Book Urbania
                <FaArrowRight className="text-[10px]" />
              </a>

              <a
                href={`https://wa.me/916280820037?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-xs font-extrabold text-white transition hover:bg-white/15"
              >
                <FaWhatsapp className="text-green-400" />
                WhatsApp Us
              </a>

              <a
                href="tel:+916280820037"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-6 text-xs font-extrabold text-white/70 transition hover:border-white/20 hover:text-white"
              >
                <FaPhoneAlt className="text-[10px]" />
                Call Chiku Cabs
              </a>
            </div>
          </div>

          {/* Bottom route strip */}
          <div className="relative z-10 mt-8 border-t border-white/10 pt-5">
            <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-white/40">
                Urbania Traveller • {fromCity} to {toCity}
              </p>

              <a
                href="#urbania-booking"
                className="font-extrabold text-primary hover:underline"
              >
                Check availability →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}