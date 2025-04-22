"use client"

import { PageLayout } from "@/components/PageLayout"
import { SummaryCard } from "@/components/dashboard/SummaryCard"
import { RankingChart } from "@/components/dashboard/RankingChart"
import { IncidenciasPorInstitucion } from "@/components/ranking/IncidenciasPorInstitucion"
import { TiempoRespuestaTable } from "@/components/ranking/TiempoRespuestaTable"
import { ReporteForm } from "@/components/ranking/ReporteForm"


export default function RankingPage() {
  const resumen = [
    { title: "Total de incidencias", value: 123 },
    { title: "Expiradas", value: 25 },
    { title: "Activas", value: 20 },
    { title: "Atendidas", value: 100 },
  ]

  return (
    <PageLayout>
      <h1 className="ranking__title">Ranking de Instituciones</h1>
      <p className="ranking__subtitle">
        Aquí podrás observar el comportamiento de las dependencias.
      </p>

      {/* === Tarjetas resumen === */}
      <div className="summary-cards-container">
        {resumen.map((item) => (
          <SummaryCard key={item.title} title={item.title} value={item.value} />
        ))}
      </div>

      {/* === Gráfica + Incidencias por Institución === */}
      <div className="ranking__row">
        <div className="ranking__main-chart">
          <RankingChart />
        </div>
        <div className="ranking__side-widget">
          <IncidenciasPorInstitucion />
        </div>
      </div>

      {/* === Tabla + Formulario lado a lado === */}
      <div className="ranking__row ranking__bottom-section">
        <div className="ranking__main-chart">
          <TiempoRespuestaTable />
        </div>
        <div className="ranking__side-widget">
          <ReporteForm />
        </div>
      </div>
    </PageLayout>
  )
}
