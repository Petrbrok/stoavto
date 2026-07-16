import type { Metadata } from "next";
import Link from "next/link";
import { InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid } from "@/components/inner-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getSiteContent().pages.brands.seo;
}

export default function BrandsPage() {
  const content = getSiteContent();
  const page = content.pages.brands;
  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader content={content} />
      <InnerHero hero={page.hero} />
      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {page.items.filter((brand) => brand.visible).map((brand) => (
            <Link key={brand.slug} href={`/marki/${brand.slug}`} className="border border-white/10 bg-white/[0.025] p-6 text-center transition hover:border-[#c43a52]/60 hover:bg-white/[0.045]">
              <h2 className="text-xl font-black tracking-[-0.04em] text-white">{brand.name}</h2>
              <p className="mt-4 text-sm font-bold text-[#c43a52]">{page.cardCaption}</p>
            </Link>
          ))}
        </div>
      </section>
      <PhotoCapabilityGrid title={page.capabilitiesTitle} photos={content.facilityPhotos} />
      <InnerFooter content={content} />
    </main>
  );
}
