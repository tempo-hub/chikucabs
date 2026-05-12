import { ParsedRouteData } from "@/lib/urlParser";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function OutstationRouteFareTemplate({
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
      {/* Accent Line */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primary)), transparent, hsl(var(--primary)))",
        }}
      ></div>

      {/* Hero */}
      <section className="py-24 px-4 bg-muted/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="section-badge" style={{ display: "inline-flex" }}>
              TRANSPARENT PRICING 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
              {startCity} to {endCity} <br />
              <span className="gradient-text">{vehicle} Fare Guide</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Planning your budget for <strong>outstation cabs</strong>? Get a
              detailed breakdown of{" "}
              <strong>
                {vehicle} charges from {startCity} to {endCity}
              </strong>
              . Whether you need a standard <strong>taxi service</strong> or a{" "}
              <strong>tempo traveller on rent</strong>, our transparent{" "}
              <strong>cab booking</strong> guarantees no hidden tolls and no
              surprise surges.
            </p>
            <a
              href="tel:+918448445504"
              className="btn-primary text-lg px-10 py-4 shadow-xl"
            >
              📞 Get Exact Quote — 8448445504
            </a>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9]">
              <img
                src={vDetails.image}
                alt={`${vehicle || "Cab"} Fare from ${startCity} to ${endCity} by Chiku Cabs`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Cards */}
      <section className="max-w-7xl mx-auto px-4 py-24 -mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              tier: "STANDARD",
              car: "Economy Hatchback",
              price: "9",
              desc: "Swift, WagonR or similar",
              best: false,
            },
            {
              tier: "POPULAR",
              car: "Premium Sedan / SUV",
              price: "12",
              desc: "Dzire, Ertiga, Innova",
              best: true,
            },
            {
              tier: "LUXURY",
              car: "Luxury / Tempo",
              price: "18",
              desc: "Innova Crysta, Force 12S",
              best: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 ${item.best ? "border-primary scale-105 z-10" : ""}`}
              style={
                item.best ? { boxShadow: "0 0 0 4px hsla(45,90%,50%,0.1)" } : {}
              }
            >
              {item.best && (
                <div
                  className="absolute"
                  style={{
                    top: 0,
                    right: 0,
                    background: "hsl(var(--primary))",
                    padding: "0.25rem 1rem",
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Best Value
                </div>
              )}
              <div className="text-xs font-black opacity-40 mb-2 uppercase">
                {item.tier} CHOICE
              </div>
              <h3 className="text-2xl font-black mb-2">{item.car}</h3>
              <p className="text-muted-foreground text-sm mb-8">{item.desc}</p>

              <div style={{ marginTop: "auto", marginBottom: "2.5rem" }}>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black opacity-50">FROM</span>
                  <span className="text-5xl font-black">₹{item.price}</span>
                  <span className="text-sm font-black opacity-50">/ KM</span>
                </div>
                <div className="text-xs font-bold text-green-600 mt-2 italic">
                  INTERCITY BEST GUARANTEE
                </div>
              </div>

              <ul className="space-y-3 mb-10 list-none">
                {[
                  "Driver Allowance Incl.",
                  "State Tax Coverage",
                  "Multi-modal Tolls",
                  "24/7 Support",
                ].map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <span className="text-primary text-xl">✓</span> {f}
                  </li>
                ))}
              </ul>

              <a
                href="tel:+918448445504"
                className={`w-full py-4 rounded-xl font-black tracking-tight text-center ${item.best ? "btn-primary" : ""}`}
                style={
                  !item.best
                    ? { background: "hsl(var(--muted))", display: "block" }
                    : { display: "block" }
                }
              >
                GET QUOTE NOW
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Fare Table */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FARE BREAKDOWN
            </div>
            <h2 className="section-title">
              {startCity} to {endCity} Fare Details
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderBottomWidth: "2px" }}>
                  <th className="py-4 px-4 text-left font-black text-sm">
                    COMPONENT
                  </th>
                  <th className="py-4 px-4 text-center font-black text-sm">
                    SEDAN
                  </th>
                  <th className="py-4 px-4 text-center font-black text-sm">
                    SUV
                  </th>
                  <th className="py-4 px-4 text-center font-black text-sm">
                    INNOVA
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    item: "Base Fare (per km)",
                    sedan: "₹9/km",
                    suv: "₹12/km",
                    innova: "₹15/km",
                  },
                  {
                    item: "Driver Allowance",
                    sedan: "Included",
                    suv: "Included",
                    innova: "Included",
                  },
                  {
                    item: "Fuel Charges",
                    sedan: "Included",
                    suv: "Included",
                    innova: "Included",
                  },
                  {
                    item: "GST (5%)",
                    sedan: "Included",
                    suv: "Included",
                    innova: "Included",
                  },
                  {
                    item: "Toll Taxes",
                    sedan: "As per actual",
                    suv: "As per actual",
                    innova: "As per actual",
                  },
                  {
                    item: "Night Charges",
                    sedan: "Included",
                    suv: "Included",
                    innova: "Included",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-4 px-4 font-bold">{row.item}</td>
                    <td className="py-4 px-4 text-center">{row.sedan}</td>
                    <td className="py-4 px-4 text-center">{row.suv}</td>
                    <td className="py-4 px-4 text-center">{row.innova}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inclusions vs Exclusions */}
      <section className="py-24">
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
                ✅ Included in Fare
              </h3>
              {[
                "Base fare per km",
                "Driver batta / allowance",
                "Fuel charges",
                "GST (5%)",
                "Night driving charges",
                "State permit charges",
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
                "Monument entry tickets",
                "Extra km beyond package",
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
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose max-w-none">
            <h2 className="text-4xl font-black mb-8">
              Find the Most Affordable {vehicle} Fare from {startCity} to{" "}
              {endCity}
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                When it comes to{" "}
                <strong>
                  {startCity} to {endCity} cab charges
                </strong>
                , Chiku Cabs offers the most competitive pricing in the market.
                Our{" "}
                <strong>
                  {startCity} to {endCity} taxi fare
                </strong>{" "}
                is designed to be pocket-friendly without compromising on the
                quality of service.
              </p>
              <div
                className="premium-card"
                style={{ background: "hsla(0,0%,96.1%,0.2)", padding: "3rem" }}
              >
                <h3 className="text-2xl font-black mb-6">
                  💰 Price Match Promise
                </h3>
                <p className="text-lg opacity-80 leading-relaxed mb-4">
                  Found a lower{" "}
                  <strong>
                    rate for {startCity} to {endCity}
                  </strong>
                  ? Share the quote with us, and we'll match it plus give you a
                  5% discount on your current booking.
                </p>
                <a href="tel:+918448445504" className="font-black text-primary">
                  CALL FOR PRICE MATCH → 8448445504
                </a>
              </div>
              <p>
                Whether you need a one-way trip or a round-trip package, our{" "}
                <strong>
                  {vehicle} per km rate from {startCity}
                </strong>{" "}
                remains consistent and fair. You can also opt for fixed-price
                bundles for frequent business travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
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
                name: "Sanjay Kumar",
                text: "The fare was exactly what was quoted. No extra charges, no surprises at the end. Very transparent service. Highly recommended!",
                rating: "★★★★★",
              },
              {
                name: "Neha Singh",
                text: "Compared rates with Ola, Uber, and local operators. Chiku Cabs was the most affordable for our one-way trip. Great value for money.",
                rating: "★★★★★",
              },
              {
                name: "Vikram Patel",
                text: "I was skeptical about the low fare, but the service quality was top-notch. Clean car, professional driver, and no hidden costs.",
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
            <h2 className="section-title">Fare Related Questions</h2>
          </div>
          {[
            {
              q: `What is the ${vehicle} fare from ${startCity} to {endCity}?`,
              a: `The ${vehicle} fare from ${startCity} to ${endCity} starts from ₹9 per km for a sedan. The total fare depends on the vehicle type, trip type (one-way or round-trip), and any applicable tolls. Call 8448445504 for an exact quote.`,
            },
            {
              q: `Are toll charges included in the ${vehicle} fare?`,
              a: `Toll charges are applicable as per actual and are not included in the base fare of our ${vehicle} taxi service. However, all other charges like driver allowance, fuel, GST, and night charges are included.`,
            },
            {
              q: `Do you charge extra for night travel with outstation cabs?`,
              a: `No, Chiku Cabs does not charge any extra for night travel. Our outstation cabs' night driving charges are included in the per km fare itself.`,
            },
            {
              q: `How do I get the best cab booking fare for ${startCity} to ${endCity}?`,
              a: `Book a one-way cab instead of a round trip to save up to 50% on your taxi service. Also, booking in advance through our cab booking platform can help you get better rates.`,
            },
            {
              q: `Is it cheaper to hire a tempo traveller on rent for a group?`,
              a: `Yes, if you have a group of 10 or more, a tempo traveller on rent is much more cost-effective than booking multiple outstation cabs.`,
            },
            {
              q: `What are the Innova Crysta hire charges from ${startCity}?`,
              a: `The Innova Crysta hire charges typically range from ₹15-18 per km. It's the most premium option for luxury cab booking for the ${startCity} to ${endCity} route.`,
            },
            {
              q: `Are there any hidden costs in the taxi service booking?`,
              a: `Zero. Chiku Cabs prides itself on transparent cab booking. The quote you get for your outstation cabs is what you pay, excluding only tolls and parking.`,
            },
            {
              q: `Can I book an airport taxi for an outstation drop to ${endCity}?`,
              a: `Absolutely. We provide specialized airport taxi services for direct outstation drops from the airport to ${endCity} at flat rates.`,
            },
            {
              q: `Do you offer one-way cab booking from ${startCity}?`,
              a: `Yes, we are specialists in one-way cab booking, ensuring you only pay for the distance you travel without any return fare.`,
            },
            {
              q: `How can I calculate the total outstation taxi service cost?`,
              a: `Total cost = (Per km rate × Estimated distance) + Driver allowance. Use our cab booking app or call 8448445504 for an instant exact calculation.`,
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

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "1 Lakh+", label: "Trips Completed" },
              { num: "₹0", label: "Hidden Charges" },
              { num: "100+", label: "Cities" },
              { num: "4.9 ★", label: "Rating" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Get Your Exact Fare Now
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Call us for the best {startCity} to {endCity} {vehicle} rates. Price
            match guaranteed.
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
      <EEATSection city={startCity} vehicle={vehicle || "Cab"} />
    </div>
  );
}
