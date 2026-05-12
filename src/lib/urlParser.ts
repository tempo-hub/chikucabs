// src/lib/urlParser.ts

export interface ParsedRouteData {
  origin: string | null;
  destination: string | null;
  vehicle: string | null;
  vehicleCategory: "tempo-traveller" | "innova" | "cab" | "driver";
  routeType:
    | "Service"
    | "Local Service"
    | "Outstation Route"
    | "Outstation Route Fare"
    | "Driver Service"
    | "Unknown";
  isLegacyPhp: boolean;
  slugs: string[];
}

/**
 * Parses a dynamic Next.js App Router slug array into meaningful SEO data components.
 * Accounts for legacy .php extensions, route (-to-), local services, etc.
 *
 * @param slugs The dynamic route segments from [...slug]
 * @returns ParsedRouteData
 */
export function parseUrlSlug(slugs: string[]): ParsedRouteData {
  if (!slugs || slugs.length === 0) {
    return {
      origin: null,
      destination: null,
      vehicle: null,
      vehicleCategory: "cab" as const,
      routeType: "Unknown",
      isLegacyPhp: false,
      slugs: [],
    };
  }

  const fullSlug = slugs.join("/");
  const isLegacyPhp = fullSlug.endsWith(".php");

  // Get the core descriptive segment (usually the last part and clean it)
  const lastSegment = slugs[slugs.length - 1].replace(/\.php$/, "");

  let origin: string | null = null;
  let destination: string | null = null;
  let vehicle: string | null = null;
  let routeType: ParsedRouteData["routeType"] = "Unknown";

  // 1. Identify Vehicle Type
  const lowerSegment = lastSegment.toLowerCase();
  if (lowerSegment.includes("tempo") || lowerSegment.includes("traveller")) {
    vehicle = "Tempo Traveller";
  } else if (lowerSegment.includes("innova")) {
    vehicle = "Innova";
  } else if (lowerSegment.includes("bus")) {
    vehicle = "Bus";
  } else if (lowerSegment.includes("car")) {
    vehicle = "Car";
  } else if (
    lowerSegment.includes("driver") ||
    lowerSegment.includes("chauffeur")
  ) {
    vehicle = "Driver";
  } else if (lowerSegment.includes("cab") || lowerSegment.includes("taxi")) {
    vehicle = "Cab";
  } else {
    vehicle = "Cab"; // Default fallback
  }

  // 2. Driver Service parsing
  if (lowerSegment.includes("driver") || lowerSegment.includes("chauffeur")) {
    routeType = "Driver Service";
    const inMatch = lowerSegment.match(/-in-([a-z0-9]+)/i);
    if (inMatch) {
      origin = inMatch[1];
    } else if (lowerSegment.includes("-")) {
      const possibleCity = lowerSegment.split("-").pop() || "";
      if (
        !["driver", "chauffeur", "hire", "service", "rent"].includes(
          possibleCity,
        )
      ) {
        origin = possibleCity;
      }
    }
  }
  // 3. Outstation Route parsing (-to-)
  else if (lowerSegment.includes("-to-")) {
    routeType = lowerSegment.endsWith("-fare")
      ? "Outstation Route Fare"
      : "Outstation Route";

    // Extract Origin and Destination
    // For example: "varanasi-to-lucknow-cab" or "tempo-traveller-hire-delhi-to-mukteshwar"
    const parts = lowerSegment.split("-to-");
    if (parts.length === 2) {
      const beforeToWords = parts[0].split("-"); // e.g., ["varanasi"] or ["tempo", "traveller", "hire", "delhi"]
      const afterToWords = parts[1].split("-"); // e.g., ["lucknow", "cab"]

      origin = beforeToWords[beforeToWords.length - 1]; // usually the word right before '-to-'
      destination = afterToWords[0]; // usually the word right after '-to-'
    }
  }
  // 3. Local City Service Parsing
  else if (
    lowerSegment.includes("-in-") ||
    lowerSegment.includes("-from-") ||
    slugs.length > 1 ||
    // Heuristic: If the last word isn't a common generic slug word, it's likely a city name (e.g. tempo-traveller-surat)
    (lowerSegment.includes("-") &&
      ![
        "rent",
        "taxi",
        "cab",
        "cabs",
        "hire",
        "airport",
        "area",
        "condition",
        "trip",
        "driver",
        "agencies",
        "company",
        "agency",
        "operators",
      ].includes(lowerSegment.split("-").pop() || ""))
  ) {
    routeType = "Local Service";

    // Example: "tempo-traveller-in-delhi", "cabs-from-airport"
    const inMatch = lowerSegment.match(/-in-([a-z0-9]+)/i);
    const fromMatch = lowerSegment.match(/-from-([a-z0-9]+)/i);

    if (inMatch) {
      origin = inMatch[1];
    } else if (fromMatch) {
      origin = fromMatch[1];
      if (origin === "airport" || origin === "local")
        origin = slugs.length > 1 ? slugs[0] : null;
    } else if (slugs.length > 1) {
      origin = slugs[0];
    } else {
      // It's a single slug with a city name at the end, like tempo-traveller-surat
      const words = lowerSegment.split("-");
      origin = words[words.length - 1];
    }
  }
  // 4. General Generic Corporate/Service Pages
  else {
    routeType = "Service";
  }

  // Capitalize Helper
  const capitalize = (str: string | null) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  // Determine vehicleCategory
  const lowerVehicle = (vehicle || "cab").toLowerCase();
  let vehicleCategory: ParsedRouteData["vehicleCategory"] = "cab";
  if (lowerVehicle.includes("tempo") || lowerVehicle.includes("traveller")) {
    vehicleCategory = "tempo-traveller";
  } else if (lowerVehicle.includes("innova")) {
    vehicleCategory = "innova";
  } else if (
    lowerVehicle.includes("driver") ||
    lowerVehicle.includes("chauffeur")
  ) {
    vehicleCategory = "driver";
  }

  return {
    origin: capitalize(origin),
    destination: capitalize(destination),
    vehicle: capitalize(vehicle),
    vehicleCategory,
    routeType,
    isLegacyPhp,
    slugs,
  };
}
