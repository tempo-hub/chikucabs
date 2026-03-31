import { ParsedRouteData } from "@/lib/urlParser";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function DriverServiceTemplate({ parsedData }: { parsedData: ParsedRouteData }) {
    const city = parsedData.origin || "India";

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-4 overflow-hidden border-b">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="section-badge mb-6">👔 PREMIUM DRIVER SERVICE</div>
                    <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter max-w-4xl mx-auto">
                        Hire a Professional <span className="gradient-text">Driver</span>
                        {city !== "India" && <> in {city}</>}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                        Looking for a reliable <strong>taxi service</strong> driver? Hire our police-verified, highly experienced chauffeurs for <strong>outstation cabs</strong>, local trips, and corporate events {city !== "India" ? `in ${city}` : ""}. Enjoy the convenience of professional <strong>cab booking</strong> for drivers on rent.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="tel:+918448445504" className="btn-primary text-lg px-10 py-5 shadow-2xl">
                            📞 Book Driver — 8448445504
                        </a>
                        <a href="https://wa.me/918448445504" target="_blank" rel="noopener noreferrer" className="btn-outline text-lg px-10 py-5">
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </section>
            
            {/* Stats Bar */}
            <section className="border-b py-12 bg-muted/30">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="stats-grid">
                        {[
                            { num: "50,000+", label: "Happy Clients" },
                            { num: "5,000+", label: "Verified Drivers" },
                            { num: "24/7", label: "Availability" },
                            { num: "4.9 ★", label: "Driver Rating" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-item text-center">
                                <div className="text-3xl font-black text-primary mb-2">{stat.num}</div>
                                <div className="text-sm text-muted-foreground font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="py-24 px-4 border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto mb-4" style={{ display: 'inline-flex' }}>RATES</div>
                        <h2 className="section-title text-4xl font-extrabold tracking-tight">Driver Hire Packages {city !== 'India' ? `in ${city}` : ''}</h2>
                        <p className="section-subtitle mx-auto mt-4 text-muted-foreground">Flexible rates for your convenience. Only pay for the time you need.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "4 Hours", price: "₹399", features: ["Local City Driving", "Daytime Routing", "Verified Chauffeur"], popular: false },
                            { name: "8 Hours", price: "₹699", features: ["Office & Meetings", "Full Day City Tour", "Verified Chauffeur"], popular: true },
                            { name: "12 Hours", price: "₹999", features: ["Extended Day Driving", "Late Night Returns", "Verified Chauffeur"], popular: false },
                            { name: "Outstation", price: "₹500/day", features: ["Highway Expertise", "Hill Station Trained", "Night Driving Capable"], popular: false }
                        ].map((pkg, i) => (
                            <div key={i} className={`p-8 rounded-3xl border bg-card text-card-foreground shadow-sm flex flex-col ${pkg.popular ? 'border-primary ring-1 ring-primary relative scale-105 z-10 shadow-xl' : ''}`}>
                                {pkg.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                                <h3 className="text-2xl font-black mb-4">{pkg.name}</h3>
                                <div className="text-4xl font-extrabold text-primary mb-6">{pkg.price}</div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {pkg.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2">
                                            <span className="text-primary text-xl">✔</span> 
                                            <span className="text-sm font-medium">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="tel:+918448445504" className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center block">Book Now</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Chiku Cabs Drivers */}
            <section className="py-24 px-4 bg-muted/10 border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto mb-4" style={{ display: 'inline-flex' }}>TRUST</div>
                        <h2 className="section-title text-4xl font-extrabold tracking-tight">Why Hire a Driver With Us?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: "👮", title: "Police Verified", desc: "100% background-checked and police-verified drivers for your complete safety and peace of mind." },
                            { icon: "🎓", title: "Professionally Trained", desc: "Our chauffeurs undergo rigorous training in etiquette, smooth driving, and route knowledge." },
                            { icon: "⏰", title: "Punctual & Reliable", desc: "Drivers arrive 15 minutes prior to your booking time anywhere in the city." },
                            { icon: "🗺️", title: "Outstation Experts", desc: "Dedicated drivers experienced in long-route, nighttime, and hill-station driving." },
                            { icon: "📱", title: "24/7 Support", desc: "Our customer service team tracks and assists you whenever you book a driver from us." },
                            { icon: "🧼", title: "Well-Groomed", desc: "Chauffeurs wear clean, professional uniforms and maintain excellent personal hygiene." }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-background border shadow-sm group hover:-translate-y-1 transition-transform">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl bg-primary/10 text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-4 border-b">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-badge mx-auto mb-4" style={{ display: 'inline-flex' }}>FAQ</div>
                        <h2 className="section-title text-4xl font-extrabold tracking-tight">Driver Hire Questions {city !== 'India' ? `for ${city}` : ''}</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: `How do I hire a driver in ${city} for my personal car?`, a: `Hiring a driver in ${city} is easy with Chiku Cabs. Simply call 8448445504 or use our app for a professional cab booking of a verified chauffeur who will drive your personal vehicle safely.` },
                            { q: `What are the charges for hiring a driver in ${city} for 8 hours?`, a: `Our 8-hour package for hiring a driver in ${city} starts at ₹699. It's the most popular choice for office meetings and local city errands using your own car and our taxi service expertise.` },
                            { q: `Are the drivers for the taxi service in ${city} police-verified?`, a: `Yes, 100%. Every professional you hire from Chiku Cabs undergoes a rigorous background check and police verification, ensuring maximum safety for your family and vehicle.` },
                            { q: `Can I hire a driver in ${city} for an outstation trip?`, a: `Absolutely. We have specialized outstation experts. When you hire a driver in ${city} for highway trips, we ensure they are experienced in long-distance and night driving.` },
                            { q: `Do I need to provide food when I hire a driver in ${city} for outstation?`, a: `For outstation trips, a standard daily driver allowance (e.g., ₹500) is applicable to cover their meals and lodging, ensuring your hired professional remains fresh and alert.` },
                            { q: `Is it possible to hire a driver in ${city} for a luxury automatic car?`, a: `Yes, our chauffeurs are trained to drive all types of vehicles, from basic hatchbacks to high-end luxury sedans and automatic SUVs, providing a premium taxi service feel.` },
                            { q: `What if my trip in ${city} exceeds the 8-hour cab booking?`, a: `No problem! If your trip goes beyond the package, a nominal per-hour overtime rate is charged. Our transparent cab booking system ensures you only pay for the extra time used.` },
                            { q: `Do your professionals have experience with airport taxi drops?`, a: `Yes, many clients hire a driver in ${city} specifically for airport transfer in their own car, allowing them to be dropped off at the terminal comfortably.` },
                            { q: `Can I hire a driver in ${city} for a one-way outstation drop?`, a: `Yes, we provide drivers for one-way outstation drops. However, please note that return travel arrangements for the driver from the destination must be discussed during cab booking.` },
                            { q: `How can I confirm my cab booking for a driver in ${city}?`, a: `You can confirm your booking instantly by calling 8448445504. We recommend booking at least 4-6 hours in advance to ensure the best professional is assigned to you.` }
                        ].map((faq, i) => (
                            <details key={i} className="group border rounded-2xl bg-card overflow-hidden">
                                <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none hover:bg-muted/50 transition-colors">
                                    {faq.q}
                                    <span className="transition-transform group-open:rotate-180 text-primary">▼</span>
                                </summary>
                                <div className="p-6 pt-0 text-muted-foreground border-t bg-muted/10 leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            {city !== 'India' && (
                <section className="py-24 px-4 bg-muted/10 border-b">
                    <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
                        <div className="section-badge mb-6" style={{ display: 'inline-flex' }}>SEO GUIDE</div>
                        <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">Hire the Best Professional Driver in {city}</h2>
                        <div className="space-y-6">
                            <p>
                                Driving through traffic can be stressful. By choosing to <strong>hire a driver in {city}</strong> from Chiku Cabs, you are investing in a premier <strong>taxi service</strong> experience in the comfort of your own car. Whether you need a chauffeur for <strong>outstation cabs</strong> or a <strong>local taxi service</strong> expert, we have you covered.
                            </p>
                            <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">Top Reasons to Book a Driver on Rent in {city}</h3>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span> 
                                    <span><strong>Local {city} Errands:</strong> Sit back and prepare for meetings while our verified <strong>taxi service</strong> driver navigates the city traffic.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span> 
                                    <span><strong>Outstation Cabs Trips:</strong> Planning a road trip from {city}? Let a highway-expert <strong>cab booking</strong> driver handle the long route.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1 text-xl">✔</span> 
                                    <span><strong>Airport Taxi Drop:</strong> Get a professional driver to drop you at the airport securely in your own car.</span>
                                </li>
                            </ul>
                            <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                                <p className="mb-0 text-card-foreground">
                                    With Chiku Cabs, <strong>hiring a driver in {city}</strong> is just a call away. All our drivers are strictly police-verified and trained for the highest <strong>taxi service</strong> standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <InternalLinks parsedData={parsedData} />
            <EEATSection city={city !== 'India' ? city : undefined} vehicle="Hire Driver" />

            <Footer />
            <WhatsAppFloat />
        </div>
    );
}
