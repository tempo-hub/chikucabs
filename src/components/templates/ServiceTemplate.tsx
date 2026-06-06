"use client";

import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import { useState } from "react";

export default function ServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const vehicle = parsedData.vehicle || "Premium Cab";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    distance: "",
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const getVehicleDetails = (v: string) => {
    const lowerV = v.toLowerCase();
    if (
      lowerV.includes("tempo") ||
      lowerV.includes("traveller") ||
      lowerV.includes("bus")
    ) {
      return {
        icon: "🚐",
        image: "/tempo_traveller.png",
        pricePerKm: 19,
        capacity: "9-12 Passengers",
        luggage: "8-10 Bags",
      };
    } else if (lowerV.includes("innova")) {
      return {
        icon: "✨",
        image: "/innova.png",
        pricePerKm: 17,
        capacity: "6-7 Passengers",
        luggage: "4-5 Bags",
      };
    } else {
      return {
        icon: "🚘",
        image: "/hatchback.png",
        pricePerKm: 10,
        capacity: "4 Passengers",
        luggage: "2-3 Bags",
      };
    }
  };
  const vDetails = getVehicleDetails(vehicle);

  const calculateFare = () => {
    const distance = parseFloat(formData.distance);
    if (!isNaN(distance) && distance > 0) {
      const fare = distance * vDetails.pricePerKm;
      setEstimatedPrice(fare);
    }
  };

  const faqs = [
    {
      q: `What is the minimum booking duration for ${vehicle} rental?`,
      a: `The minimum booking duration for ${vehicle} rental is 4 hours for local trips and 8 hours for outstation trips. For one-way trips, there is no minimum duration, you pay only for the distance traveled. Weekend packages start from 12 hours.`,
    },
    {
      q: `Does the ${vehicle} rental price include driver allowance and fuel?`,
      a: `Yes! Our ${vehicle} rental price is all-inclusive. It covers driver allowance, fuel cost, state permits (for outstation), toll taxes, and GST. Extra charges only apply for night travel (11 PM - 5 AM: 25% extra), parking fees, and waiting time beyond 15 minutes.`,
    },
    {
      q: `Can I book ${vehicle} for a one-way trip?`,
      a: `Absolutely! We offer one-way ${vehicle} rental at special discounted rates. You only pay for the distance traveled from pickup to drop location. No charges for the return journey. Perfect for airport transfers, one-way outstation trips, or inter-city travel.`,
    },
    {
      q: `What safety measures are followed for ${vehicle} rental?`,
      a: `Your safety is our priority! All our ${vehicle}s are sanitized before every trip. Drivers are police-verified, wear masks, and carry sanitizers. GPS tracking is active 24/7. Emergency buttons are installed in every vehicle for immediate assistance.`,
    },
    {
      q: `How much advance booking is required for ${vehicle}?`,
      a: `We recommend booking at least 24 hours in advance for guaranteed availability, especially during weekends and festival seasons. However, we also accept last-minute bookings subject to vehicle availability. Call us for immediate booking confirmation.`,
    },
    {
      q: `Do you provide child seats in ${vehicle}?`,
      a: `Yes, we provide child seats absolutely free on request. Please mention your requirement at the time of booking so we can arrange it. We have seats suitable for children aged 0-12 years.`,
    },
    {
      q: `What is the cancellation policy for ${vehicle} booking?`,
      a: `Free cancellation up to 24 hours before the trip. 50% cancellation charges apply between 12-24 hours. No refund for cancellation within 12 hours or no-show. You can also reschedule your booking at no extra cost up to 12 hours before the trip.`,
    },
    {
      q: `Can I modify my ${vehicle} booking after confirmation?`,
      a: `Yes! Free modifications are allowed up to 12 hours before your scheduled trip. You can change pickup time, drop location, or date. Call our customer support at 8448445504 for any modifications. Last-minute changes depend on vehicle availability.`,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-left">
            <div
              className="section-badge mb-6"
              style={{ display: "inline-flex" }}
            >
              ★ #1 TAXI RENTAL SERVICE IN INDIA
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              Premium <span className="gradient-text">{vehicle}</span> Rental{" "}
              <br />
              for Your Next Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Experience the gold standard in <strong>cab booking</strong>.
              Whether it's for <strong>outstation cabs</strong>, an{" "}
              <strong>airport taxi</strong>, or a local{" "}
              <strong>taxi service</strong>, our {vehicle} fleet offers
              unmatched comfort and reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918448445504"
                className="btn-primary text-lg px-8 py-4 shadow-xl"
              >
                📞 Book {vehicle} — 8448445504
              </a>
              <a
                href="https://wa.me/918448445504"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
          <div className="flex-1 w-full" style={{ maxWidth: "32rem" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] w-full bg-muted">
              <img
                src={vDetails.image}
                alt={`${vehicle} Rental Service`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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

      {/* Fleet Gallery */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">OUR FLEET</div>
            <h2 className="section-title">Choose Your Perfect Ride</h2>
            <p className="section-subtitle mx-auto">
              From budget-friendly sedans to luxury Innovas and spacious Tempo
              Travellers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: "STANDARD",
                car: "Hatchback",
                price: "9",
                image: "/hatchback.png",
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
                price: "17",
                desc: "Innova Crysta, Force Urbania",
                best: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${item.best ? "border-primary scale-105 z-10" : ""}`}
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
                  className={`w-full py-4 rounded-xl font-black tracking-tight text-center ${item.best ? "btn-primary" : ""}`}
                  style={
                    !item.best
                      ? { background: "hsl(var(--muted))", display: "block" }
                      : { display: "block" }
                  }
                >
                  BOOK NOW
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">SIMPLE BOOKING PROCESS</div>
            <h2 className="section-title">Book Your Ride in 3 Easy Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Vehicle",
                desc: "Select your preferred cab according to passengers and luggage.",
              },
              {
                step: "02",
                title: "Confirm Booking",
                desc: "Share pickup location, date and travel details.",
              },
              {
                step: "03",
                title: "Enjoy Journey",
                desc: "Professional driver arrives on time for a comfortable trip.",
              },
            ].map((item, i) => (
              <div key={i} className="premium-card text-center">
                <div className="text-5xl font-black text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">GALLERY</div>
            <h2 className="section-title">Our Fleet Gallery</h2>
            <p className="text-muted-foreground">
              Experience luxury and comfort with our premium fleet
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Hatchback", image: "/hatchback.png" },
              { name: "Sedan", image: "/sedan.png" },
              { name: "Innova", image: "/innova.png" },
              { name: "Tempo Traveller", image: "/tempo_traveller.png" },
            ].map((fleetItem, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src={fleetItem.image}
                  alt={`${fleetItem.name} fleet`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE CALCULATOR */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">CALCULATE FARE</div>
            <h2 className="section-title">Estimate Your {vehicle} Fare</h2>
            <p className="text-muted-foreground">
              Enter distance to get instant price estimate
            </p>
          </div>
          <div className="premium-card">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Distance (in km)
                </label>
                <input
                  type="number"
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                  }
                  placeholder="Enter distance"
                  className="w-full p-3 border rounded-xl"
                />
                <button
                  onClick={calculateFare}
                  className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Calculate Fare
                </button>
              </div>
              <div className="text-center bg-muted/30 rounded-xl p-6">
                <p className="text-muted-foreground mb-2">Estimated Price</p>
                <div className="text-5xl font-black text-primary">
                  {estimatedPrice
                    ? `₹${estimatedPrice.toLocaleString()}`
                    : "---"}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  *Includes driver allowance & fuel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">SERVICE AREAS</div>
            <h2 className="section-title">
              Available Across Major Indian Cities
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              "Delhi",
              "Noida",
              "Gurgaon",
              "Agra",
              "Jaipur",
              "Lucknow",
              "Chandigarh",
              "Varanasi",
            ].map((city) => (
              <div key={city} className="premium-card text-center">
                <h3 className="font-bold">{city}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Local • Airport • Outstation
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VEHICLE COMPARISON TABLE (Detailed) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">COMPARE VEHICLES</div>
            <h2 className="section-title">Detailed Vehicle Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-4 text-left">Vehicle Type</th>
                  <th className="p-4 text-center">Passengers</th>
                  <th className="p-4 text-center">Luggage</th>
                  <th className="p-4 text-center">AC</th>
                  <th className="p-4 text-center">Charging</th>
                  <th className="p-4 text-center">WiFi</th>
                  <th className="p-4 text-center">Price/km</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-bold text-left">Hatchback</td>
                  <td className="p-4 text-center">4</td>
                  <td className="p-4 text-center">2 bags</td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-red-500 font-bold">❌</td>
                  <td className="p-4 text-center font-bold text-primary">₹9</td>
                </tr>
                <tr className="border-b bg-muted/20">
                  <td className="p-4 font-bold text-left">Sedan</td>
                  <td className="p-4 text-center">4</td>
                  <td className="p-4 text-center">3 bags</td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center font-bold text-primary">
                    ₹12
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-bold text-left">SUV/Innova</td>
                  <td className="p-4 text-center">6-7</td>
                  <td className="p-4 text-center">5 bags</td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center font-bold text-primary">
                    ₹17
                  </td>
                </tr>
                <tr className="border-b bg-muted/20">
                  <td className="p-4 font-bold text-left">Tempo Traveller</td>
                  <td className="p-4 text-center">9-12</td>
                  <td className="p-4 text-center">10 bags</td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center text-green-600 font-bold">
                    ✓
                  </td>
                  <td className="p-4 text-center font-bold text-primary">
                    ₹18-20
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US VS COMPETITORS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">WHY WE'RE BETTER</div>
            <h2 className="section-title">Chiku Cabs vs Others</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-4 text-left">Features</th>
                  <th className="p-4">Chiku Cabs</th>
                  <th className="p-4">Other Services</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Professional Drivers",
                    chiku: "✓ Verified & Trained",
                    other: "❌ Not always",
                  },
                  {
                    feature: "Transparent Pricing",
                    chiku: "✓ No hidden charges",
                    other: "⚠️ Hidden costs",
                  },
                  {
                    feature: "24/7 Customer Support",
                    chiku: "✓ Live human support",
                    other: "❌ Chat bot only",
                  },
                  {
                    feature: "Free Cancellation",
                    chiku: "✓ Up to 24 hours",
                    other: "❌ Cancellation fee",
                  },
                  {
                    feature: "GPS Tracking",
                    chiku: "✓ Real-time",
                    other: "⚠️ Sometimes",
                  },
                  {
                    feature: "Clean & Sanitized",
                    chiku: "✓ After every trip",
                    other: "❌ Not guaranteed",
                  },
                  {
                    feature: "Best Price Guarantee",
                    chiku: "✓ Yes",
                    other: "❌ No",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4 font-bold">{row.feature}</td>
                    <td className="p-4 text-center text-green-600">
                      {row.chiku}
                    </td>
                    <td className="p-4 text-center text-red-500">
                      {row.other}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-muted/30 py-24 border-y px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">WHY CHIKU CABS</div>
            <h2 className="section-title">
              Why We're India's Most Trusted Cab Service
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Verified Chauffeurs",
                desc: "Highly trained and background-verified drivers ensuring your safety.",
              },
              {
                icon: "🚗",
                title: "Luxury Fleet",
                desc: `Meticulously maintained ${vehicle}s equipped with modern amenities.`,
              },
              {
                icon: "💰",
                title: "Transparent Billing",
                desc: "Fixed pricing with no hidden costs. Pay only what you see.",
              },
              {
                icon: "⏰",
                title: "24/7 Availability",
                desc: "Round the clock service for all your travel needs.",
              },
              {
                icon: "📍",
                title: "GPS Tracking",
                desc: "Real-time location tracking for every ride.",
              },
              {
                icon: "🔄",
                title: "Free Cancellation",
                desc: "Cancel your booking up to 24 hours before the trip at zero charges.",
              },
            ].map((feature, i) => (
              <div key={i} className="premium-card group">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl"
                  style={{ background: "hsla(45,90%,50%,0.1)" }}
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

      {/* DRIVER PROFILE SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">OUR DRIVERS</div>
            <h2 className="section-title">Meet Our Verified Drivers</h2>
            <p className="text-muted-foreground">
              Professional, experienced, and background-verified chauffeurs
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                exp: "8 years",
                rating: "4.9",
                trips: "2500+",
              },
              {
                name: "Suresh Singh",
                exp: "6 years",
                rating: "4.8",
                trips: "1800+",
              },
              {
                name: "Amit Sharma",
                exp: "10 years",
                rating: "5.0",
                trips: "3200+",
              },
              {
                name: "Vikram Thakur",
                exp: "5 years",
                rating: "4.7",
                trips: "1500+",
              },
            ].map((driver, i) => (
              <div key={i} className="premium-card text-center">
                <div className="text-6xl mb-3">👨‍✈️</div>
                <h3 className="font-bold text-lg">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {driver.exp} experience
                </p>
                <p className="text-yellow-500">⭐ {driver.rating}</p>
                <p className="text-xs text-muted-foreground">
                  {driver.trips} trips completed
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEASONAL OFFERS */}
      <section className="py-24 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">HOT OFFERS</div>
            <h2 className="section-title">
              Limited Time {vehicle} Rental Deals
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="premium-card text-center border-2 border-orange-300">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="font-bold text-xl mb-2">Festival Special</h3>
              <p className="text-3xl font-black text-primary mb-2">15% OFF</p>
              <p className="text-muted-foreground">
                On all outstation bookings
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Use code: FESTIVE15
              </p>
            </div>
            <div className="premium-card text-center border-2 border-green-300">
              <div className="text-4xl mb-2">👥</div>
              <h3 className="font-bold text-xl mb-2">Group Discount</h3>
              <p className="text-3xl font-black text-primary mb-2">20% OFF</p>
              <p className="text-muted-foreground">For 5+ bookings</p>
              <p className="text-xs text-muted-foreground mt-2">
                Call for offer
              </p>
            </div>
            <div className="premium-card text-center border-2 border-blue-300">
              <div className="text-4xl mb-2">🔄</div>
              <h3 className="font-bold text-xl mb-2">Round Trip Offer</h3>
              <p className="text-3xl font-black text-primary mb-2">10% OFF</p>
              <p className="text-muted-foreground">On round trip bookings</p>
              <p className="text-xs text-muted-foreground mt-2">Auto-applied</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TRACKING DEMO */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">LIVE TRACKING</div>
            <h2 className="section-title">Real-Time GPS Tracking</h2>
            <p className="text-muted-foreground">
              Share your live location with family for safety
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card">
              <div className="bg-muted/30 rounded-xl p-4 text-center">
                <div className="text-6xl mb-2">📍</div>
                <p className="font-bold">Live Vehicle Location</p>
                <p className="text-sm text-muted-foreground">
                  Track your ride in real-time
                </p>
              </div>
            </div>
            <div className="premium-card">
              <div className="bg-muted/30 rounded-xl p-4 text-center">
                <div className="text-6xl mb-2">👨‍👩‍👧</div>
                <p className="font-bold">Share Trip Status</p>
                <p className="text-sm text-muted-foreground">
                  Send live tracking link to family
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL INSURANCE */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-3xl font-bold mb-4">Travel Insurance Coverage</h2>
          <p className="text-muted-foreground mb-6">
            All rides are covered with comprehensive travel insurance up to ₹5
            lakhs
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3">Accident Cover</div>
            <div className="bg-white rounded-lg p-3">Medical Emergency</div>
            <div className="bg-white rounded-lg p-3">Luggage Loss</div>
            <div className="bg-white rounded-lg p-3">24/7 Assistance</div>
          </div>
        </div>
      </section>

      {/* ACCESSIBILITY FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">ACCESSIBILITY</div>
            <h2 className="section-title">Travel for Everyone</h2>
            <p className="text-muted-foreground">
              Special vehicles for elderly and differently-abled passengers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="premium-card text-center">
              <div className="text-5xl mb-3">♿</div>
              <h3 className="font-bold">Wheelchair Accessible</h3>
              <p className="text-sm text-muted-foreground">
                Specially modified vehicles
              </p>
            </div>
            <div className="premium-card text-center">
              <div className="text-5xl mb-3">🦯</div>
              <h3 className="font-bold">Assistance Service</h3>
              <p className="text-sm text-muted-foreground">
                Driver assistance available
              </p>
            </div>
            <div className="premium-card text-center">
              <div className="text-5xl mb-3">🔊</div>
              <h3 className="font-bold">Audio Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Voice assistance for route guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY CONTACT */}
      <section className="py-20 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🚨</div>
          <h2 className="text-3xl font-bold mb-4">24/7 Emergency Support</h2>
          <p className="text-muted-foreground mb-6">
            Roadside assistance • Medical emergency • Police support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
            >
              📞 Emergency: 8448445504
            </a>
          </div>
        </div>
      </section>

      {/* AFFILIATE/PARTNERS SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">OUR PARTNERS</div>
            <h2 className="section-title">Trusted By Leading Brands</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {[
              "🏨 Taj Hotels",
              "🏢 Infosys",
              "🏦 HDFC Bank",
              "✈️ MakeMyTrip",
              "🏢 Wipro",
            ].map((partner, i) => (
              <div key={i} className="bg-white px-6 py-3 rounded-xl font-bold">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG/ARTICLES SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">TRAVEL TIPS</div>
            <h2 className="section-title">Latest Travel Articles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Best Hill Stations Near Delhi",
                readTime: "5 min read",
                date: "Dec 15, 2024",
              },
              {
                title: "How to Plan a Budget-Friendly Road Trip",
                readTime: "7 min read",
                date: "Dec 10, 2024",
              },
              {
                title: "Top Wedding Destinations in India",
                readTime: "6 min read",
                date: "Dec 5, 2024",
              },
            ].map((blog, i) => (
              <div
                key={i}
                className="premium-card hover:shadow-xl transition-all"
              >
                <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                <p className="text-sm text-muted-foreground">
                  📖 {blog.readTime} • 📅 {blog.date}
                </p>
                <button className="mt-4 text-primary font-bold text-sm">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS & CONDITIONS */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">POLICIES</div>
            <h2 className="section-title">Terms & Conditions</h2>
          </div>
          <div className="premium-card space-y-3 text-sm">
            <p>
              <strong>Cancellation Policy:</strong> Free cancellation up to 24
              hours before trip. 50% charge for cancellation within 12-24 hours.
              100% charge for no-show.
            </p>
            <p>
              <strong>Refund Policy:</strong> Refunds processed within 5-7
              business days to original payment method.
            </p>
            <p>
              <strong>Waiting Charges:</strong> Free waiting for 15 minutes. ₹50
              per 15 minutes thereafter.
            </p>
            <p>
              <strong>Night Charges:</strong> 25% extra between 11 PM to 5 AM.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Why Chiku Cabs is the Best for {vehicle} Hire
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Searching for a reliable <strong>{vehicle} on rent</strong>? At
              Chiku Cabs, we provide top-tier <strong>taxi service</strong> and{" "}
              <strong>cab booking</strong> across India. Our{" "}
              <strong>outstation cabs</strong> are perfectly suited for local
              tours, <strong>airport taxi</strong> transfers, and long-distance
              travel.
            </p>
            <p>
              Our <strong>{vehicle} hire</strong> options are designed for
              maximum value. We pride ourselves on offering 24/7 customer
              support and a seamless <strong>cab booking</strong> experience.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-medium">
              <li>
                Highly reliable <strong>outstation cabs</strong>
              </li>
              <li>
                Punctual <strong>airport taxi</strong> service
              </li>
              <li>
                Verified <strong>taxi service</strong> drivers
              </li>
              <li>
                No surge pricing on <strong>cab booking</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-24 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">CUSTOMER REVIEWS</div>
            <h2 className="section-title">Trusted by Thousands of Travelers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Khanna",
                text: `Best ${vehicle} rental service I've used. Highly recommended!`,
                rating: "★★★★★",
              },
              {
                name: "Meera Joshi",
                text: "Used for family wedding trip. The Innova was luxurious!",
                rating: "★★★★★",
              },
              {
                name: "Aman Tiwari",
                text: "Excellent corporate cab service. Punctual, clean cars.",
                rating: "★★★★★",
              },
            ].map((review, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{review.rating}</div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-muted/20 border-y">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>

            <h2 className="section-title">
              Frequently Asked Questions About {vehicle} Rental
            </h2>
            <p className="text-muted-foreground mt-4">
              Everything you need to know before booking your {vehicle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none hover:bg-muted/50 transition-colors">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-primary">
                    ▼
                  </span>
                </summary>

                <div className="pl-12 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-12 border-y">
        <div className="flex flex-wrap justify-center gap-12 opacity-60">
          {[
            "🛡️ SafeTravels Certified",
            "📋 ISO 9001:2015",
            "⭐ Top Rated 2024",
            "🌿 Eco Friendly Fleet",
          ].map((badge, i) => (
            <span
              key={i}
              className="font-bold text-sm uppercase tracking-widest"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto cta-banner">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-xl opacity-70 mb-8">
            Call now and get instant confirmation for your {vehicle} rental.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-xl px-12 py-5 shadow-2xl"
            >
              📞 Call 8448445504
            </a>
            <a
              href="https://wa.me/918448445504"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-4 rounded-xl font-bold inline-flex items-center justify-center transition-all hover:scale-105 shadow-lg"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <EEATSection vehicle={vehicle} />
    </div>
  );
}
