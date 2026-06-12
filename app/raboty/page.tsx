import type { Metadata } from "next";
import { InnerHeader, InnerHero, PhotoCapabilityGrid } from "@/components/inner-page";
import { mainPages } from "@/data/site";

const page = mainPages.find((item) => item.path === "/raboty")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: {
    title: page.title,
    description: page.description,
    url: "/raboty"
  }
};

const workTypes = [
  "Кузовной ремонт после ДТП",
  "Покраска элементов",
  "Коммерческий транспорт в ремонте",
  "Диагностика и слесарные работы",
  "Развал-схождение после ремонта",
  "Детейлинг после выдачи"
];

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <InnerHeader />
      <InnerHero
        eyebrow="Выполненные работы"
        title="Реальные фотографии работ и процесса ремонта"
        text="Раздел подготовлен под кейсы автотехцентра: до/после, этапы ремонта, коммерческий транспорт на постах и выдачу автомобиля клиенту."
      />
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workTypes.map((title) => (
            <article key={title} className="border border-white/10 bg-white/[0.025]">
              <div className="min-h-[240px] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.14),rgba(255,255,255,0.02))]" />
              <div className="p-6">
                <h2 className="text-xl font-black tracking-[-0.035em] text-white">{title}</h2>
                <h3 className="mt-4 text-sm font-bold text-[#c43a52]">Место под кейс</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Здесь будет крупная фотография, краткая задача, выполненные работы и результат.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PhotoCapabilityGrid />
    </main>
  );
}
