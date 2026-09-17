export const PHONE_NUMBER = "+919818022327";
export const PHONE_DISPLAY = "9818022327";
export const WHATSAPP_NUMBER = "916280820037";

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Chiku Cabs, I’m interested in booking a cab through your website. Please share the available options and booking details."
);

export const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const STATS = [
  { num: "800+", label: "Monthly Group Trips" },
  { num: "₹2M+", label: "Group Savings" },
  { num: "4.9/5", label: "Google Rating" },
  { num: "Verified", label: "Local Drivers" },
];

export const SERVICES = [
  {
    name: "Outstation Cabs",
    desc: "One-way & round-trip across India",
    href: "/outstation-cabs",
    color: "#f59e0b",
    iconName: "navigation", // Highway / long-distance navigation
  },
  {
    name: "One Way Cabs",
    desc: "Pay only for one side, save 50%",
    href: "/one-way-cabs",
    color: "#3b82f6",
    iconName: "arrow-right-circle", // Point-to-point one-way
  },
  {
    name: "Airport Taxi",
    desc: "On-time pickups & drop-offs",
    href: "/airport-taxi",
    color: "#8b5cf6",
    iconName: "plane", // Direct airport transit
  },
  {
    name: "Local Hire",
    desc: "Hourly packages for city travel",
    href: "/local-sightseeing-taxi",
    color: "#10b981",
    iconName: "map-pin", // Local city drops & sightseeing
  },
  {
    name: "Tempo Traveller",
    desc: "12–20 seater for group trips",
    href: "/tempo-traveller-on-rent",
    color: "#ef4444",
    iconName: "users", // Group seating
  },
  {
    name: "Car Rental",
    desc: "Self-drive & chauffeur options",
    href: "/car-rental",
    color: "#06b6d4",
    iconName: "car", // Standard car rental
  },
  {
    name: "Bus on Rent",
    desc: "20–50 seater for large groups",
    href: "/bus-on-rent",
    color: "#ec4899",
    iconName: "bus", // Large passenger bus
  },
  {
    name: "Innova Crysta",
    desc: "Luxury ride for premium comfort",
    href: "/innova-car-rental",
    color: "#f97316",
    iconName: "sparkles", // Premium luxury experience
  },
];

export interface FleetCar {
  name: string;
  category: "Sedan" | "SUV";
  price: string;
  unit: string;
  capacity: string;
  tag: string;
  image: string;
}

export const FLEET: FleetCar[] = [
  // Sedans
  {
    name: "Dzire",
    category: "Sedan",
    price: "₹9",
    unit: "/km",
    capacity: "4+1 Seater",
    tag: "BUDGET FRIENDLY",
    image: "/home/dzire.png",
  },
  {
    name: "Etios",
    category: "Sedan",
    price: "₹9",
    unit: "/km",
    capacity: "4+1 Seater",
    tag: "COMFORT RIDE",
    image: "/home/etios.png",
  },
  {
    name: "Amaze",
    category: "Sedan",
    price: "₹9",
    unit: "/km",
    capacity: "4+1 Seater",
    tag: "SMOOTH DRIVE",
    image: "/home/amaze.png",
  },

  // SUVs
  {
    name: "Ertiga",
    category: "SUV",
    price: "₹12",
    unit: "/km",
    capacity: "6+1 Seater",
    tag: "FAMILY FAVORITE",
    image: "/home/ertiga.png",
  },
  
  {
    name: "Innova Crysta",
    category: "SUV",
    price: "₹15",
    unit: "/km",
    capacity: "7+1 Seater",
    tag: "MOST POPULAR",
    image: "/home/innova.png",
  },
 
];


export const REASONS = [
  { title: "Verified Chauffeurs", desc: "Every driver undergoes police verification, background checks, and professional training. Your safety is non-negotiable." },
  { title: "Transparent Pricing", desc: "What you see is what you pay. No hidden charges, no surge pricing, no surprise tolls at the end." },
  { title: "Live GPS Tracking", desc: "Track your ride in real-time. Share trip status with family for complete peace of mind." },
  { title: "24/7 Availability", desc: "Book anytime, travel anytime. Our support team is available round the clock, even on holidays." },
  { title: "Free Cancellation", desc: "Plans changed? Cancel up to 24 hours before the trip at zero charges. Full flexibility guaranteed." },
  { title: "Premium Fleet", desc: "Newer models only. Dual AC, clean interiors, spacious boot. Every ride feels like a luxury experience." },
];

export interface TestimonialItem {
  name: string;
  rating: number; 
  text: string;
  route: string;
  date: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Rajesh Khanna",
    rating: 4,
    text: "Booked a Delhi to Shimla cab for a family trip. The Innova was spotless, driver was professional, and reached exactly on time. Will use again!",
    route: "Delhi → Shimla",
    date: "Travelled 3 days ago",
  },
  {
    name: "Meera Joshi",
    rating: 5,
    text: "Used Chiku Cabs for a one-way trip from Varanasi to Lucknow. Saved 50% compared to other services. Transparent pricing, no surprises at the end.",
    route: "Varanasi → Lucknow",
    date: "Travelled 1 week ago",
  },
  {
    name: "Aman Tiwari",
    rating: 4.5,
    text: "Our go-to cab service for all corporate travel. Punctual drivers, clean cars, and the 24/7 support team is incredibly responsive. Highly recommended!",
    route: "Corporate Client",
    date: "Travelled 2 weeks ago",
  },
];

export const FAQS = [
  { q: "How do I book a cab with Chiku Cabs?", a: `Booking is simple! Call us at ${PHONE_DISPLAY} or send a WhatsApp message with your travel details (pickup, destination, date). You'll get an instant quote and confirmation. No app download needed.` },
  { q: "What cities do you operate in?", a: "We operate across 100+ cities in India including Delhi, Varanasi, Lucknow, Jaipur, Shimla, Manali, Chennai, Bangalore, Mumbai, Chandigarh, and many more. We serve 1200+ outstation routes." },
  { q: "Are there any hidden charges?", a: "Absolutely not. Our pricing includes base fare, driver allowance, fuel, GST, night charges, and state permit fees. The only extras are toll taxes (as per actual) and parking fees — which we inform you about upfront." },
  { q: "Can I book a one-way cab?", a: "Yes! We offer one-way cab services that can save you up to 50% compared to traditional round-trip bookings. Available on all major routes across India." },
  { q: "What payment methods do you accept?", a: "We accept Cash, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Corporate billing. You can pay at the end of the trip or prepay online." },
];

export interface RouteCardItem {
  title: string;
  image: string;
  href: string;
  buttonVariant?: "red" | "yellow";
}

export const POPULAR_ROUTE_CARDS: RouteCardItem[] = [
  {
    title: "Delhi - Shimla",
    image: "/cities/shimla.jpg",
    href: "/delhi/tempo-traveller-hire-delhi-to-shimla",
    buttonVariant: "red", 
  },{
    title: "Delhi → Dharamshala",
    image: "/cities/dharamshala.webp",
    href: "/delhi/tempo-traveller-hire-delhi-to-dharmsala",
    buttonVariant: "red", 
  },
  {
    title: "Varanasi → Lucknow",
    image: "/cities/lucknow.jpg",
    href: "/varanasi/varanasi-to-lucknow-cab",
    buttonVariant: "red", 
  }, {
    title: "Varanasi → Allahabad",
    image: "/cities/allahabad1.webp",
    href: "/varanasi/varanasi-to-allahabad-cab",
    buttonVariant: "red", 
  }, {
    title: "Delhi → Kedarnath",
    image: "/cities/kedarnath.jpg",
    href: "/delhi/tempo-traveller-hire-delhi-to-kedarnath",
    buttonVariant: "red", 
  },
  {
    title: "Delhi → Rishikesh",
    image: "/cities/rishikesh.jpg",
    href: "/delhi/tempo-traveller-hire-delhi-to-triveni-ghat-rishikesh",
    buttonVariant: "yellow",
  },
  {
    title: "Delhi → Jibhi",
    image: "/cities/jibhi.jpg",
    href: "/delhi/tempo-traveller-hire-delhi-to-jibhi",
    buttonVariant: "yellow",
  },
  {
    title: "Delhi → Manali",
    image: "/cities/manali.jpg",
    href: "/delhi/tempo-traveller-hire-delhi-to-mcleodganj",
    buttonVariant: "red", 
  },
  {
    title: "Delhi → Bir Billing",
    image: "/cities/bir-billing.jpg",
    href: "/delhi/tempo-traveller-hire-delhi-to-bir-billing",
    buttonVariant: "yellow",
  },
];

// @/data/route.ts

export interface RouteItem {
  from: string;
  to: string;
}

// Example data — match with whatever you currently have
export const ROUTES: RouteItem[] = [
  { from: "New Delhi", to: "Shimla" },
  { from: "New Delhi", to: "Manali" },
  { from: "New Delhi", to: "Chandigarh" },
  { from: "New Delhi", to: "Agra" },
  { from: "New Delhi", to: "Dehradun" },
  { from: "Varanasi", to: "Lucknow" },
  { from: "Varanasi", to: "Allahabad" },
  { from: "Lucknow", to: "Kanpur" },
  { from: "Bangalore", to: "Mysore" },
  { from: "Mumbai", to: "Pune" },
];

// Unique list of all available cities
export const CITIES: string[] = Array.from(
  new Set(ROUTES.flatMap((r) => [r.from, r.to]))
).sort();