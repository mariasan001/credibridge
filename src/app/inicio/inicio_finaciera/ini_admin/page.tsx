"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DashboardHistorialContratos } from "./components/DashboardHistorialContratos";
import { DashboardResumen } from "./components/DashboardResumen";
import DashboardSkeletonPage from "./DashboardSkeleton";
import "./dashboard.css";
import "./DashboardSkeleton.css";
import { DashboardResumenTotales } from "./components/DashboardResumenTotales";
import { CarteraHeader } from "./components/CarteraHeader";

let dashboardAlreadyLoaded = false; // 💡 Persistente durante sesión (módulo scope)

export default function DashboardPage() {
  const [loading, setLoading] = useState(!dashboardAlreadyLoaded);

  useEffect(() => {
    if (dashboardAlreadyLoaded) return;

    const timerId = `🧠 Carga inicial Dashboard ${Date.now()}`;
    console.time(timerId);

    const loadDashboard = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1200)); // Simula carga real
      } catch (error) {
        console.error("❌ Error cargando dashboard", error);
      } finally {
        dashboardAlreadyLoaded = true;
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
          <CarteraHeader />

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
