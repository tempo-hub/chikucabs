import CityCabRoutesTemplate from "@/components/templates/CityCabRoutesTemplate";

interface Props {
  params: {
    city: string;
  };
}

export default function CityPage({ params }: Props) {
  return <CityCabRoutesTemplate city={params.city} />;
}