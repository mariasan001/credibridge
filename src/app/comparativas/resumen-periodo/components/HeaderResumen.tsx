"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import "./HeaderResumen.css"

export const HeaderResumen = () => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false)

  const opciones = ["Descargar PDF", "Descargar Excel"]

  return (
    <div className="header-resumen">
      <div className="header-resumen__text">
        <h1 className="header-resumen__title">Resumen del periodo</h1>
        <p className="header-resumen__subtitle">Ingresa los datos correspondientes</p>
      </div>

      <div className="header-resumen__dropdown">
        <button
          className="dropdown-btn"
          onClick={() => setMostrarOpciones(!mostrarOpciones)}
        >
          <Download size={18} />
          <span>Opciones de descarga</span>
        </button>

        {mostrarOpciones && (
          <ul className="dropdown-menu">
            {opciones.map((opcion, index) => (
              <li key={index} className="dropdown-item">
                {opcion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
