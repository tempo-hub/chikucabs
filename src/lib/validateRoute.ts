import routeData from "@/data/routeData.json";

export function isValidRoute(path: string) {
  return routeData.some(
    (route: { url: string }) =>
      route.url === path || route.url === `${path}.php`
  );
}