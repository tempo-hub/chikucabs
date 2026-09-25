const steps = [
  {
    number: "01",
    title: "Select Vehicle",
    text: "Choose the Tempo Traveller according to your group size.",
  },
  {
    number: "02",
    title: "Share Requirement",
    text: "Tell us your pickup location, destination and travel date.",
  },
  {
    number: "03",
    title: "Get Fare",
    text: "Receive the applicable price for your trip.",
  },
  {
    number: "04",
    title: "Confirm Booking",
    text: "Confirm your vehicle and travel details.",
  },
];

export default function TempoFareBookingProcess() {
  return (
    <section className="bg-black/80 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Simple Booking
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Book Your Tempo Traveller
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="text-3xl font-black text-primary">
                {step.number}
              </span>

              <h3 className="mt-5 font-bold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                {step.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}