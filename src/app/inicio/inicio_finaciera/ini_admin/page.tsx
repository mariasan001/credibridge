"use client"

import { PageLayout } from "@/components/PageLayout"
import { DashboardHistorialContratos } from "./components/DashboardHistorialContratos"
import { DashboardResumen } from "./components/DashboardResumen"
import { DashboardResumenTotales } from "./components/DashboardResumenTotales"
import "./dashboard.css"

export default function DashboardPage() {
  return (
    <PageLayout>
      <div className="dashboard-page">
        <h2 className="dashboard-title">Panel de Control</h2>
        <p className="dashboard-subtitle">podrás ver tu tendencia de préstamos obtenidos a tiempo real</p>

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
    </PageLayout>
  )
}
