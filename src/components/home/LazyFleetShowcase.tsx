"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function FleetPlaceholder() {
  return (
    <section
      className="min-h-[760px] md:min-h-[620px] py-12 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10"
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            Choose Your Preferred Car Model
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Book individual sedans and SUVs with transparent per-kilometer
            pricing and professional chauffeurs.
          </p>
        </div>
        <div className="flex gap-6 overflow-hidden" aria-hidden="true">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="w-[280px] sm:w-[320px] h-[390px] shrink-0 rounded-2xl border border-border bg-card/60 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FleetShowcase = dynamic(() => import("./FleetShowcase"), {
  ssr: false,
  loading: FleetPlaceholder,
});

export default function LazyFleetShowcase() {
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
    <div ref={sectionRef} className="min-h-[760px] md:min-h-[620px]">
      {shouldLoad ? <FleetShowcase /> : <FleetPlaceholder />}
    </div>
  );
}
