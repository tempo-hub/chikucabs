import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Navigation,
  ArrowRightCircle,
  Plane,
  MapPin,
  Users,
  Car,
  Bus,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/data/chikuData";

const ICON_MAP: Record<string, LucideIcon> = {
  navigation: Navigation,
  "arrow-right-circle": ArrowRightCircle,
  plane: Plane,
  "map-pin": MapPin,
  users: Users,
  car: Car,
  bus: Bus,
  sparkles: Sparkles,
};

export default function ServicesGrid() {
  return (
    <section className="py-12 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10 " id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black mb-2">Services We Offer</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Everything You Need, One Call Away
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const IconComponent = ICON_MAP[service.iconName] || Car;

            return (
              <Link
                key={i}
                href={service.href}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* High-visibility icon container with border & hover reaction */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                      border: `1.5px solid ${service.color}35`,
                    }}
                  >
                    <IconComponent className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </div>

                <span className="text-primary text-xs font-bold flex items-center gap-1.5 mt-auto">
                  Explore{" "}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}