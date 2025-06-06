"use client"

import { useDashboard } from "../hook/useDashboard"
import "./DashboardResumen.css"

export function DashboardResumen() {
  const { data, loading, error } = useDashboard()

  if (loading) return <p>Cargando datos...</p>
  if (error) return <p>{error}</p>
  if (!data) return null

  const resumenes = [
    {
      label: "Total de contratos",
      value: data.totalContratos.toLocaleString("es-MX"),
      color: "verde"
    },
    {
      label: "Quejas",
      value: data.totalQuejas.toLocaleString("es-MX"),
      color: "rojo"
    },
    {
      label: "Aclaraciones",
      value: data.totalAclaraciones.toLocaleString("es-MX"),
      color: "naranja"
    }
  ]

  return (
    <div className="dashboard-resumen-lateral">
      {resumenes.map((item) => (
        <div key={item.label} className={`card-resumen ${item.color}`}>
          <span className="label">{item.label.toUpperCase()}</span>
          <span className="valor">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
