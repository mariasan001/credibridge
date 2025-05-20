// src/app/perfil_user/perfil/page.tsx
"use client";

import { PageLayout } from "@/components/PageLayout";
import { PerfilUsuarioCard } from "./components/PerfilUsuarioCard";


export default function PerfilPage() {
  return (
    <PageLayout>
   <div style={{ padding: "2rem" }}>
      <PerfilUsuarioCard />
    </div>
    </PageLayout>
 
  );
}
