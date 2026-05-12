import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image selected" },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("MongoDB database object not found");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucket = new GridFSBucket(db as any, {
      bucketName: "images",
    });

    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        contentType: file.type,
      },
    });

    uploadStream.end(buffer);

    await new Promise<void>((resolve, reject) => {
      uploadStream.on("finish", () => resolve());
      uploadStream.on("error", (err) => reject(err));
    });

    return NextResponse.json({
      success: true,
      imageId: uploadStream.id.toString(),
    });
  } catch (error: unknown) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Upload failed",
      },
      { status: 500 }
    );
  }
}