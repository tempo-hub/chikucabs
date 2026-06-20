import Link from "next/link";
import { ghaziabadRoutes } from "@/data/gzbRoutes";
import { CalendarCheck, ShieldCheck, Bus, CreditCard } from "lucide-react";

export const metadata = {
  title: "Tempo Traveller from Ghaziabad | Affordable Group Booking",
  description:
    "Book tempo traveller from Ghaziabad for Delhi, Agra, Jaipur, Haridwar, Rishikesh, Mathura and more destinations at best fares.",
};

export default function Page() {
  const city = "Ghaziabad";

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
          href="/tempo-from-delhi"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Tempo Traveller from Ghaziabad
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden border-b">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="section-badge mb-6">
            🚐 PREMIUM TEMPO TRAVELLER SERVICE
          </div>

          <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tight max-w-5xl mx-auto mb-6">
            Book Tempo Traveller{" "}
            <span className="gradient-text">from {city}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
            Hire luxury tempo traveller from <strong>{city}</strong> for family
            trips, weddings, corporate tours, pilgrimage journeys and weekend
            getaways. Clean vehicles, experienced drivers and affordable fares.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-lg px-10 py-5 shadow-2xl"
            >
              📞 Call 8448445504
            </a>

            <a
              href="https://wa.me/918448445504"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-10 py-5"
            >
              💬 WhatsApp Now
            </a>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Why Choose Chiku Cabs */}
      <section className="py-10 px-4 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose Chiku Cabs
            </h2>

            <p className="text-muted-foreground mb-6">
              Trusted service with instant booking and premium travel
              experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CalendarCheck,
                title: "Easy Online Booking",
                desc: "Book in minutes via website, call or WhatsApp.",
              },
              {
                icon: ShieldCheck,
                title: "Professional Drivers",
                desc: "Verified, trained and experienced chauffeurs.",
              },
              {
                icon: Bus,
                title: "Big Fleet of Vehicles",
                desc: "Sedan, SUV, Innova, Tempo Traveller & more.",
              },
              {
                icon: CreditCard,
                title: "Online Payment",
                desc: "UPI, Card, Bank Transfer and Cash accepted.",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="bg-background border rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Book Safe & Reliable Rides with Chiku Cabs */}
      <div className="py-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-7xl mx-auto">
          Book Safe & Reliable Rides with Chiku Cabs
        </h2>

        <p className="text-muted-foreground max-w-7xl mx-auto mb-14 leading-relaxed text-lg">
          From daily rides to family tours, airport transfers, weddings, and
          corporate travel,{" "}
          <Link
            href="/"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Chiku Cabs
          </Link>{" "}
          offers trusted transportation solutions for every journey. Our service
          includes verified professional drivers, clean and modern vehicles,
          instant online booking, and transparent pricing with no hidden
          charges. Whether you need a local taxi, outstation cab, or tempo
          traveller for group travel, we ensure a safe, comfortable, and on-time
          ride experience. With 24/7 customer support and a wide fleet of
          vehicles, is the smart choice for hassle-free travel.
        </p>
      </div>

      {/* Tempo Traveller & Luxury Fleet Options */}
      <section className="py-16 px-4 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Tempo Traveller & Luxury Fleet Options
            </h2>

            <p className="text-muted-foreground max-w-7xl">
              Choose from our premium range of tempo travellers, Urbania vans,
              Maharaja travellers, and mini buses for family tours, weddings,
              corporate trips, and outstation travel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "9 Seater Tempo Traveller",
                icon: "🚐",
                desc: "Perfect for small family trips and airport transfers.",
                href: "9-seater-luxury-tempo-traveller-in-gzb",
                seat: "9 Passengers + 1 Driver",
                price: "₹19 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "12 Seater Tempo Traveller",
                icon: "🚐",
                desc: "Ideal for group travel, tours and local sightseeing.",
                href: "12-seater-luxury-tempo-traveller-in-gzb",
                seat: "12 Passengers + 1 Driver",
                price: "₹23 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "15 Seater Tempo Traveller",
                icon: "🚐",
                desc: "Comfortable option for wedding guests and pilgrimages.",
                href: "15-seater-luxury-tempo-traveller-in-gzb",
                seat: "15 Passengers + 1 Driver",
                price: "₹24 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "16 Seater Tempo Traveller",
                icon: "🚍",
                desc: "Premium Urbania van with luxury seating and AC comfort.",
                href: "16-seater-luxury-tempo-traveller-in-gzb",
                seat: "16 Passengers + 1 Driver",
                price: "₹25 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "18 Seater Tempo Traveller",
                icon: "👑",
                desc: "Luxury Maharaja traveller with pushback seats and music.",
                href: "18-seater-luxury-tempo-traveller-in-gzb",
                seat: "18 Passengers + 1 Driver",
                price: "₹26 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "20 Seater Tempo Traveller",
                icon: "🚌",
                desc: "Best for large groups, events and corporate movement.",
                href: "20-seater-luxury-tempo-traveller-in-gzb",
                seat: "20 Passengers + 1 Driver",
                price: "₹28 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "Urbania Tempo Traveller on Rent in Delhi",
                icon: "🚌",
                desc: "Best for large groups, events and corporate movement.",
                href: "urbania-luxury-tempo-traveller-in-gzb",
                seat: "Driver + 16 Passenger[2⨯1]",
                price: "₹27 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "Maharaja Tempo Traveller in Delhi",
                icon: "🚌",
                desc: "Best for large groups, events and corporate movement.",
                href: "maharaja-luxury-tempo-traveller-in-gzb",
                seat: "Driver + 12 Passenger[2⨯2]",
                price: "₹28 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
              {
                title: "Mini Bus on Rent in Delhi",
                icon: "🚌",
                desc: "Best for large groups, events and corporate movement.",
                href: "mini-bus-luxury-tempo-traveller-in-gzb",
                seat: "Driver + 24 Passenger[2⨯2]",
                price: "₹35 / Km",
                driver: "₹500 / Day",
                min: "250 Km / Day Extra All tax, Parking",
                feature: "AC, Pushback Seat, Music System",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">
                    <Link
                      href={item.href}
                      className="hover:text-primary hover:underline underline-offset-4"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong>Seat:</strong> {item.seat}
                    </p>
                    <p>
                      <strong>Starting Fare:</strong> {item.price}
                    </p>
                    <p>
                      <strong>Driver Charges:</strong> {item.driver}
                    </p>
                    <p>
                      <strong>Minimum Charges:</strong> {item.min}
                    </p>
                    <p>
                      <strong>Facility:</strong> {item.feature}
                    </p>
                  </div>

                  <a
                    href="tel:+918448445504"
                    className="btn-primary mt-6 block text-center py-3"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Tempo Traveller Routes from Delhi */}
      <section className="py-20 px-4 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto">
          {/* Top Content */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Top Tempo Traveller Routes from Ghaziabad
            </h2>

            <p className="mb-4 text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto mb-6">
              Explore the most popular outstation tour packages from Ghaziabad
              with Chiku Cabs. Book premium tempo travellers for family trips,
              pilgrimages, weekend getaways and group tours at affordable
              prices.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border bg-background shadow-sm">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-primary" style={{ color: "#fff" }}>
                <tr>
                  <th className="px-5 py-4 text-left">Tour Plan</th>
                  <th className="px-5 py-4 text-left">Price Per Km</th>
                  <th className="px-5 py-4 text-left">
                    Itinerary (Places Covered)
                  </th>
                  <th className="px-5 py-4 text-left">Allowed Distance</th>
                  <th className="px-5 py-4 text-left">Extra Charges</th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    route: "Ghaziabad to Dharmsala",
                    slug: "/ghaziabad/tempo-traveller-hire-ghaziabad-to-dharmsala",
                    price: "₹26/Km",
                    places: "McLeodganj, Bhagsu Waterfall, Dalai Lama Temple",
                    distance: "950 Km Round Trip",
                    extra: "Toll, Parking, Driver Night",
                  },
                  {
                    route: "Ghaziabad to Bir Billing",
                    slug: "/ghaziabad/tempo-traveller-hire-ghaziabad-to-bir-billing",
                    price: "₹27/Km",
                    places: "Paragliding Site, Bir Monastery, Billing Valley",
                    distance: "980 Km Round Trip",
                    extra: "Toll, Parking, Driver Night",
                  },
                  {
                    route: "Ghaziabad to Barot",
                    slug: "/ghaziabad/tempo-traveller-hire-ghaziabad-to-barot",
                    price: "₹27/Km",
                    places: "Barot Valley, Uhl River, Trout Fishing Area",
                    distance: "1000 Km Round Trip",
                    extra: "Toll, Parking, Driver Stay",
                  },
                  {
                    route: "Ghaziabad to Banjar",
                    slug: "/ghaziabad/tempo-traveller-hire-ghaziabad-to-banjar",
                    price: "₹27/Km",
                    places: "Tirthan Valley, Great Himalayan National Park",
                    distance: "1020 Km Round Trip",
                    extra: "Toll, Parking, Driver Stay",
                  },
                  {
                    route: "Ghaziabad to Bhuntar",
                    slug: "/ghaziabad/tempo-traveller-hire-ghaziabad-to-bhuntar",
                    price: "₹26/Km",
                    places: "Kullu Valley, Beas River, Local Temples",
                    distance: "960 Km Round Trip",
                    extra: "Toll, Parking, Driver Night",
                  },
                ].map((item, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-5 py-4 font-semibold">
                      <Link
                        href={`${item.slug}`}
                        className="hover:text-primary hover:underline underline-offset-4 transition-colors block"
                      >
                        {item.route}
                      </Link>
                    </td>
                    <td className="px-5 py-4">{item.price}</td>
                    <td className="px-5 py-4">{item.places}</td>
                    <td className="px-5 py-4">{item.distance}</td>
                    <td className="px-5 py-4">{item.extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Premium Tempo Traveller Features */}
      <section className="py-20 px-4 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Premium Tempo Traveller Features
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto mb-6">
              Travel in comfort with our well-maintained tempo travellers
              equipped with modern amenities for family tours, weddings,
              pilgrimages, corporate trips, and outstation travel from
              Ghaziabad.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "❄️",
                title: "Powerful AC",
                desc: "Fully air-conditioned vehicles for a cool and relaxing ride.",
              },
              {
                icon: "💺",
                title: "Pushback Seats",
                desc: "Comfortable reclining seats with extra leg space.",
              },
              {
                icon: "🎵",
                title: "Music System",
                desc: "Enjoy Bluetooth music system during your journey.",
              },
              {
                icon: "🧳",
                title: "Large Luggage Space",
                desc: "Enough storage for bags, suitcases and travel items.",
              },
              {
                icon: "📍",
                title: "GPS Tracking",
                desc: "Live route support for safe and secure travel.",
              },
              {
                icon: "👨‍✈️",
                title: "Experienced Driver",
                desc: "Professional drivers with long route experience.",
              },
              {
                icon: "✨",
                title: "Clean Interiors",
                desc: "Neat, sanitized and hygienic vehicle cabins.",
              },
              {
                icon: "🔌",
                title: "Charging Point",
                desc: "Mobile charging ports available in selected vehicles.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-5xl mb-5">{item.icon}</div>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About and Choose Us content */}
      <section className="py-20 px-4 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Left Side */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About Chiku Cabs
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Chiku Cabs is a trusted travel company offering tempo traveller,
              taxi, airport transfer, and outstation cab booking services across
              Delhi and major cities in India.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Whether you need transport for family tours, weddings, corporate
              travel, pilgrimages, or weekend trips, our professional team
              ensures a smooth journey.
            </p>

            <a
              href="tel:+918448445504"
              className="inline-flex items-center justify-center bg-primary px-8 py-4 rounded-xl text-lg font-semibold"
              style={{ color: "#ffffff" }}
            >
              📞 Call Now
            </a>
          </div>

          {/* Right Side */}
          <div className="flex-1 border rounded-2xl p-8 bg-background shadow-sm">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose Us?
            </h2>

            <div className="space-y-4">
              {[
                "Verified drivers",
                "Clean vehicles",
                "Affordable fares",
                "Flexible pickup",
                "Big fleet options",
                "24/7 support",
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-green-600 font-bold">✔</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Popular Routes from Ghaziabad
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explore our most booked outstation tempo traveller routes from
          Ghaziabad. Get instant fare quote and same day booking support.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ghaziabadRoutes.map((route) => (
            <Link
              key={route.slug}
              href={`${route.slug}`}
              className="homepage-service-card group"
            >
              <h3 className="text-xl font-semibold mb-2">
                {route.origin} to {route.destination}
              </h3>

              <p className="text-muted-foreground mb-4">
                Tempo Traveller Booking
              </p>

              <span className="text-primary font-semibold">View Fare →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 px-4 bg-muted/20 border-y">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              Frequently Asked Questions
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Find answers to common questions about tempo traveller booking,
              fares, seating capacity, pickup locations, and travel services
              from Ghaziabad.
            </p>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {[
              {
                q: "What is the starting fare for tempo traveller from Ghaziabad?",
                a: "Tempo traveller fare from Ghaziabad starts at affordable per km rates depending on vehicle type, route, travel days, and season. Contact us for an exact quote.",
              },
              {
                q: "Which tempo traveller seating options are available in Ghaziabad?",
                a: "We provide 9, 12, 15, 16, 18, 20 and 26 seater tempo travellers, Maharaja travellers, Urbania vans, and mini buses for group travel.",
              },
              {
                q: "Do you provide pickup from all areas in Ghaziabad?",
                a: "Yes, we offer pickup from Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension, Kaushambi, Sahibabad, Vijay Nagar, Wave City and all nearby locations.",
              },
              {
                q: "Is driver charge included in the fare?",
                a: "Fare depends on package and route. Driver allowance, toll tax, parking charges, and state tax are shared clearly before booking confirmation.",
              },
              {
                q: "Can I book tempo traveller for outstation trips from Ghaziabad?",
                a: "Yes, you can book for Haridwar, Jaipur, Agra, Mathura, Rishikesh, Shimla, Nainital, Ayodhya and all major outstation destinations.",
              },
              {
                q: "Can I book for wedding, corporate or family events?",
                a: "Yes, our tempo travellers are available for weddings, corporate travel, school trips, family tours, religious tours and group functions.",
              },
              {
                q: "How can I book instantly from Ghaziabad?",
                a: "You can call or WhatsApp us anytime for quick booking confirmation, live availability, and best fare details.",
              },
            ].map((faq, i) => (
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

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="tel:+918448445504"
              className="inline-flex items-center justify-center bg-primary px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition-all"
              style={{ color: "#fff" }}
            >
              📞 Still Have Questions? Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
