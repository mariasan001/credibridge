"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PageLayout } from "@/components/PageLayout";
import { LimiteCreditoCard } from "./components/limit_componet";
import { PromocionesActivasList } from "./components/list_promocines";
import { SaludoServidor } from "../perfil/components/saludosalservidor";
import { LimitePageSkeleton } from "./LimitePageSkeleton";

import "./LimitePage.css";

export default function LimitePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // cuando user esté disponible, asumimos que ya cargó
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <PageLayout>
      {isLoading ? (
        <LimitePageSkeleton />
      ) : (
        <section className="limite-section">
          <SaludoServidor />
          <LimiteCreditoCard />
          <PromocionesActivasList />
        </section>
      )}
    </PageLayout>
  );
}
