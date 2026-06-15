import Link from "next/link";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import EEATSection from "@/components/shared/EEATSection";
import { MapPin } from "lucide-react";

interface StatItem {
  num: string;
  label: string;
}

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "918448445504";
const SITE_NAME = "Chiku Cabs";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();

const formatCityName = (cityName: string) => {
  return cityName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

export default function CityCabRoutesTemplate({ city }: { city: string }) {
  const routes =
    cityCabRoutes[city.toLowerCase() as keyof typeof cityCabRoutes] || [];

  const formattedCity = formatCityName(city);

  const services = [
    {
      icon: "🚖",
      title: "Local Sightseeing Taxi",
      desc: `Explore popular attractions, temples, markets, and landmarks with our local sightseeing taxi service in ${formattedCity}.`,
      url: "/local-sightseeing-taxi",
    },
    {
      icon: "🛣️",
      title: "Outstation Cab",
      desc: `Affordable one-way and round-trip outstation taxi service from ${formattedCity} to nearby cities and destinations.`,
      url: "/outstation-cabs",
    },
    {
      icon: "✈️",
      title: "Airport Taxi",
      desc: `24/7 airport pickup and drop taxi service with on-time arrivals and professional drivers.`,
      url: "/airport-taxi",
    },
    {
      icon: "🚐",
      title: "Tempo Traveller",
      desc: `12, 17, 20, and 26-seater Tempo Traveller rentals for family trips, tours, and group travel.`,
      url: "/tempo-traveller-on-rent",
    },
    {
      icon: "➡️",
      title: "One Way Cab",
      desc: `Book one-way taxi services and pay only for your journey without return fare charges.`,
      url: "/one-way-cabs",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="section-badge mb-6">
            🚕{city.toUpperCase()} CAB SERVICE
          </div>

          <h1 className="text-5xl font-black mb-6">
            {formattedCity} Cab Service
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Book local and outstation cab service in {formattedCity}. Affordable
            pricing, verified drivers, 24/7 booking.
          </p>
        </div>
      </section>

      {/* Stats Bar - Professional Version */}
      <section className="pt-24 pb-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">OUR REVIEWS</div>
            <h2 className="section-title">What Our Customers Say About Us</h2>
            <p className="section-subtitle mx-auto">
              Trusted by thousands of travelers across India. Here's what they
              have to say about their experience with Chiku Cabs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.num}
                  </div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide mt-3">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Available Vehicles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our fleet of well-maintained vehicles for your
              outstation trip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vehicle 1 - Dzire */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <img
                  src="/suzuki-dzire.png"
                  alt="Maruti Suzuki Dzire"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Maruti Suzuki Dzire
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>👥 4 Seats</span>
                  <span>🧳 2 Luggage</span>
                  <span>❄️ AC</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary">₹10</span>
                  <span className="text-gray-500">/km</span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            {/* Vehicle 2 - Amaze */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <img
                  src="/honda-amaze.png"
                  alt="Honda Amaze"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Honda Amaze
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>👥 4 Seats</span>
                  <span>🧳 3 Luggage</span>
                  <span>❄️ AC</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary">₹10</span>
                  <span className="text-gray-500">/km</span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            {/* Vehicle 3 - Ertiga */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <img
                  src="/maruti-ertiga.png"
                  alt="Maruti Ertiga"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Maruti Ertiga
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>👥 7 Seats</span>
                  <span>🧳 3 Luggage</span>
                  <span>❄️ AC</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary">₹13</span>
                  <span className="text-gray-500">/km</span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            {/* Vehicle 4 - Innova Crysta */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <img
                  src="/innova-crysta.png"
                  alt="Toyota Innova Crysta"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Toyota Innova Crysta
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>👥 7 Seats</span>
                  <span>🧳 4 Luggage</span>
                  <span>❄️ AC | Premium</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary">₹16</span>
                  <span className="text-gray-500">/km</span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Chiku Cabs for One Way */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY CHOOSE US
            </div>
            <h2 className="section-title">
              Why Choose Chiku Cabs for One Way Taxi Service?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💰",
                title: "Pay Only One Side",
                desc: "Don't pay for the driver's empty return trip. Our one-way dropping service saves you up to 50% on your fare.",
              },
              {
                icon: "🚪",
                title: "Door-to-Door Service",
                desc: `We pick you up from your doorstep in ${city} and drop you exactly at your destination.`,
              },
              {
                icon: "👨‍✈️",
                title: "Expert Outstation Drivers",
                desc: "Our chauffeurs are highly trained in highway driving, ensuring a safe, smooth, and timely intercity journey.",
              },
              {
                icon: "🚗",
                title: "Dedicated Premium Fleet",
                desc: "We use only well-maintained, newer model cars equipped with dual AC and GPS tracking for intercity drops.",
              },
              {
                icon: "🚫",
                title: "Zero Cancellation Fee",
                desc: "Plans changed? No worries. Cancel your one-way cab up to 24 hours before pickup at absolutely no extra charge.",
              },
              {
                icon: "📞",
                title: "24/7 Journey Support",
                desc: "Our command center monitors your intercity trip from start to finish, ready to help with any request.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card group">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl"
                  style={{ background: "hsla(45,90%,50%,0.1)" }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="py-24 px-4 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              SERVICES
            </div>

            <h2 className="section-title">
              Cab Services Available in {formattedCity}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link
                key={i}
                href={service.url}
                className="premium-card block hover:scale-[1.02] transition-transform"
              >
                <div className="text-4xl mb-4">{service.icon}</div>

                <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                <p className="text-muted-foreground">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="py-24 px-4 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Popular Cab Routes from {formattedCity}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route, i) => (
              <Link key={i} href={route.url} className="route-card">
                <div className="route-card-icon">🚕</div>

                <div>
                  <div className="font-bold">
                    {route.from} to {route.to}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {route.distance} KM
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOURIST PLACES */}
      <section className="py-24 px-4 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              TOURIST DESTINATIONS
            </div>

            <h2 className="section-title">
              Popular Places to Visit in {formattedCity}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Airport",
              "Railway Station",
              "Temple",
              "Shopping Market",
              "Bus Stand",
              "Tourist Attractions",
              "Hotels",
              "Corporate Offices",
            ].map((place, i) => (
              <div key={i} className="premium-card text-center">
                <div className="flex justify-center items-center text-4xl mb-4">
                  <MapPin />
                </div>

                <h3 className="font-bold text-lg">
                  {formattedCity} {place}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AIRPORT TAXI */}
      <section className="bg-muted/30 py-24 px-4 border-y">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              AIRPORT TRANSFER
            </div>

            <h2 className="section-title">
              Airport Taxi Service in {formattedCity}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✈️",
                title: "Airport Pickup",
              },
              {
                icon: "🚖",
                title: "Airport Drop",
              },
              {
                icon: "🕒",
                title: "24/7 Availability",
              },
            ].map((item, i) => (
              <div key={i} className="premium-card text-center">
                <div className="text-5xl mb-4">{item.icon}</div>

                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="bg-muted/20 py-24 px-4 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              REVIEWS
            </div>

            <h2 className="section-title">What Customers Say About Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul Sharma",
                review:
                  "Excellent cab service. Driver was polite and car was clean.",
              },
              {
                name: "Priya Verma",
                review: "Best outstation taxi service with affordable pricing.",
              },
              {
                name: "Amit Singh",
                review:
                  "Professional drivers and smooth airport pickup experience.",
              },
            ].map((review, i) => (
              <div key={i} className="premium-card">
                <div className="text-yellow-500 mb-4">★★★★★</div>

                <p className="text-muted-foreground mb-4">"{review.review}"</p>

                <div className="font-bold">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>
            <h2 className="section-title">
              Cab Rental Questions{" "}
              {city !== "India" ? `for ${formattedCity}` : ""}
            </h2>
          </div>
          {[
            {
              q: `How can I book a cab in ${formattedCity}?`,
              a: `You can easily book a cab in ${formattedCity} by calling or WhatsApping Chiku Cabs. We provide instant confirmation for local, airport, and outstation rides.`,
            },

            {
              q: `Do you provide airport taxi service in ${formattedCity}?`,
              a: `Yes, we offer 24/7 airport pickup and drop taxi service in ${formattedCity} with professional drivers and on-time pickups.`,
            },

            {
              q: `What are the cab charges in ${formattedCity}?`,
              a: `Cab fares in ${formattedCity} start from ₹10/km for suzuki dzire cars. Pricing depends on vehicle type, route, tolls, and travel duration.`,
            },

            {
              q: `Which vehicles are available for booking in ${formattedCity}?`,
              a: `We provide Dzire, Amaze, Ertiga, Innova Crysta, Tempo Traveller, and luxury vehicles for local sightseeing, airport transfer, and outstation travel.`,
            },

            {
              q: `Are your drivers verified and experienced?`,
              a: `Yes, all Chiku Cabs drivers are police verified, trained, and experienced for both city and highway driving.`,
            },

            {
              q: `Can I book a one way cab from ${formattedCity}?`,
              a: `Yes, we provide affordable one way cab service from ${formattedCity} to nearby cities with transparent pricing and no hidden charges.`,
            },

            {
              q: `Do you provide cab service for weddings and corporate travel?`,
              a: `Yes, Chiku Cabs offers wedding transportation, employee transport, event travel, and corporate cab rental services in ${formattedCity}.`,
            },

            {
              q: `Why should I choose Chiku Cabs in ${formattedCity}?`,
              a: `Chiku Cabs offers clean vehicles, fixed pricing, GPS tracking, verified drivers, 24/7 support, and reliable cab service trusted by thousands of customers.`,
            },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>
                {faq.q}
                <span className="faq-chevron">▼</span>
              </summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-12 border-y">
        <div className="flex flex-wrap justify-center gap-12 opacity-60">
          {[
            "🛡️ SafeTravels Certified",
            "📋 ISO 9001:2015",
            `⭐ Top Rated ${currentYear}`,
            "🌿 Eco Friendly Fleet",
          ].map((badge, i) => (
            <span
              key={i}
              className="font-bold text-sm uppercase tracking-widest"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-black mb-6">
            Book Your Cab in {formattedCity} Today
          </h2>

          <p className="text-muted-foreground text-lg mb-8">
            Affordable fares, verified drivers, and 24/7 support.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="btn-primary text-xl px-12 py-5 shadow-2xl"
            >
              📞 Call {PHONE_NUMBER}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105 shadow-lg"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <EEATSection city={formattedCity} vehicle="Cab" />
    </div>
  );
}
