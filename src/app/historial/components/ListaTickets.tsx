"use client"

import { useEffect, useState } from "react"
import { Ticket } from "../model/ticket_model"
import { fetchTickets } from "../service/ticket_service"
import { fetchTicketDetail } from "../service/ticket_detail_service"
import { TicketDetail } from "../model/ticket_detail_model"
import { useAuth } from "@/context/AuthContext"
import { Eye } from "lucide-react"
import DetalleModal from "./DetalleModal"
import "./TablaSolicitudes.css"

export default function TablaSolicitudes() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<TicketDetail | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchTickets()
      .then(data => {
        const solicitudes = data.filter(ticket => ticket.ticketType === "SOLICITUD")
        setTickets(solicitudes)
      })
      .finally(() => setLoading(false))
  }, [])

  const capitalizarNombre = (nombreCompleto: string) =>
    nombreCompleto
      .toLowerCase()
      .split(" ")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ")

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return new Intl.DateTimeFormat("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(fecha)
  }

  const calcularDiasRestantes = (fechaCreacion: string) => {
    const fechaInicio = new Date(fechaCreacion)
    const hoy = new Date()
    const diferencia = Math.floor((fechaInicio.getTime() + 6 * 86400000 - hoy.getTime()) / 86400000)

    if (diferencia < 0) return { texto: "Rebasado", clase: "tiempo-rebasado" }
    if (diferencia <= 1) return { texto: `Expira en ${diferencia} día`, clase: "tiempo-urgente" }
    return { texto: `Expira en ${diferencia} días`, clase: "tiempo-normal" }
  }

  const abrirModal = async (ticketId: number) => {
    try {
      const detalle = await fetchTicketDetail(ticketId)
      setSelectedTicket(detalle)
      setShowModal(true)
    } catch (error) {
      console.error("Error al obtener el detalle:", error)
    }
  }

  return (
    <div className="tabla-solicitudes-container">
      <h2 className="titulo-tabla">Solicitudes no asignadas</h2>

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : tickets.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <table className="tabla-solicitudes">
          <thead>
            <tr>
              <th>Financiera</th>
              <th>Nombre del Usuario</th>
              <th>Tipo de Aclaración</th>
              <th>Fecha de Creación</th>
              <th>Estatus</th>
              <th>Tiempo restante</th>
              <th>Asignado a</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => {
              const tiempo = calcularDiasRestantes(ticket.creationDate)
              const nombre = capitalizarNombre(ticket.user)
              const fecha = formatearFecha(ticket.creationDate)

              return (
                <tr key={ticket.ticketId}>
                  <td>{ticket.lenderName || "#"}</td>
                  <td>{nombre}</td>
                  <td>{ticket.clarificationType || "—"}</td>
                  <td>{fecha}</td>
                  <td>
                    <span className={`status-tag ${ticket.status.toLowerCase()}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <span className={`tiempo-tag ${tiempo.clase}`}>{tiempo.texto}</span>
                  </td>
                  <td>
                    {ticket.assignedTo
                      ? capitalizarNombre(ticket.assignedTo)
                      : "Sin asignar"}
                  </td>
                  <td>
                    <Eye className="icon-eye" onClick={() => abrirModal(ticket.ticketId)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {showModal && selectedTicket && (
        <DetalleModal
          ticket={selectedTicket}
          onClose={() => {
            setShowModal(false)
            setSelectedTicket(null)
          }}
        />
      )}
    </div>
  )
}
