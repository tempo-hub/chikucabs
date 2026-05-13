import { ParsedRouteData } from "@/lib/urlParser";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EEATSection from "@/components/shared/EEATSection";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function ServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const vehicle = parsedData.vehicle || "Premium Cab";

  const getVehicleDetails = (v: string) => {
    const lowerV = v.toLowerCase();
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
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-left">
            <div
              className="section-badge mb-6"
              style={{ display: "inline-flex" }}
            >
              ★ #1 TAXI RENTAL SERVICE IN INDIA
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              Premium <span className="gradient-text">{vehicle}</span> Rental{" "}
              <br />
              for Your Next Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Experience the gold standard in <strong>cab booking</strong>.
              Whether it's for <strong>outstation cabs</strong>, an{" "}
              <strong>airport taxi</strong>, or a local{" "}
              <strong>taxi service</strong>, our {vehicle} fleet offers
              unmatched comfort and reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-xl"
              >
                📞 Book {vehicle} — 8448445504
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

          {/* Vehicle Hero Image */}
          <div className="flex-1 w-full" style={{ maxWidth: "32rem" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] w-full bg-muted">
              <img
                src={vDetails.image}
                alt={`${vehicle || "Cab"} Rental Service by Chiku Cabs`}
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

      {/* Stats Bar */}
      <section className="border-y py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "1L+", label: "Trips Completed" },
              { num: "500+", label: "Expert Drivers" },
              { num: "100+", label: "Cities in India" },
              { num: "4.9 ★", label: "Customer Rating" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              HOW IT WORKS
            </div>
            <h2 className="section-title">
              Book Your {vehicle} in 3 Easy Steps
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="steps-container">
            {[
              {
                num: "1",
                icon: "📱",
                title: "Tell Us Your Plan",
                desc: "Call 8448445504 or WhatsApp us with your pickup location, destination, and travel date.",
              },
              {
                num: "2",
                icon: "🚗",
                title: "Choose Your Vehicle",
                desc: `Select from Sedan, SUV, Innova, or ${vehicle} based on your group size and budget.`,
              },
              {
                num: "3",
                icon: "✅",
                title: "Confirm & Ride",
                desc: "Get instant confirmation. Your verified driver arrives at your doorstep, on time, every time.",
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

      {/* Feature Grid */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY CHIKU CABS
            </div>
            <h2 className="section-title">
              Why We're India's Most Trusted Cab Service
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Verified Chauffeurs",
                desc: "Highly trained and background-verified drivers ensuring your safety and punctuality on every trip.",
              },
              {
                icon: "🚗",
                title: "Luxury Fleet",
                desc: `Meticulously maintained ${vehicle}s equipped with modern amenities, clean interiors, and AC.`,
              },
              {
                icon: "💰",
                title: "Transparent Billing",
                desc: "Fixed pricing with no hidden costs. Pay only what you see at the time of booking.",
              },
              {
                icon: "⏰",
                title: "24/7 Availability",
                desc: "Round the clock service for all your travel needs. Book anytime, travel anytime.",
              },
              {
                icon: "📍",
                title: "GPS Tracking",
                desc: "Real-time location tracking for every ride. Share your trip status with family for safety.",
              },
              {
                icon: "🔄",
                title: "Free Cancellation",
                desc: "Cancel your booking up to 24 hours before the trip at zero charges. Full flexibility.",
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

      {/* Fleet Gallery */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              OUR FLEET
            </div>
            <h2 className="section-title">Choose Your Perfect Ride</h2>
            <p className="section-subtitle mx-auto">
              From budget-friendly sedans to luxury Innovas and spacious Tempo
              Travellers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Sedan",
                models: "Dzire, Etios, Amaze",
                price: "₹9/km",
                capacity: "4+1",
                icon: "🚘",
              },
              {
                name: "SUV",
                models: "Ertiga, Marazzo, XUV",
                price: "₹12/km",
                capacity: "6+1",
                icon: "🚙",
              },
              {
                name: "Innova Crysta",
                models: "Innova, Crysta HyCross",
                price: "₹15/km",
                capacity: "7+1",
                icon: "✨",
              },
              {
                name: "Tempo Traveller",
                models: "Force 12S, 16S, 20S",
                price: "₹20/km",
                capacity: "12-20",
                icon: "🚌",
              },
            ].map((car, i) => (
              <div key={i} className="premium-card text-center p-6">
                <div className="text-4xl mb-4">{car.icon}</div>
                <h3 className="text-xl font-black mb-1">{car.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {car.models}
                </p>
                <div className="text-2xl font-black text-primary mb-1">
                  {car.price}
                </div>
                <div className="text-xs opacity-50 font-bold mb-6">
                  {car.capacity} Passengers
                </div>
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

      {/* SEO Content */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Why Chiku Cabs is the Best for {vehicle} Hire
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Searching for a reliable <strong>{vehicle} on rent</strong>? At
              Chiku Cabs, we provide top-tier <strong>taxi service</strong> and{" "}
              <strong>cab booking</strong> across India. Our{" "}
              <strong>outstation cabs</strong> are perfectly suited for local
              tours, <strong>airport taxi</strong> transfers, and long-distance
              travel.
            </p>
            <p>
              Our <strong>{vehicle} hire</strong> options are designed for
              maximum value. We pride ourselves on offering 24/7 customer
              support and a seamless <strong>cab booking</strong> experience.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-medium">
              <li>
                Highly reliable <strong>outstation cabs</strong>
              </li>
              <li>
                Punctual <strong>airport taxi</strong> service
              </li>
              <li>
                Verified <strong>taxi service</strong> drivers
              </li>
              <li>
                No surge pricing on <strong>cab booking</strong>
              </li>
            </ul>
          </div>
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
            <h2 className="section-title">Trusted by Thousands of Travelers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Khanna",
                text: `Best ${vehicle} rental service I've used. The car was immaculately clean, the driver was professional, and the pricing was very fair. Highly recommended!`,
                rating: "★★★★★",
              },
              {
                name: "Meera Joshi",
                text: "Used Chiku Cabs for a family wedding trip. The Innova Crysta was luxurious and the driver handled the entire 3-day trip perfectly. Will definitely use again.",
                rating: "★★★★★",
              },
              {
                name: "Aman Tiwari",
                text: "Excellent corporate cab service. We use Chiku Cabs for all our office travels now. Punctual, clean cars, and great customer support.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">{vehicle} Service</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
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
              q: `How do I book a premium taxi service with Chiku Cabs?`,
              a: `Booking is simple! Call us at 8448445504 or use our website for instant cab booking. You'll get a transparent quote for your taxi service or outstation cabs journey immediately.`,
            },
            {
              q: `What types of vehicles are available for outstation cabs?`,
              a: `We offer a wide fleet including Sedans, SUVs like Innova Crysta, and even a tempo traveller on rent for group travel service across India.`,
            },
            {
              q: `Are the drivers for your taxi service verified and safe?`,
              a: `Yes. Every driver undergoes police verification and background checks. All our outstation cabs are GPS-tracked, ensuring a secure taxi service experience for every passenger.`,
            },
            {
              q: `What payment methods do you accept for cab booking?`,
              a: `We accept Cash, UPI (Paytm, Google Pay, PhonePe), and all major Credit/Debit Cards for your convenience. Payment can be made at the end of your taxi service trip.`,
            },
            {
              q: `Is there a cancellation policy for outstation cabs?`,
              a: `Yes, you can cancel your cab booking for free up to 24 hours before the trip. We pride ourselves on being the most flexible outstation cabs and taxi service provider in India.`,
            },
            {
              q: `Can I book an airport taxi for a midnight pickup?`,
              a: `Absolutely. Chiku Cabs provides 24/7 airport taxi services. Our professional taxi service drivers are always ready for on-time airport transfers.`,
            },
            {
              q: `Do you provide a tempo traveller on rent for wedding events?`,
              a: `Yes, we offer specialized tempo traveller booking for weddings and large groups, providing a luxurious group travel service experience.`,
            },
            {
              q: `Is Innova Crysta on rent available for corporate travel?`,
              a: `Yes, our luxury cab booking fleet includes the Innova Crysta on rent, which is the preferred choice for executive taxi service and corporate outings.`,
            },
            {
              q: `How do I calculate the per km rate for my cab booking?`,
              a: `Our per km rates for outstation cabs start at ₹9 for sedans. Use our transparent cab booking tool or call 8448445504 for an exact calculation for your taxi service.`,
            },
            {
              q: `What sets Chiku Cabs' taxi service apart from others?`,
              a: `Our commitment to 100% transparent pricing, zero hidden costs, highly maintained outstation cabs, and 24/7 dedicated customer support makes us India's leading taxi service.`,
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
            "⭐ Top Rated 2024",
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
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Call now and get instant confirmation for your {vehicle} rental.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-xl px-12 py-5 shadow-2xl"
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

      <EEATSection vehicle={vehicle} />
    </div>
  );
}
