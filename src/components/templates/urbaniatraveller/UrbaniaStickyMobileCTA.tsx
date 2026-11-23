"use client";

import React from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaCalendarCheck,
} from "react-icons/fa";

interface UrbaniaStickyMobileCTAProps {
  city?: string;
}

export default function UrbaniaStickyMobileCTA({
  city = "Noida",
}: UrbaniaStickyMobileCTAProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to book an Urbania Traveller from ${city}. Please share the fare and availability.`
  );

  const handleBooking = () => {
    document
      .getElementById("urbania-booking")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  return (
    <div
      className="
        fixed
        inset-x-0
        bottom-0
        z-50
        border-t
        border-slate-200
        bg-white/95
        px-3
        pb-[calc(0.75rem+env(safe-area-inset-bottom))]
        pt-2.5
        shadow-[0_-8px_30px_rgba(15,23,42,0.10)]
        backdrop-blur-md
        lg:hidden
      "
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        {/* Call */}
        <a
          href="tel:+918448445504"
          aria-label="Call Chiku Cabs"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            transition
            active:scale-95
          "
        >
          <FaPhoneAlt className="text-sm" />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/916280820037?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Chiku Cabs on WhatsApp"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-green-500
            text-white
            transition
            active:scale-95
          "
        >
          <FaWhatsapp className="text-lg" />
        </a>

        {/* Main CTA */}
        <button
          type="button"
          onClick={handleBooking}
          className="
            flex
            h-11
            min-w-0
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-4
            text-xs
            font-extrabold
            text-white
            shadow-sm
            transition
            active:scale-[0.98]
          "
        >
          <FaCalendarCheck className="shrink-0 text-xs" />

          <span className="truncate">
            Book Urbania
          </span>
        </button>
      </div>
    </div>
  );
}