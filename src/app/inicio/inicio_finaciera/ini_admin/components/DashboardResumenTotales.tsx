"use client";

import { useMemo } from "react";
import { useDashboard } from "../hook/useDashboard";
import { formatCurrency } from "../utils/formatCurrency";
import { AnimatedCounter } from "../components/AnimatedCounter";
import "./DashboardResumenTotales.css";

export function DashboardResumenTotales() {
  const { data, error, loading } = useDashboard();

  // 👇 Siempre declarar hooks antes de condiciones
  const cards = useMemo(() => {
    if (!data) return [];
    return [
      { label: "Total Liberado", value: data.totalLiberado, color: "green" },
      { label: "Total Asignado", value: data.totalAsignado, color: "black" },
      { label: "Total Restante", value: data.totalRestante, color: "orange" },
    ];
  }, [data]);

  if (loading || !data) {
    // Skeleton visual para mantener layout
    return (
      <div className="dashboard-resumen-totales">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="total-card skeleton-card" />
        ))}
      </div>
    );
  }

  if (error) return <p className="error-msg">Error: {error}</p>;

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
