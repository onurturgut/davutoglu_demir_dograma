"use client";
import type { ReactNode } from "react";
import { CMSProvider } from "@/lib/cms/store";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CMSProvider>
      {children}
      <Toaster />
    </CMSProvider>
  );
}
