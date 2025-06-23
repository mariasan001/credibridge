"use client"

import { useState } from "react"
import "./ContractsAdminFilters.css"
import { Landmark, Layers, HelpCircle, CalendarDays } from "lucide-react"

interface Props {
  onFilterChange: (filters: FiltersState) => void
  financieras: string[]
  estatuses: string[]
  servicios: string[]
}

export interface FiltersState {
  servidor: string
  financiera: string
  estatus: string
  servicio: string
}

export default function ContractsAdminFilters({
  onFilterChange,
  financieras,
  estatuses,
  servicios
}: Props) {
  const [filters, setFilters] = useState<FiltersState>({
    servidor: "",
    financiera: "",
    estatus: "",
    servicio: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Tipo</label>
<div className="filter-input">
  <HelpCircle size={16} className="filter-icon" />
  <select name="servicio" value={filters.servicio} onChange={handleChange}>
    <option value="">Todos</option>
    {servicios.map((s, i) => (
      <option key={i} value={s}>{s}</option>
    ))}
  </select>
</div>

      </div>

      <div className="filter-group">
        <label>Estatus</label>
        <div className="filter-input">
          <Layers size={16} className="filter-icon" />
          <select name="estatus" value={filters.estatus} onChange={handleChange}>
            <option value="">Todos</option>
            {estatuses.map((e, i) => (
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label>Financiera</label>
        <div className="filter-input">
          <Landmark size={16} className="filter-icon" />
          <select name="financiera" value={filters.financiera} onChange={handleChange}>
            <option value="">Todas</option>
            {financieras.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label>Tiempo</label>
        <div className="filter-input">
          <CalendarDays size={16} className="filter-icon" />
          <select name="tiempo" onChange={handleChange}>
            <option value="">Todo el tiempo</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 3 meses</option>
          </select>
        </div>
      </div>
    </div>
  )
}
