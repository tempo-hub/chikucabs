import { ParsedRouteData } from "@/lib/urlParser";
import routeData from "@/data/routeData.json";

// extract destination from URL
function getDestination(url: string) {
  return url.split("-to-")[1] || "";
}

// region mapping (expand gradually)
const REGION_MAP: Record<string, string> = {
  // Himachal
  shimla: "himachal",
  kufri: "himachal",
  narkanda: "himachal",
  manali: "himachal",
  kasol: "himachal",
  tosh: "himachal",
  banjar: "himachal",
  barot: "himachal",
  baddi: "himachal",
  solan: "himachal",
  dharamshala: "himachal",
  mcleodganj: "himachal",
  tirthan: "himachal",

  // Uttarakhand
  haridwar: "uttarakhand",
  rishikesh: "uttarakhand",
  dehradun: "uttarakhand",
  mussoorie: "uttarakhand",

  // UP
  varanasi: "up",
  ayodhya: "up",
  prayagraj: "up",
  mathura: "up",
  vrindavan: "up",
};

// detect region
function getRegion(dest: string) {
  return REGION_MAP[dest] || "other";
}

// MAIN FUNCTION
export function getNearbyRoutes(currentUrl: string, routes: { url: string }[]) {
  const currentDest = getDestination(currentUrl);
  const currentRegion = getRegion(currentDest);

  // remove current + match region
  let result = routes
    .filter((r) => r.url !== currentUrl)
    .map((r) => ({
      url: r.url,
      dest: getDestination(r.url),
    }))
    .filter((r) => getRegion(r.dest) === currentRegion)
    .map((r) => r.url);

  // fallback (important for SEO)
  if (result.length < 4) {
    const fallback = routes
      .filter((r) => r.url !== currentUrl)
      .slice(0, 8)
      .map((r) => r.url);

    result = Array.from(new Set(result.concat(fallback)));
  }

  return result.slice(0, 8);
}

export function getAnchorText(url: string, origin: string) {
  const dest = getDestination(url);

  const formattedDest = dest
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `${origin} → ${formattedDest}`;
}

// ─── DEFAULT EXPORT: React Component ───────────────────────────────────────────

interface InternalLinksProps {
  parsedData: ParsedRouteData;
}

export default function InternalLinks({ parsedData }: InternalLinksProps) {
  const currentSlug = parsedData.slugs?.join("/") || "";
  const currentUrl = currentSlug.startsWith("/")
    ? currentSlug
    : `/${currentSlug}`;

  if (
    currentUrl.includes("-cab-fare")
  ) {
    return null;
  }

  // Filter routes that contain "-to-" to get only navigable route pages
  const routePages = (routeData as { url: string }[]).filter((r) =>
    r.url.includes("-to-"),
  );

  const nearbyUrls = getNearbyRoutes(currentUrl, routePages);

  if (nearbyUrls.length === 0) return null;

  const originCity = parsedData.origin || "Your City";

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
        Explore More Routes from {originCity}
      </h2>

      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Discover similar destinations and plan your next trip with more options.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nearbyUrls.map((url) => {
          const destination = getDestination(url);

          const dynamicUrl = `/${originCity.toLowerCase()}/tempo-traveller-hire-${originCity
            .toLowerCase()
            .replace(/\s+/g, "-")}-to-${destination}`;

          return (
            <a
              key={dynamicUrl}
              href={dynamicUrl}
              className="homepage-service-card group"
            >
              <h3 className="text-xl font-semibold mb-2">
                {getAnchorText(dynamicUrl, originCity)}
              </h3>

              <p className="text-muted-foreground mb-4">
                {parsedData.vehicle || "Cab"} Booking
              </p>

              <span className="text-primary font-semibold">View Details →</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
