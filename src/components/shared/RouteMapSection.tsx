"use client";

import { MapPin, ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";

export default function RouteMapSection({
  startCity,
  endCity,
  distance,
  estimatedHours,
}: {
  startCity: string;
  endCity: string;
  distance: number;
  estimatedHours: number;
}) {
  const [showMap, setShowMap] = useState(false);

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${startCity} to ${endCity}`
  )}&output=embed`;

  return (
    <section className="py-24 bg-muted/30 border-y">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <div
            className="section-badge mx-auto"
            style={{ display: "inline-flex" }}
          >
            ROUTE MAP
          </div>

          <h2 className="section-title">
            {startCity} to {endCity} Route Map
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
            View the route map, distance, and travel details for your journey
            from {startCity} to {endCity}.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="premium-card p-8">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              🚖 One Way & Round Trip Available
            </div>

            <h3 className="text-3xl font-black mb-4">
              Travel from {startCity} to {endCity}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Enjoy a safe and comfortable ride with Chiku Cabs. We provide
              affordable one-way cabs, round-trip taxis, airport transfers,
              and premium vehicles on the {startCity} to {endCity} route.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>
                  Distance: <strong>{distance} km</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>
                  Travel Time: <strong>{estimatedHours} Hours</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Verified Drivers & 24/7 Support</span>
              </div>
            </div>

            <a
              href="tel:+918448445504"
              className="btn-primary inline-block mt-8"
            >
              📞 Book Now - 8448445504
            </a>
          </div>

          {/* Right Map */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border bg-background h-[380px]">
              {showMap ? (
                <iframe
                  src={mapUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title={`${startCity} to ${endCity} Route Map`}
                />
              ) : (
                <button
                  onClick={() => setShowMap(true)}
                  className="w-full h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="text-6xl mb-4">🗺️</div>

                  <h3 className="text-2xl font-bold mb-2">
                    View Route Map
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Click to load Google Maps route from {startCity} to{" "}
                    {endCity}
                  </p>

                  <span className="btn-primary">
                    Show Route Map
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}