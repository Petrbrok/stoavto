import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getUploadsPath } from "@/lib/storage-paths";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/x-icon"]);

function extensionFromName(name: string) {
  const ext = path.extname(name).toLowerCase();
  return ext || ".png";
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || !allowedTypes.has(file.type)) {
    return NextResponse.json({ message: "Можно загружать только изображения" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadDir = getUploadsPath();
  await fs.mkdir(uploadDir, { recursive: true });

  const safeName = `${Date.now()}-${randomUUID()}${extensionFromName(file.name)}`;
  await fs.writeFile(path.join(uploadDir, safeName), bytes);

  return NextResponse.json({ url: `/uploads/${safeName}` });
}
