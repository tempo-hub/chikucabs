import React from "react";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaWhatsapp,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function UrbaniaRouteFAQ({
  fromCity,
  toCity,
}: Props) {
  const faqs: FAQ[] = [
    {
      question: `What is the fare for an Urbania from ${fromCity} to ${toCity}?`,
      answer: `The estimated Urbania fare depends on the total travel distance and trip requirements. Chiku Cabs uses the applicable route fare to provide an estimated price, while the final fare is confirmed after checking your complete booking details.`,
    },
    {
      question: `Which Urbania options are available for ${fromCity} to ${toCity}?`,
      answer: `Chiku Cabs offers 12 seater and 17 seater Urbania options for group travel. The suitable vehicle depends on your passenger count, luggage and trip requirements.`,
    },
    {
      question: `Can I book an Urbania from ${fromCity} to ${toCity} for a one-way trip?`,
      answer: `Yes. You can enquire about a one-way Urbania journey from ${fromCity} to ${toCity}. Share your travel date, passenger count and pickup details with Chiku Cabs for availability and fare confirmation.`,
    },
    {
      question: `Can I book an Urbania for a round trip?`,
      answer: `Yes. Round-trip bookings can be discussed with Chiku Cabs. Share your pickup location, destination, travel dates and expected return details so the trip can be planned accordingly.`,
    },
    {
      question: `How many passengers can travel in an Urbania?`,
      answer: `The Urbania options on this page are available in 12 seater and 17 seater configurations. Choose the option that matches your group size and luggage requirements.`,
    },
    {
      question: `Is the Urbania chauffeur driven?`,
      answer: `Urbania bookings through Chiku Cabs are arranged as chauffeur-driven group travel. Driver and trip availability should be confirmed when making your booking.`,
    },
    {
      question: `Can I choose my pickup and drop location?`,
      answer: `You can share your preferred pickup and drop locations while making your enquiry. Chiku Cabs can then confirm whether the requested locations can be accommodated for your journey.`,
    },
    {
      question: `How early should I book an Urbania?`,
      answer: `For group travel, it is generally useful to enquire in advance, especially when you have a fixed travel date. This gives Chiku Cabs an opportunity to check the required Urbania size and availability.`,
    },
    {
      question: `How can I book an Urbania from ${fromCity} to ${toCity}?`,
      answer: `Use the booking form on this page to share your name, mobile number, travel date and passenger count. You can then continue the enquiry through WhatsApp with Chiku Cabs.`,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    `Hi Chiku Cabs, I want to enquire about an Urbania Traveller from ${fromCity} to ${toCity}. Please share the fare and availability.`
  );

  return (
    <section
      id="urbania-faq"
      className="px-4 py-12 sm:px-6 lg:px-8 lg:py-12 bg-white/90 border-b border-slate-100"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FaQuestionCircle />
          </div>

          <span className="mt-4 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Frequently Asked Questions
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {fromCity} to {toCity} Urbania FAQs
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Find answers to common questions about Urbania booking,
            capacity, fares and travel arrangements with Chiku Cabs.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-primary/20 hover:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[10px] font-black text-slate-400 transition group-open:bg-primary/10 group-open:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex-1 pr-2 text-sm font-extrabold leading-6 text-slate-900 sm:text-base">
                  {faq.question}
                </span>

                <FaChevronDown className="shrink-0 text-[10px] text-slate-400 transition duration-300 group-open:rotate-180 group-open:text-primary" />
              </summary>

              <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
                <p className="pl-12 text-xs leading-6 text-slate-500 sm:text-sm sm:leading-7">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-center sm:p-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
            Still Have a Question?
          </p>

          <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
            Talk to Chiku Cabs
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-white/50 sm:text-sm">
            Share your route, passenger count and travel date. Our team
            can help you check the suitable Urbania and fare.
          </p>

          <a
            href={`https://wa.me/916280820037?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-extrabold text-white transition hover:bg-primary/90"
          >
            <FaWhatsapp />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}