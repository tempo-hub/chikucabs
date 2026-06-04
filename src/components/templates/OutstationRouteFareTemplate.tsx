import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import RouteMapSection from "../shared/RouteMapSection";

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

  const routeInfo = Object.values(cityCabRoutes)
    .flat()
    .find(
      (route) =>
        route.from.toLowerCase() === startCity.toLowerCase() &&
        route.to.toLowerCase() === endCity.toLowerCase(),
    );

  const distance = routeInfo?.distance || 0;
  const estimatedHours = Math.ceil(distance / 55);

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
              TRANSPARENT PRICING {new Date().getFullYear()}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
              {startCity} to {endCity} <br />
              <span className="gradient-text">{vehicle} Fare</span>
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

      {/* Distance Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              ROUTE DISTANCE
            </div>

            <h2 className="section-title">
              Distance Between {startCity} and {endCity}
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Planning your journey from {startCity} to {endCity}? Knowing the
              distance helps estimate travel time, fuel requirements, and cab
              fare accurately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="premium-card text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Estimated Distance</h3>
              <p className="text-4xl font-black text-primary">
                {distance || "Approx."} km
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2">Travel Time</h3>
              <p className="text-4xl font-black text-primary">
                {Math.ceil((distance || 250) / 55)} Hours
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">🚖</div>
              <h3 className="text-xl font-bold mb-2">One Way Fare Starts</h3>
              <p className="text-4xl font-black text-primary">
                ₹{(distance || 250) * 9}
              </p>
            </div>
          </div>

          <div className="premium-card mt-10">
            <p className="text-lg leading-relaxed text-muted-foreground">
              The road distance from <strong>{startCity}</strong> to{" "}
              <strong>{endCity}</strong> is approximately{" "}
              <strong>{distance || "varies"} km</strong>. The average travel
              duration is around{" "}
              <strong>{Math.ceil((distance || 250) / 55)} hours</strong>,
              depending on traffic, road conditions, and weather. Chiku Cabs
              provides comfortable one-way and round-trip taxi services on this
              route with experienced drivers and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Time Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">JOURNEY PLANNER</div>

            <h2 className="section-title">
              {startCity} to {endCity} Travel Guide
            </h2>
          </div>

          <div className="space-y-8">
            <div className="premium-card flex gap-4">
              <div className="text-4xl">🌅</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Best Departure Time</h3>
                <p className="text-muted-foreground">
                  Start between 5 AM and 8 AM to avoid city traffic and reach
                  your destination faster.
                </p>
              </div>
            </div>

            <div className="premium-card flex gap-4">
              <div className="text-4xl">🍴</div>
              <div>
                <h3 className="font-bold text-xl mb-2">
                  Food & Refreshment Stops
                </h3>
                <p className="text-muted-foreground">
                  Multiple restaurants, fuel stations and restrooms are
                  available on the route.
                </p>
              </div>
            </div>

            <div className="premium-card flex gap-4">
              <div className="text-4xl">🚦</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Traffic Conditions</h3>
                <p className="text-muted-foreground">
                  Weekend and holiday traffic may increase travel time.
                </p>
              </div>
            </div>

            <div className="premium-card flex gap-4">
              <div className="text-4xl">🛡️</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Safe Travel Tips</h3>
                <p className="text-muted-foreground">
                  Keep your phone charged and share trip details with family
                  members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Cards */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              VEHICLE PRICING
            </div>

            <h2 className="section-title">
              {startCity} to {endCity} Cab Fare by Vehicle Type
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Compare taxi fares for Hatchback, Sedan, and Innova vehicles.
              Choose the best cab option based on your travel budget, passenger
              count, and comfort requirements for your journey from {startCity}{" "}
              to {endCity}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: "STANDARD",
                car: "Hatchback",
                price: "9",
                desc: "Swift, WagonR or similar",
                best: false,
              },
              {
                tier: "POPULAR",
                car: "Sedan",
                price: "12",
                desc: "Dzire, Ertiga or similar",
                best: true,
              },
              {
                tier: "LUXURY",
                car: "Innova",
                price: "18",
                desc: "Innova Crysta, Force Urbania",
                best: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${
                  item.best ? "border-primary scale-105 z-10" : ""
                }`}
                style={
                  item.best
                    ? {
                        boxShadow: "0 0 0 4px hsla(45,90%,50%,0.12)",
                      }
                    : {}
                }
              >
                {item.best && (
                  <div
                    className="absolute text-white"
                    style={{
                      top: 0,
                      right: 0,
                      background: "hsl(var(--primary))",
                      padding: "0.35rem 1rem",
                      fontSize: "10px",
                      fontWeight: 900,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="text-xs font-black opacity-40 mb-2 uppercase">
                  {item.tier} CHOICE
                </div>

                <h3 className="text-2xl font-black mb-2">{item.car}</h3>

                <p className="text-muted-foreground text-sm mb-8">
                  {item.desc}
                </p>

                <div style={{ marginTop: "auto", marginBottom: "2.5rem" }}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black opacity-50">FROM</span>

                    <span className="text-5xl font-black">₹{item.price}</span>

                    <span className="text-sm font-black opacity-50">/ KM</span>
                  </div>

                  <div className="text-xs font-bold text-green-600 mt-2 italic">
                    INTERCITY BEST PRICE GUARANTEE
                  </div>
                </div>

                <ul className="space-y-3 mb-10 list-none">
                  {[
                    "Driver Allowance Included",
                    "State Permit Included",
                    "Clean & Sanitized Vehicle",
                    "24×7 Customer Support",
                  ].map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <span className="text-primary text-xl">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="tel:+918448445504"
                  className={`w-full py-4 rounded-xl font-black tracking-tight text-center ${
                    item.best ? "btn-primary" : ""
                  }`}
                  style={
                    !item.best
                      ? {
                          background: "hsl(var(--muted))",
                          display: "block",
                        }
                      : {
                          display: "block",
                        }
                  }
                >
                  GET QUOTE NOW
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toll Tax Information */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              TOLL TAX INFORMATION
            </div>

            <h2 className="section-title">
              Toll Tax Information for {startCity} to {endCity}
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Before booking your cab from {startCity} to {endCity}, it's
              important to understand how toll charges are handled during the
              trip.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card">
              <div className="text-5xl mb-4">🛣️</div>

              <h3 className="text-2xl font-bold mb-4">Toll Charges</h3>

              <p className="text-muted-foreground leading-relaxed">
                Toll taxes are generally charged as per actual usage during the
                journey. The exact amount depends on the route taken between{" "}
                {startCity} and {endCity}.
              </p>
            </div>

            <div className="premium-card">
              <div className="text-5xl mb-4">💳</div>

              <h3 className="text-2xl font-bold mb-4">Transparent Billing</h3>

              <p className="text-muted-foreground leading-relaxed">
                Chiku Cabs follows a transparent pricing policy. Toll charges,
                parking fees, and state taxes (if applicable) are shared with
                customers clearly before or during the trip.
              </p>
            </div>
          </div>

          <div className="premium-card mt-10">
            <h3 className="text-xl font-bold mb-4">Important Information</h3>

            <ul className="space-y-3 text-muted-foreground">
              <li>✓ Toll tax is charged as per actual.</li>
              <li>✓ Fastag-enabled vehicles are provided.</li>
              <li>✓ Parking charges are extra where applicable.</li>
              <li>✓ State entry taxes may apply on some routes.</li>
              <li>✓ No hidden charges in your final bill.</li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <p className="text-lg text-muted-foreground">
              For the latest toll information and exact fare estimate for the{" "}
              <strong>
                {startCity} to {endCity}
              </strong>{" "}
              route, call us at <strong>8448445504</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Driver Information Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              DRIVER INFORMATION
            </div>

            <h2 className="section-title">
              Professional Drivers for {startCity} to {endCity} Cab Service
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Our experienced and verified drivers ensure a safe, comfortable,
              and hassle-free journey from {startCity} to {endCity}. Every
              driver is trained for long-distance travel and customer service
              excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="premium-card text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold mb-2">Verified Drivers</h3>
              <p className="text-muted-foreground">
                All drivers undergo identity verification and background checks.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">🚖</div>
              <h3 className="font-bold mb-2">Route Experts</h3>
              <p className="text-muted-foreground">
                Experienced drivers familiar with the {startCity} to {endCity}{" "}
                route.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="font-bold mb-2">GPS Enabled</h3>
              <p className="text-muted-foreground">
                Real-time route navigation for safer and faster travel.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="font-bold mb-2">Customer Rated</h3>
              <p className="text-muted-foreground">
                Drivers are rated regularly based on customer feedback.
              </p>
            </div>
          </div>

          <div className="premium-card mt-10">
            <h3 className="text-2xl font-black mb-4">
              Why Our Drivers Are Trusted
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Chiku Cabs assigns professional drivers for every {startCity} to{" "}
              {endCity} booking. Drivers are trained in highway driving,
              passenger safety, route planning, and customer assistance. Whether
              you book a one-way cab, round-trip taxi, airport transfer, or
              tempo traveller, our drivers focus on providing a smooth travel
              experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li>✅ Police verified drivers</li>
                  <li>✅ Well-groomed and professional</li>
                  <li>✅ Experienced in long-distance trips</li>
                  <li>✅ Assistance with luggage handling</li>
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li>✅ Familiar with highways and alternate routes</li>
                  <li>✅ 24×7 travel support</li>
                  <li>✅ Trained for customer safety</li>
                  <li>✅ Punctual pickup and drop service</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-muted/50">
              <p className="text-muted-foreground">
                Driver details including driver's name, contact number, and
                vehicle information are shared before the trip begins, ensuring
                complete transparency and peace of mind for travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Route Map Section */}
      <RouteMapSection
        startCity={startCity}
        endCity={endCity}
        distance={distance}
        estimatedHours={estimatedHours}
      />

      {/* One Way Cab Fare Section */}
      <section className="py-24 px-4 bg-muted/30 border-y">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              ONE WAY CAB
            </div>

            <h2 className="section-title">
              {startCity} to {endCity} One Way Cab Fare
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Save money with our affordable one-way cab service from{" "}
              {startCity} to {endCity}. Pay only for the distance you travel
              without worrying about return-trip charges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="premium-card text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Lower Cost</h3>
              <p className="text-muted-foreground">
                One-way bookings help reduce travel expenses compared to
                traditional round-trip taxi services.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">🚖</div>
              <h3 className="text-xl font-bold mb-2">No Return Fare</h3>
              <p className="text-muted-foreground">
                Pay only for your journey from {startCity} to {endCity}, not for
                the driver's return travel.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
              <p className="text-muted-foreground">
                Quick confirmation and flexible pickup timing for your
                outstation travel plans.
              </p>
            </div>
          </div>

          <div className="premium-card mt-10">
            <h3 className="text-2xl font-black mb-4">
              Benefits of One Way Taxi Service
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Chiku Cabs offers affordable one-way taxi service from{" "}
              <strong>{startCity}</strong> to <strong>{endCity}</strong> with
              transparent pricing and professional drivers. One-way cab booking
              is ideal for business trips, airport transfers, family travel, and
              tourist journeys where you do not need the vehicle to return.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li>✅ Affordable per-km pricing</li>
                  <li>✅ No hidden charges</li>
                  <li>✅ Verified drivers</li>
                  <li>✅ Clean & sanitized vehicles</li>
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li>✅ 24×7 booking assistance</li>
                  <li>✅ Doorstep pickup service</li>
                  <li>✅ GPS-enabled cabs</li>
                  <li>✅ Instant trip confirmation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="premium-card">
              <h3 className="font-bold mb-3">🚗 Hatchback</h3>
              <p className="text-muted-foreground">
                Budget-friendly option for solo travelers, couples, and small
                families. Suitable for comfortable one-way and outstation trips.
              </p>
            </div>

            <div className="premium-card">
              <h3 className="font-bold mb-3">🚖 Sedan</h3>
              <p className="text-muted-foreground">
                Most popular choice for business travelers and families. Offers
                extra comfort, luggage space, and smooth long-distance travel.
              </p>
            </div>

            <div className="premium-card">
              <h3 className="font-bold mb-3">🚙 Innova</h3>
              <p className="text-muted-foreground">
                Premium option for larger families and groups. Spacious seating,
                superior comfort, and ideal for long outstation journeys.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="tel:+918448445504"
              className="btn-primary text-lg px-10 py-4"
            >
              📞 Book One Way Cab - 8448445504
            </a>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              BOOKING PROCESS
            </div>

            <h2 className="section-title">
              How to Book a Cab from {startCity} to {endCity}
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Booking a taxi from {startCity} to {endCity} with Chiku Cabs is
              quick, simple, and hassle-free. Follow these easy steps to confirm
              your ride.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: "📞",
                title: "Contact Us",
                desc: `Call 8448445504 or send a WhatsApp message to share your ${startCity} to ${endCity} travel requirements.`,
              },
              {
                step: "02",
                icon: "🚖",
                title: "Choose Vehicle",
                desc: "Select from Hatchback, Sedan, Innova Crysta, or Tempo Traveller according to your needs.",
              },
              {
                step: "03",
                icon: "💳",
                title: "Confirm Booking",
                desc: "Receive fare details, confirm pickup time, and complete the booking process.",
              },
              {
                step: "04",
                icon: "✅",
                title: "Enjoy Your Ride",
                desc: `Our verified driver arrives at your pickup location and takes you safely to ${endCity}.`,
              },
            ].map((item, index) => (
              <div key={index} className="premium-card text-center">
                <div className="text-sm font-black text-primary mb-2">
                  STEP {item.step}
                </div>

                <div className="text-5xl mb-4">{item.icon}</div>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="premium-card mt-12">
            <h3 className="text-2xl font-black mb-4">
              Why Book with Chiku Cabs?
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li>✅ Instant booking confirmation</li>
                  <li>✅ Transparent pricing</li>
                  <li>✅ No hidden charges</li>
                  <li>✅ Professional drivers</li>
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li>✅ One-way & round-trip options</li>
                  <li>✅ Clean and sanitized vehicles</li>
                  <li>✅ 24×7 customer support</li>
                  <li>✅ Nationwide cab availability</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-10">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-10 py-4"
              >
                📞 Book Now - 8448445504
              </a>
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
              q: `What is the ${vehicle} fare from ${startCity} to ${endCity} cab fare details?`,
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

      {/* Stats Bar */}
      <section className="border-y py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="stats-grid">
            {[
              { num: "800+", label: "Monthly Group Trips" },
              { num: "₹2M+", label: "Group Savings" },
              { num: "4.9/5", label: "Google Rating" },
              { num: "Verified", label: "Local Drivers" },
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
              className="text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105"
              style={{
                backgroundColor: "#25D366",
                color: "#fff",
                border: "none",
              }}
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
