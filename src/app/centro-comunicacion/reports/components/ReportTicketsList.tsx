"use client"

import { useState } from "react"
import "./report-tickets.css"
import { ReportTicket } from "../model/reportTicket.model"
import { TicketModal } from "./TicketModal"

interface Props {
  tickets: ReportTicket[]
}

export const ReportTicketsList = ({ tickets }: Props) => {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  const handleOpenModal = (id: number) => {
    setSelectedTicketId(id)
  }

  const handleCloseModal = () => {
    setSelectedTicketId(null)
  }

  const selectedTicket = tickets.find(t => t.id === selectedTicketId)

  if (tickets.length === 0) return <p>No hay tickets disponibles.</p>

  return (
    <>
      <div className="tickets-list">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="ticket-card"
            onClick={() => handleOpenModal(ticket.id)}
          >
            <div className="ticket-icon">
              {ticket.ticket.ticketType[0] || "?"}
            </div>

            <div className="ticket-content">
              <h4>{ticket.ticket.subject}</h4>
              <p className="ticket-description">{ticket.ticket.description}</p>
              <div className="ticket-tags">
                <span className="ticket-tag">{ticket.ticket.ticketType}</span>
                {ticket.ticket.clarificationType && (
                  <span className="ticket-tag tag-alt">{ticket.ticket.clarificationType}</span>
                )}
              </div>
              <div className="ticket-meta">
                <span>Estado: <strong>{ticket.status}</strong></span> ·
                <span> Fecha: {new Date(ticket.ticket.creationDate).toLocaleDateString("es-MX")}</span>
              </div>
            </div>

            <div className="ticket-extra">
              <span className="ticket-id">#{ticket.id}</span>
              <span className="ticket-from">Usuario: {ticket.ticket.user}</span>
              <span className="ticket-date">Última respuesta: {new Date(ticket.ticket.lastResponse).toLocaleDateString("es-MX")}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={handleCloseModal} />
      )}
    </>
  )
}
