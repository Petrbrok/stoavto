import type { Metadata } from "next";
import { ManagedHomePage } from "@/components/managed-home-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getSiteContent().home.seo;
}

export default function Home() {
  return <ManagedHomePage content={getSiteContent()} />;
}
