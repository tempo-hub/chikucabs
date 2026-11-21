"use client";

import { useState } from "react";

export default function ServiceFareCalculator({
  vehicle,
  pricePerKm,
}: {
  vehicle: string;
  pricePerKm: number;
}) {
  const [distance, setDistance] = useState("50");
  const [estimatedPrice, setEstimatedPrice] = useState(() =>
    Math.round(50 * 1.5 * pricePerKm + 500),
  );

  const calculateFare = (value: string) => {
    const kilometers = Number(value);
    if (Number.isFinite(kilometers) && kilometers > 0) {
      setEstimatedPrice(Math.round(kilometers * 1.5 * pricePerKm + 500));
    } else {
      setEstimatedPrice(0);
    }
  };

  const selectDistance = (kilometers: number) => {
    setDistance(kilometers.toString());
    setEstimatedPrice(kilometers * pricePerKm + 500);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-slate-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="section-badge mx-auto">CALCULATE FARE</div>
          <h2 className="section-title">Estimate Your {vehicle} Fare</h2>
          <p className="text-muted-foreground">
            Slide to select distance and get instant price estimate
          </p>
        </div>

        <div className="premium-card">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold">Distance (in km)</label>
                  <span className="text-2xl font-black text-primary">
                    {distance || 0} km
                  </span>
                </div>
                <input
                  type="range"
                  name="distance"
                  min="0"
                  max="2000"
                  step="10"
                  value={distance}
                  onChange={(event) => setDistance(event.target.value)}
                  onMouseUp={() => calculateFare(distance)}
                  onTouchEnd={() => calculateFare(distance)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0 km</span>
                  <span>500 km</span>
                  <span>1000 km</span>
                  <span>1500 km</span>
                  <span>2000 km</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {[50, 100, 250, 500, 750, 1000].map((kilometers) => (
                  <button
                    key={kilometers}
                    type="button"
                    onClick={() => selectDistance(kilometers)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      Number(distance) === kilometers
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-primary/20"
                    }`}
                  >
                    {kilometers} km
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-muted-foreground text-center bg-muted/30 p-3 rounded-lg">
                <span className="font-semibold">Tip:</span> For distances above
                2000 km, additional charges apply at ₹{pricePerKm}/km
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                  ESTIMATED DISTANCE
                </p>
                <div className="text-5xl md:text-6xl font-black text-primary">
                  {distance
                    ? `${Number(distance).toLocaleString()}`
                    : "---"}
                </div>
                <div className="text-xl font-semibold text-primary/70">KM</div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-5" />

              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                  YOUR ESTIMATED FARE
                </p>
                <div className="text-5xl md:text-7xl font-black text-primary">
                  {estimatedPrice ? `₹${estimatedPrice.toLocaleString()}` : "---"}
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block bg-primary/10 px-4 py-1.5 rounded-full">
                  <span className="text-xs font-bold text-primary tracking-wide">
                    * ONE WAY PRICE
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center mt-5 px-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-muted-foreground">
                    MIN
                  </div>
                  <div className="text-lg font-black">50 KM</div>
                </div>
                <div className="text-primary text-xl">→</div>
                <div className="text-center">
                  <div className="text-sm font-bold text-muted-foreground">
                    MAX
                  </div>
                  <div className="text-lg font-black">2000 KM</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-5 pt-3 border-t border-border">
                *Includes all taxes &amp; driver allowance | No hidden charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
