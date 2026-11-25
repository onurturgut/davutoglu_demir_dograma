import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/layout";
export const metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
