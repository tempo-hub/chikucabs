"use client";
import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import StatsBar from "../shared/StatsBar";
import PopularCities from "../shared/PopularCities";
import LocalDominance from "../shared/LocalDominance";
import FAQ from "@/components/shared/Faq";
import { useState } from "react";

const services = [
  {
    id: "airport",
    image: "/Innova/airport.png",
    title: "Airport Transfers",
    description:
      "Enjoy hassle-free airport pickup and drop services with professional chauffeurs. We monitor flight timings and ensure timely pickups with enough luggage space for families and groups.",
    features: [
      "24×7 Service",
      "Flight Tracking",
      "Extra Luggage Space",
    ],
  },
  {
    id: "wedding",
    image: "/Innova/wedding.png",
    title: "Wedding Travel",
    description:
      "Book premium Innova rentals for weddings, guest transportation, baraat processions, and family functions. Travel comfortably while making every celebration memorable.",
    features: [
      "Guest Transfers",
      "Luxury Experience",
      "Decor Friendly",
    ],
  },
  {
    id: "corporate",
    image: "/Innova/corporate.png",
    title: "Corporate Travel",
    description:
      "Professional transportation for business meetings, airport transfers, conferences, client visits, and executive travel with punctual drivers.",
    features: [
      "Executive Service",
      "GST Invoice",
      "Professional Drivers",
    ],
  },
  {
    id: "vacation",
    image: "/Innova/pilgrimage.png",
    title: "Vacations",
    description:
      "Enjoy vacations, sightseeing, and weekend getaways with spacious seating, ample luggage space, and comfortable rides for the entire family.",
    features: [
      "Large Boot Space",
      "Comfort Seats",
      "Weekend Trips",
    ],
  },
  {
    id: "hill",
    image: "/Innova/hill.png",
    title: "Hill Station",
    description:
      "Plan memorable road trips to Shimla, Manali, Mussoorie, Nainital, Ooty, and more with experienced drivers and comfortable seating for long journeys.",
    features: [
      "Experienced Drivers",
      "Long Distance",
      "Safe Journey",
    ],
  },
];



export default function InnovaServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const city = parsedData.origin || "India";
  const [activeService, setActiveService] = useState(services[0]);
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20 pb-28 px-4 text-slate-950 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-white" />
        <div className="relative max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.4fr_1.2fr] items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_40px_80px_rgba(15,23,42,0.08)]">
            <div className="section-badge inline-flex mb-6 text-slate-950">
              ✨ PREMIUM INNOVA RENTAL
            </div>
            <div className="flex flex-wrap gap-3 mb-8 text-sm text-slate-600">
              {[
                "Music System",
                "Recliner Seats",
                "7 Seaters",
                "Premium AC",
              ].map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
                >
                  {feature}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
              Hire <span className="gradient-text">Innova Crysta</span> on Rent
              {city !== "India" && <> in {city}</>}
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600">
              Book premium airport transfers, family outings, and corporate travel
              with spacious 7+1 captain seats, dual AC comfort, and verified
              chauffeurs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-2xl"
              >
                📞 Book Innova — 8448445504
              </a>
              <a
                href="https://wa.me/918448445504"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4"
              >
                💬 WhatsApp Us
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-700 sm:grid-cols-4">
              {[
                { label: "24/7 Support", icon: "🕒" },
                { label: "Verified Drivers", icon: "🛡️" },
                { label: "Instant Quotes", icon: "💬" },
                { label: "Best Rates", icon: "💰" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="font-semibold text-slate-950">{item.icon}</div>
                  <div className="text-xs text-slate-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-slate-200 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
  <img
    src="/innova.png"
    alt={`Innova Crysta on Rent in ${city !== "India" ? city : "India"} by Chiku Cabs`}
    className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px] object-cover"
  />
</div>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center text-sm text-slate-700">
              {[
                { label: "Comfort", value: "7+1 Seats" },
                { label: "Power", value: "Auto AC" },
                { label: "Space", value: "Luggage Friendly" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    {card.label}
                  </div>
                  <div className="mt-2 font-semibold text-slate-950">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-y py-12"
        style={{
          background: "hsl(var(--foreground))",
          color: "hsl(var(--background))",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          {/* <div className="stats-grid">
            {[
              { num: "1 Lakh+", label: "Trips Completed" },
              { num: "1,000+", label: "Innovas in Fleet" },
              { num: "100+", label: "Cities Covered" },
              { num: "4.9 ★", label: "Customer Rating" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div
                  className="stat-number"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {stat.num}
                </div>
                <div
                  className="stat-label"
                  style={{ color: "hsla(0,0%,100%,0.5)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
          <StatsBar />
        </div>
      </section>

      {/* Innova Variants */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              CHOOSE YOUR INNOVA
            </div>
            <h2 className="section-title">Innova Models Available</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Innova GX",
                model: "Toyota Innova (7+1)",
                image: "/Innova/toyota_innova.png",
                price: "₹17/km",
                features: [
                  "7+1 Seating",
                  "AC + Music",
                  "Good Legroom",
                  "Budget Friendly",
                ],
                best: false,
              },
              {
                name: "Innova Crysta ZX",
                model: "Toyota Innova Crysta",
                image: "/Innova/toyota_innova.png",
                price: "₹18/km",
                features: [
                  "7+1 Captain Seats",
                  "Auto AC",
                  "Premium Interiors",
                  "Extra Luggage Space",
                ],
                best: true,
              },
              {
                name: "Innova HyCross",
                model: "Toyota HyCross (Hybrid)",
                image: "/Innova/innova-hybrid.png",
                price: "₹19/km",
                features: [
                  "7+1 Luxury Seats",
                  "Hybrid Engine",
                  "Panoramic Sunroof",
                  "Ultra Premium",
                ],
                best: false,
              },
            ].map((variant, i) => (
              <div
                key={i}
                className={`package-card ${variant.best ? "popular" : ""}`}
              >
                {variant.best && (
                  <div className="package-badge">Most Popular</div>
                )}
                <div className="mb-5">
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-black mb-1">{variant.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {variant.model}
                </p>
                <div
                  className="package-price"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {variant.price}
                </div>
                <div className="package-unit">Per Kilometer</div>
                <ul className="package-features">
                  {variant.features.map((f, j) => (
                    <li key={j}>
                      <span className="text-green-500">✔</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/918448445504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm"
                  style={{ display: "block", textAlign: "center" }}
                >
                  Book {variant.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Innova */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY INNOVA
            </div>
            <h2 className="section-title">
              Why Innova is India's Favorite Family Car
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Friendly",
                desc: "Spacious 7+1 seating with ample legroom. Captain seats in Crysta model for ultimate comfort.",
              },
              {
                icon: "🛣️",
                title: "Highway King",
                desc: "Powerful diesel engine built for long-distance outstation trips. Smooth ride even on rough roads.",
              },
              {
                icon: "💼",
                title: "Corporate Choice",
                desc: "The preferred vehicle for corporate travel, client pickups, and executive transportation.",
              },
              {
                icon: "🧳",
                title: "Massive Boot Space",
                desc: "Can easily fit 4-5 large suitcases plus cabin bags. Perfect for airport trips and vacations.",
              },
              {
                icon: "❄️",
                title: "Powerful AC",
                desc: "Automatic climate control that keeps all rows equally cool. Rear AC vents for passengers.",
              },
              {
                icon: "🛡️",
                title: "Safety First",
                desc: "ABS, airbags, hill assist, and professional drivers trained for all road conditions.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card group">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl"
                  style={{ background: "hsla(358,73%,43%,0.1)" }}
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

      {/* Use Cases */}
      <section className="py-20 px-4">

        <div className="max-w-5xl mx-auto mb-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Popular Innova Rental Use Cases{" "}
              {city !== "India" ? `in ${city}` : ""}
            </h2>
          </div>

          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {services.map((service) => (

              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`py-5 px-4 uppercase font-semibold text-sm transition-all border-r border-b
        ${activeService.id === service.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
              >
                {service.title}
              </button>

            ))}

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image */}

          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">

            <img
              src={activeService.image}
              alt={activeService.title}
              className="object-cover h-full w-full"
            />

          </div>

          {/* Content */}

          <div>

            <h3 className="text-4xl font-bold mb-6">
              {activeService.title}
            </h3>

            <p className="text-muted-foreground leading-8 mb-8">
              {activeService.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">

              {activeService.features.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 bg-white border rounded-xl p-4 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                    ✓
                  </div>

                  <span>{item}</span>

                </div>

              ))}

            </div>

              <a
  href="https://wa.me/918448445504"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90"
>
  Book {activeService.title}
</a>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              REVIEWS
            </div>
            <h2 className="section-title">
              What Innova Customers in {city !== "India" ? city : "India"} Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sharma Family",
                text: "Booked an Innova Crysta for our family trip to Shimla. The captain seats were incredibly comfortable and the kids loved the space. Best road trip ever!",
                rating: "★★★★★",
              },
              {
                name: "Raj (CEO)",
                text: "We use Chiku Cabs Innova service for all our corporate client pickups. Always on time, impeccably clean cars, and professional drivers.",
                rating: "★★★★★",
              },
              {
                name: "Neha & Friends",
                text: "Hired an Innova for a weekend Jaipur trip from Delhi. The car was practically new, AC was amazing, and we had ample space for all our luggage.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">Innova Crysta Service</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <FAQ
          vehicle={parsedData.vehicle || "Innova Crysta"}
          city={parsedData.origin || "Delhi"}
        />
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Book Your Innova Crysta Now
          </h2>
          <p className="text-xl opacity-70 mb-8">
            India's most loved family car, at the best rental rates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-lg px-10 py-4 shadow-2xl"
            >
              📞 Call 8448445504
            </a>
            <a
              href="https://wa.me/918448445504"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-10 py-4"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {city !== "India" && (
        <section className="py-24 px-4 bg-muted/10 border-t">
          <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
              Premium Innova Crysta Rentals in {city}
            </h2>
            <div className="space-y-6">
              <p>
                When it comes to luxurious and spacious family travel in{" "}
                <strong>{city}</strong>, the Toyota Innova Crysta is the
                undisputed king. Whether you are navigating the busy streets or
                heading out on a scenic highway trip, choosing an{" "}
                <strong>Innova Crysta on Rent</strong> in {city} via our{" "}
                <strong>cab booking</strong> app guarantees a smooth ride. As a
                premier <strong>taxi service</strong>, we ensure your{" "}
                <strong>outstation cabs</strong> experience is unparalleled.
              </p>
              <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                Why Book an Innova Cab in {city}?
              </h3>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Outstation Cabs from {city}:</strong> Perfect for
                    weekend getaways and long-distance travel securely with our
                    verified <strong>taxi service</strong> drivers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>{city} Airport Taxi:</strong> Never worry about
                    fitting your luggage. Our massive boot space easily holds
                    bags for the whole family during{" "}
                    <strong>airport transfer</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Corporate & Wedding Car Rental:</strong> Arrive in
                    style. The premium feel of our{" "}
                    <strong>Innova Crysta on Rent</strong> makes it ideal for
                    executive transit or as an elegant wedding car in {city}.
                  </span>
                </li>
              </ul>
              <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                <p className="mb-0 text-card-foreground">
                  At Chiku Cabs, we offer both the standard 7-seater Innova and
                  the premium 8-seater Innova Crysta for{" "}
                  <strong>cab booking</strong> in {city} at highly competitive
                  rates. With our transparent per-km billing and pristine fleet,
                  we ensure your journey is absolutely perfect.
                </p>
              </div>
            </div>
          </div>
        </section>


      )}
      {/* Local Dominance Section */}
      <section className="py-20 px-4 bg-muted/10 border-t">
        <LocalDominance city={city} />
      </section>

      {/* Internal Links & EEAT Section */}
      <InternalLinks parsedData={parsedData} />
      <EEATSection
        city={city !== "India" ? city : undefined}
        vehicle="Innova Crysta"
      />

      {/* Popular Cities */}
      <section className="py-20 px-4 bg-muted/10 border-t">
        <PopularCities
          vehicleName={parsedData.vehicle || "Innova Crysta"}
          vehicleSlug={parsedData.vehicleSlug}
          currentCity={parsedData.origin?.toLowerCase()}
        />
      </section>
    </div>
  );
}
