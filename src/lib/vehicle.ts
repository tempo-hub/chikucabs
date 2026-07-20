import { connectDB } from "./mongodb";
import Vehicle from "@/models/Vehicle";

export async function getVehicle(slug: string) {
  await connectDB();

  const vehicle = await Vehicle.findOne({
    slug,
  }).lean();

  return vehicle;
}