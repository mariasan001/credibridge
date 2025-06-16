"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./Contratos.css"
import { PageLayout } from "@/components/PageLayout"

export function AmortizationSkeleton() {
  return (
     <PageLayout>
    <div className="amortizacion-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <Skeleton height={32} width={250} />
        <Skeleton height={20} width={300} style={{ marginTop: 8 }} />
      </div>

      <div className="resumen-contrato-skeleton">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Skeleton height={60} width={120} />
          <Skeleton height={60} width={160} />
          <Skeleton height={60} width={160} />
          <Skeleton height={60} width={100} />
        </div>
      </div>

      <div className="amortizacion-body">
        <div style={{ width: "35%" }}>
          <Skeleton height={320} />
        </div>

        <div className="amortizacion-tablas" style={{ width: "62%" }}>
          <Skeleton height={260} style={{ marginBottom: "1rem" }} />
          <Skeleton height={150} />
        </div>
      </div>
    </div>
    </PageLayout>
  )
}
