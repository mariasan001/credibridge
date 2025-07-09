"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { TablaSolicitudesSkeleton } from "../historia-solicitudes/TablaSolicitudesSkeleton";
import ResumenSolicitudes from "../components/ResumenQuejas";
import TablaSolicitudes from "../components/ListaTiketQuejas";
import { CarteraHeader } from "../components/TiketHeaderQueja";

// 🧠 Flag para mostrar el Skeleton solo la primera vez
let showedTablaSolicitudesQuejasSkeleton = false;

export default function TablaSolicitudesPage() {
  const [loading, setLoading] = useState(!showedTablaSolicitudesQuejasSkeleton);

  useEffect(() => {
    if (!showedTablaSolicitudesQuejasSkeleton) {
      const timeout = setTimeout(() => {
        showedTablaSolicitudesQuejasSkeleton = true;
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <PageLayout>
      <CarteraHeader />
      {loading ? (
        <TablaSolicitudesSkeleton />
      ) : (
        <>
          <ResumenSolicitudes />
          <TablaSolicitudes />
        </>
      )}
    </PageLayout>
  );
}
