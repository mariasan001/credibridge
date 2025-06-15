"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DashboardHistorialContratos } from "./components/DashboardHistorialContratos";
import { DashboardResumen } from "./components/DashboardResumen";
import { DashboardResumenTotales } from "./components/DashboardResumenTotales";
import "./dashboard.css";
import "./DashboardSkeleton.css"; // si no lo tienes global
import DashboardSkeletonPage from "./DashboardSkeleton";
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Espera al menos 1500ms antes de mostrar componentes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <PageLayout>
      {loading ? (
        <DashboardSkeletonPage />
      ) : (
        <div className="dashboard-page">
          <h2 className="dashboard-title">Panel de Control</h2>
          <p className="dashboard-subtitle">
            podrás ver tu tendencia de préstamos obtenidos a tiempo real
          </p>

          <DashboardResumenTotales />

          <div className="dashboard-body">
            <div className="left">
              <DashboardHistorialContratos />
            </div>
            <div className="right">
              <DashboardResumen />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
