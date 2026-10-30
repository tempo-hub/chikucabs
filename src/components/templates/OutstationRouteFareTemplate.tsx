"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaCarSide,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRoute,
  FaShieldAlt,
  FaStar,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { ParsedRouteData } from "@/lib/urlParser";
import { cityCabRoutes } from "@/data/cityCabRoutes";
import { POPULAR_ROUTES as airportCabRoutes } from "@/data/airportRoutes";

import EEATSection from "@/components/shared/EEATSection";
import InternalLinks from "@/components/shared/InternalLinks";
import RouteMapSection from "../shared/RouteMapSection";


// ============================================================
// CONSTANTS
// ============================================================

const PHONE_NUMBER = "+918448445504";
const DISPLAY_PHONE = "8448445504";
const WHATSAPP_NUMBER = "916280820037";
const SITE_NAME = "Chiku Cabs";
const SITE_URL = "https://chikucabs.com";

const DRIVER_ALLOWANCE = 500;

const DEFAULT_DISTANCE = 250;
const DEFAULT_TRAVEL_SPEED = 55;


// ============================================================
// TYPES
// ============================================================

interface VehicleDetails {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  pricePerKm: number;
  seats: number;
  luggage: number;
  description: string;
  category: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface BookingFormData {
  pickup: string;
  drop: string;
  date: string;
  time: string;
  returnDate: string;
  vehicle: string;
}


// ============================================================
// VEHICLE DATA
// Keep this centralized so pricing/content stays consistent.
// Ideally, replace this with your existing vehicles.ts later.
// ============================================================

const VEHICLES: VehicleDetails[] = [
  {
    slug: "dzire",
    name: "Maruti Suzuki Dzire",
    shortName: "Dzire",
    image: "/suzuki-dzire.png",
    pricePerKm: 9,
    seats: 4,
    luggage: 2,
    description:
      "Comfortable and economical sedan for small families, couples and business travel.",
    category: "Sedan",
  },
  {
    slug: "amaze",
    name: "Honda Amaze",
    shortName: "Amaze",
    image: "/honda-amaze.png",
    pricePerKm: 9,
    seats: 4,
    luggage: 3,
    description:
      "Spacious sedan with comfortable seating and luggage capacity for outstation journeys.",
    category: "Sedan",
  },
  {
    slug: "ertiga",
    name: "Maruti Ertiga",
    shortName: "Ertiga",
    image: "/maruti-ertiga.png",
    pricePerKm: 13,
    seats: 7,
    luggage: 3,
    description:
      "7-seater MPV suitable for families and groups travelling together.",
    category: "MUV",
  },
  {
    slug: "innova-crysta",
    name: "Toyota Innova Crysta",
    shortName: "Innova Crysta",
    image: "/innova-crysta.png",
    pricePerKm: 16,
    seats: 7,
    luggage: 4,
    description:
      "Premium 7-seater vehicle designed for comfortable long-distance travel.",
    category: "Premium SUV",
  },
  {
    slug: "tempo",
    name: "Tempo Traveller",
    shortName: "Tempo Traveller",
    image: "/tempo_traveller.png",
    pricePerKm: 20,
    seats: 12,
    luggage: 8,
    description:
      "Spacious group vehicle suitable for family trips, pilgrimages and group travel.",
    category: "Tempo Traveller",
  },
];


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}


function generateRouteSlug(origin: string, destination: string) {
  return `${slugify(origin)}-to-${slugify(destination)}-cab`;
}


function formatCurrency(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}


function calculateFare(distanceKm: number, pricePerKm: number = 9) {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    return 0;
  }

  const rate = Number.isFinite(pricePerKm) && pricePerKm > 0 ? pricePerKm : 9;

  return Math.round(distanceKm * 1.5 * rate + DRIVER_ALLOWANCE);
}


function calculateTravelHours(distanceKm: number) {
  if (!distanceKm || distanceKm <= 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(distanceKm / DEFAULT_TRAVEL_SPEED));
}


function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}


// ============================================================
// COMPONENT
// ============================================================

export default function OutstationRouteFareTemplate({
  parsedData,
}: {
  parsedData: ParsedRouteData;
}) {
  const startCity = parsedData.origin || "Origin";
  const endCity = parsedData.destination || "Destination";
  const vehicleFromUrl = parsedData.vehicle || "";

  // ----------------------------------------------------------
  // ROUTE DATA
  // ----------------------------------------------------------

  const routeInfo = useMemo(() => {
    const normalizedStart = startCity.toLowerCase().trim();
    const normalizedEnd = endCity.toLowerCase().trim();

    const cityRoute = Object.values(cityCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase().trim() === normalizedStart &&
          route.to.toLowerCase().trim() === normalizedEnd,
      );

    if (cityRoute) {
      return cityRoute;
    }

    const airportRoute = Object.values(airportCabRoutes)
      .flat()
      .find(
        (route) =>
          route.from.toLowerCase().trim() === normalizedStart &&
          route.to.toLowerCase().trim() === normalizedEnd,
      );

    return airportRoute;
  }, [startCity, endCity]);


  const distance = Number(routeInfo?.distance || DEFAULT_DISTANCE);

  const estimatedHours = calculateTravelHours(distance);

  const isVaranasi = useMemo(() => {
    const s = startCity.toLowerCase();
    return s.includes("varanasi") || s.includes("kashi") || s.includes("banaras");
  }, [startCity]);

  const isGaya = useMemo(() => {
    const e = endCity.toLowerCase();
    return e.includes("gaya");
  }, [endCity]);

  const isBodhGaya = useMemo(() => {
    const e = endCity.toLowerCase();
    return e.includes("bodh gaya") || e.includes("bodhgaya");
  }, [endCity]);


  // ----------------------------------------------------------
  // VEHICLE
  // ----------------------------------------------------------

  const getVehicleFromValue = useCallback(
    (value: string | null | undefined): VehicleDetails => {
      const normalized = (value || "").toLowerCase();

      if (
        normalized.includes("tempo") ||
        normalized.includes("traveller") ||
        normalized.includes("12-seater") ||
        normalized.includes("13-seater") ||
        normalized.includes("20-seater") ||
        normalized.includes("21-seater") ||
        normalized.includes("24-seater") ||
        normalized.includes("26-seater")
      ) {
        return VEHICLES.find((v) => v.slug === "tempo") || VEHICLES[0];
      }

      if (normalized.includes("innova")) {
        return VEHICLES.find((v) => v.slug === "innova-crysta") || VEHICLES[0];
      }

      if (normalized.includes("ertiga") || normalized.includes("suv")) {
        return VEHICLES.find((v) => v.slug === "ertiga") || VEHICLES[0];
      }

      if (normalized.includes("amaze")) {
        return VEHICLES.find((v) => v.slug === "amaze") || VEHICLES[0];
      }

      return VEHICLES.find((v) => v.slug === "dzire") || VEHICLES[0];
    },
    [],
  );


  const pageVehicle = useMemo(
    () => getVehicleFromValue(vehicleFromUrl),
    [vehicleFromUrl, getVehicleFromValue],
  );


  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------

  const [isScrolled, setIsScrolled] = useState(false);

  const [tripType, setTripType] = useState<"one-way" | "round-trip">(
    "one-way",
  );

  const [selectedVehicle, setSelectedVehicle] = useState(
    pageVehicle.slug,
  );

  const [formData, setFormData] = useState<BookingFormData>({
    pickup: startCity,
    drop: endCity,
    date: "",
    time: "",
    returnDate: "",
    vehicle: pageVehicle.slug,
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);


  // ----------------------------------------------------------
  // SELECTED VEHICLE
  // ----------------------------------------------------------

  const selectedVehicleDetails = useMemo(() => {
    return (
      VEHICLES.find((vehicle) => vehicle.slug === selectedVehicle) ||
      pageVehicle
    );
  }, [selectedVehicle, pageVehicle]);


  // ----------------------------------------------------------
  // SEO
  // ----------------------------------------------------------

  const routeSlug = generateRouteSlug(startCity, endCity);

  const canonicalUrl = `${SITE_URL}/route/${routeSlug}`;

  const pageTitle = vehicleFromUrl
    ? `${startCity} to ${endCity} ${pageVehicle.shortName} Fare | Chiku Cabs`
    : `${startCity} to ${endCity} Cab Fare | Chiku Cabs`;


  const metaDescription = vehicleFromUrl
    ? `Check ${startCity} to ${endCity} ${pageVehicle.shortName} fare, distance, travel time and booking options. Compare one-way and round-trip taxi services with Chiku Cabs.`
    : `Check ${startCity} to ${endCity} cab fare, distance, travel time and available vehicles. Book one-way or round-trip taxi service with Chiku Cabs.`;


  const keywords = [
    `${startCity} to ${endCity} cab`,
    `${startCity} to ${endCity} taxi`,
    `${startCity} to ${endCity} cab fare`,
    `${startCity} to ${endCity} taxi fare`,
    `${startCity} to ${endCity} one way cab`,
    `${startCity} to ${endCity} round trip taxi`,
    `${startCity} to ${endCity} outstation cab`,
    `${startCity} to ${endCity} ${selectedVehicleDetails.shortName}`,
  ].join(", ");


  // ----------------------------------------------------------
  // FAQ
  // ----------------------------------------------------------

  const faqs: FAQ[] = useMemo(
    () => [
      {
        q: `What is the ${startCity} to ${endCity} cab fare for one-way and round-trip?`,
        a: `The ${startCity} to ${endCity} one-way cab fare starts from ${formatCurrency(
          calculateFare(distance, 9),
        )} for an executive AC Sedan (Dzire / Amaze at ₹9/km). Spacious 6-seater SUVs (Maruti Ertiga) start from ${formatCurrency(
          calculateFare(distance, 13),
        )} (₹13/km), premium 7-seater Toyota Innova Crysta starts from ${formatCurrency(
          calculateFare(distance, 16),
        )} (₹16/km), and 9–12 seater Tempo Travellers start from ${formatCurrency(
          calculateFare(distance, 28),
        )} (₹28/km). Round-trip bookings enjoy up to 10% discount on the total return mileage.`,
      },
      {
        q: `What is the exact road distance and driving time from ${startCity} to ${endCity}?`,
        a: `The road distance between ${startCity} and ${endCity} is approximately ${distance} km via the primary national highway corridor. Under normal driving conditions with standard bio-breaks and dining pauses, the journey takes around ${estimatedHours} hours. Exact travel duration can vary slightly depending on city exit traffic, highway toll plaza queues, and weather conditions.`,
      },
      {
        q: `Can I book a dedicated one-way taxi from ${startCity} to ${endCity} without paying return charges?`,
        a: `Yes, 100%. Chiku Cabs guarantees dedicated point-to-point one-way taxi booking on the ${startCity} to ${endCity} route. You only pay for the one-way distance of ${distance} km from your doorstep pickup point to your destination drop address. You are never billed for the driver's return trip or empty return mileage.`,
      },
      {
        q: `Are highway toll taxes, state border permits, and GST included in the fare?`,
        a: `Base quotes transparently cover vehicle hire, fuel expenses, driver allowance (batta), and applicable 5% GST. Highway toll charges across toll plazas on the route are billed at actuals via electronic Fastag receipts. If traveling across state borders, commercial road entry permits and parking fees (if any) are payable at actuals with zero hidden surcharges.`,
      },
      {
        q: `Which car is best recommended for travel from ${startCity} to ${endCity}?`,
        a: `For solo travelers or couples with 1–2 bags, an AC Sedan (Maruti Suzuki Dzire or Honda Amaze) is the most economical and comfortable. For families with children or up to 4 luggage bags, the 6-seater Maruti Ertiga offers ample legroom. For long highway journeys, elderly passengers, or groups prioritizing luxury, the 7-seater Toyota Innova Crysta is ideal. For groups of 9 to 12 passengers, our Force Tempo Traveller mini coach is best suited.`,
      },
      {
        q: `Does Chiku Cabs provide doorstep pickup in ${startCity} and drop across ${endCity}?`,
        a: `Yes. We provide 100% doorstep pickup from any residential colony, hotel, railway station, or airport in ${startCity}, and drop you directly at your specific hotel, residence, temple, or office address in ${endCity} with zero hidden local pick-up or drop surcharges.`,
      },
      {
        q: `Can we stop for meals, tea, and washrooms along the ${startCity} to ${endCity} route?`,
        a: `Yes, definitely. Our professional chauffeurs are familiar with the ${startCity} to ${endCity} highway corridor and gladly pause at clean family highway restaurants, sanitized washroom facilities, and tea stalls at your convenience with zero waiting charge during transit.`,
      },
      {
        q: `What is the cancellation and refund policy for a ${startCity} to ${endCity} taxi booking?`,
        a: `Chiku Cabs offers a 100% risk-free cancellation policy. You can cancel your ${startCity} to ${endCity} cab booking up to 24 hours prior to the scheduled pickup time for a full 100% refund with zero cancellation penalty. Refunds are processed back to your original payment mode within 24–48 hours.`,
      },
      {
        q: `Is 24×7 and late-night cab booking available from ${startCity} to ${endCity}?`,
        a: `Yes. Chiku Cabs operates 24 hours a day, 7 days a week. You can book an early morning or late-night cab from ${startCity} to ${endCity}. A standard night driving allowance (₹250) applies only if the journey is actively underway between 10:00 PM and 6:00 AM.`,
      },
      {
        q: `Can I book an Innova Crysta or Tempo Traveller from ${startCity} to ${endCity}?`,
        a: `Yes. Toyota Innova Crysta (6+1 and 7+1 configurations) and Force Tempo Travellers (9, 12, 16, and 20 seaters) can be reserved easily for the ${startCity} to ${endCity} route. These vehicles come equipped with pushback captain seats, strong dual AC, ample luggage boot space, and certified highway drivers.`,
      },
      {
        q: `How do I book a cab from ${startCity} to ${endCity} and what payment options are accepted?`,
        a: `Booking takes less than 2 minutes online via our booking form, or directly via WhatsApp (+91-628-082-0037) and phone (+91-${DISPLAY_PHONE}). We accept UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and cash or digital balance payment to the chauffeur upon arrival.`,
      },
      {
        q: `How does Chiku Cabs ensure passenger safety for families, elders, and women travelers?`,
        a: `All vehicles on the ${startCity} to ${endCity} route are GPS-enabled with real-time tracking monitored by our 24×7 operations support. Our chauffeurs undergo rigorous background checks, police verification, and highway safety training. Clean, sanitized cabs with working AC, seatbelts, and luggage carriers ensure a secure and peaceful road journey.`,
      },
    ],
    [
      startCity,
      endCity,
      distance,
      estimatedHours,
      DISPLAY_PHONE,
    ],
  );


  // ----------------------------------------------------------
  // STRUCTURED DATA
  // ----------------------------------------------------------

  const structuredData = useMemo(() => {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${startCity} to ${endCity} Cab Service`,
      description: metaDescription,
      serviceType: "Outstation Cab Service",
      provider: {
        "@type": "LocalBusiness",
        name: SITE_NAME,
        telephone: PHONE_NUMBER,
        url: SITE_URL,
      },
      areaServed: [
        {
          "@type": "City",
          name: startCity,
        },
        {
          "@type": "City",
          name: endCity,
        },
      ],
      offers: VEHICLES.map((vehicle) => ({
        "@type": "Offer",
        priceCurrency: "INR",
        price: vehicle.pricePerKm,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: vehicle.pricePerKm,
          priceCurrency: "INR",
          unitCode: "KMT",
          unitText: "km",
        },
        itemOffered: {
          "@type": "Service",
          name: `${startCity} to ${endCity} ${vehicle.name}`,
        },
      })),
    };


    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Outstation Cabs",
          item: `${SITE_URL}/outstation-cabs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${startCity} to ${endCity} Cab`,
          item: canonicalUrl,
        },
      ],
    };


    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    };


    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        serviceSchema,
        breadcrumbSchema,
        faqSchema,
      ],
    });
  }, [
    startCity,
    endCity,
    metaDescription,
    canonicalUrl,
    faqs,
  ]);


  // ----------------------------------------------------------
  // SCROLL
  // ----------------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // ----------------------------------------------------------
  // ESTIMATE
  // ----------------------------------------------------------

  const updateEstimate = useCallback(
    (vehicleSlug = selectedVehicle) => {
      const vehicle =
        VEHICLES.find((item) => item.slug === vehicleSlug) ||
        pageVehicle;

      const totalDistance =
        tripType === "round-trip" ? distance * 2 : distance;

      const finalFare = calculateFare(
        totalDistance,
        vehicle.pricePerKm,
      );

      setEstimatedPrice(finalFare);
    },
    [
      distance,
      pageVehicle,
      selectedVehicle,
      tripType,
    ],
  );


  useEffect(() => {
    updateEstimate(selectedVehicle);
  }, [selectedVehicle, updateEstimate]);


  // ----------------------------------------------------------
  // VEHICLE CHANGE
  // ----------------------------------------------------------

  const handleVehicleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    setSelectedVehicle(value);

    setFormData((previous) => ({
      ...previous,
      vehicle: value,
    }));

    updateEstimate(value);
  };


  // ----------------------------------------------------------
  // BOOKING
  // ----------------------------------------------------------

  const handleBooking = (
    vehicle?: VehicleDetails,
  ) => {
    const selected = vehicle || selectedVehicleDetails;

    const message = `🚖 *Cab Booking Request*

📍 *Route:* ${startCity} → ${endCity}
🚘 *Vehicle:* ${selected.name}
💰 *Rate:* ₹${selected.pricePerKm}/km
📏 *Approx Distance:* ${distance} km
🛣️ *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"
      }

Please share the final fare and availability.`;


    window.open(
      buildWhatsAppUrl(message),
      "_blank",
      "noopener,noreferrer",
    );
  };


  const handleGetEstimate = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !formData.pickup.trim() ||
      !formData.drop.trim() ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("Please fill pickup, drop, date and time.");
      return;
    }


    if (
      tripType === "round-trip" &&
      !formData.returnDate
    ) {
      toast.error("Please select return date.");
      return;
    }


    if (
      tripType === "round-trip" &&
      formData.returnDate < formData.date
    ) {
      toast.error("Return date cannot be before travel date.");
      return;
    }


    const message = `🚖 *Fare Estimate Request*

📍 *Pickup:* ${formData.pickup}
🎯 *Drop:* ${formData.drop}

🛣️ *Route:* ${startCity} → ${endCity}

📅 *Travel Date:* ${formData.date}
⏰ *Travel Time:* ${formData.time}

🔄 *Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"
      }

${tripType === "round-trip"
        ? `🔄 *Return Date:* ${formData.returnDate}\n`
        : ""
      }

🚘 *Vehicle:* ${selectedVehicleDetails.name}

💰 *Estimated Fare:* ${estimatedPrice
        ? formatCurrency(estimatedPrice)
        : "Please quote"
      }

Please confirm the final fare and availability.`;


    window.open(
      buildWhatsAppUrl(message),
      "_blank",
      "noopener,noreferrer",
    );
  };


  // ----------------------------------------------------------
  // MIN DATE
  // ----------------------------------------------------------

  const today = new Date().toISOString().split("T")[0];


  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <>
      <Head>

        {/* =====================================================
            PRIMARY SEO
        ====================================================== */}

        <title>{pageTitle}</title>

        <meta
          name="description"
          content={metaDescription}
        />

        <meta
          name="keywords"
          content={keywords}
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        <meta
          name="author"
          content={SITE_NAME}
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />


        {/* =====================================================
            OPEN GRAPH
        ====================================================== */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={metaDescription}
        />

        <meta
          property="og:url"
          content={canonicalUrl}
        />

        <meta
          property="og:site_name"
          content={SITE_NAME}
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          property="og:image"
          content={`${SITE_URL}${pageVehicle.image}`}
        />


        {/* =====================================================
            TWITTER
        ====================================================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={metaDescription}
        />

        <meta
          name="twitter:image"
          content={`${SITE_URL}${pageVehicle.image}`}
        />


        {/* =====================================================
            STRUCTURED DATA
        ====================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData,
          }}
        />

      </Head>


      <main className="min-h-screen bg-background">

        {/* =====================================================
            TOP ACCENT
        ====================================================== */}

        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary)), transparent, hsl(var(--primary)))",
          }}
        />


        {/* =====================================================
            STICKY MOBILE / DESKTOP CTA
        ====================================================== */}

        <div
          className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
            }`}
        >
          <div className="bg-gray-950 text-white border-t border-white/10 shadow-2xl">

            <div className="max-w-7xl mx-auto px-4 py-3">

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

                <div className="text-sm text-center sm:text-left">

                  <span className="font-bold">
                    {startCity} → {endCity}
                  </span>

                  <span className="mx-2 text-gray-500">
                    •
                  </span>

                  <span>
                    From{" "}
                    <strong className="text-primary">
                      {formatCurrency(
                        calculateFare(
                          distance,
                          selectedVehicleDetails.pricePerKm,
                        ),
                      )}
                    </strong>
                  </span>

                </div>


                <div className="flex items-center gap-2 w-full sm:w-auto">

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-bold transition hover:opacity-90"
                    aria-label={`Call Chiku Cabs at ${DISPLAY_PHONE}`}
                  >
                    <FaPhoneAlt />
                    Call
                  </a>


                  <a
                    href={buildWhatsAppUrl(
                      `Hi Chiku Cabs, I want to book a cab from ${startCity} to ${endCity}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 font-bold text-white transition hover:opacity-90"
                    aria-label="Contact Chiku Cabs on WhatsApp"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </a>

                </div>

              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative isolate overflow-hidden min-h-[650px] flex items-center">

          <div className="absolute inset-0 -z-20">

            <Image
              src="/outstation.webp"
              alt={`${pageVehicle.name} for ${startCity} to ${endCity} outstation taxi service by Chiku Cabs`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

          </div>


          <div className="absolute inset-0 -z-10 bg-black/50" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />


          <div className="relative max-w-7xl mx-auto w-full px-4 py-16">

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">


              {/* HERO CONTENT */}

              <div className="text-white">

                <div className="flex flex-wrap items-center gap-3 mb-6">

                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/10">

                    <IoLocationSharp className="text-primary" />

                    <span className="text-sm font-medium">
                      {startCity}
                    </span>

                    <FaArrowRight className="text-xs opacity-60" />

                    <FaMapMarkerAlt className="text-primary" />

                    <span className="text-sm font-medium">
                      {endCity}
                    </span>

                  </div>


                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 border border-white/10">

                    <FaRoute className="text-primary" />

                    <span className="text-sm">
                      {distance} km approx.
                    </span>

                  </div>

                </div>


                <div className="inline-flex items-center gap-2 mb-5 text-sm font-semibold text-yellow-300">

                  <FaStar />

                  Outstation Cab Booking

                </div>

                {/* Rating */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6 ml-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm">4.9 Rating • 1250+ Reviews</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {startCity} to {endCity}{" "}
                  <span className="block text-primary mt-1">Cab Fare & Booking</span>
                </h1>

                <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed mt-4 mb-4">
                  Book your outstation taxi from <strong>{startCity}</strong> to{" "}
                  <strong>{endCity}</strong> starting at just ₹9/km. Use the online booking form to claim
                  an extra ₹500 off on one-way and round-trip rides.
                </p>


                {/* QUICK FACTS */}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">

                  <div className="rounded-xl bg-white/10 border border-white/10 backdrop-blur p-4">

                    <FaRoute className="text-primary mb-2" />

                    <div className="text-xs text-white/60">
                      Distance
                    </div>

                    <div className="font-bold">
                      {distance} km
                    </div>

                  </div>


                  <div className="rounded-xl bg-white/10 border border-white/10 backdrop-blur p-4">

                    <FaClock className="text-primary mb-2" />

                    <div className="text-xs text-white/60">
                      Travel Time
                    </div>

                    <div className="font-bold">
                      {estimatedHours}+ hrs
                    </div>

                  </div>


                  <div className="rounded-xl bg-white/10 border border-white/10 backdrop-blur p-4">

                    <FaCarSide className="text-primary mb-2" />

                    <div className="text-xs text-white/60">
                      Vehicles
                    </div>

                    <div className="font-bold">
                      {VEHICLES.length} Options
                    </div>

                  </div>


                  <div className="rounded-xl bg-white/10 border border-white/10 backdrop-blur p-4">

                    <FaShieldAlt className="text-primary mb-2" />

                    <div className="text-xs text-white/60">
                      Support
                    </div>

                    <div className="font-bold">
                      24×7
                    </div>

                  </div>

                </div>


                {/* HERO CTA */}

                <div className="flex flex-col sm:flex-row gap-3">

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 font-bold text-lg shadow-lg transition hover:-translate-y-0.5 hover:opacity-95"
                  >

                    <FaPhoneAlt />

                    Book by Call

                  </a>


                  <a
                    href={buildWhatsAppUrl(
                      `Hi Chiku Cabs, I need a cab from ${startCity} to ${endCity}. Please share the available vehicles and fare.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-4 font-bold text-lg text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95"
                  >

                    <FaWhatsapp />

                    Get Fare on WhatsApp

                  </a>

                </div>

              </div>


              {/* BOOKING CARD */}

              <div className="rounded-3xl bg-white p-5 sm:p-7 shadow-2xl">

                <div className="mb-6">

                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Quick Booking
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black mt-3 text-gray-900">
                    Get {startCity} to {endCity} Cab Fare
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Enter your trip details and request the final fare on
                    WhatsApp.
                  </p>

                </div>


                <form
                  onSubmit={handleGetEstimate}
                  className="space-y-4"
                >

                  {/* PICKUP */}

                  <div>

                    <label
                      htmlFor="pickup"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Pickup Location
                    </label>

                    <div className="relative">

                      <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl" />

                      <input
                        id="pickup"
                        type="text"
                        value={formData.pickup}
                        onChange={(event) =>
                          setFormData((previous) => ({
                            ...previous,
                            pickup: event.target.value,
                          }))
                        }
                        placeholder={`Enter pickup in ${startCity}`}
                        required
                        autoComplete="street-address"
                        className="h-10  w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>


                  {/* DROP */}

                  <div>

                    <label
                      htmlFor="drop"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Drop Location
                    </label>

                    <div className="relative">

                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />

                      <input
                        id="drop"
                        type="text"
                        value={formData.drop}
                        onChange={(event) =>
                          setFormData((previous) => ({
                            ...previous,
                            drop: event.target.value,
                          }))
                        }
                        placeholder={`Enter drop in ${endCity}`}
                        required
                        className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>


                  {/* TRIP TYPE */}

                  <div>

                    <span className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Trip Type
                    </span>

                    <div className="grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() => setTripType("one-way")}
                        className={`rounded-xl py-3 font-bold transition ${tripType === "one-way"
                            ? "bg-primary text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        One Way
                      </button>


                      <button
                        type="button"
                        onClick={() => setTripType("round-trip")}
                        className={`rounded-xl py-3 font-bold transition ${tripType === "round-trip"
                            ? "bg-primary text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        Round Trip
                      </button>

                    </div>

                  </div>


                  {/* DATE TIME */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <div>

                      <label
                        htmlFor="travel-date"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Travel Date
                      </label>

                      <input
                        id="travel-date"
                        type="date"
                        min={today}
                        value={formData.date}
                        onChange={(event) =>
                          setFormData((previous) => ({
                            ...previous,
                            date: event.target.value,
                          }))
                        }
                        required
                        className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />

                    </div>


                    <div>

                      <label
                        htmlFor="travel-time"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Pickup Time
                      </label>

                      <input
                        id="travel-time"
                        type="time"
                        value={formData.time}
                        onChange={(event) =>
                          setFormData((previous) => ({
                            ...previous,
                            time: event.target.value,
                          }))
                        }
                        required
                        className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />

                    </div>

                  </div>


                  {/* RETURN DATE */}

                  {tripType === "round-trip" && (
                    <div>

                      <label
                        htmlFor="return-date"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Return Date
                      </label>

                      <input
                        id="return-date"
                        type="date"
                        min={formData.date || today}
                        value={formData.returnDate}
                        onChange={(event) =>
                          setFormData((previous) => ({
                            ...previous,
                            returnDate: event.target.value,
                          }))
                        }
                        required
                        className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />

                    </div>
                  )}


                  {/* VEHICLE */}

                  <div>

                    <label
                      htmlFor="vehicle"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Vehicle
                    </label>

                    <select
                      id="vehicle"
                      value={selectedVehicle}
                      onChange={handleVehicleChange}
                      className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    >

                      {VEHICLES.map((vehicle) => (
                        <option
                          key={vehicle.slug}
                          value={vehicle.slug}
                        >
                          {vehicle.name} — ₹
                          {vehicle.pricePerKm}/km
                        </option>
                      ))}

                    </select>

                  </div>


                  {/* ESTIMATE */}

                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-sm font-semibold text-gray-600">
                          Estimated{" "}
                          {tripType === "round-trip"
                            ? "Round-Trip"
                            : "One-Way"}{" "}
                          Fare
                        </p>

                        <p className="mt-1 text-3xl font-black text-primary">

                          {estimatedPrice
                            ? formatCurrency(estimatedPrice)
                            : "—"}

                        </p>

                      </div>


                      <div className="text-right">

                        <p className="text-xs text-gray-500">
                          {selectedVehicleDetails.shortName}
                        </p>

                        <p className="font-bold text-gray-800">
                          ₹{selectedVehicleDetails.pricePerKm}/km
                        </p>

                      </div>

                    </div>


                    {/* <p className="mt-3 text-xs leading-relaxed text-gray-500">
                      Estimated fare is based on approximately {distance} km
                      and the displayed vehicle rate. {tripType === "round-trip"
    ? " Round-trip fare is calculated for both onward and return journeys."
    : " One-way fare is calculated for the onward journey."}
  {" "}Toll, parking or
                      applicable route charges should be confirmed before
                      booking.
                    </p> */}

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-4 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Get Final Fare on WhatsApp
                  </button>


                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">

                    <span>
                      <FaCheckCircle className="inline mr-1 text-green-500" />
                      Quick response
                    </span>

                    <span>
                      <FaCheckCircle className="inline mr-1 text-green-500" />
                      Vehicle options
                    </span>

                    <span>
                      <FaCheckCircle className="inline mr-1 text-green-500" />
                      Fare confirmation
                    </span>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            BREADCRUMB / PAGE INTRO
        ====================================================== */}

        <section className="border-b bg-white">

          <div className="max-w-7xl mx-auto px-4 py-5">

            <nav
              aria-label="Breadcrumb"
              className="text-sm text-gray-500"
            >

              <a
                href="/"
                className="hover:text-primary"
              >
                Home
              </a>

              <span className="mx-2">
                /
              </span>

              <a
                href="/outstation-cabs"
                className="hover:text-primary"
              >
                Outstation Cabs
              </a>

              <span className="mx-2">
                /
              </span>

              <span className="text-gray-800 font-medium">
                {startCity} to {endCity}
              </span>

            </nav>

          </div>

        </section>


        {/* =====================================================
            ROUTE SUMMARY
        ====================================================== */}

        <section className="py-14 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-10">

              <span className="section-badge">
                ROUTE OVERVIEW
              </span>

              <h2 className="section-title mt-3">
                {startCity} to {endCity} Cab at a Glance
              </h2>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                Plan your journey with route distance, estimated travel time,
                starting vehicle rates and available taxi options.
              </p>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="premium-card">

                <FaRoute className="text-3xl text-primary mb-4" />

                <p className="text-sm text-muted-foreground">
                  Approximate Distance
                </p>

                <p className="text-2xl font-black mt-1">
                  {distance} km
                </p>

              </div>


              <div className="premium-card">

                <FaClock className="text-3xl text-primary mb-4" />

                <p className="text-sm text-muted-foreground">
                  Estimated Travel Time
                </p>

                <p className="text-2xl font-black mt-1">
                  {estimatedHours}+ Hours
                </p>

              </div>


              <div className="premium-card">

                <FaCarSide className="text-3xl text-primary mb-4" />

                <p className="text-sm text-muted-foreground">
                  Available Vehicles
                </p>

                <p className="text-2xl font-black mt-1">
                  {VEHICLES.length} Types
                </p>

              </div>


              <div className="premium-card">

                <FaPhoneAlt className="text-3xl text-primary mb-4" />

                <p className="text-sm text-muted-foreground">
                  Booking
                </p>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="block text-xl font-black mt-1 hover:text-primary"
                >
                  {DISPLAY_PHONE}
                </a>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            VEHICLE FARE TABLE
        ====================================================== */}

        <section className="py-16 px-4 bg-muted/30 border-y">

          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                CAB FARE
              </span>

              <h2 className="section-title mt-3">
                {startCity} to {endCity} Taxi Fare by Vehicle
              </h2>

              <p className="mt-4 text-muted-foreground">
                Compare available vehicle types, seating capacity and
                estimated one-way fares for this route.
              </p>

            </div>


            <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

              <table className="w-full min-w-[720px] border-collapse">

                <thead className="">

                  <tr className="border-b bg-gray-50 text-left">

                    <th className="px-5 py-4 font-bold min-w-[180px]  ">
                      Vehicle
                    </th>

                    <th className="px-5 py-4 font-bold ">
                      Category
                    </th>

                    <th className="px-5 py-4 font-bold">
                      Seats
                    </th>

                    <th className="px-5 py-4 font-bold">
                      Rate
                    </th>

                    <th className="px-5 py-4 font-bold">
                      Estimated Fare*
                    </th>

                    <th className="px-5 py-4 font-bold">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {VEHICLES.map((vehicle) => {

                    const fare = calculateFare(
                      distance,
                      vehicle.pricePerKm,
                    );

                    return (
                      <tr
                        key={vehicle.slug}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-4">

                            <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-gray-100">

                              <Image
                                src={vehicle.image}
                                alt={`${vehicle.name} for ${startCity} to ${endCity}`}
                                fill
                                sizes="96px"
                                className="object-cover"
                              />

                            </div>

                            <div>

                              <p className="font-bold">
                                {vehicle.name}
                              </p>

                              <p className="text-xs text-gray-500">
                                {vehicle.luggage} luggage approx.
                              </p>

                            </div>

                          </div>

                        </td>


                        <td className="px-5 py-5 text-gray-600">
                          {vehicle.category}
                        </td>


                        <td className="px-5 py-5">
                          {vehicle.seats}
                        </td>


                        <td className="px-5 py-5 font-bold">
                          ₹{vehicle.pricePerKm}/km
                        </td>


                        <td className="px-5 py-5 font-black text-primary">
                          {formatCurrency(fare)}
                        </td>


                        <td className="px-5 py-5">

                          <button
                            type="button"
                            onClick={() => handleBooking(vehicle)}
                            className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:opacity-90"
                          >
                            Book
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>


            <p className="mt-4 text-xs text-muted-foreground">
              *Estimated fare uses the approximate route distance and displayed
              per-kilometre rate plus the current driver allowance used by this
              calculator. Final pricing should be confirmed at booking.
              Toll, parking and applicable route charges may vary.
            </p>

          </div>

        </section>

        {/* =====================================================
            NEW SECTION 1: CAB VS TRAIN VS BUS COMPARISON TABLE
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Smart Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Outstation Cab vs. Train vs. Public Bus: {startCity} to {endCity}
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Why taking a private outstation cab is the most convenient, flexible, and comfortable choice for families, elders, and travelers with luggage.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Feature</th>
                    <th className="px-5 py-3.5 text-primary">Chiku Cabs (Private Outstation Cab)</th>
                    <th className="px-5 py-3.5 text-slate-600">Train (IRCTC)</th>
                    <th className="px-5 py-3.5 text-slate-600">Public / Sleeper Bus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Door-to-Door Pickup</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Doorstep Pickup & Drop in {startCity} & {endCity}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Reach station via auto/cab</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Must reach bus depot / bypass</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Departure Flexibility</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Depart 24×7 at your exact convenient time
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed timetable / waitlists</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Fixed evening schedules</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Senior Citizen Friendly</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Direct gate drop at hotels, temples & homes
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Overbridge stairs & crowded platforms</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ High steps & jerky motion</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Luggage Handling</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ Dedicated boot trunk & safe carrier space
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Heavy lifting across platforms & coolie charges</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Limited & insecure luggage hold</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 font-bold text-slate-900">Travel Privacy</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-semibold bg-emerald-50/40">
                      ✔ 100% Private sanitized AC car with family
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Crowded shared coach</td>
                    <td className="px-5 py-3.5 text-slate-600">❌ Shared cabin with strangers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 2: HIGHWAY TRANSIT & EN-ROUTE REST STOPS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Highway Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                {startCity} to {endCity} Route Distance & Travel Details
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Key highway transit milestones, road conditions, and recommended rest stops for your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Total Highway Distance</div>
                <div className="text-3xl font-black text-slate-900 mt-1">{distance} KM</div>
                <p className="text-xs text-slate-600 mt-2">
                  Optimal driving route mapped via national and state express corridors.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Average Travel Time</div>
                <div className="text-3xl font-black text-slate-900 mt-1">~{estimatedHours}+ Hours</div>
                <p className="text-xs text-slate-600 mt-2">
                  Smooth 4-to-6 lane highway cruising with comfortable bio-breaks and dining pauses.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-semibold uppercase">Primary Corridor</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {isVaranasi && (isGaya || isBodhGaya) ? "NH-19 (Grand Trunk Road)" : "National Highway Corridor"}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {isVaranasi && (isGaya || isBodhGaya)
                    ? "Well-paved multi-lane highway via Mohania, Sasaram, and Aurangabad."
                    : "Comfortable toll highway with ample family dhabas, petrol bunks, and clean washrooms."}
                </p>
              </div>
            </div>

            {/* Contextual Highway En-route Highlights */}
            {isVaranasi && (isGaya || isBodhGaya) && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <FaRoute className="text-primary" /> Key Highway Stops between Varanasi & Gaya
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Karmanasa UP-Bihar Border</span>
                    Chauffeur handles all commercial vehicle tax permits smoothly with zero passenger hassle.
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Sasaram (Sher Shah Suri Tomb)</span>
                    Popular heritage stop on the GT Road for sightseeing and traditional Indian lunch breaks.
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Aurangabad Dhabas</span>
                    Hygienic vegetarian family restaurants with separate washrooms and tea stalls.
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 3: POPULAR PICKUP & DROP POINTS
        ====================================================== */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Extensive Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Popular Pickup & Drop Points
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                Direct doorstep pickup across all residential colonies, railway junctions, and
                airports in {startCity} with drop anywhere in {endCity}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pickup in Origin */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <IoLocationSharp className="text-primary text-xl" /> Top Pickup Hubs in {startCity}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {isVaranasi ? (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Varanasi Cantt Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Banaras (Manduadih) Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Pt. Deen Dayal Upadhyaya (DDU)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> LBS International Airport (Babatpur)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Godowlia & Dashashwamedh Ghat
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Assi Ghat & Lanka (BHU)
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Main Central Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> City Domestic / Int'l Airport
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Central Interstate Bus Terminal
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> City Center & Major Hotels
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gated Residential Townships
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Highway Toll & Bypass Junctions
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Drop in Destination */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> Top Drop Locations in {endCity}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {isGaya ? (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Vishnupad Mandir Gate
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Phalgu River & Devghat
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gaya Junction Railway Station
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Akshay Vat & Mangla Gauri Mandir
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Gaya Airport (GAY)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Bodh Gaya Monastery & Mahabodhi Temple
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {endCity} Main Railway Terminal
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> {endCity} Airport Terminal
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Prominent City Hotels & Resorts
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Commercial Hubs & Markets
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Pilgrimage Shrines & Temples
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-primary" /> Doorstep Residential Drop
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION 4: INCLUSIONS, EXCLUSIONS & BOOKING TERMS
        ====================================================== */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                100% Transparent
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-900">
                Fare Inclusions, Exclusions & Rental Terms
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl mx-auto">
                No surprises at the end of your trip. Here is our full fare transparency policy for {startCity} to {endCity}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-600" /> What is Included in Your Fare
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Base Vehicle Hire:</strong> Clean AC Sedan, SUV, or Tempo Traveller for the full journey.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Fuel & Maintenance:</strong> All petrol/diesel costs are covered in the quoted fare.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Driver Allowance:</strong> Daily driver fee & food allowance are completely included.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Doorstep Pickup & Drop:</strong> No surcharge for picking up from home, hotel, or station in {startCity}.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Applicable GST:</strong> Goods and Services Tax included with official invoice.</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions & Terms */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-primary" /> Exclusions & Operational Terms
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Highway Toll Taxes:</strong> Payable at actual Fastag booths en route.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Inter-State Passenger Taxes:</strong> Border road tax entry permits payable at actuals if crossing state lines.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Airport Parking / Entry:</strong> Terminal parking fee applicable only if airport pickup is requested.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Free Cancellation:</strong> 100% refund on cancellations requested at least 24 hours prior to pickup.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>24×7 Human Support:</strong> Immediate re-dispatch assistance available via phone and WhatsApp.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT JOURNEY
        ====================================================== */}

        <section className="py-20 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">

              <div>

                <span className="section-badge">
                  ROUTE GUIDE
                </span>

                <h2 className="section-title mt-4">
                  About the {startCity} to {endCity} Cab Journey
                </h2>

              </div>


              <div className="space-y-5 text-muted-foreground leading-8 text-lg">

                <p>
                  Travelling from{" "}
                  <strong className="text-foreground">
                    {startCity}
                  </strong>{" "}
                  to{" "}
                  <strong className="text-foreground">
                    {endCity}
                  </strong>{" "}
                  by cab provides a direct option for passengers who prefer
                  door-to-door travel instead of changing between different
                  modes of transport.
                </p>


                <p>
                  The approximate road distance for this route is{" "}
                  <strong className="text-foreground">
                    {distance} km
                  </strong>
                  , while the estimated driving time is around{" "}
                  <strong className="text-foreground">
                    {estimatedHours}+ hours
                  </strong>
                  . Actual journey time can change depending on traffic,
                  weather, road conditions, breaks and the exact pickup and
                  destination points.
                </p>


                <p>
                  Chiku Cabs provides multiple vehicle choices for this route,
                  including sedans, 7-seater vehicles, premium cars and group
                  travel options. Choose a vehicle according to the number of
                  passengers, luggage and comfort requirements.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            SERVICES
        ====================================================== */}

        <section className="py-20 px-4 bg-muted/30">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                TAXI SERVICES
              </span>

              <h2 className="section-title mt-3">
                Taxi Services from {startCity} to {endCity}
              </h2>

              <p className="mt-4 text-muted-foreground">
                Select the type of trip or vehicle that matches your travel
                requirements.
              </p>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {[
                {
                  title: `${startCity} to ${endCity} One Way Cab`,
                  text: "A direct taxi option for passengers travelling to the destination without requiring a return journey.",
                  icon: "🚕",
                },
                {
                  title: `${startCity} to ${endCity} Round Trip Taxi`,
                  text: "Suitable when you need the same vehicle for your onward and return journey.",
                  icon: "🔄",
                },
                {
                  title: `${startCity} to ${endCity} Sedan`,
                  text: "Dzire and Amaze options for smaller groups and everyday outstation travel.",
                  icon: "🚘",
                },
                {
                  title: `${startCity} to ${endCity} Ertiga`,
                  text: "A 7-seater option for families and passengers travelling with additional luggage.",
                  icon: "🚙",
                },
                {
                  title: `${startCity} to ${endCity} Innova Crysta`,
                  text: "A premium 7-seater option for passengers looking for additional comfort.",
                  icon: "✨",
                },
                {
                  title: `${startCity} to ${endCity} Tempo Traveller`,
                  text: "A group travel option for larger families, pilgrimages and group journeys.",
                  icon: "🚐",
                },
              ].map((service) => (

                <div
                  key={service.title}
                  className="premium-card hover:-translate-y-1 transition-transform"
                >

                  <div className="text-4xl mb-5">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {service.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            DISTANCE / TIME
        ====================================================== */}

        <section className="py-20 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                DISTANCE & TIME
              </span>

              <h2 className="section-title mt-3">
                {startCity} to {endCity} Distance & Travel Time
              </h2>

            </div>


            <div className="grid md:grid-cols-2 gap-6">

              <div className="premium-card">

                <FaRoute className="text-4xl text-primary mb-5" />

                <h3 className="text-2xl font-bold mb-3">
                  Road Distance
                </h3>

                <p className="text-4xl font-black text-primary">
                  {distance} km
                </p>

                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The displayed distance is an approximate road distance for
                  the {startCity} to {endCity} route. Your actual trip distance
                  can vary based on the exact pickup and drop locations.
                </p>

              </div>


              <div className="premium-card">

                <FaClock className="text-4xl text-primary mb-5" />

                <h3 className="text-2xl font-bold mb-3">
                  Estimated Journey Time
                </h3>

                <p className="text-4xl font-black text-primary">
                  {estimatedHours}+ hrs
                </p>

                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Travel time is an estimate based on the route distance.
                  Traffic, weather, road conditions, breaks and city traffic
                  can increase the actual journey duration.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TRAVEL TIPS
        ====================================================== */}

        <section className="py-20 px-4 bg-muted/30 border-y">

          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-12">

              <span className="section-badge">
                JOURNEY PLANNER
              </span>

              <h2 className="section-title mt-3">
                Travel Tips for {startCity} to {endCity}
              </h2>

            </div>


            <div className="grid md:grid-cols-2 gap-6">

              <div className="premium-card">

                <div className="text-3xl mb-4">
                  🌅
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Plan Your Departure
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Choose your departure time according to your pickup location,
                  expected traffic and planned arrival time. Allow additional
                  time for breaks during longer journeys.
                </p>

              </div>


              <div className="premium-card">

                <div className="text-3xl mb-4">
                  🛣️
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Check Route Conditions
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Traffic and road conditions can change throughout the day.
                  Your driver may use the most suitable available route based
                  on current conditions.
                </p>

              </div>


              <div className="premium-card">

                <div className="text-3xl mb-4">
                  🧳
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Choose the Right Vehicle
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Consider passenger count and luggage before selecting a
                  vehicle. Ertiga and Innova Crysta can provide additional
                  passenger space compared with standard sedans.
                </p>

              </div>


              <div className="premium-card">

                <div className="text-3xl mb-4">
                  📱
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Keep Booking Details Handy
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Keep your pickup address, destination, travel date and
                  driver's contact details available before starting your
                  journey.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TOLL & ADDITIONAL CHARGES
        ====================================================== */}

        <section className="py-20 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                FARE INFORMATION
              </span>

              <h2 className="section-title mt-3">
                Toll & Additional Charges for {startCity} to {endCity}
              </h2>

              <p className="mt-4 text-muted-foreground">
                Understand which route-related charges may affect the final
                booking amount.
              </p>

            </div>


            <div className="grid md:grid-cols-3 gap-6">

              <div className="premium-card">

                <div className="text-4xl mb-4">
                  🛣️
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Toll Charges
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Toll charges depend on the route and toll plazas used during
                  the journey. Confirm whether toll is included in your final
                  quote.
                </p>

              </div>


              <div className="premium-card">

                <div className="text-4xl mb-4">
                  🅿️
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Parking Charges
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Parking charges can apply at airports, stations, hotels,
                  tourist locations or other restricted parking areas.
                </p>

              </div>


              <div className="premium-card">

                <div className="text-4xl mb-4">
                  📋
                </div>

                <h3 className="text-xl font-bold mb-3">
                  Route Taxes
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  State entry taxes or other applicable route charges may vary
                  depending on the destination and trip requirements.
                </p>

              </div>

            </div>


            <div className="mt-8 rounded-2xl border bg-muted/30 p-6">

              <p className="text-muted-foreground leading-relaxed">

                <strong className="text-foreground">
                  Fare note:
                </strong>{" "}
                The fare displayed on this page is an estimate based on the
                available route distance and selected vehicle rate. Confirm
                toll, parking and any applicable additional charges with Chiku
                Cabs before completing your booking.

              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            DRIVER / SERVICE EXPERIENCE
        ====================================================== */}

        <section className="py-20 px-4 bg-muted/30">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                CAB SERVICE
              </span>

              <h2 className="section-title mt-3">
                What to Expect on Your {startCity} to {endCity} Cab Trip
              </h2>

              <p className="mt-4 text-muted-foreground">
                Important service details to consider before your outstation
                journey.
              </p>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="premium-card text-center">

                <FaUserTie className="mx-auto text-4xl text-primary mb-5" />

                <h3 className="font-bold text-lg mb-2">
                  Driver Information
                </h3>

                <p className="text-sm text-muted-foreground">
                  Driver and vehicle details can be confirmed before the trip.
                </p>

              </div>


              <div className="premium-card text-center">

                <FaCarSide className="mx-auto text-4xl text-primary mb-5" />

                <h3 className="font-bold text-lg mb-2">
                  Vehicle Choice
                </h3>

                <p className="text-sm text-muted-foreground">
                  Select a vehicle based on passenger count and luggage.
                </p>

              </div>


              <div className="premium-card text-center">

                <FaRoute className="mx-auto text-4xl text-primary mb-5" />

                <h3 className="font-bold text-lg mb-2">
                  Route Planning
                </h3>

                <p className="text-sm text-muted-foreground">
                  Travel time can vary with traffic and road conditions.
                </p>

              </div>


              <div className="premium-card text-center">

                <FaPhoneAlt className="mx-auto text-4xl text-primary mb-5" />

                <h3 className="font-bold text-lg mb-2">
                  Booking Support
                </h3>

                <p className="text-sm text-muted-foreground">
                  Contact the booking team to confirm availability and final
                  fare.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            ROUTE MAP
        ====================================================== */}

        <RouteMapSection
          startCity={startCity}
          endCity={endCity}
          distance={distance}
          estimatedHours={estimatedHours}
        />


        {/* =====================================================
            ONE WAY CAB
        ====================================================== */}

        <section className="py-20 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div>

                <span className="section-badge">
                  ONE WAY TAXI
                </span>

                <h2 className="section-title mt-4">
                  {startCity} to {endCity} One Way Cab
                </h2>

                <p className="mt-5 text-lg text-muted-foreground leading-8">
                  Need to travel only from {startCity} to {endCity}? A one-way
                  cab can be a convenient option when you do not require the
                  same vehicle for your return journey.
                </p>

                <p className="mt-4 text-lg text-muted-foreground leading-8">
                  Choose your preferred vehicle, provide your pickup and drop
                  details and contact Chiku Cabs for the final fare and
                  availability.
                </p>


                <div className="mt-7 flex flex-wrap gap-3">

                  {[
                    "Door-to-door travel",
                    "Multiple vehicle options",
                    "Advance booking",
                    "WhatsApp booking",
                  ].map((item) => (

                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                    >

                      <FaCheckCircle />

                      {item}

                    </span>

                  ))}

                </div>

              </div>


              <div className="premium-card">

                <h3 className="text-2xl font-black mb-6">
                  Book Your One Way Cab
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between border-b pb-4">

                    <span className="text-muted-foreground">
                      Route
                    </span>

                    <strong>
                      {startCity} → {endCity}
                    </strong>

                  </div>


                  <div className="flex justify-between border-b pb-4">

                    <span className="text-muted-foreground">
                      Distance
                    </span>

                    <strong>
                      {distance} km
                    </strong>

                  </div>


                  <div className="flex justify-between border-b pb-4">

                    <span className="text-muted-foreground">
                      Starting vehicle rate
                    </span>

                    <strong>
                      ₹{Math.min(
                        ...VEHICLES.map(
                          (vehicle) => vehicle.pricePerKm,
                        ),
                      )}
                      /km
                    </strong>

                  </div>


                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white"
                  >

                    <FaPhoneAlt />

                    Call {DISPLAY_PHONE}

                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            BOOKING PROCESS
        ====================================================== */}

        <section className="py-20 px-4 bg-muted/30 border-y">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                HOW TO BOOK
              </span>

              <h2 className="section-title mt-3">
                How to Book a Cab from {startCity} to {endCity}
              </h2>

            </div>


            <div className="grid md:grid-cols-4 gap-6">

              {[
                {
                  number: "01",
                  icon: "📍",
                  title: "Share Trip Details",
                  text: "Provide your pickup, destination, date and preferred travel time.",
                },
                {
                  number: "02",
                  icon: "🚘",
                  title: "Choose Vehicle",
                  text: "Select a sedan, Ertiga, Innova Crysta or Tempo Traveller according to your group.",
                },
                {
                  number: "03",
                  icon: "💬",
                  title: "Confirm Fare",
                  text: "Contact the booking team through call or WhatsApp and confirm the final fare.",
                },
                {
                  number: "04",
                  icon: "✅",
                  title: "Start Journey",
                  text: "Complete your booking and receive the trip and vehicle details.",
                },
              ].map((step) => (

                <div
                  key={step.number}
                  className="premium-card text-center"
                >

                  <div className="text-sm font-black text-primary mb-3">
                    STEP {step.number}
                  </div>

                  <div className="text-4xl mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            WHY CHIKU CABS
        ====================================================== */}

        <section className="py-20 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-12">

              <span className="section-badge">
                WHY CHOOSE US
              </span>

              <h2 className="section-title mt-3">
                Why Book Your {startCity} to {endCity} Cab With Chiku Cabs?
              </h2>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  icon: "🚘",
                  title: "Multiple Vehicles",
                  text: "Choose from sedans, 7-seaters, premium cars and group travel vehicles.",
                },
                {
                  icon: "💰",
                  title: "Fare Information",
                  text: "View vehicle rates and an estimated fare before requesting your final quote.",
                },
                {
                  icon: "📱",
                  title: "Easy Booking",
                  text: "Request your cab fare through the website, phone or WhatsApp.",
                },
                {
                  icon: "🧳",
                  title: "Flexible Travel",
                  text: "Choose one-way or round-trip service according to your travel plan.",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="premium-card"
                >

                  <div className="text-4xl mb-5">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-muted/30 border-y">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className="section-badge mx-auto"
                style={{ display: "inline-flex" }}
              >
                REVIEWS
              </div>

              <h2 className="section-title">
                Travelers Love Our Transparent Pricing
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sanjay Kumar",
                  text: "The fare was exactly what was quoted. No extra charges, no surprises at the end. Very transparent service. Highly recommended!",
                  rating: "★★★★★",
                },
                {
                  name: "Neha Singh",
                  text: "Compared rates with Ola, Uber, and local operators. Chiku Cabs was the most affordable for our one-way trip. Great value for money.",
                  rating: "★★★★★",
                },
                {
                  name: "Vikram Patel",
                  text: "I was skeptical about the low fare, but the service quality was top-notch. Clean car, professional driver, and no hidden costs.",
                  rating: "★★★★★",
                },
              ].map((review, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-stars">{review.rating}</div>

                  <p className="testimonial-text">
                    "{review.text}"
                  </p>

                  <div className="testimonial-author">
                    {review.name}
                  </div>

                  <div className="testimonial-route">
                    {startCity} → {endCity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* =====================================================
            FAQ
        ====================================================== */}

        <section className="py-20 px-4 bg-muted/30 border-y">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">

              <span className="section-badge">
                FAQ
              </span>

              <h2 className="section-title mt-3">
                Frequently Asked Questions About {startCity} to {endCity}
              </h2>

              <p className="mt-4 text-muted-foreground">
                Find answers about cab fares, distance, vehicles, tolls and
                booking.
              </p>

            </div>


            <div className="space-y-3">

              {faqs.map((faq, index) => (

                <details
                  key={faq.q}
                  className="group overflow-hidden rounded-xl border bg-white"
                >

                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-gray-900">

                    <span>
                      {index + 1}. {faq.q}
                    </span>

                    <span className="text-primary transition-transform group-open:rotate-180">
                      ▼
                    </span>

                  </summary>


                  <div className="border-t px-5 py-5 leading-7 text-muted-foreground">

                    {faq.a}

                  </div>

                </details>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            RELATED LINKS
        ====================================================== */}

        <section className="py-20 px-4">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-10">

              <span className="section-badge">
                EXPLORE MORE
              </span>

              <h2 className="section-title mt-3">
                More Cab Services
              </h2>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <a
                href="/outstation-cabs"
                className="rounded-xl border bg-white p-5 font-bold transition hover:border-primary hover:text-primary"
              >
                Outstation Cabs
              </a>


              <a
                href="/tempo-traveller-on-rent"
                className="rounded-xl border bg-white p-5 font-bold transition hover:border-primary hover:text-primary"
              >
                Tempo Traveller
              </a>


              <a
                href="/hire-innova-crysta-on-rent"
                className="rounded-xl border bg-white p-5 font-bold transition hover:border-primary hover:text-primary"
              >
                Innova Crysta
              </a>


              <a
                href="/airport-taxi"
                className="rounded-xl border bg-white p-5 font-bold transition hover:border-primary hover:text-primary"
              >
                Airport Taxi
              </a>

            </div>

          </div>

        </section>


        {/* =====================================================
            INTERNAL LINKS
        ====================================================== */}

        <div className="max-w-7xl mx-auto px-4 pb-10">

          <InternalLinks
            parsedData={parsedData}
          />

        </div>


        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="px-4 py-20">

          <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl bg-gray-950 px-6 py-14 text-center text-white sm:px-12">

            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
              READY TO TRAVEL?
            </span>

            <h2 className="mt-5 text-3xl sm:text-5xl font-black">
              Book Your {startCity} to {endCity} Cab
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
              Share your travel details with Chiku Cabs and get vehicle
              availability and the final fare for your journey.
            </p>


            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-black transition hover:opacity-90"
              >

                <FaPhoneAlt />

                Call {DISPLAY_PHONE}

              </a>


              <a
                href={buildWhatsAppUrl(
                  `Hi Chiku Cabs, I want to book a cab from ${startCity} to ${endCity}. Please share the fare and vehicle availability.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-lg font-black text-white transition hover:opacity-90"
              >

                <FaWhatsapp />

                WhatsApp Booking

              </a>

            </div>

          </div>

        </section>


        {/* =====================================================
            EEAT
        ====================================================== */}

        <EEATSection
          city={startCity}
          vehicle={vehicleFromUrl || "Cab"}
        />

      </main>
    </>
  );
}