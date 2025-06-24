"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import FormularioBroadcastTicket from "./components/FormularioBroadcastTicket"
import { ReportTicketsList } from "./components/ReportTicketsList"
import { ReportTicket } from "./model/reportTicket.model"
import { fetchReportTickets } from "./service/reportTicketsService"
import { useAuth } from "@/context/AuthContext" // 👈 importante
import "./reports-page.css"

export default function RankingDashboardPage() {
  const [tickets, setTickets] = useState<ReportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const userId = user?.userId

  useEffect(() => {
    const cargarTickets = async () => {
      if (!userId) return;

      try {
        const data = await fetchReportTickets(userId)
        setTickets(data)
      } catch (error) {
        console.error("Error al obtener tickets:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarTickets()
  }, [userId])

  return (
    <PageLayout>
      <div className="reportes-layout">
        <div className="reportes-listado">
          <h2>Historial de Tickets</h2>
          <br />
          {loading ? <p>Cargando tickets...</p> : <ReportTicketsList tickets={tickets} />}
        </div>

        <div className="reportes-formulario">
          <FormularioBroadcastTicket />
        </div>
      </div>
    </PageLayout>
  )
}
