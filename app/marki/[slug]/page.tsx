import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { brands } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((item) => item.slug === slug);

  if (!brand) {
    return {};
  }

  return {
    title: `Ремонт ${brand.name} в СТОАВТО`,
    description: `Обслуживание и ремонт ${brand.name}: диагностика, кузовной ремонт, покраска, развал-схождение и слесарные работы в СТОАВТО.`,
    openGraph: {
      title: `Ремонт ${brand.name} в СТОАВТО`,
      description: `Полный цикл ремонта ${brand.name} для легковых автомобилей и коммерческого транспорта.`,
      url: `/marki/${brand.slug}`
    }
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((item) => item.slug === slug);

  if (!brand) {
    notFound();
  }

  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader />
      <InnerHero
        eyebrow="Марка автомобиля"
        title={`Ремонт и обслуживание ${brand.name}`}
        text={`СТОАВТО выполняет диагностику, кузовной ремонт, покраску, развал-схождение и слесарные работы для автомобилей ${brand.name}.`}
      />
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white">Популярные работы для {brand.name}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {["Диагностика", "Кузовной ремонт и покраска", "Слесарное обслуживание"].map((item) => (
              <article key={item} className="border border-white/10 bg-white/[0.025] p-6">
                <h3 className="font-black text-white">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Страница подготовлена под расширение моделями, фото работ и реальными кейсами.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PhotoCapabilityGrid />
      <ServiceLinks />
      <InnerFooter />
    </main>
  );
}
