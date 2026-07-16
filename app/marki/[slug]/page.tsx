import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCardGrid, InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { brands } from "@/data/site";
import { getSiteContent } from "@/lib/content-store";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getSiteContent().pages.brands.items.find((item) => item.slug === slug)?.seo ?? {};
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const content = getSiteContent();
  const brand = content.pages.brands.items.find((item) => item.slug === slug);
  if (!brand) notFound();

  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader content={content} />
      <InnerHero hero={brand.hero} />
      <section className="px-5 pt-14 sm:px-8 lg:px-10">
        <h2 className="mx-auto max-w-[1440px] text-3xl font-black tracking-[-0.05em] text-white">{brand.sectionTitle}</h2>
      </section>
      <ContentCardGrid cards={brand.cards} />
      <PhotoCapabilityGrid title={content.pages.brands.capabilitiesTitle} photos={content.facilityPhotos} />
      <ServiceLinks content={content} />
      <InnerFooter content={content} />
    </main>
  );
}
