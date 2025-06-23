"use client"

import { Building2, Banknote, CalendarDays } from "lucide-react"
import "./FiltrosPeriodo.css"

export const FiltrosPeriodo = () => {
  return (
    <div className="filtros-periodo">
      <div className="filtro-item">
        <label htmlFor="nomina">Nómina</label>
        <div className="filtro-select-wrapper">
          <Building2 className="filtro-icon" size={18} />
          <select id="nomina">
            <option value="edomex">Nómina Consolidada</option>
            <option value="otros">Otro</option>
          </select>
        </div>
      </div>

      <div className="filtro-item">
        <label htmlFor="institucion">Institución</label>
        <div className="filtro-select-wrapper">
          <Banknote className="filtro-icon" size={18} />
          <select id="institucion">
            <option value="edomex">Hospital Privado Del Bosque</option>
            <option value="otra">Otra Institución</option>
          </select>
        </div>
      </div>

      <div className="filtro-item">
        <label htmlFor="periodo">Periodo</label>
        <div className="filtro-select-wrapper">
          <CalendarDays className="filtro-icon" size={18} />
          <select id="periodo">
            <option value="todos">Todos</option>
            <option value="202304">202304</option>
            <option value="202305">202305</option>
          </select>
        </div>
      </div>
    </div>
  )
}
