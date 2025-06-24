"use client"

import "./ticket-modal.css"
import { ReportTicket } from "../model/reportTicket.model"

interface Props {
  ticket: ReportTicket
  onClose: () => void
}

export const TicketModal = ({ ticket, onClose }: Props) => {
  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
        <header className="ticket-header">
          <div className="ticket-title">
            <h3>Conversación del ticket</h3>
            <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </span>
          </div>

          <div className="ticket-avatar-top">
            <div className="avatar">
              {ticket.participants[0]?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
          </div>

          <button
            className="close-button"
            onClick={onClose}
            aria-label="Cerrar modal"
            title="Cerrar"
          >
            ✕
          </button>
        </header>

        <section className="ticket-body">
          <main className="conversation">
            <div className="messages">
              {ticket.messageDtos.map((m) => (
                <div key={m.id} className="message">
                  <div className="avatar small">
                    {m.senderId.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="bubble-group">
                    <div className="bubble">{m.content}</div>
                    <small className="timestamp">
                      {new Date(m.sentAt).toLocaleString("es-MX")}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            <form className="message-input" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Escribe un mensaje..." />
              <button type="submit">Enviar</button>
            </form>
          </main>
        </section>
      </div>
    </div>
  )
}
