import React from "react";
import { PhoneCall, CarFront, CheckCircle2, ArrowRight } from "lucide-react";
import { PHONE_DISPLAY } from "@/data/chikuData";

export default function HowItWorks() {
  const STEPS = [
    {
      num: "01",
      icon: PhoneCall,
      title: "Call or WhatsApp",
      desc: `Reach us at ${PHONE_DISPLAY} with your pickup, destination, and date. That's it!`,
      highlight: "Instant response",
    },
    {
      num: "02",
      icon: CarFront,
      title: "Choose Your Ride",
      desc: "Pick from Sedan, SUV, Innova, Tempo Traveller or Bus. We'll suggest the best fit.",
      highlight: "Customized quote",
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: "Sit Back & Enjoy",
      desc: "Verified driver arrives at your doorstep, on time. Track your ride in real-time.",
      highlight: "Doorstep pickup",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10 py-12 px-4 relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6">
          {/* <div className="inline-block px-3.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            HOW IT WORKS
          </div> */}
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground tracking-tight">
            HOW IT WORKS
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Book Your Ride in 60 Seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-2xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Background Large Step Number */}
                {/* <span className="absolute top-4 right-5 text-4xl font-black text-muted/30 select-none group-hover:text-primary/15 transition-colors">
                  {step.num}
                </span> */}

                <div>
                  {/* Step Icon Badge */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110  group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-2 py-0.5 rounded-sm inline-block mb-3">
                    {step.highlight}
                  </span>

                  <h3 className="text-xl font-bold mb-2.5 text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Progress Connector Indicator */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-border items-center justify-center text-muted-foreground z-20 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}