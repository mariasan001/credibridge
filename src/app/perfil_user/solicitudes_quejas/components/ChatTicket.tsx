"use client";

import { TicketMessageBubble } from "./TicketMessageBubble";
import { ChatInput } from "./ChatInput";
import "./ChatTicket.css";
import { useTicketDetail } from "../hook/useTicketDetail";

interface Props {
  ticketId: number;
  userId: string;
}

export const ChatTicket = ({ ticketId, userId }: Props) => {
  const { ticket, loading, error, respond } = useTicketDetail(ticketId);

  if (loading) return <p>Cargando conversación...</p>;

  if (error) {
    console.error("❌ Error al cargar el ticket:", error);
    return <p style={{ color: "red" }}>No se pudo cargar el ticket #{ticketId}.</p>;
  }

  if (!ticket) {
    console.warn("⚠️ No se encontró el detalle del ticket:", ticketId);
    return <p style={{ color: "gray" }}>Ticket no encontrado.</p>;
  }

  const handleSend = (mensaje: string) => {
    respond(mensaje, userId, false);
  };

  return (
<div className="chat-ticket-container">
  <div className="chat-header">
    <h3>{ticket.lenderName}</h3>
  </div>

  <div className="chat-messages">
    {ticket.messages.map((msg, index) => (
      <TicketMessageBubble
        key={index}
        sender={msg.senderName}
        content={msg.content}
        isUser={msg.roles.includes("USER")}
        date={msg.sendDate}
      />
    ))}
  </div>

  <ChatInput onSend={handleSend} />
</div>

  );
};

