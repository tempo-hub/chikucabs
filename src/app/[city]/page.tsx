import { notFound } from "next/navigation";
import { isValidRoute } from "@/lib/validateRoute";
import CityCabRoutesTemplate from "@/components/templates/CityCabRoutesTemplate";

interface Props {
  params: {
    city: string;
  };
}

export default function CityPage({ params }: Props) {
  const currentPath = `/${params.city}`;

  if (!isValidRoute(currentPath)) {
    notFound();
  }

  return <CityCabRoutesTemplate city={params.city} />;
}