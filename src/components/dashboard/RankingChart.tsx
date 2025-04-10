"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

const mockData = [
  { name: "Ene", atendidas: 120, expiradas: 50 },
  { name: "Feb", atendidas: 150, expiradas: 5 },
  { name: "Mar", atendidas: 200, expiradas: 90 },
  { name: "Abr", atendidas: 300, expiradas: 70 },
  { name: "May", atendidas: 320, expiradas: 205 },
  { name: "Jun", atendidas: 350, expiradas: 20 },
  { name: "Jul", atendidas: 600, expiradas: 105 }
]

export const RankingChart = () => {
  const [tipo, setTipo] = useState<"solicitudes" | "quejas">("solicitudes")
  const [periodo, setPeriodo] = useState("12 meses")

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="ranking-chart__tooltip">
          <strong className="text-title__tooltip">{label}</strong>
          <p className="text-tooltip">Atendidas : {payload[0].value}</p>
          <p className="text-tooltip">Expiradas : {payload[1].value}</p>
        </div>
      )
    }
    return null
  }

  const periodos = ["12 meses", "6 meses", "30 días", "7 días"]

  return (
    <div className="ranking-chart">
      <div className="ranking-chart__header">
        <div className="ranking-chart__title-group">
          <h3 className="ranking-chart__title">Ranking</h3>
          <div className="ranking-chart__period-buttons">
            {periodos.map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`ranking-chart__btn ${periodo === p ? "active" : ""}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      <div className="ranking-chart__institution-filter">
       
      </div>

        <div className="ranking-chart__toggle">
          <button
            className={tipo === "quejas" ? "active" : ""}
            onClick={() => setTipo("quejas")}
          >
            Quejas
          </button>
          <button
            className={tipo === "solicitudes" ? "active" : ""}
            onClick={() => setTipo("solicitudes")}
          >
            Solicitudes
          </button>
        </div>
        <div className="ranking-chart__institution-filter">
          <select>
            <option value="todas">Todas las instituciones</option>
            <option value="aseguradora1">Aseguradora 1</option>
            <option value="aseguradora2">Aseguradora 2</option>
            {/* Agrega más según lo necesites */}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={mockData}>
          <defs>
            <linearGradient id="colorAtendidas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#61CD88" stopOpacity={0.4} />
             
            </linearGradient>
            <linearGradient id="colorExpiradas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#d63031" stopOpacity={0.7} />
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="atendidas"
            stroke="#00b894"
            fill="url(#colorAtendidas)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="expiradas"
            stroke="#d63031"
            fill="url(#colorExpiradas)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
