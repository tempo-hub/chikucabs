import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";

export default function InnovaRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const startCity = parsedData.origin || "Origin";
  const endCity = parsedData.destination || "Destination";

  return (
    <div className="bg-background min-h-screen">
      {/* Accent Line */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primary)), transparent, hsl(var(--primary)))",
        }}
      ></div>

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden bg-muted/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <div className="section-badge">✨ INNOVA CRYSTA HIRE</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
              <span className="gradient-text">Innova Crysta</span> from <br />
              {startCity} to {endCity}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Experience premium <strong>cab booking</strong> and reserve an{" "}
              <strong>Innova Crysta</strong> from <strong>{startCity}</strong>{" "}
              to <strong>{endCity}</strong>. As a top-tier{" "}
              <strong>taxi service</strong>, we offer spacious 7+1 seating,
              captain seats, and expert drivers for reliable{" "}
              <strong>outstation cabs</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-2xl"
              >
                📞 Get Quote — 8448445504
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
          </div>
          <div className="flex-1 w-full" style={{ maxWidth: "28rem" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9]">
              <img
                src="/innova.png"
                alt={`Innova outstation from ${startCity} to ${endCity} by Chiku Cabs`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Route Stats */}
      <section className="border-b py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "✨", label: `${startCity} → ${endCity}` },
              { num: "7+1", label: "Seating Capacity" },
              { num: "24/7", label: "Driver Included" },
              { num: "₹14+", label: "Per KM" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              PRICING
            </div>
            <h2 className="section-title">
              {startCity} to {endCity} Innova Rates
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Innova",
                price: "₹14/km",
                desc: "Standard Innova (7+1)",
                features: [
                  "7+1 Seater",
                  "AC + Music",
                  "Driver + Fuel",
                  "Good Comfort",
                ],
                best: false,
              },
              {
                name: "Innova Crysta",
                price: "₹17/km",
                desc: "Premium Crysta (7+1)",
                features: [
                  "Captain Seats",
                  "Auto AC",
                  "Premium Interiors",
                  "Extra Luggage",
                ],
                best: true,
              },
              {
                name: "HyCross",
                price: "₹20/km",
                desc: "Hybrid HyCross (7+1)",
                features: [
                  "Luxury Seats",
                  "Hybrid Engine",
                  "Ultra Premium",
                  "Panoramic View",
                ],
                best: false,
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`package-card ${pkg.best ? "popular" : ""}`}
              >
                {pkg.best && <div className="package-badge">Best Value</div>}
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  ✨
                </div>
                <h3 className="text-xl font-black mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{pkg.desc}</p>
                <div
                  className="package-price"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {pkg.price}
                </div>
                <div className="package-unit">Per Kilometer</div>
                <ul className="package-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <span className="text-green-500">✔</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+918448445504"
                  className="btn-primary w-full py-3 text-sm"
                  style={{ display: "block", textAlign: "center" }}
                >
                  Book {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions vs Exclusions */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">What's Included vs Not Included?</h2>
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
                "Base fare per km",
                "Driver allowance",
                "Fuel charges",
                "AC Innova Crysta",
                "Night driving charges",
                "GST (5%)",
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
                "Toll taxes (as per actual)",
                "Parking fees",
                "State permit charges",
                "Monument entry tickets",
                "Driver tip (optional)",
              ].map((item, i) => (
                <div key={i} className="excl-item">
                  <span style={{ color: "#dc2626" }}>✗</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Innova for this Route */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Why Choose Innova for {startCity} to {endCity}?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Comfort",
                desc: `Innova's spacious 7+1 seating ensures your family travels comfortably from ${startCity} to ${endCity}.`,
              },
              {
                icon: "🛣️",
                title: "Highway Performance",
                desc: "Powerful diesel engine handles long distances with ease. Smooth ride even on different road conditions.",
              },
              {
                icon: "🧳",
                title: "Luggage Space",
                desc: "Massive boot space fits 4-5 large suitcases. No need to worry about packing light.",
              },
              {
                icon: "🛡️",
                title: "Safe & Reliable",
                desc: "GPS-tracked vehicles with experienced, background-verified drivers who know the route well.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ background: "hsla(358,73%,43%,0.1)" }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
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
            <h2 className="section-title">Innova Travelers Love Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sharma Family",
                text: `Booked an Innova Crysta from ${startCity} to ${endCity}. The car was immaculate, captain seats were a game-changer, and the driver was exceptional.`,
                rating: "★★★★★",
              },
              {
                name: "Priya & Friends",
                text: "The Innova had so much space for our luggage. Driver was punctual and drove smoothly. Will definitely book again for our next trip.",
                rating: "★★★★★",
              },
              {
                name: "Rajesh (Business)",
                text: "Used for a client pickup. The Crysta made a great impression. On time, clean, and professional service.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">
                  {startCity} → {endCity}
                </div>
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
            <h2 className="section-title">Innova Booking Questions</h2>
          </div>
          {[
            {
              q: `How much does an Innova Crysta on rent cost from ${startCity} to ${endCity}?`,
              a: `Innova rentals normally start from ₹14/km, while the premium Innova Crysta on rent is ₹17/km. Total fare for your Innova taxi service depends on distance and trip type. Call 8448445504 for a transparent quote.`,
            },
            {
              q: "Which model should I choose for my luxury cab booking?",
              a: "For budget family travel, the standard Innova is great. For premium luxury cab booking with captain seats and extra legroom, we highly recommend the Innova Crysta on rent.",
            },
            {
              q: "How many passengers can fit during an Innova cab booking?",
              a: "All our models for Innova cab booking seat 7+1 (7 passengers + 1 driver) comfortably. The Crysta is particularly famous for its spacious cabin and premium upholstery.",
            },
            {
              q: "Can I stop at multiple locations during my outstation taxi service?",
              a: "Yes! Our Innova taxi service is highly flexible. You can plan your itinerary with multiple stops for sightseeing or meals along the way from ${startCity} to ${endCity}.",
            },
            {
              q: `What makes Chiku Cabs the best for Innova Crysta on rent in ${startCity}?`,
              a: `We provide immaculately clean cars, highly professional chauffeurs, and 100% transparent luxury cab booking prices with zero hidden costs.`,
            },
            {
              q: `Do you provide Innova cab booking for airport transfer to ${endCity}?`,
              a: `Absolutely. We offer specialized airport taxi services with Innova Crysta on rent for direct outstation drops to ${endCity} at fixed, affordable rates.`,
            },
            {
              q: `Are the drivers for Innova taxi service verified?`,
              a: `Yes, all our drivers for luxury cab booking and Innova taxi service are police-verified and have extensive experience in long-distance highway driving.`,
            },
            {
              q: `Is the Innova Crysta on rent suitable for a group of 6 with luggage?`,
              a: `Perfectly! The Innova Crysta on rent has a versatile seating arrangement and ample boot space, making it the #1 choice for family cab booking.`,
            },
            {
              q: `How do I book an Innova for a wedding in ${startCity}?`,
              a: `You can book an Innova Crysta on rent for weddings by calling 8448445504. We offer both guest transfers and premium decorated cars for the bridal party.`,
            },
            {
              q: `What if I need to cancel my luxury cab booking?`,
              a: `We offer a user-friendly cancellation policy. You can cancel your Innova cab booking up to 24 hours before your trip without any penalty.`,
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

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Book Innova: {startCity} → {endCity}
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Premium family travel at the best rates. Call now!
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

      <InternalLinks parsedData={parsedData} />
      <EEATSection city={startCity} vehicle="Innova Crysta" />
    </div>
  );
}
