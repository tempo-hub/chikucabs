"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function FareCalculatorPlaceholder({ vehicle }: { vehicle: string }) {
  return (
    <section
      className="min-h-[760px] md:min-h-[560px] py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300"
      aria-busy="true"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="section-badge mx-auto">CALCULATE FARE</div>
          <h2 className="section-title">Estimate Your {vehicle} Fare</h2>
          <p className="text-muted-foreground">
            Slide to select distance and get instant price estimate
          </p>
        </div>
        <div
          className="h-[360px] rounded-2xl bg-card/60 animate-pulse"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

const ServiceFareCalculator = dynamic(
  () => import("./ServiceFareCalculator"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[760px] md:min-h-[560px]" aria-busy="true" />
    ),
  },
);

export default function LazyServiceFareCalculator({
  vehicle,
  pricePerKm,
}: {
  vehicle: string;
  pricePerKm: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-[760px] md:min-h-[560px]">
      {shouldLoad ? (
        <ServiceFareCalculator vehicle={vehicle} pricePerKm={pricePerKm} />
      ) : (
        <FareCalculatorPlaceholder vehicle={vehicle} />
      )}
    </div>
  );
}
