import mongoose from "mongoose";
import dns from "dns";

/**
 * Resolve a mongodb+srv:// URI into a standard mongodb:// URI
 * using Google DNS (8.8.8.8) to bypass ISP DNS that can't handle SRV records.
 */
async function resolveSrvToStandardUri(srvUri: string): Promise<string> {
  if (!srvUri.startsWith("mongodb+srv://")) return srvUri;

  const resolver = new dns.Resolver();
  resolver.setServers(["8.8.8.8", "8.8.4.4"]);

  const url = new URL(srvUri);
  const hostname = url.hostname;

  // Resolve SRV records
  const srvRecords = await new Promise<dns.SrvRecord[]>((resolve, reject) => {
    resolver.resolveSrv(`_mongodb._tcp.${hostname}`, (err, records) => {
      if (err) reject(err);
      else resolve(records);
    });
  });

  // Resolve TXT records (contains authSource, replicaSet, etc.)
  let txtOptions = "";
  try {
    const txtRecords = await new Promise<string[][]>((resolve, reject) => {
      resolver.resolveTxt(hostname, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });
    txtOptions = txtRecords.map((r) => r.join("")).join("&");
  } catch {
    // TXT records are optional
  }

  const hosts = srvRecords.map((r) => `${r.name}:${r.port}`).join(",");
  const auth = url.username
    ? `${encodeURIComponent(decodeURIComponent(url.username))}:${encodeURIComponent(decodeURIComponent(url.password))}@`
    : "";
  const dbName = url.pathname || "/";
  const existingParams = url.search ? url.search.slice(1) : "";

  const allParams = [txtOptions, existingParams, "tls=true"]
    .filter(Boolean)
    .join("&");

  return `mongodb://${auth}${hosts}${dbName}?${allParams}`;
}

const globalAny = globalThis as any;

let cached = globalAny.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  resolvedUri: string | null;
} | undefined;

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null, resolvedUri: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    // Resolve SRV URI to standard URI using Google DNS
    if (!cached!.resolvedUri) {
      cached!.resolvedUri = await resolveSrvToStandardUri(MONGODB_URI);
      console.log("MongoDB: Resolved connection URI successfully");
    }
    cached!.promise = mongoose.connect(cached!.resolvedUri);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
