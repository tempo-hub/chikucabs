export interface CityHub {
  slug: string;
  name: string;
  featured?: boolean;
}

export const CITY_HUBS: CityHub[] = [
  { slug: "delhi", name: "Delhi", featured: true },
  { slug: "ujjain", name: "Ujjain" },
  { slug: "indore", name: "Indore" },
  { slug: "haridwar", name: "Haridwar" },
  { slug: "mumbai", name: "Mumbai", featured: true },
  { slug: "chennai", name: "Chennai", featured: true },
  { slug: "varanasi", name: "Varanasi", featured: true },
  { slug: "ayodhya", name: "Ayodhya" },
  { slug: "lucknow", name: "Lucknow", featured: true },
  { slug: "bangalore", name: "Bangalore", featured: true },
  { slug: "madurai", name: "Madurai" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "rameshwaram", name: "Rameshwaram" },
  { slug: "kanyakumari", name: "Kanyakumari" },
  { slug: "pondicherry", name: "Pondicherry" },
  { slug: "mirzapur", name: "Mirzapur" },
  { slug: "jaunpur", name: "Jaunpur" },
  { slug: "sarnath", name: "Sarnath" },
  { slug: "ddu-railway-station", name: "DDU Railway Station" },
  { slug: "ramnagar", name: "Ramnagar" },
  { slug: "bhu", name: "BHU" },
  { slug: "secunderabad", name: "Secunderabad" },
  { slug: "nashik", name: "Nashik" },
  { slug: "raipur", name: "Raipur" },
];

export const FEATURED_CITY_HUBS = CITY_HUBS.filter((city) => city.featured);

export function getCityHub(slug: string) {
  return CITY_HUBS.find((city) => city.slug === slug);
}

export const CITY_DISPLAY_NAMES: Record<string, string> = {
  ...Object.fromEntries(CITY_HUBS.map(({ slug, name }) => [slug, name])),
  "pt-deen-dayal-upadhyaya-junction-ddu":
    "Pt. Deen Dayal Upadhyaya Junction (DDU)",
};
