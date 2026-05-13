function getDestination(url?: string) {
  if (!url || !url.includes("-to-")) return "";
  return url.split("-to-")[1] || "";
}

function normalize(dest: string) {
  return dest.toLowerCase().split("-")[0];
}

const REGION_MAP: Record<string, string> = {
  shimla: "himachal",
  kufri: "himachal",
  khajjiar: "himachal",
  dharamshala: "himachal",
  mcleodganj: "himachal",
  arki: "himachal",
  baddi: "himachal",
  banjar: "himachal",
  barog: "himachal",
  barot: "himachal",
  bhota: "himachal",
  bhuntar: "himachal",
  bir: "himachal",
  chaupal: "himachal",
  chuari: "himachal",
  daulatpur: "himachal",
  dera: "himachal",
  solan: "himachal",
  sundernagar: "himachal",
  talai: "himachal",
  tattapani: "himachal",
  tira: "himachal",
  tirthan: "himachal",
  tosh: "himachal",
};

function getRegion(dest: string): string {
  return REGION_MAP[normalize(dest)] || "other";
}

export function getNearbyRoutes(
  currentUrl: string,
  routes: { slug: string }[]
) {
  const currentDest = getDestination(currentUrl);
  const currentRegion = getRegion(currentDest);

  return routes
    .filter((r) => r.slug !== currentUrl)
    .filter((r) => {
      const dest = getDestination(r.slug);
      return getRegion(dest) === currentRegion;
    })
    .slice(0, 8);
}

// 🔥 FINAL FIXED
export function getAnchorText(slug: string) {
  const parts = slug.split("/");
  const city = parts[1] || "city";

  const dest = slug.split("-to-")[1] || "";

  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1);

  const formattedDest = dest
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `${formattedCity} → ${formattedDest}`;
}