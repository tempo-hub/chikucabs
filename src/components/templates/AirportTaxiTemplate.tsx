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
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Home
        </Link>

        <span>›</span>

        <Link
          href="/airport-taxi"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Airport Taxi
        </Link>
      </nav>

      {/* Hero */}
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

      {/* Fare Cards */}
      <section className="py-24 px-4 bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Airport Taxi Fare Options</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Sedan", price: "₹799" },
              { name: "SUV", price: "₹1199" },
              { name: "Innova", price: "₹1499" },
              { name: "Crysta", price: "₹1999" },
            ].map((item, i) => (
              <div key={i} className="premium-card p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">{item.name}</h3>
                <div className="text-4xl font-black text-primary mb-4">
                  {item.price}
                </div>
                <p className="text-muted-foreground mb-6">Starting fare</p>

                <a href="tel:+918448445504" className="btn-primary px-6 py-3">
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Why Choose Our Airport Taxi?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "24x7 Availability",
              "Flight Tracking",
              "On Time Pickup",
              "Clean Cars",
              "Verified Drivers",
              "Fixed Pricing",
              "Meet & Greet",
              "Quick Booking",
            ].map((item, i) => (
              <div key={i} className="premium-card p-6 text-center font-bold">
                ✅ {item}
              </div>
            ))}
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
        <div className="max-w-4xl mx-auto cta-banner text-center">
          <h2 className="text-4xl font-black mb-4">Book Airport Taxi Now</h2>

          <p className="text-lg opacity-80 mb-8">
            Instant booking for airport pickup & drop service.
          </p>

          <a
            href="tel:+918448445504"
            className="btn-primary px-10 py-4 text-lg"
          >
            📞 8448445504
          </a>
        </div>
      </section>

      {/* Whatsapp Float */}
      <WhatsAppFloat />
    </div>
  );
}
