"use client"

import "./TablaSolicitudesSkeleton.css"

export function TablaSolicitudesSkeleton() {
  return (
    <div className="cartera-skeleton">
      {/* Resumen de tarjetas */}
      <div className="skeleton-resumen-row">
        {Array.from({ length: 5}).map((_, i) => (
          <div key={i} className="skeleton-box resumen"></div>
        ))}
      </div>

      {/* Filtros */}
      <div className="skeleton-filter-bar">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-box filtro"></div>
        ))}
        <div className="skeleton-box boton"></div>
      </div>

      {/* Tabla de solicitudes */}
      <div className="skeleton-tabla">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-row-tabla"></div>
        ))}
      </div>
    </div>
  )
}
