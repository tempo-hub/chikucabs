"use client";

import React, { useState } from "react";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaWhatsapp,
} from "react-icons/fa";

interface UrbaniaFAQProps {
  city?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS = (city: string): FAQItem[] => [
  {
    question: `Can I book a 12 Seater Urbania in ${city}?`,
    answer:
      `Yes. You can request a 12 Seater Urbania from ${city} through Chiku Cabs. Share your pickup location, destination and travel date with our team to check availability and get the applicable fare.`,
  },
  {
    question: `Can I book a 17 Seater Urbania from ${city}?`,
    answer:
      `Yes. Chiku Cabs accepts booking enquiries for a 17 Seater Urbania. It can be suitable for larger family groups, corporate groups, events and outstation journeys.`,
  },
  {
    question: "How much does an Urbania Traveller cost?",
    answer:
      "Urbania fare depends on factors such as vehicle capacity, pickup location, destination, distance, travel date and trip type. Contact Chiku Cabs with your route details to receive the applicable fare.",
  },
  {
    question: "Is Urbania available with a driver?",
    answer:
      "Yes. Urbania Traveller bookings through Chiku Cabs are arranged with a driver. Share your journey details with the booking team so the vehicle and driver availability can be confirmed.",
  },
  {
    question: "Can I book an Urbania for an outstation trip?",
    answer:
      "Yes. You can enquire about Urbania for outstation journeys, one-way trips, round trips and group tours. Share your complete route and travel dates for a suitable quotation.",
  },
  {
    question: "Which Urbania should I choose: 12 seater or 17 seater?",
    answer:
      "The choice mainly depends on your passenger count and luggage requirements. A 12 Seater can suit a smaller group, while a 17 Seater provides additional passenger capacity for larger groups.",
  },
  {
    question: "Can I book Urbania for weddings and events?",
    answer:
      "Yes. Urbania can be requested for group transportation during weddings, functions, corporate events and other occasions. Contact Chiku Cabs with your event schedule and locations.",
  },
  {
    question: "Can I book an Urbania for airport transfers?",
    answer:
      "Yes. You can request an Urbania for airport pickup or drop with your group and luggage. Provide your airport, pickup location, flight timing and passenger count when enquiring.",
  },
  {
    question: "How do I book an Urbania with Chiku Cabs?",
    answer:
      "Share your pickup location, destination, travel date, passenger count and preferred Urbania size. Chiku Cabs can then help you check availability and provide the applicable fare before confirmation.",
  },
];

export default function UrbaniaFAQ({
  city = "Noida",
}: UrbaniaFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = FAQS(city);

  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to enquire about booking a ${city} Urbania Traveller. Please share the fare and availability.`
  );

  return (
    <section
      id="urbania-faq"
      className="bg-white/90 px-4 py-12 sm:px-6 sm:py-12 lg:px-8 lg:py-12 border-b border-slate-100"
    >
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <FaQuestionCircle className="text-[11px]" />
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Urbania Traveller FAQs
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Find answers to common questions about booking a 12 or 17 Seater
            Urbania Traveller from {city} with Chiku Cabs.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition
                  duration-300
                  ${
                    isOpen
                      ? "border-primary/25 shadow-sm"
                      : "border-slate-200"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="
                    flex
                    min-h-16
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-4
                    py-4
                    text-left
                    sm:px-5
                  "
                >
                  <span
                    className={`
                      text-sm
                      font-extrabold
                      leading-6
                      sm:text-base
                      ${
                        isOpen
                          ? "text-primary"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition
                      ${
                        isOpen
                          ? "rotate-180 bg-primary text-white"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    <FaChevronDown className="text-[10px]" />
                  </span>
                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5">
                      <p className="text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Still have a question?
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Send your pickup, destination and passenger details to Chiku
                Cabs and we'll help you with your Urbania enquiry.
              </p>
            </div>

            <a
              href={`https://wa.me/916280820037?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                min-h-11
                shrink-0
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
              Ask Chiku Cabs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}