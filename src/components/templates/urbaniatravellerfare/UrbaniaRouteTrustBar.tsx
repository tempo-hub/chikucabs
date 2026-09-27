import {
  FaCar,
  FaCheckCircle,
  FaRoute,
  FaUserTie,
} from "react-icons/fa";

const TRUST_ITEMS = [
  {
    icon: FaCar,
    title: "12 & 17 Seater",
    text: "Urbania options",
  },
  {
    icon: FaUserTie,
    title: "Professional Driver",
    text: "Experienced chauffeur",
  },
  {
    icon: FaRoute,
    title: "Outstation Travel",
    text: "Route-based booking",
  },
  {
    icon: FaCheckCircle,
    title: "Transparent Fare",
    text: "Clear pricing",
  },
];

export default function UrbaniaRouteTrustBar() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
        {TRUST_ITEMS.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`flex items-center gap-3 px-4 py-4 sm:px-5 sm:py-5 ${
                index < TRUST_ITEMS.length - 1
                  ? "border-r border-slate-100"
                  : ""
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-extrabold text-slate-800">
                  {item.title}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}