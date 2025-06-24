"use client";

import "./ticket-modal.css";
import { useEffect, useRef, useState } from "react";
import { ReportTicket } from "../model/reportTicket.model";
import { respondTicket } from "@/app/perfil_user/solicitudes_quejas/service/toketResponService";
import { useAuth } from "@/context/AuthContext";

interface Props {
  ticket: ReportTicket;
  onClose: () => void;
}

export const TicketModal = ({ ticket, onClose }: Props) => {
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([...ticket.messageDtos]);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const payload = {
        ticketId: ticket.id,
        senderId: user?.userId || "sin-usuario",
        message,
        isInternal: true,
      };

      await respondTicket(payload);
      console.log("Mensaje enviado");

      // Añadir mensaje a los locales (fake refresh)
      setLocalMessages((prev) => [
        ...prev,
        {
          id: Date.now(), // ID temporal
          senderId: payload.senderId,
          content: payload.message,
          sentAt: new Date().toISOString(),
        },
      ]);

      setMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  // Scroll automático al fondo al recibir mensajes nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  // Ordenar mensajes por fecha
  const sortedMessages = [...localMessages].sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
  );

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
              {sortedMessages.map((m) => (
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
              <div ref={messagesEndRef} />
            </div>

            <form className="message-input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Enviar</button>
            </form>
          </main>
        </section>
      </div>
    </div>
  );
};
