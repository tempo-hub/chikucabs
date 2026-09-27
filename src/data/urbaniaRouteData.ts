export interface UrbaniaRouteData {
  fromCity: string;
  toCity: string;
  distance: number;
  duration: string;
}

export const URBANIA_ROUTES: UrbaniaRouteData[] = [
  {
    fromCity: "Ayodhya",
    toCity: "Haridwar",
    distance: 720,
    duration: "13–15 hours",
  },
  {
    fromCity: "Ayodhya",
    toCity: "Varanasi",
    distance: 135,
    duration: "3–4 hours",
  },
  {
    fromCity: "Ayodhya",
    toCity: "Mathura",
    distance: 570,
    duration: "10–11 hours",
  },
  {
    fromCity: "Ayodhya",
    toCity: "Vrindavan",
    distance: 580,
    duration: "10–11 hours",
  },
  {
    fromCity: "Ayodhya",
    toCity: "Prayagraj",
    distance: 165,
    duration: "4–5 hours",
  },
];