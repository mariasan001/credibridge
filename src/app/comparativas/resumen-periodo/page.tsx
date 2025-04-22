"use client"
import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { HeaderResumen } from "./components/HeaderResumen"
import { FiltrosPeriodo } from "./components/FiltrosPeriodo"
import { TablaResumen } from "./components/TablaResumen"
import { ResumenPeriodoSkeleton } from "./components/ResumenPeriodoSkeleton"
import "./resumen.css"

export default function ResumenPeriodoPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <PageLayout>
      {loading ? (
        <ResumenPeriodoSkeleton />
      ) : (
        <div className="resumen-wrapper">
          <HeaderResumen />
          <FiltrosPeriodo />
          <TablaResumen />
        </div>
      )}
    </PageLayout>
  )
}
