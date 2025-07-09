"use client";

import { UIProvider } from "@/context/UIContext";
import { ToasterConfig } from "@/components/ToasterConfig";
import ClientLayout from "./ClientLayout";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <ClientLayout>{children}</ClientLayout>
      <ToasterConfig />
    </UIProvider>
  );
}
