"use client"

import { useState } from "react"
import "./reporte.css"

const institucionesDisponibles = [
  "Administradora de Caja Bienestar SA de CV",
  "ASF servicios Financieros SAPI de CV",
  "Asociación Necrológica Mexicana",
]

const etiquetas = [
  { label: "Aclaración", color: "var(--color-bg-warning)", textColor: "var(--color-text-warning)" },
  { label: "Queja", color: "var(--color-bg-danger)", textColor: "var(--color-text-danger)" },
]

export const ReporteForm = () => {
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(etiquetas[0])
  const [instituciones, setInstituciones] = useState<string[]>([institucionesDisponibles[0]])
  const [descripcion, setDescripcion] = useState("")

  const agregarInstitucion = () => {
    const disponibles = institucionesDisponibles.filter(inst => !instituciones.includes(inst))
    if (disponibles.length > 0) {
      setInstituciones([...instituciones, disponibles[0]])
    }
  }

  return (
    <div className="reporte-card">
      <h3>Levantar Reporte</h3>

      {/* Etiqueta */}
      <label>Etiqueta</label>
      <div className="reporte-etiqueta-options">
        {etiquetas.map((etiqueta) => {
          const isActive = etiquetaSeleccionada.label === etiqueta.label
          return (
            <button
              key={etiqueta.label}
              type="button"
              className={`reporte-etiqueta-btn ${isActive ? "active" : ""}`}
              onClick={() => setEtiquetaSeleccionada(etiqueta)}
            >
              <span
                className="reporte-etiqueta-dot"
                style={{ backgroundColor: etiqueta.color }}
              ></span>
              <span
                className="reporte-etiqueta-label"
                style={{ color: isActive ? etiqueta.textColor : "var(--color-text-main)" }}
              >
                {etiqueta.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Instituciones */}
      <label>Institución</label>
      {instituciones.map((inst, i) => (
        <select key={i} className="reporte-institucion">
          {institucionesDisponibles.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ))}
      {instituciones.length < institucionesDisponibles.length && (
        <button type="button" onClick={agregarInstitucion} className="reporte-agregar">
          <span>➕</span> Agregar Otra Institución
        </button>
      )}

      {/* Descripción */}
      <label>Descripción</label>
      <textarea
        className="reporte-descripcion"
        placeholder="Escribe aquí..."
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      {/* Botón de enviar */}
      <button className="reporte-enviar">Enviar Reporte</button>
    </div>
  )
}
