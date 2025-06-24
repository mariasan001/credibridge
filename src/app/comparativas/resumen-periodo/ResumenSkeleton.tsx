"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ResumenSkeleton() {
  return (
    <div className="resumen-periodo-skeleton">
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Skeleton height={30} width={250} />
        <Skeleton height={20} width={300} style={{ marginTop: 8 }} />
      </div>

      {/* Filtros */}
      <div className="skeleton-filtros">
        <Skeleton height={45} width={160} />
        <Skeleton height={45} width={160} />
        <Skeleton height={45} width={300} />
        <Skeleton height={45} width={100} />
        <Skeleton height={45} width={180} />
      </div>

      {/* Tabla */}
      <div className="skeleton-tabla">
        <Skeleton height={40} width="100%" style={{ marginTop: "1.5rem" }} />
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} height={35} width="100%" style={{ marginTop: 10 }} />
        ))}
      </div>
    </div>
  )
}
