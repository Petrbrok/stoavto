import fs from "node:fs/promises";
import path from "node:path";
import { getUploadsPath } from "@/lib/storage-paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (filename !== path.basename(filename)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(path.join(getUploadsPath(), filename));
    const contentType = contentTypes[path.extname(filename).toLowerCase()] || "application/octet-stream";

    return new Response(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType
      }
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
