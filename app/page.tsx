import { ManagedHomePage } from "@/components/managed-home-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function Page() {
  return <ManagedHomePage content={getSiteContent()} />;
}
