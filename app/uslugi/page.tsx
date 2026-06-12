import type { Metadata } from "next";
import { InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { mainPages } from "@/data/site";

const page = mainPages.find((item) => item.path === "/uslugi")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <InnerHeader />
      <InnerHero
        eyebrow="Услуги СТОАВТО"
        title="Полный цикл ремонта в одном автотехцентре"
        text="Кузовной ремонт, покраска, диагностика, развал-схождение, детейлинг и слесарные работы для легковых автомобилей и коммерческого транспорта."
      />
      <ServiceLinks />
      <PhotoCapabilityGrid />
    </main>
  );
}
