"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password")
      })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Неверный логин или пароль");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#08090b] px-5 text-white">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg border border-white/12 bg-[#101217] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">СТОАВТО</p>
        <h1 className="mt-3 text-3xl font-black">Вход в админку</h1>
        <label className="mt-6 grid gap-2 text-sm font-bold text-white/80">
          Логин
          <input name="username" defaultValue="admin" className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none focus:border-[#c43a52]" />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold text-white/80">
          Пароль
          <input name="password" type="password" placeholder="Пароль" className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none focus:border-[#c43a52]" />
        </label>
        {error && <p className="mt-4 rounded-lg border border-[#c43a52]/40 bg-[#9e1f36]/14 p-3 text-sm text-white">{error}</p>}
        <button type="submit" disabled={loading} className="mt-5 w-full bg-[#9e1f36] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#b72b43] disabled:opacity-60">
          {loading ? "Проверяем..." : "Войти"}
        </button>
      </form>
    </main>
  );
}
