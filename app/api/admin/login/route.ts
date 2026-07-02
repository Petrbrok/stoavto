import { NextResponse } from "next/server";
import { getAdminCredentials, setAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  const credentials = getAdminCredentials();

  if (body?.username !== credentials.username || body?.password !== credentials.password) {
    return NextResponse.json({ ok: false, message: "Неверный логин или пароль" }, { status: 401 });
  }

  await setAdminSession(credentials.username);
  return NextResponse.json({ ok: true });
}
