import { ParsedRouteData } from "@/lib/urlParser";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function OneWayRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const { origin, destination, vehicle } = parsedData;
  const startCity = origin || "Origin";
  const endCity = destination || "Destination";
  const vehicleType = vehicle || "Cab";

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
  const vDetails = getVehicleDetails(vehicleType);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
          <a href="/">Home</a> <span>/</span> <span>One Way Drop</span>{" "}
          <span>/</span>{" "}
          <span className="text-primary">
            {startCity} to {endCity}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden bg-muted/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-left">
            <div
              className="section-badge mb-6"
              style={{ display: "inline-flex" }}
            >
              ★ SAVE UP TO 50% ON ONE WAY DROP
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              <span className="gradient-text">
                {startCity} to {endCity}
              </span>{" "}
              <br />
              One Way Drop Taxi
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Why pay for a round trip when you are only traveling one way?
              Experience the best <strong>cab booking</strong> and reserve a
              premium{" "}
              <strong>
                {vehicleType} from {startCity} to {endCity}
              </strong>
              . As a leading <strong>taxi service</strong>, we ensure you pay
              only for the distance you travel with our specialized{" "}
              <strong>outstation cabs</strong> for one-way drops.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-xl"
              >
                📞 Book Drop {vehicleType} — 8448445504
              </a>
              <a
                href="https://wa.me/918448445504"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4 bg-background"
              >
                💬 WhatsApp Us
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {["GPS Tracked", "Verified Driver", "No Hidden Return Fare"].map(
                (item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm font-bold opacity-80"
                  >
                    <span className="text-green-500">✔</span> {item}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Vehicle Hero Image */}
          <div className="flex-1 w-full" style={{ maxWidth: "32rem" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] w-full bg-background relative">
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full z-10 shadow-lg">
                ⚡ INSTANT BOOKING
              </div>
              <img
                src={vDetails.image}
                alt={`One Way Drop Cab from ${startCity} to ${endCity} by Chiku Cabs`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute"
          style={{
            top: "30%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "hsla(45,90%,50%,0.05)",
            filter: "blur(120px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>
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
            <h2 className="section-title">
              {startCity} to {endCity} Taxi Charges
            </h2>
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
              Why Our One Way Service is the Best
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
                desc: `We pick you up from your doorstep in ${startCity} and drop you exactly at your destination in ${endCity}.`,
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

      {/* SEO Content Block */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <article className="prose max-w-none">
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              Premium {startCity} to {endCity} Cab Service — Your Dedicated Drop
              Taxi
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Looking for a reliable{" "}
                <strong>
                  {startCity} to {endCity} one way cab
                </strong>
                ? Whether you are traveling for a business meeting, returning
                home, or catching a flight and need an{" "}
                <strong>airport taxi</strong>, Chiku Cabs provides the most
                efficient and affordable{" "}
                <strong>
                  {startCity} to {endCity} drop taxi
                </strong>{" "}
                service. Our specialized <strong>cab booking</strong> platform
                makes it easy to hire <strong>outstation cabs</strong> for any
                intercity journey.
              </p>
              <p>
                Our{" "}
                <strong>
                  one way cab booking from {startCity} to {endCity}
                </strong>{" "}
                is designed to offer maximum value. Unlike traditional{" "}
                <strong>taxi service</strong> operators who charge you for a
                round-trip even if you are only traveling one way, our
                transparent pricing mechanism ensures you{" "}
                <strong>pay only for the distance you travel</strong>. You can
                choose from a wide range of vehicles, including budget-friendly
                hatchbacks, comfortable sedans, spacious SUVs like the Ertiga,
                and premium <strong>car rental</strong> options like the Innova
                Crysta.
              </p>
              <div className="premium-card bg-primary border-none text-black p-8 my-10 shadow-2xl">
                <h3 className="text-2xl font-black mb-4 mt-0 text-black">
                  Booking a One-Way Cab vs. Bus or Train
                </h3>
                <p className="font-medium opacity-90 m-0">
                  Avoid the hassle of reaching bus stands or railway stations.
                  With our{" "}
                  <strong>
                    {startCity} to {endCity} taxi service
                  </strong>
                  , you enjoy the luxury of door-to-door pickup and drop. No
                  waiting, no sharing your space. It's safe, private, and
                  customizable to your schedule.
                </p>
              </div>
              <h3 className="text-2xl font-bold text-foreground mt-10">
                How to Book Your {startCity} to {endCity} Taxi
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>
                  Simply <strong>Call 8448445504</strong> or use the WhatsApp
                  button to request a quote.
                </li>
                <li>
                  Share your pickup address in {startCity} and drop location in{" "}
                  {endCity}.
                </li>
                <li>Select the vehicle type that suits your needs.</li>
                <li>
                  Get an exact fare break-up (inclusive of driver batta, GST,
                  and base fare).
                </li>
                <li>
                  Confirm your booking and get driver details via SMS
                  immediately.
                </li>
              </ul>
            </div>
          </article>
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

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              REVIEWS
            </div>
            <h2 className="section-title">What Our Drop Taxi Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Verma",
                text: `I frequently travel from ${startCity} to ${endCity} for work. Booking a one-way cab with Chiku Cabs has saved me so much money. The drivers are always professional.`,
                rating: "★★★★★",
              },
              {
                name: "Priya Malik",
                text: `Needed a drop to the airport in ${endCity}. The cab arrived exactly at the promised time at my home in ${startCity}. Very smooth driving and polite driver.`,
                rating: "★★★★★",
              },
              {
                name: "Suresh Gupta",
                text: "Best outstation cab service! I used to pay double for round-trip cabs just to get a drop. Love their one-way dropping service. Highly recommended.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">One Way Drop Taxi</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>
            <h2 className="section-title">One Way Cab Booking FAQs</h2>
          </div>
          {[
            {
              q: `Do I have to pay for the return trip if I book a ${startCity} to ${endCity} one way cab?`,
              a: `No! With our specialized one way drop service, you only pay for the distance from ${startCity} to ${endCity}. We do not charge anything for the driver's empty return trip, making it the most affordable cab booking option.`,
            },
            {
              q: `Are toll taxes included in the ${startCity} to ${endCity} taxi service fare?`,
              a: `Toll taxes are typically not included in the base fare of our taxi service. They are to be paid directly at the toll booths as per the actual receipt during the outstation cabs journey.`,
            },
            {
              q: `Will the airport taxi pick me up from my home in ${startCity}?`,
              a: `Yes, we provide 100% door-to-door taxi service. Whether it's an airport taxi drop or a regular one way cab, we pick you up from your specific address.`,
            },
            {
              q: `Can I carry heavy luggage in the one way cab?`,
              a: `Yes, you can carry luggage based on the vehicle selected during cab booking. A sedan holds 2 large bags, while outstation cabs like SUVs easily accommodate 4-5 large suitcases.`,
            },
            {
              q: `Is it safe to travel at night from ${startCity} to ${endCity} with your taxi service?`,
              a: `Absolutely. All our outstation cabs are GPS-tracked, and our drivers are background-checked and experienced in highway night driving for a safe taxi service experience.`,
            },
            {
              q: `How do I confirm my one way cab booking?`,
              a: `You can confirm your cab booking by calling 8448445504 or via WhatsApp. You'll receive driver details immediately for your {startCity} to {endCity} journey.`,
            },
            {
              q: `Do you provide a tempo traveller on rent for one-way group drops?`,
              a: `Yes, we offer a tempo traveller on rent for large groups needing a one-way drop from ${startCity} to ${endCity} at very competitive rates.`,
            },
            {
              q: `Is the one way cab fare fixed or per km?`,
              a: `We offer both! You can opt for a fixed-price one way drop or a per km rate. Most travelers prefer our fixed cab booking rates for transparency.`,
            },
            {
              q: `What if my flight is delayed and I need an airport taxi drop?`,
              a: `We monitor flight timings for our airport taxi service. Your driver will wait for you, ensuring a stress-free transition from the airport to your destination.`,
            },
            {
              q: `Can I stop for a break during my outstation cabs journey?`,
              a: `Certainly! Our taxi service is flexible. You can request short breaks for refreshments during your {startCity} to {endCity} drive without any extra charge.`,
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
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Book Your Drop Taxi?
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Save up to 50% on your {startCity} to {endCity} travel. Call now!
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
      <EEATSection city={startCity} vehicle={vehicleType} />
    </div>
  );
}
