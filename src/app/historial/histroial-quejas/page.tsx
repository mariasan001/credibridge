"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { TablaSolicitudesSkeleton } from "../historia-solicitudes/TablaSolicitudesSkeleton"
import ResumenSolicitudes from "../components/ResumenQuejas"
import TablaSolicitudes from "../components/ListaTiketQuejas"
import { CarteraHeader } from "../components/TiketHeaderQueja"

export default function TablaSolicitudesPage() {
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const timeout = setTimeout(() => setLoading(false), 1000)
  return () => clearTimeout(timeout)
}, [])

  return (
    <PageLayout>
      <CarteraHeader />
      {loading ? (
        <TablaSolicitudesSkeleton />
      ) : (
        <>
          <ResumenSolicitudes />
          <TablaSolicitudes />
        </>
      )}
    </PageLayout>
  )
}
