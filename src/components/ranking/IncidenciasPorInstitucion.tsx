"use client"

import { useState } from "react"
import "./incidencias.css"

interface InstitucionData {
  nombre: string
  cantidad: number
  max: number
}

const datosPorPeriodo: Record<string, InstitucionData[]> = {
  "7 días": [
    { nombre: "Administradora de caja Bienestar", cantidad: 20, max: 30 },
    { nombre: "ASF servicios Financieros SAPI de CV", cantidad: 11, max: 30 },
    { nombre: "Asociacion Necrologico Mexicana", cantidad: 30, max: 30 },
    { nombre: "Axtu SA de cv sofom enr", cantidad: 1, max: 30 },
    { nombre: "Otra Institución 1", cantidad: 15, max: 30 },
    { nombre: "Otra Institución 2", cantidad: 10, max: 30 },
    { nombre: "Otra Institución 3", cantidad: 5, max: 30 },
    { nombre: "Otra Institución 4", cantidad: 2, max: 30 },
  ],
  "1 mes": [
    { nombre: "Administradora de caja Bienestar", cantidad: 50, max: 60 },
    { nombre: "ASF servicios Financieros SAPI de CV", cantidad: 20, max: 60 },
    { nombre: "Asociacion Necrologico Mexicana", cantidad: 60, max: 60 },
    { nombre: "Axtu SA de cv sofom enr", cantidad: 5, max: 60 },
  ],
  "3 meses": [
    { nombre: "Administradora de caja Bienestar", cantidad: 90, max: 100 },
    { nombre: "ASF servicios Financieros SAPI de CV", cantidad: 40, max: 100 },
    { nombre: "Asociacion Necrologico Mexicana", cantidad: 100, max: 100 },
    { nombre: "Axtu SA de cv sofom enr", cantidad: 15, max: 100 },
  ],
}

export const IncidenciasPorInstitucion = () => {
  const [periodo, setPeriodo] = useState("7 días")
  const datos = datosPorPeriodo[periodo]

  return (
    <div className="incidencias-card">
      <div className="incidencias-header">
        <h3>Incidencias por Institución</h3>
        <select
          className="incidencias-select"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="7 días">7 días</option>
          <option value="1 mes">1 mes</option>
          <option value="3 meses">3 meses</option>
        </select>
      </div>

      <ul className="incidencias-list">
        {datos.map((item, idx) => {
          const porcentaje = (item.cantidad / item.max) * 100
          return (
            <li key={idx} className="incidencias-item">
              <div className="incidencias-item__top">
                <span>{item.nombre}</span>
                <span className="incidencias-item__value">{item.cantidad}</span>
              </div>
              <div className="incidencias-bar">
                <div
                  className="incidencias-bar__fill"
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
