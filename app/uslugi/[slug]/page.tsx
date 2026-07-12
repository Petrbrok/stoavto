import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { services } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/uslugi/${service.slug}`
    }
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader />
      <InnerHero eyebrow="Услуга СТОАВТО" title={service.h1} text={service.summary} />
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white">Что входит в услугу</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.features.map((feature) => (
              <article key={feature} className="border border-white/10 bg-white/[0.025] p-6">
                <h3 className="font-black text-white">{feature}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Работы фиксируются в смете, согласуются до старта и могут сопровождаться фотоотчётом.
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
