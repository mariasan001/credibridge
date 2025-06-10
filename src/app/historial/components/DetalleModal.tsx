"use client"

import { TicketDetail } from "../model/ticket_detail_model"
import "./DetalleModal.css"

interface Props {
  ticket: TicketDetail
  onClose: () => void
}

export default function DetalleModal({ ticket, onClose }: Props) {
  const capitalizarNombre = (nombre: string) =>
    nombre
      .toLowerCase()
      .split(" ")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ")

  const formatearFechaHora = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return new Intl.DateTimeFormat("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(fecha)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Detalle de la Solicitud</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <strong>Asunto:</strong>
            <p>{ticket.subject}</p>
          </div>

          <div className="modal-section">
            <strong>Descripción:</strong>
            <p>{ticket.description}</p>
          </div>

          <div className="modal-section">
            <strong>Tipo:</strong>
            <p>{ticket.ticketType}</p>
          </div>

          <div className="modal-section">
            <strong>Financiera:</strong>
            <p>{ticket.lenderName || "—"}</p>
          </div>

          <div className="modal-section">
            <strong>Usuario que creó el ticket:</strong>
            <p>{capitalizarNombre(ticket.user)}</p>
          </div>

          <div className="modal-section">
            <strong>Aclaración:</strong>
            <p>{ticket.clarificationType || "—"}</p>
          </div>

          <div className="modal-section">
            <strong>Estado:</strong>
            <p>{ticket.status}</p>
          </div>

          <div className="modal-section">
            <strong>Creado el:</strong>
            <p>{formatearFechaHora(ticket.creationDate)}</p>
          </div>

          <div className="modal-section">
            <strong>Última respuesta:</strong>
            <p>{formatearFechaHora(ticket.lastResponse)}</p>
          </div>

          <div className="modal-section">
            <strong>Conversación:</strong>
            {ticket.messages?.length ? (
              ticket.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message-box ${msg.isInternal ? "interno" : "externo"}`}
                >
                  <p><strong>{capitalizarNombre(msg.senderName)}</strong></p>
                  <p>{msg.content}</p>
                  <div className="message-meta">{formatearFechaHora(msg.sendDate)}</div>
                </div>
              ))
            ) : (
              <p>Sin mensajes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
