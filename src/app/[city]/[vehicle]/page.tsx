import InnovaServiceTemplate from "@/components/templates/InnovaServiceTemplate";
import { ParsedRouteData } from "@/lib/urlParser";
import { isValidRoute } from "@/lib/validateRoute";
import { notFound } from "next/navigation";

interface Props {
  params: {
    city: string;
    vehicle: string;
  };
}

export default function VehiclePage({ params }: Props) {
  const parsedData: ParsedRouteData = {
    origin: params.city,
    destination: null,
    vehicle: "Toyota Innova Crysta",
    vehicleSlug: params.vehicle,
    vehicleCategory: "innova",
    routeType: "Local Service",
    isLegacyPhp: false,
    slugs: [params.city, "car-rental", params.vehicle],
  };

  const currentPath = `/${params.city}/${params.vehicle}`;

if (!isValidRoute(currentPath)) {
  notFound();
}

  return <InnovaServiceTemplate parsedData={parsedData} />;
}