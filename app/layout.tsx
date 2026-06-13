import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { SITE_URL } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-manrope"
});

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-unbounded",
  weight: ["600", "700", "800", "900"]
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "СТОАВТО | Автотехцентр полного цикла",
  description:
    "Кузовной ремонт, покраска, детейлинг, диагностика, развал-схождение и слесарные работы для легковых автомобилей и коммерческого транспорта.",
  openGraph: {
    type: "website",
    siteName: "СТОАВТО",
    title: "СТОАВТО | Автотехцентр полного цикла",
    description:
      "Современный автотехцентр для легковых автомобилей и коммерческого транспорта.",
    images: [
      {
        url: "/images/hero-stoavto.png",
        width: 1536,
        height: 1024,
        alt: "СТОАВТО: легковой автомобиль и микроавтобус в автотехцентре"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "СТОАВТО | Автотехцентр полного цикла",
    description:
      "Кузовной ремонт, покраска, диагностика и обслуживание коммерческого транспорта.",
    images: ["/images/hero-stoavto.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${unbounded.variable} antialiased`}>{children}</body>
    </html>
  );
}
