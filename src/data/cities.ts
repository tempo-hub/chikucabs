import citiesJson from "./cities.json";

export interface CityHub {
  name: string;
  description: string;
}

export const cities: CityHub[] = citiesJson as CityHub[];