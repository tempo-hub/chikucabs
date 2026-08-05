"use client"
import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import PopularCities from "@/components/shared/PopularCities";
import StatsBar from "../shared/StatsBar";
import { useState } from "react";
import LocalDominance from "../shared/LocalDominance";
import { localDominanceData } from "@/data/localDominanceData";


const relatedVehicles = [
    {
        name: "Ertiga",
        slug: "hire-ertiga-on-rent",
        
    },
    {
        name: "Innova Crysta",
        slug: "hire-innova-crysta-on-rent",
        
    },
];

const services = [
    {
        id: "airport",
        image: "/dzire/dzire_airport.png",
        title: "Airport Transfers",
        description:
            "Enjoy hassle-free airport pickup and drop services with professional chauffeurs. We monitor flight timings and ensure timely pickups with enough luggage space for families and groups.",
        features: [
            "24×7 Service",
            "Flight Tracking",
            "Extra Luggage Space",
        ],
    },
    {
        id: "wedding",
        image: "/dzire/dzire_wedding.png",
        title: "Wedding Travel",
        description:
            "Book premium Innova rentals for weddings, guest transportation, baraat processions, and family functions. Travel comfortably while making every celebration memorable.",
        features: [
            "Guest Transfers",
            "Luxury Experience",
            "Decor Friendly",
        ],
    },
    {
        id: "corporate",
        image: "/dzire/dzire_corporate.png",
        title: "Corporate Travel",
        description:
            "Professional transportation for business meetings, airport transfers, conferences, client visits, and executive travel with punctual drivers.",
        features: [
            "Executive Service",
            "GST Invoice",
            "Professional Drivers",
        ],
    },
    {
        id: "vacation",
        image: "/dzire/dzire_pligrimage.png",
        title: "Vacations",
        description:
            "Enjoy vacations, sightseeing, and weekend getaways with spacious seating, ample luggage space, and comfortable rides for the entire family.",
        features: [
            "Large Boot Space",
            "Comfort Seats",
            "Weekend Trips",
        ],
    },
    {
        id: "hill",
        image: "/dzire/dzire_hill.png",
        title: "Hill Station",
        description:
            "Plan memorable road trips to Shimla, Manali, Mussoorie, Nainital, Ooty, and more with experienced drivers and comfortable seating for long journeys.",
        features: [
            "Experienced Drivers",
            "Long Distance",
            "Safe Journey",
        ],
    },
];

export default function DzireServiceTemplate({
    parsedData,
}: {
    parsedData: ParsedRouteData;
}) {
    const displayCity = parsedData.origin || "india";
    const city = parsedData.displayCity || "India";
    const localDominanceCity =
        localDominanceData[
            city.toLowerCase() as keyof typeof localDominanceData
        ]
            ? city
            : displayCity;
    const [activeService, setActiveService] = useState(services[0]);

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden  pt-4 sm:pt-6 lg:pt-12 pb-12 px-4 text-slate-950 bg-white">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-white" />
                <div className="relative max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_1.2fr] items-center">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_40px_80px_rgba(15,23,42,0.08)]">
                        <div className="flex gap-2" >
                            <div className="section-badge inline-flex mb-6 text-slate-950">
                                Starting @ ₹10/km*
                            </div>
                            <div className="section-badge inline-flex mb-6 text-slate-950">
                                4.4 ★
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
                            Hire <span className="gradient-text">Dzire</span> on Rent
                            {city !== "India" && <> in {city}</>}
                        </h1>
                        <p className="mt-4 max-w-2xl lg:text-lg sm:text-xl leading-relaxed text-slate-600">
                            Book premium airport transfers, family outings, and corporate travel
                            with spacious 4+1 captain seats, dual AC comfort, and verified
                            chauffeurs.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="tel:+918448445504"
                                className="btn-primary text-lg px-8 py-4 shadow-2xl"
                            >
                                📞 Book Dzire — 8448445504
                            </a>
                            <a
                                href="https://wa.me/918448445504?text=Hi%20I%20want%20to%20book%20an%20Dzire%20%20on%20rent"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline text-lg px-8 py-4"
                            >
                                💬 WhatsApp Us
                            </a>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700 sm:grid-cols-4">
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
                                src="/cab.png"
                                alt={`Dzire on Rent in ${city !== "India" ? city : "India"} by Chiku Cabs`}
                                className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section
                className="border-y py-8"
                style={{
                    background: "hsl(var(--foreground))",
                    color: "hsl(var(--background))",
                }}
            >
                <div className="max-w-5xl mx-auto px-4">
                    {/* <div className="stats-grid">
            {[
              { num: "1 Lakh+", label: "Trips Completed" },
              { num: "1,000+", label: "Dzire in Fleet" },
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

            {/* Dzire Variants */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div
                            className="section-badge mx-auto"
                            style={{ display: "inline-flex" }}
                        >
                            CHOOSE YOUR Dzire
                        </div>
                        <h2 className="section-title">Dzire Models Available</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Dzire",
                                model: "Dzire Tour S",
                                image: "/dzire/dzire_model.webp",
                                price: "₹10/km",
                                features: [
                                    "4+1 Seating",
                                    "Air Conditioning",
                                    "Fuel Efficient",
                                    "Ideal for City Travel",
                                ],
                                best: false,
                            },
                            {
                                name: "Dzire LXi",
                                model: "Maruti Dzire",
                                image: "/dzire/dzire_model.webp",
                                price: "₹11/km",
                                features: [
                                    "4+1 Comfortable Seating",
                                    "Touchscreen Infotainment",
                                    "Rear AC Vents",
                                    "Spacious Boot",
                                ],
                                best: true,
                            },
                            {
                                name: "Dzire VXi",
                                model: "Maruti Dzire",
                                image: "/dzire/dzire_model.webp",
                                price: "₹12/km",
                                features: [
                                    "Automatic Climate Control",
                                    "Cruise Control",
                                    "Push Button Start",
                                    "Premium Interior",
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

            {/* Why Dzire */}
            <section className="bg-muted/30 py-12 border-y px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div
                            className="section-badge mx-auto"
                            style={{ display: "inline-flex" }}
                        >
                            WHY Dzire
                        </div>
                        <h2 className="section-title">
                            Why Dzire is India's Favorite Family Car
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "👨‍👩‍👧‍👦",
                                title: "Family Friendly",
                                desc: "Spacious 4+1 seating with ample legroom. Captain seats in Dzire model for ultimate comfort.",
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
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <div
                            className="section-badge mx-auto mb-4"
                            style={{ display: "inline-flex" }}
                        >
                            POPULAR USE CASES
                        </div>
                        <h2 className="section-title">
                            Popular Dzire Rental Use Cases{" "}
                            {city !== "India" ? `in ${city}` : ""}
                        </h2>
                    </div>
                    <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">

                        {services.map((service) => (

                            <button
                                key={service.id}
                                onClick={() => setActiveService(service)}
                                className={`py-5 px-4 uppercase font-semibold text-sm transition-all border-r border-b
        ${activeService.id === service.id
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {service.title}
                            </button>

                        ))}

                    </div>



                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Image */}

                        <div className="overflow-hidden rounded-3xl shadow-xl">

                            <img
                                src={activeService.image}
                                alt={activeService.title}
                                className="w-full h-[260px] md:h-[420px] object-cover"
                            />

                        </div>

                        {/* Content */}

                        <div className="flex flex-col justify-center">

                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                {activeService.title}
                            </h3>

                            <p className="text-muted-foreground leading-8 mb-8">
                                {activeService.description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-10">

                                {activeService.features.map((item) => (

                                    <div
                                        key={item}
                                        className="flex items-center gap-3 bg-white border rounded-xl p-4 shadow-sm"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                                            ✓
                                        </div>

                                        <span>{item}</span>

                                    </div>

                                ))}

                            </div>

                            <a
                                href="https://wa.me/918448445504"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-fit px-8 py-4"
                            >
                                Book {activeService.title}
                            </a>

                        </div>
                    </div>
                </div>
            </section>





            {/* Testimonials */}
            <section className="bg-muted/30 py-12 border-y px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div
                            className="section-badge mx-auto"
                            style={{ display: "inline-flex" }}
                        >
                            REVIEWS
                        </div>
                        <h2 className="section-title">
                            What Dzire Customers in {city !== "India" ? city : "India"} Say
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sharma Family",
                                text: "Booked an Dzire for our family trip to Shimla. The captain seats were incredibly comfortable and the kids loved the space. Best road trip ever!",
                                rating: "★★★★★",
                            },
                            {
                                name: "Raj (CEO)",
                                text: "We use Chiku Cabs Dzire service for all our corporate client pickups. Always on time, impeccably clean cars, and professional drivers.",
                                rating: "★★★★★",
                            },
                            {
                                name: "Neha & Friends",
                                text: "Hired an Dzire for a weekend Jaipur trip from Delhi. The car was practically new, AC was amazing, and we had ample space for all our luggage.",
                                rating: "★★★★★",
                            },
                        ].map((review, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="testimonial-stars">{review.rating}</div>
                                <p className="testimonial-text">"{review.text}"</p>
                                <div className="testimonial-author">{review.name}</div>
                                <div className="testimonial-route">Dzire Service</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div
                            className="section-badge mx-auto"
                            style={{ display: "inline-flex" }}
                        >
                            FAQ
                        </div>
                        <h2 className="section-title">
                            Dzire Rental Questions {city !== "India" ? `for ${city}` : ""}
                        </h2>
                    </div>
                    {[
                        {
                            q: `Where can I hire a Dzire on rent in ${city}?`,
                            a: `You can hire a Maruti Dzire on rent in ${city} for local sightseeing, airport transfers, business meetings, outstation trips, and daily travel. Booking in advance helps ensure better availability and competitive pricing.`,
                        },
                        {
                            q: `What is the cost of hiring a Dzire in ${city}?`,
                            a: `The cost of hiring a Dzire in ${city} depends on factors like travel distance, trip duration, local or outstation travel, and your itinerary. Contact us for the latest fare and a customized quote.`,
                        },
                        {
                            q: `Is the Dzire a good car for local travel in ${city}?`,
                            a: `Yes. The Maruti Dzire is one of the best sedan cars for local travel in ${city}. It offers comfortable seating, excellent fuel efficiency, air-conditioned interiors, and a smooth ride for city journeys.`,
                        },
                        {
                            q: `Can I book a Dzire for airport pickup and drop from ${city}?`,
                            a: `Yes. You can book a Dzire for airport pickup and drop from ${city}. The service is available 24/7 with professional chauffeurs and timely pickups.`,
                        },
                        {
                            q: `Can I hire a Dzire for an outstation trip from ${city}?`,
                            a: `Absolutely. You can rent a Dzire for outstation travel from ${city} to destinations like Agra, Jaipur, Chandigarh, Haridwar, Rishikesh, Mathura, Vrindavan, Shimla, and many other cities across India.`,
                        },
                        {
                            q: `How many passengers can travel comfortably in a Dzire?`,
                            a: `A Maruti Dzire comfortably accommodates up to 4 passengers along with luggage, making it an excellent choice for couples, small families, business travelers, and airport transfers.`,
                        },
                        {
                            q: `Is the driver included with the Dzire rental?`,
                            a: `Yes. Our Dzire rental service comes with a professional driver. Toll tax, parking fees, and state taxes (if applicable) may be charged separately based on your travel route.`,
                        },
                        {
                            q: `Can I book a Dzire online in ${city}?`,
                            a: `Yes. You can easily book a Dzire online by filling out the booking form, calling our customer support team, or sending your travel details on WhatsApp for quick confirmation.`,
                        },
                        {
                            q: `Is the Dzire suitable for business travel in ${city}?`,
                            a: `Yes. The Dzire is a popular choice for corporate travel because of its comfortable interiors, professional appearance, fuel efficiency, and smooth driving experience for meetings, office transfers, and executive travel in ${city}.`,
                        },
                        {
                            q: `Which places can I visit by Dzire from ${city}?`,
                            a: `You can hire a Dzire from ${city} to visit popular tourist attractions, nearby cities, business hubs, shopping destinations, hill stations, and other places based on your travel requirements.`,
                        },
                        {
                            q: `Can I hire a Dzire for a full-day local sightseeing tour in ${city}?`,
                            a: `Yes. You can book a Dzire for a full-day sightseeing tour, shopping trips, multiple business meetings, family outings, or customized local travel plans in ${city}.`,
                        },
                        {
                            q: `Why should I choose a Dzire instead of a hatchback?`,
                            a: `A Dzire offers more cabin space, a larger boot for luggage, better ride comfort, and premium seating compared to most hatchbacks, making it ideal for both business and leisure travel.`,
                        },
                        {
                            q: `Is advance booking recommended for Dzire rental in ${city}?`,
                            a: `Yes. Advance booking is highly recommended during weekends, festive seasons, holidays, and peak travel periods to secure your preferred vehicle and the best rental rates in ${city}.`,
                        },
                        {
                            q: `Can I hire a Dzire for weddings and special events in ${city}?`,
                            a: `Yes. Our Dzire rental service is available for weddings, family functions, corporate events, hotel transfers, guest transportation, and other special occasions in ${city}.`,
                        },
                        {
                            q: `Why should I choose your Dzire rental service in ${city}?`,
                            a: `We provide clean and sanitized vehicles, experienced chauffeurs, transparent pricing, timely pickups, 24/7 customer support, and reliable taxi services for both local and outstation travel from ${city}.`,
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
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto cta-banner">
                    <h2 className="text-4xl font-extrabold mb-4">
                        Book Your Dzire Now
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
                <section className="py-12 px-4 bg-muted/10 border-t">
                    <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
                        <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
                            Premium Dzire Rentals in {city}
                        </h2>
                        <div className="space-y-6">
                            <p>
                                When it comes to luxurious and spacious family travel in{" "}
                                <strong>{city}</strong>, the Maruti Suzuki Dzire is the
                                undisputed king. Whether you are navigating the busy streets or
                                heading out on a scenic highway trip, choosing an{" "}
                                <strong>Dzire on Rent</strong> in {city} via our{" "}
                                <strong>cab booking</strong> app guarantees a smooth ride. As a
                                premier <strong>taxi service</strong>, we ensure your{" "}
                                <strong>outstation cabs</strong> experience is unparalleled.
                            </p>
                            <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                                Why Book an Dzire Cab in {city}?
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
                                        <strong>Dzire on Rent</strong> makes it ideal for
                                        executive transit or as an elegant wedding car in {city}.
                                    </span>
                                </li>
                            </ul>
                            <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                                <p className="mb-0 text-card-foreground">
                                    At Chiku Cabs, we offer both the standard 7-seater Dzire and
                                    the premium 5-seater Dzire for{" "}
                                    <strong>cab booking</strong> in {city} at highly competitive
                                    rates. With our transparent per-km billing and pristine fleet,
                                    we ensure your journey is absolutely perfect.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Local Dominance Section */}
            <section className="py-8 px-4 bg-muted/10 border-t">
                <LocalDominance city={localDominanceCity} />
            </section>

            <InternalLinks parsedData={parsedData} />
            <EEATSection
                city={city !== "India" ? city : undefined}
                vehicle="Dzire"
            />

            <section className="py-12 px-4 bg-muted/20">
                <div className="max-w-7xl mx-auto">
                    <PopularCities
                        vehicleName={parsedData.vehicle || "Dzire"}
                        currentCity={parsedData.origin?.toLowerCase()}
                    />
                </div>
            </section>

            {/* related vehicles */}
            <section className="py-8 px-4 border-t bg-muted/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Other Vehicles Available in {city}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {relatedVehicles.map((vehicle) => {
                            const url =
                                parsedData.slugs.length >= 3
                                    ? `/${parsedData.slugs[0]}/${parsedData.slugs[1]}/${vehicle.slug}`
                                    : `/${parsedData.slugs[0]}/${vehicle.slug}`;

                            return (
                                <a
                                    key={vehicle.slug}
                                    href={url}
                                    className="border bg-white rounded-lg px-6 py-5 hover:border-primary hover:shadow-md transition-all"
                                >
                                    <h3 className="text-lg font-semibold leading-7">
                                        Hire {vehicle.name} on Rent in {city}
                                    </h3>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
}
