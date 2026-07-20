import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import PopularCities from "@/components/shared/PopularCities";
import StatsBar from "../shared/StatsBar";


export default function ErtigaServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const city = parsedData.origin || "India";

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 px-4 text-slate-950 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-white" />
        <div className="relative max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_40px_80px_rgba(15,23,42,0.08)]">
            <div className="section-badge inline-flex mb-6 text-slate-950">
              ✨ PREMIUM Ertiga RENTAL
            </div>
            <div className="flex flex-wrap gap-3 mb-8 text-sm text-slate-600">
              {[
                "Music System",
                "Recliner Seats",
                "6/7 Seaters",
                "Premium AC",
              ].map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
                >
                  {feature}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
              Hire <span className="gradient-text">Ertiga</span> on Rent
              {city !== "India" && <> in {city}</>}
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600">
              Book premium airport transfers, family outings, and corporate travel
              with spacious 7+1 captain seats, dual AC comfort, and verified
              chauffeurs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-2xl"
              >
                📞 Book Ertiga — 8448445504
              </a>
              <a
                href="https://wa.me/918448445504?text=Hi%20I%20want%20to%20book%20an%20Ertiga%20%20on%20rent"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4"
              >
                💬 WhatsApp Us
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-700 sm:grid-cols-4">
              {[
                { label: "24/7 Support", icon: "🕒" },
                { label: "Verified Drivers", icon: "🛡️" },
                { label: "Instant Quotes", icon: "💬" },
                { label: "Best Rates", icon: "💰" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="font-semibold text-slate-950">{item.icon}</div>
                  <div className="text-xs text-slate-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-slate-200 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <img
                src="/chiku-Ertiga.png"
                alt={`Ertiga Crysta on Rent in ${city !== "India" ? city : "India"} by Chiku Cabs`}
                className="w-full h-[520px] min-h-[320px] object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center text-sm text-slate-700">
              {[
                { label: "Comfort", value: "7+1 Seats" },
                { label: "Power", value: "Auto AC" },
                { label: "Space", value: "Luggage Friendly" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    {card.label}
                  </div>
                  <div className="mt-2 font-semibold text-slate-950">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-y py-12"
        style={{
          background: "hsl(var(--foreground))",
          color: "hsl(var(--background))",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          {/* <div className="stats-grid">
            {[
              { num: "1 Lakh+", label: "Trips Completed" },
              { num: "1,000+", label: "Ertigas in Fleet" },
              { num: "100+", label: "Cities Covered" },
              { num: "4.9 ★", label: "Customer Rating" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div
                  className="stat-number"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {stat.num}
                </div>
                <div
                  className="stat-label"
                  style={{ color: "hsla(0,0%,100%,0.5)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
          <StatsBar />
        </div>
      </section>

      {/* Ertiga Variants */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              CHOOSE YOUR Ertiga
            </div>
            <h2 className="section-title">Ertiga Models Available</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ertiga",
                model: "Maruti Ertiga (7+1)",
                 image: "/ertiga-base.png",
                price: "₹14/km",
                features: [
                  "7+1 Seating",
                  "AC + Music",
                  "Good Legroom",
                  "Budget Friendly",
                ],
                best: false,
              },
              {
                name: "Ertiga VXi AT",
                model: "Maruti Ertiga",
                 image: "/ertiga-base.png",
                price: "₹17/km",
                features: [
                  "7+1 Captain Seats",
                  "Auto AC",
                  "Premium Interiors",
                  "Extra Luggage Space",
                ],
                best: true,
              },
              {
                name: "Ertiga ZXi Plus AT",
                model: "Maruti Ertiga (Hybrid)",
                 image: "/ertiga-base.png",
                price: "₹20/km",
                features: [
                  "7+1 Luxury Seats",
                  "Hybrid Engine",
                  "Panoramic Sunroof",
                  "Ultra Premium",
                ],
                best: false,
              },
            ].map((variant, i) => (
              <div
                key={i}
                className={`package-card ${variant.best ? "popular" : ""}`}
              >
                {variant.best && (
                  <div className="package-badge">Most Popular</div>
                )}
                <div className="mb-5">
  <img
    src={variant.image}
    alt={variant.name}
    className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
  />
</div>
                <h3 className="text-xl font-black mb-1">{variant.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {variant.model}
                </p>
                <div
                  className="package-price"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {variant.price}
                </div>
                <div className="package-unit">Per Kilometer</div>
                <ul className="package-features">
                  {variant.features.map((f, j) => (
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
                  Book {variant.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ertiga */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              WHY Ertiga
            </div>
            <h2 className="section-title">
              Why Ertiga is India's Favorite Family Car
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Friendly",
                desc: "Spacious 7+1 seating with ample legroom. Captain seats in Crysta model for ultimate comfort.",
              },
              {
                icon: "🛣️",
                title: "Highway King",
                desc: "Powerful diesel engine built for long-distance outstation trips. Smooth ride even on rough roads.",
              },
              {
                icon: "💼",
                title: "Corporate Choice",
                desc: "The preferred vehicle for corporate travel, client pickups, and executive transportation.",
              },
              {
                icon: "🧳",
                title: "Massive Boot Space",
                desc: "Can easily fit 4-5 large suitcases plus cabin bags. Perfect for airport trips and vacations.",
              },
              {
                icon: "❄️",
                title: "Powerful AC",
                desc: "Automatic climate control that keeps all rows equally cool. Rear AC vents for passengers.",
              },
              {
                icon: "🛡️",
                title: "Safety First",
                desc: "ABS, airbags, hill assist, and professional drivers trained for all road conditions.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card group">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl"
                  style={{ background: "hsla(358,73%,43%,0.1)" }}
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

      {/* Use Cases */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Popular Ertiga Rental Use Cases{" "}
              {city !== "India" ? `in ${city}` : ""}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                icon: "✈️",
                title: "Airport Transfers",
                desc: "Delhi, Mumbai, Bangalore & more",
              },
              {
                icon: "💒",
                title: "Wedding Car",
                desc: "Baarat, guest transfers, decor-ready",
              },
              {
                icon: "🏔️",
                title: "Hill Station Trips",
                desc: "Shimla, Manali, Ooty & more",
              },
              {
                icon: "🛕",
                title: "Pilgrimage Trips",
                desc: "Vaishno Devi, Tirupati & temples",
              },
              {
                icon: "🏢",
                title: "Corporate Travel",
                desc: "Client pickups & executive rides",
              },
              {
                icon: "🎉",
                title: "Family Vacations",
                desc: "Weekend getaways & road trips",
              },
            ].map((useCase, i) => (
              <div key={i} className="route-card">
                <div className="route-card-icon">{useCase.icon}</div>
                <div>
                  <div className="font-bold text-sm">{useCase.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {useCase.desc}
                  </div>
                </div>
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
            <h2 className="section-title">
              What Ertiga Customers in {city !== "India" ? city : "India"} Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sharma Family",
                text: "Booked an Ertiga Crysta for our family trip to Shimla. The captain seats were incredibly comfortable and the kids loved the space. Best road trip ever!",
                rating: "★★★★★",
              },
              {
                name: "Raj (CEO)",
                text: "We use Chiku Cabs Ertiga service for all our corporate client pickups. Always on time, impeccably clean cars, and professional drivers.",
                rating: "★★★★★",
              },
              {
                name: "Neha & Friends",
                text: "Hired an Ertiga for a weekend Jaipur trip from Delhi. The car was practically new, AC was amazing, and we had ample space for all our luggage.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">Ertiga Crysta Service</div>
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
            <h2 className="section-title">
              Ertiga Rental Questions {city !== "India" ? `for ${city}` : ""}
            </h2>
          </div>
          {[
            {
              q: `What is the difference between Ertiga and Ertiga Crysta on rent in ${city}?`,
              a: `The standard Ertiga is perfect for budget family travel in ${city}. Choosing an Ertiga Crysta on rent provides luxury features like captain seats, dual AC, and a more premium ride for your taxi service needs.`,
            },
            {
              q: `How much does an Ertiga cab booking cost per day in ${city}?`,
              a: `Ertiga cab booking in ${city} starts from ₹14/km. For the premium Ertiga Crysta on rent, the rate is ₹17/km. We ensure our taxi service remains the most affordable in the market.`,
            },
            {
              q: `Can I get an airport taxi with Ertiga for pickup in ${city}?`,
              a: `Yes! We specialize in 24/7 airport transfer services. Your airport taxi (Ertiga or Crysta) will be ready for you at ${city} airport for a comfortable group drop.`,
            },
            {
              q: `Is the Ertiga Crysta on rent suitable for hill station outstation cabs from ${city}?`,
              a: `Absolutely. The Ertiga's powerful engine makes it the best choice for outstation cabs heading to hilly areas. Our drivers are experts in high-altitude mountain routes.`,
            },
            {
              q: `Can I book an Ertiga for a wedding event in ${city}?`,
              a: `Yes! Our luxury cab booking service in ${city} includes premium Ertigas for weddings, perfect for guest transfers or as a comfortable car for the bride and groom.`,
            },
            {
              q: `How do I handle cab booking for a full-day city tour in ${city}?`,
              a: `You can opt for our local taxi service packages (8hr/80km or 12hr/120km) for your Ertiga cab booking in ${city}, allowing you to explore at your own pace.`,
            },
            {
              q: `Are the drivers for Ertiga taxi service in ${city} experienced?`,
              a: `Every driver in our Ertiga taxi service fleet is police-verified and has at least 5+ years of professional driving experience, ensuring your safety in ${city}.`,
            },
            {
              q: `Does the Ertiga Crysta on rent have enough space for luggage?`,
              a: `Yes, the Ertiga Crysta on rent is famous for its massive boot space. It can easily accommodate 4-5 large bags, making it ideal for airport transfer and outstation cabs.`,
            },
            {
              q: `What amenities are included in my luxury cab booking?`,
              a: `Your luxury cab booking includes a pristine AC cabin, premium seats, music system, and a 24/7 support line to assist you throughout your journey in ${city}.`,
            },
            {
              q: `How early should I book my Ertiga cab booking for ${city}?`,
              a: `To ensure the best rates and availability for your Ertiga Crysta on rent, we recommend completing your cab booking at least 24-48 hours in advance.`,
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
        <section className="py-24 px-4 bg-muted/20">
          <div className="max-w-7xl mx-auto">
              <PopularCities
    vehicleName={parsedData.vehicle || "Ertiga" || "Innova"}
    vehicleSlug={parsedData.slugs[1]}
    
    
/>
</div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Book Your Ertiga Crysta Now
          </h2>
          <p className="text-xl opacity-70 mb-8">
            India's most loved family car, at the best rental rates.
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

      {/* SEO Content Section */}
      {city !== "India" && (
        <section className="py-24 px-4 bg-muted/10 border-t">
          <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
              Premium Ertiga Crysta Rentals in {city}
            </h2>
            <div className="space-y-6">
              <p>
                When it comes to luxurious and spacious family travel in{" "}
                <strong>{city}</strong>, the Toyota Ertiga Crysta is the
                undisputed king. Whether you are navigating the busy streets or
                heading out on a scenic highway trip, choosing an{" "}
                <strong>Ertiga Crysta on Rent</strong> in {city} via our{" "}
                <strong>cab booking</strong> app guarantees a smooth ride. As a
                premier <strong>taxi service</strong>, we ensure your{" "}
                <strong>outstation cabs</strong> experience is unparalleled.
              </p>
              <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                Why Book an Ertiga Cab in {city}?
              </h3>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Outstation Cabs from {city}:</strong> Perfect for
                    weekend getaways and long-distance travel securely with our
                    verified <strong>taxi service</strong> drivers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>{city} Airport Taxi:</strong> Never worry about
                    fitting your luggage. Our massive boot space easily holds
                    bags for the whole family during{" "}
                    <strong>airport transfer</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Corporate & Wedding Car Rental:</strong> Arrive in
                    style. The premium feel of our{" "}
                    <strong>Ertiga Crysta on Rent</strong> makes it ideal for
                    executive transit or as an elegant wedding car in {city}.
                  </span>
                </li>
              </ul>
              <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                <p className="mb-0 text-card-foreground">
                  At Chiku Cabs, we offer both the standard 7-seater Ertiga and
                  the premium 8-seater Ertiga Crysta for{" "}
                  <strong>cab booking</strong> in {city} at highly competitive
                  rates. With our transparent per-km billing and pristine fleet,
                  we ensure your journey is absolutely perfect.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <InternalLinks parsedData={parsedData} />
      <EEATSection
        city={city !== "India" ? city : undefined}
        vehicle="Ertiga Crysta"
      />
    </div>
  );
}
