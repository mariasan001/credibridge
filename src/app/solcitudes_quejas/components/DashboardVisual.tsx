// components/DashboardVisual.tsx
"use client";

import DashboardSkeleton from "@/app/admin_prin_nom/components/DashboardSkeleton";
import IncidenciasPorInstitucionSection from "@/app/admin_prin_nom/components/IncidenciasPorInstitucionSection";
import RankingMensualSection from "@/app/admin_prin_nom/components/RankingMensualSection";
import ResumenSection from "@/app/admin_prin_nom/components/ResumenSection";
import TiemposDeRespuestaSection from "@/app/admin_prin_nom/components/TiemposDeRespuestaSection";
import { RankingDashboardData } from "@/app/admin_prin_nom/model/ranking-dashboard.model";
import { fetchRankingDashboard } from "@/app/admin_prin_nom/service/ranking_dashboard_service";
import { useEffect, useState } from "react";
import "./DaboardVisual.css"
import { toast } from "react-hot-toast";

export default function DashboardVisual() {
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

  if (loading) return <DashboardSkeleton />;
  if (error || !data) return <div className="dashboard-error">🚫 {error || "Error al cargar datos."}</div>;

  return (
    <>
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
    </>
  );
}
