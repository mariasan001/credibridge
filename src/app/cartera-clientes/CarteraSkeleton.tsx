"use client";

import "./CarteraSkeleton.css";

export default function CarteraSkeleton() {
  return (
    <div className="cartera-skeleton">
      <div className="skeleton-resumen-row">
        <div className="skeleton-box resumen" />
        <div className="skeleton-box resumen" />
        <div className="skeleton-box resumen" />
        <div className="skeleton-box resumen sm" />
        <div className="skeleton-box resumen sm" />
      </div>

      <div className="skeleton-filter-bar">
        <div className="skeleton-box filtro" />
        <div className="skeleton-box filtro" />
        <div className="skeleton-box filtro" />
        <div className="skeleton-box boton" />
      </div>

      <div className="skeleton-tabla">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skeleton-row-tabla" />
        ))}
      </div>
    </div>
  );
}
