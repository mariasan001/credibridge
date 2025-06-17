"use client"

import { Ticket } from "../model/ticket.model"
import "./ResumenSolicitudesAdmin.css"

interface Props {
  tickets: Ticket[]
}

export default function ResumenSolicitudesAdmin({ tickets }: Props) {
  const total = tickets.length
  const financieras = new Set(tickets.map(t => t.lenderName)).size

  const porExpirar = tickets.filter(ticket => {
    if (ticket.status === "RESUELTO") return false
    const last = new Date(ticket.lastResponse)
    const ahora = new Date()
    const diffMs = ahora.getTime() - last.getTime()
    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const restantes = 17 - dias
    return restantes >= 0 && restantes <= 3
  }).length

  const noAsignados = tickets.filter(t => !t.assignedTo).length

  return (
    <div className="resumen-admin-grid">
      <div className="resumen-card blanco">
        <h4>Total de Solicitudes</h4>
        <p>{total}</p>
      </div>

      <div className="resumen-card blanco">
        <h4>Financieras distintas</h4>
        <p>{financieras}</p>
      </div>

      <div className="resumen-card verde">
        <h4>Por expirar (≤ 3 días)</h4>
        <p>{porExpirar}</p>
      </div>

      <div className="resumen-card rojo">
        <h4>No asignados</h4>
        <p>{noAsignados}</p>
      </div>
    </div>
  )
}
