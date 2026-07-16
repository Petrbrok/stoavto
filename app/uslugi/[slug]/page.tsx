import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCardGrid, InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { services } from "@/data/site";
import { getSiteContent } from "@/lib/content-store";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getSiteContent().pages.services.items.find((item) => item.slug === slug)?.seo ?? {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const content = getSiteContent();
  const service = content.pages.services.items.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader content={content} />
      <InnerHero hero={service.hero} />
      <section className="px-5 pt-14 sm:px-8 lg:px-10">
        <h2 className="mx-auto max-w-[1440px] text-3xl font-black tracking-[-0.05em] text-white">{service.sectionTitle}</h2>
      </section>
      <ContentCardGrid cards={service.features} />
      <PhotoCapabilityGrid title={content.pages.services.capabilitiesTitle} photos={content.facilityPhotos} />
      <ServiceLinks content={content} />
      <InnerFooter content={content} />
    </main>
  );
}
