"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { fetchRankingDashboard } from "./service/ranking_dashboard_service";
import { RankingDashboardData } from "./model/ranking-dashboard.model";

import ResumenSection from "./components/ResumenSection";
import RankingMensualSection from "./components/RankingMensualSection";
import IncidenciasPorInstitucionSection from "./components/IncidenciasPorInstitucionSection";
import TiemposDeRespuestaSection from "./components/TiemposDeRespuestaSection";
import "./ranking-dashboard.css";
export default function RankingDashboardPage() {
  const [data, setData] = useState<RankingDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const dashboard = await fetchRankingDashboard();
        setData(dashboard);
      } catch (error) {
        console.error("Error al cargar el dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <PageLayout>Cargando...</PageLayout>;
  if (!data) return <PageLayout>Error cargando datos.</PageLayout>;

  return (
<PageLayout>
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
