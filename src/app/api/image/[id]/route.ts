import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const db = mongoose.connection.db;
    if (!db) throw new Error("DB not connected");

    const fileId = new ObjectId(id);

    // get file info
    const files = await db
      .collection("images.files")
      .find({ _id: fileId })
      .toArray();

    if (!files.length) {
      return new Response("Image not found", { status: 404 });
    }

    const file = files[0];

    const bucket = new GridFSBucket(db as any, {
      bucketName: "images",
    });

    const stream = bucket.openDownloadStream(fileId);

    // convert stream → buffer
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type":
          file.metadata?.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("IMAGE FETCH ERROR:", error);
    return new Response("Invalid image", { status: 400 });
  }
}