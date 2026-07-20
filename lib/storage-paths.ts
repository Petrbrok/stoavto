import "server-only";

import path from "node:path";

export function getDatabasePath() {
  if (process.env.DATABASE_PATH) {
    return path.resolve(process.env.DATABASE_PATH);
  }

  if (process.env.NODE_ENV === "production") {
    return "/app/data/database.db";
  }

  return path.join(process.cwd(), "data", "site.sqlite");
}

export function getUploadsPath() {
  if (process.env.UPLOADS_PATH) {
    return path.resolve(process.env.UPLOADS_PATH);
  }

  if (process.env.NODE_ENV === "production") {
    return "/app/data/uploads";
  }

  return path.join(process.cwd(), "data", "uploads");
}
