"use client"
import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"

import { ResumenPeriodoSkeleton } from "@/app/comparativas/resumen-periodo/components/ResumenPeriodoSkeleton"
import { HeaderResumen } from "@/app/comparativas/resumen-periodo/components/HeaderResumen"
import { FiltrosPeriodo } from "@/app/comparativas/resumen-periodo/components/FiltrosPeriodo"
import { TablaResumen } from "@/app/comparativas/resumen-periodo/components/TablaResumen"

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
