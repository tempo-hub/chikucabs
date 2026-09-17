import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/chikuData";

// Helper component to render precise full/partial stars
function RatingStars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        // Calculate fill percentage for each individual star
        const fillPercent = Math.max(0, Math.min(100, (score - (starIndex - 1)) * 100));

        return (
          <div key={starIndex} className="relative w-4 h-4">
            {/* Background empty star */}
            <Star className="w-4 h-4 text-slate-200 fill-slate-200" />
            
            {/* Foreground filled star with exact width mask */}
            {fillPercent > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star className="w-4 h-4 text-[#f5a623] fill-[#f5a623]" />
              </div>
            )}
          </div>
        );
      })}
      <span className="ml-1.5 text-xs font-bold text-slate-800">{score.toFixed(1)}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-slate-50/50 border-t border-border" id="reviews">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3 tracking-wider uppercase">
            CUSTOMER REVIEWS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Loved by Thousands of Travelers
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Real feedback from verified travelers booking intercity outstation and airport rides across India.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative shadow-sm"
            >
              <div>
                {/* Header: Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <RatingStars score={review.rating} />
                  <Quote className="w-6 h-6 text-slate-200 fill-slate-100" />
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  &quot;{review.text}&quot;
                </p>
              </div>

              {/* Author Info & Booking Badge */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-black text-xs flex items-center justify-center border border-primary/20">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      {review.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50"  />
                    </div>
                    <div className="text-[11px] font-medium text-slate-400">
                      {review.route} • {review.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}