"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { useDashboard } from "../hook/useDashboard"
import "./DashboardHistorialContratos.css"
import { useState } from "react"

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}
      >
        <strong style={{ display: "block", marginBottom: 4 }}>{label}</strong>
        <span style={{ color: "#2D9CDB" }}>
          Contratos cerrados: {payload[0].value}
        </span>
      </div>
    )
  }
  return null
}

export function DashboardHistorialContratos() {
  const { data, loading, error } = useDashboard()
  const [vista, setVista] = useState<"mes" | "trimestre" | "anio">("mes")

  if (loading) return <p>Cargando historial de contratos...</p>
  if (error) return <p>{error}</p>
  if (!data || !data.contratosCerradosPorMes.length) return <p>No hay datos disponibles.</p>

  const currentYear = new Date().getFullYear()

  const filteredByYear = data.contratosCerradosPorMes.filter((item) =>
    item.month.startsWith(`${currentYear}-`)
  )

  let formattedData: { label: string; contractCount: number }[] = []

  if (vista === "mes") {
    const dataPorMes: { [mes: number]: number } = {}
    for (let i = 1; i <= 12; i++) dataPorMes[i] = 0

    filteredByYear.forEach((item) => {
      const mes = parseInt(item.month.split("-")[1])
      dataPorMes[mes] += item.contractCount
    })

    formattedData = Object.keys(dataPorMes).map((key) => {
      const mesIndex = parseInt(key) - 1
      return {
        label: MESES_ES[mesIndex],
        contractCount: dataPorMes[parseInt(key)]
      }
    })
  }

  else if (vista === "trimestre") {
    const trimestres: { [key: string]: number } = { T1: 0, T2: 0, T3: 0, T4: 0 }

    filteredByYear.forEach(item => {
      const mes = parseInt(item.month.split("-")[1])
      const trimestre =
        mes <= 3 ? "T1" :
        mes <= 6 ? "T2" :
        mes <= 9 ? "T3" : "T4"
      trimestres[trimestre] += item.contractCount
    })

    formattedData = ["T1", "T2", "T3", "T4"].map((t) => ({
      label: t,
      contractCount: trimestres[t]
    }))
  }

  else if (vista === "anio") {
    const grouped: { [year: string]: number } = {}
    data.contratosCerradosPorMes.forEach((item) => {
      const year = item.month.split("-")[0]
      grouped[year] = (grouped[year] || 0) + item.contractCount
    })

    formattedData = Object.entries(grouped)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([label, contractCount]) => ({ label, contractCount }))
  }

  return (
    <div className="dashboard-historial">
      <div className="historial-header">
        <h3>Contratos cerrados</h3>
        <div className="tabs">
          <button className={`tab ${vista === "mes" ? "active" : ""}`} onClick={() => setVista("mes")}>
            Mes
          </button>
          <button className={`tab ${vista === "trimestre" ? "active" : ""}`} onClick={() => setVista("trimestre")}>
            Trimestre
          </button>
          <button className={`tab ${vista === "anio" ? "active" : ""}`} onClick={() => setVista("anio")}>
            Año
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="contractCount"
            stroke="#2D9CDB"
            fill="#E6F4FD"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
