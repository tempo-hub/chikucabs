import { NextResponse } from "next/server";
import { getVehicle } from "@/lib/vehicle";

export async function GET() {
  const vehicle = await getVehicle("innova-crysta-on-rent");

  return NextResponse.json(vehicle);
}