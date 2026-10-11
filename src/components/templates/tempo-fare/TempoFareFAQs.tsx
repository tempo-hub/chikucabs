interface Props {
  city: string;
}

export default function TempoFareFAQs({
  city,
}: Props) {
  const faqs = [
    {
    q: `What is the Tempo Traveller fare in ${city}?`,
    a: `The Tempo Traveller fare in ${city} depends on the seating capacity, travel distance, trip duration, route, vehicle type and package selected. Share your travel details with Chiku Cabs to get the applicable fare.`,
  },
  {
    q: `Which Tempo Traveller sizes are available in ${city}?`,
    a: `Different seating options are available depending on vehicle availability, including 9, 12, 16, 20 and 24-seater Tempo Travellers. You can choose a suitable vehicle based on your group size and luggage.`,
  },
  {
    q: `How is the Tempo Traveller fare calculated?`,
    a: `Tempo Traveller fares are calculated based on factors such as vehicle seating capacity, total travel distance, trip duration, route, package and applicable travel charges. The final fare is confirmed according to your itinerary.`,
  },
  {
    q: `Can I book a Tempo Traveller from ${city} for an outstation trip?`,
    a: `Yes. You can book a Tempo Traveller from ${city} for outstation trips, family travel, group tours, corporate journeys, weddings and other long-distance travel requirements.`,
  },
  {
    q: `Can I book a one-way Tempo Traveller from ${city}?`,
    a: `Yes. One-way Tempo Traveller bookings are available from ${city} to selected destinations. The applicable fare depends on the destination, distance, vehicle capacity and travel requirements.`,
  },
  {
    q: `Is Tempo Traveller available for round trips from ${city}?`,
    a: `Yes. Tempo Travellers can be booked for round trips from ${city}. Round-trip fares depend on the total distance, number of travel days, vehicle type, route and trip requirements.`,
  },
  {
    q: `Can I book a Tempo Traveller for local sightseeing in ${city}?`,
    a: `Yes. Tempo Travellers are suitable for local sightseeing and city tours in ${city}. You can choose a vehicle based on your group size and select an applicable hourly or kilometer-based package.`,
  },
  {
    q: `What is included in the Tempo Traveller fare?`,
    a: `The fare depends on the selected package and route. Vehicle charges, fuel and driver charges may be included, while tolls, parking, permits, entry tickets and other applicable charges can vary according to the trip.`,
  },
  {
    q: `How can I get a Tempo Traveller fare quote in ${city}?`,
    a: `Share your pickup location, destination, travel date, trip duration and group size with Chiku Cabs. Our team can provide the applicable Tempo Traveller fare and booking details for your itinerary.`,
  },
  {
    q: `How can I book a Tempo Traveller in ${city}?`,
    a: `You can book a Tempo Traveller by contacting Chiku Cabs through the website, phone or WhatsApp. Share your travel requirement and group size to receive the applicable fare and booking details.`,
  },
  ];

  return (
    <section className="bg-white py-16 text-gray-900 border-b border-slate-300">
      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            FAQs
          </span>

          <h2 className="mt-3 text-3xl font-black">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-gray-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none font-bold">
                {faq.q}
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}