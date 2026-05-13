import { delhiRoutes } from "./delhiRoutes";
import { ghaziabadRoutes } from "./gzbRoutes";

export const routesByCity: Record<string, any> = {
  delhi: delhiRoutes,
  ghaziabad: ghaziabadRoutes,
};