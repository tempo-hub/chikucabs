import Link from "next/link";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import EEATSection from "@/components/shared/EEATSection";
import { MapPin } from "lucide-react";

const formatCityName = (cityName: string) => {
  return cityName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function CityCabRoutesTemplate({ city }: { city: string }) {
  const routes =
    cityCabRoutes[city.toLowerCase() as keyof typeof cityCabRoutes] || [];

  const formattedCity = formatCityName(city);

  const services = [
    {
      icon: "🏙️",
      title: "Local Cab Service",
      desc: `Book local taxi service in ${formattedCity} for daily travel and city rides.`,
      url: "/local-cab-service",
    },
    {
      icon: "✈️",
      title: "Airport Transfer",
      desc: `24/7 airport pickup and drop taxi service in ${formattedCity}.`,
      url: "/airport-taxi",
    },
    {
      icon: "🛣️",
      title: "Outstation Cab",
      desc: `Affordable one way and round trip outstation taxi service.`,
      url: "/outstation-cabs",
    },
    {
      icon: "💼",
      title: "Corporate Cab",
      desc: `Reliable employee and corporate transportation solutions.`,
      url: "/corporate-cab-service",
    },
    {
      icon: "💍",
      title: "Wedding Car Rental",
      desc: `Luxury and premium cars for weddings and events.`,
      url: "/wedding-car-rental",
    },
    {
      icon: "🚐",
      title: "Tempo Traveller",
      desc: `12 to 26 seater Tempo Traveller booking for group trips.`,
      url: "/tempo-traveller-on-rent",
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

      {/* Stats Bar */}
      <section className="border-y py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "800+", label: "Monthly Group Trips" },
              { num: "₹2M+", label: "Group Savings" },
              { num: "4.9/5", label: "Google Rating" },
              { num: "Verified", label: "Local Drivers" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              ONE WAY FARES
            </div>
            <p className="section-subtitle mx-auto">
              Transparent per kilometer pricing. No return journey charges.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Executive Sedan",
                model: "Dzire, Etios",
                price: "₹9/km",
                bags: "2 Bags",
                seats: "4+1 Seats",
                icon: "🚘",
                popular: false,
              },
              {
                name: "Premium SUV",
                model: "Ertiga, Marazzo",
                price: "₹12/km",
                bags: "4 Bags",
                seats: "6+1 Seats",
                icon: "🚙",
                popular: true,
              },
              {
                name: "Luxury Innova",
                model: "Innova Crysta",
                price: "₹15/km",
                bags: "4 Bags",
                seats: "7+1 Seats",
                icon: "✨",
                popular: false,
              },
              {
                name: "Tempo Traveller",
                model: "Force 12S/16S",
                price: "₹18-20/km",
                bags: "8+ Bags",
                seats: "12-16 Seats",
                icon: "🚐",
                popular: false,
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`package-card ${pkg.popular ? "popular" : ""}`}
              >
                {pkg.popular && (
                  <div className="package-badge">Most Popular</div>
                )}
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  {pkg.icon}
                </div>
                <h3 className="text-lg font-black mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {pkg.model}
                </p>
                <div
                  className="package-price"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {pkg.price}
                </div>
                <div className="package-unit">Base Rate</div>
                <ul className="package-features">
                  <li>
                    <span className="text-green-500">✔</span> {pkg.seats}
                  </li>
                  <li>
                    <span className="text-green-500">✔</span> {pkg.bags}{" "}
                    Capacity
                  </li>
                  <li>
                    <span className="text-green-500">✔</span> AC & Music System
                  </li>
                  <li>
                    <span className="text-green-500">✔</span> Driver Allowance
                    Included
                  </li>
                </ul>
                <a
                  href="tel:+918448445504"
                  className="btn-primary w-full py-3 text-sm"
                  style={{ display: "block", textAlign: "center" }}
                >
                  Book Now
                </a>
              </div>
            ))}
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

      {/* Inclusions vs Exclusions */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              TRANSPARENCY
            </div>
            <h2 className="section-title">What's Included in Your Fare?</h2>
          </div>
          <div className="incl-excl-grid">
            <div className="incl-card">
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: "#16a34a" }}
              >
                ✅ Included
              </h3>
              {[
                "Base Fare for One Way Trip",
                "Driver Allowance (Batta)",
                "Fuel Charges",
                "GST (5%)",
                "Night Driving Charges (if applicable)",
                "State Permit Fees",
              ].map((item, i) => (
                <div key={i} className="incl-item">
                  <span className="text-green-500">✔</span> {item}
                </div>
              ))}
            </div>
            <div className="excl-card">
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: "#dc2626" }}
              >
                ❌ Not Included
              </h3>
              {[
                "Toll Taxes (as per actuals at booths)",
                "Parking Fees (if stopped at tourist spots)",
                "Extra KM (if route changed)",
                "Waiting Charges (if delayed during pickup)",
                "Meals for Driver",
              ].map((item, i) => (
                <div key={i} className="excl-item">
                  <span style={{ color: "#dc2626" }}>✗</span> {item}
                </div>
              ))}
            </div>
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

      {/* CTA SECTION */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="premium-card text-center">
            <div className="text-5xl mb-6">🚖</div>

            <h2 className="text-4xl font-black mb-6">
              Book Your Cab in {formattedCity} Today
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Affordable fares, verified drivers, and 24/7 support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+918448445504" className="btn-primary px-8 py-4">
                📞 Call Now
              </a>

              <a
                href="https://wa.me/918448445504"
                target="_blank"
                className="btn-secondary px-8 py-4"
              >
                💬 WhatsApp Booking
              </a>
            </div>
          </div>
        </div>
      </section>

      <EEATSection city={formattedCity} vehicle="Cab" />

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
              a: `Cab fares in ${formattedCity} start from ₹9/km for sedan cars. Pricing depends on vehicle type, route, tolls, and travel duration.`,
            },

            {
              q: `Which vehicles are available for booking in ${formattedCity}?`,
              a: `We provide Sedan, SUV, Innova Crysta, Tempo Traveller, and luxury vehicles for local sightseeing, airport transfer, and outstation travel.`,
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
    </div>
  );
}
