import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";

export default function LocalServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const city = parsedData.origin || "your city";
  const vehicle = parsedData.vehicle || "Cab";

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
      return { icon: "🚘", image: "/hourlyrental.webp" };
    }
  };
  const vDetails = getVehicleDetails(vehicle);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
     <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-white to-slate-50">
  {/* Background Glow */}
  <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
  <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-16 lg:py-16">

      {/* LEFT CONTENT */}
      <div className="text-center lg:text-left">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-5
          rounded-full bg-primary/10 border border-primary/20
          text-primary text-xs sm:text-sm font-bold tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          PREMIUM CAR RENTAL
        </div>

        {/* H1 */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
          font-extrabold tracking-tight text-slate-900
          leading-[1.08]"
        >
         {vehicle} on Rent in <span className="block text-primary">{city} </span> at Best Price
  {/* <span className="block text-primary">
    Book Now
  </span> */}
        </h1>

        {/* Description */}
        <p
          className="mt-5 text-lg sm:text-xl text-slate-600
          leading-relaxed max-w-2xl mx-auto lg:mx-0"
        >
          Explore {city} with ease. Experience reliable{" "}
  <strong>cab booking</strong> and{" "}
  <strong>local car rental services</strong> with our professional
  chauffeurs who know the city inside out. Whether you need a car for{" "}
  <strong>local sightseeing</strong>,{" "}
  <strong>business travel</strong>,{" "}
  <strong>shopping</strong>,{" "}
  <strong>airport transfers</strong>, or multiple stops, we ensure you
  travel comfortably and on time.
        </p>

       

        {/* CTA */}
        <div
          className="mt-8 flex flex-col sm:flex-row gap-3
          justify-center lg:justify-start"
        >
          <a
            href="tel:+918448445504"
            className="inline-flex items-center justify-center gap-2
              min-h-14 px-7 rounded-xl bg-primary text-white
              font-bold text-base sm:text-lg
              shadow-lg shadow-primary/20
              hover:-translate-y-0.5 hover:shadow-xl
              transition-all duration-300"
          >
            📞 Book {vehicle}
          </a>

          <a
            href={`https://wa.me/916280820037?text=${encodeURIComponent(
              `Hi Chiku Cabs, I want to book a ${vehicle} rental in ${city}. Please share the available cars and prices.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2
              min-h-14 px-7 rounded-xl bg-white
              border border-slate-300 text-slate-800
              font-bold text-base sm:text-lg
              hover:border-primary hover:text-primary
              transition-all duration-300"
          >
            💬 Get Price
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">

          <div className="text-center lg:text-left">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              ✓ Verified
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Professional drivers
            </p>
          </div>

          <div className="text-center lg:text-left">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              ✓ Comfortable
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Well-maintained cars
            </p>
          </div>

          <div className="text-center lg:text-left">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              ✓ Transparent
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear prices
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT VEHICLE CARD */}
      <div className="w-full max-w-xl mx-auto lg:max-w-none">

        <div className="relative">

          {/* Floating Price */}
          <div
            className="absolute -top-3 right-4 sm:right-6 z-20
            bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl"
          >
            <p className="text-[10px] uppercase tracking-wider opacity-70">
              Starting Price
            </p>

            <p className="font-extrabold text-lg">
              ₹1,500
            </p>
          </div>

          {/* Main Card */}
          <div
            className="bg-white rounded-3xl overflow-hidden
            border border-slate-200 shadow-2xl shadow-slate-900/10"
          >

            {/* Image */}
            <div
              className="relative aspect-[16/10] sm:aspect-[16/9]
              overflow-hidden bg-slate-100"
            >
              <img
                src={vDetails.image}
                alt={`${vehicle} car rental in ${city} - Chiku Cabs`}
                className="w-full h-full object-cover
                  transition-transform duration-700 hover:scale-105"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t
                from-black/60 via-black/5 to-transparent"
              />

              {/* Vehicle Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between gap-3">

                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      Chauffeur Driven
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {vehicle}
                    </h2>
                  </div>

                  <span
                    className="hidden sm:inline-flex px-3 py-2
                    rounded-lg bg-white/95 text-slate-900
                    text-sm font-bold"
                  >
                    {vDetails.icon} Premium
                  </span>

                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-7">

              <div
                className="flex flex-col sm:flex-row
                sm:items-center sm:justify-between gap-4 mb-5"
              >
                <div>
                  <p className="text-xs font-bold uppercase
                    tracking-wider text-primary"
                  >
                    Car Rental
                  </p>

                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                    {vehicle} Rental Package
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-500">
                    Starting Price
                  </p>

                  <p className="text-2xl font-extrabold text-primary">
                    ₹1,499
                  </p>
                </div>
              </div>

              {/* Package Details */}
              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50
                  border border-slate-100 p-4"
                >
                  <p className="text-xs text-slate-500 mb-1">
                    Distance
                  </p>

                  <p className="font-bold text-slate-900">
                    80 KM
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50
                  border border-slate-100 p-4"
                >
                  <p className="text-xs text-slate-500 mb-1">
                    Duration
                  </p>

                  <p className="font-bold text-slate-900">
                    8 Hours
                  </p>
                </div>

              </div>

              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                Enjoy a comfortable chauffeur-driven car for local
                sightseeing, meetings, shopping and everyday travel
                across {city}, with pricing based on your selected
                package.
              </p>

              {/* Features */}
              <div
                className="grid grid-cols-3 gap-2 mt-6 pt-5
                border-t border-slate-200"
              >

                <div className="text-center">
                  <div className="text-lg mb-1">🚗</div>
                  <p className="text-xs font-semibold text-slate-700">
                    Clean Car
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-lg mb-1">👨‍✈️</div>
                  <p className="text-xs font-semibold text-slate-700">
                    Driver Included
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-lg mb-1">₹</div>
                  <p className="text-xs font-semibold text-slate-700">
                    Clear Price
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Stats Bar */}
      <section className="py-16 border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "50,000+", label: "Happy Customers" },
              { num: "200+", label: "Cars in Fleet" },
              { num: "24/7", label: "Support Available" },
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

      {/* Local Packages */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              PACKAGES
            </div>
            <h2 className="section-title">
              {vehicle} Rental Packages in {city}
            </h2>
            <p className="section-subtitle mx-auto">
              Choose the perfect package for your local travel needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "4 Hrs / 40 Km",
                price: "₹999",
                features: [
                  "Sedan AC Car",
                  "Fuel included",
                  "Driver included",
                  "Airport pickup",
                ],
                popular: false,
              },
              {
                name: "8 Hrs / 80 Km",
                price: "₹1,499",
                features: [
                  "Sedan/SUV AC Car",
                  "Fuel included",
                  "Driver included",
                  "Multiple stops",
                ],
                popular: true,
              },
              {
                name: "12 Hrs / 120 Km",
                price: "₹2,199",
                features: [
                  "Any vehicle type",
                  "Fuel included",
                  "Driver included",
                  "Full day coverage",
                ],
                popular: false,
              },
              {
                name: "Full Day Outstation",
                price: "₹2,999",
                features: [
                  "Innova/SUV",
                  "250 km included",
                  "Driver + Fuel",
                  "Night charges incl.",
                ],
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
                <h3 className="text-lg font-bold mb-4">{pkg.name}</h3>
                <div className="package-price">{pkg.price}</div>
                <div className="package-unit">Starting Price</div>
                <ul className="package-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <span className="text-green-500">✔</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+918448445504"
                  className="btn-primary w-full py-3"
                  style={{ display: "block", textAlign: "center" }}
                >
                  📞 Book Now
                </a>
              </div>
            ))}
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
            <h2 className="section-title">Book Your {city} Ride in 3 Steps</h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="steps-container">
            {[
              {
                num: "1",
                icon: "📱",
                title: "Call or WhatsApp",
                desc: `Reach us at 9818022327 with your ${city} travel requirements.`,
              },
              {
                num: "2",
                icon: "🚗",
                title: "Choose Package",
                desc: "Select from our 4hr, 8hr, 12hr, or full-day packages.",
              },
              {
                num: "3",
                icon: "🎉",
                title: "Enjoy Your Ride",
                desc: "Your verified driver arrives on time at your doorstep.",
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

      {/* Why Book With Us */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Why Book with Chiku Cabs in {city}?
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Local Guides",
                desc: `Drivers who know ${city} like the back of their hand.`,
                icon: "🗺️",
              },
              {
                title: "Flat Rates",
                desc: "No surge pricing. Reliable fixed rates for all local trips.",
                icon: "💰",
              },
              {
                title: "Instant Booking",
                desc: "Book within 60 seconds via call or WhatsApp.",
                icon: "⚡",
              },
              {
                title: "Premium Fleet",
                desc: "Newer models only. AC and comfort guaranteed.",
                icon: "🚗",
              },
            ].map((feature, idx) => (
              <div key={idx} className="premium-card text-center">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="section-badge">TOP DESTINATIONS</div>
              <h2
                className="section-title gradient-text"
                style={{ marginBottom: "2rem" }}
              >
                Top Sightseeing in {city}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {city} is a city of rich culture and heritage. Our{" "}
                <strong>
                  local {vehicle} service in {city}
                </strong>{" "}
                is tailored for sightseeing trips that allow you to explore at
                your own pace.
              </p>
              <div className="space-y-4">
                {[
                  "Historic Landmarks & Temples",
                  "Local Markets & Street Food",
                  "Religious & Spiritual Sites",
                  "Corporate Parks & IT Hubs",
                  "Nearby Hill Stations & Getaways",
                ].map((item, i) => (
                  <div key={i} className="route-card">
                    <div className="route-card-icon">
                      {i === 0
                        ? "🏛️"
                        : i === 1
                          ? "🛍️"
                          : i === 2
                            ? "🛕"
                            : i === 3
                              ? "🏢"
                              : "⛰️"}
                    </div>
                    <span>
                      {item} in {city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex-1"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div
                className="h-80 bg-muted rounded-3xl overflow-hidden shadow-lg"
                style={{
                  border: "4px solid hsl(var(--background))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                }}
              >
                🏛️
              </div>
              <div
                className="h-80 bg-muted rounded-3xl overflow-hidden shadow-lg"
                style={{
                  border: "4px solid hsl(var(--background))",
                  transform: "translateY(2rem)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                }}
              >
                🕌
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* SEO Content Section */}
      {city !== "your city" && (
        <section className="py-12 px-4 bg-muted/10 border-b border-slate-300">
          <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
              Top-Rated Local {vehicle} Booking in {city}
            </h2>
            <div className="space-y-6">
              <p>
                When looking for the best{" "}
                <strong>
                  local {vehicle} on rent in {city}
                </strong>
                , Chiku Cabs delivers unparalleled <strong>taxi service</strong>
                . Navigating through {city} traffic can be stressful, which is
                why hiring a reliable, chauffeur-driven cab via our easy{" "}
                <strong>cab booking</strong> platform is the smartest choice for
                tourists, business professionals, and local residents alike.
              </p>
              <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                Why Hire a {vehicle} for Full Day in {city}?
              </h3>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Flexible Packages:</strong> Choose from 4 Hours, 8
                    Hours, or 12 Hours {city}{" "}
                    <strong>local taxi service</strong> packages based on your
                    itinerary.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>City Tours & Sightseeing:</strong> Book a local{" "}
                    {vehicle} to explore landmarks and vibrant markets across{" "}
                    {city}. Our <strong>outstation cabs</strong> drivers are
                    also available for nearby getaways.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>{city} Airport Taxi:</strong> Ensure you reach the
                    airport on time with our punctual, GPS-tracked{" "}
                    <strong>airport transfer</strong> fleet.
                  </span>
                </li>
              </ul>
              <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                <p className="mb-0 text-card-foreground">
                  Skip the unreliability of app-based ride-hailing services.
                  Pre-book your{" "}
                  <strong>
                    {vehicle} rental in {city}
                  </strong>{" "}
                  with Chiku Cabs for a guaranteed, immaculately clean car and a
                  highly professional <strong>taxi service</strong> experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="py-12 border-b border-slate-300">
        <InternalLinks parsedData={parsedData} />
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
            <h2 className="section-title">What Our {city} Travelers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Anjali Mehta",
                text: `Used Chiku Cabs for a full day sightseeing in ${city}. The driver was like a personal guide! Very knowledgeable about all the tourist spots.`,
                rating: "★★★★★",
              },
              {
                name: "Rohit Agarwal",
                text: `Booked the 8hr package for office meetings across ${city}. Very professional service, clean car, and the driver was always on time.`,
                rating: "★★★★★",
              },
              {
                name: "Sunita Devi",
                text: `Airport pickup was seamless. Driver was already waiting when we landed. The car was clean and comfortable. Best cab service in ${city}!`,
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
                <div className="testimonial-route">
                  Local {vehicle} in {city}
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
            <h2 className="section-title">
              Frequently Asked Questions about {city} Cabs
            </h2>
          </div>
          {[
            {
              q: `How much does a local taxi service cost in ${city}?`,
              a: `A local taxi service in ${city} starts from ₹999 for a 4-hour (40 km) package. Our 8-hour (80 km) cab booking is the most popular, starting at ₹1,499. Use our app for real-time rates.`,
            },
            {
              q: `Can I get an airport taxi for pickup or drop in ${city}?`,
              a: `Yes! We provide 24/7 airport taxi and airport transfer services in ${city}. Our drivers are punctual and prioritize your schedule for a stress-free flight.`,
            },
            {
              q: `Are the drivers for your taxi service in ${city} verified?`,
              a: `Every driver at Chiku Cabs undergoes a mandatory background check and police verification. They are local experts who know all the routes in ${city} perfectly.`,
            },
            {
              q: `Can I extend my local taxi service rental hours during the trip?`,
              a: `Certainly! You can extend your cab booking via the app or by informing the driver. Extra km and hours are charged at nominal rates for your convenience in ${city}.`,
            },
            {
              q: `Do you offer outstation cabs from ${city} as part of this service?`,
              a: `While this package is for local use, we also offer dedicated outstation cabs from ${city} to any destination in India at very competitive per km rates.`,
            },
            {
              q: `What vehicle options are available for local cab booking in ${city}?`,
              a: `You can choose from Hatchbacks, Sedans, SUVs like Innova, or even a tempo traveller on rent for bulk group travel during your ${city} tour.`,
            },
            {
              q: `Is car rental with a driver available for 12 hours in ${city}?`,
              a: `Yes, we offer a specialized 12-hour/120km car rental package which is ideal for business meetings or extensive city sightseeing in ${city}.`,
            },
            {
              q: `Do you provide luxury cab booking for local events in ${city}?`,
              a: `Absolutely. We offer luxury cab booking including Mercedes, Audi, and premium Innova Crysta for high-end local transit and weddings in ${city}.`,
            },
            {
              q: `Is the airport transfer service available at midnight in ${city}?`,
              a: `Yes, Chiku Cabs operates 24/7. Whether you need an airport taxi at 3 AM or a local taxi service for early morning travel, we are always available.`,
            },
            {
              q: `How do I get the cheapest taxi service in ${city}?`,
              a: `To get the best rates for your local cab booking, pre-book your ride on our website or app and check our latest seasonal discount offers for ${city}.`,
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
            Ready to Explore {city}?
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Book your premium {vehicle} now and travel like a local.
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
                "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
              )}`}
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
      <EEATSection city={city} vehicle={vehicle} />
    </div>
  );
}
