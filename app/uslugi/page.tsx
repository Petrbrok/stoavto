import type { Metadata } from "next";
import { InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid, ServiceLinks } from "@/components/inner-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getSiteContent().pages.services.seo;
}

export default function ServicesPage() {
  const content = getSiteContent();
  const page = content.pages.services;
  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader content={content} />
      <InnerHero hero={page.hero} />
      <ServiceLinks content={content} />
      <PhotoCapabilityGrid title={page.capabilitiesTitle} photos={content.facilityPhotos} />
      <InnerFooter content={content} />
    </main>
  );
}
