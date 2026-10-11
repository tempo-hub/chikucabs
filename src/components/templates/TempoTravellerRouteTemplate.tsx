import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import { getNearbyRoutes, getAnchorText } from "@/lib/internalLinks";
import { routesByCity } from "@/data/allRoutes";

export default function TempoTravellerRouteTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const startCity = parsedData.origin || "Origin";
  const endCity = parsedData.destination || "Destination";

  const citySlug = startCity.toLowerCase().replace(/\s+/g, "-");

  const TEMPO_CITY_PAGES: Record<string, string> = {
    delhi: "/tempo-from-delhi",
    ghaziabad: "/tempo-from-ghaziabad",
  };

  const link = TEMPO_CITY_PAGES[citySlug] || "/tempo-traveller-on-rent";

  const currentUrl = `/${citySlug}/tempo-traveller-hire-${citySlug}-to-${endCity
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const routes = routesByCity[citySlug] || [];

  const routePages = routes.map((r: { slug: string }) => ({
    slug: r.slug,
  }));

  const nearbyRoutes = getNearbyRoutes(currentUrl, routePages);

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
      <section className="relative py-24 px-4 overflow-hidden bg-muted/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <div className="section-badge">🚐 TEMPO TRAVELLER HIRE</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
              <span className="gradient-text">Tempo Traveller</span> from <br />
              {startCity} to {endCity}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Planning a group trip from <strong>{startCity}</strong> to{" "}
              <strong>{endCity}</strong>? Experience hassle-free{" "}
              <strong>tempo traveller booking</strong> with our premium{" "}
              <strong>tempo traveller on rent</strong> service. Enjoy
              comfortable pushback seats, a professional driver, and transparent
              all-inclusive pricing. Whether you're traveling with family or
              organizing a corporate <strong>group travel service</strong>, our{" "}
              <strong>outstation tempo traveller</strong> ensures a smooth and
              relaxing journey. Also, explore our{" "}
              <a
                href={link}
                className="text-primary font-semibold underline hover:text-primary/80"
              >
                tempo traveller from {citySlug}
              </a>{" "}
              service for long-distance group travel options.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-2xl"
              >
                📞 Get Quote — 8448445504
              </a>

              <a
                href={`https://wa.me/916280820037?text=${encodeURIComponent(
                  "Hi Chiku Cabs, I am interested in booking a Tempo Traveller through your website. Please help me with the booking.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
          <div className="flex-1 w-full" style={{ maxWidth: "28rem" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9]">
              <img
                src="/tempo_traveller.png"
                alt={`Tempo Traveller on Rent from ${startCity} to ${endCity} by Chiku Cabs`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Route Stats */}
      <section className="border-b py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "🚐", label: `${startCity} → ${endCity}` },
              { num: "AC", label: "Pushback Seats" },
              { num: "24/7", label: "Driver Included" },
              { num: "₹18+", label: "Per KM" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing by Seating */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              PRICING
            </div>
            <h2 className="section-title">
              {startCity} to {endCity} Tempo Traveller Rates
            </h2>
            <p className="section-subtitle mx-auto">
              Choose the seating capacity that fits your group.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                seats: "9 Seater",
                price: "₹20/km",
                desc: "Ideal for small families",
                best: false,
              },
              {
                seats: "12 Seater",
                price: "₹22/km",
                desc: "Best for medium groups",
                best: true,
              },
              {
                seats: "16 Seater",
                price: "₹25/km",
                desc: "Perfect for large groups",
                best: false,
              },
              {
                seats: "20 Seater",
                price: "₹29/km",
                desc: "Maximum capacity",
                best: false,
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`package-card ${pkg.best ? "popular" : ""}`}
              >
                {pkg.best && <div className="package-badge">Most Popular</div>}
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  🚐
                </div>
                <h3 className="text-xl font-black mb-1">{pkg.seats}</h3>
                <div
                  className="package-price"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {pkg.price}
                </div>
                <div className="package-unit">{pkg.desc}</div>
                <ul className="package-features">
                  {[
                    "AC Pushback Seats",
                    "Driver + Fuel Incl.",
                    "Luggage Carrier",
                    "Music System",
                  ].map((f, j) => (
                    <li key={j}>
                      <span className="text-green-500">✔</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/916280820037?text=${encodeURIComponent(
                    `Hi Chiku Cabs, I am interested in booking a Tempo Traveller (${pkg.seats}) through your website. Please help me with the booking.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm"
                  style={{ display: "block", textAlign: "center" }}
                >
                  Book {pkg.seats}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Tempo Traveller */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Why Hire a Tempo Traveller from {startCity}?
            </h2>
            <p className="section-subtitle mx-auto">
              The best <strong>tempo traveller on rent</strong> for your group's{" "}
              <strong>outstation tempo traveller</strong> needs. Our{" "}
              <strong>group travel service</strong> provides the most reliable{" "}
              <strong>tempo traveller booking</strong> experience for large
              families and corporate teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "👥",
                title: "Travel Together",
                desc: `Keep your entire group together in one vehicle from ${startCity} to ${endCity}. No need for multiple cabs.`,
              },
              {
                icon: "💰",
                title: "Cost Effective",
                desc: "Split the fare among group members and save 40-60% compared to booking individual cabs.",
              },
              {
                icon: "🧳",
                title: "Ample Luggage Space",
                desc: "Roof carrier and boot space to accommodate luggage for the entire group.",
              },
              {
                icon: "🛡️",
                title: "Safe & Verified",
                desc: "GPS-tracked vehicles with experienced, background-verified drivers familiar with the route.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ background: "hsla(358,73%,43%,0.1)" }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Nearby Routes from {startCity}
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explore similar destinations and plan your group trip with more
          options.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyRoutes.map((route) => (
            <a
              key={route.slug}
              href={route.slug}
              className="homepage-service-card group"
            >
              <h3 className="text-xl font-semibold mb-2">
                {getAnchorText(route.slug)}
              </h3>

              <p className="text-muted-foreground mb-4">
                Tempo Traveller Booking
              </p>

              <span className="text-primary font-semibold">View Fare →</span>
            </a>
          ))}
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
            <h2 className="section-title">Travelers Love Our Tempo Service</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Suresh & Group",
                text: `Hired a 16-seater tempo from ${startCity} to ${endCity}. The vehicle was brand new, AC worked perfectly, and the driver was very experienced. Highly recommended!`,
                rating: "★★★★★",
              },
              {
                name: "Anjali (Tour Organizer)",
                text: "We regularly book Tempo Travellers from Chiku Cabs for our tour groups. Always on time, clean vehicles, and professional drivers.",
                rating: "★★★★★",
              },
              {
                name: "Corporate Team",
                text: "Used for our company offsite. The 20-seater was spacious and comfortable. Everyone in the team had a great experience.",
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
            <h2 className="section-title">Tempo Traveller Booking Questions</h2>
          </div>
          {[
            
  {
    q: `How much does a Tempo Traveller on rent cost from ${startCity} to ${endCity}?`,
    a: `The Tempo Traveller fare from ${startCity} to ${endCity} depends on the seating capacity, route distance, trip duration and vehicle type. Fares may vary for 12-seater, 16-seater, 20-seater and larger vehicles. Contact Chiku Cabs for the applicable fare for your travel dates.`,
  },
  {
    q: `Which Tempo Traveller should I book from ${startCity} to ${endCity}?`,
    a: `The suitable Tempo Traveller depends mainly on your group size and luggage. Smaller groups can choose a lower-capacity vehicle, while larger groups may prefer 20-seater or 26-seater options for additional passenger capacity and luggage space.`,
  },
  {
    q: `Are Tempo Traveller seats comfortable for the journey from ${startCity} to ${endCity}?`,
    a: `Tempo Travellers are designed for group and long-distance travel and can include pushback or reclining seats, air conditioning and comfortable passenger space. Specific features may vary depending on the vehicle model.`,
  },
  {
    q: `Can I make multiple stops during my Tempo Traveller trip from ${startCity} to ${endCity}?`,
    a: `Yes. Multiple stops can generally be included in your itinerary, subject to the agreed route, trip duration and booking terms. You can discuss sightseeing stops, restaurants and other planned locations with the booking team.`,
  },
  {
    q: `Why should I book a Tempo Traveller from ${startCity} to ${endCity}?`,
    a: `A Tempo Traveller allows your group to travel together in a single vehicle instead of arranging multiple cars. It can be convenient for families, friends, corporate groups, weddings and other group journeys.`,
  },
  {
    q: `Can I book a Tempo Traveller for a wedding group from ${startCity}?`,
    a: `Yes. Tempo Travellers can be booked for wedding guest transfers, family transportation and other group travel requirements. Multi-day bookings may also be available depending on the itinerary and vehicle availability.`,
  },
  {
    q: `Is a driver included with the Tempo Traveller booking?`,
    a: `Yes. Tempo Traveller bookings are provided with a professional driver. Driver availability and applicable driver-related charges depend on the selected package, route and trip duration.`,
  },
  {
    q: `What seating capacities are available for Tempo Traveller booking?`,
    a: `Depending on availability, Tempo Traveller options can include 9-seater, 12-seater, 16-seater, 20-seater and larger-capacity vehicles such as 26-seater Force Travellers. The available options may vary by route and travel date.`,
  },
  {
    q: `Are there any additional charges for an outstation Tempo Traveller?`,
    a: `The final fare depends on the selected vehicle, route, distance, trip duration and applicable booking terms. Any tolls, parking, permits, taxes, driver allowances or other applicable charges should be confirmed with the booking team before the trip.`,
  },
  {
    q: `How early should I book a Tempo Traveller from ${startCity}?`,
    a: `Advance booking is recommended, especially for weekends, holidays, peak travel periods and wedding seasons. Booking early gives you a better chance of getting your preferred seating capacity and travel dates.`,
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

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Book Tempo Traveller: {startCity} → {endCity}
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Get the best group travel rates. Instant confirmation on call.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-lg px-10 py-4 shadow-2xl"
            >
              📞 Call 8448445504
            </a>

            <a
              href={`https://wa.me/916280820037?text=${encodeURIComponent(
                "Hi Chiku Cabs, I am interested in booking a Tempo Traveller through your website. Please help me with the booking.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <EEATSection city={startCity} vehicle="Tempo Traveller" />
    </div>
  );
}
