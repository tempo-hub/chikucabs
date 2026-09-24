interface Props {
  city: string;
}

export default function TempoFareFAQs({
  city,
}: Props) {
  const faqs = [
    {
      q: `What is the Tempo Traveller fare in ${city}?`,
      a: `The price depends on the seating capacity, travel distance, package and trip requirements.`,
    },
    {
      q: `Which Tempo Traveller sizes are available in ${city}?`,
      a: `Different seating options are available, including 9, 12, 16, 20 and 24 seaters.`,
    },
    {
      q: `Can I book a Tempo Traveller from ${city} for an outstation trip?`,
      a: `Yes. Tempo Travellers can be booked for suitable outstation and group travel requirements.`,
    },
    {
      q: `How can I book a Tempo Traveller in ${city}?`,
      a: `Share your travel requirement and group size to receive the applicable fare and booking details.`,
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