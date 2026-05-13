import { Route } from "./delhiRoutes";

const ghaziabadDestinations = [
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
  "Dharmsala",
  "Fagu",
  "Gagret",
  "Ghumarwin",
  "Hamirpur",
  "Indora",
  "Jawalamukhi",
  "Jhakhri",
];

export const ghaziabadRoutes: Route[] = ghaziabadDestinations.map((city) => ({
  slug: `/ghaziabad/tempo-traveller-hire-ghaziabad-to-${city
    .toLowerCase()
    .replace(/\s+/g, "-")}`,
  origin: "Ghaziabad",
  destination: city,
}));
