"use client";

import { useState } from "react";
import { TicketMessageBubble } from "./TicketMessageBubble";
import { ChatInput } from "./ChatInput";
import "./ChatTicket.css";
import { useTicketDetail } from "../hook/useTicketDetail";
import { TicketFileBubble } from "./TicketFileBubble";
import { UploadFileWidget } from "./UploadFileWidget";

interface Props {
  ticketId: number;
  userId: string;
}

export const ChatTicket = ({ ticketId, userId }: Props) => {
const { ticket, bubbles, loading, error, respond, refresh } = useTicketDetail(ticketId);
  const [mensaje, setMensaje] = useState("");

  if (loading) return <p>Cargando conversación...</p>;

  if (error) {
    console.error("❌ Error al cargar el ticket:", error);
    return <p style={{ color: "red" }}>No se pudo cargar el ticket #{ticketId}.</p>;
  }

  if (!ticket) {
    console.warn("⚠️ No se encontró el detalle del ticket:", ticketId);
    return <p style={{ color: "gray" }}>Ticket no encontrado.</p>;
  }

  const handleSend = () => {
    if (!mensaje.trim()) return;
    respond(mensaje, userId, false);
    setMensaje(""); // limpia el campo después de enviar
  };
return (
  <div className="chat-ticket-container">
    <div className="chat-header">
      <h3>{ticket.lenderName}</h3>
    </div>

    <div className="chat-messages">
      {bubbles.map((msg, index) =>
        msg.type === "message" ? (
          <TicketMessageBubble
            key={index}
            sender={msg.senderName}
            content={msg.content}
            isUser={msg.roles.includes("USER")}
            date={msg.sendDate}
          />
        ) : (
          <TicketFileBubble
            key={index}
            file={{
              id: msg.fileId,
              filename: msg.filename,
              filetype: msg.filetype,
              uploadDate: msg.uploadDate,
            }}
          />
        )
      )}
    </div>

    <div className="chat-input-footer-container">
      <ChatInput
        mensaje={mensaje}
        setMensaje={setMensaje}
        onSend={handleSend}
      />
      <UploadFileWidget ticketId={ticket.ticketId} onUploadSuccess={refresh} />
    </div>
  </div>
);
};
