"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ToasterConfig } from "@/components/ToasterConfig";
import { UIProvider } from "@/context/UIContext";
import ClientLayout from "./ClientLayout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UIProvider>
        <ClientLayout>{children}</ClientLayout>
        <ToasterConfig />
      </UIProvider>
    </AuthProvider>
  );
}
