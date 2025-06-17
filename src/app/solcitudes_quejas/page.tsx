"use client"

import { useEffect, useState, useCallback } from "react"
import { Ticket } from "./model/ticket.model"
import TicketsTableAdmin from "./components/TicketsTableAdmin"
import { PageLayout } from "@/components/PageLayout"
import { fetchTicketsByStatus1 } from "./services/ticket.service"
import ResumenSolicitudesAdmin from "./components/ResumenSolicitudesAdmin"
import FiltrosSolicitudesAdmin from "./components/FiltrosSolicitudesAdmin"
import { Pagination } from "../cartera-clientes/components/Pagination"
import { CarteraHeader } from "./components/headerSolicitudes"


export default function TicketsPageAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [filtros, setFiltros] = useState({
    tipo: "TODOS",
    estatus: "TODOS",
    financiera: "TODAS",
    tiempo: "TODO"
  })

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchTicketsByStatus1([1, 2, 3], {
          page: currentPage - 1,
          size: 10
        })
        if (isMounted) {
          setTickets(data.content)
          setTotalPages(data.totalPages)
        }
      } catch (error) {
        console.error("Error al obtener tickets:", error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => { isMounted = false }
  }, [currentPage])

  const handleFiltroChange = useCallback((nuevoFiltro: typeof filtros) => {
    setFiltros(nuevoFiltro)
    setCurrentPage(1)
  }, [])

  const ticketsFiltrados = tickets
    .filter(t => filtros.tipo === "TODOS" || t.ticketType === filtros.tipo)
    .filter(t => filtros.estatus === "TODOS" || t.status === filtros.estatus)
    .filter(t => filtros.financiera === "TODAS" || t.lenderName === filtros.financiera)
    .filter(t => {
      if (filtros.tiempo === "TODO") return true
      const fecha = new Date(t.creationDate)
      const ahora = new Date()
      const dias = (ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24)
      if (filtros.tiempo === "MES") return dias <= 30
      if (filtros.tiempo === "3MESES") return dias <= 90
      if (filtros.tiempo === "AÑO") return dias <= 365
      return true
    })

  return (
    <PageLayout>
      <CarteraHeader />

      {!loading && (
        <>
          <ResumenSolicitudesAdmin tickets={ticketsFiltrados} />
          <FiltrosSolicitudesAdmin tickets={tickets} onChange={handleFiltroChange} />
        </>
      )}

      <TicketsTableAdmin tickets={ticketsFiltrados} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageLayout>
  )
}
