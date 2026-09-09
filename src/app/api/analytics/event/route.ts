import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await connectDB();

    const analyticsEvent = await AnalyticsEvent.create({
      eventType: body.eventType,

      pageUrl: body.pageUrl,
      pageTitle: body.pageTitle,

      city: body.city,
      locality: body.locality,
      vehicle: body.vehicle,

      referrer: body.referrer,

      source: body.source,
      medium: body.medium,
      campaign: body.campaign,

      device: body.device,

      sessionId: body.sessionId,

      userName: body.userName,
      phoneNumber: body.phoneNumber,

      bookingDetails: body.bookingDetails,

      metadata: body.metadata,
    });

    return NextResponse.json({
      success: true,
      id: analyticsEvent._id,
    });
  } catch (error) {
    console.error("Analytics API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save analytics",
      },
      {
        status: 500,
      }
    );
  }
}