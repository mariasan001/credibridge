"use client" // Necesario para usar hooks del lado del cliente en Next.js

import { useState } from "react"
import "./reporte.css" // Estilos personalizados del formulario

// Lista de instituciones disponibles para seleccionar en el formulario
const institucionesDisponibles = [
  "Administradora de Caja Bienestar SA de CV",
  "ASF servicios Financieros SAPI de CV",
  "Asociación Necrológica Mexicana",
]

// Opciones de etiquetas con color de fondo y color de texto
const etiquetas = [
  {
    label: "Aclaración",
    color: "var(--color-bg-warning)",
    textColor: "var(--color-text-warning)",
  },
  {
    label: "Queja",
    color: "var(--color-bg-danger)",
    textColor: "var(--color-text-danger)",
  },
]

// Componente principal del formulario
export const ReporteForm = () => {
  // Estado que guarda la etiqueta seleccionada (Aclaración o Queja)
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(etiquetas[0])

  // Estado que guarda las instituciones seleccionadas (se pueden agregar varias)
  const [instituciones, setInstituciones] = useState<string[]>([institucionesDisponibles[0]])

  // Estado para el contenido del textarea de descripción
  const [descripcion, setDescripcion] = useState("")

  // Función para agregar otra institución al formulario
  const agregarInstitucion = () => {
    const disponibles = institucionesDisponibles.filter(
      (inst) => !instituciones.includes(inst)
    )
    if (disponibles.length > 0) {
      setInstituciones([...instituciones, disponibles[0]])
    }
  }

  return (
    <div className="reporte-card">
      <h3>Levantar Reporte</h3>

      {/* === Selector de etiqueta tipo chip === */}
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
                style={{
                  color: isActive ? etiqueta.textColor : "var(--color-text-main)",
                }}
              >
                {etiqueta.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* === Selector de instituciones (con opción de agregar más) === */}
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

      {/* Botón para agregar otra institución si aún hay disponibles */}
      {instituciones.length < institucionesDisponibles.length && (
        <button
          type="button"
          onClick={agregarInstitucion}
          className="reporte-agregar"
        >
          <span>➕</span> Agregar Otra Institución
        </button>
      )}

      {/* === Textarea de descripción === */}
      <label>Descripción</label>
      <textarea
        className="reporte-descripcion"
        placeholder="Escribe aquí..."
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      {/* === Botón de envío === */}
      <button className="reporte-enviar">Enviar Reporte</button>
    </div>
  )
}
