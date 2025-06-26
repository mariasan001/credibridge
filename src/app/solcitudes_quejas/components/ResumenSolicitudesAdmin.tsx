"use client"

import { useMemo } from "react"
import { Ticket } from "../model/ticket.model"
import "./ResumenSolicitudesAdmin.css"

interface Props {
  tickets: Ticket[]
}

export default function ResumenSolicitudesAdmin({ tickets }: Props) {
  const resumen = useMemo(() => {
    const ahora = new Date()
    let total = 0
    const financierasSet = new Set<string>()
    let porExpirar = 0
    let noAsignados = 0

    for (const ticket of tickets) {
      total++

      financierasSet.add(ticket.lenderName)

      if (!ticket.assignedTo) noAsignados++

      if (ticket.status !== "RESUELTO") {
        const last = new Date(ticket.lastResponse)
        const dias = Math.floor((ahora.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
        const restantes = 17 - dias
        if (restantes >= 0 && restantes <= 3) porExpirar++
      }
    }

    return {
      total,
      financieras: financierasSet.size,
      porExpirar,
      noAsignados,
    }
  }, [tickets])

  return (
    <div className="resumen-admin-grid">
      <div className="resumen-card blanco">
        <h4>Total de Solicitudes</h4>
        <p>{resumen.total}</p>
      </div>

      <div className="resumen-card blanco">
        <h4>Financieras distintas</h4>
        <p>{resumen.financieras}</p>
      </div>

      <div className="resumen-card verde">
        <h4>Por expirar (≤ 3 días)</h4>
        <p>{resumen.porExpirar}</p>
      </div>

      <div className="resumen-card rojo">
        <h4>No asignados</h4>
        <p>{resumen.noAsignados}</p>
      </div>
    </div>
  )
}
