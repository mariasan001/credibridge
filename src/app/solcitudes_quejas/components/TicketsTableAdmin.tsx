"use client"

import { useMemo } from "react"
import { capitalizeWords } from "@/app/prospectos/utils/capitalize"
import { Ticket } from "../model/ticket.model"
import "./TicketsTableAdmin.css"

interface Props {
  tickets: Ticket[]
}

function calcularTiempoRestante(ticket: Ticket): string | null {
  if (ticket.status === "RESUELTO") return null

  const fechaUltimaRespuesta = new Date(ticket.lastResponse)
  const ahora = new Date()
  const msPorDia = 1000 * 60 * 60 * 24
  const diasPasados = Math.floor((ahora.getTime() - fechaUltimaRespuesta.getTime()) / msPorDia)
  const diasRestantes = 17 - diasPasados

  if (diasRestantes > 1) return `Expira en ${diasRestantes} días`
  if (diasRestantes === 1) return `Expira mañana`
  if (diasRestantes === 0) return `Expira hoy`
  return `Expiró hace ${Math.abs(diasRestantes)} días`
}

function getTiempoClass(texto: string | null) {
  if (!texto) return ""
  if (texto.includes("Expira en") && !texto.includes("1 día")) return "green"
  if (texto.includes("Expira mañana") || texto.includes("Expira hoy")) return "orange"
  if (texto.includes("Expira en 1 día")) return "yellow"
  if (texto.includes("Expiró")) return "red"
  return ""
}

function calcularTiempoDeResolucion(ticket: Ticket): string {
  const inicio = new Date(ticket.creationDate)
  const fin = new Date(ticket.lastResponse)
  const msPorDia = 1000 * 60 * 60 * 24
  const dias = Math.floor((fin.getTime() - inicio.getTime()) / msPorDia)

  if (dias === 0) return "Resuelto el mismo día"
  if (dias === 1) return "Resuelto en 1 día"
  return `Resuelto en ${dias} días`
}

export default function TicketsTableAdmin({ tickets }: Props) {
  const filas = useMemo(() => {
    return tickets.map(ticket => {
      const tiempoRestante = calcularTiempoRestante(ticket)
      const claseTiempo = getTiempoClass(tiempoRestante)

      const tipo = capitalizeWords(ticket.ticketType)
      const estatus = capitalizeWords(ticket.status)
      const financiera = capitalizeWords(ticket.lenderName)
      const aclaracion = capitalizeWords(ticket.clarificationType || "—")
      const asignado = capitalizeWords(ticket.assignedTo || "No asignado")
      const usuario = capitalizeWords(ticket.user)

      const claseEstatus =
        ticket.status === "ABIERTO"
          ? "tag blue"
          : ticket.status === "RESUELTO"
          ? "tag green"
          : "tag gray"

      return (
        <tr key={ticket.ticketId}>
          <td>{ticket.ticketId}</td>
          <td><span className="tag gray">{tipo}</span></td>
          <td><span className={claseEstatus}>{estatus}</span></td>
          <td className="cell-ellipsis">{financiera}</td>
          <td className="cell-ellipsis">{aclaracion}</td>
          <td className="cell-ellipsis">{asignado}</td>
          <td className="cell-ellipsis">{usuario}</td>
          <td>
            {tiempoRestante && (
              <span className={`tag ${claseTiempo}`}>{tiempoRestante}</span>
            )}
          </td>
          <td>
            {ticket.status === "RESUELTO" ? (
              <span className="tag gray">{calcularTiempoDeResolucion(ticket)}</span>
            ) : (
              "—"
            )}
          </td>
        </tr>
      )
    })
  }, [tickets])

  return (
    <div className="tickets-table-admin">
      <table className="tabla-contratos contracts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Estatus</th>
            <th>Financiera</th>
            <th>Aclaración</th>
            <th>Asignado a</th>
            <th>Usuario</th>
            <th>Tiempo restante</th>
            <th>Tiempo de resolución</th>
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </table>
    </div>
  )
}
