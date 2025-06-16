"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { CarteraHeader } from "../components/TiketHeader"
import ResumenSolicitudes from "../components/ResumenSolicitudes"
import TablaSolicitudes from "../components/ListaTickets"
import { TablaSolicitudesSkeleton } from "../historia-solicitudes/TablaSolicitudesSkeleton"

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
