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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  title: "СТОАВТО | Ремонт легковых автомобилей и фургонов",
  description:
    "Кузовной ремонт, покраска, диагностика, развал-схождение и слесарные работы для легковых автомобилей и коммерческого транспорта.",
  openGraph: {
    type: "website",
    siteName: "СТОАВТО",
    title: "СТОАВТО | Ремонт легковых автомобилей и фургонов",
    description:
      "Кузовной ремонт, покраска, диагностика и слесарные работы для легковых автомобилей, микроавтобусов и фургонов.",
    images: [
      {
        url: "/images/hero-stoavto-new.png",
        width: 1680,
        height: 945,
        alt: "СТОАВТО: легковой автомобиль и микроавтобус в автотехцентре"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "СТОАВТО | Ремонт легковых автомобилей и фургонов",
    description:
      "Кузовной ремонт, покраска, диагностика и обслуживание коммерческого транспорта.",
    images: ["/images/hero-stoavto-new.png"]
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
