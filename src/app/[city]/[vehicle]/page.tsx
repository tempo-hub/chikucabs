import InnovaServiceTemplate from "@/components/templates/InnovaServiceTemplate";
import { ParsedRouteData } from "@/lib/urlParser";

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

  return <InnovaServiceTemplate parsedData={parsedData} />;
}