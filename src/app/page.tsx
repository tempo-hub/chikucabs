import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiku Cabs | India's #1 Premium Taxi & Cab Rental Service",
  description:
    "Book premium outstation cabs, tempo travellers, and airport taxis across 100+ cities in India. Verified drivers, transparent pricing, 24/7 support. Call 8448445504.",
  keywords: [
    "cab booking India",
    "outstation cabs",
    "taxi service",
    "tempo traveller",
    "airport taxi",
    "one way cab",
    "Chiku Cabs",
  ],
  openGraph: {
    title: "Chiku Cabs | India's #1 Premium Taxi & Cab Rental Service",
    description:
      "Book premium outstation cabs, tempo travellers, and airport taxis across 100+ cities in India.",
    url: "https://chikucabs.com",
    siteName: "Chiku Cabs",
    locale: "en_IN",
    type: "website",
  },
};

interface StatItem {
  num: string;
  label: string;
}

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ═══════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════ */}
      <section className="homepage-hero">
        {/* Background Image Layer */}
        <img
          src="/cab.png"
          alt="Premium Ride Background"
          className="absolute w-full h-full object-cover z-[1]"
          style={{ inset: 0, opacity: 0.3, pointerEvents: "none" }}
        />

        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>

        <div className="max-w-7xl mx-auto px-4 relative" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center text-center">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex", marginBottom: "1.5rem" }}
            >
              ★ INDIA&apos;S MOST TRUSTED CAB SERVICE
            </div>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
              style={{ lineHeight: 1.05 }}
            >
              Your Journey,
              <br />
              Our <span className="gradient-text">Premium</span> Ride
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Book outstation cabs, airport taxis, tempo travellers &amp; luxury
              car rentals across <strong>100+ cities</strong> in India. Verified
              drivers. Transparent pricing. Zero hidden charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-10 py-4 shadow-xl"
                id="hero-call-btn"
              >
                📞 Book Now — 8448445504
              </a>
              <a
                href="https://wa.me/918448445504?text=Hi%2C%20I%20want%20to%20book%20a%20cab"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-10 py-4"
                id="hero-whatsapp-btn"
              >
                💬 WhatsApp Us
              </a>
            </div>
            <div className="hero-trust-strip">
              <span>🛡️ Verified Drivers</span>
              <span className="hero-trust-divider">|</span>
              <span>⭐ 4.9 Rated</span>
              <span className="hero-trust-divider">|</span>
              <span>🚗 1L+ Trips</span>
              <span className="hero-trust-divider">|</span>
              <span>🕐 24/7 Support</span>
            </div>
          </div>
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

      {/* ═══════════════════════════════════════════
                SERVICES GRID
            ═══════════════════════════════════════════ */}
      <section className="py-24 px-4" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              OUR SERVICES
            </div>
            <h2 className="section-title">
              Everything You Need, One Call Away
            </h2>
            <p className="section-subtitle mx-auto">
              From local sightseeing to long-distance outstation trips —
              we&apos;ve got you covered.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Outstation Cabs",
                desc: "One-way & round-trip across India",
                icon: "🛣️",
                href: "/outstation-cabs",
                color: "#f59e0b",
              },
              {
                name: "One Way Cabs",
                desc: "Pay only for one side, save 50%",
                icon: "➡️",
                href: "/one-way-cabs",
                color: "#3b82f6",
              },
              {
                name: "Airport Taxi",
                desc: "On-time pickups & drop-offs",
                icon: "✈️",
                href: "/airport-taxi",
                color: "#8b5cf6",
              },
              {
                name: "Local Hire",
                desc: "Hourly packages for city travel",
                icon: "🏙️",
                href: "/local-sightseeing-taxi",
                color: "#10b981",
              },
              {
                name: "Tempo Traveller",
                desc: "12–20 seater for group trips",
                icon: "🚌",
                href: "/tempo-traveller-on-rent",
                color: "#ef4444",
              },
              {
                name: "Car Rental",
                desc: "Self-drive & chauffeur options",
                icon: "🚗",
                href: "/car-rental",
                color: "#06b6d4",
              },
              {
                name: "Bus on Rent",
                desc: "20–50 seater for large groups",
                icon: "🚍",
                href: "/bus-on-rent",
                color: "#ec4899",
              },
              {
                name: "Innova Crysta",
                desc: "Luxury ride for premium comfort",
                icon: "✨",
                href: "/innova-car-rental",
                color: "#f97316",
              },
            ].map((service, i) => (
              <a
                key={i}
                href={service.href}
                className="homepage-service-card group"
                id={`service-${i}`}
              >
                <div
                  className="service-card-icon"
                  style={{
                    background: `${service.color}15`,
                    color: service.color,
                  }}
                >
                  <span style={{ fontSize: "1.75rem" }}>{service.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
                <span className="service-card-arrow group">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
                HOW IT WORKS
            ═══════════════════════════════════════════ */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              HOW IT WORKS
            </div>
            <h2 className="section-title">Book Your Ride in 60 Seconds</h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="steps-container">
            {[
              {
                num: "1",
                icon: "📱",
                title: "Call or WhatsApp",
                desc: "Reach us at 8448445504 with your pickup, destination, and date. That's it!",
              },
              {
                num: "2",
                icon: "🚗",
                title: "Choose Your Ride",
                desc: "Pick from Sedan, SUV, Innova, Tempo Traveller or Bus. We'll suggest the best fit.",
              },
              {
                num: "3",
                icon: "✅",
                title: "Sit Back & Enjoy",
                desc: "Verified driver arrives at your doorstep, on time. Track your ride in real-time.",
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

      {/* ═══════════════════════════════════════════
                FLEET SHOWCASE
            ═══════════════════════════════════════════ */}
      <section className="py-24 px-4" id="fleet">
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
              Meticulously maintained vehicles with AC, clean interiors, and
              premium comfort.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Sedan",
                models: "Dzire, Etios, Amaze",
                price: "₹9",
                unit: "/km",
                capacity: "4+1 Seater",
                icon: "🚘",
                tag: "BUDGET FRIENDLY",
              },
              {
                name: "SUV",
                models: "Ertiga, Marazzo, XUV",
                price: "₹12",
                unit: "/km",
                capacity: "6+1 Seater",
                icon: "🚙",
                tag: "FAMILY FAVORITE",
              },
              {
                name: "Innova Crysta",
                models: "Crysta, HyCross",
                price: "₹15",
                unit: "/km",
                capacity: "7+1 Seater",
                icon: "✨",
                tag: "MOST POPULAR",
              },
              {
                name: "Tempo Traveller",
                models: "Force 12S, 16S, 20S",
                price: "₹20",
                unit: "/km",
                capacity: "12–20 Seater",
                icon: "🚌",
                tag: "GROUP TRIPS",
              },
            ].map((car, i) => (
              <div key={i} className="fleet-card" id={`fleet-${i}`}>
                <div className="fleet-tag">{car.tag}</div>
                <div className="fleet-icon">{car.icon}</div>
                <h3 className="text-xl font-black mb-1">{car.name}</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  {car.models}
                </p>
                <div className="fleet-price">
                  <span className="fleet-price-from">FROM</span>
                  <span className="fleet-price-value">{car.price}</span>
                  <span className="fleet-price-unit">{car.unit}</span>
                </div>
                <div className="text-xs font-bold opacity-50 mb-6">
                  {car.capacity}
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

      {/* ═══════════════════════════════════════════
                POPULAR ROUTES
            ═══════════════════════════════════════════ */}
      <section className="bg-muted/30 py-24 border-y px-4" id="routes">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              POPULAR ROUTES
            </div>
            <h2 className="section-title">
              Top Outstation Routes Across India
            </h2>
            <p className="section-subtitle mx-auto">
              Serving 1200+ routes with the best rates. Here are some of our
              most booked ones.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                route: "Delhi → Shimla",
                icon: "🏔️",
                href: "/delhi/tempo-traveller-hire-delhi-to-shimla",
              },
              {
                route: "Delhi → Manali",
                icon: "⛰️",
                href: "/delhi/tempo-traveller-hire-delhi-to-mcleodganj",
              },
              {
                route: "Delhi → Dharamshala",
                icon: "🛕",
                href: "/delhi/tempo-traveller-hire-delhi-to-dharmsala",
              },
              {
                route: "Varanasi → Lucknow",
                icon: "🌆",
                href: "/varanasi/varanasi-to-lucknow-cab",
              },
              {
                route: "Varanasi → Allahabad",
                icon: "🕌",
                href: "/varanasi/varanasi-to-allahabad-cab",
              },
              {
                route: "Delhi → Kedarnath",
                icon: "🛕",
                href: "/delhi/tempo-traveller-hire-delhi-to-kedarnath",
              },
              {
                route: "Delhi → Rishikesh",
                icon: "🌊",
                href: "/delhi/tempo-traveller-hire-delhi-to-triveni-ghat-rishikesh",
              },
              {
                route: "Delhi → Jibhi",
                icon: "🌲",
                href: "/delhi/tempo-traveller-hire-delhi-to-jibhi",
              },
              {
                route: "Delhi → Bir Billing",
                icon: "🪂",
                href: "/delhi/tempo-traveller-hire-delhi-to-bir-billing",
              },
            ].map((r, i) => (
              <a key={i} href={r.href} className="route-card" id={`route-${i}`}>
                <div className="route-card-icon">{r.icon}</div>
                <span className="font-semibold">{r.route}</span>
                <span
                  style={{ marginLeft: "auto", opacity: 0.3, fontWeight: 900 }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/outstation-cabs"
              className="btn-outline px-8 py-3 font-bold"
            >
              View All 1200+ Routes →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
                WHY CHOOSE US
            ═══════════════════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY CHIKU CABS
            </div>
            <h2 className="section-title">Why 1 Lakh+ Travelers Trust Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Verified Chauffeurs",
                desc: "Every driver undergoes police verification, background checks, and professional training. Your safety is non-negotiable.",
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                desc: "What you see is what you pay. No hidden charges, no surge pricing, no surprise tolls at the end.",
              },
              {
                icon: "📍",
                title: "Live GPS Tracking",
                desc: "Track your ride in real-time. Share trip status with family for complete peace of mind.",
              },
              {
                icon: "⏰",
                title: "24/7 Availability",
                desc: "Book anytime, travel anytime. Our support team is available round the clock, even on holidays.",
              },
              {
                icon: "🔄",
                title: "Free Cancellation",
                desc: "Plans changed? Cancel up to 24 hours before the trip at zero charges. Full flexibility guaranteed.",
              },
              {
                icon: "🚗",
                title: "Premium Fleet",
                desc: "Newer models only. Dual AC, clean interiors, spacious boot. Every ride feels like a luxury experience.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card group" id={`feature-${i}`}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl"
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

      {/* ═══════════════════════════════════════════
                TESTIMONIALS
            ═══════════════════════════════════════════ */}
      <section className="bg-muted/30 py-24 border-y px-4" id="reviews">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              CUSTOMER REVIEWS
            </div>
            <h2 className="section-title">Loved by Thousands of Travelers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Khanna",
                text: "Booked a Delhi to Shimla cab for a family trip. The Innova was spotless, driver was professional, and reached exactly on time. Will use again!",
                route: "Delhi → Shimla",
                rating: "★★★★★",
              },
              {
                name: "Meera Joshi",
                text: "Used Chiku Cabs for a one-way trip from Varanasi to Lucknow. Saved 50% compared to other services. Transparent pricing, no surprises at the end.",
                route: "Varanasi → Lucknow",
                rating: "★★★★★",
              },
              {
                name: "Aman Tiwari",
                text: "Our go-to cab service for all corporate travel. Punctual drivers, clean cars, and the 24/7 support team is incredibly responsive. Highly recommended!",
                route: "Corporate Client",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card" id={`review-${i}`}>
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">&quot;{review.text}&quot;</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">{review.route}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
                FAQ
            ═══════════════════════════════════════════ */}
      <section className="py-24 px-4" id="faq">
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
              q: "How do I book a cab with Chiku Cabs?",
              a: "Booking is simple! Call us at 8448445504 or send a WhatsApp message with your travel details (pickup, destination, date). You'll get an instant quote and confirmation. No app download needed.",
            },
            {
              q: "What cities do you operate in?",
              a: "We operate across 100+ cities in India including Delhi, Varanasi, Lucknow, Jaipur, Shimla, Manali, Chennai, Bangalore, Mumbai, Chandigarh, and many more. We serve 1200+ outstation routes.",
            },
            {
              q: "Are there any hidden charges?",
              a: "Absolutely not. Our pricing includes base fare, driver allowance, fuel, GST, night charges, and state permit fees. The only extras are toll taxes (as per actual) and parking fees — which we inform you about upfront.",
            },
            {
              q: "Can I book a one-way cab?",
              a: "Yes! We offer one-way cab services that can save you up to 50% compared to traditional round-trip bookings. Available on all major routes across India.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept Cash, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Corporate billing. You can pay at the end of the trip or prepay online.",
            },
          ].map((faq, i) => (
            <details key={i} className="faq-item" id={`faq-${i}`}>
              <summary>
                {faq.q}
                <span className="faq-chevron">▼</span>
              </summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
                TRUST BADGES
            ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
                FINAL CTA
            ═══════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Call now for instant confirmation. Best rates guaranteed across
            India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-xl px-12 py-5 shadow-2xl"
              id="cta-call-btn"
            >
              📞 Call 8448445504
            </a>
            <a
              href="https://wa.me/918448445504?text=Hi%2C%20I%20want%20to%20book%20a%20cab"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-10 py-4"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
              id="cta-whatsapp-btn"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
