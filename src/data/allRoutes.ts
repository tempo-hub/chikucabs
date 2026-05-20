import { delhiRoutes } from "./delhiRoutes";
import { ghaziabadRoutes } from "./gzbRoutes";
import { maduraiRoutes } from "./maduraiRoutes";
import { visakhapatnamRoutes } from "./visakhapatnamRoutes";
import { ujjainRoutes } from "./ujjainRoutes";
import { indoreRoutes } from "./indoreRoutes";

export const routesByCity: Record<string, any> = {
  delhi: delhiRoutes,
  ghaziabad: ghaziabadRoutes,
  madurai: maduraiRoutes,
  visakhapatnam: visakhapatnamRoutes,
  ujjain: ujjainRoutes,
  indore: indoreRoutes,
};