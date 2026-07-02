import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/admin-panel";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminPanel initialContent={getSiteContent()} />;
}
