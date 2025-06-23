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
    { nombre: "Kueski", cantidad: 20, max: 30 },
    { nombre: "Creditea", cantidad: 11, max: 30 },
    { nombre: "Credifiel", cantidad: 30, max: 30 },
    { nombre: "Yotepresto", cantidad: 1, max: 30 },
    { nombre: "Konfío", cantidad: 15, max: 30 },
    { nombre: "Credilikeme", cantidad: 10, max: 30 },
    { nombre: "Moneyman", cantidad: 5, max: 30 },
    { nombre: "Bayport", cantidad: 2, max: 30 },
  ],
  "1 mes": [
    { nombre: "Kueski", cantidad: 50, max: 60 },
    { nombre: "Creditea", cantidad: 20, max: 60 },
    { nombre: "Credifiel", cantidad: 60, max: 60 },
    { nombre: "Yotepresto", cantidad: 5, max: 60 },
  ],
  "3 meses": [
    { nombre: "Kueski", cantidad: 90, max: 100 },
    { nombre: "Creditea", cantidad: 40, max: 100 },
    { nombre: "Credifiel", cantidad: 100, max: 100 },
    { nombre: "Yotepresto", cantidad: 15, max: 100 },
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
