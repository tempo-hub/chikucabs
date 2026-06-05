import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import Link from "next/link";

export default function AirportTaxiTemplate() {
  const faqs = [
    {
      q: "What is the starting fare for airport taxi service?",
      a: "Airport taxi fare starts from affordable fixed rates depending on pickup location, drop point, vehicle type, and travel timing.",
    },
    {
      q: "Do you provide 24x7 airport pickup and drop?",
      a: "Yes, we offer 24x7 airport taxi service for pickups, drops, and late-night transfers with professional drivers.",
    },
    {
      q: "Which airports do you serve?",
      a: "We primarily serve Delhi IGI Airport and nearby NCR airport transfer routes.",
    },
    {
      q: "Which vehicles are available?",
      a: "Sedan, SUV, Ertiga, Innova, Crysta, Tempo Traveller and luxury cars are available.",
    },
    {
      q: "How can I book instantly?",
      a: "You can call or WhatsApp anytime for instant booking confirmation and live fare quote.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div
              className="section-badge mb-4"
              style={{ display: "inline-flex" }}
            >
              24x7 AIRPORT TRANSFER
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Airport Taxi Service <br />
              <span className="gradient-text">Pickup & Drop Booking</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Book reliable airport taxi service for Delhi IGI Airport pickup,
              drop, terminal transfer and NCR routes with professional drivers,
              clean vehicles and affordable fixed pricing.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary px-8 py-4 text-lg"
              >
                📞 Call Now
              </a>

              <a
                href="https://wa.me/918448445504"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-4 text-lg"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/cab.png"
                alt="Airport Taxi Service"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
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

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY CHOOSE US
            </div>

            <h2 className="section-title">
              Why Choose Our Airport Taxi Service?
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Enjoy reliable airport transfers with professional drivers, fixed
              pricing, flight tracking, and 24x7 customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "24x7 Availability",
              "Fixed Pricing",
              "Verified Drivers",
              "Flight Tracking",
              "On-Time Pickup",
              "Clean Vehicles",
              "Instant Booking",
              "Customer Support",
            ].map((item) => (
              <div
                key={item}
                className="premium-card p-6 text-center font-bold"
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Taxi Pricing */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              AIRPORT TAXI FARE
            </div>

            <h2 className="section-title">
              Compare Airport Taxi Prices by Vehicle Type
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Choose from budget-friendly sedans, spacious SUVs, premium Innova
              Crysta, and luxury airport transfer vehicles. Fixed fares, no
              hidden charges, and professional drivers available 24x7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: "STANDARD",
                car: "Hatchback",
                price: "9",
                desc: "Swift, WagonR or similar",
                best: false,
              },
              {
                tier: "POPULAR",
                car: "Sedan",
                price: "12",
                desc: "Dzire, Ertiga or similar",
                best: true,
              },
              {
                tier: "LUXURY",
                car: "Innova",
                price: "18",
                desc: "Innova Crysta, Force Urbania",
                best: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${
                  item.best ? "border-primary scale-105 z-10" : ""
                }`}
                style={
                  item.best
                    ? {
                        boxShadow: "0 0 0 4px hsla(45,90%,50%,0.12)",
                      }
                    : {}
                }
              >
                {item.best && (
                  <div
                    className="absolute text-white"
                    style={{
                      top: 0,
                      right: 0,
                      background: "hsl(var(--primary))",
                      padding: "0.35rem 1rem",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="text-xs font-black opacity-40 mb-2 uppercase">
                  {item.tier} CHOICE
                </div>

                <h3 className="text-2xl font-black mb-2">{item.car}</h3>

                <p className="text-muted-foreground text-sm mb-8">
                  {item.desc}
                </p>

                <div style={{ marginTop: "auto", marginBottom: "2.5rem" }}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black opacity-50">FROM</span>

                    <span className="text-5xl font-black">₹{item.price}</span>

                    <span className="text-sm font-black opacity-50">/ KM</span>
                  </div>

                  <div className="text-xs font-bold text-green-600 mt-2 italic">
                    INTERCITY BEST PRICE GUARANTEE
                  </div>
                </div>

                <ul className="space-y-3 mb-10 list-none">
                  {[
                    "Driver Allowance Included",
                    "State Permit Included",
                    "Clean & Sanitized Vehicle",
                    "24×7 Customer Support",
                  ].map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <span className="text-primary text-xl">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="tel:+918448445504"
                  className={`w-full py-4 rounded-xl font-black tracking-tight text-center ${
                    item.best ? "btn-primary" : ""
                  }`}
                  style={
                    !item.best
                      ? {
                          background: "hsl(var(--muted))",
                          display: "block",
                        }
                      : {
                          display: "block",
                        }
                  }
                >
                  BOOK NOW
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            * Final fare depends on pickup location, airport terminal, vehicle
            availability, waiting time, tolls, and parking charges.
          </p>
        </div>
      </section>

      {/* Airport Pickup Features */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              PREMIUM FEATURES
            </div>

            <h2 className="section-title">Airport Pickup & Drop Features</h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Experience hassle-free airport transfers with real-time flight
              tracking, luggage assistance, and meet & greet services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Flight Tracking",
              "Meet & Greet",
              "Name Board Service",
              "Luggage Assistance",
              "Live Driver Updates",
              "24x7 Assistance",
            ].map((item) => (
              <div key={item} className="premium-card p-6 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Services */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              OUR SERVICES
            </div>

            <h2 className="section-title">Airport Taxi Services We Offer</h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              From airport pickups and drops to corporate transfers and
              outstation airport taxi services, we cover all travel needs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Airport Pickup",
              "Airport Drop",
              "Terminal Transfer",
              "Meet & Greet Service",
              "Corporate Airport Taxi",
              "Late Night Airport Taxi",
              "Family Airport Transfers",
              "Outstation Airport Taxi",
            ].map((item) => (
              <div key={item} className="premium-card p-6 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Airport Routes */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              POPULAR ROUTES
            </div>

            <h2 className="section-title">Popular Airport Taxi Routes</h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Book airport taxi service for the most frequently travelled routes
              across Delhi NCR and nearby cities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Delhi Airport to Noida",
              "Delhi Airport to Gurgaon",
              "Delhi Airport to Ghaziabad",
              "Delhi Airport to Faridabad",
              "Delhi Airport to Agra",
              "Delhi Airport to Jaipur",
            ].map((route) => (
              <div key={route} className="premium-card p-6">
                {route}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              HOW IT WORKS
            </div>
            <h2 className="section-title">Book Airport Taxi in 3 Easy Steps</h2>
          </div>

          <div className="steps-container">
            {[
              {
                num: "1",
                icon: "📍",
                title: "Share Trip Details",
                desc: "Provide your airport terminal, pickup or drop location, travel date, and flight details for quick booking.",
              },
              {
                num: "2",
                icon: "🚘",
                title: "Choose Your Vehicle",
                desc: "Select from Hatchback, Sedan, SUV, Innova Crysta, Tempo Traveller, or Luxury Cars based on your travel needs.",
              },
              {
                num: "3",
                icon: "✈️",
                title: "Confirm & Travel",
                desc: "Receive instant confirmation and driver details. Enjoy a comfortable, on-time airport transfer with professional service.",
              },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{step.num}</div>

                <div className="step-icon">{step.icon}</div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              REVIEWS
            </div>
            <h2 className="section-title">
              Travelers Love Our Transparent Pricing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                text: "Booked an airport pickup from Delhi Airport at 2 AM. The driver was already waiting when my flight landed. Smooth experience and very professional service.",
                rating: "★★★★★",
              },
              {
                name: "Priya Verma",
                text: "Used Chiku Cabs for an airport drop to Terminal 3. The cab arrived on time, the vehicle was clean, and the fare was exactly as promised.",
                rating: "★★★★★",
              },
              {
                name: "Amit Gupta",
                text: "Excellent airport transfer service. They tracked my delayed flight and adjusted the pickup time automatically. Highly reliable and stress-free.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="premium-card p-8 h-full">
                <div className="text-yellow-500 text-xl mb-4">
                  {review.rating}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{review.text}"
                </p>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg">{review.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    Verified Airport Taxi Customer
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-8">
            Delhi Airport Taxi Service – Reliable Airport Pickup & Drop
          </h2>

          <div className="space-y-6 text-muted-foreground leading-8">
            <p>
              Our airport taxi service provides reliable airport pickup and drop
              facilities for business travelers, families, tourists, and
              corporate clients. We offer affordable airport transportation with
              professional drivers and well-maintained vehicles.
            </p>

            <p>
              Whether you need a transfer from Delhi Airport to Noida, Gurgaon,
              Ghaziabad, Faridabad, Agra, Jaipur, or nearby cities, our airport
              taxi service ensures safe, comfortable, and timely travel.
            </p>

            <p>
              Customers can choose from Hatchback, Sedan, SUV, Innova Crysta,
              Tempo Traveller, and luxury vehicles. With 24x7 customer support,
              fixed pricing, and instant booking confirmation, we make airport
              transfers hassle-free and convenient.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-muted/20 border-y">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>

            <h2 className="section-title">Airport Taxi Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none hover:bg-muted/50 transition-colors">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-primary">
                    ▼
                  </span>
                </summary>

                <div className="p-6 pt-0 text-muted-foreground border-t bg-muted/10 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-black mb-4">Book Airport Taxi Now</h2>

          <p className="text-lg opacity-80 mb-8">
            Instant booking for airport pickup & drop service.
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
              className="text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105"
              style={{
                backgroundColor: "#25D366",
                color: "#fff",
                border: "none",
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Whatsapp Float */}
      <WhatsAppFloat />
    </div>
  );
}
