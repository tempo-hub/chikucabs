import React from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaCheckCircle,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

interface UrbaniaFinalCTAProps {
  city?: string;
}

export default function UrbaniaFinalCTA({
  city = "Noida",
}: UrbaniaFinalCTAProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${city}. Please share the fare and availability.`
  );

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              {/* CONTENT */}
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-primary sm:text-xs">
                  <FaCheckCircle />
                  Chiku Cabs Urbania Booking
                </div>

                {/* Heading */}
                <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Ready to Book Your
                  <span className="block text-primary">
                    Urbania Traveller?
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  Choose between a 12 Seater or 17 Seater Urbania for your
                  group journey from {city}. Share your travel details with
                  Chiku Cabs and get the applicable fare and availability.
                </p>

                {/* Quick points */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                    <FaUsers className="text-primary" />
                    12 & 17 Seater
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                    <FaCheckCircle className="text-primary" />
                    Driver Included
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                    <FaCheckCircle className="text-primary" />
                    Local & Outstation
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="w-full lg:w-[250px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-center text-xs font-bold text-white/60">
                    Get your Urbania quote
                  </p>

                  <div className="mt-4 grid gap-2.5">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/916280820037?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        min-h-12
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-5
                        text-xs
                        font-extrabold
                        text-white
                        transition
                        hover:bg-primary/90
                      "
                    >
                      <FaWhatsapp />
                      Get Fare on WhatsApp
                    </a>

                    {/* Call */}
                    <a
                      href="tel:+918448445504"
                      className="
                        inline-flex
                        min-h-12
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/15
                        bg-white/10
                        px-5
                        text-xs
                        font-extrabold
                        text-white
                        transition
                        hover:bg-white/15
                      "
                    >
                      <FaPhoneAlt />
                      Call Chiku Cabs
                    </a>
                  </div>

                  <p className="mt-3 text-center text-[10px] leading-4 text-white/35">
                    Share your pickup, destination, date and passenger count.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom route link */}
            <div className="mt-8 border-t border-white/10 pt-5">
              <a
                href="#urbania-fare"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-white/60
                  transition
                  hover:text-primary
                "
              >
                Check Urbania Fare
                <FaArrowRight className="text-[9px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}