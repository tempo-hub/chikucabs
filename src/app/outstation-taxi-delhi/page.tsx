import type { Metadata } from "next";
import OutstationTaxiDelhiTemplate from "@/components/templates/OutstationTaxiDelhiTemplate";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://chikucabs.com/outstation-taxi-delhi",
  },
};

export default function Page() {
  return <OutstationTaxiDelhiTemplate />;
}