"use client";

import { useEffect, useState } from "react";
import { fetchTicketDetail } from "../service/ticket_detail_service";
import { TicketDetail } from "../model/ticket_detail_model";
import { ChatInputBar } from "@/app/perfil_user/solicitudes_quejas/components/ChatInput";
import { useAuth } from "@/context/AuthContext";

import "./DetalleModal.css";
import { respondTicket } from "@/app/perfil_user/solicitudes_quejas/service/toketResponService";

interface Props {
  ticketId: number;
  onClose: () => void;
}

export default function DetalleModal({ ticketId, onClose }: Props) {
  const { user } = useAuth();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTicket();
  }, [ticketId]);

  const cargarTicket = async () => {
    try {
      setLoading(true);
      const detalle = await fetchTicketDetail(ticketId);
      setTicket(detalle);
    } catch (err) {
      console.error("❌ Error al cargar ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const capitalizarNombre = (nombre: string) =>
    nombre
      .toLowerCase()
      .split(" ")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

  const formatearFechaHora = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(fecha);
  };

  const enviarMensaje = async () => {
    if (!mensaje.trim() || !user) return;

    try {
      await respondTicket({
        ticketId,
        senderId: user.userId, // ✅ del contexto
        message: mensaje.trim(),
        isInternal: false,
      });
      setMensaje("");
      await cargarTicket(); // ✅ recarga mensajes tras enviar
    } catch (err) {
      console.error("❌ Error al enviar mensaje:", err);
    }
  };

  if (loading || !ticket) {
    return (
      <div className="modal-overlay">
        <div className="modal-container1">
          <p>Cargando conversación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container1">
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Encabezado */}
          <div className="modal-top-title">
            <p>
              Solicitud de {ticket.clarificationType || ticket.ticketType} —{" "}
              <span className={`estado-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
            </p>
            <h3>{ticket.lenderName}</h3>
          </div>

          {/* Conversación */}
          <div className="modal-section comentarios-container">
            <h4>Comentarios</h4>
            {ticket.messages?.length ? (
              ticket.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`comentario-burbuja ${msg.roles.includes("USER") ? "usuario" : "financiera"}`}
                >
                  <div className="comentario-header">
                    <strong>{capitalizarNombre(msg.senderName)}</strong>
                    <span className="comentario-fecha">{formatearFechaHora(msg.sendDate)}</span>
                  </div>
                  <p className="comentario-texto">{msg.content}</p>
                </div>
              ))
            ) : (
              <p>Sin comentarios aún.</p>
            )}
          </div>

          {/* Input */}
          <ChatInputBar
            ticketId={ticket.ticketId}
            mensaje={mensaje}
            setMensaje={setMensaje}
            onSend={enviarMensaje}
            onUploadSuccess={cargarTicket}
          />
        </div>
      </div>
    </div>
  );
}
