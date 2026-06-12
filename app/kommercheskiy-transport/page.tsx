import type { Metadata } from "next";
import { InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { mainPages } from "@/data/site";

const page = mainPages.find((item) => item.path === "/kommercheskiy-transport")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: {
    title: page.title,
    description: page.description,
    url: "/kommercheskiy-transport"
  }
};

export default function CommercialTransportPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <InnerHeader />
      <InnerHero
        eyebrow="Коммерческий транспорт"
        title="Ремонт микроавтобусов, фургонов и рабочих автомобилей"
        text="СТОАВТО проектируется как автотехцентр, где коммерческий транспорт получает тот же уровень диагностики, кузовного ремонта, покраски и контроля сроков."
      />
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 lg:grid-cols-3">
          {["Микроавтобусы", "Фургоны", "Рабочие автомобили"].map((title) => (
            <article key={title} className="border border-white/10 bg-white/[0.025] p-7">
              <h2 className="text-2xl font-black tracking-[-0.04em] text-white">{title}</h2>
              <h3 className="mt-5 font-black text-[#c43a52]">Полный цикл работ</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Диагностика, кузовные работы, окраска, слесарный ремонт и фотоотчёт по этапам.
              </p>
            </article>
          ))}
        </div>
      </section>
      <PhotoCapabilityGrid />
      <ServiceLinks />
    </main>
  );
}
