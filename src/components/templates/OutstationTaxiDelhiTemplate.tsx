import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import Link from "next/link";
import Head from "next/head";

export default function OutstationTaxiDelhiTemplate() {
  const faqs = [
    {
      q: "What is the starting fare for outstation taxi from Delhi?",
      a: "Outstation taxi fares from Delhi start from ₹9/km for compact sedans (Maruti Dzire/Honda Amaze), ₹13/km for comfortable SUVs (Maruti Ertiga), and ₹16/km for premium Toyota Innova Crysta. All quotes include fuel, clean AC vehicle, and experienced driver allowance.",
    },
    {
      q: "Do you provide dedicated one-way outstation cabs from Delhi?",
      a: "Yes. Chiku Cabs offers dedicated one-way drop taxis from Delhi to major cities including Jaipur, Agra, Chandigarh, Haridwar, Rishikesh, Dehradun, and Lucknow. You only pay for one side with zero return fare charges, saving up to 50%.",
    },
    {
      q: "Which vehicles are available for Delhi outstation cab booking?",
      a: "Our well-maintained outstation fleet includes Sedans (Dzire, Amaze, Etios), SUVs (Ertiga, Carens), Premium SUVs (Innova Crysta, Fortuner), and Luxury Force Tempo Travellers (9, 12, 16, 20, and 26-seater) for group and family journeys.",
    },
    {
      q: "Are expressway tolls and state border taxes included in the fare?",
      a: "The base fare includes vehicle rental, fuel, driver allowance, and GST. Expressway tolls (Yamuna Expressway, Delhi-Mumbai Expressway, Eastern Peripheral) and state border commercial permits are payable at actuals as per digital Fastag receipts.",
    },
    {
      q: "Can I book a Delhi airport pickup for a direct outstation trip?",
      a: "Yes. We offer 24×7 direct doorstep pickups from Delhi IGI Airport (Terminal 1, Terminal 2, and Terminal 3) with live flight monitoring and 45-minute complimentary waiting time after landing.",
    },
    {
      q: "How experienced are your chauffeurs for highway and hill station driving?",
      a: "Every Chiku Cabs driver has a minimum of 7+ years of highway driving experience, valid commercial badge, police verification, and specialized training for mountain ghats (Shimla, Manali, Nainital, Mussoorie) and night expressway transit.",
    },
    {
      q: "Can I book outstation cabs from Noida, Gurugram, Ghaziabad, or Faridabad?",
      a: "Yes, 100% doorstep pickup is available anywhere across Delhi NCR, including Gurugram Cyber City, Noida, Greater Noida, Ghaziabad, Indirapuram, Faridabad, Dwarka, and Rohini at no extra local pickup surcharge.",
    },
    {
      q: "What is the cancellation policy for Delhi outstation taxi bookings?",
      a: "We offer zero-fee cancellation up to 24 hours before your scheduled pickup time. If your travel plans change unexpectedly, contact our 24/7 support desk for instant free rescheduling or cancellation.",
    },
    {
      q: "Do you provide multi-day round-trip packages from Delhi?",
      a: "Yes, we specialize in multi-day road trip itineraries including the Golden Triangle (Delhi-Agra-Jaipur), Himachal tours (Shimla, Manali, Dharamshala), Uttarakhand pilgrimages (Char Dham, Haridwar, Rishikesh), and Rajasthan heritage circuits.",
    },
    {
      q: "Can we request multiple refreshment halts and sightseeing breaks en route?",
      a: "Absolutely. You enjoy full flexibility to stop at verified highway dhabas (like Murthal or Shiva Tourist Dhaba), family restaurants, washrooms, and popular tourist monuments along your travel corridor.",
    },
    {
      q: "Are computerized GST tax invoices provided for corporate outstation travel?",
      a: "Yes. Computerized GST tax invoices with your company name and GSTIN are automatically generated and emailed immediately upon trip completion for corporate reimbursement.",
    },
    {
      q: "How can I book an outstation taxi from Delhi instantly?",
      a: "You can book instantly online on chikucabs.com, call our 24/7 hotline at 8448445504, or connect with our dispatch team on WhatsApp (+91 6280820037) for live car photos and confirmed booking receipts in under 5 minutes.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>Outstation Taxi Delhi | Best Fare Cab Booking – Chiku Cabs</title>
        <meta
          name="description"
          content="Book one-way and round-trip outstation taxi from Delhi to Jaipur, Agra, Chandigarh, Haridwar, Dehradun & all India destinations. Starting ₹9/km. Call 8448445504."
        />
        <link rel="canonical" href="https://chikucabs.com/outstation-taxi-delhi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="bg-background min-h-screen">
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
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
                )}`}
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
              { name: "Sedan", price: "₹9/km" },
              { name: "Hatchback", price: "₹12/km" },
              { name: "Innova", price: "₹18/km" },
            ].map((item, i) => (
              <div key={i} className="premium-card p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">{item.name}</h3>
                <div className="text-4xl font-black text-primary mb-4">
                  {item.price}
                </div>
                <p className="text-muted-foreground mb-6">Starting fare</p>

                <a
                  href={`https://wa.me/916280820037?text=${encodeURIComponent(
                    "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3"
                >
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

      {/* Whatsapp Float */}
      <WhatsAppFloat />
    </div>
    </>
  );
}
