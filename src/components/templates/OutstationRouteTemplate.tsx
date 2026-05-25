import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";

export default function OutstationRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const { origin, destination, vehicle } = parsedData;
  const startCity = origin || "Origin";
  const endCity = destination || "Destination";

  const getVehicleDetails = (v: string | null) => {
    const lowerV = (v || "cab").toLowerCase();
    if (
      lowerV.includes("tempo") ||
      lowerV.includes("traveller") ||
      lowerV.includes("bus")
    ) {
      return { icon: "🚐", image: "/tempo_traveller.png" };
    } else if (lowerV.includes("innova")) {
      return { icon: "✨", image: "/innova.png" };
    } else {
      return { icon: "🚘", image: "/cab.png" };
    }
  };
  const vDetails = getVehicleDetails(vehicle);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
          <a href="/">Home</a> <span>/</span> <span>Outstation</span>{" "}
          <span>/</span>{" "}
          <span className="text-primary">
            {startCity} to {endCity}
          </span>
        </div>
      </div>

      {/* Hero + Booking Card */}
      <section className="relative py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div style={{ flex: "1.5" }}>
            <div
              className="section-badge"
              style={{
                background: "rgba(34,197,94,0.1)",
                borderColor: "rgba(34,197,94,0.2)",
                color: "#16a34a",
              }}
            >
              ● AVAILABLE NOW
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Best <span className="gradient-text">{vehicle}</span> from <br />
              {startCity} to {endCity}
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
              <div className="flex-1 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-muted aspect-[16/9]">
                <img
                  src={vDetails.image}
                  alt={`${vehicle || "Cab"} from ${startCity} to ${endCity} by Chiku Cabs`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Planning a trip from <strong>{startCity}</strong> to{" "}
                  <strong>{endCity}</strong>? Enjoy hassle-free{" "}
                  <strong>cab booking</strong> and reserve a premium {vehicle}{" "}
                  with Chiku Cabs. As a top-rated <strong>taxi service</strong>,
                  we offer safe and reliable <strong>outstation cabs</strong>{" "}
                  with fixed rates, verified drivers, and 24/7 support.
                </p>
              </div>
            </div>

            {/* Route Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: "DISTANCE", val: "~280 KM", icon: "🛣️" },
                { label: "EST. TIME", val: "5.5 HRS", icon: "⏱️" },
                { label: "RATING", val: "4.9/5", icon: "⭐" },
                { label: "FLEET", val: "100+ CARS", icon: "🚗" },
              ].map((stat, i) => (
                <div key={i} className="premium-card p-4 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-xs font-black opacity-50 mb-1">
                    {stat.label}
                  </div>
                  <div className="font-bold text-sm">{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Safety Bar */}
            <div className="flex flex-wrap gap-8 items-center py-6 border-y border-dashed">
              {[
                "GPS TRACKED",
                "SOS ASSIST",
                "VERIFIED DRIVERS",
                "24/7 HELPLINE",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 font-bold text-sm"
                >
                  <span className="text-green-500">✔</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className="flex-1 w-full lg:sticky lg:top-24">
            <div className="premium-card p-8 border-2 border-primary shadow-2xl">
              <h3 className="text-2xl font-black mb-6 flex items-center justify-between">
                Quick Booking
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                  INSTANT
                </span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black opacity-50">FROM</label>
                  <input
                    type="text"
                    defaultValue={startCity}
                    className="w-full p-4 rounded-xl border-2 font-bold"
                    style={{ borderColor: "hsl(var(--border))" }}
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black opacity-50">TO</label>
                  <input
                    type="text"
                    defaultValue={endCity}
                    className="w-full p-4 rounded-xl border-2 font-bold"
                    style={{ borderColor: "hsl(var(--border))" }}
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black opacity-50">
                    PICKUP DATE
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-xl border-2"
                    style={{ borderColor: "hsl(var(--border))" }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black opacity-50">
                    PICKUP TIME
                  </label>
                  <input
                    type="time"
                    className="w-full p-4 rounded-xl border-2"
                    style={{ borderColor: "hsl(var(--border))" }}
                  />
                </div>
                <div className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-2xl font-black">₹ 3,499</div>
                      <div className="text-xs opacity-50 font-bold">
                        ALL INCLUSIVE
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold opacity-60 line-through">
                        ₹ 4,200
                      </div>
                      <div className="text-green-500 font-bold text-xs">
                        SAVE 15%
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:+918448445504"
                    className="btn-primary w-full py-5 text-xl shadow-xl"
                    style={{ display: "flex" }}
                  >
                    📞 BOOK NOW
                  </a>
                  <p className="text-center text-xs font-bold opacity-40 mt-4">
                    FREE CANCELLATION UP TO 24H BEFORE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              HOW IT WORKS
            </div>
            <h2 className="section-title">Book Your Ride in 3 Simple Steps</h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="steps-container">
            {[
              {
                num: "1",
                icon: "🔍",
                title: "Search Your Route",
                desc: `Enter ${startCity} to ${endCity} and choose your travel date.`,
              },
              {
                num: "2",
                icon: "🚗",
                title: "Choose Your Vehicle",
                desc: "Pick from Sedan, SUV, Innova or Tempo Traveller based on your group size.",
              },
              {
                num: "3",
                icon: "✅",
                title: "Confirm & Travel",
                desc: "Get instant confirmation. Your verified driver arrives on time, every time.",
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

      {/* Fleet Comparison Table */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              OUR FLEET
            </div>
            <h2 className="section-title">
              Compare Our Premium {endCity} Fleet
            </h2>
            <p className="section-subtitle mx-auto">
              Select the perfect ride for your {startCity} to {endCity} journey.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderBottomWidth: "2px" }}>
                  <th className="py-6 px-4 text-left font-black text-sm">
                    VEHICLE CLASS
                  </th>
                  <th className="py-6 px-4 text-center font-black text-sm">
                    CAPACITY
                  </th>
                  <th className="py-6 px-4 text-center font-black text-sm">
                    FEATURES
                  </th>
                  <th className="py-6 px-4 text-center font-black text-sm">
                    LUGGAGE
                  </th>
                  <th className="py-6 px-4 text-right font-black text-sm">
                    FARE
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Executive Sedan",
                    model: "Swift Dzire, Etios",
                    cap: "4+1",
                    features: "Dual AC",
                    bags: "2 Large",
                    price: "₹2,499",
                    icon: "🚘",
                  },
                  {
                    name: "Premium SUV",
                    model: "Ertiga, Marazzo",
                    cap: "6+1",
                    features: "Rear AC Vents",
                    bags: "4 Large",
                    price: "₹3,999",
                    icon: "🚐",
                  },
                  {
                    name: "Luxury Innova",
                    model: "Innova Crysta",
                    cap: "7+1",
                    features: "Captain Seats",
                    bags: "5 Large",
                    price: "₹4,499",
                    icon: "✨",
                  },
                  {
                    name: "Tempo Traveller",
                    model: "Force 12S/16S",
                    cap: "12-16",
                    features: "Pushback Seats",
                    bags: "8+ Large",
                    price: "₹7,999",
                    icon: "🚌",
                  },
                ].map((car, i) => (
                  <tr
                    key={i}
                    className="border-b group"
                    style={{ cursor: "pointer" }}
                  >
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{car.icon}</span>
                        <div>
                          <div className="font-black text-lg">{car.name}</div>
                          <div className="text-xs opacity-50">{car.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center font-bold">
                      {car.cap}
                    </td>
                    <td className="py-6 px-4 text-center font-bold">
                      {car.features}
                    </td>
                    <td className="py-6 px-4 text-center font-bold">
                      {car.bags}
                    </td>
                    <td className="py-6 px-4 text-right">
                      <div className="font-black text-xl text-primary">
                        {car.price}
                      </div>
                      <a
                        href="tel:+918448445504"
                        className="text-xs font-bold text-primary mt-1"
                        style={{ display: "inline-block" }}
                      >
                        BOOK →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              TRANSPARENT PRICING
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
                "Base Fare (per km)",
                "Driver Allowance / Batta",
                "Fuel Charges",
                "GST (5%)",
                "Toll Taxes (as applicable)",
                "State Permit Charges",
                "Night Driving Charges",
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
                "Parking Fees at destinations",
                "Entry tickets to monuments",
                "Extra km beyond package",
                "Extra hours beyond package",
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

      {/* SEO Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose max-w-none">
            <h2 className="text-4xl font-black mb-8">
              {startCity} to {endCity} Cab Service — Your Complete Guide
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Looking for the most reliable{" "}
                <strong>
                  {startCity} to {endCity} taxi service
                </strong>
                ? Chiku Cabs provides a premium intercity travel experience that
                prioritizes your comfort and safety. Whether you require
                standard <strong>outstation cabs</strong>, an reliable{" "}
                <strong>airport taxi</strong> drop, or a spacious{" "}
                <strong>tempo traveller on rent</strong> for a family wedding,
                our{" "}
                <strong>
                  {startCity} to {endCity} cab booking
                </strong>{" "}
                ensures a stress-free journey.
              </p>
              <div
                className="premium-card bg-primary border-none"
                style={{ color: "black" }}
              >
                <h3 className="text-2xl font-black mb-4">
                  Why Our {startCity} to {endCity} Route is #1
                </h3>
                <p className="font-medium opacity-80">
                  We use AI-optimized routing to avoid traffic congestion on the{" "}
                  {startCity} - {endCity} highway, saving you up to 45 minutes
                  on average. Plus, our dedicated safety service offers solo
                  travelers an extra layer of security on this route.
                </p>
              </div>
              <p>
                Our{" "}
                <strong>
                  one-way cabs from {startCity} to {endCity}
                </strong>{" "}
                are perfect for those who don't need a return journey, offering
                a flat-rate price that is often 50% cheaper than round-trip
                bookings. With Chiku Cabs, you get the best value for every
                kilometer traveled.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              CUSTOMER REVIEWS
            </div>
            <h2 className="section-title">What Our Travelers Say</h2>
            <p className="section-subtitle mx-auto">
              Trusted by thousands of travelers across India.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                route: `${startCity} → ${endCity}`,
                text: "Excellent service! The driver was very professional and the car was spotlessly clean. Reached on time. Will definitely book again for my next trip.",
                rating: "★★★★★",
              },
              {
                name: "Priya Gupta",
                route: `${startCity} → ${endCity}`,
                text: "Best cab service I've ever used. Transparent pricing with no hidden charges. The Innova Crysta was super comfortable for our family trip.",
                rating: "★★★★★",
              },
              {
                name: "Amit Verma",
                route: `${startCity} → ${endCity}`,
                text: "Booked a one-way cab and saved so much money compared to other services. Driver was punctual and polite. Highly recommended!",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">{review.route}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "1 Lakh+", label: "Happy Customers" },
              { num: "500+", label: "Verified Drivers" },
              { num: "100+", label: "Cities Covered" },
              { num: "4.9 ★", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks parsedData={parsedData} />

      {/* FAQ Section */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          {[
            {
              q: `How much does a ${vehicle} from ${startCity} to ${endCity} cost for outstation taxi service?`,
              a: `The ${vehicle} fare from ${startCity} to ${endCity} starts from ₹2,499 for a sedan. Prices vary based on vehicle type and trip type. Our transparent cab booking ensure you get the best outstation cabs rates without hidden fees.`,
            },
            {
              q: `How long does the ${startCity} to ${endCity} taxi service journey take?`,
              a: `The ${startCity} to ${endCity} journey typically takes 5-6 hours. Our professional drivers for outstation cabs are familiar with the fastest routes and prioritize your safety.`,
            },
            {
              q: `Can I book a one-way cab from ${startCity} to ${endCity}?`,
              a: `Yes! We are specialists in one-way cab booking. It saves you up to 50% compared to round-trip taxi service charges. Perfect for those needing a dedicated drop taxi.`,
            },
            {
              q: `Is it safe to travel by outstation cabs from ${startCity} to ${endCity}?`,
              a: `Absolutely. Chiku Cabs provides 24/7 GPS-tracked taxi service, police-verified drivers, and SOS support, ensuring a secure outstation cabs experience for families and solo travelers.`,
            },
            {
              q: `What vehicle options are available for cab booking through Chiku Cabs?`,
              a: `Our fleet for outstation cabs includes Hatchbacks, Sedans, SUVs like Innova Crysta, and even a tempo traveller on rent for larger groups traveling to ${endCity}.`,
            },
            {
              q: `How do I book an airport taxi for ${startCity} to ${endCity}?`,
              a: `You can easily book an airport taxi for outstation drops via our website or by calling 8448445504. We provide punctual pickups directly from the airport arrival.`,
            },
            {
              q: `Are there any hidden charges in your outstation taxi service?`,
              a: `No. We believe in 100% transparent cab booking. Your quote includes the base fare, driver allowance, and GST. Tolls and parking are paid as per actuals.`,
            },
            {
              q: `Do you provide a tempo traveller on rent for this route?`,
              a: `Yes, for group travel to ${endCity}, we highly recommend booking a tempo traveller on rent. It offers more comfort and is cheaper than booking multiple outstation cabs.`,
            },
            {
              q: `What if I need to cancel my taxi service booking?`,
              a: `We offer free cancellation for all outstation cabs up to 24 hours before your scheduled pickup. Flexibility is key to our premium cab booking experience.`,
            },
            {
              q: `Do you offer luxury cab booking for the ${startCity} to ${endCity} route?`,
              a: `Yes, for a more premium experience, you can choose luxury cab booking options like the Innova Crysta, featuring captain seats and extra legroom.`,
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

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Travel?</h2>
          <p className="text-xl opacity-70 mb-8">
            Book your {startCity} to {endCity} {vehicle} now and enjoy a premium
            journey.
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

      <EEATSection city={startCity} vehicle={vehicle || "Cab"} />
    </div>
  );
}
