"use client";

import React from "react";
import { useDashboard } from "../hook/useDashboard";
import { AnimatedCounter } from "../components/AnimatedCounter";
import "./DashboardResumen.css";

export const DashboardResumen = React.memo(function DashboardResumen() {
  const { data, error, loading } = useDashboard();

  if (loading || !data) return null;
  if (error) return <p>{error}</p>;

  const resumenes = [
    {
      label: "Total de contratos",
      value: data.totalContratos,
      color: "verde",
    },
    {
      label: "Quejas",
      value: data.totalQuejas,
      color: "rojo",
    },
    {
      label: "Aclaraciones",
      value: data.totalAclaraciones,
      color: "naranja",
    },
  ];

  return (
    <div className="dashboard-resumen-lateral">
      {resumenes.map((item) => (
        <div key={item.label} className={`card-resumen ${item.color}`}>
          <span className="label">{item.label.toUpperCase()}</span>
          <span className="valor">
            <AnimatedCounter
              value={item.value}
              formatter={(val) => val.toLocaleString("es-MX")}
            />
          </span>
        </div>
      ))}
    </div>
  );
});
