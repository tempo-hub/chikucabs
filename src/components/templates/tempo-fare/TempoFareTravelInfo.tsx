interface Props {
  city: string;
}

export default function TempoFareTravelInfo({
  city,
}: Props) {
  return (
    <section className="bg-white py-12 text-gray-900 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6">

        <span className="text-sm font-bold uppercase tracking-wider text-primary">
          Travel Information
        </span>

        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          Tempo Traveller Booking in {city}
        </h2>

        <div className="mt-6 space-y-5 text-gray-600 leading-7">
          <p>
            Hire a Tempo Traveller in {city} for comfortable
            group transportation. It is suitable for family
            holidays, sightseeing, weddings, corporate trips
            and outstation journeys.
          </p>

          <p>
            Choose the seating capacity according to your
            group size and travel requirements. Our booking
            process is designed to make group transportation
            simple and convenient.
          </p>
        </div>

      </div>
    </section>
  );
}