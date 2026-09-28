import {
  FaClock,
  FaMapMarkerAlt,
  FaRoute,
} from "react-icons/fa";

interface Props {
  fromCity: string;
  toCity: string;
  distance?: number;
  duration?: string;
}

export default function UrbaniaRouteOverview({
  fromCity,
  toCity,
  distance,
  duration,
}: Props) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-12 bg-white/90 border-b border-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
              Route Overview
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {fromCity} to {toCity} by Urbania Traveller
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Travel between {fromCity} and {toCity} with Chiku
              Cabs in a comfortable Force Urbania Traveller.
              Choose a 12 or 17 seater depending on your group
              size and travel requirements.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Urbania is suitable for family trips, pilgrimage
              journeys, group tours, corporate travel and
              long-distance outstation travel.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="grid gap-3">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Route
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    {fromCity} → {toCity}
                  </p>
                </div>
              </div>

              {distance && (
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaRoute />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Approx. Distance
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      {distance} KM
                    </p>
                  </div>
                </div>
              )}

              {duration && (
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Estimated Journey
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      {duration}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}