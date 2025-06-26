"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DashboardHistorialContratos } from "./components/DashboardHistorialContratos";
import { DashboardResumen } from "./components/DashboardResumen";
import DashboardSkeletonPage from "./DashboardSkeleton";
import "./dashboard.css";
import "./DashboardSkeleton.css";
import { DashboardResumenTotales } from "./components/DashboardResumenTotales";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timerId = `🧠 Carga inicial Dashboard ${Date.now()}`;
    console.time(timerId);

    const loadDashboard = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1200)); // Simulación de carga
      } catch (error) {
        console.error("❌ Error cargando dashboard", error);
      } finally {
        setLoading(false);
        console.timeEnd(timerId);
      }
    };

    loadDashboard();
  }, []);

  return (
    <PageLayout>
      {loading ? (
        <DashboardSkeletonPage />
      ) : (
        <div className="dashboard-page">
          <h2 className="dashboard-title">Panel de Control</h2>
          <p className="dashboard-subtitle">
            Podrás ver tu tendencia de préstamos obtenidos en tiempo real
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
