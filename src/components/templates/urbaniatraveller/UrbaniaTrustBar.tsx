import React from "react";
import {
  FaShieldAlt,
  FaUserTie,
  FaRupeeSign,
  FaHeadset,
} from "react-icons/fa";

interface UrbaniaTrustBarProps {
  city?: string;
}

const TRUST_ITEMS = [
  {
    icon: FaShieldAlt,
    title: "Verified Urbania",
    description: "Clean & well-maintained vehicles",
  },
  {
    icon: FaUserTie,
    title: "Professional Drivers",
    description: "Experienced & verified chauffeurs",
  },
  {
    icon: FaRupeeSign,
    title: "Transparent Fare",
    description: "Clear pricing with no surprises",
  },
  {
    icon: FaHeadset,
    title: "24×7 Support",
    description: "Quick assistance whenever you need",
  },
];

export default function UrbaniaTrustBar({
  city = "Noida",
}: UrbaniaTrustBarProps) {
  return (
    <section className="relative z-10 -mt-6 px-4 sm:-mt-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-[0_15px_45px_rgba(15,23,42,0.10)]
          "
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 md:grid-cols-4 md:divide-y-0">
            {TRUST_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    flex
                    min-h-[112px]
                    items-center
                    gap-3
                    px-4
                    py-5
                    transition
                    hover:bg-slate-50
                    sm:px-6
                    lg:px-7
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                      transition
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    <Icon className="text-base" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="text-xs font-extrabold text-slate-900 sm:text-sm">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}