export type Route = {
  slug: string;
  origin: string;
  destination: string;
};

const delhiDestinations = [
  "Shimla",
  "Kufri",
  "Khajjiar",
  "Dharamshala",
  "McLeodganj",
  "Arki",
  "Baddi",
  "Banjar",
  "Barog",
  "Barot",
  "Bhota",
  "Bhuntar",
  "Bir Billing",
  "Chaupal",
  "Chuari Khas",
  "Daulatpur",
  "Dera Gopipur",
  "Solan",
  "Sundernagar",
  "Talai",
  "Tattapani",
  "Tira Sujanpur",
  "Tirthan Valley",
  "Tosh",
];

export const delhiRoutes: Route[] = delhiDestinations.map((city) => ({
  slug: `/delhi/tempo-traveller-hire-delhi-to-${city
    .toLowerCase()
    .replace(/\s+/g, "-")}`,
  origin: "Delhi",
  destination: city,
}));
