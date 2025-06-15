"use client";

import { useDashboard } from "../hook/useDashboard";
import { formatCurrency } from "../utils/formatCurrency";
import { AnimatedCounter } from "../components/AnimatedCounter"; // 👈 Asegúrate de crearlo
import "./DashboardResumenTotales.css";

export function DashboardResumenTotales() {
  const { data, error, loading } = useDashboard();

  if (loading || !data) return null;
  if (error) return <p>{error}</p>;

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
  ];

  return (
    <div className="dashboard-resumen-totales">
      {cards.map((card) => (
        <div key={card.label} className="total-card">
          <span className="total-label">{card.label.toUpperCase()}</span>
          <span className={`total-value ${card.color}`}>
            <AnimatedCounter value={card.value} formatter={formatCurrency} />
          </span>
        </div>
      ))}
    </div>
  );
}
