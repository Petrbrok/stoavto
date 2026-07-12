import type { Metadata } from "next";
import Link from "next/link";
import { InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid } from "@/components/inner-page";
import { brands, mainPages } from "@/data/site";

const page = mainPages.find((item) => item.path === "/marki")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function BrandsPage() {
  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader />
      <InnerHero
        eyebrow="Марки автомобилей"
        title="Обслуживаем популярные легковые и коммерческие марки"
        text="Для каждой марки предусмотрена отдельная SEO-страница, чтобы дальше развивать продвижение по услугам и моделям."
      />
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marki/${brand.slug}`}
              className="border border-white/10 bg-white/[0.025] p-6 text-center transition hover:border-[#c43a52]/60 hover:bg-white/[0.045]"
            >
              <h2 className="text-xl font-black tracking-[-0.04em] text-white">{brand.name}</h2>
              <h3 className="mt-4 text-sm font-bold text-[#c43a52]">Ремонт и обслуживание</h3>
            </Link>
          ))}
        </div>
      </section>
      <PhotoCapabilityGrid />
      <InnerFooter />
    </main>
  );
}
