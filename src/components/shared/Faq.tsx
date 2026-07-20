"use client";
import { useState } from "react";

interface FAQProps {
  vehicle: string;
  city: string;
}

export default function FAQ({ vehicle, city }: FAQProps) {
  const faqs = [
    {
      question: `How can I book a ${vehicle} on rent in ${city}?`,
      answer: `You can book a ${vehicle} on rent in ${city} by choosing a reliable cab service, selecting your travel dates, and confirming your pickup location. Online booking makes the process quick and convenient.`,
    },
    {
      question: `What is the cost of renting a ${vehicle} in ${city}?`,
      answer: `The cost depends on trip duration, distance, and the type of service such as local, outstation, or airport transfer.`,
    },
    {
      question: `What is included in a ${vehicle} rental package in ${city}?`,
      answer: `Most rental packages include a professional driver, pickup and drop service, and depending on the package, fuel, tolls, parking, and driver allowance.`,
    },
    {
      question: `Is ${vehicle} suitable for family travel?`,
      answer: `${vehicle} offers spacious seating, comfortable interiors, and ample luggage space, making it an excellent choice for family trips.`,
    },
    {
      question: `How many passengers can travel in a ${vehicle}?`,
      answer: `A ${vehicle} comfortably accommodates 6 to 7 passengers with luggage.`,
    },
    {
      question: `Can I hire a ${vehicle} for outstation trips from ${city}?`,
      answer: `Yes, you can book a ${vehicle} for outstation trips with flexible travel plans and customized itineraries.`,
    },
    {
      question: `Is ${vehicle} available for airport transfers in ${city}?`,
      answer: `Yes, airport pickup and drop services are available with professional drivers and ample luggage space.`,
    },
    {
      question: `What is the minimum rental duration?`,
      answer: `The minimum rental duration generally starts from 4 to 8 hours for local bookings.`,
    },
    {
      question: `Are tolls and parking charges included?`,
      answer: `Some rental packages include tolls and parking, while others may charge them separately. Please confirm before booking.`,
    },
    {
      question: `Is advance booking recommended?`,
      answer: `Yes, advance booking is recommended, especially during weekends, holidays, and peak travel seasons.`,
    },
    {
      question: `Can I customize my travel itinerary?`,
      answer: `Yes, you can customize your itinerary with multiple stops and flexible travel schedules.`,
    },
    {
      question: `Is a driver included?`,
      answer: `Yes, all rentals include a professional and experienced driver.`,
    },
    {
      question: `What are the benefits of renting a ${vehicle}?`,
      answer: `${vehicle} provides spacious seating, comfort, reliability, and a smooth travel experience for local and outstation journeys.`,
    },
    {
      question: `Is ${vehicle} suitable for long-distance travel?`,
      answer: `Yes, it is designed for comfortable long-distance travel with excellent ride quality.`,
    },
    {
      question: `Does the ${vehicle} have AC and comfortable seats?`,
      answer: `Yes, most vehicles come equipped with air conditioning and comfortable seating for a pleasant journey.`,
    },
    {
      question: `Can I rent a ${vehicle} for corporate travel?`,
      answer: `Yes, it is an ideal option for corporate meetings, office transfers, and business travel.`,
    },
    {
      question: `What documents are required for booking?`,
      answer: `Generally, your name, contact number, and travel details are required. ID verification may also be requested.`,
    },
    {
      question: `Is it safe to travel in a ${vehicle}?`,
      answer: `Yes, the vehicles are driven by experienced chauffeurs and maintained for safe and comfortable travel.`,
    },
    {
      question: `Can I book a ${vehicle} for weddings or events?`,
      answer: `Yes, it is available for weddings, events, family functions, and group transportation.`,
    },
    {
      question: `Is ${vehicle} better than a sedan for group travel?`,
      answer: `Yes, it offers higher seating capacity, more luggage space, and greater comfort than a standard sedan.`,
    },
  ];

//   const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
           <div
            className="section-badge mx-auto"
            style={{ display: "inline-flex" }}
          >
            FAQ
          </div>

          <h2 className="section-title">
            {vehicle} Rental Questions {city !== "India" ? `for ${city}` : ""}
          </h2>
        </div>

        {faqs.map((faq, i) => (
          <details key={i} className="faq-item">
            <summary>
              {faq.question}
              <span className="faq-chevron">▼</span>
            </summary>

            <div className="faq-answer">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}