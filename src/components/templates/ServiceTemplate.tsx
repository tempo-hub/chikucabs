import { ParsedRouteData } from "@/lib/urlParser";
import EEATSection from "@/components/shared/EEATSection";
import ServiceBookingWidget from "@/components/templates/ServiceBookingWidget";
import LazyServiceFareCalculator from "@/components/templates/LazyServiceFareCalculator";
import { createSchemaGraph } from "@/lib/structuredData";
import Image from "next/image";
import {
  FaCarSide,
  FaUserTie,
  FaWallet,
  FaHeadset,
  FaSyncAlt,
  FaMapMarkerAlt,
  FaSprayCan,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
  FaCar,
  FaCaravan,
  FaBus,
  FaList,
  FaMoneyBillWave,
  FaUsers,
  FaUser,
  FaSuitcase,
  FaSnowflake,
  FaWifi,
  FaBatteryFull,
  FaMedal,
  FaBriefcase,
  FaGem,
  FaMicrochip,
  FaRegLightbulb,
} from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";

// --- Type Definitions ---
interface VehicleDetails {
  icon: string;
  image: string;
  pricePerKm: number;
  capacity: string;
  luggage: string;
  description: string;
  features: string[];
}

interface StatItem {
  num: string;
  label: string;
}

interface FleetItem {
  tier: string;
  car: string;
  price: string;
  image: string;
  desc: string;
  best: boolean;
  capacity: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: string;
  location?: string;
}

interface CityService {
  name: string;
  services: string[];
}

// --- Constants ---
const PHONE_NUMBER = "+918448445504";
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";
const DEFAULT_VEHICLE = "Premium Cab";
const currentYear = new Date().getFullYear();

const VEHICLE_DETAILS_MAP: Record<
  string,
  Omit<VehicleDetails, "description">
> = {
  tempo: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 9,
    capacity: "7-8 Passengers",
    luggage: "2-4 Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Luggage Space",
    ],
  },
  traveller: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 20,
    capacity: "9-12 Passengers",
    luggage: "8-10 Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Luggage Space",
    ],
  },
  bus: {
    icon: "🚐",
    image: "/tempo_traveller.png",
    pricePerKm: 9,
    capacity: "9-12 Passengers",
    luggage: "8-10 Bags",
    features: [
      "Spacious Seating",
      "AC",
      "Entertainment System",
      "Luggage Space",
    ],
  },
  innova: {
    icon: "✨",
    image: "/innova.png",
    pricePerKm: 17,
    capacity: "6-7 Passengers",
    luggage: "4-5 Bags",
    features: ["Leather Seats", "AC", "WiFi", "Charging Ports"],
  },
  default: {
    icon: "🚘",
    image: "/suzuki-dzire.png",
    pricePerKm: 9,
    capacity: "4 Passengers",
    luggage: "2-3 Bags",
    features: ["AC", "Comfortable Seats", "Charging Ports", "Boot Space"],
  },
};

const STATS: StatItem[] = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.2/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

const FLEET_DATA: FleetItem[] = [
  {
    tier: "STANDARD",
    car: "Hatchback",
    price: "8.5",
    image: "/hatchback.png",
    desc: "Swift, WagonR or similar",
    best: false,
    capacity: "4 Passengers",
  },
  {
    tier: "POPULAR",
    car: "Sedan",
    price: "9",
    image: "/sedan.png",
    desc: "Dzire, Ertiga or similar",
    best: true,
    capacity: "4 Passengers",
  },
  {
    tier: "LUXURY",
    car: "Innova",
    price: "16",
    image: "/innova.png",
    desc: "Innova Crysta, Force Urbania",
    best: false,
    capacity: "6-7 Passengers",
  },
];

const STEPS = [
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
];

const FEATURES = [
  {
    icon: "🛡️",
    title: "Verified Chauffeurs",
    desc: "Highly trained and background-verified drivers ensuring your safety.",
  },
  {
    icon: "🚗",
    title: "Luxury Fleet",
    desc: "Meticulously maintained vehicles equipped with modern amenities.",
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
    title: "Easy Cancellation",
    desc: "Cancel your booking up to 24 hours before the trip at zero charges.",
  },
];

const CITIES: CityService[] = [
  { name: "Delhi", services: ["Local", "Airport", "Outstation"] },
  { name: "Noida", services: ["Local", "Airport", "Outstation"] },
  { name: "Gurgaon", services: ["Local", "Airport", "Outstation"] },
  { name: "Agra", services: ["Local", "Airport", "Outstation"] },
  { name: "Jaipur", services: ["Local", "Airport", "Outstation"] },
  { name: "Lucknow", services: ["Local", "Airport", "Outstation"] },
  { name: "Chandigarh", services: ["Local", "Airport", "Outstation"] },
  { name: "Varanasi", services: ["Local", "Airport", "Outstation"] },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajesh Khanna",
    text: "Best taxi service I've used. Professional drivers and spotless cars!",
    rating: "★★★★★",
    location: "Delhi",
  },
  {
    name: "Meera Joshi",
    text: "Used for family wedding trip. The Innova was luxurious and on time.",
    rating: "★★★★★",
    location: "Mumbai",
  },
  {
    name: "Aman Tiwari",
    text: "Excellent corporate cab service. Punctual, clean cars, and easy booking.",
    rating: "★★★★★",
    location: "Bangalore",
  },
];

const COMPARISON_FEATURES = [
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
    feature: "Easy Cancellation",
    chiku: "✓ Up to 24 hours",
    other: "❌ Cancellation fee",
  },
  { feature: "GPS Tracking", chiku: "✓ Real-time", other: "⚠️ Sometimes" },
  {
    feature: "Clean & Sanitized",
    chiku: "✓ After every trip",
    other: "❌ Not guaranteed",
  },
];

// --- Helper Functions ---
const getVehicleDetails = (vehicle: string): VehicleDetails => {
  const lowerV = vehicle.toLowerCase();
  let baseDetails;

  if (
    lowerV.includes("tempo") ||
    lowerV.includes("traveller") ||
    lowerV.includes("bus")
  ) {
    baseDetails = VEHICLE_DETAILS_MAP.tempo;
  } else if (lowerV.includes("innova")) {
    baseDetails = VEHICLE_DETAILS_MAP.innova;
  } else {
    baseDetails = VEHICLE_DETAILS_MAP.default;
  }

  return {
    ...baseDetails,
    description: `Experience premium travel with our ${vehicle} rental service. Perfect for ${baseDetails.capacity} with ${baseDetails.luggage} capacity.`,
  };
};

const generateFAQs = (vehicle: string): FAQItem[] => [
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
    a: `Easy cancellation up to 24 hours before the trip. 50% cancellation charges apply between 12-24 hours. No refund for cancellation within 12 hours or no-show. You can also reschedule your booking at no extra cost up to 12 hours before the trip.`,
  },
  {
    q: `Can I modify my ${vehicle} booking after confirmation?`,
    a: `Yes! Free modifications are allowed up to 12 hours before your scheduled trip. You can change pickup time, drop location, or date. Call our customer support at ${PHONE_NUMBER} for any modifications. Last-minute changes depend on vehicle availability.`,
  },
  {
    q: `Are computerized GST invoices provided for corporate business bookings?`,
    a: `Yes. We provide official computerized GST tax invoices with your business name and GSTIN for all ${vehicle} bookings to ensure seamless corporate accounting and input tax credit claims.`,
  },
  {
    q: `Can I book an airport taxi pickup with live flight tracking for ${vehicle}?`,
    a: `Yes! Chiku Cabs provides 24×7 dedicated airport transfer services for ${vehicle}. Our dispatch desk monitors your flight status in real time and offers 45 minutes of complimentary waiting time after landing.`,
  },
  {
    q: `Are pet-friendly travel options available when hiring ${vehicle}?`,
    a: `Yes, we welcome pets on selected ${vehicle} rentals upon prior request. Please mention that you are traveling with pets at the time of booking so we can assign an accommodating vehicle and driver.`,
  },
  {
    q: `What payment options are accepted for ${vehicle} rental?`,
    a: `We accept all convenient payment modes including UPI (Google Pay, PhonePe, Paytm), net banking, debit/credit cards, and cash payment to the chauffeur after completion of your ride.`,
  },
];

// --- Main Component ---
export default function ServiceTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const vehicle = parsedData.vehicle || DEFAULT_VEHICLE;
  const vehicleDetails = getVehicleDetails(vehicle);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${vehicle} Rental Service`,
    description: `Book ${vehicle} for local, outstation, and airport transfers. Best price guaranteed. Professional drivers, 24/7 support.`,
    provider: { "@id": "https://chikucabs.com/#localbusiness" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: vehicleDetails.pricePerKm,
      highPrice: vehicleDetails.pricePerKm * 2,
      offerCount: 3,
      availability: "https://schema.org/InStock",
    },
  };

  const faqs = generateFAQs(vehicle);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
  const serviceSchema = createSchemaGraph(structuredData, faqSchema);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="bg-background min-h-screen">
        {/* Hero Section - Professional Redesign */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/cabonrent.webp"
              alt="Chiku Cabs Premium Fleet"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm">4.2 Rating • 1250+ Reviews</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
  {vehicle} on Rent
  <br />
  <span className="text-primary">
    Starting at ₹{vehicleDetails.pricePerKm}/km
  </span>
</h1>

                <p className="text-lg mb-8 opacity-90 max-w-xl leading-relaxed">
  Book a {vehicle} on rent in india at a competitive price with
  professional drivers and well-maintained, sanitized cars. Perfect for
  local travel, sightseeing, airport transfers, business trips and
  comfortable city journeys. Book your cab with 24/7 support.
</p>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+918448445504"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    📞 Book Now
                  </a>

                  <a
                    href={`https://wa.me/916280820037?text=${encodeURIComponent(
                      "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      <CiClock1 />
                    </span>
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      <FaCarSide />
                    </span>
                    <span className="text-sm">Sanitized Cars</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Booking Widget (Like Uber) */}
              <ServiceBookingWidget vehicle={vehicle} />
            </div>
          </div>
        </section>

        {/* Stats Bar - Professional Version */}
        <section className="pt-12 pb-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto">OUR REVIEWS</div>
              <h2 className="section-title">What Our Customers Say About Us</h2>
              <p className="section-subtitle mx-auto">
                Trusted by thousands of travelers across India. Here's what they
                have to say about their experience with Chiku Cabs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="relative inline-block">
                    <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.num}
                    </div>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                  </div>
                  <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Gallery */}
        <section className="py-12 px-4 border-b border-slate-300">
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
              {FLEET_DATA.map((item, i) => (
                <div
                  key={i}
                  className={`premium-card relative overflow-hidden flex flex-col pt-12 pb-8 px-8 transition-all duration-300 hover:-translate-y-2 ${
                    item.best
                      ? "border border-primary shadow-xl scale-105 z-10 bg-white"
                      : "border hover:border-primary hover:shadow-lg"
                  }`}
                >
                  {item.best && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-black uppercase rounded-bl-lg">
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
                  <div className="mt-auto mb-10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black opacity-50">
                        FROM
                      </span>
                      <span className="text-5xl font-black">₹{item.price}</span>
                      <span className="text-sm font-black opacity-50">
                        / KM
                      </span>
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
                        <span className="text-primary text-xl">✓</span>{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="tel:+918448445504"
                    className={`w-full py-4 rounded-xl font-black tracking-tight text-center transition-all ${
                      item.best
                        ? "btn-primary shadow-lg"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    📞 BOOK NOW
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* How It Works */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto animate-pulse">
                ⚡ SIMPLE & FAST
              </div>
              <h2 className="section-title mt-4">
                Book Your Ride in{" "}
                <span className="gradient-text">3 Easy Steps</span>
              </h2>
              <p className="section-subtitle mx-auto mt-4">
                Experience hassle-free cab booking with our streamlined process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              {/* <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0">
                <div className="absolute left-1/3 right-1/3 h-full bg-primary"></div>
              </div> */}

              {STEPS.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Step Number Circle */}
                  <div className="relative z-10">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
                          <div className="text-4xl font-black text-black">
                            {item.step}
                          </div>
                        </div>
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 bg-primary rounded-2xl opacity-0 group-hover:opacity-20 animate-ping"></div>
                      </div>

                      {/* Step Content */}
                      <div className="mt-6 premium-card text-center group-hover:-translate-y-2 transition-all duration-300">
                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Arrow Indicator (Desktop) */}
                      {i < STEPS.length - 1 && (
                        <div className="hidden md:block absolute top-12 -right-6 text-3xl text-primary/50 group-hover:text-primary transition-colors">
                          →
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Route Calculator with Slider */}
        <LazyServiceFareCalculator
          vehicle={vehicle}
          pricePerKm={vehicleDetails.pricePerKm}
        />

        {/* Service Coverage */}
        <section className="py-12 bg-white/95 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto">SERVICE AREAS</div>
              <h2 className="section-title">
                Available Across Major Indian Cities
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {CITIES.map((city) => (
                <div key={city.name} className="premium-card text-center">
                  <h3 className="font-bold text-lg">{city.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {city.services.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Comparison - Modern UI with React Icons */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaCar className="text-primary text-sm" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  COMPARE VEHICLES
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Choose Your <span className="gradient-text">Perfect Ride</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Compare our fleet and find the perfect vehicle for your journey
              </p>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {[
                {
                  name: "Hatchback",
                  price: "8.5",
                  capacity: "4",
                  luggage: "2-3",
                  ac: true,
                  wifi: false,
                  charging: true,
                  bestFor: "Budget Travel",
                  popular: false,
                  icon: <FaCar />,
                },
                {
                  name: "Sedan",
                  price: "9",
                  capacity: "4",
                  luggage: "3-4",
                  ac: true,
                  wifi: true,
                  charging: true,
                  bestFor: "Corporate & Family",
                  popular: true,
                  icon: <FaCarSide />,
                },
                {
                  name: "Innova",
                  price: "16",
                  capacity: "6-7",
                  luggage: "5-6",
                  ac: true,
                  wifi: true,
                  charging: true,
                  bestFor: "Luxury Travel",
                  popular: false,
                  icon: <FaCaravan />,
                },
                {
                  name: "Tempo Traveller",
                  price: "20",
                  capacity: "9-12",
                  luggage: "10-12",
                  ac: true,
                  wifi: true,
                  charging: true,
                  bestFor: "Group Tours",
                  popular: false,
                  icon: <FaBus />,
                },
              ].map((vehicle, idx) => (
                <div
                  key={idx}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg border ${vehicle.popular ? "border-primary shadow-xl" : "border-gray-100"}`}
                >
                  {vehicle.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-black px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-xs" />
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${vehicle.popular ? "bg-gradient-to-r from-primary to-secondary text-white" : "bg-primary/10 text-primary"}`}
                    >
                      {vehicle.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{vehicle.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-primary">
                          ₹{vehicle.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /km
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaUsers className="text-primary text-xs" /> Capacity
                      </span>
                      <span className="font-semibold">
                        {vehicle.capacity} Persons
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaSuitcase className="text-primary text-xs" /> Luggage
                      </span>
                      <span className="font-semibold">
                        {vehicle.luggage} Bags
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaMicrochip className="text-primary text-xs" />{" "}
                        Features
                      </span>
                      <div className="flex gap-2">
                        {vehicle.ac && (
                          <FaSnowflake
                            className="text-blue-500 text-sm"
                            title="AC"
                          />
                        )}
                        {vehicle.wifi && (
                          <FaWifi
                            className="text-green-500 text-sm"
                            title="WiFi"
                          />
                        )}
                        {vehicle.charging && (
                          <FaBatteryFull
                            className="text-yellow-500 text-sm"
                            title="Charging Ports"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <FaMedal className="text-primary text-xs" /> Best For
                      </span>
                      <span
                        className={`text-sm font-bold ${vehicle.popular ? "text-primary" : ""}`}
                      >
                        {vehicle.bestFor}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View - PERFECT THEAD ALIGNMENT */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                    <th className="p-5 text-left text-white font-bold text-base w-48 rounded-tl-2xl">
                      <div className="flex items-center gap-2">
                        <FaList className="text-primary text-lg" />
                        <span>Features</span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaCar className="text-xl" />
                          <span>Hatchback</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Economy
                        </span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base relative">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaCarSide className="text-xl" />
                          <span>Sedan</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Popular Choice
                        </span>
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 whitespace-nowrap shadow-md z-10">
                        <FaStar className="text-xs text-yellow-700" /> Most
                        Popular
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaCaravan className="text-xl" />
                          <span>Innova</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Luxury
                        </span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-white font-bold text-base rounded-tr-2xl">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center justify-center gap-2">
                          <FaBus className="text-xl" />
                          <span>Tempo Traveller</span>
                        </div>
                        <span className="text-xs text-gray-300 font-normal">
                          Group
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Price per km */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        Price per km
                      </div>
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700">
                      ₹9
                    </td>
                    <td className="p-5 text-center bg-primary/5 font-extrabold text-primary text-lg">
                      ₹11
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700">
                      ₹17
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700">
                      ₹20
                    </td>
                  </tr>

                  {/* Capacity */}
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-gray-100 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-primary" />
                        Capacity
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaUser className="text-gray-500 text-sm" /> 4 Persons
                      </div>
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <div className="flex items-center justify-center gap-1">
                        <FaUser className="text-primary text-sm" /> 4 Persons
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaUser className="text-gray-500 text-sm" /> 6-7 Persons
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaUsers className="text-gray-500 text-sm" /> 9-12
                        Persons
                      </div>
                    </td>
                  </tr>

                  {/* Luggage Capacity */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <FaSuitcase className="text-primary" />
                        Luggage Capacity
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaSuitcase className="text-gray-400 text-xs" /> 2-3
                        Bags
                      </div>
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <div className="flex items-center justify-center gap-1 font-semibold">
                        <FaSuitcase className="text-primary text-xs" /> 3-4 Bags
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaSuitcase className="text-gray-400 text-xs" /> 5-6
                        Bags
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaSuitcase className="text-gray-400 text-xs" /> 10-12
                        Bags
                      </div>
                    </td>
                  </tr>

                  {/* AC */}
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-gray-100 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaSnowflake className="text-primary" />
                        Air Conditioning
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                  </tr>

                  {/* WiFi */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <FaWifi className="text-primary" />
                        WiFi Connectivity
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <FaTimesCircle className="text-red-400 inline text-xl" />
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                  </tr>

                  {/* Charging Ports */}
                  <tr className="border-b border-gray-100 bg-gray-50/30 hover:bg-gray-100 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaBatteryFull className="text-primary" />
                        USB / Charging Ports
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center bg-primary/5">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                    <td className="p-5 text-center">
                      <FaCheckCircle className="text-green-500 inline text-xl" />
                    </td>
                  </tr>

                  {/* Best For */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800 bg-gray-50/50 rounded-bl-2xl">
                      <div className="flex items-center gap-2">
                        <FaMedal className="text-primary" />
                        Best For
                      </div>
                    </td>
                    <td className="p-5 text-center text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <FaWallet className="text-gray-500 text-sm" /> Budget
                        Travel
                      </div>
                    </td>
                    <td className="p-5 text-center bg-primary/5 font-bold text-primary text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <FaBriefcase className="text-primary text-sm" />{" "}
                        Corporate & Family
                      </div>
                    </td>
                    <td className="p-5 text-center text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <FaGem className="text-gray-500 text-sm" /> Luxury
                        Travel
                      </div>
                    </td>
                    <td className="p-5 text-center text-sm rounded-br-2xl">
                      <div className="flex items-center justify-center gap-1">
                        <FaUsers className="text-gray-500 text-sm" /> Group
                        Tours
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation Note */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-slate-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <FaRegLightbulb className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Not sure which vehicle to choose?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Our experts can help you find the perfect ride for your
                      needs
                    </p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition shadow-md">
                  Get Expert Advice
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us vs Competitors - Modern UI with React Icons */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  WHY WE'RE BETTER
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Chiku Cabs <span className="gradient-text">vs</span> Others
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See why thousands of customers choose us over traditional cab
                services
              </p>
            </div>

            {/* Comparison Cards - Mobile Friendly */}
            <div className="lg:hidden space-y-4">
              {COMPARISON_FEATURES.map((row, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                >
                  <div className="font-bold text-lg mb-4 pb-2 border-b border-gray-100">
                    {row.feature}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <FaCarSide className="text-primary text-sm" />
                        </div>
                        <span className="font-semibold">Chiku Cabs</span>
                      </div>
                      <div className="text-green-600 font-medium">
                        {row.chiku}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaCarSide className="text-gray-500 text-sm" />
                        </div>
                        <span className="font-semibold text-gray-500">
                          Others
                        </span>
                      </div>
                      <div className="text-red-500 font-medium">
                        {row.other}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="p-6 text-left bg-gray-900 rounded-tl-2xl text-white font-bold text-lg">
                      Features
                    </th>
                    <th className="p-6 text-center bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-lg">
                      <div className="flex items-center justify-center gap-2 text-[#BE1E23]">
                        <FaCarSide className="text-xl" />
                        Chiku Cabs
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                          Winner
                        </span>
                      </div>
                    </th>
                    <th className="p-6 text-center bg-gray-800 rounded-tr-2xl text-white font-bold text-lg">
                      Other Services
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((row, i) => {
                    // Icon mapping for features
                    const getFeatureIcon = (feature: string) => {
                      switch (feature) {
                        case "Professional Drivers":
                          return <FaUserTie className="text-primary text-lg" />;
                        case "Transparent Pricing":
                          return <FaWallet className="text-primary text-lg" />;
                        case "24/7 Customer Support":
                          return <FaHeadset className="text-primary text-lg" />;
                        case "Easy Cancellation":
                          return <FaSyncAlt className="text-primary text-lg" />;
                        case "GPS Tracking":
                          return (
                            <FaMapMarkerAlt className="text-primary text-lg" />
                          );
                        case "Clean & Sanitized":
                          return (
                            <FaSprayCan className="text-primary text-lg" />
                          );
                        default:
                          return (
                            <FaCheckCircle className="text-primary text-lg" />
                          );
                      }
                    };

                    return (
                      <tr
                        key={i}
                        className={`transition-all duration-300 hover:shadow-lg ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="p-5 font-bold text-gray-800 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            {getFeatureIcon(row.feature)}
                            <span>{row.feature}</span>
                          </div>
                        </td>
                        <td className="p-5 text-center border-b border-gray-100 bg-primary/5">
                          <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                            <span className="text-green-600 font-bold">
                              {row.chiku}
                            </span>
                            <FaCheckCircle className="text-green-600 text-sm" />
                          </div>
                        </td>
                        <td className="p-5 text-center border-b border-gray-100">
                          <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
                            <FaTimesCircle className="text-red-500 text-sm" />
                            <span className="text-red-500 font-medium">
                              {row.other}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full flex-wrap justify-center">
                <div className="flex text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="fill-current" />
                  ))}
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <span className="font-bold text-primary">
                  Trusted by 50,000+ Customers
                </span>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <FaChartLine className="text-green-500" /> 4.2/5 Rating
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid - Modern UI with React Icons */}
        <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-primary/5 border-b border-slate-300">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <FaShieldAlt className="text-primary text-sm" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  WHY CHIKU CABS
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Why We're India's{" "}
                <span className="gradient-text">Most Trusted</span> Cab Service
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with our premium features and
                customer-first approach
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon with Animation */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <span className="text-white text-2xl">
                        {feature.icon}
                      </span>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.desc}
                  </p>

                  {/* Hover Underline Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border-2 border-white"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Join <span className="text-primary font-bold">50,000+</span>{" "}
                  happy customers
                </span>
                <FaArrowRight className="text-primary text-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-bold text-sm uppercase">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                What Our Customers Say
              </h2>
              <div className="flex justify-center items-center gap-2 mt-4">
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                <span className="font-bold">4.2</span>
                <span className="text-gray-600">(1,250+ reviews)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                        {review.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="text-yellow-400 text-sm">
                          {review.rating}
                        </div>
                      </div>
                    </div>
                    <span className="text-green-600 text-sm">✓ Verified</span>
                  </div>
                  <p className="text-gray-600 mb-4">"{review.text}"</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{review.location || "India"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="section-badge mx-auto inline-flex">FAQ</div>
              <h2 className="section-title">
                Frequently Asked Questions About {vehicle} Rental
              </h2>
              <p className="text-muted-foreground mt-4">
                Everything you need to know before booking your {vehicle}
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="faq-item group">
                  <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none hover:bg-muted/50 transition-colors rounded-lg">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180 text-primary">
                      ▼
                    </span>
                  </summary>
                  <div className="pl-12 pt-4 pb-2">
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
              `⭐ Top Rated ${currentYear}`,
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
                📞 Call {PHONE_NUMBER}
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi Chiku Cabs, I am interested in booking a cab through your website. Please help me with the booking.",
                )}`}
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
    </>
  );
}
