import { ParsedRouteData } from "@/lib/urlParser";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function LocalServiceTemplate({ parsedData }: { parsedData: ParsedRouteData }) {
    const city = parsedData.origin || "your city";
    const vehicle = parsedData.vehicle || "Cab";

    const getVehicleDetails = (v: string) => {
        const lowerV = v.toLowerCase();
        if (lowerV.includes("tempo") || lowerV.includes("traveller") || lowerV.includes("bus")) {
            return { icon: "🚐", image: "/tempo_traveller.png" };
        } else if (lowerV.includes("innova")) {
            return { icon: "✨", image: "/innova.png" };
        } else {
            return { icon: "🚘", image: "/cab.png" };
        }
    };
    const vDetails = getVehicleDetails(vehicle);

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden border-b">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1 text-left">
                        <div className="section-badge">EXPERT LOCAL KNOWLEDGE</div>
                        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight">
                            Premium <span className="gradient-text">{vehicle}</span> Hire <br />
                            in <span style={{ textDecoration: 'underline', textDecorationColor: 'hsla(45,90%,50%,0.3)' }}>{city}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                            Navigate {city} with ease. Experience the best <strong>cab booking</strong> and <strong>local taxi service</strong> with our expert chauffeurs who know every corner of the city. Whether you need an <strong>airport taxi</strong> or a full-day <strong>car rental</strong>, we ensure you reach your destination comfortably and on time.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:+918448445504" className="btn-primary text-lg px-8 py-4">📞 Book in {city}</a>
                            <a href="https://wa.me/918448445504" target="_blank" rel="noopener noreferrer" className="btn-outline text-lg px-8 py-4">💬 WhatsApp Us</a>
                        </div>
                    </div>
                    <div className="flex-1 w-full" style={{ maxWidth: '28rem' }}>
                        <div className="premium-card p-0 overflow-hidden">
                            <div className="aspect-[16/9] bg-muted relative">
                                <img src={vDetails.image} alt={`Hire ${vehicle || 'Cab'} in ${city !== 'India' ? city : 'India'} by Chiku Cabs`} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">Local {vDetails.icon} Package</h3>
                                    <span className="text-primary font-bold">From ₹1,500</span>
                                </div>
                                <p className="text-muted-foreground mb-6">8 Hours / 80 Kilometers inclusive of fuel and driver charges.</p>
                                <div className="pt-6 border-t flex justify-between text-sm font-bold opacity-60">
                                    <span>CLEAN CAR</span>
                                    <span>GPS TRACKED</span>
                                    <span>24/7 SUPPORT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute" style={{ top: 0, right: 0, width: '600px', height: '600px', background: 'hsla(45,90%,50%,0.05)', filter: 'blur(150px)', borderRadius: '50%', transform: 'translate(50%, -50%)' }}></div>
            </section>

            {/* Local Packages */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>PACKAGES</div>
                        <h2 className="section-title">{vehicle} Rental Packages in {city}</h2>
                        <p className="section-subtitle mx-auto">Choose the perfect package for your local travel needs.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "4 Hrs / 40 Km", price: "₹999", features: ["Sedan AC Car", "Fuel included", "Driver included", "Airport pickup"], popular: false },
                            { name: "8 Hrs / 80 Km", price: "₹1,499", features: ["Sedan/SUV AC Car", "Fuel included", "Driver included", "Multiple stops"], popular: true },
                            { name: "12 Hrs / 120 Km", price: "₹2,199", features: ["Any vehicle type", "Fuel included", "Driver included", "Full day coverage"], popular: false },
                            { name: "Full Day Outstation", price: "₹2,999", features: ["Innova/SUV", "250 km included", "Driver + Fuel", "Night charges incl."], popular: false }
                        ].map((pkg, i) => (
                            <div key={i} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                                {pkg.popular && <div className="package-badge">Most Popular</div>}
                                <h3 className="text-lg font-bold mb-4">{pkg.name}</h3>
                                <div className="package-price">{pkg.price}</div>
                                <div className="package-unit">Starting Price</div>
                                <ul className="package-features">
                                    {pkg.features.map((f, j) => (
                                        <li key={j}><span className="text-green-500">✔</span> {f}</li>
                                    ))}
                                </ul>
                                <a href="tel:+918448445504" className="btn-primary w-full py-3" style={{ display: 'block', textAlign: 'center' }}>Book Now</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-muted/30 py-24 border-y">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>HOW IT WORKS</div>
                        <h2 className="section-title">Book Your {city} Ride in 3 Steps</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>
                    <div className="steps-container">
                        {[
                            { num: "1", icon: "📱", title: "Call or WhatsApp", desc: `Reach us at 8448445504 with your ${city} travel requirements.` },
                            { num: "2", icon: "🚗", title: "Choose Package", desc: "Select from our 4hr, 8hr, 12hr, or full-day packages." },
                            { num: "3", icon: "🎉", title: "Enjoy Your Ride", desc: "Your verified driver arrives on time at your doorstep." }
                        ].map((step, i) => (
                            <div key={i} className="step-card">
                                <div className="step-number">{step.num}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Book With Us */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Why Book with Chiku Cabs in {city}?</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Local Guides", desc: `Drivers who know ${city} like the back of their hand.`, icon: "🗺️" },
                            { title: "Flat Rates", desc: "No surge pricing. Reliable fixed rates for all local trips.", icon: "💰" },
                            { title: "Instant Booking", desc: "Book within 60 seconds via call or WhatsApp.", icon: "⚡" },
                            { title: "Premium Fleet", desc: "Newer models only. AC and comfort guaranteed.", icon: "🚗" }
                        ].map((feature, idx) => (
                            <div key={idx} className="premium-card text-center">
                                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
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
                            <h2 className="section-title gradient-text" style={{ marginBottom: '2rem' }}>Top Sightseeing in {city}</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                {city} is a city of rich culture and heritage. Our <strong>local {vehicle} service in {city}</strong> is tailored for sightseeing trips that allow you to explore at your own pace.
                            </p>
                            <div className="space-y-4">
                                {["Historic Landmarks & Temples", "Local Markets & Street Food", "Religious & Spiritual Sites", "Corporate Parks & IT Hubs", "Nearby Hill Stations & Getaways"].map((item, i) => (
                                    <div key={i} className="route-card">
                                        <div className="route-card-icon">
                                            {i === 0 ? "🏛️" : i === 1 ? "🛍️" : i === 2 ? "🛕" : i === 3 ? "🏢" : "⛰️"}
                                        </div>
                                        <span>{item} in {city}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="h-80 bg-muted rounded-3xl overflow-hidden shadow-lg" style={{ border: '4px solid hsl(var(--background))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🏛️</div>
                            <div className="h-80 bg-muted rounded-3xl overflow-hidden shadow-lg" style={{ border: '4px solid hsl(var(--background))', transform: 'translateY(2rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🕌</div>
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
                            { num: "4.9 ★", label: "Average Rating" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <div className="stat-number">{stat.num}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>REVIEWS</div>
                        <h2 className="section-title">What Our {city} Travelers Say</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Anjali Mehta", text: `Used Chiku Cabs for a full day sightseeing in ${city}. The driver was like a personal guide! Very knowledgeable about all the tourist spots.`, rating: "★★★★★" },
                            { name: "Rohit Agarwal", text: `Booked the 8hr package for office meetings across ${city}. Very professional service, clean car, and the driver was always on time.`, rating: "★★★★★" },
                            { name: "Sunita Devi", text: `Airport pickup was seamless. Driver was already waiting when we landed. The car was clean and comfortable. Best cab service in ${city}!`, rating: "★★★★★" }
                        ].map((review, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="testimonial-stars">{review.rating}</div>
                                <p className="testimonial-text">"{review.text}"</p>
                                <div className="testimonial-author">{review.name}</div>
                                <div className="testimonial-route">Local {vehicle} in {city}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-muted/30 py-24 border-y">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>FAQ</div>
                        <h2 className="section-title">Frequently Asked Questions about {city} Cabs</h2>
                    </div>
                    {[
                        { q: `How much does a local taxi service cost in ${city}?`, a: `A local taxi service in ${city} starts from ₹999 for a 4-hour (40 km) package. Our 8-hour (80 km) cab booking is the most popular, starting at ₹1,499. Use our app for real-time rates.` },
                        { q: `Can I get an airport taxi for pickup or drop in ${city}?`, a: `Yes! We provide 24/7 airport taxi and airport transfer services in ${city}. Our drivers are punctual and prioritize your schedule for a stress-free flight.` },
                        { q: `Are the drivers for your taxi service in ${city} verified?`, a: `Every driver at Chiku Cabs undergoes a mandatory background check and police verification. They are local experts who know all the routes in ${city} perfectly.` },
                        { q: `Can I extend my local taxi service rental hours during the trip?`, a: `Certainly! You can extend your cab booking via the app or by informing the driver. Extra km and hours are charged at nominal rates for your convenience in ${city}.` },
                        { q: `Do you offer outstation cabs from ${city} as part of this service?`, a: `While this package is for local use, we also offer dedicated outstation cabs from ${city} to any destination in India at very competitive per km rates.` },
                        { q: `What vehicle options are available for local cab booking in ${city}?`, a: `You can choose from Hatchbacks, Sedans, SUVs like Innova, or even a tempo traveller on rent for bulk group travel during your ${city} tour.` },
                        { q: `Is car rental with a driver available for 12 hours in ${city}?`, a: `Yes, we offer a specialized 12-hour/120km car rental package which is ideal for business meetings or extensive city sightseeing in ${city}.` },
                        { q: `Do you provide luxury cab booking for local events in ${city}?`, a: `Absolutely. We offer luxury cab booking including Mercedes, Audi, and premium Innova Crysta for high-end local transit and weddings in ${city}.` },
                        { q: `Is the airport transfer service available at midnight in ${city}?`, a: `Yes, Chiku Cabs operates 24/7. Whether you need an airport taxi at 3 AM or a local taxi service for early morning travel, we are always available.` },
                        { q: `How do I get the cheapest taxi service in ${city}?`, a: `To get the best rates for your local cab booking, pre-book your ride on our website or app and check our latest seasonal discount offers for ${city}.` }
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
                    <h2 className="text-4xl font-extrabold mb-4">Ready to Explore {city}?</h2>
                    <p className="text-xl opacity-70 mb-8">Book your premium {vehicle} now and travel like a local.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="tel:+918448445504" className="btn-primary text-lg px-10 py-4 shadow-2xl">
                            📞 Call 8448445504
                        </a>
                        <a href="https://wa.me/918448445504" target="_blank" rel="noopener noreferrer" className="btn-outline text-lg px-10 py-4" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            {city !== 'your city' && (
                <section className="py-24 px-4 bg-muted/10 border-t">
                    <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">

                        <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">Top-Rated Local {vehicle} Booking in {city}</h2>
                        <div className="space-y-6">
                            <p>
                                When looking for the best <strong>local {vehicle} on rent in {city}</strong>, Chiku Cabs delivers unparalleled <strong>taxi service</strong>. Navigating through {city} traffic can be stressful, which is why hiring a reliable, chauffeur-driven cab via our easy <strong>cab booking</strong> platform is the smartest choice for tourists, business professionals, and local residents alike.
                            </p>
                            <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">Why Hire a {vehicle} for Full Day in {city}?</h3>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span>
                                    <span><strong>Flexible Packages:</strong> Choose from 4 Hours, 8 Hours, or 12 Hours {city} <strong>local taxi service</strong> packages based on your itinerary.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span>
                                    <span><strong>City Tours & Sightseeing:</strong> Book a local {vehicle} to explore landmarks and vibrant markets across {city}. Our <strong>outstation cabs</strong> drivers are also available for nearby getaways.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span>
                                    <span><strong>{city} Airport Taxi:</strong> Ensure you reach the airport on time with our punctual, GPS-tracked <strong>airport transfer</strong> fleet.</span>
                                </li>
                            </ul>
                            <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                                <p className="mb-0 text-card-foreground">
                                    Skip the unreliability of app-based ride-hailing services. Pre-book your <strong>{vehicle} rental in {city}</strong> with Chiku Cabs for a guaranteed, immaculately clean car and a highly professional <strong>taxi service</strong> experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <InternalLinks parsedData={parsedData} />
            <EEATSection city={city} vehicle={vehicle} />

            <Footer />
            <WhatsAppFloat />
        </div>
    );
}
