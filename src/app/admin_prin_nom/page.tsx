"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { fetchRankingDashboard } from "./service/ranking_dashboard_service";
import { RankingDashboardData } from "./model/ranking-dashboard.model";

import ResumenSection from "./components/ResumenSection";
import RankingMensualSection from "./components/RankingMensualSection";
import IncidenciasPorInstitucionSection from "./components/IncidenciasPorInstitucionSection";
import TiemposDeRespuestaSection from "./components/TiemposDeRespuestaSection";
import { CarteraHeader } from "./components/CarteraHeader";
import DashboardSkeleton from "./components/DashboardSkeleton";

import "./ranking-dashboard.css";
import { toast } from "react-hot-toast";

export default function RankingDashboardPage() {
  const [data, setData] = useState<RankingDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const toastId = toast.loading("Cargando dashboard...");

      try {
        const dashboard = await fetchRankingDashboard();
        setData(dashboard);
        toast.success("Datos cargados correctamente", { id: toastId });
      } catch (error) {
        console.error("Error al cargar el dashboard:", error);
        setError("Error al cargar el dashboard.");
        toast.error("No se pudo cargar el dashboard", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <DashboardSkeleton />
      </PageLayout>
    );
  }

  if (error || !data) {
    return (
      <PageLayout>
        <div className="dashboard-error">
          🚫 {error || "No se pudo cargar la información del dashboard."}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <CarteraHeader />

      <ResumenSection resumen={data.resumen} />

      <div className="ranking-contenedor-secciones">
        <div className="ranking-mensual">
          <RankingMensualSection data={data.rankingMensual} />
        </div>
        <div className="ranking-por-institucion">
          <IncidenciasPorInstitucionSection data={data.incidenciasPorInstitucion} />
        </div>
      </div>

      <TiemposDeRespuestaSection data={data.tiemposDeRespuesta} />
    </PageLayout>
  );
}


