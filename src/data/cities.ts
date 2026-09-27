import citiesJson from "./cities.json";

export interface CityHub {
  name: string;
  description: string;
}

export const cities: CityHub[] = citiesJson as CityHub[];

export function cityToSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}