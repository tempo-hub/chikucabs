import React, { useMemo } from "react";
import Head from "next/head";
import Script from "next/script";
import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaWhatsapp,
  FaUserTie,
  FaMoneyBillWave,
  FaCar,
  FaRegClock,
  FaMapMarkerAlt,
  FaSuitcase,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";

export default function DriverServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const city = parsedData.origin || "India";

  const DRIVER_FAQS = useMemo(
    () => [
      {
        q: `How do I hire a verified driver in ${city !== "India" ? city : "India"} for my personal car?`,
        a: `Hiring a professional driver with Chiku Cabs is instant. Call +91-8448445504 or WhatsApp our 24/7 dispatch desk. Share your car model (manual/automatic/luxury), pickup address, and duration (hourly, full-day, or outstation). A police-verified, uniformed chauffeur will arrive at your doorstep 15 minutes prior to departure.`,
      },
      {
        q: `What are the rates for hiring a driver for 4, 8, and 12 hours in ${city !== "India" ? city : "India"}?`,
        a: `Our transparent driver hire packages start at ₹399 for 4 hours, ₹699 for 8 hours, and ₹999 for 12 hours. If your requirement extends beyond package hours, affordable overtime is billed at just ₹70 to ₹100 per additional hour.`,
      },
      {
        q: `Are all Chiku Cabs drivers police-verified and background-checked?`,
        a: `Yes, 100%. Every driver undergoes comprehensive background verification, Aadhaar authentication, commercial driving license checks, and local police verification before onboarding. Our drivers are trained in road etiquette, defensive driving, and passenger safety.`,
      },
      {
        q: `Can I hire a driver for outstation trips, highway travel, and hill stations?`,
        a: `Yes. We provide specialized outstation chauffeurs experienced in long-distance highway navigation, night driving, and mountainous terrain (Shimla, Manali, Nainital, Mussoorie, Ooty, Western Ghats). Outstation driver allowance is a flat ₹500/calendar day covering driver meals and lodging.`,
      },
      {
        q: `Are your chauffeurs trained to handle luxury sedans, automatic transmissions, and electric vehicles?`,
        a: `Yes. Our premium chauffeur pool includes drivers trained specifically for high-end luxury vehicles including Mercedes-Benz, BMW, Audi, Jaguar, Range Rover, automatic DCT/CVT gearboxes, and modern electric vehicles (EVs).`,
      },
      {
        q: `Can I hire a designated driver for late-night party returns or airport transfers?`,
        a: `Absolutely. Many clients book our chauffeurs for safe returns from late-night corporate dinners, weddings, or social parties, eliminating DUI risks. We also offer one-way airport drop-off where the driver drives you to the terminal in your own car and safely returns your vehicle home.`,
      },
      {
        q: `How quickly can a driver arrive at my home or office address?`,
        a: `In ${city !== "India" ? city : "major metropolitan cities"}, on-demand drivers can be dispatched within 45 to 60 minutes. For guaranteed scheduling and preferred driver selection, we recommend reserving 2 to 4 hours in advance.`,
      },
      {
        q: `What is the cancellation and rescheduling policy for driver hire?`,
        a: `We provide 100% free cancellation if canceled up to 2 hours before scheduled reporting time. There are no cancellation penalties or hidden processing deductions.`,
      },
      {
        q: `Can I hire a permanent or monthly chauffeur for daily office commutes?`,
        a: `Yes. Chiku Cabs offers flexible monthly driver contracts for corporate executives, working professionals, and senior citizens with trial days and hassle-free replacements in case of driver illness or leave.`,
      },
      {
        q: `What happens if my trip exceeds the booked package hours?`,
        a: `No need to worry. Your booking seamlessly rolls into our standardized per-hour overtime charge (₹80–₹100/hr) with transparent digital time tracking. You only pay for the exact extra minutes used.`,
      },
      {
        q: `Is insurance coverage provided while the driver is operating my personal vehicle?`,
        a: `Our chauffeurs practice strict defensive driving protocols. While primary vehicle insurance remains with the vehicle owner as per Indian motor vehicle laws, Chiku Cabs assumes operational accountability and only assigns drivers with spotless zero-accident commercial driving histories.`,
      },
      {
        q: `How do I make payment for driver hire services?`,
        a: `Payment can be made seamlessly via UPI, Google Pay, PhonePe, Paytm, net banking, debit/credit cards, or direct cash payment to the chauffeur after completion of the duty hours. A GST invoice is issued for all corporate bookings.`,
      },
    ],
    [city]
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: DRIVER_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    }),
    [DRIVER_FAQS]
  );

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Professional Driver Hire Service${city !== "India" ? ` in ${city}` : ""}`,
      description: `Hire verified, experienced personal chauffeurs in ${city !== "India" ? city : "India"} for local city errands, corporate travel, night party drops, and outstation road trips.`,
      provider: {
        "@type": "LocalBusiness",
        name: "Chiku Cabs",
        telephone: PHONE_NUMBER,
      },
      areaServed: {
        "@type": "City",
        name: city !== "India" ? city : "India",
      },
    }),
    [city]
  );

  return (
    <>
      <Head>
        <title>
          {city !== "India"
            ? `Hire Professional Driver in ${city} | Verified Chauffeurs – Chiku Cabs`
            : "Hire Professional Driver on Rent | Verified Chauffeurs – Chiku Cabs"}
        </title>
        <meta
          name="description"
          content={
            city !== "India"
              ? `Hire police-verified professional chauffeurs in ${city} for local city travel, corporate meetings, and outstation trips in your personal car. Starting ₹399. Call ${PHONE_NUMBER}.`
              : `Hire police-verified professional chauffeurs across India for local city travel and outstation trips in your personal car. Starting ₹399. Call ${PHONE_NUMBER}.`
          }
        />
        <link
          rel="canonical"
          href={`https://chikucabs.com/driver-service${
            city !== "India" ? `-in-${city.toLowerCase().replace(/\s+/g, "-")}` : ""
          }`}
        />
      </Head>

      <Script
        id="driver-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="driver-faq-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden border-b">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="section-badge mb-6">👔 PREMIUM DRIVER SERVICE</div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter max-w-4xl mx-auto">
            Hire a Professional <span className="gradient-text">Driver</span>
            {city !== "India" && <> in {city}</>}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Looking for a reliable <strong>taxi service</strong> driver? Hire
            our police-verified, highly experienced chauffeurs for{" "}
            <strong>outstation cabs</strong>, local trips, and corporate events{" "}
            {city !== "India" ? `in ${city}` : ""}. Enjoy the convenience of
            professional <strong>cab booking</strong> for drivers on rent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918448445504"
              className="btn-primary text-lg px-10 py-5 shadow-2xl"
            >
              📞 Book Driver — 8448445504
            </a>

            <a
              href={`https://wa.me/916280820037?text=${encodeURIComponent(
                "Hi Chiku Cabs, I’m interested in booking a Tempo Traveller through your website. Please share the available options and booking details.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-10 py-5"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
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

      {/* Packages */}
      <section className="py-24 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto mb-4"
              style={{ display: "inline-flex" }}
            >
              RATES
            </div>
            <h2 className="section-title text-4xl font-extrabold tracking-tight">
              Driver Hire Packages {city !== "India" ? `in ${city}` : ""}
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-muted-foreground">
              Flexible rates for your convenience. Only pay for the time you
              need.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "4 Hours",
                price: "₹399",
                features: [
                  "Local City Driving",
                  "Daytime Routing",
                  "Verified Chauffeur",
                ],
                popular: false,
              },
              {
                name: "8 Hours",
                price: "₹699",
                features: [
                  "Office & Meetings",
                  "Full Day City Tour",
                  "Verified Chauffeur",
                ],
                popular: true,
              },
              {
                name: "12 Hours",
                price: "₹999",
                features: [
                  "Extended Day Driving",
                  "Late Night Returns",
                  "Verified Chauffeur",
                ],
                popular: false,
              },
              {
                name: "Outstation",
                price: "₹500/day",
                features: [
                  "Highway Expertise",
                  "Hill Station Trained",
                  "Night Driving Capable",
                ],
                popular: false,
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border bg-card text-card-foreground shadow-sm flex flex-col ${pkg.popular ? "border-primary ring-1 ring-primary relative scale-105 z-10 shadow-xl" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black mb-4">{pkg.name}</h3>
                <div className="text-4xl font-extrabold text-primary mb-6">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-primary text-xl">✔</span>
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/916280820037?text=${encodeURIComponent(
                    "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center block"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Chiku Cabs Drivers */}
      <section className="py-24 px-4 bg-muted/10 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto mb-4"
              style={{ display: "inline-flex" }}
            >
              TRUST
            </div>
            <h2 className="section-title text-4xl font-extrabold tracking-tight">
              Why Hire a Driver With Us?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👮",
                title: "Police Verified",
                desc: "100% background-checked and police-verified drivers for your complete safety and peace of mind.",
              },
              {
                icon: "🎓",
                title: "Professionally Trained",
                desc: "Our chauffeurs undergo rigorous training in etiquette, smooth driving, and route knowledge.",
              },
              {
                icon: "⏰",
                title: "Punctual & Reliable",
                desc: "Drivers arrive 15 minutes prior to your booking time anywhere in the city.",
              },
              {
                icon: "🗺️",
                title: "Outstation Experts",
                desc: "Dedicated drivers experienced in long-route, nighttime, and hill-station driving.",
              },
              {
                icon: "📱",
                title: "24/7 Support",
                desc: "Our customer service team tracks and assists you whenever you book a driver from us.",
              },
              {
                icon: "🧼",
                title: "Well-Groomed",
                desc: "Chauffeurs wear clean, professional uniforms and maintain excellent personal hygiene.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-background border shadow-sm group hover:-translate-y-1 transition-transform"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl bg-primary/10 text-primary">
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

        {/* =====================================================
            AUDIT SECTION 1: SMART CHAUFFEUR COMPARISON MATRIX
        ====================================================== */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                CHAUFFEUR HIRE COMPARISON
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Chiku Verified Driver vs Freelancer, Self-Drive &amp; App Cabs
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                Enjoy the luxury of traveling in your own personal car with a certified, police-verified professional behind the wheel.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="p-4 md:p-5 font-semibold">Service Parameter</th>
                    <th className="p-4 md:p-5 font-bold text-amber-400 bg-slate-800">
                      Chiku Verified Chauffeur
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Unverified / Freelancer
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Driving Yourself
                    </th>
                    <th className="p-4 md:p-5 font-medium text-slate-300">
                      Calling App Cabs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaShieldAlt className="text-primary text-lg" /> Police Verification &amp; Safety
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      100% Police Verified &amp; Aadhaar Authenticated
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Zero background checks, theft risk</td>
                    <td className="p-4 md:p-5 text-slate-600">High driving fatigue &amp; stress</td>
                    <td className="p-4 md:p-5 text-slate-600">Randomly assigned drivers</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaCar className="text-primary text-lg" /> Luxury &amp; Automatic Handling
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Trained for Sedans, Luxury SUVs, DCT, CVT &amp; EVs
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Prone to gear clutch riding and damage</td>
                    <td className="p-4 md:p-5 text-slate-600">Familiar, but exhausting in jams</td>
                    <td className="p-4 md:p-5 text-slate-600">Worn-out commercial hatchback fleet</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaRegClock className="text-primary text-lg" /> Punctuality &amp; Replacement
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Reports 15 Mins Early, Instant Backup Replacement
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Frequent no-shows &amp; phone switches</td>
                    <td className="p-4 md:p-5 text-slate-600">Parking hunting delays</td>
                    <td className="p-4 md:p-5 text-slate-600">High ride cancellations during peaks</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary text-lg" /> Cost Value &amp; Comfort
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Starts from ₹399 (Own Car Comfort &amp; Economy)
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Unregulated demanding cash rates</td>
                    <td className="p-4 md:p-5 text-slate-600">Fuel only, but loss of productive work</td>
                    <td className="p-4 md:p-5 text-slate-600">Heavy surge multiplier rates</td>
                  </tr>
                  <tr className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <FaSuitcase className="text-primary text-lg" /> Outstation &amp; Night Journeys
                    </td>
                    <td className="p-4 md:p-5 font-semibold text-emerald-700 bg-amber-50/60">
                      Certified Highway &amp; Mountain Ghat Navigation
                    </td>
                    <td className="p-4 md:p-5 text-slate-600">Risky night reflexes &amp; alcohol issues</td>
                    <td className="p-4 md:p-5 text-slate-600">Dangerous driver drowsiness on highways</td>
                    <td className="p-4 md:p-5 text-slate-600">Rarely available for multi-day tours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            AUDIT SECTION 3: USE CASES & DISPATCH HUBS
        ====================================================== */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                CHAUFFEUR USE CASES &amp; HUBS
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                When &amp; Where to Hire a Personal Chauffeur
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                Professional driver dispatch across residential colonies, business districts, airports, and outstation routes in {city !== "India" ? city : "India"}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: "💼",
                  title: "Executive Daily Commute",
                  desc: "Transform stressful traffic jams into productive work hours. Prepare presentations and take calls in the comfort of your car's back seat.",
                  tag: "Corporate Executives & Founders",
                },
                {
                  icon: "🥂",
                  title: "Night Party & Event Drops",
                  desc: "Attend sangeet celebrations, club nights, and cocktail parties without DUI worries. Our chauffeur drives you home safely.",
                  tag: "Zero-Risk Party Returns",
                },
                {
                  icon: "🏔️",
                  title: "Outstation Vacations & Hills",
                  desc: "Take your personal SUV or sedan on long family road trips to hill stations without tiring yourself behind the steering wheel.",
                  tag: "Mountain Highway Specialists",
                },
                {
                  icon: "✈️",
                  title: "Airport Drops in Own Car",
                  desc: "Get dropped off at the airport terminal in your own car; our chauffeur safely drives your vehicle back to your family at home.",
                  tag: "Safe Airport Terminal Drops",
                },
              ].map((card, cIdx) => (
                <div key={cIdx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{card.desc}</p>
                  <div className="bg-amber-50 rounded-lg p-2.5 text-xs font-semibold text-amber-900 border border-amber-200/60">
                    📍 {card.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Doorstep Dispatch Hubs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <IoLocationSharp className="text-primary text-2xl" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Fast 45-Minute Chauffeur Dispatch Across {city !== "India" ? city : "India"}
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                Our network of background-verified chauffeurs is stationed across prime hubs for rapid doorstep dispatch to your society gate or office porch:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Gated Residential High-Rises & Townships",
                  "Major Corporate IT Parks & Business Hubs",
                  "International & Domestic Airport Pickups",
                  "Central Railway Stations & Intercity Junctions",
                  "Hospitals & Medical Centers for Senior Care",
                  "Wedding Resorts & Banquet Hall Hubs",
                  "Suburban Highway Interchanges & Outskirts",
                  "Diplomatic Enclaves & VIP Residences",
                ].map((hub, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs md:text-sm font-semibold rounded-full border border-slate-200 transition-colors"
                  >
                    <FaCheckCircle className="text-emerald-500 text-xs" /> {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            AUDIT SECTION 4: INCLUSIONS, EXCLUSIONS & DRIVER GUIDELINES
        ====================================================== */}
        <section className="py-20 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="section-badge inline-flex mb-3">
                TRANSPARENCY &amp; GUIDELINES
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Driver Service Inclusions, Exclusions &amp; Policies
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3">
                Transparent working terms with zero hidden fees, clear overtime pricing, and guaranteed chauffeur reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 rounded-2xl p-7 border border-emerald-200 shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">What is Included</h3>
                </div>
                <ul className="space-y-3.5 text-slate-700 text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Police Verified Chauffeur:</strong> 100% Aadhaar-verified, licensed professional with clean driving track record.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>15-Minute Advance Reporting:</strong> Chauffeur arrives at your requested doorstep address before scheduled time.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Manual &amp; Automatic Transmission:</strong> Skilled across all car brands (Hatchbacks, Sedans, SUVs, BMW, Mercedes, Audi, EVs).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Professional Grooming:</strong> Clean, well-dressed, polite chauffeur maintaining high hygiene standards.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-primary text-base flex-shrink-0 mt-1" />
                    <span><strong>Zero Advance Cancellation Fee:</strong> Cancel anytime up to 2 hours before reporting with 100% refund.</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions & Guidelines */}
              <div className="bg-amber-50/40 rounded-2xl p-7 border border-amber-200 shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl">
                    ℹ️
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">What is Excluded &amp; Payable at Actuals</h3>
                </div>
                <ul className="space-y-3.5 text-slate-700 text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Fuel, Tolls &amp; Vehicle Parking:</strong> All vehicle operational costs (fuel, Fastag tolls, parking slips) remain with vehicle owner.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Outstation Driver Allowance:</strong> Fixed ₹500/calendar day allowance for chauffeur meals and overnight stay on outstation trips.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Overtime Rates:</strong> Billed at flat ₹80–₹100/hr only if duty hours exceed the booked package duration.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Late Night Return Allowance:</strong> Nominal charge (₹150–₹200) applies if local shift concludes after 10:00 PM for driver's return transit.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span><strong>Vehicle Fitness:</strong> The vehicle must have valid insurance, PUC, and sufficient fuel for the intended journey.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl md:text-3xl font-black mb-2 text-white">
                  Need a Verified Driver in {city !== "India" ? city : "India"} Today?
                </h4>
                <p className="text-slate-300 text-sm md:text-base max-w-xl">
                  Call our 24/7 chauffeur booking desk for instant 45-minute dispatch or schedule in advance for outstation trips.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Chiku Cabs, I want to hire a driver for my car in ${city !== "India" ? city : "India"}. Please confirm booking.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-sm md:text-base transition-all shadow-lg"
                >
                  <FaWhatsapp className="text-xl" /> WhatsApp Booking
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm md:text-base transition-all shadow-lg"
                >
                  Call +91-8448445504
                </a>
              </div>
            </div>
          </div>
        </section>

      {/* FAQ */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="section-badge mx-auto mb-4"
              style={{ display: "inline-flex" }}
            >
              FAQ
            </div>
            <h2 className="section-title text-4xl font-extrabold tracking-tight">
              Driver Hire Questions {city !== "India" ? `for ${city}` : ""}
            </h2>
          </div>
          <div>
            {DRIVER_FAQS.map((faq, i) => (
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
        </div>
      </section>

      {/* SEO Content Section */}
      {city !== "India" && (
        <section className="py-24 px-4 bg-muted/10 border-b">
          <div className="max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
            <div
              className="section-badge mb-6"
              style={{ display: "inline-flex" }}
            >
              SEO GUIDE
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground tracking-tight">
              Hire the Best Professional Driver in {city}
            </h2>
            <div className="space-y-6">
              <p>
                Driving through traffic can be stressful. By choosing to{" "}
                <strong>hire a driver in {city}</strong> from Chiku Cabs, you
                are investing in a premier <strong>taxi service</strong>{" "}
                experience in the comfort of your own car. Whether you need a
                chauffeur for <strong>outstation cabs</strong> or a{" "}
                <strong>local taxi service</strong> expert, we have you covered.
              </p>
              <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground border-b pb-4">
                Top Reasons to Book a Driver on Rent in {city}
              </h3>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Local {city} Errands:</strong> Sit back and prepare
                    for meetings while our verified{" "}
                    <strong>taxi service</strong> driver navigates the city
                    traffic.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Outstation Cabs Trips:</strong> Planning a road trip
                    from {city}? Let a highway-expert{" "}
                    <strong>cab booking</strong> driver handle the long route.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✔</span>
                  <span>
                    <strong>Airport Taxi Drop:</strong> Get a professional
                    driver to drop you at the airport securely in your own car.
                  </span>
                </li>
              </ul>
              <div className="bg-card p-8 rounded-2xl border shadow-sm mt-8">
                <p className="mb-0 text-card-foreground">
                  With Chiku Cabs, <strong>hiring a driver in {city}</strong> is
                  just a call away. All our drivers are strictly police-verified
                  and trained for the highest <strong>taxi service</strong>{" "}
                  standards.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <InternalLinks parsedData={parsedData} />

      <EEATSection
        city={city !== "India" ? city : undefined}
        vehicle="Hire Driver"
      />
      </div>
    </>
  );
}
