"use client" // Marca este archivo para renderizado del lado del cliente en Next.js

import { useEffect, useState } from "react" // Hooks de React

// Componentes principales de la página
import { PageLayout } from "@/components/PageLayout"
import { SummaryCard } from "@/components/dashboard/SummaryCard"
import { RankingChart } from "@/components/dashboard/RankingChart"
import { IncidenciasPorInstitucion } from "@/components/ranking/IncidenciasPorInstitucion"
import { TiempoRespuestaTable } from "@/components/ranking/TiempoRespuestaTable"
import { ReporteForm } from "@/components/ranking/ReporteForm"
import { RankingSkeleton } from "@/components/ranking/RankingSkeleton" // Loader visual

// Componente principal de la página de ranking
export default function RankingPage() {
  // Estado para controlar si se están cargando los datos
  const [loading, setLoading] = useState(true)

  // Simula una carga de datos de 2 segundos
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  // Datos simulados para las tarjetas resumen
  const resumen = [
    { title: "Total de incidencias", value: 123 },
    { title: "Expiradas", value: 25 },
    { title: "Activas", value: 20 },
    { title: "Atendidas", value: 100 },
  ]

  return (
    <PageLayout>
      {/* Muestra skeleton loader mientras loading es true */}
      {loading ? (
        <RankingSkeleton />
      ) : (
        <>
          {/* Título principal y subtítulo */}
          <h1 className="ranking__title">Ranking de Instituciones</h1>
          <p className="ranking__subtitle">
            Aquí podrás observar el comportamiento de las dependencias.
          </p>

          {/* === Tarjetas resumen (arriba) === */}
          <div className="summary-cards-container">
            {resumen.map((item) => (
              <SummaryCard
                key={item.title}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>

          {/* === Gráfica y incidencias (al medio) === */}
          <div className="ranking__row">
            <div className="ranking__main-chart">
              <RankingChart />
            </div>
            <div className="ranking__side-widget">
              <IncidenciasPorInstitucion />
            </div>
          </div>

          {/* === Tabla de tiempos + formulario (parte inferior) === */}
          <div className="ranking__row ranking__bottom-section">
            <div className="ranking__main-chart">
              <TiempoRespuestaTable />
            </div>
            <div className="ranking__side-widget">
              <ReporteForm />
            </div>
          </div>
        </>
      )}
    </PageLayout>
  )
}
