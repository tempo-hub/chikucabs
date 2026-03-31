/**
 * Shared EEAT (Experience, Expertise, Authority, Trust) section
 * Adds trust signals for SEO across all templates.
 */
export default function EEATSection({ city, vehicle }: { city?: string; vehicle?: string }) {
    return (
        <section className="py-24 px-4 border-y" style={{ background: 'linear-gradient(180deg, hsl(var(--background)), hsla(0,0%,96%,0.5))' }}>
            <div className="max-w-7xl mx-auto">
                {/* Trust Headline */}
                <div className="text-center mb-16">
                    <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>WHY TRUST CHIKU CABS</div>
                    <h2 className="section-title">
                        India's Most Trusted {vehicle || 'Cab'} Service{city ? ` in ${city}` : ''} Since 2015
                    </h2>
                    <p className="section-subtitle mx-auto" style={{ maxWidth: '48rem' }}>
                        With over <strong>1 Lakh+ completed trips</strong> across <strong>100+ cities</strong>,
                        Chiku Cabs has earned the trust of families, corporates, and travelers nationwide.
                    </p>
                </div>

                {/* EEAT Trust Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Experience */}
                    <div className="premium-card bg-card border shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-primary/10 text-primary">🏆</div>
                            <div>
                                <h3 className="text-xl font-bold">10+ Years Experience</h3>
                                <p className="text-sm font-medium text-muted-foreground mt-1">Serving travelers since 2015</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Founded in 2015, Chiku Cabs started with a small fleet in Delhi-NCR and has grown into one of India's
                            most reliable cab services. Our decade-long experience means we understand what travelers need —
                            clean vehicles, punctual drivers, transparent pricing, and 24/7 support.
                        </p>
                    </div>

                    {/* Expertise */}
                    <div className="premium-card bg-card border shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-primary/10 text-primary">👨‍✈️</div>
                            <div>
                                <h3 className="text-xl font-bold">500+ Verified Drivers</h3>
                                <p className="text-sm font-medium text-muted-foreground mt-1">Background-checked & trained</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Every Chiku Cabs driver undergoes police verification, license validation, and driving skill assessment.
                            Our drivers are trained in safe driving, customer etiquette, and first aid.
                            {city ? ` Our ${city}-based drivers know every route, shortcut, and local landmark.` : ''}
                        </p>
                    </div>

                    {/* Authoritativeness */}
                    <div className="premium-card bg-card border shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-primary/10 text-primary">📊</div>
                            <div>
                                <h3 className="text-xl font-bold">4.9★ Google Rating</h3>
                                <p className="text-sm font-medium text-muted-foreground mt-1">3,250+ verified reviews</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Rated 4.9 out of 5 on Google with 3,250+ genuine customer reviews. Our consistent rating across
                            years proves our commitment to quality. We are a registered travel agency (GSTIN verified) and
                            comply with all state transport regulations.
                        </p>
                    </div>

                    {/* Trustworthiness */}
                    <div className="premium-card bg-card border shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-primary/10 text-primary">🛡️</div>
                            <div>
                                <h3 className="text-xl font-bold">Safe & Transparent</h3>
                                <p className="text-sm font-medium text-muted-foreground mt-1">No hidden charges ever</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            All vehicles are GPS-tracked in real-time. Get a detailed fare breakdown before booking — driver allowance,
                            fuel, tolls, and GST clearly stated. Free cancellation up to 24 hours before pickup.
                            We carry passenger insurance for every trip.
                        </p>
                    </div>
                </div>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        "🏛️ GSTIN Verified",
                        "📋 Registered Travel Agency",
                        "🛡️ Passenger Insurance",
                        "📡 GPS Tracked Fleet",
                        "🔒 Secure Payments",
                        "📞 24/7 Customer Support"
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white border border-border/60 shadow-sm rounded-full px-5 py-2.5 hover:border-primary/30 hover:shadow-md transition-all">
                            <span className="text-sm font-semibold text-foreground">{badge}</span>
                        </div>
                    ))}
                </div>

                {/* Company Info for EEAT */}
                <div className="mt-20 relative">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-t-3xl"></div>
                    
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-12">
                        <div className="grid lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-7 xl:col-span-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 w-max">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse w-shrink-0"></span>
                                    Chiku Cabs Pvt. Ltd.
                                </div>
                                <h3 className="text-3xl font-black mb-6 tracking-tight">About Chiku Cabs</h3>
                                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                                    <p className="text-base leading-relaxed">
                                        Chiku Cabs is a premium cab rental company founded in 2015. We specialize in outstation cab services,
                                        Tempo Traveller rentals, Innova Crysta bookings, local city tours, and airport transfers across 100+ cities in India.
                                    </p>
                                    <p className="text-base leading-relaxed">
                                        Our mission is to make intercity and group travel affordable, safe, and stress-free for every Indian family.
                                        {city ? ` We have a dedicated fleet and driver network in ${city} to serve you with local expertise and care.` : ''}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Contact Details Card */}
                            <div className="lg:col-span-5 xl:col-span-4 bg-muted/30 rounded-2xl p-6 md:p-8 border border-border/50 w-full">
                                <h4 className="font-bold text-lg mb-6 border-b pb-4">Contact Information</h4>
                                <ul className="space-y-5 text-sm">
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">📍</div>
                                        <div>
                                            <span className="block font-semibold mb-1 text-foreground">Registered Office</span>
                                            <span className="text-muted-foreground leading-relaxed">Noida Sector 2, Uttar Pradesh 201301</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">📞</div>
                                        <div>
                                            <span className="block font-semibold mb-1 text-foreground">Phone Support</span>
                                            <a href="tel:+918448445504" className="text-primary hover:underline font-medium break-all">8448445504</a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">✉️</div>
                                        <div>
                                            <span className="block font-semibold mb-1 text-foreground">Email</span>
                                            <a href="mailto:info@chikucabs.com" className="text-primary hover:underline break-all">info@chikucabs.com</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
