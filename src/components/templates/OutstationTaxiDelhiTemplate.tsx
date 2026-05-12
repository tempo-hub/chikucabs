import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import Link from "next/link";

export default function OutstationTaxiDelhiTemplate() {
  const faqs = [
    {
      q: "What is the starting fare for outstation taxi from Delhi?",
      a: "Outstation taxi fare from Delhi starts from affordable per km rates depending on cab type, route, trip duration, and season.",
    },
    {
      q: "Do you provide one way taxi from Delhi?",
      a: "Yes, we provide one way as well as round trip taxi services from Delhi to all major destinations.",
    },
    {
      q: "Which vehicles are available?",
      a: "Sedan, SUV, Ertiga, Innova, Crysta, Tempo Traveller and luxury vehicles are available.",
    },
    {
      q: "Are toll tax and parking included?",
      a: "Toll tax, parking and state tax are shared transparently before booking depending on route.",
    },
    {
      q: "How can I book instantly?",
      a: "You can call or WhatsApp us anytime for quick booking confirmation and live fare quote.",
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
          Outstation Taxi Delhi
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
              DELHI OUTSTATION CAB
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Outstation Taxi Delhi <br />
              <span className="gradient-text">Best Fare Booking</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Book reliable one way and round trip outstation taxi from Delhi to
              Jaipur, Agra, Haridwar, Chandigarh, Dehradun and all India
              destinations with professional drivers and transparent pricing.
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
                alt="Outstation Taxi Delhi"
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
            <h2 className="section-title">Taxi Fare Options</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Sedan", price: "₹11/km" },
              { name: "SUV", price: "₹14/km" },
              { name: "Innova", price: "₹18/km" },
              { name: "Crysta", price: "₹22/km" },
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
            <h2 className="section-title">Why Choose Our Delhi Taxi?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "24x7 Support",
              "Verified Drivers",
              "Clean Cars",
              "No Hidden Charges",
              "One Way Available",
              "Fast Booking",
              "All India Routes",
              "Best Price",
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

            <h2 className="section-title">Outstation Taxi Delhi Questions</h2>
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

                <div className="pl-12 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner text-center">
          <h2 className="text-4xl font-black mb-4">
            Book Delhi Outstation Taxi Now
          </h2>

          <p className="text-lg opacity-80 mb-8">
            Call now for instant quote and quick booking confirmation.
          </p>

          <a
            href="tel:+918448445504"
            className="btn-primary px-10 py-4 text-lg"
          >
            📞 8448445504
          </a>
        </div>
      </section>

      {/* Internal Linking Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Explore More Outstation Taxi Services
          </h3>

          <p className="text-muted-foreground leading-relaxed">
            Looking for more travel options? Check our popular services like{" "}
            <Link href="/outstation-cabs" className="text-primary underline">
              Outstation Cabs
            </Link>
            ,{" "}
            <Link
              href="/outstation-cabs-from-airport"
              className="text-primary underline"
            >
              Airport Outstation Taxi
            </Link>
            ,{" "}
            <Link
              href="/outstation-taxi-service-in-varanasi"
              className="text-primary underline"
            >
              Varanasi Taxi Service
            </Link>{" "}
            and{" "}
            <Link
              href="/outstation-taxi-service-in-kanpur"
              className="text-primary underline"
            >
              Kanpur Taxi Service
            </Link>
            . Book reliable and affordable cabs for all your travel needs.
          </p>
        </div>
      </section>
    </div>
  );
}
