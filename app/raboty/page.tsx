import type { Metadata } from "next";
import { ContentCardGrid, InnerFooter, InnerHeader, InnerHero, PhotoCapabilityGrid } from "@/components/inner-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getSiteContent().pages.works.seo;
}

export default function WorksPage() {
  const content = getSiteContent();
  const page = content.pages.works;
  return (
    <main className="site-shell min-h-screen bg-[#08090b] text-white">
      <InnerHeader content={content} />
      <InnerHero hero={page.hero} />
      <ContentCardGrid cards={page.cards} />
      <PhotoCapabilityGrid title={content.pages.services.capabilitiesTitle} photos={content.facilityPhotos} />
      <InnerFooter content={content} />
    </main>
  );
}
