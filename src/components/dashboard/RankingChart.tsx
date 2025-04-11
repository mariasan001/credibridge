"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import Select from "react-select"
import { ClientOnly } from "@/components/ClientOnly"

const mockData = [
  { name: "Ene", atendidas: 120, expiradas: 50 },
  { name: "Feb", atendidas: 150, expiradas: 5 },
  { name: "Mar", atendidas: 200, expiradas: 90 },
  { name: "Abr", atendidas: 300, expiradas: 70 },
  { name: "May", atendidas: 320, expiradas: 205 },
  { name: "Jun", atendidas: 350, expiradas: 20 },
  { name: "Jul", atendidas: 600, expiradas: 105 },
]

const institutionOptions = [
  { value: "todas", label: "Todas las instituciones" },
  { value: "aseguradora1", label: "Aseguradora 1" },
  { value: "aseguradora2", label: "Aseguradora 2" },
]

export const RankingChart = () => {
  const [tipo, setTipo] = useState<"solicitudes" | "quejas">("solicitudes")
  const [periodo, setPeriodo] = useState("12 meses")
  const [selectedInstitution, setSelectedInstitution] = useState(institutionOptions[0])

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

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--color-bg-container)",
      borderColor: "var(--color-border)",
      color: "var(--color-text-main)",
      borderRadius: "8px",
      fontSize: "13px",
      boxShadow: "none",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "var(--color-text-main)",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--color-bg-container)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--color-general-naranja)"
        : state.isFocused
        ? "var(--color-bg-main)"
        : "var(--color-bg-container)",
      color: state.isSelected
        ? "var(--color-text-contrast)"
        : "var(--color-text-main)",
    }),
  }
  

  return (
    <ClientOnly>
      <div className="ranking-chart">
        <div className="ranking-chart__header">
          <div className="ranking-chart__top-row">
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

          <div className="ranking-chart__bottom-row">
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
              <Select
                options={institutionOptions}
                value={selectedInstitution}
                onChange={(selected) => setSelectedInstitution(selected!)}
                styles={customStyles}
                isSearchable={false}
              />
            </div>
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

            <CartesianGrid strokeDasharray="1 5" vertical={false} stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="atendidas" stroke="#00b894" fill="url(#colorAtendidas)" strokeWidth={2} />
            <Area type="monotone" dataKey="expiradas" stroke="#d63031" fill="url(#colorExpiradas)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ClientOnly>
  )
}
