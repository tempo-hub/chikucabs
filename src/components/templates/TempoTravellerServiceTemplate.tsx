import { ParsedRouteData } from "@/lib/urlParser";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function TempoTravellerServiceTemplate({ parsedData }: { parsedData: ParsedRouteData }) {
    const city = parsedData.origin || "India";

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1">
                        <div className="section-badge">🚐 INDIA'S #1 TEMPO TRAVELLER RENTAL</div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
                            <span className="gradient-text">Tempo Traveller</span> on Rent
                            {city !== "India" && <> in {city}</>}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                            Perfect for group trips, weddings, and corporate outings. Experience seamless <strong>tempo traveller booking</strong> and get the best <strong>tempo traveller on rent</strong> with pushback reclining seats, AC, and a top-rated <strong>group travel service</strong> experience for your entire group.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:+918448445504" className="btn-primary text-lg px-8 py-4 shadow-2xl">
                                📞 Book Tempo — 8448445504
                            </a>
                            <a href="https://wa.me/918448445504" target="_blank" rel="noopener noreferrer" className="btn-outline text-lg px-8 py-4">
                                💬 WhatsApp Us
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 w-full" style={{ maxWidth: '32rem' }}>
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9]">
                            <img src="/tempo_traveller.png" alt={`Tempo Traveller on Rent in ${city !== 'India' ? city : 'India'} by Chiku Cabs`} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="absolute" style={{ top: '30%', right: '-10%', width: '600px', height: '600px', background: 'hsla(358,73%,43%,0.05)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }}></div>
            </section>

            {/* Stats Bar */}
            <section className="border-y py-12" style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }}>
                <div className="max-w-5xl mx-auto px-4">
                    <div className="stats-grid">
                        {[
                            { num: "50,000+", label: "Group Trips Done" },
                            { num: "500+", label: "Tempo Travellers" },
                            { num: "100+", label: "Cities Covered" },
                            { num: "4.9 ★", label: "Customer Rating" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <div className="stat-number" style={{ color: 'hsl(var(--primary))' }}>{stat.num}</div>
                                <div className="stat-label" style={{ color: 'hsla(0,0%,100%,0.5)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seating Variants */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>CHOOSE YOUR SIZE</div>
                        <h2 className="section-title">Tempo Traveller Seating Options {city !== 'India' ? `in ${city}` : ''}</h2>
                        <p className="section-subtitle mx-auto">Every variant comes with AC, pushback seats, luggage carrier & music system.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { seats: "12 Seater", model: "Force Urbania / Traveller", price: "₹18/km", best: false, features: ["12 Pushback Seats", "Large Luggage Space", "AC + Music", "Ideal for Family"] },
                            { seats: "16 Seater", model: "Force Traveller 3350", price: "₹22/km", best: true, features: ["16 Pushback Seats", "Extra Legroom", "AC + Music + LED", "Best for Groups"] },
                            { seats: "20 Seater", model: "Force Traveller 4020", price: "₹25/km", best: false, features: ["20 Pushback Seats", "Roof Carrier", "AC + Charging Points", "Wedding & Events"] },
                            { seats: "26 Seater", model: "Force Traveller / Bus", price: "₹28/km", best: false, features: ["26 Comfortable Seats", "Maximum Capacity", "AC + Entertainment", "Pilgrimages & Tours"] }
                        ].map((variant, i) => (
                            <div key={i} className={`package-card ${variant.best ? 'popular' : ''}`}>
                                {variant.best && <div className="package-badge">Most Popular</div>}
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚐</div>
                                <h3 className="text-xl font-black mb-1">{variant.seats}</h3>
                                <p className="text-xs text-muted-foreground mb-4">{variant.model}</p>
                                <div className="package-price" style={{ color: 'hsl(var(--primary))' }}>{variant.price}</div>
                                <div className="package-unit">Per Kilometer</div>
                                <ul className="package-features">
                                    {variant.features.map((f, j) => (
                                        <li key={j}><span className="text-green-500">✔</span> {f}</li>
                                    ))}
                                </ul>
                                <a href="tel:+918448445504" className="btn-primary w-full py-3 text-sm" style={{ display: 'block', textAlign: 'center' }}>Book {variant.seats}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities */}
            <section className="bg-muted/30 py-24 border-y px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>PREMIUM AMENITIES</div>
                        <h2 className="section-title">What's Inside Our Tempo Travellers {city !== 'India' ? `in ${city}` : ''}</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: "❄️", title: "Powerful AC", desc: "High-capacity air conditioning that keeps the entire cabin cool even in peak summer." },
                            { icon: "💺", title: "Pushback Reclining Seats", desc: "Comfortable reclining seats with individual armrests for long journeys." },
                            { icon: "🎵", title: "Music & Entertainment", desc: "Bluetooth-enabled music system with speakers throughout the cabin." },
                            { icon: "🧳", title: "Spacious Luggage", desc: "Dedicated luggage space and overhead carrier to store all your bags safely." },
                            { icon: "🔌", title: "Charging Points", desc: "USB and mobile charging points at every seat row to keep devices powered." },
                            { icon: "🪟", title: "Large Windows", desc: "Wide windows with curtains for scenic views and privacy during travel." }
                        ].map((amenity, i) => (
                            <div key={i} className="premium-card group">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl" style={{ background: 'hsla(358,73%,43%,0.1)' }}>
                                    {amenity.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{amenity.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{amenity.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Perfect for Every Group Occasion {city !== 'India' ? `in ${city}` : ''}</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { icon: "🛕", title: "Pilgrimages", desc: "Char Dham, Vaishno Devi, Golden Temple & more" },
                            { icon: "💒", title: "Weddings", desc: "Baarat pickup, guest transfers & family travel" },
                            { icon: "🏔️", title: "Hill Stations", desc: "Manali, Shimla, Nainital, Mussoorie trips" },
                            { icon: "🏢", title: "Corporate Outings", desc: "Team outings, offsites & retreats" },
                            { icon: "🎓", title: "School/College Trips", desc: "Educational tours & excursions" },
                            { icon: "✈️", title: "Airport Transfers", desc: "Large group airport pickups & drops" }
                        ].map((useCase, i) => (
                            <div key={i} className="route-card">
                                <div className="route-card-icon">{useCase.icon}</div>
                                <div>
                                    <div className="font-bold text-sm">{useCase.title}</div>
                                    <div className="text-xs text-muted-foreground">{useCase.desc}</div>
                                </div>
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
                        <h2 className="section-title">Book Your Tempo Traveller {city !== 'India' ? `in ${city}` : ''} in 3 Steps</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>
                    <div className="steps-container">
                        {[
                            { num: "1", icon: "📱", title: "Share Your Plan", desc: "Tell us your group size, pickup city, destination, and travel dates via call or WhatsApp." },
                            { num: "2", icon: "🚐", title: "Choose Your Tempo", desc: "Pick from 12, 16, 20, or 26 seater based on your group size and budget." },
                            { num: "3", icon: "✅", title: "Confirm & Travel", desc: "Get instant confirmation. Your dedicated Tempo Traveller arrives at your doorstep." }
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

            {/* Testimonials */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>CUSTOMER REVIEWS</div>
                        <h2 className="section-title">What Group Travelers in {city !== 'India' ? city : 'India'} Say</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Vikram & Family", text: "Booked a 16 seater for our Char Dham Yatra. The tempo was brand new with pushback seats. Driver was experienced with hill roads. Amazing trip!", rating: "★★★★★" },
                            { name: "Rahul (Corporate)", text: "Used Chiku Cabs for our office team outing of 20 people. The 20-seater tempo was clean, spacious, and the driver was very courteous. Will use again!", rating: "★★★★★" },
                            { name: "Priya Wedding Group", text: "Booked 2 tempo travellers for our wedding guest transfers. Both arrived on time, well-decorated, and the drivers handled everything professionally.", rating: "★★★★★" }
                        ].map((review, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="testimonial-stars">{review.rating}</div>
                                <p className="testimonial-text">"{review.text}"</p>
                                <div className="testimonial-author">{review.name}</div>
                                <div className="testimonial-route">Tempo Traveller Service</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-muted/30 py-24 border-y px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>FAQ</div>
                        <h2 className="section-title">Tempo Traveller Rental Questions {city !== 'India' ? `for ${city}` : ''}</h2>
                    </div>
                    {[
                        { q: `What seating options are available for tempo traveller on rent in ${city}?`, a: `We offer 12 seater, 16 seater, 20 seater, and 26 seater tempo traveller on rent in ${city}. All options come with AC, pushback reclining seats, and ample luggage space.` },
                        { q: `How much does a tempo traveller booking cost per day in ${city}?`, a: `Pricing for tempo traveller booking in ${city} starts from ₹18/km. Total cost depends on distance, duration, and the seating capacity you choose.` },
                        { q: `Are the vehicles well-maintained for outstation tempo traveller trips?`, a: `Yes! Our entire outstation tempo traveller fleet in ${city} is regularly serviced and deeply sanitized to provide a premium group travel service.` },
                        { q: `Can I book a tempo traveller on rent for a one-way trip from ${city}?`, a: `Yes, we offer specialized one-way tempo traveller booking from ${city} to various destinations at special reduced rates for group travel service.` },
                        { q: `Is the driver experienced with outstation tempo traveller routes?`, a: `Absolutely. Every driver for our outstation tempo traveller service in ${city} is specifically trained for long-distance and mountain road driving.` },
                        { q: `Do you provide tempo traveller on rent for local sightseeing in ${city}?`, a: `Yes, our local tempo traveller on rent packages in ${city} are perfect for family outings, corporate groups, and local city tours.` },
                        { q: `What are the amenities included in your tempo traveller booking?`, a: `Every tempo traveller booking includes high-quality AC, a music system, LED TV (in most models), pushback seats, and a dedicated luggage carrier.` },
                        { q: `Is it possible to hire a tempo traveller on rent for a wedding in ${city}?`, a: `Yes, we specialize in tempo traveller booking for weddings in ${city}, providing guest transfers and luxury travel for the bridal party.` },
                        { q: `How can I calculate the per km rate for tempo traveller booking?`, a: `The per km rate for tempo traveller booking starts at ₹18. Use our app or call 8448445504 for a transparent quote for your ${city} itinerary.` },
                        { q: `Are there any night charges for outstation tempo traveller service?`, a: `Our outstation tempo traveller service includes night charges in the package, ensuring a stress-free and transparent tempo traveller booking experience.` }
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
                    <h2 className="text-4xl font-extrabold mb-4">Ready to Book Your Tempo Traveller?</h2>
                    <p className="text-xl opacity-70 mb-8">Call now for the best group travel rates. Instant confirmation guaranteed.</p>
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
            {city !== 'India' && (
                <section className="py-24 px-4 bg-muted/10 border-t">
                    <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
                        <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">Hire the Best Tempo Traveller in {city}</h2>
                        <div className="space-y-6">
                            <p>
                                Are you planning a group trip from <strong>{city}</strong>? Whether for a wedding or corporate offsite, hiring a <strong>tempo traveller on rent in {city}</strong> is the most comfortable choice. Chiku Cabs offers premium <strong>tempo traveller booking</strong> for 12 to 26-seater vehicles, ensuring a reliable <strong>group travel service</strong> for all your <strong>outstation tempo traveller</strong> needs.
                            </p>
                            <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">Top Uses for Tempo Traveller Rentals in {city}</h3>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span>
                                    <span><strong>Local Sightseeing in {city}:</strong> Explore tourist attractions comfortably with our <strong>local tempo traveller service</strong> specialized for groups.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span>
                                    <span><strong>Outstation tempo traveller from {city}:</strong> Plan weekend getaways securely with our verified commercial <strong>tempo traveller service</strong> drivers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span>
                                    <span><strong>{city} Airport Taxi:</strong> Need to transfer a large group? Our <strong>airport transfer</strong> service with spacious luggage carriers has you covered.</span>
                                </li>
                            </ul>
                            <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                                <p className="mb-0 text-card-foreground">
                                    Booking your <strong>tempo traveller on rent in {city}</strong> is easy via our <strong>tempo traveller booking</strong> app. We offer 100% transparent pricing for both local and <strong>outstation tempo traveller</strong> trips from {city}.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <InternalLinks parsedData={parsedData} />
            <EEATSection city={city !== 'India' ? city : undefined} vehicle="Tempo Traveller" />

            <Footer />
            <WhatsAppFloat />
        </div>
    );
}
