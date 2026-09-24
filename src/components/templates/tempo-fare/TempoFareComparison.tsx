import { Check, X } from "lucide-react";

interface Props {
  city: string;
}

const comparisonRows = [
  "Transparent per-km pricing",
  "Experienced & verified drivers",
  "24/7 trip support",
  "AC & well-maintained vehicles",
  "No hidden charges at trip end",
  "Free cancellation up to 24 hrs",
  "Instant WhatsApp booking",
  "Multiple seater options (9-26)",
];

export default function TempoFareComparison({
  city,
}: Props) {
  return (
    <section className="bg-[#f8fafc] py-12 md:py-12 border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-1.5 text-sm font-bold text-primary">
            <span>♧</span>
            Comparison
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#19283e] md:text-4xl">
            YatraTempoTraveller vs Others in
            <br />
            <span className="text-[#19283e]">{city}</span>
          </h2>

          <p className="mt-2 text-xs text-[#64748b]">
            See why 500+ groups choose us over local operators.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-[#dfe5ec] bg-white shadow-[0_8px_25px_rgba(25,40,62,0.05)]">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">

              <thead>
                <tr className="h-8 border-b border-[#dfe5ec]">
                  <th className="w-[38%] px-3 text-left text-sm font-bold uppercase text-[#475569]">
                    Feature
                  </th>

                  <th className="w-[34%] border-l border-r border-[#f4d9c8] bg-[#fff1e8] px-3 text-center text-sm font-extrabold uppercase text-primary">
                    YatraTempoTraveller
                  </th>

                  <th className="w-[28%] px-3 text-center text-sm font-bold uppercase text-[#475569]">
                    Other Operators
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((feature) => (
                  <tr
                    key={feature}
                    className="h-8 border-b border-[#dfe5ec] last:border-b-0"
                  >
                    {/* Feature */}
                    <td className="px-3 py-2 text-xs font-medium text-[#19283e]">
                      {feature}
                    </td>

                    {/* Chiku / Yatra */}
                    <td className="border-l border-r border-[#f4d9c8] bg-[#fff7f2] px-3 py-2 text-center">
                      <span className="mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e]">
                        <Check
                          size={10}
                          strokeWidth={3}
                          className="text-white"
                        />
                      </span>
                    </td>

                    {/* Others */}
                    <td className="px-3 py-2 text-center">
                      <span className="mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#edf2f7]">
                        <X
                          size={9}
                          strokeWidth={2.5}
                          className="text-[#94a3b8]"
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
}