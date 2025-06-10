"use client"
import { useDashboard } from "../hook/useDashboard"
import { formatCurrency } from "../utils/formatCurrency"
import "./DashboardResumenTotales.css"
export function DashboardResumenTotales() {
  const { data, loading, error } = useDashboard()
  if (loading) return <p>Cargando...</p>
  if (error || !data) return null
  const cards = [
    {
      label: "Total Liberado",
      value: data.totalLiberado,
      color: "green",
    },
    {
      label: "Total Asignado",
      value: data.totalAsignado,
      color: "black",
    },
    {
      label: "Total Restante",
      value: data.totalRestante,
      color: "orange",
    },
  ]
  return (
    <div className="dashboard-resumen-totales">
      {cards.map((card) => (
        <div key={card.label} className="total-card">
          <span className="total-label">{card.label.toUpperCase()}</span>
          <span className={`total-value ${card.color}`}>
            {formatCurrency(card.value)}
          </span>
        </div>
      ))}
    </div>
  )
}
